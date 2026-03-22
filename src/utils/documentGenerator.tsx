import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, BorderStyle, AlignmentType } from 'docx';
import { ResumeData } from '../types/resume';
import { CoverLetterData } from '../types/coverLetter';
import { isCenteredResumeTemplate, isTwoColumnResumeTemplate } from '../constants/resumeTemplateLayouts';

// Type for document children elements
type DocumentElement = Paragraph;

type DocAlignment = (typeof AlignmentType)[keyof typeof AlignmentType];

export const generateDOCX = async (data: ResumeData | CoverLetterData, type: 'resume' | 'cover-letter', templateId?: string) => {
  try {
    let doc: Document;

    if (type === 'resume') {
      doc = createResumeDocument(data as ResumeData, templateId);
    } else {
      doc = createCoverLetterDocument(data as CoverLetterData);
    }

    const blob = await Packer.toBlob(doc);
    const sanitize = (s: string) => s.trim().replace(/\s+/g, '_');
    const fileName = type === 'resume' ? 
      `${sanitize((data as ResumeData).personalInfo?.firstName || '')}_${sanitize((data as ResumeData).personalInfo?.lastName || '')}_Resume.docx` :
      `${sanitize((data as CoverLetterData).senderInfo?.name || '')}_Cover_Letter.docx`;

    // Create download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    
    // Clean up
    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error('Error generating DOCX:', error);
  }
};

const hexToDocxColor = (hex: string) => {
  if (!hex) return '000000';
  return hex.replace('#', '');
};

