import React from 'react';
import { Document, Font } from '@react-pdf/renderer';
import { ResumeData } from '../types/resume';
import { StandardPDFLayout, TwoColumnPDFLayout, CenteredPDFLayout } from './ResumePDFLayouts';

// Register standard fonts
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff' }, // Regular
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hjp-Ek-_EeA.woff', fontWeight: 700 } // Bold
  ]
});

interface ResumePDFProps {
  data: ResumeData;
  templateId?: string;
}

export const ResumePDF: React.FC<ResumePDFProps> = ({ data, templateId = 'modern-professional' }) => {
  // Determine rendering theme and layout based on templateId
  let LayoutComponent = StandardPDFLayout;
  let defaultThemeColorText = '#2563EB'; // text-blue-600
  let defaultThemeColorBg = '#2563EB'; // bg-blue-600
  let defaultThemeColorBorder = '#BFDBFE'; // border-blue-200

  const safeTemplateId = String(templateId || 'modern-professional');

  if (['creative-designer', 'tech-innovator', 'entry-level', 'navy-professional', 'charcoal-executive', 'forest-modern'].includes(safeTemplateId)) {
    LayoutComponent = TwoColumnPDFLayout;
  } else if (['executive-premium', 'minimalist-elegant', 'academic-researcher', 'marketing-specialist', 'dr-robert-kim', 'david-park'].includes(safeTemplateId) || safeTemplateId === 'executive' || safeTemplateId === 'manager') {
    LayoutComponent = CenteredPDFLayout;
  }

  // Set colors based on templateId hex equivalents
  if (safeTemplateId === 'modern-professional') {
    defaultThemeColorText = '#2563EB'; defaultThemeColorBg = '#2563EB'; defaultThemeColorBorder = '#BFDBFE';
  } else if (safeTemplateId === 'creative-designer') {
    defaultThemeColorText = '#9333EA'; defaultThemeColorBg = '#9333EA'; defaultThemeColorBorder = '#E9D5FF';
  } else if (safeTemplateId === 'executive-premium') {
    defaultThemeColorText = '#1F2937'; defaultThemeColorBg = '#1F2937'; defaultThemeColorBorder = '#D1D5DB';
  } else if (safeTemplateId === 'entry-level') {
    defaultThemeColorText = '#16A34A'; defaultThemeColorBg = '#16A34A'; defaultThemeColorBorder = '#BBF7D0';
  } else if (safeTemplateId === 'marketing-specialist') {
    defaultThemeColorText = '#4F46E5'; defaultThemeColorBg = '#4F46E5'; defaultThemeColorBorder = '#C7D2FE';
  } else if (safeTemplateId === 'healthcare-professional') {
    defaultThemeColorText = '#0D9488'; defaultThemeColorBg = '#0D9488'; defaultThemeColorBorder = '#99F6E4';
  } else if (safeTemplateId === 'minimalist-elegant') {
    defaultThemeColorText = '#111827'; defaultThemeColorBg = '#111827'; defaultThemeColorBorder = '#E5E7EB';
  } else if (safeTemplateId === 'tech-innovator') {
    defaultThemeColorText = '#0891B2'; defaultThemeColorBg = '#0891B2'; defaultThemeColorBorder = '#CFFAFE';
  } else if (safeTemplateId === 'sales-professional') {
    defaultThemeColorText = '#EA580C'; defaultThemeColorBg = '#EA580C'; defaultThemeColorBorder = '#FED7AA';
  } else if (safeTemplateId === 'academic-researcher') {
    defaultThemeColorText = '#B91C1C'; defaultThemeColorBg = '#B91C1C'; defaultThemeColorBorder = '#FECACA';
  } else if (safeTemplateId === 'navy-professional') {
    defaultThemeColorText = '#1E293B'; defaultThemeColorBg = '#1E293B'; defaultThemeColorBorder = '#CBD5E1';
  } else if (safeTemplateId === 'charcoal-executive') {
    defaultThemeColorText = '#27272A'; defaultThemeColorBg = '#27272A'; defaultThemeColorBorder = '#D4D4D8';
  } else if (safeTemplateId === 'forest-modern') {
    defaultThemeColorText = '#065F46'; defaultThemeColorBg = '#065F46'; defaultThemeColorBorder = '#6EE7B7';
  }

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16) || 0;
    const g = parseInt(hex.slice(3, 5), 16) || 0;
    const b = parseInt(hex.slice(5, 7), 16) || 0;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const themeColorText = data?.theme?.textColor || defaultThemeColorText;
  const themeColorBg = data?.theme?.themeColor || defaultThemeColorBg;
  const themeColorBorder = data?.theme?.themeColor ? hexToRgba(data.theme.themeColor, 0.3) : defaultThemeColorBorder;

  return (
    <Document>
      <LayoutComponent 
        data={data}
        themeColorText={themeColorText}
        themeColorBg={themeColorBg}
        themeColorBorder={themeColorBorder}
      />
    </Document>
  );
};
