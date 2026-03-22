import React from 'react';
import { MapPin, Mail, Phone, Globe, Linkedin, Calendar, Star } from 'lucide-react';
import { ResumeData } from '../types/resume';

export interface LayoutProps {
  data: ResumeData;
  themeColorText: string;
  themeColorBg: string;
  themeColorBorder: string;
}

export const formatDate = (date: string) => date || 'Present';

export const getNonEmptyProjects = (data: ResumeData) => data.projects.filter(
  (project) =>
    project.name.trim() ||
    project.description.trim() ||
    (project.link && project.link.trim()) ||
    (project.technologies && project.technologies.some((t) => t.trim()))
);

export const StandardLayout: React.FC<LayoutProps> = ({ data, themeColorText, themeColorBg, themeColorBorder }) => {
  const nonEmptyProjects = getNonEmptyProjects(data);

  return (
    <div>
      {/* Header */}
      <div 
        className="border-b-4 pb-8 mb-8 flex flex-col md:flex-row justify-between items-start gap-6"
        style={{ borderColor: themeColorBorder }}
      >
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
            {data.personalInfo.firstName} {data.personalInfo.lastName}
          </h1>
          <p 
            className="text-2xl font-medium mb-6 tracking-wide"
            style={{ color: themeColorText }}
          >{data.personalInfo.title}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 items-center text-sm text-gray-600">
            {data.personalInfo.email && (
              <span className="inline-flex items-center gap-2">
                <Mail className="w-4 h-4" style={{ color: themeColorText }} />{data.personalInfo.email}
              </span>
            )}
            {data.personalInfo.phone && (
              <span className="inline-flex items-center gap-2">
                <Phone className="w-4 h-4" style={{ color: themeColorText }} />{data.personalInfo.phone}
              </span>
            )}
            {data.personalInfo.location && (
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-4 h-4" style={{ color: themeColorText }} />{data.personalInfo.location}
              </span>
            )}
            {data.personalInfo.linkedin && (
              <span className="inline-flex items-center gap-2">
                <Linkedin className="w-4 h-4" style={{ color: themeColorText }} />{data.personalInfo.linkedin}
              </span>
            )}
            {data.personalInfo.website && (
              <span className="inline-flex items-center gap-2">
                <Globe className="w-4 h-4" style={{ color: themeColorText }} />{data.personalInfo.website}
              </span>
            )}
          </div>
        </div>
        
        {data.personalInfo.imageUrl && (
          <div className="flex-shrink-0">
            <img 
              src={data.personalInfo.imageUrl} 
              alt="Profile" 
              className="w-36 h-36 object-cover rounded-lg border-4 shadow-sm"
              style={{ borderColor: themeColorBorder }}
            />
          </div>
        )}
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-8">
          <h2 
            className="text-xl font-bold text-gray-900 mb-4 tracking-tight uppercase border-b-2 pb-2"
            style={{ borderColor: themeColorBorder }}
          >Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed text-[15px]">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 
            className="text-xl font-bold text-gray-900 mb-6 tracking-tight uppercase border-b-2 pb-2"
            style={{ borderColor: themeColorBorder }}
          >Work Experience</h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id} className="border-l-4 pl-5" style={{ borderColor: themeColorBorder }}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                    <p className="font-semibold" style={{ color: themeColorText }}>{exp.company}</p>
                  </div>
                  <span 
                    className="text-sm font-medium text-white px-3 py-1 rounded-full"
                    style={{ backgroundColor: themeColorBg }}
                  >
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </span>
                </div>
                {exp.description.length > 0 && (
                  <ul className="text-gray-700 text-[15px] space-y-2 mt-3">
                    {exp.description.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-3 mt-1" style={{ color: themeColorText }}>•</span>
                        <span className="leading-relaxed">{item}</span>
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
        <div className="mb-8">
          <h2 
            className="text-xl font-bold text-gray-900 mb-6 tracking-tight uppercase border-b-2 pb-2"
            style={{ borderColor: themeColorBorder }}
          >Education</h2>
          <div className="space-y-5">
            {data.education.map((edu) => (
              <div key={edu.id} className="border-l-4 pl-5" style={{ borderColor: themeColorBorder }}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                    <p className="font-medium" style={{ color: themeColorText }}>{edu.institution}</p>
                    {edu.field && <p className="text-gray-600 text-[15px] mt-1">{edu.field}</p>}
                  </div>
                  <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{formatDate(edu.endDate)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {nonEmptyProjects.length > 0 && (
        <div className="mb-8">
          <h2 
            className="text-xl font-bold text-gray-900 mb-6 tracking-tight uppercase border-b-2 pb-2"
            style={{ borderColor: themeColorBorder }}
          >Projects</h2>
          <div className="space-y-6">
            {nonEmptyProjects.map((project) => (
              <div key={project.id} className="border-l-4 pl-5" style={{ borderColor: themeColorBorder }}>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                  {(() => {
                    const link = project.link || '';
                    return link ? (
                      <a
                        href={link.startsWith('http') ? link : `https://${link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:underline font-medium"
                        style={{ color: themeColorText }}
                      >
                        {link}
                      </a>
                    ) : null;
                  })()}
                </div>
                <p className="text-gray-700 text-[15px] leading-relaxed mb-3">{project.description}</p>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 border border-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full"
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
        <div className="mb-8">
          <h2 
            className="text-xl font-bold text-gray-900 mb-6 tracking-tight uppercase border-b-2 pb-2"
            style={{ borderColor: themeColorBorder }}
          >Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {data.skills.map((skill) => (
              <div key={skill.id} className="flex flex-col space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[15px] font-bold text-gray-800">{skill.name}</span>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{skill.level}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full" 
                    style={{ 
                      backgroundColor: themeColorBg,
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
            ))}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      {data.customSections?.map((section) => section.items.length > 0 && (
        <div key={section.id} className="mb-8">
          <h2 
            className="text-xl font-bold text-gray-900 mb-6 tracking-tight uppercase border-b-2 pb-2"
            style={{ borderColor: themeColorBorder }}
          >{section.title}</h2>
          <div className="space-y-6">
            {section.items.map((item) => (
              <div key={item.id} className="border-l-4 pl-5" style={{ borderColor: themeColorBorder }}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                  </div>
                  {item.date && (
                    <span 
                      className="text-sm font-medium text-white px-3 py-1 rounded-full"
                      style={{ backgroundColor: themeColorBg }}
                    >
                      {item.date}
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className="text-gray-700 text-[15px] mt-2 leading-relaxed">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export const TwoColumnLayout: React.FC<LayoutProps> = ({ data, themeColorText, themeColorBg }) => {
  const nonEmptyProjects = getNonEmptyProjects(data);

  return (
    <div className="flex flex-col md:flex-row min-h-full shadow-lg">
      {/* Left Column (Sidebar) */}
      <div 
        className="md:w-[38%] p-8 text-white"
        style={{ backgroundColor: themeColorBg }}
      >
        {/* Header (Left side version) */}
        <div className="mb-8 text-center">
          {data.personalInfo.imageUrl ? (
            <img 
              src={data.personalInfo.imageUrl} 
              alt="Profile" 
              className="w-36 h-36 rounded-full mb-6 object-cover border-4 border-white/20 shadow-md mx-auto"
            />
          ) : (
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 text-white text-4xl font-bold mx-auto">
              {data.personalInfo.firstName[0]}{data.personalInfo.lastName[0]}
            </div>
          )}
          <h1 className="text-4xl font-bold text-white mb-2 leading-tight">
            {data.personalInfo.firstName} <br /> {data.personalInfo.lastName}
          </h1>
          <p className="text-lg font-medium text-white/90 mb-8 tracking-wide">{data.personalInfo.title}</p>
          
          <div className="space-y-4 text-sm text-white/90 text-left">
            <h2 className="text-xs font-bold text-white/70 uppercase tracking-widest border-b border-white/20 pb-2 mb-4">Contact</h2>
            <div className="flex flex-col gap-3">
              {data.personalInfo.email && (
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-white/80 shrink-0 mt-0.5" />
                  <span className="break-all">{data.personalInfo.email}</span>
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-white/80 shrink-0 mt-0.5" />
                  <span className="break-all">{data.personalInfo.phone}</span>
                </div>
              )}
              {data.personalInfo.location && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-white/80 shrink-0 mt-0.5" />
                  <span className="break-words">{data.personalInfo.location}</span>
                </div>
              )}
              {data.personalInfo.linkedin && (
                <div className="flex items-start gap-3">
                  <Linkedin className="w-4 h-4 text-white/80 shrink-0 mt-0.5" />
                  <span className="break-all">{data.personalInfo.linkedin}</span>
                </div>
              )}
              {data.personalInfo.website && (
                <div className="flex items-start gap-3">
                  <Globe className="w-4 h-4 text-white/80 shrink-0 mt-0.5" />
                  <span className="break-all">{data.personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-10 text-left">
            <h2 className="text-xs font-bold text-white/70 uppercase tracking-widest mb-4 border-b border-white/20 pb-2">Skills</h2>
            <div className="space-y-5">
              {data.skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm font-medium text-white/90">{skill.name}</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-1.5">
                    <div 
                      className="bg-white h-1.5 rounded-full" 
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
              ))}
            </div>
          </div>
        )}

        {/* Education (moved to sidebar for two-column) */}
        {data.education.length > 0 && (
          <div className="mb-8 text-left">
            <h2 className="text-xs font-bold text-white/70 uppercase tracking-widest mb-4 border-b border-white/20 pb-2">Education</h2>
            <div className="space-y-5">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="text-xs text-white/60 mb-1 font-semibold">{formatDate(edu.endDate)}</div>
                  <h3 className="font-bold text-white text-sm mb-0.5">{edu.degree}</h3>
                  <p className="text-white/80 text-sm">{edu.institution}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Sections (Moved to sidebar for space-saving) */}
        {data.customSections?.map((section) => section.items.length > 0 && (
          <div key={section.id} className="mb-8 text-left">
            <h2 className="text-xs font-bold text-white/70 uppercase tracking-widest mb-4 border-b border-white/20 pb-2">{section.title}</h2>
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.id}>
                  {item.date && (
                    <div className="text-xs text-white/60 mb-1 font-semibold">{item.date}</div>
                  )}
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-white text-sm">{item.name}</h3>
                  </div>
                  {item.description && (
                    <p className="text-white/80 text-sm leading-relaxed mt-1">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Right Column (Main Content) */}
      <div className="md:w-[62%] p-10 bg-white">
        {/* Summary */}
        {data.summary && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-3 tracking-tight">
              <span className="w-8 h-1.5 inline-block rounded-full" style={{ backgroundColor: themeColorBg }}></span>
              Profile
            </h2>
            <p className="text-gray-700 leading-relaxed text-[15px]">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3 tracking-tight">
              <span className="w-8 h-1.5 inline-block rounded-full" style={{ backgroundColor: themeColorBg }}></span>
              Experience
            </h2>
            <div className="space-y-8">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                      <p className="font-semibold text-lg" style={{ color: themeColorText }}>{exp.company}</p>
                    </div>
                    <span className="text-sm bg-gray-100 text-gray-600 font-medium px-3 py-1.5 rounded-md sm:mt-0 mt-2 inline-block">
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.description.length > 0 && (
                    <ul className="text-gray-700 text-[15px] space-y-2.5 mt-3">
                      {exp.description.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-3 mt-1" style={{ color: themeColorText }}>▹</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {nonEmptyProjects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3 tracking-tight">
              <span className="w-8 h-1.5 inline-block rounded-full" style={{ backgroundColor: themeColorBg }}></span>
              Projects
            </h2>
            <div className="space-y-8">
              {nonEmptyProjects.map((project) => (
                <div key={project.id}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
                    {(() => {
                      const link = project.link || '';
                      return link ? (
                        <a
                          href={link.startsWith('http') ? link : `https://${link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm hover:underline font-medium"
                          style={{ color: themeColorText }}
                        >
                          {link}
                        </a>
                      ) : null;
                    })()}
                  </div>
                  <p className="text-gray-700 text-[15px] leading-relaxed mb-4">{project.description}</p>
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-gray-50 border border-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-full font-medium"
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
      </div>
    </div>
  );
};

export const CenteredLayout: React.FC<LayoutProps> = ({ data, themeColorText, themeColorBg, themeColorBorder }) => {
  const nonEmptyProjects = getNonEmptyProjects(data);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Header (Centered) */}
      <div 
        className="text-center border-b-2 pb-8 mb-10"
        style={{ borderColor: themeColorBorder }}
      >
        {data.personalInfo.imageUrl && (
          <div className="flex justify-center mb-6">
            <img 
              src={data.personalInfo.imageUrl} 
              alt="Profile" 
              className="w-36 h-36 rounded-full object-cover border-4 shadow-sm"
              style={{ borderColor: themeColorBorder }}
            />
          </div>
        )}
        <h1 className="text-5xl font-serif text-gray-900 mb-3 uppercase tracking-wider">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        <p 
          className="text-2xl font-medium tracking-[0.2em] uppercase mb-6"
          style={{ color: themeColorText }}
        >{data.personalInfo.title}</p>
        
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-[15px] text-gray-700">

          {data.personalInfo.email && (
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Mail className="w-4 h-4" style={{ color: themeColorText }} />{data.personalInfo.email}
            </span>
          )}
          {data.personalInfo.phone && (
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Phone className="w-4 h-4" style={{ color: themeColorText }} />{data.personalInfo.phone}
            </span>
          )}
          {data.personalInfo.location && (
            <span className="inline-flex items-center gap-1.5 font-medium">
              <MapPin className="w-4 h-4" style={{ color: themeColorText }} />{data.personalInfo.location}
            </span>
          )}
          {data.personalInfo.linkedin && (
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Linkedin className="w-4 h-4" style={{ color: themeColorText }} />{data.personalInfo.linkedin}
            </span>
          )}
          {data.personalInfo.website && (
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Globe className="w-4 h-4" style={{ color: themeColorText }} />{data.personalInfo.website}
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-10 text-center">
          <p className="text-gray-800 leading-relaxed font-serif italic text-lg max-w-2xl mx-auto">"{data.summary}"</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest text-center mb-8">
            <span className="px-5 bg-white relative z-10">Professional Experience</span>
            <div 
              className="h-px w-full -mt-3 relative z-0 opacity-30"
              style={{ backgroundColor: themeColorBg }}
            ></div>
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-end border-b border-gray-100 pb-2 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                    <p className="font-semibold" style={{ color: themeColorText }}>{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-500 font-medium">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </span>
                </div>
                {exp.description.length > 0 && (
                  <ul className="text-gray-700 text-sm space-y-1.5 pl-4 list-disc marker:text-gray-400">
                    {exp.description.map((item, index) => (
                      <li key={index} className="pl-1 text-justify">
                        {item}
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
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest text-center mb-8 mt-10">
            <span className="px-5 bg-white relative z-10">Education</span>
            <div 
              className="h-px w-full -mt-3 relative z-0 opacity-30"
              style={{ backgroundColor: themeColorBg }}
            ></div>
          </h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</h3>
                  <p className="font-medium" style={{ color: themeColorText }}>{edu.institution}</p>
                </div>
                <span className="text-sm text-gray-500 font-medium">{formatDate(edu.endDate)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {nonEmptyProjects.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest text-center mb-8 mt-10">
            <span className="px-5 bg-white relative z-10">Selected Projects</span>
            <div 
              className="h-px w-full -mt-3 relative z-0 opacity-30"
              style={{ backgroundColor: themeColorBg }}
            ></div>
          </h2>
          <div className="space-y-6">
            {nonEmptyProjects.map((project) => (
              <div key={project.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                  <h3 className="text-lg font-bold text-gray-900">
                    {project.name}
                  </h3>
                  {project.link && (
                    <a
                      href={project.link.startsWith('http') ? project.link : `https://${project.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:underline sm:ml-3 mt-1 sm:mt-0"
                      style={{ color: themeColorText }}
                    >
                      {project.link}
                    </a>
                  )}
                </div>
                <p className="text-gray-800 text-[15px] mb-3 leading-relaxed text-left">{project.description}</p>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-gray-50 border border-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-full font-medium"
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
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest text-center mb-8 mt-10">
            <span className="px-5 bg-white relative z-10">Technical Expertise</span>
            <div 
              className="h-px w-full -mt-3 relative z-0 opacity-30"
              style={{ backgroundColor: themeColorBg }}
            ></div>
          </h2>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {data.skills.map((skill) => (
              <div key={skill.id} className="text-[15px]">
                <span className="font-bold text-gray-900">{skill.name}</span>
                {skill.level && (
                  <span className="text-gray-500 ml-1.5">({skill.level})</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      {data.customSections?.map((section) => section.items.length > 0 && (
        <div key={section.id} className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest text-center mb-10 mt-12 relative">
            <span className="px-5 bg-white relative z-10">{section.title}</span>
            <div 
              className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 z-0"
              style={{ backgroundColor: themeColorBorder }}
            />
          </h2>
          <div className="space-y-8">
            {section.items.map((item) => (
              <div key={item.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                  {item.date && (
                    <span 
                      className="text-[15px] font-bold mt-1 sm:mt-0"
                      style={{ color: themeColorText }}
                    >
                      {item.date}
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className="text-gray-800 text-[15px] leading-relaxed text-left border-l-2 pl-4 italic" style={{ borderColor: themeColorBorder }}>
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export const YellowSidebarLayout: React.FC<LayoutProps> = ({ data, themeColorText, themeColorBg }) => {
  const nonEmptyProjects = getNonEmptyProjects(data);

  return (
    <div className="flex flex-col md:flex-row min-h-[1056px] bg-white relative">
      {/* Left and Right Borders (Simulating the Lou Alvarez style) */}
      <div className="absolute left-0 top-0 bottom-0 w-4" style={{ backgroundColor: themeColorBg }}></div>
      <div className="absolute right-0 top-0 bottom-0 w-4" style={{ backgroundColor: themeColorBg }}></div>
      
      {/* Left Column */}
      <div className="md:w-[32%] pl-10 pr-6 py-12 flex flex-col bg-[#FFFBF0] ml-4 min-h-full">
        {/* Profile Image */}
        {data.personalInfo.imageUrl && (
          <div className="mb-8">
            <img 
              src={data.personalInfo.imageUrl} 
              alt="Profile" 
              className="w-40 h-40 object-cover rounded-sm border-2"
              style={{ borderColor: themeColorText }}
            />
          </div>
        )}

        {/* Contact */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4 tracking-wider uppercase">Contact</h2>
          <div className="space-y-3 text-[13px] font-medium text-gray-800">
            {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
            {data.personalInfo.phone && (
              <div><span className="font-bold">Mobile:</span> {data.personalInfo.phone}</div>
            )}
            {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
            {data.personalInfo.linkedin && <div>{data.personalInfo.linkedin}</div>}
            {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
          </div>
        </div>

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-bold text-gray-900 mb-4 tracking-wider uppercase">Skills</h2>
            <ul className="space-y-2 text-[13px] font-medium text-gray-800 list-disc ml-4">
              {data.skills.map((skill) => (
                <li key={skill.id} className="pl-1 leading-snug">{skill.name}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-bold text-gray-900 mb-4 tracking-wider uppercase">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="text-[13px] text-gray-800">
                  <div className="text-gray-500 mb-1">{formatDate(edu.endDate)}</div>
                  <div className="font-medium leading-snug">{edu.degree}{edu.field ? `: ${edu.field}` : ''}</div>
                  <div className="font-bold mt-1">{edu.institution}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column */}
      <div className="md:w-[68%] pr-14 pl-10 py-12 flex flex-col mr-4 bg-white">
        {/* Header */}
        <div className="mb-12 mt-4">
          <h1 className="text-4xl font-black text-gray-900 tracking-widest uppercase mb-4">
            {data.personalInfo.firstName} &nbsp; {data.personalInfo.lastName}
          </h1>
          <div className="h-1 w-16" style={{ backgroundColor: themeColorBg }}></div>
        </div>

        {/* Summary */}
        {data.summary && (
          <div className="mb-10">
            <h2 className="text-lg font-bold text-gray-900 mb-4 tracking-widest uppercase">Professional Summary</h2>
            <p className="text-[14px] text-gray-800 leading-relaxed font-medium">
              {data.summary}
            </p>
          </div>
        )}

        {/* Work History */}
        {data.experience.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-bold text-gray-900 mb-6 tracking-widest uppercase">Work History</h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="text-[14px] text-gray-600 mb-1">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </div>
                  <div className="text-[15px] mb-2 leading-snug">
                    <span className="font-bold text-gray-900">{exp.position}</span>
                    {exp.company && <>, <span className="font-bold italic text-gray-800">{exp.company}</span></>}
                  </div>
                  {exp.description.length > 0 && (
                    <ul className="text-[14px] text-gray-800 space-y-2 list-disc ml-4 font-medium">
                      {exp.description.map((item, index) => (
                        <li key={index} className="pl-1 leading-relaxed">{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {nonEmptyProjects.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-bold text-gray-900 mb-6 tracking-widest uppercase">Projects</h2>
            <div className="space-y-6">
              {nonEmptyProjects.map((project) => (
                <div key={project.id}>
                  <div className="text-[15px] font-bold text-gray-900 mb-2 leading-snug">
                    {project.name}
                    {project.link && (
                      <span className="ml-2 text-sm font-normal text-gray-500">({project.link})</span>
                    )}
                  </div>
                  <p className="text-[14px] text-gray-800 leading-relaxed mb-1 font-medium">{project.description}</p>
                  {project.technologies.length > 0 && (
                    <p className="text-[13px] text-gray-600 italic">
                      Tech: {project.technologies.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const NavySidebarLayout: React.FC<LayoutProps> = ({ data, themeColorText, themeColorBg }) => {
  const nonEmptyProjects = getNonEmptyProjects(data);

  return (
    <div className="flex flex-col md:flex-row min-h-[1056px] shadow-sm">
      {/* Left Column (Main Content) */}
      <div className="md:w-[65%] p-10 bg-white">
        {/* Header */}
        <div className="flex items-center gap-6 mb-10 pb-8 border-b border-gray-200">
          {data.personalInfo.imageUrl && (
            <img 
              src={data.personalInfo.imageUrl} 
              alt="Profile" 
              className="w-20 h-20 rounded-full object-cover shadow-sm border-2"
              style={{ borderColor: themeColorText }}
            />
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">{data.personalInfo.firstName} {data.personalInfo.lastName}</h1>
            <p className="text-[13px] text-gray-500 uppercase tracking-widest font-semibold">{data.personalInfo.title}</p>
          </div>
        </div>

        {/* Profile/Summary */}
        {data.summary && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Profile</h2>
            <p className="text-sm text-gray-600 leading-relaxed text-justify">
              {data.summary}
            </p>
          </div>
        )}

        {/* Employment History */}
        {data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Employment History</h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <h3 className="text-[15px] font-bold text-gray-800">
                    {exp.position}, {exp.company}
                  </h3>
                  <p className="text-xs text-gray-400 uppercase font-semibold mb-3 tracking-wider">
                    {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                  </p>
                  {exp.description.length > 0 && (
                    <ul className="text-sm text-gray-600 space-y-1.5 list-disc ml-4">
                      {exp.description.map((item, index) => (
                        <li key={index} className="pl-1 leading-relaxed">{item}</li>
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
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Education</h2>
            <div className="space-y-5">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="text-[15px] font-bold text-gray-800">
                    {edu.degree}{edu.field ? `, ${edu.field}` : ''}, {edu.institution}
                  </h3>
                  <p className="text-xs text-gray-400 uppercase font-semibold mb-1 tracking-wider">
                    {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {nonEmptyProjects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Projects</h2>
            <div className="space-y-5">
              {nonEmptyProjects.map((project) => (
                <div key={project.id}>
                  <h3 className="text-[15px] font-bold text-gray-800 mb-1">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                    {project.description}
                  </p>
                  {project.technologies.length > 0 && (
                    <p className="text-[13px] text-gray-500 font-medium">
                      Technologies: {project.technologies.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column (Sidebar) */}
      <div className="md:w-[35%] py-10 px-8 text-white min-h-full" style={{ backgroundColor: themeColorBg }}>
        {/* Details */}
        <div className="mb-10">
          <h2 className="text-lg font-medium text-white mb-4 border-b border-white/20 pb-2">Details</h2>
          <div className="space-y-3 text-sm text-white/90">
            {data.personalInfo.location && (
              <div>
                <div className="text-white/60 text-xs mb-0.5">Location</div>
                <div>{data.personalInfo.location}</div>
              </div>
            )}
            {data.personalInfo.phone && (
              <div>
                <div className="text-white/60 text-xs mb-0.5">Phone</div>
                <div>{data.personalInfo.phone}</div>
              </div>
            )}
            {data.personalInfo.email && (
              <div>
                <div className="text-white/60 text-xs mb-0.5">Email</div>
                <div className="break-all">{data.personalInfo.email}</div>
              </div>
            )}
            {data.personalInfo.linkedin && (
              <div>
                <div className="text-white/60 text-xs mb-0.5">LinkedIn</div>
                <div className="break-all">{data.personalInfo.linkedin}</div>
              </div>
            )}
            {data.personalInfo.website && (
              <div>
                <div className="text-white/60 text-xs mb-0.5">Portfolio</div>
                <div className="break-all">{data.personalInfo.website}</div>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-medium text-white mb-4 border-b border-white/20 pb-2">Skills</h2>
            <div className="space-y-4">
              {data.skills.map((skill) => (
                <div key={skill.id}>
                  <div className="text-sm text-white/90 mb-1.5">{skill.name}</div>
                  <div className="w-full bg-white/20 h-1">
                    <div 
                      className="bg-white h-1" 
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
              ))}
            </div>
          </div>
        )}

        {/* Languages (Simulated as skills or custom section but mapped to skills area generally) */}
      </div>
    </div>
  );
};

export const FormalRedLayout: React.FC<LayoutProps> = ({ data, themeColorText }) => {
  const nonEmptyProjects = getNonEmptyProjects(data);

  return (
    <div className="flex flex-col md:flex-row min-h-[1056px] bg-[#FAFAFA] font-serif p-8 md:p-14">
      {/* Left Main Column */}
      <div className="md:w-[75%] pr-10">
        <div className="flex items-start gap-6 mb-8 pb-6 border-b border-gray-300">
          {data.personalInfo.imageUrl && (
            <img 
              src={data.personalInfo.imageUrl} 
              alt="Profile" 
              className="w-24 h-24 object-cover border border-gray-200 p-1 bg-white"
            />
          )}
          <div>
            <h1 className="text-4xl font-normal mb-2 tracking-wide" style={{ color: themeColorText }}>
              {data.personalInfo.firstName} {data.personalInfo.lastName}
              {data.personalInfo.title && <span className="text-gray-700">, {data.personalInfo.title}</span>}
            </h1>
            <div className="text-[13px] text-gray-500 flex flex-wrap gap-x-3 gap-y-1 tracking-wider uppercase font-sans">
              {data.personalInfo.location && <span>{data.personalInfo.location} &middot;</span>}
              {data.personalInfo.email && <span>{data.personalInfo.email} &middot;</span>}
              {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
            </div>
          </div>
        </div>

        {data.summary && (
          <div className="mb-8">
            <h2 className="text-[15px] font-semibold tracking-[0.2em] uppercase text-gray-800 mb-4 pb-1">Profile</h2>
            <p className="text-[14px] text-gray-700 leading-relaxed text-justify">
              {data.summary}
            </p>
          </div>
        )}

        {data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-[15px] font-semibold tracking-[0.2em] uppercase text-gray-800 mb-5 pb-1">Employment History</h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <h3 className="text-[16px] font-bold text-gray-900 mb-1">
                    {exp.position}, {exp.company}
                  </h3>
                  <p className="text-[13px] text-gray-500 italic mb-3 font-sans tracking-wide">
                    {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                  </p>
                  {exp.description.length > 0 && (
                    <ul className="text-[14px] text-gray-700 space-y-2 list-disc ml-5">
                      {exp.description.map((item, index) => (
                        <li key={index} className="pl-1 leading-relaxed text-justify">{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {data.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-[15px] font-semibold tracking-[0.2em] uppercase text-gray-800 mb-5 pb-1">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="text-[16px] font-bold text-gray-900 mb-1">
                    {edu.institution}, {edu.degree}
                  </h3>
                  <p className="text-[13px] text-gray-500 italic font-sans tracking-wide">
                    {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar Column */}
      <div className="md:w-[25%] pl-8 border-l border-gray-300">
        {data.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-[15px] font-semibold tracking-[0.2em] uppercase text-gray-800 mb-5 pb-1">Skills</h2>
            <div className="space-y-3">
              {data.skills.map((skill) => (
                <div key={skill.id} className="text-[14px] text-gray-800 pb-2 border-b border-gray-200 last:border-0 hover:bg-gray-100 transition-colors cursor-default">
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {nonEmptyProjects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-[15px] font-semibold tracking-[0.2em] uppercase text-gray-800 mb-5 pb-1 mt-6">Projects</h2>
            <div className="space-y-5">
              {nonEmptyProjects.map((project) => (
                <div key={project.id}>
                  <h3 className="text-[14px] font-bold text-gray-900 mb-1">
                    {project.name}
                  </h3>
                  {project.link && (
                    <a href={project.link} className="text-[12px] text-gray-500 hover:underline italic mb-2 block font-sans tracking-wide truncate">
                      {project.link}
                    </a>
                  )}
                  {project.technologies.length > 0 && (
                    <p className="text-[12px] text-gray-600 font-medium">
                      {project.technologies.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const TimelineDarkLayout: React.FC<LayoutProps> = ({ data, themeColorText, themeColorBg }) => {
  const nonEmptyProjects = getNonEmptyProjects(data);

  return (
    <div className="flex flex-col md:flex-row min-h-[1056px] bg-white relative">
      {/* Left Column */}
      <div className="md:w-[32%] bg-[#E5E7EB] flex flex-col items-center pt-10 pb-10">
        {/* Profile Pic overlapping or just at top */}
        {data.personalInfo.imageUrl && (
          <div className="mb-8 w-40 h-40 rounded-full border-4 border-white overflow-hidden shadow-sm">
            <img 
              src={data.personalInfo.imageUrl} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="w-full px-8 text-left">
          {/* Contact */}
          <div className="mb-10">
            <h2 className="text-[16px] font-bold text-gray-900 tracking-widest uppercase mb-4 py-1 border-b-2 border-gray-400 inline-block">Contact</h2>
            <div className="space-y-4 text-[13px] text-gray-800 font-medium">
              {data.personalInfo.phone && <div className="flex items-center gap-3"><Phone className="w-4 h-4"/>{data.personalInfo.phone}</div>}
              {data.personalInfo.email && <div className="flex items-center gap-3"><Mail className="w-4 h-4"/>{data.personalInfo.email}</div>}
              {data.personalInfo.location && <div className="flex items-center gap-3"><MapPin className="w-4 h-4"/>{data.personalInfo.location}</div>}
              {data.personalInfo.website && <div className="flex items-center gap-3"><Globe className="w-4 h-4"/>{data.personalInfo.website}</div>}
              {data.personalInfo.linkedin && <div className="flex items-center gap-3"><Linkedin className="w-4 h-4"/>{data.personalInfo.linkedin}</div>}
            </div>
          </div>

          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="mb-10">
              <h2 className="text-[16px] font-bold text-gray-900 tracking-widest uppercase mb-4 py-1 border-b-2 border-gray-400 inline-block">Skills</h2>
              <ul className="space-y-3 text-[13px] text-gray-800 font-medium list-disc ml-5">
                {data.skills.map(skill => (
                  <li key={skill.id} className="pl-1 leading-snug">{skill.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Right Column */}
      <div className="md:w-[68%] flex flex-col">
        {/* Header Block */}
        <div className="pt-16 pb-12 px-12 text-white" style={{ backgroundColor: themeColorBg }}>
          <h1 className="text-5xl font-bold uppercase tracking-wide mb-3">{data.personalInfo.firstName} {data.personalInfo.lastName}</h1>
          <h2 className="text-xl font-light tracking-widest uppercase" style={{ color: themeColorText }}>{data.personalInfo.title}</h2>
        </div>

        {/* Main Content */}
        <div className="p-12 pl-16">
           {/* Profile */}
           {data.summary && (
             <div className="mb-10 relative">
               <div className="absolute -left-10 top-2 w-5 h-5 rounded-full z-10" style={{ backgroundColor: themeColorBg }}></div>
               <div className="absolute -left-[31px] top-6 bottom-[-20px] w-0.5 bg-gray-300"></div>
               <h2 className="text-xl font-bold tracking-widest text-gray-900 uppercase mb-4">Profile</h2>
               <p className="text-[14px] text-gray-700 leading-relaxed text-justify relative z-10 bg-white">
                 {data.summary}
               </p>
             </div>
           )}

           {/* Experience */}
           {data.experience.length > 0 && (
             <div className="mb-10 relative">
               <div className="absolute -left-10 top-2 w-5 h-5 rounded-full z-10 flex items-center justify-center" style={{ backgroundColor: themeColorBg }}>
                 <div className="w-2 h-2 bg-white rounded-full"></div>
               </div>
               <div className="absolute -left-[31px] top-6 bottom-[-20px] w-0.5 bg-gray-300"></div>
               <h2 className="text-xl font-bold tracking-widest text-gray-900 uppercase mb-6 relative z-10 bg-white inline-block pr-2">Work Experience</h2>
               <div className="space-y-8 relative z-10">
                 {data.experience.map((exp) => (
                   <div key={exp.id} className="relative">
                     {/* Node dot on the continuous line */}
                     <div className="absolute -left-10 top-1.5 w-3 h-3 rounded-full border-[3px] border-white z-20" style={{ backgroundColor: themeColorBg }}></div>
                     <div className="mb-1 font-bold text-[15px] text-gray-900 flex justify-between items-center">
                       <span>{exp.company}</span>
                       <span className="text-[13px] text-gray-500 font-normal">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                     </div>
                     <div className="text-[14px] font-medium text-gray-700 mb-2">{exp.position}</div>
                     {exp.description.length > 0 && (
                       <ul className="text-[13px] text-gray-600 list-disc ml-4 space-y-1">
                         {exp.description.map((item, i) => (
                           <li key={i} className="pl-1 leading-relaxed text-justify">{item}</li>
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
             <div className="mb-10 relative">
               <div className="absolute -left-10 top-2 w-5 h-5 rounded-full z-10 flex items-center justify-center" style={{ backgroundColor: themeColorBg }}>
                 <div className="w-2 h-2 bg-white rounded-full"></div>
               </div>
               <div className="absolute -left-[31px] top-6 bottom-[-20px] w-0.5 bg-gray-300"></div>
               <h2 className="text-xl font-bold tracking-widest text-gray-900 uppercase mb-6 relative z-10 bg-white inline-block pr-2">Education</h2>
               <div className="space-y-6 relative z-10">
                 {data.education.map(edu => (
                   <div key={edu.id} className="relative">
                     <div className="absolute -left-10 top-1.5 w-3 h-3 rounded-full border-[3px] border-white z-20" style={{ backgroundColor: themeColorBg }}></div>
                     <div className="mb-1 font-bold text-[15px] text-gray-900 flex justify-between items-center">
                       <span>{edu.degree}</span>
                       <span className="text-[13px] text-gray-500 font-normal">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                     </div>
                     <div className="text-[14px] font-medium text-gray-700">{edu.institution}</div>
                   </div>
                 ))}
               </div>
             </div>
           )}

           {/* Projects */}
           {nonEmptyProjects.length > 0 && (
             <div className="mb-10 relative">
               <div className="absolute -left-10 top-2 w-5 h-5 rounded-full z-10 flex items-center justify-center" style={{ backgroundColor: themeColorBg }}>
                 <div className="w-2 h-2 bg-white rounded-full"></div>
               </div>
               <h2 className="text-xl font-bold tracking-widest text-gray-900 uppercase mb-6 relative z-10 bg-white inline-block pr-2">Projects</h2>
               <div className="space-y-6 relative z-10">
                 {nonEmptyProjects.map(project => (
                   <div key={project.id} className="relative">
                     <div className="absolute -left-10 top-1.5 w-3 h-3 rounded-full border-[3px] border-white z-20" style={{ backgroundColor: themeColorBg }}></div>
                     <div className="font-bold text-[15px] text-gray-900 mb-1">{project.name}</div>
                     <div className="text-[13px] text-gray-700 mb-2">{project.description}</div>
                     {project.technologies.length > 0 && (
                       <div className="text-[12px] text-gray-500 italic">Tech: {project.technologies.join(', ')}</div>
                     )}
                   </div>
                 ))}
               </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export const GeometricBlueLayout: React.FC<LayoutProps> = ({ data, themeColorText, themeColorBg }) => {
  const nonEmptyProjects = getNonEmptyProjects(data);

  return (
    <div className="flex flex-col md:flex-row min-h-[1056px] shadow-sm">
      {/* Left Column */}
      <div className="md:w-[32%] bg-[#F5F7FA] relative overflow-hidden flex flex-col">
        {/* Geometric Header shape */}
        <div 
          className="absolute top-0 left-0 right-0 h-[160px]" 
          style={{ 
            backgroundColor: themeColorBg,
            clipPath: 'polygon(0 0, 100% 0, 100% 25%, 0 100%)' 
          }}>
        </div>
        
        {/* Profile — pt-7 centers the avatar on the blue/gray diagonal */}
        <div className="pt-7 pb-6 flex justify-center relative z-10 w-full px-6">
          {data.personalInfo.imageUrl ? (
            <img 
              src={data.personalInfo.imageUrl} 
              alt="Profile" 
              className="w-36 h-36 rounded-full object-cover border-8 border-white shadow-md mx-auto"
            />
          ) : (
            <div className="w-36 h-36 rounded-full bg-white border-8 border-gray-100 shadow-md mx-auto flex items-center justify-center">
               <span className="text-3xl text-gray-400 font-bold">{data.personalInfo.firstName?.[0] ?? '?'}</span>
            </div>
          )}
        </div>
        
        <div className="text-center px-6 mb-8">
          <h1 className="text-3xl font-regular text-gray-800 leading-tight" style={{ color: themeColorText }}>
            {data.personalInfo.firstName} <br/>
            <span className="font-bold">{data.personalInfo.lastName}</span>
          </h1>
          <p className="text-[14px] text-gray-500 mt-2 font-medium tracking-wide">{data.personalInfo.title}</p>
        </div>

        <div className="px-6 mt-4">
          {/* Contact */}
          <div className="mb-8">
            <h2 className="text-[15px] font-bold text-gray-800 border-b border-gray-300 pb-2 mb-4 flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-400"/> Contact
            </h2>
            <div className="space-y-3 text-[13px] text-gray-600 font-medium">
              {data.personalInfo.phone && (
                <div className="flex items-start gap-2 break-words">
                  <Phone className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <span>{data.personalInfo.phone}</span>
                </div>
              )}
              {data.personalInfo.email && (
                <div className="flex items-start gap-2 break-words">
                  <Mail className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <span>{data.personalInfo.email}</span>
                </div>
              )}
              {data.personalInfo.location && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <span>{data.personalInfo.location}</span>
                </div>
              )}
              {data.personalInfo.linkedin && (
                <div className="flex items-start gap-2 break-words">
                  <Linkedin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <span>{data.personalInfo.linkedin}</span>
                </div>
              )}
              {data.personalInfo.website && (
                <div className="flex items-start gap-2 break-words">
                  <Globe className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <span>{data.personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* About */}
          {data.summary && (
            <div className="mb-8">
              <h2 className="text-[15px] font-bold text-gray-800 border-b border-gray-300 pb-2 mb-4">About Me</h2>
              <p className="text-[13px] text-gray-600 leading-relaxed text-left">
                {data.summary}
              </p>
            </div>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-[15px] font-bold text-gray-800 border-b border-gray-300 pb-2 mb-4">Skills</h2>
              <ul className="space-y-2 text-[13px] text-gray-600 list-disc ml-4 font-medium">
                {data.skills.map(skill => (
                  <li key={skill.id} className="pl-1 leading-snug">{skill.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Right Column */}
      <div className="md:w-[68%] bg-white p-12 pr-16 pl-14">
        
        {/* Education Route */}
        {data.education.length > 0 && (
          <div className="mb-12">
            <h2 className="text-[18px] font-bold text-gray-800 mb-6 flex items-center gap-2">
              <div className="p-1.5 rounded-sm bg-gray-100"><MapPin className="w-5 h-5 text-gray-600"/></div>
              Education
            </h2>
            <div className="space-y-6 relative border-l-2 ml-4 pl-6" style={{ borderColor: themeColorText }}>
              {data.education.map(edu => (
                <div key={edu.id} className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full border-2 border-white" style={{ backgroundColor: themeColorBg }}></div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-[15px] font-bold text-gray-800">{edu.degree}</h3>
                    <span className="text-[12px] text-gray-500 font-medium">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                  </div>
                  <div className="text-[14px] text-gray-600 italic font-medium">{edu.institution}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience Route */}
        {data.experience.length > 0 && (
          <div className="mb-12">
            <h2 className="text-[18px] font-bold text-gray-800 mb-6 flex items-center gap-2">
              <div className="p-1.5 rounded-sm bg-gray-100"><MapPin className="w-5 h-5 text-gray-600"/></div>
              Experience
            </h2>
            <div className="space-y-8 relative border-l-2 ml-4 pl-6" style={{ borderColor: themeColorText }}>
              {data.experience.map(exp => (
                <div key={exp.id} className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full border-2 border-white" style={{ backgroundColor: themeColorBg }}></div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-[15px] font-bold text-gray-800">{exp.position}</h3>
                    <span className="text-[12px] text-gray-500 font-medium">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                  </div>
                  <div className="text-[14px] text-gray-600 italic font-medium mb-3">{exp.company}</div>
                  {exp.description.length > 0 && (
                    <p className="text-[13px] text-gray-500 list-inside leading-relaxed text-justify">
                      {exp.description.join(' ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Route */}
        {nonEmptyProjects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-[18px] font-bold text-gray-800 mb-6 flex items-center gap-2">
              <div className="p-1.5 rounded-sm bg-gray-100"><MapPin className="w-5 h-5 text-gray-600"/></div>
              Projects
            </h2>
            <div className="space-y-8 relative border-l-2 ml-4 pl-6" style={{ borderColor: themeColorText }}>
              {nonEmptyProjects.map(project => (
                <div key={project.id} className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full border-2 border-white" style={{ backgroundColor: themeColorBg }}></div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-[15px] font-bold text-gray-800">{project.name}</h3>
                  </div>
                  <div className="text-[13px] text-gray-600 leading-relaxed mb-2 text-justify">{project.description}</div>
                  {project.technologies.length > 0 && (
                    <div className="text-[12px] text-gray-400 font-medium">Tools: {project.technologies.join(', ')}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export const ProfessionalNavyHeaderLayout: React.FC<LayoutProps> = ({ data }) => {
  const nonEmptyProjects = getNonEmptyProjects(data);

  return (
    <div className="flex flex-col min-h-[1056px] bg-white font-sans text-gray-800">
      {/* Header Block */}
      <div className="bg-[#1E293B] text-white p-10 flex justify-between items-center">
        <div className="flex-1">
          <h1 className="text-4xl font-bold tracking-wide mb-2">{data.personalInfo.firstName} {data.personalInfo.lastName}</h1>
          <h2 className="text-lg font-medium tracking-wider mb-4 text-[#94A3B8]">{data.personalInfo.title}</h2>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] font-medium text-gray-300">
            {data.personalInfo.email && <div className="flex items-center gap-2"><Mail className="w-4 h-4"/>{data.personalInfo.email}</div>}
            {data.personalInfo.linkedin && <div className="flex items-center gap-2"><Linkedin className="w-4 h-4"/>{data.personalInfo.linkedin}</div>}
            {data.personalInfo.location && <div className="flex items-center gap-2"><MapPin className="w-4 h-4"/>{data.personalInfo.location}</div>}
            {data.personalInfo.phone && <div className="flex items-center gap-2"><Phone className="w-4 h-4"/>{data.personalInfo.phone}</div>}
            {data.personalInfo.website && <div className="flex items-center gap-2"><Globe className="w-4 h-4"/>{data.personalInfo.website}</div>}
          </div>
        </div>
        {data.personalInfo.imageUrl && (
          <div className="w-32 h-32 ml-6 rounded-full overflow-hidden border-4 border-gray-400/30 flex-shrink-0">
            <img 
              src={data.personalInfo.imageUrl} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row flex-1">
        {/* Left Main Column */}
        <div className="md:w-[65%] p-10 pr-8">
          
          {/* Summary */}
          {data.summary && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-700 tracking-widest uppercase mb-3 border-b-2 border-gray-200 pb-1">Summary</h2>
              <p className="text-[14px] text-gray-600 leading-relaxed text-justify">
                {data.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-700 tracking-widest uppercase mb-4 border-b-2 border-gray-200 pb-1">Experience</h2>
              <div className="space-y-6">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <h3 className="text-[16px] font-semibold text-gray-800 mb-1">
                      {exp.position}
                    </h3>
                    <div className="flex items-center justify-between mb-3 text-[14px]">
                      <span className="font-bold text-[#1E293B]">{exp.company}</span>
                      <div className="flex items-center gap-4 text-gray-500 font-medium">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5"/> {formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                      </div>
                    </div>
                    {exp.description.length > 0 && (
                      <ul className="text-[13px] text-gray-600 space-y-1.5 list-disc ml-4">
                        {exp.description.map((item, index) => (
                          <li key={index} className="pl-1 leading-relaxed text-justify">{item}</li>
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
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-700 tracking-widest uppercase mb-4 border-b-2 border-gray-200 pb-1">Education</h2>
              <div className="space-y-5">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="text-[16px] font-semibold text-gray-800 mb-1">{edu.degree}</h3>
                    <div className="flex items-center justify-between mb-2 text-[14px]">
                      <span className="font-bold text-[#1E293B]">{edu.institution}</span>
                      <span className="flex items-center gap-1 text-gray-500 font-medium whitespace-nowrap"><Calendar className="w-3.5 h-3.5"/> {formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="md:w-[35%] py-10 pr-10 pl-2">
          
          {/* Projects as Strengths */}
          {nonEmptyProjects.length > 0 && (
            <div className="mb-10">
              <h2 className="text-lg font-bold text-gray-700 tracking-widest uppercase mb-4 border-b-2 border-gray-200 pb-1">Strengths</h2>
              <div className="space-y-5">
                {nonEmptyProjects.map((project) => (
                  <div key={project.id} className="flex gap-3">
                    <div className="mt-1 flex-shrink-0 text-[#1E293B]">
                       <Star className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <h3 className="text-[14px] font-bold text-gray-900 mb-1">{project.name}</h3>
                      <p className="text-[12px] text-gray-600 leading-relaxed text-justify">{project.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="mb-10">
              <h2 className="text-lg font-bold text-gray-700 tracking-widest uppercase mb-4 border-b-2 border-gray-200 pb-1">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <div key={skill.id} className="text-[13px] font-bold text-gray-800 bg-gray-100 px-3 py-1.5 rounded-sm border-b-2 border-gray-300">
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export const CleanBlueAccentLayout: React.FC<LayoutProps> = ({ data, themeColorText }) => {
  const nonEmptyProjects = getNonEmptyProjects(data);

  return (
    <div className="flex flex-col min-h-[1056px] bg-white font-sans">
      {/* Header Block */}
      <div className="pt-12 px-12 pb-6 flex justify-between items-start">
        <div className="flex-1 mt-4">
          <h1 className="text-5xl font-black uppercase tracking-tight mb-2 text-gray-900">{data.personalInfo.firstName} {data.personalInfo.lastName}</h1>
          <h2 className="text-xl font-semibold mb-4" style={{ color: themeColorText || '#2563EB' }}>{data.personalInfo.title}</h2>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] font-bold text-gray-700">
            {data.personalInfo.phone && <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-blue-500"/>{data.personalInfo.phone}</div>}
            {data.personalInfo.email && <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-blue-500"/>{data.personalInfo.email}</div>}
            {data.personalInfo.linkedin && <div className="flex items-center gap-2"><Linkedin className="w-4 h-4 text-blue-500"/>{data.personalInfo.linkedin}</div>}
            {data.personalInfo.location && <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-500"/>{data.personalInfo.location}</div>}
          </div>
        </div>
        {data.personalInfo.imageUrl && (
          <div className="w-40 h-40 ml-6 rounded-full overflow-hidden shadow-lg flex-shrink-0">
            <img 
              src={data.personalInfo.imageUrl} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row flex-1 px-12 pb-12 gap-10">
        {/* Left Column */}
        <div className="md:w-[50%]">
          
          {/* Summary */}
          {data.summary && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 tracking-wider uppercase mb-3 border-b-[3px] border-black pb-1">Summary</h2>
              <p className="text-[14px] text-gray-700 leading-relaxed text-justify">
                {data.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 tracking-wider uppercase mb-5 border-b-[3px] border-black pb-1">Experience</h2>
              <div className="space-y-6">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <h3 className="text-[16px] font-bold text-gray-800 mb-1">
                      {exp.position}
                    </h3>
                    <div className="flex items-center justify-between mb-3 text-[14px]">
                      <span className="font-bold" style={{ color: themeColorText || '#2563EB' }}>{exp.company}</span>
                      <div className="flex items-center gap-1 text-gray-500 font-medium">
                        <Calendar className="w-3.5 h-3.5"/> {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                      </div>
                    </div>
                    {exp.description.length > 0 && (
                      <ul className="text-[13px] text-gray-700 space-y-1.5 list-disc ml-5">
                        {exp.description.map((item, index) => (
                          <li key={index} className="pl-1 leading-relaxed text-justify">{item}</li>
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
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 tracking-wider uppercase mb-5 border-b-[3px] border-black pb-1">Education</h2>
              <div className="space-y-5">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="text-[16px] font-bold text-gray-800 mb-1">{edu.degree}</h3>
                    <div className="flex items-center justify-between mb-2 text-[14px]">
                      <span className="font-bold" style={{ color: themeColorText || '#2563EB' }}>{edu.institution}</span>
                      <span className="flex items-center gap-1 text-gray-500 font-medium whitespace-nowrap"><Calendar className="w-3.5 h-3.5"/> {formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="md:w-[50%]">
          
          {/* Projects */}
          {nonEmptyProjects.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 tracking-wider uppercase mb-5 border-b-[3px] border-black pb-1">Projects</h2>
              <div className="space-y-5">
                {nonEmptyProjects.map((project) => (
                  <div key={project.id}>
                    <h3 className="text-[16px] font-bold text-gray-900 mb-1">{project.name}</h3>
                    <p className="text-[13px] text-gray-700 leading-relaxed text-justify mb-1">{project.description}</p>
                    {project.technologies.length > 0 && (
                       <div className="text-[12px] font-medium text-gray-500">Links/Tech: {project.link ? project.link : project.technologies.join(', ')}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Achievements mapped from Custom Sections or just mock it or map extra projects */}
          {data.customSections?.map((section) => section.items.length > 0 && (
            <div key={section.id} className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 tracking-wider uppercase mb-5 border-b-[3px] border-black pb-1">{section.title}</h2>
              <div className="space-y-5">
                {section.items.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <div className="mt-1 flex-shrink-0" style={{ color: themeColorText || '#2563EB' }}>
                        <Star className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-[14px] font-bold text-gray-900 mb-1">{item.name}</h3>
                      <p className="text-[13px] text-gray-700 leading-relaxed text-justify">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 tracking-wider uppercase mb-5 border-b-[3px] border-black pb-1">Skills</h2>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {data.skills.map((skill) => (
                  <div key={skill.id} className="text-[14px] font-bold text-gray-800 border-b border-gray-300 pb-1">
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