const createResumeDocument = (data: ResumeData, templateId?: string): Document => {
  const safeTemplateId = String(templateId || 'modern-professional');
  
  // Default values
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
  }

  const themeColorText = hexToDocxColor(data.theme?.textColor || defaultThemeColorText);
  const themeColorBg = hexToDocxColor(data.theme?.themeColor || defaultThemeColorBg);

  const isTwoColumn = isTwoColumnResumeTemplate(safeTemplateId);
  const isCentered = isCenteredResumeTemplate(safeTemplateId);

  const nonEmptyProjects = data.projects.filter(
    (project) =>
      project.name.trim() ||
      project.description.trim() ||
      (project.link && project.link.trim()) ||
      (project.technologies && project.technologies.some((t) => t.trim()))
  );

  const children: (Paragraph | Table)[] = [];

  const addHeader = (align: DocAlignment) => [
    new Paragraph({
      alignment: align,
      children: [
        new TextRun({
          text: `${data.personalInfo.firstName} ${data.personalInfo.lastName}`,
          bold: true,
          size: 48,
          font: 'Calibri'
        })
      ]
    }),
    new Paragraph({
      alignment: align,
      children: [
        new TextRun({
          text: data.personalInfo.title,
          size: 28,
          color: themeColorText,
          font: 'Calibri'
        })
      ]
    }),
    new Paragraph({
      alignment: align,
      spacing: { after: 300 },
      children: [
        new TextRun({
          text: [
            data.personalInfo.email,
            data.personalInfo.phone,
            data.personalInfo.location,
            data.personalInfo.linkedin,
            data.personalInfo.website
          ].filter(Boolean).join('  |  '),
          size: 20,
          color: '4B5563',
          font: 'Calibri'
        })
      ]
    })
  ];

  const addSectionTitle = (title: string, align: DocAlignment, highlightColor: string = themeColorText) => 
    new Paragraph({
      alignment: align,
      spacing: { before: 200, after: 100 },
      border: isCentered ? { bottom: { color: themeColorBg, space: 1, style: BorderStyle.SINGLE, size: 12 } } : undefined,
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: 24,
          color: isCentered ? '111827' : highlightColor,
        })
      ]
    });

  if (!isTwoColumn) {
    const alignment = isCentered ? 'center' : 'left';
    children.push(...addHeader(alignment));

    if (data.summary) {
      children.push(addSectionTitle('Professional Summary', alignment));
      children.push(
        new Paragraph({
          alignment: alignment,
          spacing: { after: 200 },
          children: [
            new TextRun({
              text: data.summary,
              size: 22,
              italics: isCentered
            })
          ]
        })
      );
    }

    if (data.experience.length > 0) {
      children.push(addSectionTitle('Work Experience', alignment));
      data.experience.forEach((exp) => {
        children.push(
          new Paragraph({
            alignment: alignment,
            children: [
              new TextRun({
                text: exp.position,
                bold: true,
                size: 22
              }),
              new TextRun({
                text: ` | ${exp.company}`,
                size: 22,
                color: themeColorText
              }),
              new TextRun({
                text: ` | ${exp.startDate} - ${exp.endDate}`,
                size: 20,
                italics: true,
                color: '6B7280'
              })
            ]
          })
        );

        exp.description.forEach((desc) => {
          children.push(
            new Paragraph({
              alignment: alignment,
              indent: isCentered ? undefined : { left: 360 },
              children: [
                new TextRun({
                  text: `• ${desc}`,
                  size: 20
                })
              ]
            })
          );
        });
        children.push(new Paragraph({ text: '', spacing: { after: 100 } }));
      });
    }

    if (data.education.length > 0) {
      children.push(addSectionTitle('Education', alignment));
      data.education.forEach((edu) => {
        children.push(
          new Paragraph({
            alignment: alignment,
            spacing: { after: 100 },
            children: [
              new TextRun({
                text: `${edu.degree}${edu.field?.trim() ? ` in ${edu.field.trim()}` : ''}`,
                bold: true,
                size: 22
              }),
              new TextRun({
                text: ` | ${edu.institution}`,
                size: 22,
                color: themeColorText
              }),
              new TextRun({
                text: ` | ${edu.endDate}`,
                size: 20,
                italics: true,
                color: '6B7280'
              })
            ]
          })
        );
      });
    }

    if (nonEmptyProjects.length > 0) {
      children.push(addSectionTitle('Selected Projects', alignment));
      nonEmptyProjects.forEach((project) => {
        children.push(
          new Paragraph({
            alignment: alignment,
            children: [
              new TextRun({
                text: project.name,
                bold: true,
                size: 22
              }),
              ...(project.link ? [
                new TextRun({
                  text: ` | ${project.link as string}`,
                  size: 20,
                  color: themeColorText
                })
              ] : [])
            ]
          })
        );
        if (project.description) {
          children.push(
            new Paragraph({
              alignment: alignment,
              children: [
                new TextRun({
                  text: project.description,
                  size: 20
                })
              ]
            })
          );
        }
        if (project.technologies && project.technologies.length > 0) {
          children.push(
            new Paragraph({
              alignment: alignment,
              spacing: { after: 100 },
              children: [
                new TextRun({
                  text: 'Technologies: ' + project.technologies.join(', '),
                  italics: true,
                  size: 20,
                  color: '6B7280'
                })
              ]
            })
          );
        } else {
          children.push(new Paragraph({ text: '', spacing: { after: 100 } }));
        }
      });
    }

    if (data.skills.length > 0) {
      children.push(addSectionTitle(isCentered ? 'Technical Expertise' : 'Skills', alignment));
      if (isCentered) {
        children.push(
          new Paragraph({
            alignment: 'center',
            children: [
              new TextRun({
                text: data.skills.map(s => `${s.name} (${s.level})`).join('  •  '),
                size: 22
              })
            ]
          })
        );
      } else {
        const skillsText = data.skills.map(s => `• ${s.name} (${s.level})`).join('   ');
        children.push(
          new Paragraph({
            alignment: 'left',
            children: [
              new TextRun({
                text: skillsText,
                size: 22
              })
            ]
          })
        );
      }
    }
  } else {
    // Two Column Layout
    const leftCol: Paragraph[] = [];
    const rightCol: Paragraph[] = [];

    // Left Col Content (Header / Contact / Education / Skills)
    leftCol.push(
      new Paragraph({
        alignment: 'center',
        children: [
          new TextRun({
            text: `${data.personalInfo.firstName} ${data.personalInfo.lastName}`,
            bold: true,
            size: 36,
            color: 'FFFFFF',
            font: 'Calibri'
          })
        ]
      }),
      new Paragraph({
        alignment: 'center',
        spacing: { after: 300 },
        children: [
          new TextRun({
            text: data.personalInfo.title,
            size: 24,
            color: 'FFFFFF',
            font: 'Calibri'
          })
        ]
      }),
      addSectionTitle('Contact', 'left', 'FFFFFF')
    );

    [
      data.personalInfo.email,
      data.personalInfo.phone,
      data.personalInfo.location,
      data.personalInfo.linkedin,
      data.personalInfo.website
    ].filter(Boolean).forEach(contact => {
      leftCol.push(
        new Paragraph({
          children: [new TextRun({ text: contact as string, size: 20, color: 'FFFFFF' })]
        })
      );
    });

    if (data.skills.length > 0) {
      leftCol.push(addSectionTitle('Skills', 'left', 'FFFFFF'));
      data.skills.forEach(skill => {
        leftCol.push(
          new Paragraph({
            children: [new TextRun({ text: `${skill.name} (${skill.level})`, size: 20, color: 'FFFFFF' })]
          })
        );
      });
    }

    if (data.education.length > 0) {
      leftCol.push(addSectionTitle('Education', 'left', 'FFFFFF'));
      data.education.forEach(edu => {
        leftCol.push(
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({ text: edu.degree, bold: true, size: 20, color: 'FFFFFF' }),
              new TextRun({ text: `\n${edu.institution}`, size: 18, color: 'FFFFFF' }),
              new TextRun({ text: `\n${edu.endDate}`, size: 16, color: 'DDDDDD' })
            ]
          })
        );
      });
    }

    // Right Col Content
    if (data.summary) {
      rightCol.push(addSectionTitle('Profile', 'left'));
      rightCol.push(new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: data.summary, size: 22 })] }));
    }

    if (data.experience.length > 0) {
      rightCol.push(addSectionTitle('Experience', 'left'));
      data.experience.forEach(exp => {
        rightCol.push(
          new Paragraph({
            children: [
              new TextRun({ text: exp.position, bold: true, size: 22 }),
              new TextRun({ text: ` | ${exp.company}`, size: 22, color: themeColorText }),
              new TextRun({ text: ` | ${exp.startDate} - ${exp.endDate}`, size: 20, italics: true, color: '6B7280' })
            ]
          })
        );
        exp.description.forEach(desc => {
          rightCol.push(
            new Paragraph({
              indent: { left: 360 },
              children: [new TextRun({ text: `• ${desc}`, size: 20 })]
            })
          );
        });
        rightCol.push(new Paragraph({ text: '', spacing: { after: 100 } }));
      });
    }

    if (nonEmptyProjects.length > 0) {
      rightCol.push(addSectionTitle('Projects', 'left'));
      nonEmptyProjects.forEach(project => {
        rightCol.push(
          new Paragraph({
            children: [
              new TextRun({ text: project.name, bold: true, size: 22 }),
              ...(project.link ? [new TextRun({ text: ` | ${project.link as string}`, size: 20, color: themeColorText })] : [])
            ]
          })
        );
        if (project.description) {
          rightCol.push(new Paragraph({ children: [new TextRun({ text: project.description, size: 20 })] }));
        }
        if (project.technologies && project.technologies.length > 0) {
          rightCol.push(
            new Paragraph({
              spacing: { after: 100 },
              children: [new TextRun({ text: 'Technologies: ' + project.technologies.join(', '), italics: true, size: 20, color: '6B7280' })]
            })
          );
        } else {
          rightCol.push(new Paragraph({ text: '', spacing: { after: 100 } }));
        }
      });
    }

    // Combine into table
    children.push(
      new Table({
        borders: {
          top: { style: BorderStyle.NONE, size: 0, color: "auto" },
          bottom: { style: BorderStyle.NONE, size: 0, color: "auto" },
          left: { style: BorderStyle.NONE, size: 0, color: "auto" },
          right: { style: BorderStyle.NONE, size: 0, color: "auto" },
          insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "auto" },
          insideVertical: { style: BorderStyle.NONE, size: 0, color: "auto" },
        },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: 35, type: 'pct' },
                shading: { fill: themeColorBg },
                margins: { top: 400, bottom: 400, left: 400, right: 400 },
                children: leftCol
              }),
              new TableCell({
                width: { size: 65, type: 'pct' },
                margins: { top: 400, bottom: 400, left: 400, right: 400 },
                children: rightCol
              })
            ]
          })
        ]
      })
    );
  }

  return new Document({
    sections: [{
      properties: {
        page: isTwoColumn ? { margin: { top: 0, bottom: 0, left: 0, right: 0 } } : undefined
      },
      children: children
    }]
  });
};

