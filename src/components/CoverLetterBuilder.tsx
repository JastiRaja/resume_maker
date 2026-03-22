import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, Eye, Edit3, Mail, Palette } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import CoverLetterTemplateSelector from './CoverLetterTemplateSelector';
import CoverLetterEditor from './CoverLetterEditor';
import CoverLetterPreview from './CoverLetterPreview';
import { CoverLetterData } from '../types/coverLetter';
import {
  COVER_LETTER_BASE,
  COVER_LETTER_EDIT,
  COVER_LETTER_PREVIEW,
  COVER_LETTER_STORAGE_KEY,
  stepFromCoverLetterPath,
} from '../constants/builderRoutes';

function readCoverLetterDraft(): { templateId: string; coverLetterData: CoverLetterData | null } {
  try {
    const raw = sessionStorage.getItem(COVER_LETTER_STORAGE_KEY);
    if (!raw) return { templateId: '', coverLetterData: null };
    const o = JSON.parse(raw) as { templateId?: string; coverLetterData?: CoverLetterData | null };
    return {
      templateId: typeof o.templateId === 'string' ? o.templateId : '',
      coverLetterData: o.coverLetterData ?? null,
    };
  } catch {
    return { templateId: '', coverLetterData: null };
  }
}

function initialStateForPath(pathname: string): { template: string; data: CoverLetterData | null } {
  if (!pathname.endsWith('/edit') && !pathname.endsWith('/preview')) {
    return { template: '', data: null };
  }
  const { templateId, coverLetterData } = readCoverLetterDraft();
  return { template: templateId, data: coverLetterData };
}

const CoverLetterBuilder: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initPath = typeof window !== 'undefined' ? window.location.pathname : COVER_LETTER_BASE;
  const [selectedTemplate, setSelectedTemplate] = useState(
    () => initialStateForPath(initPath).template
  );
  const [coverLetterData, setCoverLetterData] = useState<CoverLetterData | null>(
    () => initialStateForPath(initPath).data
  );

  const step = stepFromCoverLetterPath(location.pathname);

  useEffect(() => {
    const path = location.pathname;
    const needsDraft = path.endsWith('/edit') || path.endsWith('/preview');
    if (needsDraft && (!selectedTemplate || !coverLetterData)) {
      navigate(COVER_LETTER_BASE, { replace: true });
    }
  }, [location.pathname, selectedTemplate, coverLetterData, navigate]);

  useEffect(() => {
    if (selectedTemplate && coverLetterData) {
      try {
        sessionStorage.setItem(
          COVER_LETTER_STORAGE_KEY,
          JSON.stringify({ templateId: selectedTemplate, coverLetterData })
        );
      } catch (e) {
        console.error('Failed to persist cover letter draft', e);
      }
    }
  }, [selectedTemplate, coverLetterData]);

  const handleTemplateSelect = (templateId: string, data: CoverLetterData) => {
    setSelectedTemplate(templateId);
    setCoverLetterData(data);
    navigate(COVER_LETTER_EDIT);
  };

  const handleDataUpdate = (data: CoverLetterData) => {
    setCoverLetterData(data);
  };

  const handleDownload = async (format: 'pdf' | 'docx') => {
    if (!coverLetterData) return;

    try {
      if (format === 'pdf') {
        const { generatePDF } = await import('../utils/pdfGenerator');
        await generatePDF(coverLetterData, 'cover-letter');
      } else {
        const { generateDOCX } = await import('../utils/documentGenerator');
        await generateDOCX(coverLetterData, 'cover-letter');
      }
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleBack = () => {
    if (step === 'preview') navigate(COVER_LETTER_EDIT);
    else if (step === 'edit') navigate(COVER_LETTER_BASE);
    else navigate('/');
  };

  const goStep = (target: 'template' | 'edit' | 'preview') => {
    if (target === 'template') navigate(COVER_LETTER_BASE);
    else if (target === 'edit' && coverLetterData) navigate(COVER_LETTER_EDIT);
    else if (target === 'preview' && coverLetterData) navigate(COVER_LETTER_PREVIEW);
  };

  const renderStep = () => {
    switch (step) {
      case 'template':
        return <CoverLetterTemplateSelector onSelect={handleTemplateSelect} />;
      case 'edit':
        return (
          <CoverLetterEditor
            initialData={coverLetterData}
            onDataUpdate={handleDataUpdate}
            onNext={() => navigate(COVER_LETTER_PREVIEW)}
          />
        );
      case 'preview':
        return (
          <CoverLetterPreview
            data={coverLetterData}
            templateId={selectedTemplate}
            onEdit={() => navigate(COVER_LETTER_EDIT)}
            onDownload={handleDownload}
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
                <Mail className="w-6 h-6 text-blue-600" />
                <span className="text-xl font-semibold text-gray-900">Cover Letter Builder</span>
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
                disabled={!coverLetterData}
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
                disabled={!coverLetterData}
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

export default CoverLetterBuilder;
