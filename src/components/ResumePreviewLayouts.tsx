import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
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

        {/* Custom Sections */}
        {data.customSections?.map((section) => section.items.length > 0 && (
          <div key={section.id} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3 tracking-tight">
              <span className="w-8 h-1.5 inline-block rounded-full" style={{ backgroundColor: themeColorBg }}></span>
              {section.title}
            </h2>
            <div className="space-y-8">
              {section.items.map((item) => (
                <div key={item.id}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                    {item.date && (
                      <span className="text-sm bg-gray-100 text-gray-600 font-medium px-3 py-1.5 rounded-md sm:mt-0 mt-2 inline-block">
                        {item.date}
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <ul className="text-gray-700 text-[15px] space-y-2.5 mt-2">
                      <li className="flex items-start">
                        <span className="mr-3 mt-1" style={{ color: themeColorText }}>▹</span>
                        <span className="leading-relaxed">{item.description}</span>
                      </li>
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
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
