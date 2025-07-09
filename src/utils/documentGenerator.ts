import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { ResumeData } from '../types/resume';
import { CoverLetterData } from '../types/coverLetter';

// Type for document children elements
type DocumentElement = Paragraph;

export const generatePDF = async (data: ResumeData | CoverLetterData, type: 'resume' | 'cover-letter') => {
  const elementId = type === 'resume' ? 'resume-preview' : 'cover-letter-preview';
  const element = document.getElementById(elementId);
  
  if (!element) {
    console.error('Preview element not found');
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 0;

    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    
    const fileName = type === 'resume' ? 
      `${(data as ResumeData).personalInfo?.firstName}_${(data as ResumeData).personalInfo?.lastName}_Resume.pdf` :
      `${(data as CoverLetterData).senderInfo?.name.replace(' ', '_')}_Cover_Letter.pdf`;
    
    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};

export const generateDOCX = async (data: ResumeData | CoverLetterData, type: 'resume' | 'cover-letter') => {
  try {
    let doc: Document;

    if (type === 'resume') {
      doc = createResumeDocument(data as ResumeData);
    } else {
      doc = createCoverLetterDocument(data as CoverLetterData);
    }

    const blob = await Packer.toBlob(doc);
    const fileName = type === 'resume' ? 
      `${(data as ResumeData).personalInfo?.firstName}_${(data as ResumeData).personalInfo?.lastName}_Resume.docx` :
      `${(data as CoverLetterData).senderInfo?.name.replace(' ', '_')}_Cover_Letter.docx`;

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

const createResumeDocument = (data: ResumeData): Document => {
  const children: DocumentElement[] = [];

  // Header
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `${data.personalInfo.firstName} ${data.personalInfo.lastName}`,
          bold: true,
          size: 32
        })
      ],
      heading: HeadingLevel.TITLE
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: data.personalInfo.title,
          size: 24,
          color: '1f4e79'
        })
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.location}`,
          size: 20
        })
      ]
    }),
    new Paragraph({ text: '' }) // Empty paragraph for spacing
  );

  // Summary
  if (data.summary) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'PROFESSIONAL SUMMARY',
            bold: true,
            size: 24
          })
        ],
        heading: HeadingLevel.HEADING_2
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: data.summary,
            size: 22
          })
        ]
      }),
      new Paragraph({ text: '' })
    );
  }

  // Experience
  if (data.experience.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'WORK EXPERIENCE',
            bold: true,
            size: 24
          })
        ],
        heading: HeadingLevel.HEADING_2
      })
    );

    data.experience.forEach((exp) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: exp.position,
              bold: true,
              size: 22
            }),
            new TextRun({
              text: ` | ${exp.company}`,
              size: 22
            }),
            new TextRun({
              text: ` | ${exp.startDate} - ${exp.endDate}`,
              size: 20,
              italics: true
            })
          ]
        })
      );

      exp.description.forEach((desc) => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `• ${desc}`,
                size: 20
              })
            ]
          })
        );
      });

      children.push(new Paragraph({ text: '' }));
    });
  }

  // Filter out empty projects
  const nonEmptyProjects = data.projects.filter(
    (project) =>
      project.name.trim() ||
      project.description.trim() ||
      project.link.trim() ||
      (project.technologies && project.technologies.some((t) => t.trim()))
  );

  // Projects
  if (nonEmptyProjects.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'PROJECTS',
            bold: true,
            size: 24
          })
        ],
        heading: HeadingLevel.HEADING_2
      })
    );

    nonEmptyProjects.forEach((project) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: project.name,
              bold: true,
              size: 22
            }),
            ...(project.link ? [
              new TextRun({
                text: ` | ${project.link}`,
                size: 20,
                color: '1f4e79'
              })
            ] : [])
          ]
        })
      );
      if (project.description) {
        children.push(
          new Paragraph({
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
            children: [
              new TextRun({
                text: 'Technologies: ' + project.technologies.join(', '),
                italics: true,
                size: 20
              })
            ]
          })
        );
      }
      children.push(new Paragraph({ text: '' }));
    });
  }

  // Education
  if (data.education.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'EDUCATION',
            bold: true,
            size: 24
          })
        ],
        heading: HeadingLevel.HEADING_2
      })
    );

    data.education.forEach((edu) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${edu.degree} in ${edu.field}`,
              bold: true,
              size: 22
            }),
            new TextRun({
              text: ` | ${edu.institution}`,
              size: 22
            }),
            new TextRun({
              text: ` | ${edu.endDate}`,
              size: 20,
              italics: true
            })
          ]
        })
      );
    });

    children.push(new Paragraph({ text: '' }));
  }

  // Skills
  if (data.skills.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'SKILLS',
            bold: true,
            size: 24
          })
        ],
        heading: HeadingLevel.HEADING_2
      })
    );
    data.skills.forEach(skill => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `• ${skill.name} (${skill.level})`,
              size: 22
            })
          ]
        })
      );
    });
  }

  return new Document({
    sections: [{
      properties: {},
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