import React, { useMemo } from 'react';
import { Check, Star, Sparkles } from 'lucide-react';
import { ResumeData } from '../types/resume';
import { getResumeTemplates } from '../data/resumeTemplates';
import ResumePreview from './ResumePreview';

interface ResumeTemplateSelectorProps {
  onSelect: (templateId: string, data: ResumeData) => void;
}

const ResumeTemplateSelector: React.FC<ResumeTemplateSelectorProps> = ({ onSelect }) => {
  const templates = useMemo(() => getResumeTemplates(), []);

  return (
    <div className="py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Resume Template</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select from our professionally designed templates. Each template comes with sample content to help you get started.
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
              <div className="h-96 overflow-hidden relative border-b border-gray-200">
                <div style={{ transform: 'scale(0.4)', transformOrigin: 'top left', width: '250%', height: '250%' }} className="pointer-events-none absolute top-0 left-0">
                  <ResumePreview data={template.sampleData} templateId={template.id} isThumbnail={true} />
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
        
        {/* Coming Soon Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-dashed border-blue-200 flex flex-col items-center justify-center text-center p-8 min-h-[480px] hover:border-blue-400 hover:bg-blue-50 transition-colors">
          <div className="w-16 h-16 bg-white shadow-sm text-blue-600 rounded-full flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">More Templates Coming Soon!</h3>
          <p className="text-gray-600">
            We're constantly designing new premium templates to help your resume stand out.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplateSelector;