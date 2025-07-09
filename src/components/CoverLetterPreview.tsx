import React from 'react';
import { Edit3, Download } from 'lucide-react';
import { CoverLetterData } from '../types/coverLetter';

interface CoverLetterPreviewProps {
  data: CoverLetterData | null;
  templateId: string;
  onEdit: () => void;
  onDownload: (format: 'pdf' | 'docx') => void;
}

const CoverLetterPreview: React.FC<CoverLetterPreviewProps> = ({ data, templateId, onEdit, onDownload }) => {
  if (!data) return null;

  // TODO: Use templateId for template-specific styling
  console.log('Template ID:', templateId);

  return (
    <div className="flex gap-8">
      {/* Preview Panel */}
      <div className="flex-1">
        <div className="bg-white rounded-xl shadow-sm p-8" id="cover-letter-preview">
          {/* Sender Information */}
          <div className="mb-8">
            <div className="text-gray-900 font-medium">{data.senderInfo.name}</div>
            <div className="text-gray-600 text-sm whitespace-pre-line">{data.senderInfo.address}</div>
            <div className="text-gray-600 text-sm">{data.senderInfo.phone}</div>
            <div className="text-gray-600 text-sm">{data.senderInfo.email}</div>
          </div>

          {/* Date */}
          <div className="mb-8">
            <div className="text-gray-900">{data.date}</div>
          </div>

          {/* Recipient Information */}
          <div className="mb-8">
            <div className="text-gray-900 font-medium">{data.recipientInfo.name}</div>
            <div className="text-gray-600 text-sm">{data.recipientInfo.title}</div>
            <div className="text-gray-600 text-sm">{data.recipientInfo.company}</div>
            <div className="text-gray-600 text-sm whitespace-pre-line">{data.recipientInfo.address}</div>
          </div>

          {/* Subject */}
          {data.subject && (
            <div className="mb-6">
              <div className="text-gray-900 font-medium">Subject: {data.subject}</div>
            </div>
          )}

          {/* Greeting */}
          <div className="mb-6">
            <div className="text-gray-900">
              Dear {data.recipientInfo.name || 'Hiring Manager'},
            </div>
          </div>

          {/* Content */}
          <div className="mb-8">
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {data.content}
            </div>
          </div>

          {/* Closing */}
          <div className="mb-16">
            <div className="text-gray-900 mb-4">{data.closing},</div>
            <div className="text-gray-900 font-medium">{data.signature || data.senderInfo.name}</div>
          </div>
        </div>
      </div>

      {/* Actions Panel */}
      <div className="w-64">
        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
          <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>
          <div className="space-y-3">
            <button
              onClick={onEdit}
              className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Cover Letter</span>
            </button>
            <button
              onClick={() => onDownload('pdf')}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={() => onDownload('docx')}
              className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download DOCX</span>
            </button>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">Tips</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Keep it to one page</li>
              <li>• Be specific about the position</li>
              <li>• Show enthusiasm for the role</li>
              <li>• Proofread carefully</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterPreview;