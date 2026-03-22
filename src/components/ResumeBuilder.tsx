import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ArrowLeft, Download, Eye, Edit3, Palette } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import ResumeTemplateSelector from './ResumeTemplateSelector';
import ResumeEditor from './ResumeEditor';
import ResumePreview from './ResumePreview';
import { ResumeData } from '../types/resume';
import {
  RESUME_BASE,
  RESUME_EDIT,
  RESUME_PREVIEW,
  RESUME_STORAGE_KEY,
  stepFromResumePath,
} from '../constants/builderRoutes';

function readResumeDraft(): { templateId: string; resumeData: ResumeData | null } {
  try {
    const raw = sessionStorage.getItem(RESUME_STORAGE_KEY);
    if (!raw) return { templateId: '', resumeData: null };
    const o = JSON.parse(raw) as { templateId?: string; resumeData?: ResumeData | null };
    return {
      templateId: typeof o.templateId === 'string' ? o.templateId : '',
      resumeData: o.resumeData ?? null,
    };
  } catch {
    return { templateId: '', resumeData: null };
  }
}

function initialStateForPath(pathname: string): { template: string; data: ResumeData | null } {
  if (!pathname.endsWith('/edit') && !pathname.endsWith('/preview')) {
    return { template: '', data: null };
  }
  const { templateId, resumeData } = readResumeDraft();
  return { template: templateId, data: resumeData };
}

const ResumeBuilder: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initPath = typeof window !== 'undefined' ? window.location.pathname : RESUME_BASE;
  const [selectedTemplate, setSelectedTemplate] = useState(
    () => initialStateForPath(initPath).template
  );
  const [resumeData, setResumeData] = useState<ResumeData | null>(
    () => initialStateForPath(initPath).data
  );
  const previewDataRef = useRef<ResumeData | null>(null);

  const step = stepFromResumePath(location.pathname);

  useEffect(() => {
    const path = location.pathname;
    const needsDraft = path.endsWith('/edit') || path.endsWith('/preview');
    if (needsDraft && (!selectedTemplate || !resumeData)) {
      navigate(RESUME_BASE, { replace: true });
    }
  }, [location.pathname, selectedTemplate, resumeData, navigate]);

  useEffect(() => {
    if (selectedTemplate && resumeData) {
      try {
        sessionStorage.setItem(
          RESUME_STORAGE_KEY,
          JSON.stringify({ templateId: selectedTemplate, resumeData })
        );
      } catch (e) {
        console.error('Failed to persist resume draft', e);
      }
    }
  }, [selectedTemplate, resumeData]);

  const handlePreviewVisibleData = useCallback((d: ResumeData) => {
    previewDataRef.current = d;
  }, []);

  const handleTemplateSelect = (templateId: string, data: ResumeData) => {
    setSelectedTemplate(templateId);
    setResumeData(structuredClone(data));
    navigate(RESUME_EDIT);
  };

  const handleDataUpdate = (data: ResumeData) => {
    setResumeData(data);
  };

  const handleDownload = async (format: 'pdf' | 'docx', snapshot?: ResumeData) => {
    const source = snapshot ?? previewDataRef.current ?? resumeData;
    if (!source) return;

    const payload = structuredClone(source);

    try {
      if (format === 'pdf') {
        const { generatePDF } = await import('../utils/pdfGenerator');
        await generatePDF(payload, 'resume', selectedTemplate);
      } else {
        const { generateDOCX } = await import('../utils/documentGenerator');
        await generateDOCX(payload, 'resume', selectedTemplate);
      }
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleBack = () => {
    if (step === 'preview') navigate(RESUME_EDIT);
    else if (step === 'edit') navigate(RESUME_BASE);
    else navigate('/');
  };

  const goStep = (target: 'template' | 'edit' | 'preview') => {
    if (target === 'template') navigate(RESUME_BASE);
    else if (target === 'edit' && resumeData) navigate(RESUME_EDIT);
    else if (target === 'preview' && resumeData) navigate(RESUME_PREVIEW);
  };

  const renderStep = () => {
    switch (step) {
      case 'template':
        return <ResumeTemplateSelector onSelect={handleTemplateSelect} />;
      case 'edit':
        return (
          <ResumeEditor
            initialData={resumeData}
            onDataUpdate={handleDataUpdate}
            onNext={() => navigate(RESUME_PREVIEW)}
          />
        );
      case 'preview':
        return (
          <ResumePreview
            data={resumeData}
            templateId={selectedTemplate}
            onEdit={() => navigate(RESUME_EDIT)}
            onDownload={handleDownload}
            onDataUpdate={handleDataUpdate}
            onVisibleData={handlePreviewVisibleData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <div className="flex items-center space-x-2">
                <img src="/images/logo.png" alt="Eco Resume Logo" className="w-6 h-6 object-contain" />
                <span className="text-xl font-semibold text-gray-900">Eco Resume</span>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                type="button"
                onClick={() => goStep('template')}
                className={`flex items-center space-x-2 px-3 py-1 rounded-full transition-colors ${
                  step === 'template' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Palette className="w-4 h-4" />
                <span className="text-sm font-medium">Template</span>
              </button>
              <button
                type="button"
                onClick={() => goStep('edit')}
                disabled={!resumeData}
                className={`flex items-center space-x-2 px-3 py-1 rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                  step === 'edit' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Edit3 className="w-4 h-4" />
                <span className="text-sm font-medium">Edit</span>
              </button>
              <button
                type="button"
                onClick={() => goStep('preview')}
                disabled={!resumeData}
                className={`flex items-center space-x-2 px-3 py-1 rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                  step === 'preview' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Eye className="w-4 h-4" />
                <span className="text-sm font-medium">Preview</span>
              </button>
            </div>

            {/* Download Actions */}
            {step === 'preview' && (
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handleDownload('pdf')}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>PDF</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderStep()}
      </main>
    </div>
  );
};

export default ResumeBuilder;
