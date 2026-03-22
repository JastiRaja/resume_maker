import React, { useRef, useState, useEffect } from 'react';
import { Edit3, Download, Palette } from 'lucide-react';
import { ResumeData } from '../types/resume';
import { isCenteredResumeTemplate, isTwoColumnResumeTemplate } from '../constants/resumeTemplateLayouts';
import { StandardLayout, TwoColumnLayout, CenteredLayout, YellowSidebarLayout, NavySidebarLayout, FormalRedLayout, TimelineDarkLayout, GeometricBlueLayout, ProfessionalNavyHeaderLayout, CleanBlueAccentLayout } from './ResumePreviewLayouts';

interface ResumePreviewProps {
  data: ResumeData | null;
  templateId: string;
  onEdit?: () => void;
  /** Second arg is the exact resume snapshot shown in the preview (keeps PDF in sync with the screen). */
  onDownload?: (format: 'pdf' | 'docx', dataSnapshot?: ResumeData) => void;
  onDataUpdate?: (data: ResumeData) => void;
  /** Keeps parent in sync with the data currently rendered (e.g. header PDF uses the same payload as the preview). */
  onVisibleData?: (data: ResumeData) => void;
  isThumbnail?: boolean;
}

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16) || 0;
  const g = parseInt(hex.slice(3, 5), 16) || 0;
  const b = parseInt(hex.slice(5, 7), 16) || 0;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, templateId, onEdit, onDownload, onDataUpdate, onVisibleData, isThumbnail = false }) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 700);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const onVisibleDataRef = useRef(onVisibleData);
  onVisibleDataRef.current = onVisibleData;
  useEffect(() => {
    if (!isThumbnail && data) onVisibleDataRef.current?.(data);
  }, [data, isThumbnail]);

  if (!data) return null;

  // Determine rendering theme and layout based on templateId
  let LayoutComponent = StandardLayout;
  let defaultThemeColorText = '#2563EB'; // text-blue-600
  let defaultThemeColorBg = '#2563EB'; // bg-blue-600
  let defaultThemeColorBorder = '#BFDBFE'; // border-blue-200

  if (isTwoColumnResumeTemplate(templateId)) {
    LayoutComponent = TwoColumnLayout;
  } else if (isCenteredResumeTemplate(templateId)) {
    LayoutComponent = CenteredLayout;
  } else if (templateId === 'modern-yellow') {
    LayoutComponent = YellowSidebarLayout;
  } else if (templateId === 'navy-sidebar') {
    LayoutComponent = NavySidebarLayout;
  } else if (templateId === 'formal-red') {
    LayoutComponent = FormalRedLayout;
  } else if (templateId === 'timeline-dark') {
    LayoutComponent = TimelineDarkLayout;
  } else if (templateId === 'geometric-blue') {
    LayoutComponent = GeometricBlueLayout;
  } else if (templateId === 'professional-navy') {
    LayoutComponent = ProfessionalNavyHeaderLayout;
  } else if (templateId === 'clean-blue') {
    LayoutComponent = CleanBlueAccentLayout;
  }

  // Set colors based on templateId
  if (templateId === 'modern-professional') {
    defaultThemeColorText = '#2563EB'; defaultThemeColorBg = '#2563EB'; defaultThemeColorBorder = '#BFDBFE';
  } else if (templateId === 'creative-designer') {
    defaultThemeColorText = '#9333EA'; defaultThemeColorBg = '#9333EA'; defaultThemeColorBorder = '#E9D5FF';
  } else if (templateId === 'executive-premium') {
    defaultThemeColorText = '#1F2937'; defaultThemeColorBg = '#1F2937'; defaultThemeColorBorder = '#D1D5DB';
  } else if (templateId === 'entry-level') {
    defaultThemeColorText = '#16A34A'; defaultThemeColorBg = '#16A34A'; defaultThemeColorBorder = '#BBF7D0';
  } else if (templateId === 'marketing-specialist') {
    defaultThemeColorText = '#4F46E5'; defaultThemeColorBg = '#4F46E5'; defaultThemeColorBorder = '#C7D2FE';
  } else if (templateId === 'healthcare-professional' || templateId === 'healthcare-nursing') {
    defaultThemeColorText = '#0D9488'; defaultThemeColorBg = '#0D9488'; defaultThemeColorBorder = '#99F6E4';
  } else if (templateId === 'minimalist-elegant') {
    defaultThemeColorText = '#111827'; defaultThemeColorBg = '#111827'; defaultThemeColorBorder = '#E5E7EB';
  } else if (templateId === 'tech-innovator') {
    defaultThemeColorText = '#0891B2'; defaultThemeColorBg = '#0891B2'; defaultThemeColorBorder = '#CFFAFE';
  } else if (templateId === 'sales-professional' || templateId === 'sales-representative') {
    defaultThemeColorText = '#EA580C'; defaultThemeColorBg = '#EA580C'; defaultThemeColorBorder = '#FED7AA';
  } else if (templateId === 'academic-researcher') {
    defaultThemeColorText = '#B91C1C'; defaultThemeColorBg = '#B91C1C'; defaultThemeColorBorder = '#FECACA';
  } else if (templateId === 'navy-professional') {
    defaultThemeColorText = '#1E293B'; defaultThemeColorBg = '#1E293B'; defaultThemeColorBorder = '#CBD5E1';
  } else if (templateId === 'charcoal-executive') {
    defaultThemeColorText = '#27272A'; defaultThemeColorBg = '#27272A'; defaultThemeColorBorder = '#D4D4D8';
  } else if (templateId === 'forest-modern') {
    defaultThemeColorText = '#065F46'; defaultThemeColorBg = '#065F46'; defaultThemeColorBorder = '#6EE7B7';
  } else if (templateId === 'modern-yellow') {
    defaultThemeColorText = '#ca8a04'; defaultThemeColorBg = '#eab308'; defaultThemeColorBorder = '#fef08a';
  } else if (templateId === 'navy-sidebar') {
    defaultThemeColorText = '#1e3a8a'; defaultThemeColorBg = '#1e40af'; defaultThemeColorBorder = '#bfdbfe';
  } else if (templateId === 'formal-red') {
    defaultThemeColorText = '#be123c'; defaultThemeColorBg = '#be123c'; defaultThemeColorBorder = '#fecdd3';
  } else if (templateId === 'timeline-dark') {
    defaultThemeColorText = '#1e293b'; defaultThemeColorBg = '#334155'; defaultThemeColorBorder = '#cbd5e1';
  } else if (templateId === 'geometric-blue') {
    defaultThemeColorText = '#2563eb'; defaultThemeColorBg = '#3b82f6'; defaultThemeColorBorder = '#bfdbfe';
  } else if (templateId === 'professional-navy') {
    defaultThemeColorText = '#1E293B'; defaultThemeColorBg = '#1E293B'; defaultThemeColorBorder = '#cbd5e1';
  } else if (templateId === 'clean-blue') {
    defaultThemeColorText = '#2563EB'; defaultThemeColorBg = '#2563EB'; defaultThemeColorBorder = '#bfdbfe';
  }

  const themeColorText = data?.theme?.textColor || defaultThemeColorText;
  const themeColorBg = data?.theme?.themeColor || defaultThemeColorBg;
  const themeColorBorder = data?.theme?.themeColor ? hexToRgba(data.theme.themeColor, 0.3) : defaultThemeColorBorder;

  const handleThemeChange = (color: string, type: 'themeColor' | 'textColor') => {
    if (!onDataUpdate || !data) return;
    onDataUpdate({
      ...data,
      theme: {
        themeColor: data.theme?.themeColor || defaultThemeColorBg,
        textColor: data.theme?.textColor || defaultThemeColorText,
        [type]: color
      }
    });
  };

  // Handler to force desktop layout for PDF export
  const handleDownload = async (format: 'pdf' | 'docx') => {
    const previewEl = previewRef.current;
    if (previewEl) {
      previewEl.classList.add('force-desktop-preview');
    }
    if (onDownload) {
      await onDownload(format, data);
    }
    if (previewEl) {
      previewEl.classList.remove('force-desktop-preview');
    }
  };

  return (
    <div className={isThumbnail ? "" : "flex flex-col gap-4"}>
      {isMobile && !isThumbnail && (
        <div className="bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 p-3 rounded">
          <strong>PDF Export Tip:</strong> For best PDF results, please use a desktop device or request the desktop site in your browser before exporting.
        </div>
      )}
      <div className={isThumbnail ? "" : "flex gap-8"}>
        {/* Preview Panel */}
        <div className={isThumbnail ? "" : "flex-1"}>
          <div className={`bg-white rounded-xl shadow-sm ${isThumbnail ? 'p-4' : 'p-8'}`} id={isThumbnail ? undefined : "resume-preview"} ref={previewRef}>
            <LayoutComponent 
              data={data} 
              themeColorText={themeColorText} 
              themeColorBg={themeColorBg} 
              themeColorBorder={themeColorBorder} 
            />
          </div>
        </div>

        {/* Actions Panel */}
        {!isThumbnail && (
          <div className="w-64 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Palette className="w-4 h-4 text-blue-600" />
                Theme Customization
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Theme Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={themeColorBg}
                      onChange={(e) => handleThemeChange(e.target.value, 'themeColor')}
                      className="w-10 h-10 border-0 rounded cursor-pointer"
                    />
                    <span className="text-sm text-gray-500 uppercase font-mono">{themeColorBg}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={themeColorText}
                      onChange={(e) => handleThemeChange(e.target.value, 'textColor')}
                      className="w-10 h-10 border-0 rounded cursor-pointer"
                    />
                    <span className="text-sm text-gray-500 uppercase font-mono">{themeColorText}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-[280px]">
              <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={onEdit}
                  className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Resume</span>
                </button>
                <button
                  onClick={() => handleDownload('pdf')}
                  className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">Tips</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Keep your resume to 1-2 pages</li>
                  <li>• Use action verbs in descriptions</li>
                  <li>• Quantify achievements when possible</li>
                  <li>• Proofread for spelling and grammar</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;