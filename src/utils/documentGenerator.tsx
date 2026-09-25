import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  BorderStyle,
  AlignmentType,
  WidthType,
  ImageRun,
} from 'docx';
import { ResumeData } from '../types/resume';
import { CoverLetterData } from '../types/coverLetter';
import { isCenteredResumeTemplate, isTwoColumnResumeTemplate } from '../constants/resumeTemplateLayouts';

type DocAlignment = (typeof AlignmentType)[keyof typeof AlignmentType];

export type DocxImageData = {
  data: Uint8Array;
  type: 'png' | 'jpg' | 'gif' | 'bmp';
};

const fetchImageUint8Array = async (url?: string): Promise<DocxImageData | null> => {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  try {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = (e) => reject(e);
      img.src = trimmed;
    });

    if (!img.naturalWidth || !img.naturalHeight) return null;

    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.drawImage(img, 0, 0);
    const pngDataUrl = canvas.toDataURL('image/png');
    const base64Part = pngDataUrl.split(',')[1];
    if (!base64Part) return null;

    const binaryString = atob(base64Part);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return { data: bytes, type: 'png' };
  } catch (err) {
    console.warn('Could not load image for Word document:', err);
    return null;
  }
};

export const generateDOCX = async (
  data: ResumeData | CoverLetterData,
  type: 'resume' | 'cover-letter',
  templateId?: string
) => {
  try {
    let doc: Document;

    if (type === 'resume') {
      const resumeData = data as ResumeData;
      const imageBytes = await fetchImageUint8Array(resumeData.personalInfo?.imageUrl);
      doc = createResumeDocument(resumeData, templateId, imageBytes);
    } else {
      doc = createCoverLetterDocument(data as CoverLetterData);
    }

    const blob = await Packer.toBlob(doc);
    const sanitize = (s: string) => s.trim().replace(/\s+/g, '_');
    const fileName =
      type === 'resume'
        ? `${sanitize((data as ResumeData).personalInfo?.firstName || '')}_${sanitize((data as ResumeData).personalInfo?.lastName || '')}_Resume.docx`
        : `${sanitize((data as CoverLetterData).senderInfo?.name || '')}_Cover_Letter.docx`;

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error('Error generating DOCX:', error);
  }
};

const hexToDocxColor = (hex: string) => {
  if (!hex) return '000000';
  return hex.replace('#', '');
};

const formatDate = (date?: string) => date || 'Present';

const formatEducationDates = (startDate?: string, endDate?: string) => {
  const start = (startDate || '').trim();
  const end = (endDate || '').trim();
  if (!start && !end) return '';
  if (!start) return end;
  if (!end) return start;
  if (end.toLowerCase() === 'present') return `${start} - Present`;
  if (end.includes(start)) return end;
  return `${start} - ${end}`;
};

const cleanUrl = (link?: string) => (link ? String(link).replace(/^https?:\/\//, '') : '');

const noBorders = {
  top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  left: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  insideVertical: { style: BorderStyle.NONE, size: 0, color: 'auto' },
};

const getNonEmptyProjects = (data: ResumeData) =>
  data.projects.filter(
    (p) =>
      p.name.trim() ||
      p.description.trim() ||
      (p.link && p.link.trim()) ||
      (p.technologies && p.technologies.some((t) => t.trim()))
  );

const getContactIconRuns = (
  info: ResumeData['personalInfo'],
  accentColor?: string,
  textColor: string = '4B5563',
  separator: string = '   |   ',
  fontSize: number = 18
): TextRun[] => {
  const runs: TextRun[] = [];
  const items = [
    { icon: '✉ ', val: info.email },
    { icon: '📞 ', val: info.phone },
    { icon: '📍 ', val: info.location },
    { icon: 'in ', val: cleanUrl(info.linkedin), isLinkedIn: true },
    { icon: '🌐 ', val: cleanUrl(info.website) },
  ].filter((it) => Boolean(it.val));

  items.forEach((it, idx) => {
    if (idx > 0) {
      runs.push(new TextRun({ text: separator, size: fontSize, color: '9CA3AF', font: 'Arial' }));
    }
    runs.push(
      new TextRun({
        text: it.icon,
        size: fontSize - 2,
        bold: Boolean(it.isLinkedIn),
        color: accentColor || textColor,
        font: it.isLinkedIn ? 'Arial' : 'Segoe UI Symbol',
      })
    );
    runs.push(
      new TextRun({
        text: it.val as string,
        size: fontSize,
        color: textColor,
        font: 'Arial',
      })
    );
  });

  return runs;
};

// =========================================================================
// 1. STANDARD DOCX BUILDER (matches StandardPDFLayout)
// =========================================================================
const buildStandardDocx = (data: ResumeData, themeColorBg: string, themeColorText: string, imageBytes?: DocxImageData | null): Document => {
  const nonEmptyProjects = getNonEmptyProjects(data);
  const children: (Paragraph | Table)[] = [];

  if (imageBytes) {
    children.push(
      new Table({
        borders: noBorders,
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: 75, type: WidthType.PERCENTAGE },
                children: [
                  new Paragraph({
                    border: { top: { color: themeColorBg, space: 4, style: BorderStyle.SINGLE, size: 24 } },
                    spacing: { before: 100, after: 40 },
                    children: [
                      new TextRun({
                        text: `${data.personalInfo.firstName} ${data.personalInfo.lastName}`,
                        bold: true,
                        size: 44,
                        color: '111827',
                        font: 'Arial',
                      }),
                    ],
                  }),
                  new Paragraph({
                    spacing: { after: 80 },
                    children: [
                      new TextRun({
                        text: data.personalInfo.title,
                        size: 24,
                        bold: true,
                        color: themeColorText,
                        font: 'Arial',
                      }),
                    ],
                  }),
                  new Paragraph({
                    spacing: { after: 150 },
                    border: { bottom: { color: 'E5E7EB', space: 4, style: BorderStyle.SINGLE, size: 6 } },
                    children: getContactIconRuns(data.personalInfo, themeColorText, '4B5563', '   |   ', 18),
                  }),
                ],
              }),
              new TableCell({
                width: { size: 25, type: WidthType.PERCENTAGE },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    spacing: { before: 100, after: 150 },
                    children: [
                      new ImageRun({
                        data: imageBytes.data,
                        transformation: { width: 80, height: 80 },
                        type: imageBytes.type,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      })
    );
  } else {
    // Top accent bar + Header
    children.push(
      new Paragraph({
        border: { top: { color: themeColorBg, space: 4, style: BorderStyle.SINGLE, size: 24 } },
        spacing: { before: 100, after: 40 },
        children: [
          new TextRun({
            text: `${data.personalInfo.firstName} ${data.personalInfo.lastName}`,
            bold: true,
            size: 48,
            color: '111827',
            font: 'Arial',
          }),
        ],
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: data.personalInfo.title,
            size: 26,
            bold: true,
            color: themeColorText,
            font: 'Arial',
          }),
        ],
      }),
      new Paragraph({
        spacing: { after: 200 },
        border: { bottom: { color: 'E5E7EB', space: 4, style: BorderStyle.SINGLE, size: 6 } },
        children: getContactIconRuns(data.personalInfo, themeColorText, '4B5563', '   |   ', 19),
      })
    );
  }

  const addSecTitle = (title: string) =>
    new Paragraph({
      spacing: { before: 200, after: 100 },
      border: { bottom: { color: 'E5E7EB', space: 2, style: BorderStyle.SINGLE, size: 6 } },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: 22,
          color: '111827',
          font: 'Arial',
        }),
      ],
    });

  if (data.summary) {
    children.push(addSecTitle('Professional Summary'));
    children.push(
      new Paragraph({
        spacing: { after: 140 },
        children: [new TextRun({ text: data.summary, size: 20, color: '374151', font: 'Arial' })],
      })
    );
  }

  if (data.experience.length > 0) {
    children.push(addSecTitle('Work Experience'));
    data.experience.forEach((exp) => {
      children.push(
        new Paragraph({
          spacing: { before: 100, after: 30 },
          children: [
            new TextRun({ text: exp.position, bold: true, size: 21, color: '111827', font: 'Arial' }),
            new TextRun({ text: `  |  ${exp.company}`, bold: true, size: 20, color: themeColorText, font: 'Arial' }),
            new TextRun({
              text: `  |  ${formatDate(exp.startDate)} - ${formatDate(exp.endDate)}`,
              size: 18,
              italics: true,
              color: '6B7280',
              font: 'Arial',
            }),
          ],
        })
      );
      exp.description.forEach((desc) => {
        children.push(
          new Paragraph({
            indent: { left: 240 },
            spacing: { after: 20 },
            children: [new TextRun({ text: `•  ${desc}`, size: 19, color: '374151', font: 'Arial' })],
          })
        );
      });
    });
  }

  if (data.education.length > 0) {
    children.push(addSecTitle('Education'));
    data.education.forEach((edu) => {
      children.push(
        new Paragraph({
          spacing: { after: 40 },
          children: [
            new TextRun({
              text: `${edu.degree}${edu.field?.trim() ? ` in ${edu.field.trim()}` : ''}`,
              bold: true,
              size: 21,
              color: '111827',
              font: 'Arial',
            }),
            new TextRun({ text: `  |  ${edu.institution}`, size: 20, color: themeColorText, font: 'Arial' }),
            new TextRun({
              text: `  |  ${formatEducationDates(edu.startDate, edu.endDate)}`,
              size: 18,
              italics: true,
              color: '6B7280',
              font: 'Arial',
            }),
          ],
        })
      );
    });
  }

  if (nonEmptyProjects.length > 0) {
    children.push(addSecTitle('Projects'));
    nonEmptyProjects.forEach((proj) => {
      children.push(
        new Paragraph({
          spacing: { before: 80, after: 20 },
          children: [
            new TextRun({ text: proj.name, bold: true, size: 21, color: '111827', font: 'Arial' }),
            ...(proj.link
              ? [new TextRun({ text: `  (${cleanUrl(proj.link)})`, size: 17, color: themeColorText, font: 'Arial' })]
              : []),
          ],
        })
      );
      if (proj.description) {
        children.push(
          new Paragraph({
            spacing: { after: 30 },
            children: [new TextRun({ text: proj.description, size: 19, color: '374151', font: 'Arial' })],
          })
        );
      }
      if (proj.technologies && proj.technologies.length > 0) {
        children.push(
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({
                text: 'Tech: ' + proj.technologies.join(', '),
                italics: true,
                size: 17,
                color: '6B7280',
                font: 'Arial',
              }),
            ],
          })
        );
      }
    });
  }

  if (data.skills.length > 0) {
    children.push(addSecTitle('Skills'));
    const skillsText = data.skills.map((s) => `• ${s.name}${s.level ? ` (${s.level})` : ''}`).join('     ');
    children.push(
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: skillsText, size: 19, color: '374151', font: 'Arial' })],
      })
    );
  }

  if (data.customSections && data.customSections.length > 0) {
    data.customSections.forEach((sec) => {
      if (sec.items.length === 0) return;
      children.push(addSecTitle(sec.title));
      sec.items.forEach((item) => {
        children.push(
          new Paragraph({
            spacing: { after: 30 },
            children: [
              new TextRun({ text: `• ${item.name}`, bold: true, size: 20, color: '111827', font: 'Arial' }),
              ...(item.description
                ? [new TextRun({ text: ` - ${item.description}`, size: 19, color: '374151', font: 'Arial' })]
                : []),
              ...(item.date
                ? [new TextRun({ text: ` (${item.date})`, size: 17, italics: true, color: '6B7280', font: 'Arial' })]
                : []),
            ],
          })
        );
      });
    });
  }

  return new Document({
    sections: [{ properties: { page: { margin: { top: 720, bottom: 720, left: 720, right: 720 } } }, children }],
  });
};

