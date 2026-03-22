import React from 'react';
import { pdf } from '@react-pdf/renderer';
import { ResumeData } from '../types/resume';
import { CoverLetterData } from '../types/coverLetter';
import { ResumePDF } from '../components/ResumePDF';
import { CoverLetterPDF } from '../components/CoverLetterPDF';

export const generatePDF = async (
  data: ResumeData | CoverLetterData,
  type: 'resume' | 'cover-letter',
  templateId?: string
) => {
  try {
    const doc =
      type === 'resume' ? (
        <ResumePDF data={data as ResumeData} templateId={templateId} />
      ) : (
        <CoverLetterPDF data={data as CoverLetterData} />
      );

    const blob = await pdf(doc).toBlob();

    const sanitize = (s: string) => s.trim().replace(/\s+/g, '_');
    const fileName =
      type === 'resume'
        ? `${sanitize((data as ResumeData).personalInfo?.firstName || '')}_${sanitize((data as ResumeData).personalInfo?.lastName || '')}_Resume.pdf`
        : `${sanitize((data as CoverLetterData).senderInfo?.name || '')}_Cover_Letter.pdf`;

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating PDF:', error);
    const message =
      error instanceof Error
        ? error.message
        : 'PDF generation failed. Try removing or changing the profile photo if you added one from the web.';
    window.alert(`Could not create PDF: ${message}`);
  }
};