const createCoverLetterDocument = (data: CoverLetterData): Document => {
  const children: DocumentElement[] = [];

  // Sender info
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: data.senderInfo.name,
          bold: true,
          size: 24
        })
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: data.senderInfo.address,
          size: 22
        })
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `${data.senderInfo.phone} | ${data.senderInfo.email}`,
          size: 22
        })
      ]
    }),
    new Paragraph({ text: '' }),
    new Paragraph({ text: '' })
  );

  // Date
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: data.date,
          size: 22
        })
      ]
    }),
    new Paragraph({ text: '' })
  );

  // Recipient info
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: data.recipientInfo.name,
          size: 22
        })
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: data.recipientInfo.title,
          size: 22
        })
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: data.recipientInfo.company,
          size: 22
        })
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: data.recipientInfo.address,
          size: 22
        })
      ]
    }),
    new Paragraph({ text: '' })
  );

  // Subject
  if (data.subject) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `Subject: ${data.subject}`,
            bold: true,
            size: 22
          })
        ]
      }),
      new Paragraph({ text: '' })
    );
  }

  // Greeting
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `Dear ${data.recipientInfo.name || 'Hiring Manager'},`,
          size: 22
        })
      ]
    }),
    new Paragraph({ text: '' })
  );

  // Content
  const contentParagraphs = data.content.split('\n\n');
  contentParagraphs.forEach((paragraph) => {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: paragraph,
            size: 22
          })
        ]
      }),
      new Paragraph({ text: '' })
    );
  });

  // Closing
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `${data.closing},`,
          size: 22
        })
      ]
    }),
    new Paragraph({ text: '' }),
    new Paragraph({ text: '' }),
    new Paragraph({ text: '' }),
    new Paragraph({
      children: [
        new TextRun({
          text: data.signature || data.senderInfo.name,
          size: 22
        })
      ]
    })
  );

  return new Document({
    sections: [{
      properties: {},
      children: children
    }]
  });
};