// =========================================================================
// 2. TWO COLUMN DOCX BUILDER (matches TwoColumnPDFLayout)
// =========================================================================
const buildTwoColumnDocx = (data: ResumeData, themeColorBg: string, themeColorText: string, imageBytes?: DocxImageData | null): Document => {
  const nonEmptyProjects = getNonEmptyProjects(data);
  const leftCol: Paragraph[] = [];
  const rightCol: Paragraph[] = [];

  const addLeftTitle = (title: string) =>
    new Paragraph({
      spacing: { before: 200, after: 80 },
      border: { bottom: { color: 'FFFFFF', space: 2, style: BorderStyle.SINGLE, size: 6 } },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: 20,
          color: 'FFFFFF',
          font: 'Arial',
        }),
      ],
    });

  // Left column content
  if (imageBytes) {
    leftCol.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 50, after: 100 },
        children: [
          new ImageRun({
            data: imageBytes.data,
            transformation: { width: 65, height: 65 },
            type: imageBytes.type,
          }),
        ],
      })
    );
  }

  leftCol.push(
    new Paragraph({
      spacing: { before: 50, after: 30 },
      children: [
        new TextRun({
          text: `${data.personalInfo.firstName} ${data.personalInfo.lastName}`,
          bold: true,
          size: 34,
          color: 'FFFFFF',
          font: 'Arial',
        }),
      ],
    }),
    new Paragraph({
      spacing: { after: 150 },
      children: [
        new TextRun({
          text: data.personalInfo.title,
          size: 18,
          color: 'F1F5F9',
          font: 'Arial',
        }),
      ],
    }),
    addLeftTitle('Contact')
  );

  const contactList = [
    { icon: '✉ ', label: 'Email', val: data.personalInfo.email },
    { icon: '📞 ', label: 'Phone', val: data.personalInfo.phone },
    { icon: '📍 ', label: 'Location', val: data.personalInfo.location },
    { icon: 'in ', label: 'LinkedIn', val: cleanUrl(data.personalInfo.linkedin), isLinkedIn: true },
    { icon: '🌐 ', label: 'Website', val: cleanUrl(data.personalInfo.website) },
  ].filter((c) => Boolean(c.val));

  contactList.forEach((c) => {
    leftCol.push(
      new Paragraph({
        spacing: { after: 40 },
        children: [
          new TextRun({ text: c.icon, size: 16, color: 'E2E8F0', bold: Boolean(c.isLinkedIn), font: c.isLinkedIn ? 'Arial' : 'Segoe UI Symbol' }),
          new TextRun({ text: c.val as string, size: 16, color: 'FFFFFF', font: 'Arial' }),
        ],
      })
    );
  });

  if (data.skills.length > 0) {
    leftCol.push(addLeftTitle('Skills'));
    data.skills.forEach((skill) => {
      leftCol.push(
        new Paragraph({
          spacing: { after: 35 },
          children: [
            new TextRun({ text: `• ${skill.name}`, bold: true, size: 17, color: 'FFFFFF', font: 'Arial' }),
            ...(skill.level
              ? [new TextRun({ text: ` (${skill.level})`, size: 15, color: 'E2E8F0', font: 'Arial' })]
              : []),
          ],
        })
      );
    });
  }

  if (data.education.length > 0) {
    leftCol.push(addLeftTitle('Education'));
    data.education.forEach((edu) => {
      leftCol.push(
        new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({ text: edu.degree, bold: true, size: 17, color: 'FFFFFF', font: 'Arial' }),
            new TextRun({ text: `\n${edu.institution}`, size: 16, color: 'E2E8F0', font: 'Arial' }),
            new TextRun({
              text: `\n${formatEducationDates(edu.startDate, edu.endDate)}`,
              size: 14,
              color: 'CBD5E1',
              italics: true,
              font: 'Arial',
            }),
          ],
        })
      );
    });
  }

  if (data.customSections && data.customSections.length > 0) {
    data.customSections.forEach((sec) => {
      if (sec.items.length === 0) return;
      leftCol.push(addLeftTitle(sec.title));
      sec.items.forEach((item) => {
        leftCol.push(
          new Paragraph({
            spacing: { after: 40 },
            children: [
              new TextRun({ text: `• ${item.name}`, bold: true, size: 16, color: 'FFFFFF', font: 'Arial' }),
              ...(item.description
                ? [new TextRun({ text: `\n  ${item.description}`, size: 15, color: 'E2E8F0', font: 'Arial' })]
                : []),
            ],
          })
        );
      });
    });
  }

  // Right column content
  const addRightTitle = (title: string) =>
    new Paragraph({
      spacing: { before: 180, after: 80 },
      border: { bottom: { color: 'E5E7EB', space: 2, style: BorderStyle.SINGLE, size: 6 } },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: 22,
          color: themeColorText,
          font: 'Arial',
        }),
      ],
    });

  if (data.summary) {
    rightCol.push(addRightTitle('Profile'));
    rightCol.push(
      new Paragraph({
        spacing: { after: 140 },
        children: [new TextRun({ text: data.summary, size: 19, color: '374151', font: 'Arial' })],
      })
    );
  }

  if (data.experience.length > 0) {
    rightCol.push(addRightTitle('Experience'));
    data.experience.forEach((exp) => {
      rightCol.push(
        new Paragraph({
          spacing: { before: 80, after: 30 },
          children: [
            new TextRun({ text: exp.position, bold: true, size: 20, color: '111827', font: 'Arial' }),
            new TextRun({ text: `\n${exp.company}`, size: 19, bold: true, color: themeColorText, font: 'Arial' }),
            new TextRun({
              text: `  (${formatDate(exp.startDate)} - ${formatDate(exp.endDate)})`,
              size: 17,
              italics: true,
              color: '6B7280',
              font: 'Arial',
            }),
          ],
        })
      );
      exp.description.forEach((desc) => {
        rightCol.push(
          new Paragraph({
            indent: { left: 200 },
            spacing: { after: 20 },
            children: [new TextRun({ text: `•  ${desc}`, size: 18, color: '374151', font: 'Arial' })],
          })
        );
      });
    });
  }

  if (nonEmptyProjects.length > 0) {
    rightCol.push(addRightTitle('Projects'));
    nonEmptyProjects.forEach((proj) => {
      rightCol.push(
        new Paragraph({
          spacing: { before: 80, after: 20 },
          children: [
            new TextRun({ text: proj.name, bold: true, size: 20, color: '111827', font: 'Arial' }),
            ...(proj.link
              ? [new TextRun({ text: `\n${cleanUrl(proj.link)}`, size: 16, color: themeColorText, font: 'Arial' })]
              : []),
          ],
        })
      );
      if (proj.description) {
        rightCol.push(
          new Paragraph({
            spacing: { after: 30 },
            children: [new TextRun({ text: proj.description, size: 18, color: '374151', font: 'Arial' })],
          })
        );
      }
      if (proj.technologies && proj.technologies.length > 0) {
        rightCol.push(
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({
                text: 'Tech: ' + proj.technologies.join(', '),
                italics: true,
                size: 16,
                color: '6B7280',
                font: 'Arial',
              }),
            ],
          })
        );
      }
    });
  }

  const table = new Table({
    borders: noBorders,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 34, type: WidthType.PERCENTAGE },
            shading: { fill: themeColorBg },
            margins: { top: 300, bottom: 300, left: 300, right: 300 },
            children: leftCol,
          }),
          new TableCell({
            width: { size: 66, type: WidthType.PERCENTAGE },
            margins: { top: 300, bottom: 300, left: 350, right: 300 },
            children: rightCol,
          }),
        ],
      }),
    ],
  });

  return new Document({
    sections: [{ properties: { page: { margin: { top: 400, bottom: 400, left: 400, right: 400 } } }, children: [table] }],
  });
};

// =========================================================================
// 3. CENTERED DOCX BUILDER (matches CenteredPDFLayout)
// =========================================================================
const buildCenteredDocx = (data: ResumeData, themeColorBg: string, themeColorText: string, imageBytes?: DocxImageData | null): Document => {
  const nonEmptyProjects = getNonEmptyProjects(data);
  const children: (Paragraph | Table)[] = [];

  if (imageBytes) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 80, after: 60 },
        children: [
          new ImageRun({
            data: imageBytes.data,
            transformation: { width: 70, height: 70 },
            type: imageBytes.type,
          }),
        ],
      })
    );
  }

  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 100, after: 40 },
      children: [
        new TextRun({
          text: `${data.personalInfo.firstName} ${data.personalInfo.lastName}`.toUpperCase(),
          bold: true,
          size: 46,
          color: '111827',
          font: 'Arial',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 80 },
      children: [
        new TextRun({
          text: data.personalInfo.title.toUpperCase(),
          size: 22,
          bold: true,
          color: themeColorText,
          font: 'Arial',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 220 },
      border: { bottom: { color: themeColorBg, space: 4, style: BorderStyle.SINGLE, size: 12 } },
      children: getContactIconRuns(data.personalInfo, themeColorText, '4B5563', '   •   ', 19),
    })
  );

  const addCenteredTitle = (title: string) =>
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 100 },
      border: { bottom: { color: themeColorBg, space: 2, style: BorderStyle.SINGLE, size: 12 } },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: 22,
          color: '111827',
          font: 'Arial',
        }),
      ],
    });

  if (data.summary) {
    children.push(addCenteredTitle('Executive Summary'));
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 150 },
        children: [new TextRun({ text: data.summary, size: 20, italics: true, color: '374151', font: 'Arial' })],
      })
    );
  }

  if (data.experience.length > 0) {
    children.push(addCenteredTitle('Professional Experience'));
    data.experience.forEach((exp) => {
      children.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 80, after: 20 },
          children: [
            new TextRun({ text: exp.position, bold: true, size: 21, color: '111827', font: 'Arial' }),
            new TextRun({ text: `  |  ${exp.company}`, bold: true, size: 20, color: themeColorText, font: 'Arial' }),
            new TextRun({
              text: `  |  ${formatDate(exp.startDate)} - ${formatDate(exp.endDate)}`,
              size: 18,
              italics: true,
              color: '6B7280',
              font: 'Arial',
            }),
          ],
        })
      );
      exp.description.forEach((desc) => {
        children.push(
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 20 },
            children: [new TextRun({ text: `•  ${desc}`, size: 19, color: '374151', font: 'Arial' })],
          })
        );
      });
    });
  }

  if (data.education.length > 0) {
    children.push(addCenteredTitle('Education'));
    data.education.forEach((edu) => {
      children.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 40 },
          children: [
            new TextRun({
              text: `${edu.degree}${edu.field?.trim() ? ` in ${edu.field.trim()}` : ''}`,
              bold: true,
              size: 21,
              color: '111827',
              font: 'Arial',
            }),
            new TextRun({ text: `  |  ${edu.institution}`, size: 20, color: themeColorText, font: 'Arial' }),
            new TextRun({
              text: `  |  ${formatEducationDates(edu.startDate, edu.endDate)}`,
              size: 18,
              italics: true,
              color: '6B7280',
              font: 'Arial',
            }),
          ],
        })
      );
    });
  }

  if (nonEmptyProjects.length > 0) {
    children.push(addCenteredTitle('Selected Projects'));
    nonEmptyProjects.forEach((proj) => {
      children.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 80, after: 20 },
          children: [
            new TextRun({ text: proj.name, bold: true, size: 21, color: '111827', font: 'Arial' }),
            ...(proj.link
              ? [new TextRun({ text: `  (${cleanUrl(proj.link)})`, size: 17, color: themeColorText, font: 'Arial' })]
              : []),
          ],
        })
      );
      if (proj.description) {
        children.push(
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 30 },
            children: [new TextRun({ text: proj.description, size: 19, color: '374151', font: 'Arial' })],
          })
        );
      }
      if (proj.technologies && proj.technologies.length > 0) {
        children.push(
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 50 },
            children: [
              new TextRun({
                text: 'Technologies: ' + proj.technologies.join(', '),
                italics: true,
                size: 17,
                color: '6B7280',
                font: 'Arial',
              }),
            ],
          })
        );
      }
    });
  }

  if (data.skills.length > 0) {
    children.push(addCenteredTitle('Technical Expertise'));
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: data.skills.map((s) => `${s.name}${s.level ? ` (${s.level})` : ''}`).join('   •   '),
            size: 20,
            color: '374151',
            font: 'Arial',
          }),
        ],
      })
    );
  }

  return new Document({
    sections: [{ properties: { page: { margin: { top: 720, bottom: 720, left: 720, right: 720 } } }, children }],
  });
};

