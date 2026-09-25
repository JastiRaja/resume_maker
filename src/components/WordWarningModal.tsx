import React from 'react';
import { AlertTriangle, FileText, Download, X } from 'lucide-react';

interface WordWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmWord: () => void;
  onDownloadPdf?: () => void;
}

export const WordWarningModal: React.FC<WordWarningModalProps> = ({
  isOpen,
  onClose,
  onConfirmWord,
  onDownloadPdf,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all animate-scaleUp border border-gray-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="word-warning-title"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 id="word-warning-title" className="text-lg font-bold text-gray-900">
              Word (.docx) Notice
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-4 space-y-3">
          <p className="text-sm text-gray-600 leading-relaxed">
            Microsoft Word (<span className="font-semibold text-gray-800">.docx</span>) may have slight alignment deviations or may not display profile images depending on your Word version and system fonts.
          </p>
          <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3.5 flex items-start space-x-3">
            <FileText className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-900 leading-normal">
              <span className="font-semibold">Recommended:</span> For 100% pixel-perfect visual styling, exact alignment, and printing, use the <span className="font-bold">PDF format</span>.
            </p>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="px-6 pb-6 pt-2 space-y-2.5">
          {onDownloadPdf && (
            <button
              onClick={() => {
                onClose();
                onDownloadPdf();
              }}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-xl shadow-sm transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download Recommended PDF</span>
            </button>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onConfirmWord();
              }}
              className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2.5 px-4 rounded-xl transition-colors text-sm"
            >
              <FileText className="w-4 h-4 text-gray-600" />
              <span>Download Word (.docx)</span>
            </button>

            <button
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordWarningModal;
