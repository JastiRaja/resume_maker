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
  } else if (safeTemplateId === 'developer-portfolio' || safeTemplateId === 'fresher-cs-engineer') {
    defaultThemeColorText = '#1D4ED8'; defaultThemeColorBg = '#2563EB';
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

  const isTwoColumn = isTwoColumnResumeTemplate(safeTemplateId);
  const isCentered = isCenteredResumeTemplate(safeTemplateId);
  const isDevPortfolio = safeTemplateId === 'developer-portfolio' || safeTemplateId === 'fresher-cs-engineer';

  const nonEmptyProjects = data.projects.filter(
    (project) =>
      project.name.trim() ||
      project.description.trim() ||
      (project.link && project.link.trim()) ||
      (project.technologies && project.technologies.some((t) => t.trim()))
  );

  const noBorders = {
    top: { style: BorderStyle.NONE, size: 0, color: "auto" },
    bottom: { style: BorderStyle.NONE, size: 0, color: "auto" },
    left: { style: BorderStyle.NONE, size: 0, color: "auto" },
    right: { style: BorderStyle.NONE, size: 0, color: "auto" },
    insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "auto" },
    insideVertical: { style: BorderStyle.NONE, size: 0, color: "auto" },
  };

  const children: (Paragraph | Table)[] = [];

  const addSectionTitle = (title: string, align: DocAlignment = 'left', highlightColor: string = themeColorText, isWhiteText: boolean = false) => 
    new Paragraph({
      alignment: align,
      spacing: { before: 200, after: 100 },
      border: isWhiteText ? { bottom: { color: 'FFFFFF', space: 2, style: BorderStyle.SINGLE, size: 6 } } :
              isCentered ? { bottom: { color: themeColorBg, space: 2, style: BorderStyle.SINGLE, size: 12 } } : 
              { bottom: { color: 'E5E7EB', space: 2, style: BorderStyle.SINGLE, size: 6 } },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: 22,
          color: isWhiteText ? 'FFFFFF' : (isCentered ? '111827' : highlightColor),
          font: 'Arial'
        })
      ]
    });

  if (isTwoColumn) {
    // Two Column Layout matching preview and PDF (Colored sidebar on left with Name, Title, Contact, Skills, Education; Body on right)
    const leftCol: Paragraph[] = [];
    const rightCol: Paragraph[] = [];

    // Left Col Header (Name & Title in white text)
    leftCol.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `${data.personalInfo.firstName} ${data.personalInfo.lastName}`,
            bold: true,
            size: 34,
            color: 'FFFFFF',
            font: 'Arial'
          })
        ]
      }),
      new Paragraph({
        spacing: { after: 150 },
        children: [
          new TextRun({
            text: data.personalInfo.title,
            size: 18,
            color: 'F1F5F9',
            font: 'Arial'
          })
        ]
      }),
      addSectionTitle('Contact', 'left', 'FFFFFF', true)
    );

    const contactItems = [
      { label: 'Email', val: data.personalInfo.email },
      { label: 'Phone', val: data.personalInfo.phone },
      { label: 'Location', val: data.personalInfo.location },
      { label: 'LinkedIn', val: data.personalInfo.linkedin },
      { label: 'Website', val: data.personalInfo.website }
    ].filter(c => Boolean(c.val));

    contactItems.forEach(c => {
      leftCol.push(
        new Paragraph({
          spacing: { after: 40 },
          children: [
            new TextRun({ text: `${c.label}: `, size: 16, color: 'E2E8F0', bold: true, font: 'Arial' }),
            new TextRun({ text: c.val as string, size: 16, color: 'FFFFFF', font: 'Arial' })
          ]
        })
      );
    });

    if (data.skills.length > 0) {
      leftCol.push(addSectionTitle('Skills', 'left', 'FFFFFF', true));
      data.skills.forEach(skill => {
        leftCol.push(
          new Paragraph({
            spacing: { after: 40 },
            children: [
              new TextRun({ text: `• ${skill.name}`, bold: true, size: 17, color: 'FFFFFF', font: 'Arial' }),
              ...(skill.level ? [new TextRun({ text: ` (${skill.level})`, size: 15, color: 'E2E8F0', font: 'Arial' })] : [])
            ]
          })
        );
      });
    }

    if (data.education.length > 0) {
      leftCol.push(addSectionTitle('Education', 'left', 'FFFFFF', true));
      data.education.forEach(edu => {
        leftCol.push(
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({ text: edu.degree, bold: true, size: 17, color: 'FFFFFF', font: 'Arial' }),
              new TextRun({ text: `\n${edu.institution}`, size: 16, color: 'E2E8F0', font: 'Arial' }),
              new TextRun({ text: `\n${formatEducationDates(edu.startDate, edu.endDate)}`, size: 14, color: 'CBD5E1', italics: true, font: 'Arial' })
            ]
          })
        );
      });
    }

    if (data.customSections && data.customSections.length > 0) {
      data.customSections.forEach(section => {
        if (section.items.length === 0) return;
        leftCol.push(addSectionTitle(section.title, 'left', 'FFFFFF', true));
        section.items.forEach(item => {
          leftCol.push(
            new Paragraph({
              spacing: { after: 40 },
              children: [
                new TextRun({ text: `• ${item.name}`, bold: true, size: 16, color: 'FFFFFF', font: 'Arial' }),
                ...(item.description ? [new TextRun({ text: `\n  ${item.description}`, size: 15, color: 'E2E8F0', font: 'Arial' })] : []),
                ...(item.date ? [new TextRun({ text: ` (${item.date})`, size: 14, italics: true, color: 'CBD5E1', font: 'Arial' })] : [])
              ]
            })
          );
        });
      });
    }

    // Right Col Body
    if (data.summary) {
      rightCol.push(addSectionTitle('Profile', 'left'));
      rightCol.push(new Paragraph({ spacing: { after: 150 }, children: [new TextRun({ text: data.summary, size: 19, font: 'Arial' })] }));
    }

    if (data.experience.length > 0) {
      rightCol.push(addSectionTitle('Experience', 'left'));
      data.experience.forEach(exp => {
        rightCol.push(
          new Paragraph({
            spacing: { before: 80, after: 30 },
            children: [
              new TextRun({ text: exp.position, bold: true, size: 20, font: 'Arial' }),
              new TextRun({ text: `\n${exp.company}`, size: 19, bold: true, color: themeColorText, font: 'Arial' }),
              new TextRun({ text: `  (${exp.startDate} - ${exp.endDate})`, size: 17, italics: true, color: '6B7280', font: 'Arial' })
            ]
          })
        );
        exp.description.forEach(desc => {
          rightCol.push(
            new Paragraph({
              indent: { left: 200 },
              spacing: { after: 20 },
              children: [new TextRun({ text: `•  ${desc}`, size: 18, font: 'Arial' })]
            })
          );
        });
      });
    }

    if (nonEmptyProjects.length > 0) {
      rightCol.push(addSectionTitle('Projects', 'left'));
      nonEmptyProjects.forEach(project => {
        rightCol.push(
          new Paragraph({
            spacing: { before: 80, after: 20 },
            children: [
              new TextRun({ text: project.name, bold: true, size: 20, font: 'Arial' }),
              ...(project.link ? [
                new TextRun({ text: `\n${String(project.link).replace(/^https?:\/\//, '')}`, size: 16, color: themeColorText, font: 'Arial' })
              ] : [])
            ]
          })
        );
        if (project.description) {
          rightCol.push(new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: project.description, size: 18, font: 'Arial' })] }));
        }
        if (project.technologies && project.technologies.length > 0) {
          rightCol.push(
            new Paragraph({
              spacing: { after: 60 },
              children: [new TextRun({ text: 'Tech: ' + project.technologies.join(', '), italics: true, size: 16, color: '6B7280', font: 'Arial' })]
            })
          );
        }
      });
    }

    // Combine left and right columns into table
    children.push(
      new Table({
        borders: noBorders,
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: 34, type: 'pct' },
                shading: { fill: themeColorBg },
                margins: { top: 300, bottom: 300, left: 300, right: 300 },
                children: leftCol
              }),
              new TableCell({
                width: { size: 66, type: 'pct' },
                margins: { top: 300, bottom: 300, left: 350, right: 300 },
                children: rightCol
              })
            ]
          })
        ]
      })
    );

  } else if (isDevPortfolio) {
    // Developer Portfolio & Fresher CS Engineer layout (Categorized skills, clean modern layout)
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: `${data.personalInfo.firstName} ${data.personalInfo.lastName}`, bold: true, size: 40, font: 'Arial' })
        ]
      }),
      new Paragraph({
        children: [
          new TextRun({ text: data.personalInfo.title.toUpperCase(), size: 20, bold: true, color: themeColorText, font: 'Arial' })
        ]
      }),
      new Paragraph({
        spacing: { after: 200 },
        border: { bottom: { color: 'CBD5E1', space: 4, style: BorderStyle.SINGLE, size: 8 } },
        children: [
          new TextRun({
            text: [
              data.personalInfo.email,
              data.personalInfo.phone,
              data.personalInfo.location,
              data.personalInfo.linkedin,
              data.personalInfo.website
            ].filter(Boolean).join('   |   '),
            size: 18,
            color: '475569',
            font: 'Arial'
          })
        ]
      })
    );

    if (data.summary) {
      children.push(addSectionTitle('Professional Summary', 'left'));
      children.push(new Paragraph({ spacing: { after: 150 }, children: [new TextRun({ text: data.summary, size: 20, font: 'Arial' })] }));
    }

    if (data.skills.length > 0) {
      children.push(addSectionTitle('Technical Skills', 'left'));
      const categories: Record<string, string[]> = {};
      data.skills.forEach(skill => {
        const cat = skill.category?.trim() || 'Core Technologies';
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(skill.name);
      });

      Object.entries(categories).forEach(([catName, skillList]) => {
        children.push(
          new Paragraph({
            spacing: { after: 40 },
            children: [
              new TextRun({ text: `${catName}: `, bold: true, size: 19, font: 'Arial' }),
              new TextRun({ text: skillList.join(', '), size: 19, color: '334155', font: 'Arial' })
            ]
          })
        );
      });
    }

    if (data.experience.length > 0) {
      children.push(addSectionTitle('Work Experience', 'left'));
      data.experience.forEach(exp => {
        children.push(
          new Paragraph({
            spacing: { before: 80, after: 30 },
            children: [
              new TextRun({ text: exp.position, bold: true, size: 20, font: 'Arial' }),
              new TextRun({ text: ` — ${exp.company}`, bold: true, size: 20, color: themeColorText, font: 'Arial' }),
              new TextRun({ text: `  (${exp.startDate} – ${exp.endDate})`, size: 17, italics: true, color: '64748B', font: 'Arial' })
            ]
          })
        );
        exp.description.forEach(desc => {
          children.push(
            new Paragraph({
              indent: { left: 240 },
              spacing: { after: 20 },
              children: [new TextRun({ text: `•  ${desc}`, size: 19, font: 'Arial' })]
            })
          );
        });
      });
    }

    if (nonEmptyProjects.length > 0) {
      children.push(addSectionTitle('Technical Projects', 'left'));
      nonEmptyProjects.forEach(project => {
        children.push(
          new Paragraph({
            spacing: { before: 80, after: 20 },
            children: [
              new TextRun({ text: project.name, bold: true, size: 20, font: 'Arial' }),
              ...(project.technologies.length > 0 ? [
                new TextRun({ text: ` (${project.technologies.join(' · ')})`, bold: true, size: 17, color: themeColorText, font: 'Arial' })
              ] : []),
              ...(project.link ? [
                new TextRun({ text: `\n${String(project.link).replace(/^https?:\/\//, '')}`, size: 16, color: '64748B', font: 'Arial' })
              ] : [])
            ]
          })
        );
        if (project.description) {
          project.description.split('\n').filter(l => l.trim()).forEach(line => {
            children.push(
              new Paragraph({
                indent: { left: 240 },
                spacing: { after: 20 },
                children: [new TextRun({ text: `•  ${line.trim()}`, size: 19, font: 'Arial' })]
              })
            );
          });
        }
      });
    }

    if (data.education.length > 0) {
      children.push(addSectionTitle('Education', 'left'));
      data.education.forEach(edu => {
        children.push(
          new Paragraph({
            spacing: { after: 40 },
            children: [
              new TextRun({ text: edu.degree, bold: true, size: 20, font: 'Arial' }),
              new TextRun({ text: ` — ${edu.institution}`, size: 19, color: '475569', font: 'Arial' }),
              new TextRun({ text: `  (${formatEducationDates(edu.startDate, edu.endDate)})`, size: 17, italics: true, color: '64748B', font: 'Arial' })
            ]
          })
        );
      });
    }

  } else {
    // Single Column / Centered / Standard Layouts
    const alignment: DocAlignment = isCentered ? 'center' : 'left';
    children.push(
      new Paragraph({
        alignment,
        children: [
          new TextRun({ text: `${data.personalInfo.firstName} ${data.personalInfo.lastName}`, bold: true, size: 44, font: 'Arial' })
        ]
      }),
      new Paragraph({
        alignment,
        children: [
          new TextRun({ text: data.personalInfo.title, size: 24, bold: true, color: themeColorText, font: 'Arial' })
        ]
      }),
      new Paragraph({
        alignment,
        spacing: { after: 250 },
        children: [
          new TextRun({
            text: [
              data.personalInfo.email,
              data.personalInfo.phone,
              data.personalInfo.location,
              data.personalInfo.linkedin,
              data.personalInfo.website
            ].filter(Boolean).join('   |   '),
            size: 19,
            color: '4B5563',
            font: 'Arial'
          })
        ]
      })
    );

    if (data.summary) {
      children.push(addSectionTitle('Professional Summary', alignment));
      children.push(
        new Paragraph({
          alignment,
          spacing: { after: 150 },
          children: [
            new TextRun({ text: data.summary, size: 20, italics: isCentered, font: 'Arial' })
          ]
        })
      );
    }

    if (data.experience.length > 0) {
      children.push(addSectionTitle('Work Experience', alignment));
      data.experience.forEach(exp => {
        children.push(
          new Paragraph({
            alignment,
            spacing: { before: 80, after: 20 },
            children: [
              new TextRun({ text: exp.position, bold: true, size: 21, font: 'Arial' }),
              new TextRun({ text: `  |  ${exp.company}`, bold: true, size: 20, color: themeColorText, font: 'Arial' }),
              new TextRun({ text: `  |  ${exp.startDate} - ${exp.endDate}`, size: 18, italics: true, color: '6B7280', font: 'Arial' })
            ]
          })
        );
        exp.description.forEach(desc => {
          children.push(
            new Paragraph({
              alignment: isCentered ? 'center' : 'left',
              indent: isCentered ? undefined : { left: 240 },
              spacing: { after: 20 },
              children: [new TextRun({ text: `•  ${desc}`, size: 19, font: 'Arial' })]
            })
          );
        });
      });
    }

    if (data.education.length > 0) {
      children.push(addSectionTitle('Education', alignment));
      data.education.forEach(edu => {
        children.push(
          new Paragraph({
            alignment,
            spacing: { after: 40 },
            children: [
              new TextRun({ text: `${edu.degree}${edu.field?.trim() ? ` in ${edu.field.trim()}` : ''}`, bold: true, size: 20, font: 'Arial' }),
              new TextRun({ text: `  |  ${edu.institution}`, size: 20, color: themeColorText, font: 'Arial' }),
              new TextRun({ text: `  |  ${formatEducationDates(edu.startDate, edu.endDate)}`, size: 18, italics: true, color: '6B7280', font: 'Arial' })
            ]
          })
        );
      });
    }

    if (nonEmptyProjects.length > 0) {
      children.push(addSectionTitle('Projects', alignment));
      nonEmptyProjects.forEach(project => {
        children.push(
          new Paragraph({
            alignment,
            spacing: { before: 80, after: 20 },
            children: [
              new TextRun({ text: project.name, bold: true, size: 21, font: 'Arial' }),
              ...(project.link ? [
                new TextRun({ text: `\n${String(project.link).replace(/^https?:\/\//, '')}`, size: 17, color: themeColorText, font: 'Arial' })
              ] : [])
            ]
          })
        );
        if (project.description) {
          children.push(new Paragraph({ alignment, spacing: { after: 30 }, children: [new TextRun({ text: project.description, size: 19, font: 'Arial' })] }));
        }
        if (project.technologies && project.technologies.length > 0) {
          children.push(
            new Paragraph({
              alignment,
              spacing: { after: 60 },
              children: [new TextRun({ text: 'Tech: ' + project.technologies.join(', '), italics: true, size: 17, color: '6B7280', font: 'Arial' })]
            })
          );
        }
      });
    }

    if (data.skills.length > 0) {
      children.push(addSectionTitle('Skills', alignment));
      if (isCentered) {
        children.push(
          new Paragraph({
            alignment: 'center',
            children: [
              new TextRun({ text: data.skills.map(s => `${s.name}${s.level ? ` (${s.level})` : ''}`).join('   •   '), size: 20, font: 'Arial' })
            ]
          })
        );
      } else {
        const skillsText = data.skills.map(s => `•  ${s.name}${s.level ? ` (${s.level})` : ''}`).join('     ');
        children.push(
          new Paragraph({
            alignment: 'left',
            children: [new TextRun({ text: skillsText, size: 20, font: 'Arial' })]
          })
        );
      }
    }
  }

  // Custom sections (for single-column layouts)
  if (!isTwoColumn && data.customSections && data.customSections.length > 0) {
    data.customSections.forEach(section => {
      if (section.items.length === 0) return;
      children.push(addSectionTitle(section.title, isCentered ? 'center' : 'left'));
      section.items.forEach(item => {
        children.push(
          new Paragraph({
            spacing: { after: 30 },
            children: [
              new TextRun({ text: `•  ${item.name}`, bold: true, size: 20, font: 'Arial' }),
              ...(item.description ? [new TextRun({ text: ` - ${item.description}`, size: 19, font: 'Arial' })] : []),
              ...(item.date ? [new TextRun({ text: ` (${item.date})`, size: 17, italics: true, color: '6B7280', font: 'Arial' })] : [])
            ]
          })
        );
      });
    });
  }

  return new Document({
    sections: [{
      properties: {
        page: isTwoColumn ? { margin: { top: 400, bottom: 400, left: 400, right: 400 } } : { margin: { top: 720, bottom: 720, left: 720, right: 720 } }
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