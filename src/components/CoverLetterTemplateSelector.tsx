import React from 'react';
import { Check, Star } from 'lucide-react';
import { CoverLetterData } from '../types/coverLetter';
import { getCoverLetterTemplates } from '../data/coverLetterTemplates';

interface CoverLetterTemplateSelectorProps {
  onSelect: (templateId: string, data: CoverLetterData) => void;
}

const CoverLetterTemplateSelector: React.FC<CoverLetterTemplateSelectorProps> = ({ onSelect }) => {
  const templates = getCoverLetterTemplates();

  return (
    <div className="py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Cover Letter Template</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select from our professionally designed cover letter templates. Each template includes sample content to help you get started.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => onSelect(template.id, template.sampleData)}
          >
            <div className="relative">
              <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex flex-col">
                <div className="text-sm text-gray-600 mb-4">
                  {template.sampleData.senderInfo.name}
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  {template.sampleData.recipientInfo.name}<br />
                  {template.sampleData.recipientInfo.company}
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  {template.sampleData.date}
                </div>
                <div className="text-xs text-gray-700 leading-relaxed">
                  {template.sampleData.content.substring(0, 150)}...
                </div>
              </div>
              {template.isPremium && (
                <div className="absolute top-4 right-4 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                  <Star className="w-3 h-3" />
                  <span>Premium</span>
                </div>
              )}
              <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center">
                <div className="bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Check className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{template.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                    {template.category}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {template.difficulty}
                  </span>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  Use Template
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoverLetterTemplateSelector;