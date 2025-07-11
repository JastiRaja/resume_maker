import React, { useRef, useState, useEffect } from 'react';
import { Edit3, Download, Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import { ResumeData } from '../types/resume';

interface ResumePreviewProps {
  data: ResumeData | null;
  templateId: string;
  onEdit: () => void;
  onDownload: (format: 'pdf' | 'docx') => void;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, templateId, onEdit, onDownload }) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 700);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!data) return null;

  // TODO: Use templateId for template-specific styling
  console.log('Template ID:', templateId);

  const formatDate = (date: string) => {
    return date || 'Present';
  };

  // Filter out empty projects
  const nonEmptyProjects = data.projects.filter(
    (project) =>
      project.name.trim() ||
      project.description.trim() ||
      project.link.trim() ||
      (project.technologies && project.technologies.some((t) => t.trim()))
  );

  // Handler to force desktop layout for PDF export
  const handleDownload = async (format: 'pdf' | 'docx') => {
    const previewEl = previewRef.current;
    if (previewEl) {
      previewEl.classList.add('force-desktop-preview');
    }
    await onDownload(format);
    if (previewEl) {
      previewEl.classList.remove('force-desktop-preview');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {isMobile && (
        <div className="bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 p-3 rounded">
          <strong>PDF Export Tip:</strong> For best PDF results, please use a desktop device or request the desktop site in your browser before exporting.
        </div>
      )}
      <div className="flex gap-8">
        {/* Preview Panel */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-sm p-8" id="resume-preview" ref={previewRef}>
            {/* Header */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {data.personalInfo.firstName} {data.personalInfo.lastName}
              </h1>
              <p className="text-xl text-blue-600 mb-4">{data.personalInfo.title}</p>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-x-6 gap-y-2 items-center text-sm text-gray-600 mb-2">
                {data.personalInfo.email && (
                  <span className="inline-flex items-center gap-1 whitespace-nowrap h-6">
                    <Mail className="w-4 h-4" />{data.personalInfo.email}
                  </span>
                )}
                {data.personalInfo.phone && (
                  <span className="inline-flex items-center gap-1 whitespace-nowrap h-6">
                    <Phone className="w-4 h-4" />{data.personalInfo.phone}
                  </span>
                )}
                {data.personalInfo.location && (
                  <span className="inline-flex items-center gap-1 whitespace-nowrap h-6">
                    <MapPin className="w-4 h-4" />{data.personalInfo.location}
                  </span>
                )}
                {data.personalInfo.linkedin && (
                  <span className="inline-flex items-center gap-1 whitespace-nowrap h-6">
                    <Linkedin className="w-4 h-4" />{data.personalInfo.linkedin}
                  </span>
                )}
                {data.personalInfo.website && (
                  <span className="inline-flex items-center gap-1 whitespace-nowrap h-6">
                    <Globe className="w-4 h-4" />{data.personalInfo.website}
                  </span>
                )}
              </div>
            </div>

            {/* Summary */}
            {data.summary && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Professional Summary</h2>
                <p className="text-gray-700 leading-relaxed">{data.summary}</p>
              </div>
            )}

            {/* Experience */}
            {data.experience.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Work Experience</h2>
                <div className="space-y-4">
                  {data.experience.map((exp) => (
                    <div key={exp.id} className="border-l-2 border-blue-200 pl-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                          <p className="text-blue-600">{exp.company}</p>
                        </div>
                        <span className="text-sm text-gray-500">
                          {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                        </span>
                      </div>
                      {exp.description.length > 0 && (
                        <ul className="text-gray-700 text-sm space-y-1">
                          {exp.description.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-blue-600 mr-2">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {data.education.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Education</h2>
                <div className="space-y-3">
                  {data.education.map((edu) => (
                    <div key={edu.id} className="border-l-2 border-green-200 pl-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                          <p className="text-green-600">{edu.institution}</p>
                          {edu.field && <p className="text-gray-600 text-sm">{edu.field}</p>}
                        </div>
                        <span className="text-sm text-gray-500">{formatDate(edu.endDate)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Projects - only show if non-empty */}
            {nonEmptyProjects.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Projects</h2>
                <div className="space-y-4">
                  {nonEmptyProjects.map((project) => (
                    <div key={project.id} className="border-l-2 border-purple-200 pl-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{project.name}</h3>
                          {(() => {
                            const link = project.link || '';
                            return link ? (
                              <a
                                href={link.startsWith('http') ? link : `https://${link}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-600 text-sm hover:underline"
                              >
                                {link}
                              </a>
                            ) : null;
                          })()}
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm mb-2">{project.description}</p>
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Skills */}
            {data.skills.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {data.skills.map((skill) => (
                    <div key={skill.id} className="flex items-center space-x-2">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                          <span className="text-xs text-gray-500">{skill.level}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ 
                              width: `${
                                skill.level === 'Beginner' ? '25%' :
                                skill.level === 'Intermediate' ? '50%' :
                                skill.level === 'Advanced' ? '75%' :
                                '100%'
                              }` 
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            
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
                <span>Edit Resume</span>
              </button>
              <button
                onClick={() => handleDownload('pdf')}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
              <button
                onClick={() => handleDownload('docx')}
                className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download DOCX</span>
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
      </div>
    </div>
  );
};

export default ResumePreview;