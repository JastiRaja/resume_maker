import React, { useState } from 'react';
import { ArrowLeft, Download, Eye, Edit3, Mail, Palette } from 'lucide-react';
import CoverLetterTemplateSelector from './CoverLetterTemplateSelector';
import CoverLetterEditor from './CoverLetterEditor';
import CoverLetterPreview from './CoverLetterPreview';
import { CoverLetterData } from '../types/coverLetter';
import { generatePDF, generateDOCX } from '../utils/documentGenerator';

interface CoverLetterBuilderProps {
  onBack: () => void;
}

const CoverLetterBuilder: React.FC<CoverLetterBuilderProps> = ({ onBack }) => {
  const [step, setStep] = useState<'template' | 'edit' | 'preview'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [coverLetterData, setCoverLetterData] = useState<CoverLetterData | null>(null);

  const handleTemplateSelect = (templateId: string, data: CoverLetterData) => {
    setSelectedTemplate(templateId);
    setCoverLetterData(data);
    setStep('edit');
  };

  const handleDataUpdate = (data: CoverLetterData) => {
    setCoverLetterData(data);
  };

  const handleDownload = async (format: 'pdf' | 'docx') => {
    if (!coverLetterData) return;

    try {
      if (format === 'pdf') {
        await generatePDF(coverLetterData, 'cover-letter');
      } else {
        await generateDOCX(coverLetterData, 'cover-letter');
      }
    } catch (error) {
      console.error('Download failed:', error);
    }
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
            onNext={() => setStep('preview')}
          />
        );
      case 'preview':
        return (
          <CoverLetterPreview
            data={coverLetterData}
            templateId={selectedTemplate}
            onEdit={() => setStep('edit')}
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
                onClick={onBack}
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
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                step === 'template' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
              }`}>
                <Palette className="w-4 h-4" />
                <span className="text-sm font-medium">Template</span>
              </div>
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                step === 'edit' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
              }`}>
                <Edit3 className="w-4 h-4" />
                <span className="text-sm font-medium">Edit</span>
              </div>
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                step === 'preview' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
              }`}>
                <Eye className="w-4 h-4" />
                <span className="text-sm font-medium">Preview</span>
              </div>
            </div>

            {/* Download Actions */}
            {step === 'preview' && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleDownload('pdf')}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>PDF</span>
                </button>
                <button
                  onClick={() => handleDownload('docx')}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>DOCX</span>
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