// =========================================================================
// 4. YELLOW SIDEBAR DOCX BUILDER (matches YellowSidebarPDFLayout)
// =========================================================================
const buildYellowSidebarDocx = (data: ResumeData, themeColorBg: string, themeColorText: string, imageBytes?: DocxImageData | null): Document => {
  const nonEmptyProjects = getNonEmptyProjects(data);
  const leftCol: Paragraph[] = [];
  const rightCol: Paragraph[] = [];

  if (imageBytes) {
    leftCol.push(
      new Paragraph({
        spacing: { before: 50, after: 100 },
        children: [
          new ImageRun({
            data: imageBytes.data,
            transformation: { width: 75, height: 75 },
            type: imageBytes.type,
          }),
        ],
      })
    );
  }

  const addLeftTitle = (title: string) =>
    new Paragraph({
      spacing: { before: 180, after: 80 },
      border: { bottom: { color: 'B45309', space: 2, style: BorderStyle.SINGLE, size: 6 } },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: 20,
          color: '78350F',
          font: 'Arial',
        }),
      ],
    });

  leftCol.push(addLeftTitle('Contact'));
  const yellowContactList = [
    { icon: '📍 ', label: 'Location', val: data.personalInfo.location },
    { icon: '📞 ', label: 'Phone', val: data.personalInfo.phone },
    { icon: '✉ ', label: 'Email', val: data.personalInfo.email },
    { icon: 'in ', label: 'LinkedIn', val: cleanUrl(data.personalInfo.linkedin), isLinkedIn: true },
    { icon: '🌐 ', label: 'Website', val: cleanUrl(data.personalInfo.website) },
  ].filter((c) => Boolean(c.val));

  yellowContactList.forEach((c) => {
    leftCol.push(
      new Paragraph({
        spacing: { after: 40 },
        children: [
          new TextRun({ text: c.icon, size: 16, color: '78350F', bold: Boolean(c.isLinkedIn), font: c.isLinkedIn ? 'Arial' : 'Segoe UI Symbol' }),
          new TextRun({ text: c.val as string, size: 16, color: '1F2937', font: 'Arial' }),
        ],
      })
    );
  });

  if (data.skills.length > 0) {
    leftCol.push(addLeftTitle('Skills'));
    data.skills.forEach((s) => {
      leftCol.push(
        new Paragraph({
          spacing: { after: 30 },
          children: [new TextRun({ text: `• ${s.name}`, size: 17, color: '1F2937', font: 'Arial' })],
        })
      );
    });
  }

  if (data.education.length > 0) {
    leftCol.push(addLeftTitle('Education'));
    data.education.forEach((edu) => {
      leftCol.push(
        new Paragraph({
          spacing: { after: 50 },
          children: [
            new TextRun({
              text: `${formatEducationDates(edu.startDate, edu.endDate)}\n`,
              size: 14,
              color: '78350F',
              font: 'Arial',
            }),
            new TextRun({ text: edu.degree, bold: true, size: 17, color: '111827', font: 'Arial' }),
            new TextRun({ text: `\n${edu.institution}`, size: 16, color: '374151', font: 'Arial' }),
          ],
        })
      );
    });
  }

  // Right column
  rightCol.push(
    new Paragraph({
      spacing: { before: 50, after: 40 },
      children: [
        new TextRun({
          text: `${data.personalInfo.firstName} ${data.personalInfo.lastName}`,
          bold: true,
          size: 40,
          color: '111827',
          font: 'Arial',
        }),
      ],
    }),
    new Paragraph({
      spacing: { after: 150 },
      border: { bottom: { color: themeColorBg, space: 4, style: BorderStyle.SINGLE, size: 18 } },
      children: [
        new TextRun({
          text: data.personalInfo.title,
          size: 22,
          bold: true,
          color: themeColorText,
          font: 'Arial',
        }),
      ],
    })
  );

  const addRightTitle = (title: string) =>
    new Paragraph({
      spacing: { before: 180, after: 80 },
      border: { bottom: { color: 'E5E7EB', space: 2, style: BorderStyle.SINGLE, size: 6 } },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: 22,
          color: '111827',
          font: 'Arial',
        }),
      ],
    });

  if (data.summary) {
    rightCol.push(addRightTitle('Professional Summary'));
    rightCol.push(
      new Paragraph({
        spacing: { after: 140 },
        children: [new TextRun({ text: data.summary, size: 19, color: '374151', font: 'Arial' })],
      })
    );
  }

  if (data.experience.length > 0) {
    rightCol.push(addRightTitle('Work History'));
    data.experience.forEach((exp) => {
      rightCol.push(
        new Paragraph({
          spacing: { before: 80, after: 20 },
          children: [
            new TextRun({
              text: `${formatDate(exp.startDate)} - ${formatDate(exp.endDate)}\n`,
              size: 16,
              color: '6B7280',
              font: 'Arial',
            }),
            new TextRun({
              text: `${exp.position}, ${exp.company}`,
              bold: true,
              size: 20,
              color: '111827',
              font: 'Arial',
            }),
          ],
        })
      );
      exp.description.forEach((desc) => {
        rightCol.push(
          new Paragraph({
            indent: { left: 200 },
            spacing: { after: 20 },
            children: [new TextRun({ text: `•  ${desc}`, size: 18, color: '374151', font: 'Arial' })],
          })
        );
      });
    });
  }

  if (nonEmptyProjects.length > 0) {
    rightCol.push(addRightTitle('Projects'));
    nonEmptyProjects.forEach((proj) => {
      rightCol.push(
        new Paragraph({
          spacing: { before: 80, after: 20 },
          children: [
            new TextRun({ text: proj.name, bold: true, size: 20, color: '111827', font: 'Arial' }),
            ...(proj.link
              ? [new TextRun({ text: `\n${cleanUrl(proj.link)}`, size: 16, color: themeColorText, font: 'Arial' })]
              : []),
          ],
        })
      );
      if (proj.description) {
        rightCol.push(
          new Paragraph({
            spacing: { after: 30 },
            children: [new TextRun({ text: proj.description, size: 18, color: '374151', font: 'Arial' })],
          })
        );
      }
    });
  }

  const table = new Table({
    borders: noBorders,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 34, type: WidthType.PERCENTAGE },
            shading: { fill: themeColorBg || 'FEF08A' },
            margins: { top: 300, bottom: 300, left: 300, right: 300 },
            children: leftCol,
          }),
          new TableCell({
            width: { size: 66, type: WidthType.PERCENTAGE },
            margins: { top: 300, bottom: 300, left: 350, right: 300 },
            children: rightCol,
          }),
        ],
      }),
    ],
  });

  return new Document({
    sections: [{ properties: { page: { margin: { top: 400, bottom: 400, left: 400, right: 400 } } }, children: [table] }],
  });
};

// =========================================================================
// 5. NAVY SIDEBAR DOCX BUILDER (matches NavySidebarPDFLayout)
// =========================================================================
const buildNavySidebarDocx = (data: ResumeData, themeColorBg: string, themeColorText: string, imageBytes?: DocxImageData | null): Document => {
  const nonEmptyProjects = getNonEmptyProjects(data);
  const leftCol: Paragraph[] = [];
  const rightCol: Paragraph[] = [];

  // Left Column Body (68%)
  if (imageBytes) {
    leftCol.push(
      new Paragraph({
        spacing: { before: 50, after: 60 },
        children: [
          new ImageRun({
            data: imageBytes.data,
            transformation: { width: 50, height: 50 },
            type: imageBytes.type,
          }),
        ],
      })
    );
  }

  leftCol.push(
    new Paragraph({
      spacing: { before: 50, after: 20 },
      children: [
        new TextRun({
          text: `${data.personalInfo.firstName} ${data.personalInfo.lastName}`,
          bold: true,
          size: 42,
          color: '111827',
          font: 'Arial',
        }),
      ],
    }),
    new Paragraph({
      spacing: { after: 150 },
      children: [
        new TextRun({
          text: data.personalInfo.title.toUpperCase(),
          size: 20,
          bold: true,
          color: '6B7280',
          font: 'Arial',
        }),
      ],
    })
  );

  const addBodyTitle = (title: string) =>
    new Paragraph({
      spacing: { before: 180, after: 80 },
      border: { bottom: { color: 'E5E7EB', space: 2, style: BorderStyle.SINGLE, size: 6 } },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: 22,
          color: '111827',
          font: 'Arial',
        }),
      ],
    });

  if (data.summary) {
    leftCol.push(addBodyTitle('Profile'));
    leftCol.push(
      new Paragraph({
        spacing: { after: 140 },
        children: [new TextRun({ text: data.summary, size: 19, color: '4B5563', font: 'Arial' })],
      })
    );
  }

  if (data.experience.length > 0) {
    leftCol.push(addBodyTitle('Employment History'));
    data.experience.forEach((exp) => {
      leftCol.push(
        new Paragraph({
          spacing: { before: 80, after: 20 },
          children: [
            new TextRun({
              text: `${exp.position}, ${exp.company}`,
              bold: true,
              size: 20,
              color: '111827',
              font: 'Arial',
            }),
            new TextRun({
              text: `\n${formatDate(exp.startDate)} - ${formatDate(exp.endDate)}`,
              size: 16,
              color: '6B7280',
              font: 'Arial',
            }),
          ],
        })
      );
      exp.description.forEach((desc) => {
        leftCol.push(
          new Paragraph({
            indent: { left: 200 },
            spacing: { after: 20 },
            children: [new TextRun({ text: `•  ${desc}`, size: 18, color: '4B5563', font: 'Arial' })],
          })
        );
      });
    });
  }

  if (data.education.length > 0) {
    leftCol.push(addBodyTitle('Education'));
    data.education.forEach((edu) => {
      leftCol.push(
        new Paragraph({
          spacing: { after: 40 },
          children: [
            new TextRun({
              text: `${edu.degree}${edu.field ? `, ${edu.field}` : ''}, ${edu.institution}`,
              bold: true,
              size: 19,
              color: '111827',
              font: 'Arial',
            }),
            new TextRun({
              text: `\n${formatEducationDates(edu.startDate, edu.endDate)}`,
              size: 16,
              color: '6B7280',
              font: 'Arial',
            }),
          ],
        })
      );
    });
  }

  if (nonEmptyProjects.length > 0) {
    leftCol.push(addBodyTitle('Projects'));
    nonEmptyProjects.forEach((proj) => {
      leftCol.push(
        new Paragraph({
          spacing: { before: 80, after: 20 },
          children: [
            new TextRun({ text: proj.name, bold: true, size: 20, color: '111827', font: 'Arial' }),
            ...(proj.link
              ? [new TextRun({ text: `\n${cleanUrl(proj.link)}`, size: 16, color: themeColorText, font: 'Arial' })]
              : []),
          ],
        })
      );
      if (proj.description) {
        leftCol.push(
          new Paragraph({
            spacing: { after: 30 },
            children: [new TextRun({ text: proj.description, size: 18, color: '4B5563', font: 'Arial' })],
          })
        );
      }
      if (proj.technologies && proj.technologies.length > 0) {
        leftCol.push(
          new Paragraph({
            spacing: { after: 50 },
            children: [
              new TextRun({
                text: 'Technologies: ' + proj.technologies.join(', '),
                size: 16,
                color: '6B7280',
                font: 'Arial',
              }),
            ],
          })
        );
      }
    });
  }

  // Right Column Navy Sidebar (32%)
  const addSidebarTitle = (title: string) =>
    new Paragraph({
      spacing: { before: 180, after: 80 },
      border: { bottom: { color: '475569', space: 2, style: BorderStyle.SINGLE, size: 6 } },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: 20,
          color: 'FFFFFF',
          font: 'Arial',
        }),
      ],
    });

  rightCol.push(addSidebarTitle('Details'));
  const navyContactList = [
    { icon: '📍 ', label: 'Address', val: data.personalInfo.location },
    { icon: '📞 ', label: 'Phone', val: data.personalInfo.phone },
    { icon: '✉ ', label: 'Email', val: data.personalInfo.email },
    { icon: 'in ', label: 'LinkedIn', val: cleanUrl(data.personalInfo.linkedin), isLinkedIn: true },
    { icon: '🌐 ', label: 'Website', val: cleanUrl(data.personalInfo.website) },
  ].filter((c) => Boolean(c.val));

  navyContactList.forEach((c) => {
    rightCol.push(
      new Paragraph({
        spacing: { after: 40 },
        children: [
          new TextRun({ text: `${c.icon} `, size: 15, color: '94A3B8', bold: Boolean(c.isLinkedIn), font: c.isLinkedIn ? 'Arial' : 'Segoe UI Symbol' }),
          new TextRun({ text: c.val as string, size: 16, color: 'FFFFFF', font: 'Arial' }),
        ],
      })
    );
  });

  if (data.skills.length > 0) {
    rightCol.push(addSidebarTitle('Skills'));
    data.skills.forEach((s) => {
      rightCol.push(
        new Paragraph({
          spacing: { after: 30 },
          children: [
            new TextRun({ text: `• ${s.name}`, bold: true, size: 17, color: 'FFFFFF', font: 'Arial' }),
            ...(s.level ? [new TextRun({ text: ` (${s.level})`, size: 14, color: '94A3B8', font: 'Arial' })] : []),
          ],
        })
      );
    });
  }

  const table = new Table({
    borders: noBorders,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 68, type: WidthType.PERCENTAGE },
            margins: { top: 300, bottom: 300, left: 300, right: 350 },
            children: leftCol,
          }),
          new TableCell({
            width: { size: 32, type: WidthType.PERCENTAGE },
            shading: { fill: themeColorBg || '1E293B' },
            margins: { top: 300, bottom: 300, left: 300, right: 300 },
            children: rightCol,
          }),
        ],
      }),
    ],
  });

  return new Document({
    sections: [{ properties: { page: { margin: { top: 400, bottom: 400, left: 400, right: 400 } } }, children: [table] }],
  });
};

