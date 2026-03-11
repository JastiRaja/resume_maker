import React from 'react';
import { Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { ResumeData } from '../types/resume';

export interface PDFLayoutProps {
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

const stdStyles = StyleSheet.create({
  page: { flexDirection: 'column', backgroundColor: '#FFFFFF', padding: 40, fontFamily: 'Inter' },
  header: { marginBottom: 20, borderBottomWidth: 1, paddingBottom: 15 },
  name: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
  title: { fontSize: 14, marginTop: 4, marginBottom: 8 },
  contactInfo: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 4 },
  contactItem: { fontSize: 10, color: '#4B5563' },
  section: { marginBottom: 15 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', color: '#111827', marginBottom: 8, textTransform: 'uppercase' },
  summaryText: { fontSize: 10, color: '#374151', lineHeight: 1.5 },
  itemContainer: { marginBottom: 10 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  itemTitle: { fontSize: 11, fontWeight: 'bold', color: '#111827' },
  itemSubtitle: { fontSize: 11 },
  itemDate: { fontSize: 10, color: '#6B7280' },
  bulletContainer: { flexDirection: 'row', marginBottom: 2 },
  bulletPoint: { width: 10, fontSize: 10 },
  bulletText: { flex: 1, fontSize: 10, color: '#374151', lineHeight: 1.3 },
  skillsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  skillItem: { backgroundColor: '#F3F4F6', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 4, fontSize: 9, color: '#374151' },
  projectDesc: { fontSize: 10, color: '#374151', lineHeight: 1.3, marginBottom: 4 },
  projectTechList: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 4 },
  projectTech: { fontSize: 8, color: '#6B7280', backgroundColor: '#F3F4F6', paddingVertical: 2, paddingHorizontal: 4, borderRadius: 2 }
});

export const StandardPDFLayout: React.FC<PDFLayoutProps> = ({ data, themeColorText, themeColorBg, themeColorBorder }) => {
  const nonEmptyProjects = getNonEmptyProjects(data);

  return (
    <Page size="A4" style={[stdStyles.page, { borderTop: `4px solid ${themeColorBg}` }]}>
      <View style={[stdStyles.header, { borderBottomColor: themeColorBorder, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }]}>
        <View style={{ flex: 1, paddingRight: 20 }}>
          <Text style={stdStyles.name}>{data.personalInfo.firstName} {data.personalInfo.lastName}</Text>
          <Text style={[stdStyles.title, { color: themeColorText }]}>{data.personalInfo.title}</Text>
          <View style={stdStyles.contactInfo}>
            {data.personalInfo.email && <Text style={stdStyles.contactItem}>{data.personalInfo.email}</Text>}
            {data.personalInfo.phone && <Text style={stdStyles.contactItem}>• {data.personalInfo.phone}</Text>}
            {data.personalInfo.location && <Text style={stdStyles.contactItem}>• {data.personalInfo.location}</Text>}
            {data.personalInfo.linkedin && <Text style={stdStyles.contactItem}>• {data.personalInfo.linkedin}</Text>}
          </View>
        </View>
        
        {data.personalInfo.imageUrl && (
          <Image
            src={data.personalInfo.imageUrl}
            style={{ width: 80, height: 80, borderRadius: 8, objectFit: 'cover' }}
          />
        )}
      </View>

      {data.summary && (
        <View style={stdStyles.section}>
          <Text style={stdStyles.sectionTitle}>Professional Summary</Text>
          <Text style={stdStyles.summaryText}>{data.summary}</Text>
        </View>
      )}

      {data.experience.length > 0 && (
        <View style={stdStyles.section}>
          <Text style={stdStyles.sectionTitle}>Work Experience</Text>
          {data.experience.map((exp) => (
            <View key={exp.id} style={stdStyles.itemContainer}>
              <View style={stdStyles.itemHeader}>
                <View>
                  <Text style={stdStyles.itemTitle}>{exp.position}</Text>
                  <Text style={[stdStyles.itemSubtitle, { color: themeColorText }]}>{exp.company}</Text>
                </View>
                <View style={{ backgroundColor: `${themeColorBg}15`, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 }}>
                  <Text style={{ fontSize: 10, color: themeColorText }}>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</Text>
                </View>
              </View>
              {exp.description.map((desc, idx) => (
                <View key={idx} style={stdStyles.bulletContainer}>
                  <Text style={[stdStyles.bulletPoint, { color: themeColorText }]}>•</Text>
                  <Text style={stdStyles.bulletText}>{desc}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      )}

      {data.education.length > 0 && (
        <View style={stdStyles.section}>
          <Text style={stdStyles.sectionTitle}>Education</Text>
          {data.education.map((edu) => (
            <View key={edu.id} style={[stdStyles.itemContainer, { flexDirection: 'row', justifyContent: 'space-between' }]}>
              <View>
                <Text style={stdStyles.itemTitle}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</Text>
                <Text style={[stdStyles.itemSubtitle, { color: themeColorText }]}>{edu.institution}</Text>
              </View>
              <Text style={stdStyles.itemDate}>{formatDate(edu.endDate)}</Text>
            </View>
          ))}
        </View>
      )}

      {nonEmptyProjects.length > 0 && (
        <View style={stdStyles.section}>
          <Text style={stdStyles.sectionTitle}>Projects</Text>
          {nonEmptyProjects.map((project) => (
            <View key={project.id} style={stdStyles.itemContainer}>
              <View style={stdStyles.itemHeader}>
                <Text style={stdStyles.itemTitle}>{project.name}</Text>
                {project.link ? <Text style={{ fontSize: 9, color: themeColorText, textDecoration: 'none' }}>{project.link as string}</Text> : null}
              </View>
              {project.description && <Text style={stdStyles.projectDesc}>{project.description}</Text>}
              {project.technologies.length > 0 && (
                <View style={stdStyles.projectTechList}>
                  {project.technologies.map((tech, idx) => (
                    <Text key={idx} style={stdStyles.projectTech}>{tech}</Text>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {data.skills.length > 0 && (
        <View style={stdStyles.section}>
          <Text style={stdStyles.sectionTitle}>Skills</Text>
          <View style={stdStyles.skillsContainer}>
            {data.skills.map((skill) => (
              <View key={skill.id} style={{ backgroundColor: '#F9FAFB', border: '1px solid #F3F4F6', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6, minWidth: 100 }}>
                <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#1F2937', marginBottom: 2 }}>{skill.name}</Text>
                <Text style={{ fontSize: 8, color: '#6B7280' }}>{skill.level}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Custom Sections */}
      {data.customSections?.map((section) => section.items.length > 0 && (
        <View key={section.id} style={stdStyles.section}>
          <Text style={stdStyles.sectionTitle}>{section.title}</Text>
          {section.items.map((item) => (
            <View key={item.id} style={stdStyles.itemContainer}>
              <View style={stdStyles.itemHeader}>
                <Text style={stdStyles.itemTitle}>{item.name}</Text>
                {item.date ? <Text style={stdStyles.itemDate}>{item.date}</Text> : null}
              </View>
              {item.description && <Text style={stdStyles.projectDesc}>{item.description}</Text>}
            </View>
          ))}
        </View>
      ))}
    </Page>
  );
};

const colStyles = StyleSheet.create({
  page: { flexDirection: 'row', backgroundColor: '#FFFFFF', fontFamily: 'Inter' },
  leftCol: { width: '35%', padding: 30, color: '#FFFFFF' },
  rightCol: { width: '65%', padding: 30, backgroundColor: '#FFFFFF' },
  nameInitialsContainer: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  nameInitials: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },
  name: { fontSize: 24, fontWeight: 'bold', color: '#111827', marginBottom: 5 },
  title: { fontSize: 14, marginBottom: 20 },
  contactItemLeft: { fontSize: 10, color: 'rgba(255,255,255,0.9)', marginBottom: 8 },
  sectionTitleLeft: { fontSize: 12, fontWeight: 'bold', color: '#FFFFFF', marginTop: 20, marginBottom: 10, textTransform: 'uppercase', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.3)', paddingBottom: 5 },
  sectionTitleRight: { fontSize: 14, fontWeight: 'bold', color: '#111827', marginBottom: 12, textTransform: 'uppercase', borderBottomWidth: 2, paddingBottom: 4 },
  skillItemLeft: { fontSize: 10, color: '#FFFFFF', marginBottom: 4 },
  eduItemLeft: { marginBottom: 10 },
  eduDegreeLeft: { fontSize: 10, fontWeight: 'bold', color: '#FFFFFF' },
  eduInstLeft: { fontSize: 9, color: 'rgba(255,255,255,0.8)' },
  eduDateLeft: { fontSize: 8, color: 'rgba(255,255,255,0.6)', marginBottom: 2 },
  summaryTextRight: { fontSize: 10, color: '#374151', lineHeight: 1.5, marginBottom: 15 },
  expItemRight: { marginBottom: 12 },
  expHeaderRight: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  expTitleRight: { fontSize: 12, fontWeight: 'bold', color: '#111827' },
  expCompanyRight: { fontSize: 11, fontWeight: 'bold' },
  expDateRight: { fontSize: 9, color: '#FFFFFF' },
  bulletContainerRight: { flexDirection: 'row', marginBottom: 3 },
  bulletPointRight: { width: 10, fontSize: 10, color: '#9CA3AF' },
  bulletTextRight: { flex: 1, fontSize: 10, color: '#374151', lineHeight: 1.4 },
  projectDescRight: { fontSize: 10, color: '#374151', lineHeight: 1.4, marginBottom: 4 }
});

export const TwoColumnPDFLayout: React.FC<PDFLayoutProps> = ({ data, themeColorText, themeColorBg, themeColorBorder }) => {
  const nonEmptyProjects = getNonEmptyProjects(data);

  return (
    <Page size="A4" style={[colStyles.page, { borderTop: `4px solid ${themeColorBorder}` }]}>
      <View style={[colStyles.leftCol, { backgroundColor: themeColorBg }]}>
        {data.personalInfo.imageUrl ? (
          <Image
            src={data.personalInfo.imageUrl}
            style={{ width: 70, height: 70, borderRadius: 35, marginBottom: 20, alignSelf: 'center', objectFit: 'cover' }}
          />
        ) : (
          <View style={colStyles.nameInitialsContainer}>
            <Text style={colStyles.nameInitials}>{data.personalInfo.firstName[0]}{data.personalInfo.lastName[0]}</Text>
          </View>
        )}
        <Text style={colStyles.sectionTitleLeft}>Contact</Text>
        {data.personalInfo.email && <Text style={colStyles.contactItemLeft}>{data.personalInfo.email}</Text>}
        {data.personalInfo.phone && <Text style={colStyles.contactItemLeft}>{data.personalInfo.phone}</Text>}
        {data.personalInfo.location && <Text style={colStyles.contactItemLeft}>{data.personalInfo.location}</Text>}
        {data.personalInfo.linkedin && <Text style={colStyles.contactItemLeft}>{data.personalInfo.linkedin}</Text>}
        {data.personalInfo.website && <Text style={colStyles.contactItemLeft}>{data.personalInfo.website}</Text>}

        {data.skills.length > 0 && (
          <View>
            <Text style={colStyles.sectionTitleLeft}>Skills</Text>
            {data.skills.map((skill) => (
              <View key={skill.id} style={{ marginBottom: 8 }}>
                <Text style={{ fontSize: 10, color: '#FFFFFF', marginBottom: 2 }}>{skill.name}</Text>
                {skill.level && (
                  <View style={{ width: '100%', height: 4, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 2 }}>
                    <View style={{ height: 4, backgroundColor: '#FFFFFF', borderRadius: 2, width: skill.level === 'Beginner' ? '25%' : skill.level === 'Intermediate' ? '50%' : skill.level === 'Advanced' ? '75%' : '100%' }} />
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {data.education.length > 0 && (
          <View>
            <Text style={colStyles.sectionTitleLeft}>Education</Text>
            {data.education.map((edu) => (
              <View key={edu.id} style={colStyles.eduItemLeft}>
                <Text style={colStyles.eduDateLeft}>{formatDate(edu.endDate)}</Text>
                <Text style={colStyles.eduDegreeLeft}>{edu.degree}</Text>
                <Text style={colStyles.eduInstLeft}>{edu.institution}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={colStyles.rightCol}>
        <Text style={colStyles.name}>{data.personalInfo.firstName} {data.personalInfo.lastName}</Text>
        <Text style={[colStyles.title, { color: themeColorText }]}>{data.personalInfo.title}</Text>

        {data.summary && (
          <View>
            <Text style={[colStyles.sectionTitleRight, { borderBottomColor: themeColorBg }]}>Profile</Text>
            <Text style={colStyles.summaryTextRight}>{data.summary}</Text>
          </View>
        )}

        {data.experience.length > 0 && (
          <View>
            <Text style={[colStyles.sectionTitleRight, { borderBottomColor: themeColorBg }]}>Experience</Text>
            {data.experience.map((exp) => (
              <View key={exp.id} style={colStyles.expItemRight}>
                <View style={colStyles.expHeaderRight}>
                  <View>
                    <Text style={colStyles.expTitleRight}>{exp.position}</Text>
                    <Text style={[colStyles.expCompanyRight, { color: themeColorText }]}>{exp.company}</Text>
                  </View>
                  <View style={{ backgroundColor: '#F3F4F6', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 3 }}>
                    <Text style={{ fontSize: 9, color: '#4B5563', fontWeight: 'bold' }}>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</Text>
                  </View>
                </View>
                {exp.description.map((desc, idx) => (
                  <View key={idx} style={colStyles.bulletContainerRight}>
                    <Text style={[colStyles.bulletPointRight, { color: themeColorText }]}>•</Text>
                    <Text style={colStyles.bulletTextRight}>{desc}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {nonEmptyProjects.length > 0 && (
          <View>
            <Text style={[colStyles.sectionTitleRight, { borderBottomColor: themeColorBg }]}>Projects</Text>
            {nonEmptyProjects.map((project) => (
              <View key={project.id} style={colStyles.expItemRight}>
                <View style={colStyles.expHeaderRight}>
                  <Text style={colStyles.expTitleRight}>{project.name}</Text>
                  {project.link ? <Text style={{ fontSize: 9, color: themeColorText }}>{project.link as string}</Text> : null}
                </View>
                {project.description && <Text style={colStyles.projectDescRight}>{project.description}</Text>}
                {project.technologies && project.technologies.length > 0 && (
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 4 }}>
                    {project.technologies.map((tech, idx) => (
                      <Text key={idx} style={{ fontSize: 8, color: '#6B7280', backgroundColor: '#F3F4F6', paddingVertical: 2, paddingHorizontal: 4, borderRadius: 2 }}>{tech}</Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Custom Sections */}
        {data.customSections?.map((section) => section.items.length > 0 && (
          <View key={section.id}>
            <Text style={[colStyles.sectionTitleRight, { borderBottomColor: themeColorBg }]}>{section.title}</Text>
            {section.items.map((item) => (
              <View key={item.id} style={colStyles.expItemRight}>
                <View style={colStyles.expHeaderRight}>
                  <Text style={colStyles.expTitleRight}>{item.name}</Text>
                  {item.date ? (
                    <View style={{ backgroundColor: '#F3F4F6', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 3 }}>
                      <Text style={{ fontSize: 9, color: '#4B5563', fontWeight: 'bold' }}>{item.date}</Text>
                    </View>
                  ) : null}
                </View>
                {item.description && (
                  <View style={colStyles.bulletContainerRight}>
                    <Text style={[colStyles.bulletPointRight, { color: themeColorText }]}>•</Text>
                    <Text style={colStyles.bulletTextRight}>{item.description}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        ))}
      </View>
    </Page>
  );
};

const cntStyles = StyleSheet.create({
  page: { flexDirection: 'column', backgroundColor: '#FFFFFF', padding: 40, fontFamily: 'Inter' },
  header: { alignItems: 'center', borderBottomWidth: 2, paddingBottom: 15, marginBottom: 15 },
  name: { fontSize: 28, fontWeight: 'bold', color: '#111827', textTransform: 'uppercase', letterSpacing: 1 },
  title: { fontSize: 12, fontWeight: 'bold', marginTop: 6, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 2 },
  contactInfo: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 15, marginTop: 4 },
  contactItem: { fontSize: 9, color: '#374151', fontWeight: 'bold' },
  summaryText: { fontSize: 10, color: '#4B5563', lineHeight: 1.6, textAlign: 'center', marginBottom: 20, paddingHorizontal: 20 },
  sectionTitleContainer: { position: 'relative', alignItems: 'center', justifyContent: 'center', marginBottom: 15, marginTop: 10 },
  sectionTitleLine: { position: 'absolute', top: 8, left: 0, right: 0, height: 1, opacity: 0.3 },
  sectionTitleWrapper: { backgroundColor: '#FFFFFF', paddingHorizontal: 15 },
  sectionTitle: { fontSize: 13, fontWeight: 'bold', color: '#111827', textTransform: 'uppercase', letterSpacing: 2 },
  itemContainer: { marginBottom: 12 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#F3F4F6', paddingBottom: 3, marginBottom: 4, alignItems: 'flex-end' },
  itemTitle: { fontSize: 12, fontWeight: 'bold', color: '#111827' },
  itemSubtitle: { fontSize: 11, fontWeight: 'bold' },
  itemDate: { fontSize: 10, color: '#6B7280', fontWeight: 'bold' },
  bulletContainer: { flexDirection: 'row', marginBottom: 3, paddingLeft: 10 },
  bulletPoint: { width: 10, fontSize: 10, color: '#9CA3AF' },
  bulletText: { flex: 1, fontSize: 10, color: '#374151', lineHeight: 1.4, textAlign: 'justify' },
  projectDesc: { fontSize: 10, color: '#374151', lineHeight: 1.4, textAlign: 'justify', marginBottom: 4 },
  skillsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12 },
  skillItem: { fontSize: 10, fontWeight: 'bold', color: '#111827' },
  skillLevel: { color: '#6B7280', fontWeight: 'normal' }
});

export const CenteredPDFLayout: React.FC<PDFLayoutProps> = ({ data, themeColorText, themeColorBg, themeColorBorder }) => {
  const nonEmptyProjects = getNonEmptyProjects(data);

  return (
    <Page size="A4" style={[cntStyles.page, { borderTop: `4px solid ${themeColorBg}` }]}>
      <View style={[cntStyles.header, { borderBottomColor: themeColorBorder }]}>
        {data.personalInfo.imageUrl && (
          <Image
            src={data.personalInfo.imageUrl}
            style={{ width: 70, height: 70, borderRadius: 35, marginBottom: 15, alignSelf: 'center', objectFit: 'cover' }}
          />
        )}
        <Text style={cntStyles.name}>{data.personalInfo.firstName} {data.personalInfo.lastName}</Text>
        <Text style={[cntStyles.title, { color: themeColorText }]}>{data.personalInfo.title}</Text>
        <View style={cntStyles.contactInfo}>
          {data.personalInfo.email && <Text style={cntStyles.contactItem}>{data.personalInfo.email}</Text>}
          {data.personalInfo.phone && <Text style={cntStyles.contactItem}>{data.personalInfo.phone}</Text>}
          {data.personalInfo.location && <Text style={cntStyles.contactItem}>{data.personalInfo.location}</Text>}
          {data.personalInfo.linkedin && <Text style={cntStyles.contactItem}>{data.personalInfo.linkedin}</Text>}
        </View>
      </View>

      {data.summary && (
        <Text style={cntStyles.summaryText}>"{data.summary}"</Text>
      )}

      {data.experience.length > 0 && (
        <View>
          <View style={cntStyles.sectionTitleContainer}>
            <View style={[cntStyles.sectionTitleLine, { backgroundColor: themeColorBg }]} />
            <View style={cntStyles.sectionTitleWrapper}>
              <Text style={cntStyles.sectionTitle}>Professional Experience</Text>
            </View>
          </View>
          {data.experience.map((exp) => (
            <View key={exp.id} style={cntStyles.itemContainer}>
              <View style={cntStyles.itemHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 8 }}>
                  <Text style={cntStyles.itemTitle}>{exp.position}</Text>
                  <Text style={[cntStyles.itemSubtitle, { color: themeColorText }]}>{exp.company}</Text>
                </View>
                <Text style={cntStyles.itemDate}>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</Text>
              </View>
              {exp.description.map((desc, idx) => (
                <View key={idx} style={cntStyles.bulletContainer}>
                  <Text style={cntStyles.bulletPoint}>•</Text>
                  <Text style={cntStyles.bulletText}>{desc}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      )}

      {data.education.length > 0 && (
        <View>
          <View style={cntStyles.sectionTitleContainer}>
            <View style={[cntStyles.sectionTitleLine, { backgroundColor: themeColorBg }]} />
            <View style={cntStyles.sectionTitleWrapper}>
              <Text style={cntStyles.sectionTitle}>Education</Text>
            </View>
          </View>
          {data.education.map((edu) => (
            <View key={edu.id} style={cntStyles.itemContainer}>
              <View style={cntStyles.itemHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 8 }}>
                  <Text style={cntStyles.itemTitle}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</Text>
                  <Text style={[cntStyles.itemSubtitle, { color: themeColorText }]}>{edu.institution}</Text>
                </View>
                <Text style={cntStyles.itemDate}>{formatDate(edu.endDate)}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {nonEmptyProjects.length > 0 && (
        <View>
          <View style={cntStyles.sectionTitleContainer}>
            <View style={[cntStyles.sectionTitleLine, { backgroundColor: themeColorBg }]} />
            <View style={cntStyles.sectionTitleWrapper}>
              <Text style={cntStyles.sectionTitle}>Selected Projects</Text>
            </View>
          </View>
          {nonEmptyProjects.map((project) => (
            <View key={project.id} style={cntStyles.itemContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                <Text style={cntStyles.itemTitle}>{project.name}</Text>
                {project.link ? <Text style={{ fontSize: 9, color: themeColorText }}>{project.link as string}</Text> : null}
              </View>
              {project.description && <Text style={cntStyles.projectDesc}>{project.description}</Text>}
              {project.technologies && project.technologies.length > 0 && (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 4, marginTop: 4 }}>
                  {project.technologies.map((tech, idx) => (
                    <Text key={idx} style={{ fontSize: 8, color: '#6B7280', backgroundColor: '#F3F4F6', paddingVertical: 3, paddingHorizontal: 6, borderRadius: 2 }}>{tech}</Text>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {data.skills.length > 0 && (
        <View>
          <View style={cntStyles.sectionTitleContainer}>
            <View style={[cntStyles.sectionTitleLine, { backgroundColor: themeColorBg }]} />
            <View style={cntStyles.sectionTitleWrapper}>
              <Text style={cntStyles.sectionTitle}>Technical Expertise</Text>
            </View>
          </View>
          <View style={[cntStyles.skillsContainer, { gap: 15, justifyContent: 'center' }]}>
            {data.skills.map((skill) => (
              <View key={skill.id} style={{ width: '30%', minWidth: 120 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                  <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#111827' }}>{skill.name}</Text>
                  <Text style={{ fontSize: 8, color: '#6B7280', textTransform: 'uppercase' }}>{skill.level}</Text>
                </View>
                <View style={{ width: '100%', height: 4, backgroundColor: '#E5E7EB', borderRadius: 2 }}>
                  <View style={{ height: 4, backgroundColor: themeColorBg, borderRadius: 2, width: skill.level === 'Beginner' ? '25%' : skill.level === 'Intermediate' ? '50%' : skill.level === 'Advanced' ? '75%' : '100%' }} />
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Custom Sections */}
      {data.customSections?.map((section) => section.items.length > 0 && (
        <View key={section.id}>
          <View style={cntStyles.sectionTitleContainer}>
            <View style={[cntStyles.sectionTitleLine, { backgroundColor: themeColorBg }]} />
            <View style={cntStyles.sectionTitleWrapper}>
              <Text style={cntStyles.sectionTitle}>{section.title}</Text>
            </View>
          </View>
          {section.items.map((item) => (
            <View key={item.id} style={cntStyles.itemContainer}>
              <View style={cntStyles.itemHeader}>
                <Text style={cntStyles.itemTitle}>{item.name}</Text>
                {item.date ? <Text style={cntStyles.itemDate}>{item.date}</Text> : null}
              </View>
              {item.description && (
                <View style={cntStyles.bulletContainer}>
                  <Text style={cntStyles.bulletPoint}>•</Text>
                  <Text style={cntStyles.bulletText}>{item.description}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      ))}
    </Page>
  );
};
