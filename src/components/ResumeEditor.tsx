import React, { useState, useRef } from 'react';
import { Plus, Trash2, ArrowRight, Upload, Image as ImageIcon, X } from 'lucide-react';
import { ResumeData, Experience, Education, Skill } from '../types/resume';

const TechnologyInput = ({ technologies, onChange }: { technologies: string[], onChange: (techs: string[]) => void }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTechnology();
    }
  };

  const addTechnology = () => {
    const trimmedValue = inputValue.trim();
    // Don't add completely empty strings, and avoid duplicates if exactly matching
    if (trimmedValue && !technologies.includes(trimmedValue)) {
      onChange([...technologies, trimmedValue]);
    }
    setInputValue('');
  };

  const removeTechnology = (techToRemove: string) => {
    onChange(technologies.filter(tech => tech !== techToRemove));
  };

  return (
    <div className="w-full">
      {technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {technologies.map((tech, index) => (
            <span key={index} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {tech}
              <button 
                type="button" 
                onClick={(e) => { e.preventDefault(); removeTechnology(tech); }}
                className="flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200 text-blue-600 focus:outline-none"
                title={`Remove ${tech}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addTechnology}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder={technologies.length === 0 ? "e.g., React, Node.js (Press Enter to add)" : "Add more technologies..."}
      />
    </div>
  );
};

interface ResumeEditorProps {
  initialData: ResumeData | null;
  onDataUpdate: (data: ResumeData) => void;
  onNext: () => void;
}

const ResumeEditor: React.FC<ResumeEditorProps> = ({ initialData, onDataUpdate, onNext }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<ResumeData>(initialData || {
    personalInfo: {
      firstName: '',
      lastName: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: []
  });

  const updatePersonalInfo = (field: string, value: string) => {
    const updated = {
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        [field]: value
      }
    };
    setFormData(updated);
    onDataUpdate(updated);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updatePersonalInfo('imageUrl', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    updatePersonalInfo('imageUrl', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const updateSummary = (value: string) => {
    const updated = { ...formData, summary: value };
    setFormData(updated);
    onDataUpdate(updated);
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: []
    };
    const updated = {
      ...formData,
      experience: [...formData.experience, newExp]
    };
    setFormData(updated);
    onDataUpdate(updated);
  };

  const updateExperience = (id: string, field: string, value: string | boolean | string[]) => {
    const updated = {
      ...formData,
      experience: formData.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    };
    setFormData(updated);
    onDataUpdate(updated);
  };

  const removeExperience = (id: string) => {
    const updated = {
      ...formData,
      experience: formData.experience.filter(exp => exp.id !== id)
    };
    setFormData(updated);
    onDataUpdate(updated);
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: ''
    };
    const updated = {
      ...formData,
      education: [...formData.education, newEdu]
    };
    setFormData(updated);
    onDataUpdate(updated);
  };

  const updateEducation = (id: string, field: string, value: string) => {
    const updated = {
      ...formData,
      education: formData.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    };
    setFormData(updated);
    onDataUpdate(updated);
  };

  const removeEducation = (id: string) => {
    const updated = {
      ...formData,
      education: formData.education.filter(edu => edu.id !== id)
    };
    setFormData(updated);
    onDataUpdate(updated);
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 'Intermediate',
      category: 'Technical'
    };
    const updated = {
      ...formData,
      skills: [...formData.skills, newSkill]
    };
    setFormData(updated);
    onDataUpdate(updated);
  };

  const updateSkill = (id: string, field: string, value: string) => {
    const updated = {
      ...formData,
      skills: formData.skills.map(skill => 
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    };
    setFormData(updated);
    onDataUpdate(updated);
  };

  const removeSkill = (id: string) => {
    const updated = {
      ...formData,
      skills: formData.skills.filter(skill => skill.id !== id)
    };
    setFormData(updated);
    onDataUpdate(updated);
  };

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      link: ''
    };
    const updated = {
      ...formData,
      projects: [...formData.projects, newProject]
    };
    setFormData(updated);
    onDataUpdate(updated);
  };

  const updateProject = (id: string, field: string, value: string | string[]) => {
    const updated = {
      ...formData,
      projects: formData.projects.map(project => 
        project.id === id ? { ...project, [field]: value } : project
      )
    };
    setFormData(updated);
    onDataUpdate(updated);
  };

  const removeProject = (id: string) => {
    const updated = {
      ...formData,
      projects: formData.projects.filter(project => project.id !== id)
    };
    setFormData(updated);
    onDataUpdate(updated);
  };

  const addCustomSection = () => {
    const newSection = {
      id: Date.now().toString(),
      title: 'New Section',
      items: []
    };
    const updated = {
      ...formData,
      customSections: [...(formData.customSections || []), newSection]
    };
    setFormData(updated);
    onDataUpdate(updated);
  };

  const updateCustomSectionTitle = (id: string, title: string) => {
    const updated = {
      ...formData,
      customSections: formData.customSections?.map(section =>
        section.id === id ? { ...section, title } : section
      )
    };
    setFormData(updated);
    onDataUpdate(updated);
  };

  const removeCustomSection = (id: string) => {
    const updated = {
      ...formData,
      customSections: formData.customSections?.filter(section => section.id !== id)
    };
    setFormData(updated);
    onDataUpdate(updated);
  };

  const addCustomItem = (sectionId: string) => {
    const newItem = {
      id: Date.now().toString(),
      name: '',
      description: '',
      date: ''
    };
    const updated = {
      ...formData,
      customSections: formData.customSections?.map(section =>
        section.id === sectionId ? { ...section, items: [...section.items, newItem] } : section
      )
    };
    setFormData(updated);
    onDataUpdate(updated);
  };

  const updateCustomItem = (sectionId: string, itemId: string, field: string, value: string) => {
    const updated = {
      ...formData,
      customSections: formData.customSections?.map(section =>
        section.id === sectionId ? {
          ...section,
          items: section.items.map(item =>
            item.id === itemId ? { ...item, [field]: value } : item
          )
        } : section
      )
    };
    setFormData(updated);
    onDataUpdate(updated);
  };

  const removeCustomItem = (sectionId: string, itemId: string) => {
    const updated = {
      ...formData,
      customSections: formData.customSections?.map(section =>
        section.id === sectionId ? {
          ...section,
          items: section.items.filter(item => item.id !== itemId)
        } : section
      )
    };
    setFormData(updated);
    onDataUpdate(updated);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Edit Your Resume</h2>
        <button
          onClick={onNext}
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <span>Preview</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-8">
        {/* Personal Information */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
          
          <div className="mb-6 flex items-start space-x-6">
            <div className="flex-shrink-0">
              {formData.personalInfo.imageUrl ? (
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
                  <img src={formData.personalInfo.imageUrl} alt="Profile" className="w-full h-full object-cover" />
                  <button
                    onClick={removeImage}
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400">
                  <ImageIcon className="w-8 h-8 mb-1" />
                  <span className="text-xs font-medium">Photo</span>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo (Optional)</label>
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                  className="hidden"
                  id="profile-upload"
                />
                <label
                  htmlFor="profile-upload"
                  className="cursor-pointer flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Image</span>
                </label>
                {formData.personalInfo.imageUrl && (
                  <button
                    onClick={removeImage}
                    className="text-sm text-red-600 hover:text-red-700 font-medium px-2"
                  >
                    Remove
                  </button>
                )}
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Recommended: Square image, max 2MB. Replaces initials in compatible templates.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                value={formData.personalInfo.firstName}
                onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                value={formData.personalInfo.lastName}
                onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Professional Title</label>
              <input
                type="text"
                value={formData.personalInfo.title}
                onChange={(e) => updatePersonalInfo('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.personalInfo.email}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={formData.personalInfo.phone}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={formData.personalInfo.location}
                onChange={(e) => updatePersonalInfo('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
              <input
                type="url"
                value={formData.personalInfo.linkedin}
                onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
              <input
                type="url"
                value={formData.personalInfo.website}
                onChange={(e) => updatePersonalInfo('website', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., yoursite.com"
              />
            </div>
          </div>
        </section>

        {/* Summary */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Summary</h3>
          <textarea
            value={formData.summary}
            onChange={(e) => updateSummary(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Write a brief summary of your professional background and key achievements..."
          />
        </section>

        {/* Experience */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
            <button
              onClick={addExperience}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Experience</span>
            </button>
          </div>
          <div className="space-y-6">
            {formData.experience.map((exp) => (
              <div key={exp.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium text-gray-900">Experience Entry</h4>
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                      placeholder="e.g., Jan 2023"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input
                      type="text"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      placeholder="e.g., Dec 2023 or Present"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={exp.description.join('\n')}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value.split('\n'))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe your responsibilities and achievements..."
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Education</h3>
            <button
              onClick={addEducation}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Education</span>
            </button>
          </div>
          <div className="space-y-6">
            {formData.education.map((edu) => (
              <div key={edu.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium text-gray-900">Education Entry</h4>
                  <button
                    onClick={() => removeEducation(edu.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Field of Study</label>
                    <input
                      type="text"
                      value={edu.field}
                      onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
                    <input
                      type="text"
                      value={edu.endDate}
                      onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects - always show */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
            <button
              onClick={addProject}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Project</span>
            </button>
          </div>
          <div className="space-y-6">
            {formData.projects.map((project) => (
              <div key={project.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium text-gray-900">Project Entry</h4>
                  <button
                    onClick={() => removeProject(project.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                    <input
                      type="text"
                      value={project.name}
                      onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Link</label>
                    <input
                      type="text"
                      value={project.link}
                      onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., github.com/username/project"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={project.description}
                    onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Briefly describe the project..."
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Technologies</label>
                  <TechnologyInput 
                    technologies={project.technologies} 
                    onChange={(newTechs) => updateProject(project.id, 'technologies', newTechs)} 
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Skills */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
            <button
              onClick={addSkill}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Skill</span>
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {formData.skills.map((skill) => (
              <div key={skill.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium text-gray-900">Skill</h4>
                  <button
                    onClick={() => removeSkill(skill.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                    <select
                      value={skill.level}
                      onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Custom Sections */}
        {formData.customSections?.map((section) => (
          <section key={section.id}>
            <div className="flex justify-between items-center mb-4">
              <div className="flex-1 mr-4">
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => updateCustomSectionTitle(section.id, e.target.value)}
                  className="text-lg font-semibold text-gray-900 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none px-0 py-1"
                  placeholder="Custom Section Title"
                />
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => addCustomItem(section.id)}
                  className="flex items-center space-x-2 bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Item</span>
                </button>
                <button
                  onClick={() => removeCustomSection(section.id)}
                  className="text-red-600 hover:text-red-700 p-1.5"
                  title="Remove Section"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium text-gray-900">Entry</h4>
                    <button
                      onClick={() => removeCustomItem(section.id, item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => updateCustomItem(section.id, item.id, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Spanish"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date / Subtitle (Optional)</label>
                      <input
                        type="text"
                        value={item.date || ''}
                        onChange={(e) => updateCustomItem(section.id, item.id, 'date', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                    <textarea
                      value={item.description || ''}
                      onChange={(e) => updateCustomItem(section.id, item.id, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Fluent in reading and writing..."
                    />
                  </div>
                </div>
              ))}
              {section.items.length === 0 && (
                <div className="text-center py-4 text-gray-500 text-sm bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  No items added yet. Click "Add Item" to begin.
                </div>
              )}
            </div>
          </section>
        ))}

        {/* Add New Custom Section Button */}
        <div className="pt-4 border-t border-gray-200 flex justify-center">
          <button
            onClick={addCustomSection}
            className="flex items-center space-x-2 bg-white border-2 border-dashed border-gray-300 text-gray-600 px-6 py-3 rounded-xl hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900 transition-all font-medium w-full justify-center"
          >
            <Plus className="w-5 h-5" />
            <span>Add Custom Section (e.g., Languages, Awards, Hobbies)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeEditor;