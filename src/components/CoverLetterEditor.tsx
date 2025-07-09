import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { CoverLetterData } from '../types/coverLetter';

interface CoverLetterEditorProps {
  initialData: CoverLetterData | null;
  onDataUpdate: (data: CoverLetterData) => void;
  onNext: () => void;
}

const CoverLetterEditor: React.FC<CoverLetterEditorProps> = ({ initialData, onDataUpdate, onNext }) => {
  const [formData, setFormData] = useState<CoverLetterData>(initialData || {
    senderInfo: {
      name: '',
      address: '',
      phone: '',
      email: ''
    },
    recipientInfo: {
      name: '',
      title: '',
      company: '',
      address: ''
    },
    date: new Date().toLocaleDateString(),
    subject: '',
    content: '',
    closing: 'Sincerely',
    signature: ''
  });

  const updateSenderInfo = (field: string, value: string) => {
    const updated = {
      ...formData,
      senderInfo: {
        ...formData.senderInfo,
        [field]: value
      }
    };
    setFormData(updated);
    onDataUpdate(updated);
  };

  const updateRecipientInfo = (field: string, value: string) => {
    const updated = {
      ...formData,
      recipientInfo: {
        ...formData.recipientInfo,
        [field]: value
      }
    };
    setFormData(updated);
    onDataUpdate(updated);
  };

  const updateField = (field: string, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onDataUpdate(updated);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Edit Your Cover Letter</h2>
        <button
          onClick={onNext}
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <span>Preview</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-8">
        {/* Sender Information */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.senderInfo.name}
                onChange={(e) => updateSenderInfo('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <textarea
                value={formData.senderInfo.address}
                onChange={(e) => updateSenderInfo('address', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={formData.senderInfo.phone}
                onChange={(e) => updateSenderInfo('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.senderInfo.email}
                onChange={(e) => updateSenderInfo('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </section>

        {/* Recipient Information */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recipient Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Name</label>
              <input
                type="text"
                value={formData.recipientInfo.name}
                onChange={(e) => updateRecipientInfo('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., John Smith"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={formData.recipientInfo.title}
                onChange={(e) => updateRecipientInfo('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Hiring Manager"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
              <input
                type="text"
                value={formData.recipientInfo.company}
                onChange={(e) => updateRecipientInfo('company', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Address</label>
              <textarea
                value={formData.recipientInfo.address}
                onChange={(e) => updateRecipientInfo('address', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </section>

        {/* Letter Details */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Letter Details</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => updateField('date', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => updateField('subject', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Application for Software Developer Position"
              />
            </div>
          </div>
        </section>

        {/* Letter Content */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Letter Content</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Main Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => updateField('content', e.target.value)}
                rows={12}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Write your cover letter content here..."
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Closing</label>
                <select
                  value={formData.closing}
                  onChange={(e) => updateField('closing', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Sincerely">Sincerely</option>
                  <option value="Best regards">Best regards</option>
                  <option value="Kind regards">Kind regards</option>
                  <option value="Respectfully">Respectfully</option>
                  <option value="Thank you">Thank you</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Signature</label>
                <input
                  type="text"
                  value={formData.signature}
                  onChange={(e) => updateField('signature', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CoverLetterEditor;