// =========================================================================
// 6. FORMAL RED DOCX BUILDER (matches FormalRedPDFLayout)
// =========================================================================
const buildFormalRedDocx = (data: ResumeData, themeColorBg: string, themeColorText: string, imageBytes?: DocxImageData | null): Document => {
  const nonEmptyProjects = getNonEmptyProjects(data);
  const leftCol: Paragraph[] = [];
  const rightCol: Paragraph[] = [];

  const headerChildren: Paragraph[] = [];

  if (imageBytes) {
    headerChildren.push(
      new Paragraph({
        spacing: { before: 80, after: 30 },
        children: [
          new ImageRun({
            data: imageBytes.data,
            transformation: { width: 60, height: 60 },
            type: imageBytes.type,
          }),
        ],
      })
    );
  }

  headerChildren.push(
    new Paragraph({
      spacing: { before: 80, after: 30 },
      children: [
        new TextRun({
          text: `${data.personalInfo.firstName || ''} ${data.personalInfo.lastName || ''}`,
          bold: true,
          size: 42,
          color: themeColorText || 'BE123C',
          font: 'Arial',
        }),
      ],
    }),
    new Paragraph({
      spacing: { after: 80 },
      children: [
        new TextRun({
          text: data.personalInfo.title,
          size: 22,
          color: '4B5563',
          font: 'Arial',
        }),
      ],
    }),
    new Paragraph({
      spacing: { after: 150 },
      border: { bottom: { color: 'E5E7EB', space: 4, style: BorderStyle.SINGLE, size: 6 } },
      children: getContactIconRuns(data.personalInfo, themeColorText || 'BE123C', '6B7280', '  |  ', 18),
    }),
  );

  const addSecTitle = (title: string) =>
    new Paragraph({
      spacing: { before: 160, after: 60 },
      border: { bottom: { color: 'E5E7EB', space: 2, style: BorderStyle.SINGLE, size: 6 } },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: 20,
          color: '111827',
          font: 'Arial',
        }),
      ],
    });

  if (data.summary) {
    leftCol.push(addSecTitle('Profile'));
    leftCol.push(
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun({ text: data.summary, size: 19, color: '374151', font: 'Arial' })],
      })
    );
  }

  if (data.experience.length > 0) {
    leftCol.push(addSecTitle('Employment History'));
    data.experience.forEach((exp) => {
      leftCol.push(
        new Paragraph({
          spacing: { before: 80, after: 20 },
          children: [
            new TextRun({
              text: `${exp.position || 'Position'}, ${exp.company || 'Company'}`,
              bold: true,
              size: 20,
              color: '111827',
              font: 'Arial',
            }),
            new TextRun({
              text: `  (${formatDate(exp.startDate)} - ${formatDate(exp.endDate)})`,
              size: 16,
              color: '6B7280',
              font: 'Arial',
            }),
          ],
        })
      );
      exp.description.forEach((desc) => {
        leftCol.push(
          new Paragraph({
            indent: { left: 200 },
            spacing: { after: 20 },
            children: [new TextRun({ text: `•  ${desc}`, size: 18, color: '374151', font: 'Arial' })],
          })
        );
      });
    });
  }

  if (data.education.length > 0) {
    leftCol.push(addSecTitle('Education'));
    data.education.forEach((edu) => {
      leftCol.push(
        new Paragraph({
          spacing: { after: 40 },
          children: [
            new TextRun({
              text: `${edu.institution || ''}, ${edu.degree || ''}`,
              bold: true,
              size: 19,
              color: '111827',
              font: 'Arial',
            }),
            new TextRun({ text: `  (${formatDate(edu.endDate)})`, size: 16, color: '6B7280', font: 'Arial' }),
          ],
        })
      );
    });
  }

  // Right column: Skills + Projects
  if (data.skills.length > 0) {
    rightCol.push(addSecTitle('Skills'));
    data.skills.forEach((s) => {
      rightCol.push(
        new Paragraph({
          spacing: { after: 40 },
          children: [new TextRun({ text: `• ${s.name || 'Skill'}`, size: 18, color: '374151', font: 'Arial' })],
        })
      );
    });
  }

  if (nonEmptyProjects.length > 0) {
    rightCol.push(addSecTitle('Projects'));
    nonEmptyProjects.forEach((proj) => {
      rightCol.push(
        new Paragraph({
          spacing: { before: 80, after: 20 },
          children: [
            new TextRun({ text: proj.name || 'Project', bold: true, size: 20, color: '111827', font: 'Arial' }),
            ...(proj.link
              ? [new TextRun({ text: `\n${cleanUrl(proj.link)}`, size: 16, color: themeColorText || 'BE123C', font: 'Arial' })]
              : []),
          ],
        })
      );
      if (proj.description) {
        rightCol.push(
          new Paragraph({
            spacing: { after: 30 },
            children: [new TextRun({ text: proj.description, size: 18, color: '374151', font: 'Arial' })],
          })
        );
      }
    });
  }

  const table = new Table({
    borders: noBorders,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 75, type: WidthType.PERCENTAGE },
            margins: { top: 100, bottom: 200, left: 0, right: 250 },
            children: leftCol,
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            margins: { top: 100, bottom: 200, left: 250, right: 0 },
            children: rightCol,
          }),
        ],
      }),
    ],
  });

  return new Document({
    sections: [{ properties: { page: { margin: { top: 600, bottom: 600, left: 600, right: 600 } } }, children: [...headerChildren, table] }],
  });
};

// =========================================================================
// 7. TIMELINE DARK DOCX BUILDER (matches TimelineDarkPDFLayout)
// =========================================================================
const buildTimelineDarkDocx = (data: ResumeData, themeColorBg: string, themeColorText: string, imageBytes?: DocxImageData | null): Document => {
  const nonEmptyProjects = getNonEmptyProjects(data);
  const leftCol: Paragraph[] = [];
  const rightCol: Paragraph[] = [];

  // Left Col (32%, Light Gray)
  if (imageBytes) {
    leftCol.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 50, after: 100 },
        children: [
          new ImageRun({
            data: imageBytes.data,
            transformation: { width: 75, height: 75 },
            type: imageBytes.type,
          }),
        ],
      })
    );
  }

  const addLeftTitle = (title: string) =>
    new Paragraph({
      spacing: { before: 180, after: 60 },
      border: { bottom: { color: 'D1D5DB', space: 2, style: BorderStyle.SINGLE, size: 6 } },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: 20,
          color: '111827',
          font: 'Arial',
        }),
      ],
    });

  leftCol.push(addLeftTitle('Contact'));
  const timelineContactList = [
    { icon: '📞 ', label: 'Phone', val: data.personalInfo.phone },
    { icon: '✉ ', label: 'Email', val: data.personalInfo.email },
    { icon: '📍 ', label: 'Location', val: data.personalInfo.location },
    { icon: 'in ', label: 'LinkedIn', val: cleanUrl(data.personalInfo.linkedin), isLinkedIn: true },
    { icon: '🌐 ', label: 'Website', val: cleanUrl(data.personalInfo.website) },
  ].filter((c) => Boolean(c.val));

  timelineContactList.forEach((c) => {
    leftCol.push(
      new Paragraph({
        spacing: { after: 40 },
        children: [
          new TextRun({ text: c.icon, size: 16, color: '6B7280', bold: Boolean(c.isLinkedIn), font: c.isLinkedIn ? 'Arial' : 'Segoe UI Symbol' }),
          new TextRun({ text: c.val as string, size: 16, color: '111827', font: 'Arial' }),
        ],
      })
    );
  });

  if (data.skills.length > 0) {
    leftCol.push(addLeftTitle('Skills'));
    data.skills.forEach((s) => {
      leftCol.push(
        new Paragraph({
          spacing: { after: 35 },
          children: [
            new TextRun({ text: `• ${s.name}`, bold: true, size: 17, color: '111827', font: 'Arial' }),
            ...(s.level ? [new TextRun({ text: ` (${s.level})`, size: 14, color: '6B7280', font: 'Arial' })] : []),
          ],
        })
      );
    });
  }

  // Right Col Header Banner + Body
  rightCol.push(
    new Paragraph({
      spacing: { before: 40, after: 20 },
      children: [
        new TextRun({
          text: `${data.personalInfo.firstName} ${data.personalInfo.lastName}`,
          bold: true,
          size: 40,
          color: '111827',
          font: 'Arial',
        }),
      ],
    }),
    new Paragraph({
      spacing: { after: 150 },
      children: [
        new TextRun({
          text: data.personalInfo.title.toUpperCase(),
          size: 20,
          bold: true,
          color: themeColorText || '334155',
          font: 'Arial',
        }),
      ],
    })
  );

  const addRightTitle = (title: string) =>
    new Paragraph({
      spacing: { before: 180, after: 80 },
      border: { bottom: { color: 'E5E7EB', space: 2, style: BorderStyle.SINGLE, size: 6 } },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: 22,
          color: '111827',
          font: 'Arial',
        }),
      ],
    });

  if (data.summary) {
    rightCol.push(addRightTitle('Summary'));
    rightCol.push(
      new Paragraph({
        spacing: { after: 140 },
        children: [new TextRun({ text: data.summary, size: 19, color: '4B5563', font: 'Arial' })],
      })
    );
  }

  if (data.experience.length > 0) {
    rightCol.push(addRightTitle('Experience'));
    data.experience.forEach((exp) => {
      rightCol.push(
        new Paragraph({
          spacing: { before: 80, after: 20 },
          children: [
            new TextRun({ text: exp.position, bold: true, size: 21, color: '111827', font: 'Arial' }),
            new TextRun({ text: ` — ${exp.company}`, size: 19, bold: true, color: '4B5563', font: 'Arial' }),
            new TextRun({
              text: `  (${formatDate(exp.startDate)} - ${formatDate(exp.endDate)})`,
              size: 16,
              color: '6B7280',
              font: 'Arial',
            }),
          ],
        })
      );
      exp.description.forEach((desc) => {
        rightCol.push(
          new Paragraph({
            indent: { left: 200 },
            spacing: { after: 20 },
            children: [new TextRun({ text: `•  ${desc}`, size: 18, color: '4B5563', font: 'Arial' })],
          })
        );
      });
    });
  }

  if (data.education.length > 0) {
    rightCol.push(addRightTitle('Education'));
    data.education.forEach((edu) => {
      rightCol.push(
        new Paragraph({
          spacing: { after: 50 },
          children: [
            new TextRun({ text: edu.degree, bold: true, size: 18, color: '111827', font: 'Arial' }),
            new TextRun({ text: `\n${edu.institution}`, size: 16, color: '4B5563', font: 'Arial' }),
            new TextRun({
              text: `  (${formatEducationDates(edu.startDate, edu.endDate)})`,
              size: 14,
              color: '6B7280',
              font: 'Arial',
            }),
          ],
        })
      );
    });
  }

  if (nonEmptyProjects.length > 0) {
    rightCol.push(addRightTitle('Projects'));
    nonEmptyProjects.forEach((proj) => {
      rightCol.push(
        new Paragraph({
          spacing: { before: 80, after: 20 },
          children: [
            new TextRun({ text: proj.name, bold: true, size: 20, color: '111827', font: 'Arial' }),
            ...(proj.link
              ? [new TextRun({ text: `\n${cleanUrl(proj.link)}`, size: 16, color: themeColorText, font: 'Arial' })]
              : []),
          ],
        })
      );
      if (proj.description) {
        rightCol.push(
          new Paragraph({
            spacing: { after: 30 },
            children: [new TextRun({ text: proj.description, size: 18, color: '4B5563', font: 'Arial' })],
          })
        );
      }
    });
  }

  const table = new Table({
    borders: noBorders,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 32, type: WidthType.PERCENTAGE },
            shading: { fill: 'F3F4F6' },
            margins: { top: 300, bottom: 300, left: 300, right: 300 },
            children: leftCol,
          }),
          new TableCell({
            width: { size: 68, type: WidthType.PERCENTAGE },
            margins: { top: 300, bottom: 300, left: 350, right: 300 },
            children: rightCol,
          }),
        ],
      }),
    ],
  });

  return new Document({
    sections: [{ properties: { page: { margin: { top: 400, bottom: 400, left: 400, right: 400 } } }, children: [table] }],
  });
};

// =========================================================================
// 8. GEOMETRIC BLUE DOCX BUILDER (matches GeometricBluePDFLayout)
// =========================================================================
const buildGeometricBlueDocx = (data: ResumeData, themeColorBg: string, themeColorText: string, imageBytes?: DocxImageData | null): Document => {
  const nonEmptyProjects = getNonEmptyProjects(data);
  const leftCol: Paragraph[] = [];
  const rightCol: Paragraph[] = [];

  // Left Column
  if (imageBytes) {
    leftCol.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 40, after: 80 },
        children: [
          new ImageRun({
            data: imageBytes.data,
            transformation: { width: 75, height: 75 },
            type: imageBytes.type,
          }),
        ],
      })
    );
  }

  leftCol.push(
    new Paragraph({
      spacing: { before: 40, after: 20 },
      children: [
        new TextRun({ text: `${data.personalInfo.firstName}\n`, bold: true, size: 36, color: themeColorText || '2563EB', font: 'Arial' }),
        new TextRun({ text: `${data.personalInfo.lastName}`, bold: true, size: 36, color: '111827', font: 'Arial' }),
      ],
    }),
    new Paragraph({
      spacing: { after: 150 },
      children: [new TextRun({ text: data.personalInfo.title, size: 20, color: '4B5563', font: 'Arial' })],
    })
  );

  const addSideTitle = (title: string) =>
    new Paragraph({
      spacing: { before: 160, after: 60 },
      border: { bottom: { color: 'D1D5DB', space: 2, style: BorderStyle.SINGLE, size: 6 } },
      children: [new TextRun({ text: title.toUpperCase(), bold: true, size: 20, color: '1F2937', font: 'Arial' })],
    });

  leftCol.push(addSideTitle('Contact'));
  const geomContactList = [
    { icon: '📞 ', label: 'Phone', val: data.personalInfo.phone },
    { icon: '✉ ', label: 'Email', val: data.personalInfo.email },
    { icon: '📍 ', label: 'Location', val: data.personalInfo.location },
    { icon: 'in ', label: 'LinkedIn', val: cleanUrl(data.personalInfo.linkedin), isLinkedIn: true },
    { icon: '🌐 ', label: 'Website', val: cleanUrl(data.personalInfo.website) },
  ].filter((c) => Boolean(c.val));

  geomContactList.forEach((c) => {
    leftCol.push(
      new Paragraph({
        spacing: { after: 35 },
        children: [
          new TextRun({ text: c.icon, size: 15, color: themeColorText || '2563EB', bold: Boolean(c.isLinkedIn), font: c.isLinkedIn ? 'Arial' : 'Segoe UI Symbol' }),
          new TextRun({ text: `${c.val}`, size: 16, color: '4B5563', font: 'Arial' }),
        ],
      })
    );
  });

  if (data.summary) {
    leftCol.push(addSideTitle('About Me'));
    leftCol.push(
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: data.summary, size: 17, color: '4B5563', font: 'Arial' })],
      })
    );
  }

  if (data.skills.length > 0) {
    leftCol.push(addSideTitle('Skills'));
    data.skills.forEach((s) => {
      leftCol.push(
        new Paragraph({
          spacing: { after: 30 },
          children: [new TextRun({ text: `• ${s.name}`, size: 17, color: '1F2937', font: 'Arial' })],
        })
      );
    });
  }

  // Right Column
  const addMainTitle = (title: string) =>
    new Paragraph({
      spacing: { before: 160, after: 60 },
      border: { bottom: { color: themeColorBg || '3B82F6', space: 2, style: BorderStyle.SINGLE, size: 8 } },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: 22,
          color: themeColorText || '2563EB',
          font: 'Arial',
        }),
      ],
    });

  if (data.education.length > 0) {
    rightCol.push(addMainTitle('Education'));
    data.education.forEach((edu) => {
      rightCol.push(
        new Paragraph({
          spacing: { after: 40 },
          children: [
            new TextRun({ text: edu.degree, bold: true, size: 20, color: '111827', font: 'Arial' }),
            new TextRun({ text: `\n${edu.institution}`, size: 18, color: '4B5563', font: 'Arial' }),
            new TextRun({
              text: `  (${formatEducationDates(edu.startDate, edu.endDate)})`,
              size: 16,
              color: '6B7280',
              font: 'Arial',
            }),
          ],
        })
      );
    });
  }

  if (data.experience.length > 0) {
    rightCol.push(addMainTitle('Experience'));
    data.experience.forEach((exp) => {
      rightCol.push(
        new Paragraph({
          spacing: { before: 80, after: 20 },
          children: [
            new TextRun({ text: exp.position, bold: true, size: 20, color: '111827', font: 'Arial' }),
            new TextRun({ text: ` — ${exp.company}`, size: 19, bold: true, color: '4B5563', font: 'Arial' }),
            new TextRun({
              text: `  (${formatDate(exp.startDate)} - ${formatDate(exp.endDate)})`,
              size: 16,
              color: '6B7280',
              font: 'Arial',
            }),
          ],
        })
      );
      exp.description.forEach((desc) => {
        rightCol.push(
          new Paragraph({
            indent: { left: 200 },
            spacing: { after: 20 },
            children: [new TextRun({ text: `•  ${desc}`, size: 18, color: '4B5563', font: 'Arial' })],
          })
        );
      });
    });
  }

  if (nonEmptyProjects.length > 0) {
    rightCol.push(addMainTitle('Projects'));
    nonEmptyProjects.forEach((proj) => {
      rightCol.push(
        new Paragraph({
          spacing: { before: 80, after: 20 },
          children: [
            new TextRun({ text: proj.name, bold: true, size: 20, color: '111827', font: 'Arial' }),
            ...(proj.link
              ? [new TextRun({ text: `\n${cleanUrl(proj.link)}`, size: 16, color: themeColorText, font: 'Arial' })]
              : []),
          ],
        })
      );
      if (proj.description) {
        rightCol.push(
          new Paragraph({
            spacing: { after: 30 },
            children: [new TextRun({ text: proj.description, size: 18, color: '4B5563', font: 'Arial' })],
          })
        );
      }
    });
  }

  const table = new Table({
    borders: noBorders,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 36, type: WidthType.PERCENTAGE },
            margins: { top: 200, bottom: 200, left: 100, right: 250 },
            children: leftCol,
          }),
          new TableCell({
            width: { size: 64, type: WidthType.PERCENTAGE },
            margins: { top: 200, bottom: 200, left: 250, right: 100 },
            children: rightCol,
          }),
        ],
      }),
    ],
  });

  return new Document({
    sections: [{ properties: { page: { margin: { top: 500, bottom: 500, left: 500, right: 500 } } }, children: [table] }],
  });
};

// =========================================================================
// 9. PROFESSIONAL NAVY HEADER DOCX BUILDER (matches ProfessionalNavyHeaderPDFLayout)
// =========================================================================
const buildProfessionalNavyDocx = (data: ResumeData, themeColorBg: string, themeColorText: string, imageBytes?: DocxImageData | null): Document => {
  const nonEmptyProjects = getNonEmptyProjects(data);
  const leftCol: Paragraph[] = [];
  const rightCol: Paragraph[] = [];

  // Full-width Header Bar Table
  const headerCells: TableCell[] = [
    new TableCell({
      width: { size: imageBytes ? 75 : 100, type: WidthType.PERCENTAGE },
      shading: { fill: themeColorBg || '1E293B' },
      margins: { top: 350, bottom: 350, left: 350, right: 350 },
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: `${data.personalInfo.firstName} ${data.personalInfo.lastName}`,
              bold: true,
              size: 44,
              color: 'FFFFFF',
              font: 'Arial',
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 100 },
          children: [
            new TextRun({
              text: data.personalInfo.title,
              size: 20,
              color: '94A3B8',
              font: 'Arial',
            }),
          ],
        }),
        new Paragraph({
          children: getContactIconRuns(data.personalInfo, '94A3B8', 'D1D5DB', '   |   ', 18),
        }),
      ],
    }),
  ];

  if (imageBytes) {
    headerCells.push(
      new TableCell({
        width: { size: 25, type: WidthType.PERCENTAGE },
        shading: { fill: themeColorBg || '1E293B' },
        margins: { top: 350, bottom: 350, left: 200, right: 350 },
        children: [
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new ImageRun({
                data: imageBytes.data,
                transformation: { width: 65, height: 65 },
                type: imageBytes.type,
              }),
            ],
          }),
        ],
      })
    );
  }

  const headerTable = new Table({
    borders: noBorders,
    rows: [
      new TableRow({
        children: headerCells,
      }),
    ],
  });

  const addSectionTitle = (title: string) =>
    new Paragraph({
      spacing: { before: 180, after: 80 },
      border: { bottom: { color: 'E5E7EB', space: 2, style: BorderStyle.SINGLE, size: 12 } },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: 20,
          color: '374151',
          font: 'Arial',
        }),
      ],
    });

  if (data.summary) {
    leftCol.push(addSectionTitle('Summary'));
    leftCol.push(
      new Paragraph({
        spacing: { after: 140 },
        children: [new TextRun({ text: data.summary, size: 19, color: '4B5563', font: 'Arial' })],
      })
    );
  }

  if (data.experience.length > 0) {
    leftCol.push(addSectionTitle('Experience'));
    data.experience.forEach((exp) => {
      leftCol.push(
        new Paragraph({
          spacing: { before: 80, after: 20 },
          children: [
            new TextRun({ text: exp.position, bold: true, size: 21, color: '1F2937', font: 'Arial' }),
            new TextRun({ text: `\n${exp.company}`, size: 19, bold: true, color: themeColorText || '1E293B', font: 'Arial' }),
            new TextRun({
              text: `  (${formatDate(exp.startDate)} - ${formatDate(exp.endDate)})`,
              size: 16,
              color: '6B7280',
              font: 'Arial',
            }),
          ],
        })
      );
      exp.description.forEach((desc) => {
        leftCol.push(
          new Paragraph({
            indent: { left: 200 },
            spacing: { after: 20 },
            children: [new TextRun({ text: `•  ${desc}`, size: 18, color: '4B5563', font: 'Arial' })],
          })
        );
      });
    });
  }

  if (data.education.length > 0) {
    leftCol.push(addSectionTitle('Education'));
    data.education.forEach((edu) => {
      leftCol.push(
        new Paragraph({
          spacing: { after: 40 },
          children: [
            new TextRun({ text: edu.degree, bold: true, size: 20, color: '1F2937', font: 'Arial' }),
            new TextRun({ text: `\n${edu.institution}`, size: 19, color: themeColorText || '1E293B', font: 'Arial' }),
            new TextRun({
              text: `  (${formatEducationDates(edu.startDate, edu.endDate)})`,
              size: 16,
              color: '6B7280',
              font: 'Arial',
            }),
          ],
        })
      );
    });
  }

  // Right Column: Strengths & Skills
  if (nonEmptyProjects.length > 0) {
    rightCol.push(addSectionTitle('Strengths / Projects'));
    nonEmptyProjects.forEach((proj) => {
      rightCol.push(
        new Paragraph({
          spacing: { before: 60, after: 20 },
          children: [
            new TextRun({ text: `★ ${proj.name}`, bold: true, size: 19, color: '1F2937', font: 'Arial' }),
            ...(proj.description
              ? [new TextRun({ text: `\n${proj.description}`, size: 17, color: '4B5563', font: 'Arial' })]
              : []),
          ],
        })
      );
    });
  }

  if (data.skills.length > 0) {
    rightCol.push(addSectionTitle('Skills'));
    data.skills.forEach((s) => {
      rightCol.push(
        new Paragraph({
          spacing: { after: 30 },
          children: [new TextRun({ text: `• ${s.name}`, bold: true, size: 18, color: '1F2937', font: 'Arial' })],
        })
      );
    });
  }

  const bodyTable = new Table({
    borders: noBorders,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 65, type: WidthType.PERCENTAGE },
            margins: { top: 200, bottom: 200, left: 300, right: 300 },
            children: leftCol,
          }),
          new TableCell({
            width: { size: 35, type: WidthType.PERCENTAGE },
            margins: { top: 200, bottom: 200, left: 200, right: 300 },
            children: rightCol,
          }),
        ],
      }),
    ],
  });

  return new Document({
    sections: [{ properties: { page: { margin: { top: 400, bottom: 400, left: 400, right: 400 } } }, children: [headerTable, bodyTable] }],
  });
};

// =========================================================================
// 10. CLEAN BLUE DOCX BUILDER (matches CleanBlueAccentPDFLayout)
// =========================================================================
const buildCleanBlueDocx = (data: ResumeData, themeColorBg: string, themeColorText: string, imageBytes?: DocxImageData | null): Document => {
  const nonEmptyProjects = getNonEmptyProjects(data);
  const leftCol: Paragraph[] = [];
  const rightCol: Paragraph[] = [];

  const headerChildren: Paragraph[] = [];

  if (imageBytes) {
    headerChildren.push(
      new Paragraph({
        spacing: { before: 80, after: 30 },
        children: [
          new ImageRun({
            data: imageBytes.data,
            transformation: { width: 70, height: 70 },
            type: imageBytes.type,
          }),
        ],
      })
    );
  }

  headerChildren.push(
    new Paragraph({
      spacing: { before: 80, after: 20 },
      children: [
        new TextRun({
          text: `${data.personalInfo.firstName} ${data.personalInfo.lastName}`.toUpperCase(),
          bold: true,
          size: 46,
          color: '111827',
          font: 'Arial',
        }),
      ],
    }),
    new Paragraph({
      spacing: { after: 60 },
      children: [
        new TextRun({
          text: data.personalInfo.title,
          size: 24,
          bold: true,
          color: themeColorText || '2563EB',
          font: 'Arial',
        }),
      ],
    }),
    new Paragraph({
      spacing: { after: 180 },
      children: getContactIconRuns(data.personalInfo, themeColorText || '2563EB', '374151', '   |   ', 18),
    }),
  );

  const addSecTitle = (title: string) =>
    new Paragraph({
      spacing: { before: 160, after: 60 },
      border: { bottom: { color: '000000', space: 2, style: BorderStyle.SINGLE, size: 18 } },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: 22,
          color: '111827',
          font: 'Arial',
        }),
      ],
    });

  if (data.summary) {
    leftCol.push(addSecTitle('Summary'));
    leftCol.push(
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun({ text: data.summary, size: 19, color: '374151', font: 'Arial' })],
      })
    );
  }

  if (data.experience.length > 0) {
    leftCol.push(addSecTitle('Experience'));
    data.experience.forEach((exp) => {
      leftCol.push(
        new Paragraph({
          spacing: { before: 80, after: 20 },
          children: [
            new TextRun({ text: exp.position, bold: true, size: 21, color: '1F2937', font: 'Arial' }),
            new TextRun({ text: `\n${exp.company}`, size: 19, bold: true, color: themeColorText || '2563EB', font: 'Arial' }),
            new TextRun({
              text: `  (${formatDate(exp.startDate)} - ${formatDate(exp.endDate)})`,
              size: 16,
              color: '6B7280',
              font: 'Arial',
            }),
          ],
        })
      );
      exp.description.forEach((desc) => {
        leftCol.push(
          new Paragraph({
            indent: { left: 200 },
            spacing: { after: 20 },
            children: [new TextRun({ text: `•  ${desc}`, size: 18, color: '374151', font: 'Arial' })],
          })
        );
      });
    });
  }

  if (data.education.length > 0) {
    leftCol.push(addSecTitle('Education'));
    data.education.forEach((edu) => {
      leftCol.push(
        new Paragraph({
          spacing: { after: 40 },
          children: [
            new TextRun({ text: edu.degree, bold: true, size: 20, color: '111827', font: 'Arial' }),
            new TextRun({ text: `\n${edu.institution}`, size: 19, color: themeColorText || '2563EB', font: 'Arial' }),
            new TextRun({
              text: `  (${formatEducationDates(edu.startDate, edu.endDate)})`,
              size: 16,
              color: '6B7280',
              font: 'Arial',
            }),
          ],
        })
      );
    });
  }

  // Right column: Projects, Custom Sections, Skills
  if (nonEmptyProjects.length > 0) {
    rightCol.push(addSecTitle('Projects'));
    nonEmptyProjects.forEach((proj) => {
      rightCol.push(
        new Paragraph({
          spacing: { before: 80, after: 20 },
          children: [
            new TextRun({ text: proj.name, bold: true, size: 20, color: '111827', font: 'Arial' }),
            ...(proj.link
              ? [new TextRun({ text: `\n${cleanUrl(proj.link)}`, size: 16, color: themeColorText || '2563EB', font: 'Arial' })]
              : []),
          ],
        })
      );
      if (proj.description) {
        rightCol.push(
          new Paragraph({
            spacing: { after: 30 },
            children: [new TextRun({ text: proj.description, size: 18, color: '374151', font: 'Arial' })],
          })
        );
      }
    });
  }

  if (data.customSections && data.customSections.length > 0) {
    data.customSections.forEach((sec) => {
      if (sec.items.length === 0) return;
      rightCol.push(addSecTitle(sec.title));
      sec.items.forEach((item) => {
        rightCol.push(
          new Paragraph({
            spacing: { after: 20 },
            children: [
              new TextRun({ text: `★ ${item.name}`, bold: true, size: 18, color: '111827', font: 'Arial' }),
              ...(item.description
                ? [new TextRun({ text: `\n${item.description}`, size: 16, color: '4B5563', font: 'Arial' })]
                : []),
            ],
          })
        );
      });
    });
  }

  if (data.skills.length > 0) {
    rightCol.push(addSecTitle('Skills'));
    data.skills.forEach((s) => {
      rightCol.push(
        new Paragraph({
          spacing: { after: 30 },
          border: { bottom: { color: 'D1D5DB', space: 2, style: BorderStyle.SINGLE, size: 6 } },
          children: [new TextRun({ text: s.name, bold: true, size: 19, color: '1F2937', font: 'Arial' })],
        })
      );
    });
  }

  const table = new Table({
    borders: noBorders,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            margins: { top: 100, bottom: 200, left: 0, right: 200 },
            children: leftCol,
          }),
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            margins: { top: 100, bottom: 200, left: 200, right: 0 },
            children: rightCol,
          }),
        ],
      }),
    ],
  });

  return new Document({
    sections: [{ properties: { page: { margin: { top: 600, bottom: 600, left: 600, right: 600 } } }, children: [...headerChildren, table] }],
  });
};

// =========================================================================
// 11. CLASSIC SPLIT DOCX BUILDER (matches ClassicSplitPDFLayout)
// =========================================================================
const buildClassicSplitDocx = (data: ResumeData, themeColorBg: string, themeColorText: string, imageBytes?: DocxImageData | null): Document => {
  const nonEmptyProjects = getNonEmptyProjects(data);
  const leftCol: Paragraph[] = [];
  const rightCol: Paragraph[] = [];

  // Header 2-column table
  const headerLeft: Paragraph[] = [];

  if (imageBytes) {
    headerLeft.push(
      new Paragraph({
        spacing: { after: 40 },
        children: [
          new ImageRun({
            data: imageBytes.data,
            transformation: { width: 60, height: 60 },
            type: imageBytes.type,
          }),
        ],
      })
    );
  }

  headerLeft.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `${data.personalInfo.firstName} ${data.personalInfo.lastName}`,
          bold: true,
          size: 40,
          color: '111827',
          font: 'Arial',
        }),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: data.personalInfo.title,
          size: 20,
          color: '4B5563',
          font: 'Arial',
        }),
      ],
    }),
  );

  const headerRight: Paragraph[] = [];
  const classicContactList = [
    { icon: '📞 ', label: 'Phone', val: data.personalInfo.phone },
    { icon: '✉ ', label: 'Email', val: data.personalInfo.email },
    { icon: '📍 ', label: 'Location', val: data.personalInfo.location },
    { icon: 'in ', label: 'LinkedIn', val: cleanUrl(data.personalInfo.linkedin), isLinkedIn: true },
    { icon: '🌐 ', label: 'Website', val: cleanUrl(data.personalInfo.website) },
  ].filter((c) => Boolean(c.val));

  classicContactList.forEach((c) => {
    headerRight.push(
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        spacing: { after: 20 },
        children: [
          new TextRun({ text: `${c.icon} `, size: 15, color: themeColorText || '6B7280', bold: Boolean(c.isLinkedIn), font: c.isLinkedIn ? 'Arial' : 'Segoe UI Symbol' }),
          new TextRun({ text: c.val as string, size: 16, color: '374151', font: 'Arial' }),
        ],
      })
    );
  });

  const headerTable = new Table({
    borders: noBorders,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 55, type: WidthType.PERCENTAGE },
            margins: { top: 100, bottom: 100, left: 0, right: 100 },
            children: headerLeft,
          }),
          new TableCell({
            width: { size: 45, type: WidthType.PERCENTAGE },
            margins: { top: 100, bottom: 100, left: 100, right: 0 },
            children: headerRight,
          }),
        ],
      }),
    ],
  });

  const summaryElements: Paragraph[] = [];
  if (data.summary) {
    summaryElements.push(
      new Paragraph({
        spacing: { before: 160, after: 60 },
        border: { bottom: { color: '111827', space: 2, style: BorderStyle.SINGLE, size: 12 } },
        children: [new TextRun({ text: 'SUMMARY', bold: true, size: 20, color: '111827', font: 'Arial' })],
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun({ text: data.summary, size: 18, color: '374151', font: 'Arial' })],
      })
    );
  }

  // Left column: Education, Skills, Custom Sections (38%)
  const addLeftTitle = (title: string) =>
    new Paragraph({
      spacing: { before: 140, after: 40 },
      border: { bottom: { color: '111827', space: 2, style: BorderStyle.SINGLE, size: 10 } },
      children: [new TextRun({ text: title.toUpperCase(), bold: true, size: 19, color: '111827', font: 'Arial' })],
    });

  if (data.education.length > 0) {
    leftCol.push(addLeftTitle('Education'));
    data.education.forEach((edu) => {
      leftCol.push(
        new Paragraph({
          spacing: { after: 30 },
          children: [
            new TextRun({ text: edu.institution, bold: true, size: 18, color: '111827', font: 'Arial' }),
            new TextRun({
              text: `\n${edu.degree}${edu.field ? ` in ${edu.field}` : ''} (${formatEducationDates(edu.startDate, edu.endDate)})`,
              size: 16,
              color: '4B5563',
              font: 'Arial',
            }),
          ],
        })
      );
    });
  }

  if (data.skills.length > 0) {
    leftCol.push(addLeftTitle('Skills'));
    data.skills.forEach((s) => {
      leftCol.push(
        new Paragraph({
          spacing: { after: 20 },
          children: [new TextRun({ text: `• ${s.name}`, size: 17, color: '374151', font: 'Arial' })],
        })
      );
    });
  }

  if (data.customSections && data.customSections.length > 0) {
    data.customSections.forEach((sec) => {
      if (sec.items.length === 0) return;
      leftCol.push(addLeftTitle(sec.title));
      sec.items.forEach((item) => {
        leftCol.push(
          new Paragraph({
            spacing: { after: 20 },
            children: [
              new TextRun({ text: `• ${item.name}`, bold: true, size: 17, color: '111827', font: 'Arial' }),
              ...(item.description
                ? [new TextRun({ text: ` - ${item.description}`, size: 16, color: '4B5563', font: 'Arial' })]
                : []),
            ],
          })
        );
      });
    });
  }

  // Right column: Experience, Projects (62%)
  const addRightTitle = (title: string) =>
    new Paragraph({
      spacing: { before: 140, after: 40 },
      border: { bottom: { color: '111827', space: 2, style: BorderStyle.SINGLE, size: 10 } },
      children: [new TextRun({ text: title.toUpperCase(), bold: true, size: 19, color: '111827', font: 'Arial' })],
    });

  if (data.experience.length > 0) {
    rightCol.push(addRightTitle('Professional Experience'));
    data.experience.forEach((exp) => {
      rightCol.push(
        new Paragraph({
          spacing: { before: 60, after: 20 },
          children: [
            new TextRun({ text: exp.position, bold: true, size: 20, color: '111827', font: 'Arial' }),
            new TextRun({
              text: `\n${exp.company}  |  ${formatDate(exp.startDate)} - ${formatDate(exp.endDate)}`,
              size: 16,
              color: '4B5563',
              font: 'Arial',
            }),
          ],
        })
      );
      exp.description.forEach((desc) => {
        rightCol.push(
          new Paragraph({
            indent: { left: 180 },
            spacing: { after: 15 },
            children: [new TextRun({ text: `• ${desc}`, size: 17, color: '374151', font: 'Arial' })],
          })
        );
      });
    });
  }

  if (nonEmptyProjects.length > 0) {
    rightCol.push(addRightTitle('Projects'));
    nonEmptyProjects.forEach((proj) => {
      rightCol.push(
        new Paragraph({
          spacing: { before: 60, after: 15 },
          children: [
            new TextRun({ text: `Title: `, bold: true, size: 18, color: '111827', font: 'Arial' }),
            new TextRun({ text: proj.name, size: 18, color: '374151', font: 'Arial' }),
            ...(proj.technologies && proj.technologies.length > 0
              ? [
                  new TextRun({ text: `\nTechnologies: `, bold: true, size: 16, color: '111827', font: 'Arial' }),
                  new TextRun({ text: proj.technologies.join(', '), size: 16, color: '4B5563', font: 'Arial' }),
                ]
              : []),
            ...(proj.link
              ? [
                  new TextRun({ text: `\nLink: `, bold: true, size: 16, color: '111827', font: 'Arial' }),
                  new TextRun({ text: proj.link, size: 16, color: '2563EB', font: 'Arial' }),
                ]
              : []),
          ],
        })
      );
      if (proj.description) {
        rightCol.push(
          new Paragraph({
            spacing: { after: 25 },
            children: [new TextRun({ text: proj.description, size: 17, color: '374151', font: 'Arial' })],
          })
        );
      }
    });
  }

  const bodyTable = new Table({
    borders: noBorders,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 38, type: WidthType.PERCENTAGE },
            margins: { top: 100, bottom: 100, left: 0, right: 200 },
            children: leftCol,
          }),
          new TableCell({
            width: { size: 62, type: WidthType.PERCENTAGE },
            margins: { top: 100, bottom: 100, left: 200, right: 0 },
            children: rightCol,
          }),
        ],
      }),
    ],
  });

  return new Document({
    sections: [{ properties: { page: { margin: { top: 500, bottom: 500, left: 500, right: 500 } } }, children: [headerTable, ...summaryElements, bodyTable] }],
  });
};

// =========================================================================
// 12. DEVELOPER PORTFOLIO DOCX BUILDER (matches DeveloperPortfolioPDFLayout)
// =========================================================================
const buildDeveloperPortfolioDocx = (data: ResumeData, themeColorBg: string, themeColorText: string, imageBytes?: DocxImageData | null): Document => {
  const nonEmptyProjects = getNonEmptyProjects(data);
  const children: (Paragraph | Table)[] = [];

  // Header: Name & Title Left, Contact Grid Right
  const headerLeft: Paragraph[] = [];

  if (imageBytes) {
    headerLeft.push(
      new Paragraph({
        spacing: { after: 40 },
        children: [
          new ImageRun({
            data: imageBytes.data,
            transformation: { width: 60, height: 60 },
            type: imageBytes.type,
          }),
        ],
      })
    );
  }

  headerLeft.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `${data.personalInfo.firstName} ${data.personalInfo.lastName}`,
          bold: true,
          size: 40,
          color: '0F172A',
          font: 'Arial',
        }),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: data.personalInfo.title.toUpperCase(),
          size: 18,
          bold: true,
          color: themeColorText || '0369A1',
          font: 'Arial',
        }),
      ],
    }),
  );

  const headerRightCol1: Paragraph[] = [];
  const headerRightCol2: Paragraph[] = [];

  if (data.personalInfo.email) {
    headerRightCol1.push(
      new Paragraph({
        spacing: { after: 14 },
        children: [
          new TextRun({ text: '✉  ', size: 16, color: themeColorBg || '0284C7', font: 'Segoe UI Symbol' }),
          new TextRun({ text: data.personalInfo.email, size: 16, color: '475569', font: 'Arial' }),
        ],
      })
    );
  }
  if (data.personalInfo.phone) {
    headerRightCol1.push(
      new Paragraph({
        spacing: { after: 14 },
        children: [
          new TextRun({ text: '📞  ', size: 16, color: themeColorBg || '0284C7', font: 'Segoe UI Symbol' }),
          new TextRun({ text: data.personalInfo.phone, size: 16, color: '475569', font: 'Arial' }),
        ],
      })
    );
  }
  if (data.personalInfo.location) {
    headerRightCol1.push(
      new Paragraph({
        spacing: { after: 14 },
        children: [
          new TextRun({ text: '📍  ', size: 16, color: themeColorBg || '0284C7', font: 'Segoe UI Symbol' }),
          new TextRun({ text: data.personalInfo.location, size: 16, color: '475569', font: 'Arial' }),
        ],
      })
    );
  }

  if (data.personalInfo.website) {
    headerRightCol2.push(
      new Paragraph({
        spacing: { after: 14 },
        children: [
          new TextRun({ text: '🌐  ', size: 16, color: themeColorBg || '0284C7', font: 'Segoe UI Symbol' }),
          new TextRun({ text: cleanUrl(data.personalInfo.website), size: 16, color: '475569', font: 'Arial' }),
        ],
      })
    );
  }
  if (data.personalInfo.linkedin) {
    headerRightCol2.push(
      new Paragraph({
        spacing: { after: 14 },
        children: [
          new TextRun({ text: 'in  ', bold: true, size: 16, color: themeColorBg || '0284C7', font: 'Arial' }),
          new TextRun({ text: cleanUrl(data.personalInfo.linkedin), size: 16, color: '475569', font: 'Arial' }),
        ],
      })
    );
  }

  children.push(
    new Table({
      borders: noBorders,
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 48, type: WidthType.PERCENTAGE },
              margins: { top: 0, bottom: 60, left: 0, right: 40 },
              children: headerLeft,
            }),
            new TableCell({
              width: { size: 26, type: WidthType.PERCENTAGE },
              margins: { top: 0, bottom: 60, left: 20, right: 20 },
              children: headerRightCol1,
            }),
            new TableCell({
              width: { size: 26, type: WidthType.PERCENTAGE },
              margins: { top: 0, bottom: 60, left: 20, right: 0 },
              children: headerRightCol2,
            }),
          ],
        }),
      ],
    }),
    new Paragraph({
      spacing: { after: 150 },
      border: { bottom: { color: '0F172A', space: 2, style: BorderStyle.SINGLE, size: 12 } },
      children: [],
    })
  );

  const addSecTitle = (title: string) =>
    new Paragraph({
      spacing: { before: 160, after: 60 },
      border: { bottom: { color: 'CBD5E1', space: 2, style: BorderStyle.SINGLE, size: 8 } },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: 20,
          color: '0F172A',
          font: 'Arial',
        }),
      ],
    });

  if (data.summary) {
    children.push(addSecTitle('Professional Summary'));
    children.push(
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun({ text: data.summary, size: 18, color: '334155', font: 'Arial' })],
      })
    );
  }

  if (data.skills.length > 0) {
    children.push(addSecTitle('Technical Skills'));
    const categories: Record<string, string[]> = {};
    data.skills.forEach((skill) => {
      const cat = skill.category?.trim() || 'Core Technologies';
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(skill.name);
    });

    const categoryEntries = Object.entries(categories);
    const skillRows: TableRow[] = [];
    for (let i = 0; i < categoryEntries.length; i += 2) {
      const [c1, s1] = categoryEntries[i];
      const second = categoryEntries[i + 1];
      skillRows.push(
        new TableRow({
          children: [
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              margins: { top: 40, bottom: 40, left: 0, right: 100 },
              children: [
                new Paragraph({
                  spacing: { after: 20 },
                  children: [
                    new TextRun({ text: `${c1}: `, bold: true, size: 17, color: '0F172A', font: 'Arial' }),
                    new TextRun({ text: s1.join(', '), size: 17, color: '334155', font: 'Arial' }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              margins: { top: 40, bottom: 40, left: 100, right: 0 },
              children: second
                ? [
                    new Paragraph({
                      spacing: { after: 20 },
                      children: [
                        new TextRun({ text: `${second[0]}: `, bold: true, size: 17, color: '0F172A', font: 'Arial' }),
                        new TextRun({ text: second[1].join(', '), size: 17, color: '334155', font: 'Arial' }),
                      ],
                    }),
                  ]
                : [new Paragraph({ children: [] })],
            }),
          ],
        })
      );
    }
    children.push(new Table({ borders: noBorders, rows: skillRows }));
  }

  if (data.experience.length > 0) {
    children.push(addSecTitle('Work Experience'));
    data.experience.forEach((exp) => {
      children.push(
        new Paragraph({
          spacing: { before: 60, after: 20 },
          children: [
            new TextRun({ text: exp.position, bold: true, size: 19, color: '0F172A', font: 'Arial' }),
            new TextRun({ text: ` — ${exp.company}`, bold: true, size: 19, color: themeColorText || '0369A1', font: 'Arial' }),
            new TextRun({
              text: `  (${formatDate(exp.startDate)} - ${formatDate(exp.endDate)})`,
              size: 16,
              color: '64748B',
              font: 'Arial',
            }),
          ],
        })
      );
      exp.description.forEach((desc) => {
        children.push(
          new Paragraph({
            indent: { left: 200 },
            spacing: { after: 15 },
            children: [new TextRun({ text: `• ${desc}`, size: 17, color: '334155', font: 'Arial' })],
          })
        );
      });
    });
  }

  if (nonEmptyProjects.length > 0) {
    children.push(addSecTitle('Technical Projects'));
    nonEmptyProjects.forEach((proj) => {
      children.push(
        new Paragraph({
          spacing: { before: 60, after: 15 },
          children: [
            new TextRun({ text: proj.name, bold: true, size: 19, color: '0F172A', font: 'Arial' }),
            ...(proj.technologies && proj.technologies.length > 0
              ? [
                  new TextRun({
                    text: ` (${proj.technologies.join(' · ')})`,
                    bold: true,
                    size: 16,
                    color: themeColorText || '0369A1',
                    font: 'Arial',
                  }),
                ]
              : []),
            ...(proj.link
              ? [new TextRun({ text: `\n${cleanUrl(proj.link)}`, size: 15, color: '64748B', font: 'Arial' })]
              : []),
          ],
        })
      );
      if (proj.description) {
        proj.description
          .split('\n')
          .filter((l) => l.trim())
          .forEach((line) => {
            children.push(
              new Paragraph({
                indent: { left: 200 },
                spacing: { after: 15 },
                children: [new TextRun({ text: `• ${line.trim()}`, size: 17, color: '334155', font: 'Arial' })],
              })
            );
          });
      }
    });
  }

  if (data.education.length > 0) {
    children.push(addSecTitle('Education'));
    const eduRows: TableRow[] = [];
    data.education.forEach((edu) => {
      eduRows.push(
        new TableRow({
          children: [
            new TableCell({
              width: { size: 75, type: WidthType.PERCENTAGE },
              margins: { top: 40, bottom: 40, left: 0, right: 100 },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: edu.degree, bold: true, size: 19, color: '0F172A', font: 'Arial' }),
                  ],
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `${edu.institution}${edu.field && edu.field !== edu.degree ? ` — ${edu.field}` : ''}${edu.gpa ? ` (GPA: ${edu.gpa})` : ''}`,
                      size: 17,
                      color: '475569',
                      font: 'Arial',
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: { size: 25, type: WidthType.PERCENTAGE },
              margins: { top: 40, bottom: 40, left: 100, right: 0 },
              children: [
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  children: [
                    new TextRun({
                      text: formatEducationDates(edu.startDate, edu.endDate),
                      bold: true,
                      size: 16,
                      color: '64748B',
                      font: 'Arial',
                    }),
                  ],
                }),
              ],
            }),
          ],
        })
      );
    });
    children.push(new Table({ borders: noBorders, rows: eduRows }));
  }

  if (data.customSections && data.customSections.length > 0) {
    data.customSections.forEach((section) => {
      if (section.items && section.items.length > 0) {
        children.push(addSecTitle(section.title));
        const rows: TableRow[] = [];
        for (let i = 0; i < section.items.length; i += 2) {
          const item1 = section.items[i];
          const item2 = section.items[i + 1];
          rows.push(
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 50, type: WidthType.PERCENTAGE },
                  borders: {
                    top: { style: BorderStyle.SINGLE, size: 4, color: 'E2E8F0' },
                    bottom: { style: BorderStyle.SINGLE, size: 4, color: 'E2E8F0' },
                    left: { style: BorderStyle.SINGLE, size: 4, color: 'E2E8F0' },
                    right: { style: BorderStyle.SINGLE, size: 4, color: 'E2E8F0' },
                  },
                  shading: { fill: 'F8FAFC' },
                  margins: { top: 120, bottom: 120, left: 150, right: 150 },
                  children: [
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      children: [
                        new TextRun({ text: item1.name, bold: true, size: 17, color: '0F172A', font: 'Arial' }),
                        ...(item1.description
                          ? [new TextRun({ text: `\n${item1.description}`, size: 15, color: '475569', font: 'Arial' })]
                          : []),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  width: { size: 50, type: WidthType.PERCENTAGE },
                  borders: item2
                    ? {
                        top: { style: BorderStyle.SINGLE, size: 4, color: 'E2E8F0' },
                        bottom: { style: BorderStyle.SINGLE, size: 4, color: 'E2E8F0' },
                        left: { style: BorderStyle.SINGLE, size: 4, color: 'E2E8F0' },
                        right: { style: BorderStyle.SINGLE, size: 4, color: 'E2E8F0' },
                      }
                    : noBorders,
                  shading: item2 ? { fill: 'F8FAFC' } : undefined,
                  margins: { top: 120, bottom: 120, left: 150, right: 150 },
                  children: item2
                    ? [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({ text: item2.name, bold: true, size: 17, color: '0F172A', font: 'Arial' }),
                            ...(item2.description
                              ? [new TextRun({ text: `\n${item2.description}`, size: 15, color: '475569', font: 'Arial' })]
                              : []),
                          ],
                        }),
                      ]
                    : [new Paragraph({ children: [] })],
                }),
              ],
            })
          );
        }
        children.push(new Table({ borders: noBorders, rows }));
      }
    });
  }

  return new Document({
    sections: [{ properties: { page: { margin: { top: 500, bottom: 500, left: 500, right: 500 } } }, children }],
  });
};

// =========================================================================
// CREATE RESUME DOCUMENT (Master Router)
// =========================================================================
const createResumeDocument = (data: ResumeData, templateId?: string, imageBytes?: DocxImageData | null): Document => {
  const safeTemplateId = String(templateId || 'modern-professional');

  // Default color values matching ResumePDF.tsx
  let defaultThemeColorText = '#2563EB';
  let defaultThemeColorBg = '#2563EB';

  if (safeTemplateId === 'modern-professional') {
    defaultThemeColorText = '#2563EB'; defaultThemeColorBg = '#2563EB';
  } else if (safeTemplateId === 'creative-designer') {
    defaultThemeColorText = '#9333EA'; defaultThemeColorBg = '#9333EA';
  } else if (safeTemplateId === 'executive-premium') {
    defaultThemeColorText = '#1F2937'; defaultThemeColorBg = '#1F2937';
  } else if (safeTemplateId === 'entry-level') {
    defaultThemeColorText = '#16A34A'; defaultThemeColorBg = '#16A34A';
  } else if (safeTemplateId === 'marketing-specialist') {
    defaultThemeColorText = '#4F46E5'; defaultThemeColorBg = '#4F46E5';
  } else if (safeTemplateId === 'healthcare-professional' || safeTemplateId === 'healthcare-nursing') {
    defaultThemeColorText = '#0D9488'; defaultThemeColorBg = '#0D9488';
  } else if (safeTemplateId === 'minimalist-elegant') {
    defaultThemeColorText = '#111827'; defaultThemeColorBg = '#111827';
  } else if (safeTemplateId === 'tech-innovator') {
    defaultThemeColorText = '#0891B2'; defaultThemeColorBg = '#0891B2';
  } else if (safeTemplateId === 'sales-professional' || safeTemplateId === 'sales-representative') {
    defaultThemeColorText = '#EA580C'; defaultThemeColorBg = '#EA580C';
  } else if (safeTemplateId === 'academic-researcher') {
    defaultThemeColorText = '#B91C1C'; defaultThemeColorBg = '#B91C1C';
  } else if (safeTemplateId === 'navy-professional') {
    defaultThemeColorText = '#1E293B'; defaultThemeColorBg = '#1E293B';
  } else if (safeTemplateId === 'charcoal-executive') {
    defaultThemeColorText = '#27272A'; defaultThemeColorBg = '#27272A';
  } else if (safeTemplateId === 'forest-modern') {
    defaultThemeColorText = '#065F46'; defaultThemeColorBg = '#065F46';
  } else if (safeTemplateId === 'modern-yellow') {
    defaultThemeColorText = '#ca8a04'; defaultThemeColorBg = '#eab308';
  } else if (safeTemplateId === 'navy-sidebar') {
    defaultThemeColorText = '#1e3a8a'; defaultThemeColorBg = '#1e40af';
  } else if (safeTemplateId === 'formal-red') {
    defaultThemeColorText = '#be123c'; defaultThemeColorBg = '#be123c';
  } else if (safeTemplateId === 'timeline-dark') {
    defaultThemeColorText = '#1e293b'; defaultThemeColorBg = '#334155';
  } else if (safeTemplateId === 'geometric-blue') {
    defaultThemeColorText = '#2563eb'; defaultThemeColorBg = '#3b82f6';
  } else if (safeTemplateId === 'professional-navy') {
    defaultThemeColorText = '#1E293B'; defaultThemeColorBg = '#1E293B';
  } else if (safeTemplateId === 'clean-blue') {
    defaultThemeColorText = '#2563EB'; defaultThemeColorBg = '#2563EB';
  } else if (safeTemplateId === 'classic-split') {
    defaultThemeColorText = '#1F2937'; defaultThemeColorBg = '#1F2937';
  } else if (safeTemplateId === 'developer-portfolio') {
    defaultThemeColorText = '#0369a1'; defaultThemeColorBg = '#0284c7';
  } else if (safeTemplateId === 'fresher-cs-engineer') {
    defaultThemeColorText = '#1D4ED8'; defaultThemeColorBg = '#2563EB';
  } else if (safeTemplateId === 'fresher-ece-embedded') {
    defaultThemeColorText = '#0369A1'; defaultThemeColorBg = '#0284C7';
  } else if (safeTemplateId === 'fresher-frontend-dev') {
    defaultThemeColorText = '#0369A1'; defaultThemeColorBg = '#0284C7';
  } else if (safeTemplateId === 'fresher-java-backend') {
    defaultThemeColorText = '#B91C1C'; defaultThemeColorBg = '#DC2626';
  } else if (safeTemplateId === 'fresher-data-analyst') {
    defaultThemeColorText = '#047857'; defaultThemeColorBg = '#059669';
  } else if (safeTemplateId === 'fresher-cloud-devops') {
    defaultThemeColorText = '#6D28D9'; defaultThemeColorBg = '#7C3AED';
  } else if (safeTemplateId === 'fresher-business-analyst') {
    defaultThemeColorText = '#B45309'; defaultThemeColorBg = '#D97706';
  }

  const themeColorText = hexToDocxColor(data.theme?.textColor || defaultThemeColorText);
  const themeColorBg = hexToDocxColor(data.theme?.themeColor || defaultThemeColorBg);

  if (safeTemplateId === 'modern-yellow') {
    return buildYellowSidebarDocx(data, themeColorBg, themeColorText, imageBytes);
  } else if (safeTemplateId === 'navy-sidebar' || safeTemplateId === 'fresher-data-analyst') {
    return buildNavySidebarDocx(data, themeColorBg, themeColorText, imageBytes);
  } else if (safeTemplateId === 'formal-red') {
    return buildFormalRedDocx(data, themeColorBg, themeColorText, imageBytes);
  } else if (safeTemplateId === 'timeline-dark' || safeTemplateId === 'fresher-frontend-dev') {
    return buildTimelineDarkDocx(data, themeColorBg, themeColorText, imageBytes);
  } else if (safeTemplateId === 'geometric-blue' || safeTemplateId === 'fresher-cloud-devops') {
    return buildGeometricBlueDocx(data, themeColorBg, themeColorText, imageBytes);
  } else if (safeTemplateId === 'professional-navy') {
    return buildProfessionalNavyDocx(data, themeColorBg, themeColorText, imageBytes);
  } else if (safeTemplateId === 'clean-blue') {
    return buildCleanBlueDocx(data, themeColorBg, themeColorText, imageBytes);
  } else if (safeTemplateId === 'classic-split') {
    return buildClassicSplitDocx(data, themeColorBg, themeColorText, imageBytes);
  } else if (safeTemplateId === 'developer-portfolio' || safeTemplateId === 'fresher-cs-engineer' || safeTemplateId === 'fresher-ece-embedded') {
    return buildDeveloperPortfolioDocx(data, themeColorBg, themeColorText, imageBytes);
  } else if (isTwoColumnResumeTemplate(safeTemplateId)) {
    return buildTwoColumnDocx(data, themeColorBg, themeColorText, imageBytes);
  } else if (isCenteredResumeTemplate(safeTemplateId)) {
    return buildCenteredDocx(data, themeColorBg, themeColorText, imageBytes);
  } else {
    return buildStandardDocx(data, themeColorBg, themeColorText, imageBytes);
  }
};

// =========================================================================
// CREATE COVER LETTER DOCUMENT
// =========================================================================
const createCoverLetterDocument = (data: CoverLetterData): Document => {
  const children: Paragraph[] = [];

  // Sender Info
  children.push(
    new Paragraph({
      spacing: { before: 100, after: 30 },
      children: [
        new TextRun({
          text: data.senderInfo.name,
          bold: true,
          size: 32,
          color: '111827',
          font: 'Arial',
        }),
      ],
    }),
    new Paragraph({
      spacing: { after: 20 },
      children: [new TextRun({ text: data.senderInfo.address, size: 20, color: '4B5563', font: 'Arial' })],
    }),
    new Paragraph({
      spacing: { after: 20 },
      children: [new TextRun({ text: data.senderInfo.phone, size: 20, color: '4B5563', font: 'Arial' })],
    }),
    new Paragraph({
      spacing: { after: 200 },
      children: [new TextRun({ text: data.senderInfo.email, size: 20, color: '4B5563', font: 'Arial' })],
    })
  );

  // Date
  children.push(
    new Paragraph({
      spacing: { after: 200 },
      children: [new TextRun({ text: data.date, size: 22, color: '111827', font: 'Arial' })],
    })
  );

  // Recipient Info
  children.push(
    new Paragraph({
      spacing: { after: 20 },
      children: [new TextRun({ text: data.recipientInfo.name, bold: true, size: 22, color: '111827', font: 'Arial' })],
    })
  );
  if (data.recipientInfo.title) {
    children.push(
      new Paragraph({
        spacing: { after: 20 },
        children: [new TextRun({ text: data.recipientInfo.title, size: 22, color: '374151', font: 'Arial' })],
      })
    );
  }
  if (data.recipientInfo.company) {
    children.push(
      new Paragraph({
        spacing: { after: 20 },
        children: [new TextRun({ text: data.recipientInfo.company, size: 22, color: '374151', font: 'Arial' })],
      })
    );
  }
  children.push(
    new Paragraph({
      spacing: { after: 200 },
      children: [new TextRun({ text: data.recipientInfo.address, size: 22, color: '374151', font: 'Arial' })],
    })
  );

  // Subject
  if (data.subject) {
    children.push(
      new Paragraph({
        spacing: { after: 150 },
        children: [
          new TextRun({
            text: `Subject: ${data.subject}`,
            bold: true,
            size: 22,
            color: '111827',
            font: 'Arial',
          }),
        ],
      })
    );
  }

  // Greeting
  children.push(
    new Paragraph({
      spacing: { after: 150 },
      children: [
        new TextRun({
          text: `Dear ${data.recipientInfo.name || 'Hiring Manager'},`,
          size: 22,
          color: '111827',
          font: 'Arial',
        }),
      ],
    })
  );

  // Content Paragraphs
  const contentParagraphs = data.content.split('\n\n');
  contentParagraphs.forEach((paragraph) => {
    children.push(
      new Paragraph({
        spacing: { after: 150 },
        children: [
          new TextRun({
            text: paragraph,
            size: 22,
            color: '374151',
            font: 'Arial',
          }),
        ],
      })
    );
  });

  // Closing & Signature
  children.push(
    new Paragraph({
      spacing: { before: 100, after: 250 },
      children: [new TextRun({ text: `${data.closing},`, size: 22, color: '111827', font: 'Arial' })],
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: data.signature || data.senderInfo.name,
          bold: true,
          size: 24,
          color: '111827',
          font: 'Arial',
        }),
      ],
    })
  );

  return new Document({
    sections: [{ properties: { page: { margin: { top: 720, bottom: 720, left: 720, right: 720 } } }, children }],
  });
};