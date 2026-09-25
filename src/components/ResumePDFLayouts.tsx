import React from 'react';
import { Page, Text, View, StyleSheet, Image, Svg, Polygon, Path, Circle, Line } from '@react-pdf/renderer';
import { ResumeData } from '../types/resume';

export interface PDFLayoutProps {
  data: ResumeData;
  themeColorText: string;
  themeColorBg: string;
  themeColorBorder: string;
}

export const formatDate = (date: string) => date || 'Present';

export const formatEducationDates = (startDate?: string, endDate?: string) => {
  const start = (startDate || '').trim();
  const end = (endDate || '').trim();
  
  if (!start && !end) return '';
  if (!start) return end;
  if (!end) return start;
  
  if (end.toLowerCase() === 'present') {
    return `${start} - Present`;
  }
  
  if (end.includes(start)) {
    return end;
  }
  
  return `${start} - ${end}`;
};

export const getNonEmptyProjects = (data: ResumeData) => data.projects.filter(
  (project) =>
    project.name.trim() ||
    project.description.trim() ||
    (project.link && project.link.trim()) ||
    (project.technologies && project.technologies.some((t) => t.trim()))
);

/** Top/bottom inset on every physical page so wrapped content is not flush to the sheet (react-pdf applies Page padding per page). */
const PDF_PAGE_V_MARGIN = 40;

/** Default icon tint for light backgrounds (Inter woff omits Unicode dingbats used earlier). */
const PDF_ICON_GRAY = '#4B5563';
const PDF_ICON_MUTED = '#6B7280';
const PDF_ICON_ON_DARK = '#F1F5F9';
const PDF_ICON_ON_THEME = '#FFFFFF';

const PdfIconPhone = ({ color = PDF_ICON_GRAY }: { color?: string }) => (
  <Svg width={10} height={10} viewBox="0 0 24 24">
    <Path
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
      fill={color}
    />
  </Svg>
);

/** Filled silhouette — stroked envelope rect at 10×10 read as an ugly square “border” in PDF viewers */
const PdfIconMail = ({ color = PDF_ICON_GRAY }: { color?: string }) => (
  <Svg width={10} height={10} viewBox="0 0 24 24">
    <Path
      fillRule="evenodd"
      d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67z"
      fill={color}
    />
    <Path
      d="M22.5 6.908V5.75A3 3 0 0 0 19.5 2.5h-15a3 3 0 0 0-3 3v1.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908z"
      fill={color}
    />
  </Svg>
);

/** Solid pin — inner “hole” read as a second ring/box on small PDF icons */
const PdfIconMapPin = ({ color = PDF_ICON_GRAY }: { color?: string }) => (
  <Svg width={10} height={10} viewBox="0 0 24 24">
    <Path d="M12 21s-7-4.6-7-10a7 7 0 1 1 14 0c0 5.4-7 10-7 10z" fill={color} />
  </Svg>
);

/** Thinner strokes — thick strokes on a 10pt icon looked like boxed outlines */
const PdfIconGlobe = ({ color = PDF_ICON_GRAY }: { color?: string }) => (
  <Svg width={10} height={10} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={1.35} />
    <Line x1={2} y1={12} x2={22} y2={12} stroke={color} strokeWidth={1.35} strokeLinecap="round" />
    <Path
      d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      stroke={color}
      strokeWidth={1.35}
      strokeLinecap="round"
    />
  </Svg>
);

const PdfIconLinkedInGlyph = ({ color = PDF_ICON_GRAY }: { color?: string }) => (
  <Svg width={10} height={10} viewBox="0 0 24 24">
    <Path
      fill={color}
      d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
    />
  </Svg>
);

const pdfContactIconCell = (extra?: object): object => ({
  width: 14,
  marginRight: 4,
  alignItems: 'center' as const,
  justifyContent: 'flex-start' as const,
  paddingTop: 2,
  ...extra,
});

const stdStyles = StyleSheet.create({
  page: { flexDirection: 'column', backgroundColor: '#FFFFFF', padding: 40, fontFamily: 'Inter' },
  header: { marginBottom: 20, borderBottomWidth: 1, paddingBottom: 15 },
  name: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
  title: { fontSize: 14, marginTop: 4, marginBottom: 8 },
  contactInfo: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 4 },
  contactItem: { fontSize: 10, color: '#4B5563' },
  section: { marginBottom: 15 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', color: '#111827', marginBottom: 8, textTransform: 'uppercase', borderBottomWidth: 1.5, borderBottomColor: '#E5E7EB', paddingBottom: 3 },
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
          <View style={[stdStyles.contactInfo, { columnGap: 12, rowGap: 8 }]}>
            {data.personalInfo.email ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }} wrap={false}>
                <View style={{ marginRight: 5, paddingTop: 1 }}>
                  <PdfIconMail color={themeColorText} />
                </View>
                <Text style={stdStyles.contactItem}>{data.personalInfo.email}</Text>
              </View>
            ) : null}
            {data.personalInfo.phone ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }} wrap={false}>
                <View style={{ marginRight: 5, paddingTop: 1 }}>
                  <PdfIconPhone color={themeColorText} />
                </View>
                <Text style={stdStyles.contactItem}>{data.personalInfo.phone}</Text>
              </View>
            ) : null}
            {data.personalInfo.location ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }} wrap={false}>
                <View style={{ marginRight: 5, paddingTop: 1 }}>
                  <PdfIconMapPin color={themeColorText} />
                </View>
                <Text style={stdStyles.contactItem}>{data.personalInfo.location}</Text>
              </View>
            ) : null}
            {data.personalInfo.linkedin ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }} wrap={false}>
                <View style={{ marginRight: 5, paddingTop: 1 }}>
                  <PdfIconLinkedInGlyph color={themeColorText} />
                </View>
                <Text style={stdStyles.contactItem}>{data.personalInfo.linkedin}</Text>
              </View>
            ) : null}
            {data.personalInfo.website ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }} wrap={false}>
                <View style={{ marginRight: 5, paddingTop: 1 }}>
                  <PdfIconGlobe color={themeColorText} />
                </View>
                <Text style={stdStyles.contactItem}>{data.personalInfo.website}</Text>
              </View>
            ) : null}
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
          <View wrap={false}>
            <Text style={stdStyles.sectionTitle}>Work Experience</Text>
            {data.experience.length > 0 && (
              <View style={stdStyles.itemHeader}>
                <View>
                  <Text style={stdStyles.itemTitle}>{data.experience[0].position}</Text>
                  <Text style={[stdStyles.itemSubtitle, { color: themeColorText }]}>{data.experience[0].company}</Text>
                </View>
                <View style={{ backgroundColor: themeColorBg, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 }}>
                  <Text style={{ fontSize: 10, color: '#FFFFFF', fontWeight: '500' }}>
                    {formatDate(data.experience[0].startDate)} - {formatDate(data.experience[0].endDate)}
                  </Text>
                </View>
              </View>
            )}
            {data.experience.length > 0 && (
              <View style={{ marginBottom: 10 }}>
                {data.experience[0].description.map((desc, idx) => (
                  <View key={idx} style={stdStyles.bulletContainer}>
                    <Text style={[stdStyles.bulletPoint, { color: themeColorText }]}>•</Text>
                    <Text style={stdStyles.bulletText}>{desc}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {data.experience.slice(1).map((exp) => (
            <View key={exp.id} wrap={false} style={stdStyles.itemContainer}>
              <View style={stdStyles.itemHeader}>
                <View>
                  <Text style={stdStyles.itemTitle}>{exp.position}</Text>
                  <Text style={[stdStyles.itemSubtitle, { color: themeColorText }]}>{exp.company}</Text>
                </View>
                <View style={{ backgroundColor: themeColorBg, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 }}>
                  <Text style={{ fontSize: 10, color: '#FFFFFF', fontWeight: '500' }}>
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </Text>
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
          <View wrap={false}>
            <Text style={stdStyles.sectionTitle}>Education</Text>
            {data.education.length > 0 && (
              <View style={[stdStyles.itemContainer, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                <View>
                  <Text style={stdStyles.itemTitle}>{data.education[0].degree}{data.education[0].field ? ` in ${data.education[0].field}` : ''}</Text>
                  <Text style={[stdStyles.itemSubtitle, { color: themeColorText }]}>{data.education[0].institution}</Text>
                </View>
                <Text style={stdStyles.itemDate}>{formatEducationDates(data.education[0].startDate, data.education[0].endDate)}</Text>
              </View>
            )}
          </View>
          
          {data.education.slice(1).map((edu) => (
            <View wrap={false} key={edu.id} style={[stdStyles.itemContainer, { flexDirection: 'row', justifyContent: 'space-between' }]}>
              <View>
                <Text style={stdStyles.itemTitle}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</Text>
                <Text style={[stdStyles.itemSubtitle, { color: themeColorText }]}>{edu.institution}</Text>
              </View>
              <Text style={stdStyles.itemDate}>{formatEducationDates(edu.startDate, edu.endDate)}</Text>
            </View>
          ))}
        </View>
      )}

      {nonEmptyProjects.length > 0 && (
        <View style={stdStyles.section}>
          <View wrap={false}>
            <Text style={stdStyles.sectionTitle}>Projects</Text>
            {nonEmptyProjects.length > 0 && (
              <View style={{ marginBottom: 4 }}>
                <Text style={stdStyles.itemTitle}>{nonEmptyProjects[0].name}</Text>
                {nonEmptyProjects[0].link ? (
                  <Text style={{ fontSize: 8.5, color: themeColorText, textDecoration: 'none', marginTop: 1, marginBottom: 2 }}>
                    {String(nonEmptyProjects[0].link).replace(/^https?:\/\//, '')}
                  </Text>
                ) : null}
              </View>
            )}
            {nonEmptyProjects.length > 0 && (
              <View style={{ marginBottom: 10 }}>
                {nonEmptyProjects[0].description && <Text style={stdStyles.projectDesc}>{nonEmptyProjects[0].description}</Text>}
                {nonEmptyProjects[0].technologies.length > 0 && (
                  <View style={stdStyles.projectTechList}>
                    {nonEmptyProjects[0].technologies.map((tech, idx) => (
                      <Text key={idx} style={stdStyles.projectTech}>{tech}</Text>
                    ))}
                  </View>
                )}
              </View>
            )}
          </View>

          {nonEmptyProjects.slice(1).map((project) => (
            <View key={project.id} wrap={false} style={stdStyles.itemContainer}>
              <View style={{ marginBottom: 4 }}>
                <Text style={stdStyles.itemTitle}>{project.name}</Text>
                {project.link ? (
                  <Text style={{ fontSize: 8.5, color: themeColorText, textDecoration: 'none', marginTop: 1, marginBottom: 2 }}>
                    {String(project.link).replace(/^https?:\/\//, '')}
                  </Text>
                ) : null}
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
        <View style={stdStyles.section} wrap={false}>
          <Text style={stdStyles.sectionTitle}>Skills</Text>
          <View style={[stdStyles.skillsContainer, { flexDirection: 'row', flexWrap: 'wrap', gap: 15 }]}>
            {data.skills.map((skill) => (
              <View key={skill.id} style={{ width: '45%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                  <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#1F2937' }}>{skill.name}</Text>
                  {skill.level && <Text style={{ fontSize: 8, color: '#6B7280' }}>{skill.level}</Text>}
                </View>
                {skill.level && (
                  <View style={{ width: '100%', height: 4, backgroundColor: '#E5E7EB', borderRadius: 2 }}>
                    <View style={{ height: 4, backgroundColor: themeColorBg, borderRadius: 2, width: skill.level === 'Beginner' ? '25%' : skill.level === 'Intermediate' ? '50%' : skill.level === 'Advanced' ? '75%' : '100%' }} />
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Custom Sections */}
      {data.customSections?.map((section) => section.items.length > 0 && (
        <View key={section.id} style={stdStyles.section}>
          <View wrap={false}>
            <Text style={stdStyles.sectionTitle}>{section.title}</Text>
            <View key={section.items[0].id} style={stdStyles.itemContainer}>
              <View style={stdStyles.itemHeader}>
                <Text style={stdStyles.itemTitle}>{section.items[0].name}</Text>
                {section.items[0].date ? <Text style={stdStyles.itemDate}>{section.items[0].date}</Text> : null}
              </View>
              {section.items[0].description && <Text style={stdStyles.projectDesc}>{section.items[0].description}</Text>}
            </View>
          </View>
          {section.items.slice(1).map((item) => (
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
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Inter',
    paddingTop: PDF_PAGE_V_MARGIN,
    paddingBottom: PDF_PAGE_V_MARGIN,
  },
  leftCol: { width: '38%', padding: 22, color: '#FFFFFF' },
  rightCol: { width: '62%', padding: 24, backgroundColor: '#FFFFFF' },
  nameInitialsContainer: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 12 },
  nameInitials: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
  nameLeft: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF', textAlign: 'center', marginBottom: 4, lineHeight: 1.2 },
  titleLeft: { fontSize: 9.5, color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginBottom: 14, lineHeight: 1.3 },
  contactItemLeft: { fontSize: 8.5, color: 'rgba(255,255,255,0.95)', marginBottom: 6 },
  sectionTitleLeft: { fontSize: 10, fontWeight: 'bold', color: 'rgba(255,255,255,0.8)', marginTop: 14, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.25)', paddingBottom: 3 },
  sectionTitleRowRight: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 6 },
  sectionTitleRightBar: { width: 14, height: 3.5, borderRadius: 2, marginRight: 6 },
  sectionTitleRightText: { fontSize: 13, fontWeight: 'bold', color: '#111827' },
  skillItemLeft: { fontSize: 8.5, color: '#FFFFFF', marginBottom: 4 },
  eduItemLeft: { marginBottom: 8 },
  eduDegreeLeft: { fontSize: 9, fontWeight: 'bold', color: '#FFFFFF' },
  eduInstLeft: { fontSize: 8.5, color: 'rgba(255,255,255,0.85)' },
  eduDateLeft: { fontSize: 7.5, color: 'rgba(255,255,255,0.65)', marginBottom: 1 },
  summaryTextRight: { fontSize: 9.5, color: '#374151', lineHeight: 1.5, marginBottom: 14 },
  expItemRight: { marginBottom: 12 },
  expHeaderRight: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 },
  expTitleRight: { fontSize: 11, fontWeight: 'bold', color: '#111827' },
  expCompanyRight: { fontSize: 10, fontWeight: 'bold' },
  expDateBadge: { backgroundColor: '#F3F4F6', borderRadius: 3, paddingHorizontal: 5, paddingVertical: 2 },
  expDateText: { fontSize: 8, color: '#4B5563', fontWeight: 'bold' },
  bulletContainerRight: { flexDirection: 'row', marginBottom: 2.5 },
  bulletPointRight: { width: 10, fontSize: 9 },
  bulletTextRight: { flex: 1, fontSize: 9, color: '#374151', lineHeight: 1.4 },
  projectDescRight: { fontSize: 9, color: '#374151', lineHeight: 1.4, marginBottom: 3 }
});

export const TwoColumnPDFLayout: React.FC<PDFLayoutProps> = ({ data, themeColorText, themeColorBg, themeColorBorder }) => {
  const nonEmptyProjects = getNonEmptyProjects(data);

  return (
    <Page size="A4" style={[colStyles.page, { borderTop: `4px solid ${themeColorBorder}` }]}>
      {/* Left Column Sidebar */}
      <View style={[colStyles.leftCol, { backgroundColor: themeColorBg }]}>
        {data.personalInfo.imageUrl ? (
          <Image
            src={data.personalInfo.imageUrl}
            style={{ width: 64, height: 64, borderRadius: 32, marginBottom: 12, alignSelf: 'center', objectFit: 'cover', borderWidth: 2, borderColor: 'rgba(255,255,255,0.2)' }}
          />
        ) : (
          <View style={colStyles.nameInitialsContainer}>
            <Text style={colStyles.nameInitials}>{(data.personalInfo.firstName?.trim()?.[0] || '') + (data.personalInfo.lastName?.trim()?.[0] || '') || '?'}</Text>
          </View>
        )}

        <Text style={colStyles.nameLeft}>{data.personalInfo.firstName} {data.personalInfo.lastName}</Text>
        <Text style={colStyles.titleLeft}>{data.personalInfo.title}</Text>

        <Text style={colStyles.sectionTitleLeft}>Contact</Text>
        {data.personalInfo.email ? (
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 }} wrap={false}>
            <View style={pdfContactIconCell()}>
              <PdfIconMail color={PDF_ICON_ON_THEME} />
            </View>
            <Text style={[colStyles.contactItemLeft, { flex: 1, marginBottom: 0 }]}>{data.personalInfo.email}</Text>
          </View>
        ) : null}
        {data.personalInfo.phone ? (
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 }} wrap={false}>
            <View style={pdfContactIconCell()}>
              <PdfIconPhone color={PDF_ICON_ON_THEME} />
            </View>
            <Text style={[colStyles.contactItemLeft, { flex: 1, marginBottom: 0 }]}>{data.personalInfo.phone}</Text>
          </View>
        ) : null}
        {data.personalInfo.location ? (
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 }} wrap={false}>
            <View style={pdfContactIconCell()}>
              <PdfIconMapPin color={PDF_ICON_ON_THEME} />
            </View>
            <Text style={[colStyles.contactItemLeft, { flex: 1, marginBottom: 0 }]}>{data.personalInfo.location}</Text>
          </View>
        ) : null}
        {data.personalInfo.linkedin ? (
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 }} wrap={false}>
            <View style={pdfContactIconCell()}>
              <PdfIconLinkedInGlyph color={PDF_ICON_ON_THEME} />
            </View>
            <Text style={[colStyles.contactItemLeft, { flex: 1, marginBottom: 0 }]}>{data.personalInfo.linkedin}</Text>
          </View>
        ) : null}
        {data.personalInfo.website ? (
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 }} wrap={false}>
            <View style={pdfContactIconCell()}>
              <PdfIconGlobe color={PDF_ICON_ON_THEME} />
            </View>
            <Text style={[colStyles.contactItemLeft, { flex: 1, marginBottom: 0 }]}>{data.personalInfo.website}</Text>
          </View>
        ) : null}

        {data.skills.length > 0 && (
          <View wrap={false}>
            <Text style={colStyles.sectionTitleLeft}>Skills</Text>
            {data.skills.map((skill) => (
              <View key={skill.id} style={{ marginBottom: 6 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                  <Text style={{ fontSize: 8.5, color: '#FFFFFF' }}>{skill.name}</Text>
                </View>
                {skill.level && (
                  <View style={{ width: '100%', height: 3.5, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 2 }}>
                    <View style={{ height: 3.5, backgroundColor: '#FFFFFF', borderRadius: 2, width: skill.level === 'Beginner' ? '25%' : skill.level === 'Intermediate' ? '50%' : skill.level === 'Advanced' ? '75%' : '100%' }} />
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {data.education.length > 0 && (
          <View wrap={false}>
            <Text style={colStyles.sectionTitleLeft}>Education</Text>
            {data.education.map((edu) => (
              <View key={edu.id} style={colStyles.eduItemLeft}>
                <Text style={colStyles.eduDateLeft}>{formatEducationDates(edu.startDate, edu.endDate)}</Text>
                <Text style={colStyles.eduDegreeLeft}>{edu.degree}</Text>
                <Text style={colStyles.eduInstLeft}>{edu.institution}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Custom Sections (in left sidebar) */}
        {data.customSections?.map((section) => section.items.length > 0 && (
          <View key={section.id} wrap={false} style={{ marginBottom: 8 }}>
            <Text style={colStyles.sectionTitleLeft}>{section.title}</Text>
            {section.items.map((item) => (
              <View key={item.id} style={{ marginBottom: 6 }}>
                <Text style={{ fontSize: 9, color: '#FFFFFF', fontWeight: 'bold' }}>{item.name}</Text>
                {item.date && (
                  <Text style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.6)', marginBottom: 1 }}>{item.date}</Text>
                )}
                {item.description && (
                  <Text style={{ fontSize: 8, color: 'rgba(255,255,255,0.8)', lineHeight: 1.3 }}>{item.description}</Text>
                )}
              </View>
            ))}
          </View>
        ))}
      </View>

      {/* Right Column Body */}
      <View style={colStyles.rightCol}>
        {data.summary && (
          <View wrap={false}>
            <View style={colStyles.sectionTitleRowRight}>
              <View style={[colStyles.sectionTitleRightBar, { backgroundColor: themeColorBg }]} />
              <Text style={colStyles.sectionTitleRightText}>Profile</Text>
            </View>
            <Text style={colStyles.summaryTextRight}>{data.summary}</Text>
          </View>
        )}

        {data.experience.length > 0 && (
          <View>
            <View wrap={false}>
              <View style={colStyles.sectionTitleRowRight}>
                <View style={[colStyles.sectionTitleRightBar, { backgroundColor: themeColorBg }]} />
                <Text style={colStyles.sectionTitleRightText}>Experience</Text>
              </View>
              {data.experience.length > 0 && (
                <View style={colStyles.expHeaderRight}>
                  <View style={{ flex: 1, paddingRight: 6 }}>
                    <Text style={colStyles.expTitleRight}>{data.experience[0].position}</Text>
                    <Text style={[colStyles.expCompanyRight, { color: themeColorText }]}>{data.experience[0].company}</Text>
                  </View>
                  <View style={colStyles.expDateBadge}>
                    <Text style={colStyles.expDateText}>{formatDate(data.experience[0].startDate)} - {formatDate(data.experience[0].endDate)}</Text>
                  </View>
                </View>
              )}
              {data.experience.length > 0 && (
                <View style={{ marginBottom: 10 }}>
                  {data.experience[0].description.map((desc, idx) => (
                    <View key={idx} style={colStyles.bulletContainerRight}>
                      <Text style={[colStyles.bulletPointRight, { color: themeColorText }]}>▹</Text>
                      <Text style={colStyles.bulletTextRight}>{desc}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>

            {data.experience.slice(1).map((exp) => (
              <View key={exp.id} wrap={false} style={colStyles.expItemRight}>
                <View style={colStyles.expHeaderRight}>
                  <View style={{ flex: 1, paddingRight: 6 }}>
                    <Text style={colStyles.expTitleRight}>{exp.position}</Text>
                    <Text style={[colStyles.expCompanyRight, { color: themeColorText }]}>{exp.company}</Text>
                  </View>
                  <View style={colStyles.expDateBadge}>
                    <Text style={colStyles.expDateText}>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</Text>
                  </View>
                </View>
                {exp.description.map((desc, idx) => (
                  <View key={idx} style={colStyles.bulletContainerRight}>
                    <Text style={[colStyles.bulletPointRight, { color: themeColorText }]}>▹</Text>
                    <Text style={colStyles.bulletTextRight}>{desc}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {nonEmptyProjects.length > 0 && (
          <View>
            <View wrap={false}>
              <View style={colStyles.sectionTitleRowRight}>
                <View style={[colStyles.sectionTitleRightBar, { backgroundColor: themeColorBg }]} />
                <Text style={colStyles.sectionTitleRightText}>Projects</Text>
              </View>
              {nonEmptyProjects.length > 0 && (
                <View style={{ marginBottom: 3 }}>
                  <Text style={colStyles.expTitleRight}>{nonEmptyProjects[0].name}</Text>
                  {nonEmptyProjects[0].link ? (
                    <Text style={{ fontSize: 8, color: themeColorText, marginTop: 1, marginBottom: 2 }}>
                      {String(nonEmptyProjects[0].link).replace(/^https?:\/\//, '')}
                    </Text>
                  ) : null}
                </View>
              )}
              {nonEmptyProjects.length > 0 && (
                <View style={{ marginBottom: 10 }}>
                  {nonEmptyProjects[0].description && <Text style={colStyles.projectDescRight}>{nonEmptyProjects[0].description}</Text>}
                  {nonEmptyProjects[0].technologies && nonEmptyProjects[0].technologies.length > 0 && (
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 3 }}>
                      {nonEmptyProjects[0].technologies.map((tech, idx) => (
                        <Text key={idx} style={{ fontSize: 7.5, color: '#4B5563', backgroundColor: '#F3F4F6', paddingVertical: 1.5, paddingHorizontal: 4, borderRadius: 2 }}>{tech}</Text>
                      ))}
                    </View>
                  )}
                </View>
              )}
            </View>

            {nonEmptyProjects.slice(1).map((project) => (
              <View key={project.id} wrap={false} style={colStyles.expItemRight}>
                <View style={{ marginBottom: 3 }}>
                  <Text style={colStyles.expTitleRight}>{project.name}</Text>
                  {project.link ? (
                    <Text style={{ fontSize: 8, color: themeColorText, marginTop: 1, marginBottom: 2 }}>
                      {String(project.link).replace(/^https?:\/\//, '')}
                    </Text>
                  ) : null}
                </View>
                {project.description && <Text style={colStyles.projectDescRight}>{project.description}</Text>}
                {project.technologies && project.technologies.length > 0 && (
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 3 }}>
                    {project.technologies.map((tech, idx) => (
                      <Text key={idx} style={{ fontSize: 7.5, color: '#4B5563', backgroundColor: '#F3F4F6', paddingVertical: 1.5, paddingHorizontal: 4, borderRadius: 2 }}>{tech}</Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
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
        <View style={[cntStyles.contactInfo, { columnGap: 12, rowGap: 8 }]}>
          {data.personalInfo.email ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }} wrap={false}>
              <View style={{ marginRight: 5, paddingTop: 1 }}>
                <PdfIconMail color={themeColorText} />
              </View>
              <Text style={cntStyles.contactItem}>{data.personalInfo.email}</Text>
            </View>
          ) : null}
          {data.personalInfo.phone ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }} wrap={false}>
              <View style={{ marginRight: 5, paddingTop: 1 }}>
                <PdfIconPhone color={themeColorText} />
              </View>
              <Text style={cntStyles.contactItem}>{data.personalInfo.phone}</Text>
            </View>
          ) : null}
          {data.personalInfo.location ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }} wrap={false}>
              <View style={{ marginRight: 5, paddingTop: 1 }}>
                <PdfIconMapPin color={themeColorText} />
              </View>
              <Text style={cntStyles.contactItem}>{data.personalInfo.location}</Text>
            </View>
          ) : null}
          {data.personalInfo.linkedin ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }} wrap={false}>
              <View style={{ marginRight: 5, paddingTop: 1 }}>
                <PdfIconLinkedInGlyph color={themeColorText} />
              </View>
              <Text style={cntStyles.contactItem}>{data.personalInfo.linkedin}</Text>
            </View>
          ) : null}
          {data.personalInfo.website ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }} wrap={false}>
              <View style={{ marginRight: 5, paddingTop: 1 }}>
                <PdfIconGlobe color={themeColorText} />
              </View>
              <Text style={cntStyles.contactItem}>{data.personalInfo.website}</Text>
            </View>
          ) : null}
        </View>
      </View>

      {data.summary && (
        <Text style={cntStyles.summaryText}>"{data.summary}"</Text>
      )}

      {data.experience.length > 0 && (
        <View>
          <View wrap={false}>
            <View style={cntStyles.sectionTitleContainer}>
              <View style={[cntStyles.sectionTitleLine, { backgroundColor: themeColorBg }]} />
              <View style={cntStyles.sectionTitleWrapper}>
                <Text style={cntStyles.sectionTitle}>Professional Experience</Text>
              </View>
            </View>
            {data.experience.length > 0 && (
              <View style={cntStyles.itemHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 8 }}>
                  <Text style={cntStyles.itemTitle}>{data.experience[0].position}</Text>
                  <Text style={[cntStyles.itemSubtitle, { color: themeColorText }]}>{data.experience[0].company}</Text>
                </View>
                <Text style={cntStyles.itemDate}>{formatDate(data.experience[0].startDate)} - {formatDate(data.experience[0].endDate)}</Text>
              </View>
            )}
            {data.experience.length > 0 && (
              <View style={{ marginBottom: 12 }}>
                {data.experience[0].description.map((desc, idx) => (
                  <View key={idx} style={cntStyles.bulletContainer}>
                    <Text style={cntStyles.bulletPoint}>•</Text>
                    <Text style={cntStyles.bulletText}>{desc}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {data.experience.slice(1).map((exp) => (
            <View key={exp.id} wrap={false} style={cntStyles.itemContainer}>
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
          <View wrap={false}>
            <View style={cntStyles.sectionTitleContainer}>
              <View style={[cntStyles.sectionTitleLine, { backgroundColor: themeColorBg }]} />
              <View style={cntStyles.sectionTitleWrapper}>
                <Text style={cntStyles.sectionTitle}>Education</Text>
              </View>
            </View>
            {data.education.length > 0 && (
              <View style={cntStyles.itemContainer}>
                <View style={cntStyles.itemHeader}>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 8 }}>
                    <Text style={cntStyles.itemTitle}>{data.education[0].degree}{data.education[0].field ? ` in ${data.education[0].field}` : ''}</Text>
                    <Text style={[cntStyles.itemSubtitle, { color: themeColorText }]}>{data.education[0].institution}</Text>
                  </View>
                  <Text style={cntStyles.itemDate}>{formatEducationDates(data.education[0].startDate, data.education[0].endDate)}</Text>
                </View>
              </View>
            )}
          </View>
          
          {data.education.slice(1).map((edu) => (
            <View key={edu.id} wrap={false} style={cntStyles.itemContainer}>
              <View style={cntStyles.itemHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 8 }}>
                  <Text style={cntStyles.itemTitle}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</Text>
                  <Text style={[cntStyles.itemSubtitle, { color: themeColorText }]}>{edu.institution}</Text>
                </View>
                <Text style={cntStyles.itemDate}>{formatEducationDates(edu.startDate, edu.endDate)}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {nonEmptyProjects.length > 0 && (
        <View>
          <View wrap={false}>
            <View style={cntStyles.sectionTitleContainer}>
              <View style={[cntStyles.sectionTitleLine, { backgroundColor: themeColorBg }]} />
              <View style={cntStyles.sectionTitleWrapper}>
                <Text style={cntStyles.sectionTitle}>Selected Projects</Text>
              </View>
            </View>
            {nonEmptyProjects.length > 0 && (
              <View style={{ marginBottom: 4 }}>
                <Text style={cntStyles.itemTitle}>{nonEmptyProjects[0].name}</Text>
                {nonEmptyProjects[0].link ? (
                  <Text style={{ fontSize: 8.5, color: themeColorText, textAlign: 'center', marginTop: 1, marginBottom: 2 }}>
                    {String(nonEmptyProjects[0].link).replace(/^https?:\/\//, '')}
                  </Text>
                ) : null}
              </View>
            )}
            {nonEmptyProjects.length > 0 && (
              <View style={{ marginBottom: 12 }}>
                {nonEmptyProjects[0].description && <Text style={cntStyles.projectDesc}>{nonEmptyProjects[0].description}</Text>}
                {nonEmptyProjects[0].technologies && nonEmptyProjects[0].technologies.length > 0 && (
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 4, marginTop: 4 }}>
                    {nonEmptyProjects[0].technologies.map((tech, idx) => (
                      <Text key={idx} style={{ fontSize: 8, color: '#6B7280', backgroundColor: '#F3F4F6', paddingVertical: 3, paddingHorizontal: 6, borderRadius: 2 }}>{tech}</Text>
                    ))}
                  </View>
                )}
              </View>
            )}
          </View>

          {nonEmptyProjects.slice(1).map((project) => (
            <View key={project.id} wrap={false} style={cntStyles.itemContainer}>
              <View style={{ marginBottom: 4 }}>
                <Text style={cntStyles.itemTitle}>{project.name}</Text>
                {project.link ? (
                  <Text style={{ fontSize: 8.5, color: themeColorText, textAlign: 'center', marginTop: 1, marginBottom: 2 }}>
                    {String(project.link).replace(/^https?:\/\//, '')}
                  </Text>
                ) : null}
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
        <View wrap={false}>
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
          <View wrap={false}>
            <View style={cntStyles.sectionTitleContainer}>
              <View style={[cntStyles.sectionTitleLine, { backgroundColor: themeColorBg }]} />
              <View style={cntStyles.sectionTitleWrapper}>
                <Text style={cntStyles.sectionTitle}>{section.title}</Text>
              </View>
            </View>
            <View key={section.items[0].id} style={cntStyles.itemContainer}>
              <View style={cntStyles.itemHeader}>
                <Text style={cntStyles.itemTitle}>{section.items[0].name}</Text>
                {section.items[0].date ? <Text style={cntStyles.itemDate}>{section.items[0].date}</Text> : null}
              </View>
              {section.items[0].description && (
                <View style={cntStyles.bulletContainer}>
                  <Text style={cntStyles.bulletPoint}>•</Text>
                  <Text style={cntStyles.bulletText}>{section.items[0].description}</Text>
                </View>
              )}
            </View>
          </View>
          {section.items.slice(1).map((item) => (
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

const ysStyles = StyleSheet.create({
  page: { flexDirection: 'row', backgroundColor: '#FFFFFF', fontFamily: 'Inter', padding: 30 },
  leftCol: { width: '35%', paddingRight: 20, borderRightWidth: 4, borderLeftWidth: 8, paddingLeft: 15, backgroundColor: '#FFFBF0' },
  rightCol: { width: '65%', paddingLeft: 20 },
  name: { fontSize: 32, fontWeight: 'bold', color: '#111827', marginBottom: 5, letterSpacing: 2, textTransform: 'uppercase' },
  title: { fontSize: 13, marginBottom: 20, color: '#111827', fontWeight: 'bold' },
  contactItemLeft: { fontSize: 9, color: '#374151', marginBottom: 6 },
  sectionTitleLeft: { fontSize: 13, fontWeight: 'bold', color: '#111827', marginTop: 15, marginBottom: 8, textTransform: 'uppercase' },
  sectionTitleRight: { fontSize: 13, fontWeight: 'bold', color: '#111827', marginBottom: 8, textTransform: 'uppercase' },
  skillItemLeft: { flexDirection: 'row', marginBottom: 4, alignItems: 'center' },
  eduItemLeft: { marginBottom: 12 },
  eduDateLeft: { fontSize: 8, color: '#6B7280', marginBottom: 2 },
  eduDegreeLeft: { fontSize: 10, fontWeight: 'bold', color: '#111827' },
  eduInstLeft: { fontSize: 9, color: '#374151' },
  summaryTextRight: { fontSize: 10, color: '#374151', lineHeight: 1.5, marginBottom: 20, textAlign: 'justify' },
  expItemRight: { marginBottom: 12 },
  expHeaderRight: { marginBottom: 4 },
  expTitleRight: { fontSize: 11, fontWeight: 'bold', color: '#111827', marginBottom: 2 },
  expCompanyRight: { fontSize: 10, fontWeight: 'bold', color: '#111827' },
  expDateRight: { fontSize: 9, color: '#6B7280', marginBottom: 4 },
  bulletContainerRight: { flexDirection: 'row', marginBottom: 3 },
  bulletPointRight: { width: 10, fontSize: 10, color: '#111827' },
  bulletTextRight: { flex: 1, fontSize: 10, color: '#374151', lineHeight: 1.4 }
});

export const YellowSidebarPDFLayout: React.FC<PDFLayoutProps> = ({ data, themeColorBg, themeColorText }) => {
  const nonEmptyProjects = getNonEmptyProjects(data);
  const primaryBg = themeColorBg !== '#2563EB' ? themeColorBg : '#FECE2F';
  const linkColor = themeColorText && themeColorText !== '#2563EB' ? themeColorText : (primaryBg.toLowerCase() === '#fece2f' ? '#B45309' : primaryBg);

  return (
    <Page size="A4" style={ysStyles.page}>
      <View style={[ysStyles.leftCol, { borderRightColor: primaryBg, borderLeftColor: primaryBg }]}>
        {data.personalInfo.imageUrl ? (
          <Image
            src={data.personalInfo.imageUrl}
            style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 2, borderWidth: 2, borderColor: linkColor, marginBottom: 15, alignSelf: 'flex-start' }}
          />
        ) : null}
        <Text style={ysStyles.sectionTitleLeft}>Contact</Text>
        {data.personalInfo.location ? (
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 }} wrap={false}>
            <View style={pdfContactIconCell()}>
              <PdfIconMapPin color={PDF_ICON_GRAY} />
            </View>
            <Text style={[ysStyles.contactItemLeft, { flex: 1, marginBottom: 0 }]}>{data.personalInfo.location}</Text>
          </View>
        ) : null}
        {data.personalInfo.phone ? (
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 }} wrap={false}>
            <View style={pdfContactIconCell()}>
              <PdfIconPhone color={PDF_ICON_GRAY} />
            </View>
            <Text style={[ysStyles.contactItemLeft, { flex: 1, marginBottom: 0 }]}>{data.personalInfo.phone}</Text>
          </View>
        ) : null}
        {data.personalInfo.email ? (
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 }} wrap={false}>
            <View style={pdfContactIconCell()}>
              <PdfIconMail color={PDF_ICON_GRAY} />
            </View>
            <Text style={[ysStyles.contactItemLeft, { flex: 1, marginBottom: 0 }]}>{data.personalInfo.email}</Text>
          </View>
        ) : null}
        {data.personalInfo.linkedin ? (
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 }} wrap={false}>
            <View style={pdfContactIconCell()}>
              <PdfIconLinkedInGlyph color={PDF_ICON_GRAY} />
            </View>
            <Text style={[ysStyles.contactItemLeft, { flex: 1, marginBottom: 0 }]}>{data.personalInfo.linkedin}</Text>
          </View>
        ) : null}
        {data.personalInfo.website ? (
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 }} wrap={false}>
            <View style={pdfContactIconCell()}>
              <PdfIconGlobe color={PDF_ICON_GRAY} />
            </View>
            <Text style={[ysStyles.contactItemLeft, { flex: 1, marginBottom: 0 }]}>{data.personalInfo.website}</Text>
          </View>
        ) : null}

        {data.skills.length > 0 && (
          <View wrap={false} style={{ marginTop: 10 }}>
            <Text style={ysStyles.sectionTitleLeft}>Skills</Text>
            {data.skills.map((skill) => (
              <View key={skill.id} style={ysStyles.skillItemLeft}>
                 <Text style={{ width: 10, fontSize: 10, color: '#111827' }}>•</Text>
                 <Text style={{ fontSize: 9, color: '#374151', flex: 1 }}>{skill.name}</Text>
              </View>
            ))}
          </View>
        )}

        {data.education.length > 0 && (
          <View wrap={false} style={{ marginTop: 10 }}>
            <Text style={ysStyles.sectionTitleLeft}>Education</Text>
            {data.education.map((edu) => (
              <View key={edu.id} style={ysStyles.eduItemLeft}>
                <Text style={ysStyles.eduDateLeft}>{formatEducationDates(edu.startDate, edu.endDate)}</Text>
                <Text style={ysStyles.eduDegreeLeft}>{edu.degree}</Text>
                <Text style={ysStyles.eduInstLeft}>{edu.institution}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={ysStyles.rightCol}>
        <View style={{ marginBottom: 20 }}>
          <Text style={ysStyles.name}>{data.personalInfo.firstName} {data.personalInfo.lastName}</Text>
          <View style={{ width: 40, height: 3, backgroundColor: primaryBg, marginTop: 5 }} />
        </View>

        {data.summary && (
          <View wrap={false}>
            <Text style={ysStyles.sectionTitleRight}>Professional Summary</Text>
            <Text style={ysStyles.summaryTextRight}>{data.summary}</Text>
          </View>
        )}

        {data.experience.length > 0 && (
          <View>
            <View wrap={false}>
              <Text style={ysStyles.sectionTitleRight}>Work History</Text>
              <View wrap={false} style={ysStyles.expItemRight}>
                <Text style={ysStyles.expDateRight}>{formatDate(data.experience[0].startDate)} - {formatDate(data.experience[0].endDate)}</Text>
                <View style={ysStyles.expHeaderRight}>
                  <Text style={ysStyles.expTitleRight}>{data.experience[0].position}, {data.experience[0].company}</Text>
                </View>
                {data.experience[0].description.map((desc, idx) => (
                  <View key={idx} style={ysStyles.bulletContainerRight}>
                    <Text style={ysStyles.bulletPointRight}>•</Text>
                    <Text style={ysStyles.bulletTextRight}>{desc}</Text>
                  </View>
                ))}
              </View>
            </View>
            {data.experience.slice(1).map((exp) => (
              <View key={exp.id} wrap={false} style={ysStyles.expItemRight}>
                <Text style={ysStyles.expDateRight}>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</Text>
                <View style={ysStyles.expHeaderRight}>
                  <Text style={ysStyles.expTitleRight}>{exp.position}, {exp.company}</Text>
                </View>
                {exp.description.map((desc, idx) => (
                  <View key={idx} style={ysStyles.bulletContainerRight}>
                    <Text style={ysStyles.bulletPointRight}>•</Text>
                    <Text style={ysStyles.bulletTextRight}>{desc}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {nonEmptyProjects.length > 0 && (
          <View>
            <View wrap={false}>
              <Text style={ysStyles.sectionTitleRight}>Projects</Text>
              <View key={nonEmptyProjects[0].id} wrap={false} style={ysStyles.expItemRight}>
                <View style={{ marginBottom: 4 }}>
                  <Text style={ysStyles.expTitleRight}>{nonEmptyProjects[0].name}</Text>
                  {nonEmptyProjects[0].link ? (
                    <Text style={{ fontSize: 8.5, color: linkColor, marginTop: 1, marginBottom: 2 }}>
                      {String(nonEmptyProjects[0].link).replace(/^https?:\/\//, '')}
                    </Text>
                  ) : null}
                </View>
                {nonEmptyProjects[0].description && (
                  <View style={ysStyles.bulletContainerRight}>
                    <Text style={ysStyles.bulletPointRight}>•</Text>
                    <Text style={ysStyles.bulletTextRight}>{nonEmptyProjects[0].description}</Text>
                  </View>
                )}
              </View>
            </View>
            {nonEmptyProjects.slice(1).map((project) => (
              <View key={project.id} wrap={false} style={ysStyles.expItemRight}>
                <View style={{ marginBottom: 4 }}>
                  <Text style={ysStyles.expTitleRight}>{project.name}</Text>
                  {project.link ? (
                    <Text style={{ fontSize: 8.5, color: linkColor, marginTop: 1, marginBottom: 2 }}>
                      {String(project.link).replace(/^https?:\/\//, '')}
                    </Text>
                  ) : null}
                </View>
                {project.description && (
                  <View style={ysStyles.bulletContainerRight}>
                    <Text style={ysStyles.bulletPointRight}>•</Text>
                    <Text style={ysStyles.bulletTextRight}>{project.description}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </View>
    </Page>
  );
};

const nsStyles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Inter',
    paddingTop: PDF_PAGE_V_MARGIN,
    paddingBottom: PDF_PAGE_V_MARGIN,
  },
  leftCol: { width: '70%', padding: 40 },
  rightCol: { width: '30%', padding: 30, backgroundColor: '#1E293B', color: '#FFFFFF' },
  name: { fontSize: 28, fontWeight: 'bold', color: '#111827', marginBottom: 5 },
  title: { fontSize: 13, color: '#6B7280', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 20 },
  sectionTitleBody: { fontSize: 14, fontWeight: 'bold', color: '#111827', borderBottomWidth: 1, borderBottomColor: '#E5E7EB', paddingBottom: 5, marginBottom: 15 },
  sectionTitleSidebar: { fontSize: 12, fontWeight: 'bold', color: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#475569', paddingBottom: 5, marginBottom: 15 },
  normalText: { fontSize: 10, color: '#4B5563', lineHeight: 1.5, textAlign: 'justify' },
  sidebarText: { fontSize: 9, color: '#E2E8F0', marginBottom: 8 },
  itemContainer: { marginBottom: 15 },
  itemTitle: { fontSize: 11, fontWeight: 'bold', color: '#111827' },
  itemSubtitle: { fontSize: 10, color: '#2563EB', fontWeight: 'bold', marginTop: 2 },
  itemDate: { fontSize: 9, color: '#6B7280' },
  bulletContainer: { flexDirection: 'row', marginBottom: 4, marginTop: 4 },
  bulletPoint: { width: 10, fontSize: 10, color: '#6B7280' },
  bulletText: { flex: 1, fontSize: 10, color: '#4B5563', lineHeight: 1.4 },
});

export const NavySidebarPDFLayout: React.FC<PDFLayoutProps> = ({ data, themeColorBg, themeColorText }) => {
  const nonEmptyProjects = getNonEmptyProjects(data);
  const darkBg = themeColorBg !== '#2563EB' ? themeColorBg : '#1E293B';
  const primaryText = themeColorText !== '#2563EB' ? themeColorText : '#2563EB';

  return (
    <Page size="A4" style={nsStyles.page}>
      <View style={nsStyles.leftCol}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' }}>
          {data.personalInfo.imageUrl ? (
            <Image
              src={data.personalInfo.imageUrl}
              style={{ width: 50, height: 50, borderRadius: 25, marginRight: 15, objectFit: 'cover' }}
            />
          ) : null}
          <View style={{ flex: 1 }}>
            <Text style={nsStyles.name}>{data.personalInfo.firstName} {data.personalInfo.lastName}</Text>
            <Text style={nsStyles.title}>{data.personalInfo.title}</Text>
          </View>
        </View>

        {data.summary && (
          <View wrap={false} style={{ marginBottom: 20 }}>
            <Text style={nsStyles.sectionTitleBody}>Profile</Text>
            <Text style={nsStyles.normalText}>{data.summary}</Text>
          </View>
        )}

        {data.experience.length > 0 && (
          <View>
            <View wrap={false}>
              <Text style={nsStyles.sectionTitleBody}>Employment History</Text>
              <View key={data.experience[0].id} wrap={false} style={nsStyles.itemContainer}>
                <Text style={nsStyles.itemTitle}>
                  {data.experience[0].position}, {data.experience[0].company}
                </Text>
                <Text style={nsStyles.itemDate}>
                  {formatDate(data.experience[0].startDate)} - {formatDate(data.experience[0].endDate)}
                </Text>
                {data.experience[0].description.map((desc, idx) => (
                  <View key={idx} style={nsStyles.bulletContainer}>
                    <Text style={nsStyles.bulletPoint}>•</Text>
                    <Text style={nsStyles.bulletText}>{desc}</Text>
                  </View>
                ))}
              </View>
            </View>
            {data.experience.slice(1).map((exp) => (
              <View key={exp.id} wrap={false} style={nsStyles.itemContainer}>
                <Text style={nsStyles.itemTitle}>
                  {exp.position}, {exp.company}
                </Text>
                <Text style={nsStyles.itemDate}>
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </Text>
                {exp.description.map((desc, idx) => (
                  <View key={idx} style={nsStyles.bulletContainer}>
                    <Text style={nsStyles.bulletPoint}>•</Text>
                    <Text style={nsStyles.bulletText}>{desc}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {data.education.length > 0 && (
          <View wrap={false} style={{ marginTop: 5 }}>
            <Text style={nsStyles.sectionTitleBody}>Education</Text>
            {data.education.map((edu) => (
              <View key={edu.id} style={nsStyles.itemContainer}>
                <Text style={nsStyles.itemTitle}>
                  {edu.degree}
                  {edu.field ? `, ${edu.field}` : ''}, {edu.institution}
                </Text>
                <Text style={nsStyles.itemDate}>
                  {formatEducationDates(edu.startDate, edu.endDate)}
                </Text>
              </View>
            ))}
          </View>
        )}

        {nonEmptyProjects.length > 0 && (
          <View style={{ marginTop: 5 }}>
            <View wrap={false}>
              <Text style={nsStyles.sectionTitleBody}>Projects</Text>
              <View key={nonEmptyProjects[0].id} style={nsStyles.itemContainer}>
                <Text style={nsStyles.itemTitle}>{nonEmptyProjects[0].name}</Text>
                {nonEmptyProjects[0].description ? (
                  <Text style={[nsStyles.normalText, { marginTop: 4 }]}>{nonEmptyProjects[0].description}</Text>
                ) : null}
                {nonEmptyProjects[0].technologies && nonEmptyProjects[0].technologies.length > 0 ? (
                  <Text style={[nsStyles.itemDate, { marginTop: 4 }]}>
                    Technologies: {nonEmptyProjects[0].technologies.join(', ')}
                  </Text>
                ) : null}
                {nonEmptyProjects[0].link ? (
                  <Text style={{ fontSize: 8.5, color: primaryText, marginTop: 1, marginBottom: 2 }}>
                    {String(nonEmptyProjects[0].link).replace(/^https?:\/\//, '')}
                  </Text>
                ) : null}
              </View>
            </View>
            {nonEmptyProjects.slice(1).map((project) => (
              <View key={project.id} style={nsStyles.itemContainer}>
                <Text style={nsStyles.itemTitle}>{project.name}</Text>
                {project.description ? (
                  <Text style={[nsStyles.normalText, { marginTop: 4 }]}>{project.description}</Text>
                ) : null}
                {project.technologies && project.technologies.length > 0 ? (
                  <Text style={[nsStyles.itemDate, { marginTop: 4 }]}>
                    Technologies: {project.technologies.join(', ')}
                  </Text>
                ) : null}
                {project.link ? (
                  <Text style={{ fontSize: 8.5, color: primaryText, marginTop: 1, marginBottom: 2 }}>
                    {String(project.link).replace(/^https?:\/\//, '')}
                  </Text>
                ) : null}
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={[nsStyles.rightCol, { backgroundColor: darkBg }]}>
        <Text style={nsStyles.sectionTitleSidebar}>Details</Text>
        {data.personalInfo.location ? (
          <View style={{ marginBottom: 8, flexDirection: 'row', alignItems: 'flex-start' }} wrap={false}>
            <View style={{ width: 14, marginRight: 6, paddingTop: 2 }}>
              <PdfIconMapPin color="#94A3B8" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 8, color: '#94A3B8', marginBottom: 2 }}>Location</Text>
              <Text style={nsStyles.sidebarText}>{data.personalInfo.location}</Text>
            </View>
          </View>
        ) : null}
        {data.personalInfo.phone ? (
          <View style={{ marginBottom: 8, flexDirection: 'row', alignItems: 'flex-start' }} wrap={false}>
            <View style={{ width: 14, marginRight: 6, paddingTop: 2 }}>
              <PdfIconPhone color="#94A3B8" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 8, color: '#94A3B8', marginBottom: 2 }}>Phone</Text>
              <Text style={nsStyles.sidebarText}>{data.personalInfo.phone}</Text>
            </View>
          </View>
        ) : null}
        {data.personalInfo.email ? (
          <View style={{ marginBottom: 8, flexDirection: 'row', alignItems: 'flex-start' }} wrap={false}>
            <View style={{ width: 14, marginRight: 6, paddingTop: 2 }}>
              <PdfIconMail color="#94A3B8" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 8, color: '#94A3B8', marginBottom: 2 }}>Email</Text>
              <Text style={nsStyles.sidebarText}>{data.personalInfo.email}</Text>
            </View>
          </View>
        ) : null}
        {data.personalInfo.linkedin ? (
          <View style={{ marginBottom: 8, flexDirection: 'row', alignItems: 'flex-start' }} wrap={false}>
            <View style={{ width: 14, marginRight: 6, paddingTop: 1 }}>
              <PdfIconLinkedInGlyph color="#94A3B8" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 8, color: '#94A3B8', marginBottom: 2 }}>LinkedIn</Text>
              <Text style={nsStyles.sidebarText}>{data.personalInfo.linkedin}</Text>
            </View>
          </View>
        ) : null}
        {data.personalInfo.website ? (
          <View style={{ marginBottom: 8, flexDirection: 'row', alignItems: 'flex-start' }} wrap={false}>
            <View style={{ width: 14, marginRight: 6, paddingTop: 2 }}>
              <PdfIconGlobe color="#94A3B8" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 8, color: '#94A3B8', marginBottom: 2 }}>Portfolio</Text>
              <Text style={nsStyles.sidebarText}>{data.personalInfo.website}</Text>
            </View>
          </View>
        ) : null}

        {data.skills.length > 0 && (
          <View wrap={false} style={{ marginTop: 15 }}>
            <Text style={nsStyles.sectionTitleSidebar}>Skills</Text>
            {data.skills.map((skill) => (
              <View key={skill.id} style={{ marginBottom: 8 }}>
                <Text style={{ fontSize: 9, color: '#FFFFFF', fontWeight: 'bold' }}>{skill.name}</Text>
                {skill.level && (
                  <View style={{ width: '100%', height: 2, backgroundColor: 'rgba(255,255,255,0.2)', marginTop: 4 }}>
                    <View style={{ height: 2, backgroundColor: '#FFFFFF', width: skill.level === 'Beginner' ? '25%' : skill.level === 'Intermediate' ? '50%' : skill.level === 'Advanced' ? '75%' : '100%' }} />
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </View>
    </Page>
  );
};

const frStyles = StyleSheet.create({
  page: { flexDirection: 'row', backgroundColor: '#FAFAFA', padding: 35, fontFamily: 'Inter' },
  leftCol: { width: '75%', paddingRight: 20, borderRightWidth: 1, borderRightColor: '#D1D5DB' },
  rightCol: { width: '25%', paddingLeft: 15 },
  headerRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 15, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#D1D5DB' },
  profileImage: { width: 55, height: 55, objectFit: 'cover', borderWidth: 1, borderColor: '#E5E7EB', marginRight: 12, backgroundColor: '#FFFFFF' },
  name: { fontSize: 22, fontWeight: 'bold', color: '#7F1D1D', marginBottom: 3 },
  title: { fontSize: 11, color: '#374151', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 0.5 },
  contactInfo: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 6 },
  contactItem: { fontSize: 8, color: '#6B7280', textTransform: 'uppercase' },
  sectionTitle: { fontSize: 11, fontWeight: 'bold', color: '#1F2937', textTransform: 'uppercase', marginBottom: 10, letterSpacing: 1 },
  summaryText: { fontSize: 9.5, color: '#374151', lineHeight: 1.5, textAlign: 'justify', marginBottom: 14 },
  itemContainer: { marginBottom: 12 },
  itemHeader: { marginBottom: 3 },
  itemTitle: { fontSize: 10.5, fontWeight: 'bold', color: '#111827' },
  itemSubtitle: { fontSize: 9, color: '#4B5563', marginTop: 1 },
  itemDate: { fontSize: 8.5, color: '#6B7280', fontStyle: 'italic', marginTop: 1 },
  bulletContainer: { flexDirection: 'row', marginBottom: 3 },
  bulletPoint: { width: 10, fontSize: 9, color: '#111827' },
  bulletText: { flex: 1, fontSize: 9, color: '#374151', lineHeight: 1.4, textAlign: 'justify' },
  skillItem: { fontSize: 9, color: '#1F2937', marginBottom: 6, paddingBottom: 6, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  projectItem: { marginBottom: 10 },
  projectName: { fontSize: 9.5, fontWeight: 'bold', color: '#111827', marginBottom: 2 },
  projectLink: { fontSize: 8, color: '#B91C1C', marginBottom: 2 },
  projectTech: { fontSize: 8, color: '#4B5563', fontStyle: 'italic' }
});

export const FormalRedPDFLayout: React.FC<PDFLayoutProps> = ({ data, themeColorText }) => {
  const nonEmptyProjects = getNonEmptyProjects(data);
  const primaryColor = themeColorText !== '#2563EB' ? themeColorText : '#7F1D1D';

  return (
    <Page size="A4" style={frStyles.page}>
      {/* Left Main Column (75%) */}
      <View style={frStyles.leftCol}>
        <View style={frStyles.headerRow}>
          {data.personalInfo.imageUrl ? (
            <Image src={data.personalInfo.imageUrl} style={frStyles.profileImage} />
          ) : null}
          <View style={{ flex: 1 }}>
            <Text style={[frStyles.name, { color: primaryColor }]}>
              {(data.personalInfo.firstName || '')} {(data.personalInfo.lastName || '')}
              {data.personalInfo.title ? <Text style={{ color: '#374151', fontWeight: 'normal', fontSize: 14 }}>, {data.personalInfo.title}</Text> : null}
            </Text>
            <View style={frStyles.contactInfo}>
              {data.personalInfo.location ? (
                <Text style={frStyles.contactItem}>{data.personalInfo.location}</Text>
              ) : null}
              {data.personalInfo.location && (data.personalInfo.email || data.personalInfo.phone) ? (
                <Text style={frStyles.contactItem}>•</Text>
              ) : null}
              {data.personalInfo.email ? (
                <Text style={frStyles.contactItem}>{data.personalInfo.email}</Text>
              ) : null}
              {data.personalInfo.email && data.personalInfo.phone ? (
                <Text style={frStyles.contactItem}>•</Text>
              ) : null}
              {data.personalInfo.phone ? (
                <Text style={frStyles.contactItem}>{data.personalInfo.phone}</Text>
              ) : null}
            </View>
          </View>
        </View>

        {data.summary && (
          <View wrap={false} style={{ marginBottom: 10 }}>
            <Text style={frStyles.sectionTitle}>Profile</Text>
            <Text style={frStyles.summaryText}>{data.summary}</Text>
          </View>
        )}

        {data.experience.length > 0 && (
          <View style={{ marginBottom: 10 }}>
            <View wrap={false}>
              <Text style={frStyles.sectionTitle}>Employment History</Text>
              <View key={data.experience[0].id} wrap={false} style={frStyles.itemContainer}>
                <Text style={frStyles.itemTitle}>{data.experience[0].position || 'Position'}, {(data.experience[0].company || 'Company')}</Text>
                <Text style={frStyles.itemDate}>{formatDate(data.experience[0].startDate)} — {formatDate(data.experience[0].endDate)}</Text>
                {data.experience[0].description && data.experience[0].description.map((desc, idx) => (
                   <View key={idx} style={frStyles.bulletContainer}>
                     <Text style={frStyles.bulletPoint}>•</Text>
                     <Text style={frStyles.bulletText}>{desc}</Text>
                   </View>
                ))}
              </View>
            </View>
            {data.experience.slice(1).map((exp) => (
              <View key={exp.id} wrap={false} style={frStyles.itemContainer}>
                <Text style={frStyles.itemTitle}>{exp.position || 'Position'}, {(exp.company || 'Company')}</Text>
                <Text style={frStyles.itemDate}>{formatDate(exp.startDate)} — {formatDate(exp.endDate)}</Text>
                {exp.description && exp.description.map((desc, idx) => (
                   <View key={idx} style={frStyles.bulletContainer}>
                     <Text style={frStyles.bulletPoint}>•</Text>
                     <Text style={frStyles.bulletText}>{desc}</Text>
                   </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {data.education.length > 0 && (
          <View wrap={false} style={{ marginTop: 6 }}>
            <Text style={frStyles.sectionTitle}>Education</Text>
            {data.education.map((edu) => (
              <View key={edu.id} style={frStyles.itemContainer} wrap={false}>
                <Text style={frStyles.itemTitle}>{(edu.institution || '')}, {edu.degree || ''}</Text>
                <Text style={frStyles.itemDate}>{formatEducationDates(edu.startDate, edu.endDate)}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Right Sidebar Column (25%) */}
      <View style={frStyles.rightCol}>
        {data.skills.length > 0 && (
          <View wrap={false} style={{ marginBottom: 15 }}>
            <Text style={frStyles.sectionTitle}>Skills</Text>
            {data.skills.map((skill) => (
               <Text key={skill.id} style={frStyles.skillItem}>{skill.name || 'Skill'}</Text>
            ))}
          </View>
        )}

        {nonEmptyProjects.length > 0 && (
          <View style={{ marginTop: 10 }}>
            <View wrap={false}>
              <Text style={frStyles.sectionTitle}>Projects</Text>
              <View key={nonEmptyProjects[0].id} wrap={false} style={frStyles.projectItem}>
                <Text style={frStyles.projectName}>{nonEmptyProjects[0].name || 'Project'}</Text>
                {nonEmptyProjects[0].link ? (
                  <Text style={frStyles.projectLink}>
                    {String(nonEmptyProjects[0].link).replace(/^https?:\/\//, '')}
                  </Text>
                ) : null}
                {nonEmptyProjects[0].technologies && nonEmptyProjects[0].technologies.length > 0 ? (
                  <Text style={frStyles.projectTech}>{nonEmptyProjects[0].technologies.join(', ')}</Text>
                ) : null}
                {nonEmptyProjects[0].description ? (
                  <Text style={[frStyles.bulletText, { marginTop: 2 }]}>{nonEmptyProjects[0].description}</Text>
                ) : null}
              </View>
            </View>
            {nonEmptyProjects.slice(1).map((project) => (
              <View key={project.id} wrap={false} style={frStyles.projectItem}>
                <Text style={frStyles.projectName}>{project.name || 'Project'}</Text>
                {project.link ? (
                  <Text style={frStyles.projectLink}>
                    {String(project.link).replace(/^https?:\/\//, '')}
                  </Text>
                ) : null}
                {project.technologies && project.technologies.length > 0 ? (
                  <Text style={frStyles.projectTech}>{project.technologies.join(', ')}</Text>
                ) : null}
                {project.description ? (
                  <Text style={[frStyles.bulletText, { marginTop: 2 }]}>{project.description}</Text>
                ) : null}
              </View>
            ))}
          </View>
        )}
      </View>
    </Page>
  );
};

const tlStyles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Inter',
    paddingTop: PDF_PAGE_V_MARGIN,
    paddingBottom: PDF_PAGE_V_MARGIN,
  },
  leftCol: { width: '32%', padding: 22, backgroundColor: '#E5E7EB' },
  rightCol: { width: '68%', backgroundColor: '#FFFFFF' },
  headerRight: { padding: 25, backgroundColor: '#334155', justifyContent: 'center' },
  name: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 4, textTransform: 'uppercase' },
  title: { fontSize: 12, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 1 },
  bodyRight: { padding: 25 },
  sectionTitleLeft: { fontSize: 11, fontWeight: 'bold', color: '#111827', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10, paddingBottom: 4, borderBottomWidth: 1.5, borderBottomColor: '#9CA3AF' },
  sectionTitleRight: { fontSize: 13, fontWeight: 'bold', color: '#111827', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12, paddingBottom: 4, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  normalTextLeft: { fontSize: 8.5, color: '#1F2937', lineHeight: 1.4, marginBottom: 6 },
  normalTextRight: { fontSize: 9.5, color: '#374151', lineHeight: 1.5, textAlign: 'justify' },
  timelineContainer: { borderLeftWidth: 1, borderLeftColor: '#D1D5DB', paddingLeft: 12, marginLeft: 5, marginBottom: 14 },
  itemHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 3 },
  itemTitle: { fontSize: 11, fontWeight: 'bold', color: '#111827' },
  itemSubtitle: { fontSize: 9.5, color: '#374151', fontWeight: 'bold' },
  itemDate: { fontSize: 8.5, color: '#6B7280' },
  bulletContainer: { flexDirection: 'row', marginBottom: 3 },
  bulletPoint: { width: 10, fontSize: 9, color: '#4B5563' },
  bulletText: { flex: 1, fontSize: 9, color: '#4B5563', lineHeight: 1.35 },
  timelineDot: { position: 'absolute', left: -16, top: 3, width: 7, height: 7, borderRadius: 3.5, backgroundColor: '#334155', borderWidth: 1, borderColor: '#FFFFFF' }
});

export const TimelineDarkPDFLayout: React.FC<PDFLayoutProps> = ({ data, themeColorBg }) => {
  const nonEmptyProjects = getNonEmptyProjects(data);
  const primaryBg = themeColorBg !== '#2563EB' ? themeColorBg : '#334155';

  return (
    <Page size="A4" style={tlStyles.page}>
      <View style={tlStyles.leftCol}>
        {data.personalInfo.imageUrl && (
           <Image src={data.personalInfo.imageUrl} style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 16, alignSelf: 'center', objectFit: 'cover', borderWidth: 3, borderColor: '#FFFFFF' }} />
        )}
        <Text style={tlStyles.sectionTitleLeft}>Contact</Text>
        {data.personalInfo.phone ? (
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 7 }} wrap={false}>
            <View style={pdfContactIconCell()}>
              <PdfIconPhone color={PDF_ICON_GRAY} />
            </View>
            <Text style={[tlStyles.normalTextLeft, { flex: 1, marginBottom: 0 }]}>{data.personalInfo.phone}</Text>
          </View>
        ) : null}
        {data.personalInfo.email ? (
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 7 }} wrap={false}>
            <View style={pdfContactIconCell()}>
              <PdfIconMail color={PDF_ICON_GRAY} />
            </View>
            <Text style={[tlStyles.normalTextLeft, { flex: 1, marginBottom: 0 }]}>{data.personalInfo.email}</Text>
          </View>
        ) : null}
        {data.personalInfo.location ? (
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 7 }} wrap={false}>
            <View style={pdfContactIconCell()}>
              <PdfIconMapPin color={PDF_ICON_GRAY} />
            </View>
            <Text style={[tlStyles.normalTextLeft, { flex: 1, marginBottom: 0 }]}>{data.personalInfo.location}</Text>
          </View>
        ) : null}
        {data.personalInfo.linkedin ? (
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 7 }} wrap={false}>
            <View style={pdfContactIconCell()}>
              <PdfIconLinkedInGlyph color={PDF_ICON_GRAY} />
            </View>
            <Text style={[tlStyles.normalTextLeft, { flex: 1, marginBottom: 0 }]}>{data.personalInfo.linkedin}</Text>
          </View>
        ) : null}
        {data.personalInfo.website ? (
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 7 }} wrap={false}>
            <View style={pdfContactIconCell()}>
              <PdfIconGlobe color={PDF_ICON_GRAY} />
            </View>
            <Text style={[tlStyles.normalTextLeft, { flex: 1, marginBottom: 0 }]}>{data.personalInfo.website}</Text>
          </View>
        ) : null}

        {data.skills.length > 0 && (
          <View wrap={false} style={{ marginTop: 15 }}>
            <Text style={tlStyles.sectionTitleLeft}>Skills</Text>
            {data.skills.map((skill) => (
              <View key={skill.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                <Text style={{ width: 8, fontSize: 9, color: '#1F2937' }}>•</Text>
                <Text style={{ fontSize: 9, color: '#1F2937', fontWeight: 'bold', flex: 1 }}>{skill.name}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={tlStyles.rightCol}>
        <View style={[tlStyles.headerRight, { backgroundColor: primaryBg }]}>
          <Text style={tlStyles.name}>{data.personalInfo.firstName} {data.personalInfo.lastName}</Text>
          <Text style={tlStyles.title}>{data.personalInfo.title}</Text>
        </View>

        <View style={tlStyles.bodyRight}>
          {data.summary && (
            <View wrap={false} style={{ marginBottom: 16 }}>
              <Text style={tlStyles.sectionTitleRight}>Profile</Text>
              <Text style={tlStyles.normalTextRight}>{data.summary}</Text>
            </View>
          )}

          {data.experience.length > 0 && (
            <View style={{ marginBottom: 16 }}>
              <View wrap={false}>
                <Text style={tlStyles.sectionTitleRight}>Work Experience</Text>
                <View key={data.experience[0].id} wrap={false} style={tlStyles.timelineContainer}>
                  <View style={[tlStyles.timelineDot, { backgroundColor: primaryBg }]} />
                  <View style={tlStyles.itemHeaderRow}>
                    <Text style={tlStyles.itemTitle}>{data.experience[0].company}</Text>
                    <Text style={tlStyles.itemDate}>{formatDate(data.experience[0].startDate)} - {formatDate(data.experience[0].endDate)}</Text>
                  </View>
                  <Text style={[tlStyles.itemSubtitle, { marginBottom: 4 }]}>{data.experience[0].position}</Text>
                  {data.experience[0].description.map((desc, idx) => (
                    <View key={idx} style={tlStyles.bulletContainer}>
                      <Text style={tlStyles.bulletPoint}>•</Text>
                      <Text style={tlStyles.bulletText}>{desc}</Text>
                    </View>
                  ))}
                </View>
              </View>
              {data.experience.slice(1).map((exp) => (
                <View key={exp.id} wrap={false} style={tlStyles.timelineContainer}>
                  <View style={[tlStyles.timelineDot, { backgroundColor: primaryBg }]} />
                  <View style={tlStyles.itemHeaderRow}>
                    <Text style={tlStyles.itemTitle}>{exp.company}</Text>
                    <Text style={tlStyles.itemDate}>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</Text>
                  </View>
                  <Text style={[tlStyles.itemSubtitle, { marginBottom: 4 }]}>{exp.position}</Text>
                  {exp.description.map((desc, idx) => (
                    <View key={idx} style={tlStyles.bulletContainer}>
                      <Text style={tlStyles.bulletPoint}>•</Text>
                      <Text style={tlStyles.bulletText}>{desc}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}

          {data.education.length > 0 && (
            <View style={{ marginBottom: 16 }}>
              <View wrap={false}>
                <Text style={tlStyles.sectionTitleRight}>Education</Text>
                <View key={data.education[0].id} wrap={false} style={tlStyles.timelineContainer}>
                  <View style={[tlStyles.timelineDot, { backgroundColor: primaryBg }]} />
                  <View style={tlStyles.itemHeaderRow}>
                    <Text style={tlStyles.itemTitle}>{data.education[0].degree}</Text>
                    <Text style={tlStyles.itemDate}>{formatEducationDates(data.education[0].startDate, data.education[0].endDate)}</Text>
                  </View>
                  <Text style={tlStyles.itemSubtitle}>{data.education[0].institution}</Text>
                </View>
              </View>
              {data.education.slice(1).map((edu) => (
                <View key={edu.id} wrap={false} style={tlStyles.timelineContainer}>
                  <View style={[tlStyles.timelineDot, { backgroundColor: primaryBg }]} />
                  <View style={tlStyles.itemHeaderRow}>
                    <Text style={tlStyles.itemTitle}>{edu.degree}</Text>
                    <Text style={tlStyles.itemDate}>{formatEducationDates(edu.startDate, edu.endDate)}</Text>
                  </View>
                  <Text style={tlStyles.itemSubtitle}>{edu.institution}</Text>
                </View>
              ))}
            </View>
          )}

          {nonEmptyProjects.length > 0 && (
            <View>
              <View wrap={false}>
                <Text style={tlStyles.sectionTitleRight}>Projects</Text>
                <View key={nonEmptyProjects[0].id} wrap={false} style={tlStyles.timelineContainer}>
                  <View style={[tlStyles.timelineDot, { backgroundColor: primaryBg }]} />
                  <View style={{ marginBottom: 3 }}>
                    <Text style={tlStyles.itemTitle}>{nonEmptyProjects[0].name}</Text>
                    {nonEmptyProjects[0].link ? (
                      <Text style={{ fontSize: 8.5, color: primaryBg, marginTop: 1, marginBottom: 2 }}>
                        {String(nonEmptyProjects[0].link).replace(/^https?:\/\//, '')}
                      </Text>
                    ) : null}
                  </View>
                  {nonEmptyProjects[0].description && (
                    <View style={[tlStyles.bulletContainer, { marginTop: 2 }]}>
                      <Text style={tlStyles.bulletPoint}>•</Text>
                      <Text style={tlStyles.bulletText}>{nonEmptyProjects[0].description}</Text>
                    </View>
                  )}
                  {nonEmptyProjects[0].technologies && nonEmptyProjects[0].technologies.length > 0 ? (
                    <Text style={[tlStyles.itemDate, { marginTop: 2 }]}>
                      Tech: {nonEmptyProjects[0].technologies.join(', ')}
                    </Text>
                  ) : null}
                </View>
              </View>
              {nonEmptyProjects.slice(1).map((project) => (
                <View key={project.id} wrap={false} style={tlStyles.timelineContainer}>
                  <View style={[tlStyles.timelineDot, { backgroundColor: primaryBg }]} />
                  <View style={{ marginBottom: 3 }}>
                    <Text style={tlStyles.itemTitle}>{project.name}</Text>
                    {project.link ? (
                      <Text style={{ fontSize: 8.5, color: primaryBg, marginTop: 1, marginBottom: 2 }}>
                        {String(project.link).replace(/^https?:\/\//, '')}
                      </Text>
                    ) : null}
                  </View>
                  {project.description && (
                    <View style={[tlStyles.bulletContainer, { marginTop: 2 }]}>
                      <Text style={tlStyles.bulletPoint}>•</Text>
                      <Text style={tlStyles.bulletText}>{project.description}</Text>
                    </View>
                  )}
                  {project.technologies && project.technologies.length > 0 ? (
                    <Text style={[tlStyles.itemDate, { marginTop: 2 }]}>
                      Tech: {project.technologies.join(', ')}
                    </Text>
                  ) : null}
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </Page>
  );
};

/** Map pin in gray — vector only (no Unicode) so PDF matches Lucide-style preview */
const GeometricMapPinSvg = () => (
  <Svg width={13} height={13} viewBox="0 0 24 24">
    <Path d="M12 21s-7-4.6-7-10a7 7 0 1 1 14 0c0 5.4-7 10-7 10z" fill="#4B5563" />
    <Path d="M12 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" fill="#F3F4F6" />
  </Svg>
);

/** Sidebar content inset (pt) — matches preview ~px-6; geo stays full-bleed above */
const GB_LEFT_PAD = 24;
/** Fixed pt widths avoid % rounding skew in yoga (was shifting avatar vs centered text). */
const GB_PAGE_W_PT = 595.28;
const GB_SIDEBAR_W_PT = Math.round(GB_PAGE_W_PT * 0.32);
const GB_MAIN_COL_W_PT = GB_PAGE_W_PT - GB_SIDEBAR_W_PT;
/** White ring via padding — Image+border layout box is asymmetric in some react-pdf builds */
const GB_AVATAR_INNER_PT = 100;
const GB_AVATAR_RING_PT = 6;
const GB_AVATAR_FRAME_PT = GB_AVATAR_INNER_PT + GB_AVATAR_RING_PT * 2;
/** Geo band height (matches preview). Overlap pulls the stack so avatar center meets the clip-path diagonal. */
const GB_GEO_HEIGHT_PT = 160;
const GB_GEO_OVERLAP_PT = 116;

const gbStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Inter',
    padding: 0,
    paddingTop: PDF_PAGE_V_MARGIN,
    paddingBottom: PDF_PAGE_V_MARGIN,
  },
  /** No minHeight = full A4 — that + Page wrap can hang the layout engine when content spans multiple pages. */
  bodyRow: { flexDirection: 'row', alignItems: 'stretch' },
  /** Numeric width pairs with GB_MAIN_COL_W_PT so sidebar + main = full A4 content width */
  leftCol: {
    width: GB_SIDEBAR_W_PT,
    backgroundColor: '#F5F7FA',
    paddingBottom: 28,
    alignItems: 'stretch',
    overflow: 'hidden',
  },
  /** Same horizontal inset as leftProfileStack; paddingTop ≈ gap after photo (preview pb-6 + name spacing) */
  leftColText: { width: '100%', paddingHorizontal: GB_LEFT_PAD, paddingTop: 14 },
  /**
   * Geo graphic must not layout wider than the column (was Svg 199pt in ~191pt col → flex center
   * used the wider box and clipped, shifting the avatar visually right).
   */
  geoHeaderWrap: {
    width: '100%',
    height: GB_GEO_HEIGHT_PT,
    marginBottom: -GB_GEO_OVERLAP_PT,
    overflow: 'hidden',
  },
  /** Inset photo under geo — was full column width while text had pad, so avatar looked shifted */
  leftProfileStack: {
    width: '100%',
    maxWidth: '100%',
    paddingHorizontal: GB_LEFT_PAD,
    alignItems: 'center',
    overflow: 'hidden',
  },
  /** Padding ring keeps avatar bbox symmetric (border on Image can bias centering in PDF) */
  gbAvatarFrame: {
    width: GB_AVATAR_FRAME_PT,
    height: GB_AVATAR_FRAME_PT,
    borderRadius: GB_AVATAR_FRAME_PT / 2,
    backgroundColor: '#FFFFFF',
    padding: GB_AVATAR_RING_PT,
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 22,
  },
  gbAvatarImage: {
    width: GB_AVATAR_INNER_PT,
    height: GB_AVATAR_INNER_PT,
    borderRadius: GB_AVATAR_INNER_PT / 2,
    objectFit: 'cover',
  },
  gbAvatarPlaceholderInner: {
    width: GB_AVATAR_INNER_PT,
    height: GB_AVATAR_INNER_PT,
    borderRadius: GB_AVATAR_INNER_PT / 2,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  /** Preview: p-12 pl-14 pr-16 → ~48pt top/bottom, ~42 left, ~52 right */
  rightCol: {
    width: GB_MAIN_COL_W_PT,
    backgroundColor: '#FFFFFF',
    paddingTop: 52,
    paddingBottom: 48,
    paddingLeft: 42,
    paddingRight: 52,
  },
  /** Text shrink-wraps by default — without width 100%, textAlign center does nothing vs preview */
  nameFirst: { fontSize: 22, textAlign: 'center', marginBottom: 2, width: '100%' },
  nameLast: { fontSize: 22, fontWeight: 'bold', color: '#111827', textAlign: 'center', marginBottom: 4, width: '100%' },
  /** marginBottom ≈ preview mb-8 (32px) before contact block */
  title: { fontSize: 11, color: '#6B7280', textAlign: 'center', marginBottom: 28, fontWeight: '500', width: '100%' },
  contactLine: { fontSize: 9, color: '#4B5563', marginBottom: 6, fontWeight: '500' },
  /** Section titles; vertical rhythm uses contactBlock + sideBlock margins (preview mb-8) */
  sideSectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1F2937',
    borderBottomWidth: 1,
    borderBottomColor: '#D1D5DB',
    paddingBottom: 4,
    marginBottom: 10,
    marginTop: 0,
  },
  /** Preview: Contact / About / Skills containers mb-8 */
  gbContactBlock: { marginBottom: 24 },
  gbSideBlock: { marginBottom: 24 },
  sideBody: { fontSize: 9, color: '#4B5563', lineHeight: 1.5, textAlign: 'left' },
  skillLi: { fontSize: 9, color: '#4B5563', marginBottom: 4, fontWeight: '500' },
  /** MapPin-in-gray-box row + title (preview ~text-lg) */
  sectionIconBox: {
    width: 22,
    height: 22,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  mainSectionTitle: { fontSize: 15, fontWeight: 'bold', color: '#1F2937' },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, width: '100%' },
  sectionTitleTextWrap: { flex: 1, minWidth: 0 },
  itemTitle: { fontSize: 12, fontWeight: 'bold', color: '#1F2937', paddingRight: 8 },
  itemSubtitle: { fontSize: 10, color: '#4B5563', marginTop: 3, marginBottom: 4, fontWeight: '500' },
  itemDate: { fontSize: 10, color: '#6B7280', fontWeight: '500', paddingLeft: 2 },
  bodyText: { fontSize: 10, color: '#6B7280', lineHeight: 1.5, textAlign: 'justify', marginTop: 2 },
  /** Preview: border-l-2 ml-4 pl-6 — rail + dot aligned with first line of entry text */
  timelineRail: { borderLeftWidth: 2, paddingLeft: 24, marginLeft: 10 },
  timelineDot: {
    position: 'absolute',
    left: -29.5,
    top: 5,
    width: 9,
    height: 9,
    borderRadius: 4.5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  timelineItem: { marginBottom: 22, position: 'relative' },
});

export const GeometricBluePDFLayout: React.FC<PDFLayoutProps> = ({ data, themeColorText, themeColorBg }) => {
  const nonEmptyProjects = getNonEmptyProjects(data);
  const primaryBg = themeColorBg || '#3B82F6';
  const primaryText = themeColorText || '#2563eb';
  const timelineColor = primaryText;

  const nameInitial = (data.personalInfo.firstName?.trim()?.[0] || '?').toUpperCase();

  const renderTimelineBlock = (title: string, itemNodes: React.ReactNode[]) => {
    if (itemNodes.length === 0) return null;
    const [first, ...rest] = itemNodes;
    return (
      <View style={{ marginBottom: 22, width: '100%' }}>
        <View wrap={false}>
          <View style={gbStyles.sectionTitleRow}>
            <View style={gbStyles.sectionIconBox}>
              <GeometricMapPinSvg />
            </View>
            <View style={gbStyles.sectionTitleTextWrap}>
              <Text style={gbStyles.mainSectionTitle}>{title}</Text>
            </View>
          </View>
          <View style={[gbStyles.timelineRail, { borderLeftColor: timelineColor }]}>{first}</View>
        </View>
        {rest.length > 0 ? (
          <View style={[gbStyles.timelineRail, { borderLeftColor: timelineColor }]}>{rest}</View>
        ) : null}
      </View>
    );
  };

  return (
    <Page size="A4" style={gbStyles.page} wrap>
      <View style={gbStyles.bodyRow}>
        {/* Left column — matches preview sidebar */}
        <View style={gbStyles.leftCol}>
          <View style={gbStyles.geoHeaderWrap}>
            <Svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <Polygon points="0,0 100,0 100,25 0,100" fill={primaryBg} />
            </Svg>
          </View>

          <View style={gbStyles.leftProfileStack}>
            {data.personalInfo.imageUrl ? (
              <View style={gbStyles.gbAvatarFrame}>
                <Image src={data.personalInfo.imageUrl} style={gbStyles.gbAvatarImage} />
              </View>
            ) : (
              <View style={gbStyles.gbAvatarFrame}>
                <View style={gbStyles.gbAvatarPlaceholderInner}>
                  <Text style={{ fontSize: 28, color: '#9CA3AF', fontWeight: 'bold' }}>{nameInitial}</Text>
                </View>
              </View>
            )}
          </View>

          <View style={gbStyles.leftColText}>
          <Text style={[gbStyles.nameFirst, { color: primaryText }]}>{data.personalInfo.firstName}</Text>
          <Text style={gbStyles.nameLast}>{data.personalInfo.lastName}</Text>
          <Text style={gbStyles.title}>{data.personalInfo.title}</Text>

          <View style={gbStyles.gbContactBlock}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: '#D1D5DB',
                paddingBottom: 4,
                marginBottom: 10,
                marginTop: 16,
              }}
              wrap={false}
            >
              <View style={{ marginRight: 6, paddingTop: 1 }}>
                <PdfIconPhone color={PDF_ICON_MUTED} />
              </View>
              <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#1F2937' }}>Contact</Text>
            </View>
            {data.personalInfo.phone ? (
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }} wrap={false}>
                <View style={pdfContactIconCell()}>
                  <PdfIconPhone color={PDF_ICON_MUTED} />
                </View>
                <Text style={[gbStyles.contactLine, { flex: 1, marginBottom: 6 }]}>{data.personalInfo.phone}</Text>
              </View>
            ) : null}
            {data.personalInfo.email ? (
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }} wrap={false}>
                <View style={pdfContactIconCell()}>
                  <PdfIconMail color={PDF_ICON_MUTED} />
                </View>
                <Text style={[gbStyles.contactLine, { flex: 1, marginBottom: 6 }]}>{data.personalInfo.email}</Text>
              </View>
            ) : null}
            {data.personalInfo.location ? (
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }} wrap={false}>
                <View style={pdfContactIconCell()}>
                  <PdfIconMapPin color={PDF_ICON_MUTED} />
                </View>
                <Text style={[gbStyles.contactLine, { flex: 1, marginBottom: 6 }]}>{data.personalInfo.location}</Text>
              </View>
            ) : null}
            {data.personalInfo.linkedin ? (
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }} wrap={false}>
                <View style={pdfContactIconCell()}>
                  <PdfIconLinkedInGlyph color={PDF_ICON_MUTED} />
                </View>
                <Text style={[gbStyles.contactLine, { flex: 1, marginBottom: 6 }]}>{data.personalInfo.linkedin}</Text>
              </View>
            ) : null}
            {data.personalInfo.website ? (
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }} wrap={false}>
                <View style={pdfContactIconCell()}>
                  <PdfIconGlobe color={PDF_ICON_MUTED} />
                </View>
                <Text style={[gbStyles.contactLine, { flex: 1, marginBottom: 6 }]}>{data.personalInfo.website}</Text>
              </View>
            ) : null}
          </View>

          {data.summary ? (
            <View style={gbStyles.gbSideBlock}>
              <Text style={gbStyles.sideSectionTitle}>About Me</Text>
              <Text style={gbStyles.sideBody}>{data.summary}</Text>
            </View>
          ) : null}

          {data.skills.length > 0 ? (
            <View style={gbStyles.gbSideBlock}>
              <Text style={gbStyles.sideSectionTitle}>Skills</Text>
              {data.skills.map((skill) => (
                <Text key={skill.id} style={gbStyles.skillLi}>
                  • {skill.name}
                </Text>
              ))}
            </View>
          ) : null}
          </View>
        </View>

        {/* Right column — education / experience / projects with timeline */}
        <View style={gbStyles.rightCol}>
          {data.education.length > 0
            ? renderTimelineBlock(
                'Education',
                data.education.map((edu) => (
                  <View key={edu.id} style={gbStyles.timelineItem}>
                    <View style={[gbStyles.timelineDot, { backgroundColor: primaryBg }]} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }} wrap={false}>
                      <Text style={[gbStyles.itemTitle, { flex: 1 }]}>{edu.degree}</Text>
                      <Text style={[gbStyles.itemDate, { flexShrink: 0 }]}>
                        {formatEducationDates(edu.startDate, edu.endDate)}
                      </Text>
                    </View>
                    <Text style={gbStyles.itemSubtitle}>{edu.institution}</Text>
                  </View>
                ))
              )
            : null}

          {data.experience.length > 0
            ? renderTimelineBlock(
                'Experience',
                data.experience.map((exp) => (
                  <View key={exp.id} style={gbStyles.timelineItem}>
                    <View style={[gbStyles.timelineDot, { backgroundColor: primaryBg }]} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }} wrap={false}>
                      <Text style={[gbStyles.itemTitle, { flex: 1 }]}>{exp.position}</Text>
                      <Text style={[gbStyles.itemDate, { flexShrink: 0 }]}>
                        {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                      </Text>
                    </View>
                    <Text style={gbStyles.itemSubtitle}>{exp.company}</Text>
                    {exp.description && exp.description.length > 0 ? (
                      <Text style={gbStyles.bodyText}>{exp.description.join(' ')}</Text>
                    ) : null}
                  </View>
                ))
              )
            : null}

          {nonEmptyProjects.length > 0
            ? renderTimelineBlock(
                'Projects',
                nonEmptyProjects.map((project) => (
                  <View key={project.id} style={gbStyles.timelineItem}>
                    <View style={[gbStyles.timelineDot, { backgroundColor: primaryBg }]} />
                    <Text style={gbStyles.itemTitle}>{project.name}</Text>
                    {project.link ? (
                      <Text style={{ fontSize: 8.5, color: primaryText, marginTop: 1, marginBottom: 2 }}>
                        {String(project.link).replace(/^https?:\/\//, '')}
                      </Text>
                    ) : null}
                    {project.description ? <Text style={[gbStyles.bodyText, { marginTop: 3 }]}>{project.description}</Text> : null}
                    {project.technologies && project.technologies.length > 0 ? (
                      <Text style={[gbStyles.itemDate, { marginTop: 3 }]}>Tools: {project.technologies.join(', ')}</Text>
                    ) : null}
                  </View>
                ))
              )
            : null}
        </View>
      </View>
    </Page>
  );
};

const pnhStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Inter',
    paddingTop: PDF_PAGE_V_MARGIN,
    paddingBottom: PDF_PAGE_V_MARGIN,
  },
  /** Full-bleed top on page 1; marginTop cancels Page padding so the bar still meets the top edge */
  headerCol: {
    backgroundColor: '#1E293B',
    padding: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#FFFFFF',
    marginTop: -PDF_PAGE_V_MARGIN,
  },
  headerTextCol: { flex: 1 },
  name: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 6, letterSpacing: 0.5 },
  /** Preview: text-slate-400 #94A3B8 */
  title: { fontSize: 11, color: '#94A3B8', marginBottom: 14, fontWeight: '500', letterSpacing: 0.8 },
  contactContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  contactRow: { flexDirection: 'row', alignItems: 'center', marginRight: 12, marginBottom: 4 },
  contactIconCell: { width: 14, marginRight: 4, alignItems: 'center', justifyContent: 'center', paddingTop: 1 },
  contactItem: { fontSize: 9, color: '#D1D5DB', fontWeight: '500' },
  headerImage: { width: 80, height: 80, borderRadius: 40, marginLeft: 20, borderWidth: 2, borderColor: 'rgba(148, 163, 184, 0.35)' },
  bodyRow: { flexDirection: 'row', flex: 1 },
  /** Preview: md:w-[65%] p-10 pr-8 */
  leftCol: { width: '65%', paddingTop: 40, paddingBottom: 40, paddingLeft: 40, paddingRight: 32 },
  /** Preview: white sidebar, md:w-[35%] py-10 pr-10 pl-2 */
  rightCol: { width: '35%', paddingTop: 40, paddingBottom: 40, paddingRight: 40, paddingLeft: 8, backgroundColor: '#FFFFFF' },
  /** Preview: text-gray-700 uppercase tracking-widest border-b-2 border-gray-200 */
  sectionTitleBody: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 4,
  },
  normalText: { fontSize: 10, color: '#4B5563', lineHeight: 1.55, textAlign: 'justify' },
  itemContainer: { marginBottom: 14 },
  itemTitle: { fontSize: 11, fontWeight: '600', color: '#1F2937', marginBottom: 3 },
  itemSubtitle: { fontSize: 10, color: '#1E293B', fontWeight: 'bold' },
  itemDate: { fontSize: 9, color: '#6B7280', fontWeight: '500' },
  bulletPoint: { width: 10, fontSize: 10, color: '#1E293B' },
  bulletText: { flex: 1, fontSize: 9, color: '#4B5563', lineHeight: 1.45, textAlign: 'justify' },
  bulletContainer: { flexDirection: 'row', marginBottom: 3 },
  /** Preview: bg-gray-100, border-b-2 border-gray-300, font-bold text-gray-800 */
  skillItem: {
    backgroundColor: '#F3F4F6',
    borderBottomWidth: 2,
    borderBottomColor: '#D1D5DB',
    color: '#1F2937',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 2,
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 6,
    marginRight: 6,
    alignSelf: 'flex-start',
  },
});

export const ProfessionalNavyHeaderPDFLayout: React.FC<PDFLayoutProps> = ({ data, themeColorText, themeColorBg }) => {
  const nonEmptyProjects = getNonEmptyProjects(data);
  const primaryBg = themeColorBg && themeColorBg !== '#2563EB' ? themeColorBg : '#1E293B';
  const accentText = themeColorText && themeColorText !== '#2563EB' ? themeColorText : '#1E293B';

  const renderContactRow = (icon: React.ReactNode, text: string) => (
    <View style={pnhStyles.contactRow} wrap={false}>
      <View style={pnhStyles.contactIconCell}>{icon}</View>
      <Text style={pnhStyles.contactItem}>{text}</Text>
    </View>
  );

  const formatDateRange = (start: string, end: string) =>
    `${formatDate(start)} - ${formatDate(end)}`;

  return (
    <Page size="A4" style={pnhStyles.page}>
      <View style={[pnhStyles.headerCol, { backgroundColor: primaryBg }]}>
        <View style={pnhStyles.headerTextCol}>
          <Text style={pnhStyles.name}>
            {data.personalInfo.firstName} {data.personalInfo.lastName}
          </Text>
          <Text style={pnhStyles.title}>{data.personalInfo.title}</Text>
          <View style={pnhStyles.contactContainer}>
            {data.personalInfo.email ? renderContactRow(<PdfIconMail color={PDF_ICON_ON_DARK} />, data.personalInfo.email) : null}
            {data.personalInfo.linkedin ? renderContactRow(<PdfIconLinkedInGlyph color={PDF_ICON_ON_DARK} />, data.personalInfo.linkedin) : null}
            {data.personalInfo.location ? renderContactRow(<PdfIconMapPin color={PDF_ICON_ON_DARK} />, data.personalInfo.location) : null}
            {data.personalInfo.phone ? renderContactRow(<PdfIconPhone color={PDF_ICON_ON_DARK} />, data.personalInfo.phone) : null}
            {data.personalInfo.website ? renderContactRow(<PdfIconGlobe color={PDF_ICON_ON_DARK} />, data.personalInfo.website) : null}
          </View>
        </View>
        {data.personalInfo.imageUrl ? <Image src={data.personalInfo.imageUrl} style={pnhStyles.headerImage} /> : null}
      </View>

      <View style={pnhStyles.bodyRow}>
        <View style={pnhStyles.leftCol}>
          {data.summary ? (
            <View wrap={false} style={{ marginBottom: 18 }}>
              <Text style={pnhStyles.sectionTitleBody}>Summary</Text>
              <Text style={pnhStyles.normalText}>{data.summary}</Text>
            </View>
          ) : null}

          {data.experience.length > 0 ? (
            <View>
              <View wrap={false}>
                <Text style={pnhStyles.sectionTitleBody}>Experience</Text>
                <View key={data.experience[0].id} wrap={false} style={pnhStyles.itemContainer}>
                  <Text style={pnhStyles.itemTitle}>{data.experience[0].position}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: 6,
                    }}
                    wrap={false}
                  >
                    <Text style={[pnhStyles.itemSubtitle, { color: accentText, flex: 1, paddingRight: 8 }]}>{data.experience[0].company}</Text>
                    <Text style={pnhStyles.itemDate}>{formatDateRange(data.experience[0].startDate, data.experience[0].endDate)}</Text>
                  </View>
                  {data.experience[0].description.map((desc, idx) => (
                    <View key={idx} style={pnhStyles.bulletContainer} wrap={false}>
                      <Text style={[pnhStyles.bulletPoint, { color: accentText }]}>•</Text>
                      <Text style={pnhStyles.bulletText}>{desc}</Text>
                    </View>
                  ))}
                </View>
              </View>
              {data.experience.slice(1).map((exp) => (
                <View key={exp.id} wrap={false} style={pnhStyles.itemContainer}>
                  <Text style={pnhStyles.itemTitle}>{exp.position}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: 6,
                    }}
                    wrap={false}
                  >
                    <Text style={[pnhStyles.itemSubtitle, { color: accentText, flex: 1, paddingRight: 8 }]}>{exp.company}</Text>
                    <Text style={pnhStyles.itemDate}>{formatDateRange(exp.startDate, exp.endDate)}</Text>
                  </View>
                  {exp.description.map((desc, idx) => (
                    <View key={idx} style={pnhStyles.bulletContainer} wrap={false}>
                      <Text style={[pnhStyles.bulletPoint, { color: accentText }]}>•</Text>
                      <Text style={pnhStyles.bulletText}>{desc}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          ) : null}

          {data.education.length > 0 ? (
            <View wrap={false} style={{ marginTop: 12 }}>
              <Text style={pnhStyles.sectionTitleBody}>Education</Text>
              {data.education.map((edu) => (
                <View key={edu.id} style={pnhStyles.itemContainer} wrap={false}>
                  <Text style={pnhStyles.itemTitle}>{edu.degree}</Text>
                  <View
                    style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 2 }}
                    wrap={false}
                  >
                    <Text style={[pnhStyles.itemSubtitle, { color: accentText, flex: 1, paddingRight: 8 }]}>{edu.institution}</Text>
                    <Text style={pnhStyles.itemDate}>{formatEducationDates(edu.startDate, edu.endDate)}</Text>
                  </View>
                </View>
              ))}
            </View>
          ) : null}
        </View>

        <View style={pnhStyles.rightCol}>
          {nonEmptyProjects.length > 0 ? (
            <View>
              <View wrap={false}>
                <Text style={pnhStyles.sectionTitleBody}>Strengths</Text>
                <View key={nonEmptyProjects[0].id} wrap={false} style={[pnhStyles.itemContainer, { flexDirection: 'row' }]}>
                  <Text style={{ color: accentText, fontSize: 11, marginRight: 8, marginTop: 1 }}>★</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={pnhStyles.itemTitle}>{nonEmptyProjects[0].name}</Text>
                    {nonEmptyProjects[0].description ? (
                      <Text style={[pnhStyles.normalText, { marginTop: 2, fontSize: 9 }]}>{nonEmptyProjects[0].description}</Text>
                    ) : null}
                  </View>
                </View>
              </View>
              {nonEmptyProjects.slice(1).map((project) => (
                <View key={project.id} wrap={false} style={[pnhStyles.itemContainer, { flexDirection: 'row' }]}>
                  <Text style={{ color: accentText, fontSize: 11, marginRight: 8, marginTop: 1 }}>★</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={pnhStyles.itemTitle}>{project.name}</Text>
                    {project.description ? (
                      <Text style={[pnhStyles.normalText, { marginTop: 2, fontSize: 9 }]}>{project.description}</Text>
                    ) : null}
                  </View>
                </View>
              ))}
            </View>
          ) : null}

          {data.skills.length > 0 ? (
            <View wrap={false} style={{ marginTop: nonEmptyProjects.length > 0 ? 18 : 0 }}>
              <Text style={pnhStyles.sectionTitleBody}>Skills</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {data.skills.map((skill) => (
                  <Text key={skill.id} style={pnhStyles.skillItem}>
                    {skill.name}
                  </Text>
                ))}
              </View>
            </View>
          ) : null}
        </View>
      </View>
    </Page>
  );
};

const cbaStyles = StyleSheet.create({
  page: { flexDirection: 'column', backgroundColor: '#FFFFFF', padding: 36, fontFamily: 'Inter' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 },
  headerMain: { flex: 1, paddingRight: 16 },
  name: { fontSize: 32, fontWeight: 'bold', color: '#111827', textTransform: 'uppercase', marginBottom: 6 },
  title: { fontSize: 14, fontWeight: 'bold', marginBottom: 12 },
  contactRow: { fontSize: 9, color: '#374151', fontWeight: 'bold', marginBottom: 4 },
  headerImage: { width: 100, height: 100, borderRadius: 50, objectFit: 'cover' },
  bodyRow: { flexDirection: 'row', flexGrow: 1 },
  col: { width: '50%', paddingRight: 14 },
  colRight: { width: '50%', paddingLeft: 14 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#111827', textTransform: 'uppercase', marginBottom: 12, paddingBottom: 4, borderBottomWidth: 3, borderBottomColor: '#000000' },
  normalText: { fontSize: 10, color: '#374151', lineHeight: 1.5, textAlign: 'justify', marginBottom: 16 },
  itemContainer: { marginBottom: 18 },
  itemTitle: { fontSize: 12, fontWeight: 'bold', color: '#1F2937', marginBottom: 4 },
  itemMetaRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  company: { fontSize: 10, fontWeight: 'bold' },
  itemDate: { fontSize: 9, color: '#6B7280' },
  bulletContainer: { flexDirection: 'row', marginBottom: 3 },
  bulletPoint: { width: 10, fontSize: 9, color: '#374151' },
  bulletText: { flex: 1, fontSize: 9, color: '#374151', lineHeight: 1.45, textAlign: 'justify' },
  customItemRow: { flexDirection: 'row', marginBottom: 12, gap: 8 },
  customBullet: { fontSize: 10, marginTop: 2 },
  skillGridItem: { fontSize: 10, fontWeight: 'bold', color: '#1F2937', borderBottomWidth: 1, borderBottomColor: '#D1D5DB', paddingBottom: 4, marginBottom: 10, width: '48%' },
  skillGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
});

export const CleanBlueAccentPDFLayout: React.FC<PDFLayoutProps> = ({ data, themeColorText }) => {
  const nonEmptyProjects = getNonEmptyProjects(data);
  const primaryText = themeColorText !== '#2563EB' ? themeColorText : '#2563EB';

  return (
    <Page size="A4" style={cbaStyles.page}>
      <View style={cbaStyles.headerRow}>
        <View style={cbaStyles.headerMain}>
          <Text style={cbaStyles.name}>
            {data.personalInfo.firstName} {data.personalInfo.lastName}
          </Text>
          <Text style={[cbaStyles.title, { color: primaryText }]}>{data.personalInfo.title}</Text>
          {data.personalInfo.phone ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }} wrap={false}>
              <View style={{ width: 14, marginRight: 6, paddingTop: 1 }}>
                <PdfIconPhone color={primaryText} />
              </View>
              <Text style={[cbaStyles.contactRow, { marginBottom: 0 }]}>{data.personalInfo.phone}</Text>
            </View>
          ) : null}
          {data.personalInfo.email ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }} wrap={false}>
              <View style={{ width: 14, marginRight: 6, paddingTop: 1 }}>
                <PdfIconMail color={primaryText} />
              </View>
              <Text style={[cbaStyles.contactRow, { marginBottom: 0 }]}>{data.personalInfo.email}</Text>
            </View>
          ) : null}
          {data.personalInfo.linkedin ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }} wrap={false}>
              <View style={{ width: 14, marginRight: 6, paddingTop: 1 }}>
                <PdfIconLinkedInGlyph color={primaryText} />
              </View>
              <Text style={[cbaStyles.contactRow, { marginBottom: 0 }]}>{data.personalInfo.linkedin}</Text>
            </View>
          ) : null}
          {data.personalInfo.location ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }} wrap={false}>
              <View style={{ width: 14, marginRight: 6, paddingTop: 1 }}>
                <PdfIconMapPin color={primaryText} />
              </View>
              <Text style={[cbaStyles.contactRow, { marginBottom: 0 }]}>{data.personalInfo.location}</Text>
            </View>
          ) : null}
          {data.personalInfo.website ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }} wrap={false}>
              <View style={{ width: 14, marginRight: 6, paddingTop: 1 }}>
                <PdfIconGlobe color={primaryText} />
              </View>
              <Text style={[cbaStyles.contactRow, { marginBottom: 0 }]}>{data.personalInfo.website}</Text>
            </View>
          ) : null}
        </View>
        {data.personalInfo.imageUrl ? (
          <Image src={data.personalInfo.imageUrl} style={cbaStyles.headerImage} />
        ) : null}
      </View>

      <View style={cbaStyles.bodyRow}>
        <View style={cbaStyles.col}>
          {data.summary ? (
            <View wrap={false}>
              <Text style={cbaStyles.sectionTitle}>Summary</Text>
              <Text style={cbaStyles.normalText}>{data.summary}</Text>
            </View>
          ) : null}

          {data.experience.length > 0 ? (
            <View>
              <View wrap={false}>
                <Text style={cbaStyles.sectionTitle}>Experience</Text>
                <View key={data.experience[0].id} wrap={false} style={cbaStyles.itemContainer}>
                  <Text style={cbaStyles.itemTitle}>{data.experience[0].position}</Text>
                  <View style={cbaStyles.itemMetaRow}>
                    <Text style={[cbaStyles.company, { color: primaryText }]}>{data.experience[0].company}</Text>
                    <Text style={cbaStyles.itemDate}>
                      {formatDate(data.experience[0].startDate)} - {formatDate(data.experience[0].endDate)}
                    </Text>
                  </View>
                  {data.experience[0].description.map((desc, idx) => (
                    <View key={idx} style={cbaStyles.bulletContainer}>
                      <Text style={cbaStyles.bulletPoint}>•</Text>
                      <Text style={cbaStyles.bulletText}>{desc}</Text>
                    </View>
                  ))}
                </View>
              </View>
              {data.experience.slice(1).map((exp) => (
                <View key={exp.id} wrap={false} style={cbaStyles.itemContainer}>
                  <Text style={cbaStyles.itemTitle}>{exp.position}</Text>
                  <View style={cbaStyles.itemMetaRow}>
                    <Text style={[cbaStyles.company, { color: primaryText }]}>{exp.company}</Text>
                    <Text style={cbaStyles.itemDate}>
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </Text>
                  </View>
                  {exp.description.map((desc, idx) => (
                    <View key={idx} style={cbaStyles.bulletContainer}>
                      <Text style={cbaStyles.bulletPoint}>•</Text>
                      <Text style={cbaStyles.bulletText}>{desc}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          ) : null}

          {data.education.length > 0 ? (
            <View wrap={false}>
              <Text style={cbaStyles.sectionTitle}>Education</Text>
              {data.education.map((edu) => (
                <View key={edu.id} style={cbaStyles.itemContainer}>
                  <Text style={cbaStyles.itemTitle}>{edu.degree}</Text>
                  <View style={cbaStyles.itemMetaRow}>
                    <Text style={[cbaStyles.company, { color: primaryText }]}>{edu.institution}</Text>
                    <Text style={cbaStyles.itemDate}>
                      {formatEducationDates(edu.startDate, edu.endDate)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ) : null}
        </View>

        <View style={cbaStyles.colRight}>
          {nonEmptyProjects.length > 0 ? (
            <View style={{ marginBottom: 16 }}>
              <View wrap={false}>
                <Text style={cbaStyles.sectionTitle}>Projects</Text>
                <View key={nonEmptyProjects[0].id} style={cbaStyles.itemContainer}>
                  <Text style={cbaStyles.itemTitle}>{nonEmptyProjects[0].name}</Text>
                  {nonEmptyProjects[0].link ? (
                    <Text style={{ fontSize: 8.5, color: primaryText, marginTop: 1, marginBottom: 3 }}>
                      {String(nonEmptyProjects[0].link).replace(/^https?:\/\//, '')}
                    </Text>
                  ) : null}
                  {nonEmptyProjects[0].description ? (
                    <Text style={[cbaStyles.normalText, { marginBottom: 6 }]}>{nonEmptyProjects[0].description}</Text>
                  ) : null}
                  {nonEmptyProjects[0].technologies && nonEmptyProjects[0].technologies.length > 0 ? (
                    <Text style={{ fontSize: 8, color: '#6B7280', fontWeight: 'bold' }}>
                      Tech: {nonEmptyProjects[0].technologies.join(', ')}
                    </Text>
                  ) : null}
                </View>
              </View>
              {nonEmptyProjects.slice(1).map((project) => (
                <View key={project.id} style={cbaStyles.itemContainer}>
                  <Text style={cbaStyles.itemTitle}>{project.name}</Text>
                  {project.link ? (
                    <Text style={{ fontSize: 8.5, color: primaryText, marginTop: 1, marginBottom: 3 }}>
                      {String(project.link).replace(/^https?:\/\//, '')}
                    </Text>
                  ) : null}
                  {project.description ? (
                    <Text style={[cbaStyles.normalText, { marginBottom: 6 }]}>{project.description}</Text>
                  ) : null}
                  {project.technologies && project.technologies.length > 0 ? (
                    <Text style={{ fontSize: 8, color: '#6B7280', fontWeight: 'bold' }}>
                      Tech: {project.technologies.join(', ')}
                    </Text>
                  ) : null}
                </View>
              ))}
            </View>
          ) : null}

          {data.customSections?.map(
            (section) =>
              section.items.length > 0 && (
                <View key={section.id} wrap={false} style={{ marginBottom: 16 }}>
                  <Text style={cbaStyles.sectionTitle}>{section.title}</Text>
                  {section.items.map((item) => (
                    <View key={item.id} style={cbaStyles.customItemRow}>
                      <Text style={[cbaStyles.customBullet, { color: primaryText }]}>★</Text>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#111827', marginBottom: 2 }}>{item.name}</Text>
                        {item.description ? (
                          <Text style={{ fontSize: 9, color: '#374151', lineHeight: 1.45, textAlign: 'justify' }}>{item.description}</Text>
                        ) : null}
                      </View>
                    </View>
                  ))}
                </View>
              )
          )}

          {data.skills.length > 0 ? (
            <View wrap={false}>
              <Text style={cbaStyles.sectionTitle}>Skills</Text>
              <View style={cbaStyles.skillGrid}>
                {data.skills.map((skill) => (
                  <Text key={skill.id} style={cbaStyles.skillGridItem}>
                    {skill.name}
                  </Text>
                ))}
              </View>
            </View>
          ) : null}
        </View>
      </View>
    </Page>
  );
};

const classicStyles = StyleSheet.create({
  page: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Times-Roman',
    flexDirection: 'column',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#4B5563',
    paddingBottom: 6,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    color: '#111827',
    borderBottomWidth: 1,
    borderBottomColor: '#D1D5DB',
    paddingBottom: 1,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 10.5,
    fontFamily: 'Helvetica',
    color: '#4B5563',
    marginTop: 2,
    letterSpacing: 0.8,
  },
  contactColumn: {
    alignItems: 'flex-end',
    fontSize: 8.5,
    fontFamily: 'Helvetica',
    color: '#4B5563',
    gap: 2,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  contactText: {
    fontSize: 8.5,
  },
  contactIconCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#1F2937',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Centered Summary Title
  summaryHeaderContainer: {
    alignItems: 'center',
    marginBottom: 4,
  },
  summaryTitleWrapper: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#4B5563',
    paddingVertical: 1.5,
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  summaryTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  summaryBulletContainer: {
    flexDirection: 'row',
    marginBottom: 2,
    paddingHorizontal: 10,
  },
  summaryBullet: {
    width: 8,
    fontSize: 9,
  },
  summaryBulletText: {
    flex: 1,
    fontSize: 9,
    color: '#1F2937',
    lineHeight: 1.25,
  },
  
  // Columns
  columnsContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#D1D5DB',
    paddingTop: 10,
  },
  leftColumn: {
    width: '38%',
    paddingRight: 8,
    borderRightWidth: 1,
    borderRightColor: '#9CA3AF',
  },
  rightColumn: {
    width: '62%',
    paddingLeft: 8,
  },
  
  // Section Headers
  sectionTitleWrapper: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#4B5563',
    paddingVertical: 1.5,
    paddingHorizontal: 5,
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1.0,
  },
  
  // Left Column Details
  eduItem: {
    marginBottom: 6,
  },
  eduInst: {
    fontSize: 9.5,
    fontWeight: 'bold',
    fontFamily: 'Times-Bold',
    color: '#111827',
  },
  eduMeta: {
    fontSize: 8.5,
    color: '#4B5563',
    marginTop: 1,
  },
  leftBulletContainer: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  leftBulletText: {
    flex: 1,
    fontSize: 9,
    color: '#1F2937',
  },
  
  // Right Column Details
  expItem: {
    marginBottom: 10,
  },
  expTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'Times-Bold',
    color: '#111827',
  },
  expMeta: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Oblique',
    color: '#4B5563',
    marginTop: 1,
    marginBottom: 2,
  },
  rightBulletContainer: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  rightBulletText: {
    flex: 1,
    fontSize: 9,
    color: '#1F2937',
    lineHeight: 1.25,
  },
  
  // Projects
  projectItem: {
    marginBottom: 8,
  },
  projectGrid: {
    flexDirection: 'row',
    marginBottom: 1,
  },
  projectKey: {
    width: 80,
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    color: '#4B5563',
  },
  projectVal: {
    flex: 1,
    fontSize: 8.5,
    fontFamily: 'Helvetica',
    color: '#111827',
  },
  projectDesc: {
    fontSize: 9,
    color: '#1F2937',
    lineHeight: 1.25,
    marginTop: 2,
  },
  projectRoleRow: {
    flexDirection: 'row',
    fontSize: 8.5,
    fontFamily: 'Helvetica',
    color: '#374151',
    marginBottom: 1,
  },
  projectRoleKey: {
    width: 120,
    fontFamily: 'Helvetica-Bold',
    color: '#4B5563',
  },
  projectRoleVal: {
    flex: 1,
  }
});

export const ClassicSplitPDFLayout: React.FC<PDFLayoutProps> = ({ data }) => {
  const nonEmptyProjects = getNonEmptyProjects(data);

  const certificationsSection = data.customSections?.find(s => s.title.toLowerCase().includes('certif'));
  const languagesSection = data.customSections?.find(s => s.title.toLowerCase().includes('lang'));
  const hobbiesSection = data.customSections?.find(s => s.title.toLowerCase().includes('hobb'));
  const otherCustomSections = data.customSections?.filter(s => 
    s !== certificationsSection && s !== languagesSection && s !== hobbiesSection
  ) || [];

  return (
    <Page size="A4" style={classicStyles.page} wrap>
      {/* Header */}
      <View style={classicStyles.headerContainer} wrap={false}>
        <View style={{ flex: 1 }}>
          <Text style={classicStyles.name}>
            {data.personalInfo.firstName} {data.personalInfo.lastName}
          </Text>
          <Text style={classicStyles.title}>
            {data.personalInfo.title}
          </Text>
        </View>
        
        {/* Contact details */}
        <View style={classicStyles.contactColumn}>
          {data.personalInfo.phone ? (
            <View style={classicStyles.contactRow}>
              <Text style={classicStyles.contactText}>{data.personalInfo.phone}</Text>
              <View style={classicStyles.contactIconCircle}>
                <PdfIconPhone color="#FFFFFF" />
              </View>
            </View>
          ) : null}
          {data.personalInfo.email ? (
            <View style={classicStyles.contactRow}>
              <Text style={classicStyles.contactText}>{data.personalInfo.email}</Text>
              <View style={classicStyles.contactIconCircle}>
                <PdfIconMail color="#FFFFFF" />
              </View>
            </View>
          ) : null}
          {data.personalInfo.location ? (
            <View style={classicStyles.contactRow}>
              <Text style={classicStyles.contactText}>{data.personalInfo.location}</Text>
              <View style={classicStyles.contactIconCircle}>
                <PdfIconMapPin color="#FFFFFF" />
              </View>
            </View>
          ) : null}
          {data.personalInfo.linkedin ? (
            <View style={classicStyles.contactRow}>
              <Text style={classicStyles.contactText}>{data.personalInfo.linkedin}</Text>
              <View style={classicStyles.contactIconCircle}>
                <PdfIconLinkedInGlyph color="#FFFFFF" />
              </View>
            </View>
          ) : null}
          {data.personalInfo.website ? (
            <View style={classicStyles.contactRow}>
              <Text style={classicStyles.contactText}>{data.personalInfo.website}</Text>
              <View style={classicStyles.contactIconCircle}>
                <PdfIconGlobe color="#FFFFFF" />
              </View>
            </View>
          ) : null}
        </View>
      </View>

      {/* Summary Section */}
      {data.summary ? (
        <View style={{ marginBottom: 10 }} wrap={false}>
          <View style={classicStyles.summaryHeaderContainer}>
            <View style={classicStyles.summaryTitleWrapper}>
              <Text style={classicStyles.summaryTitle}>Summary</Text>
            </View>
          </View>
          <View>
            {data.summary.split('\n').map((line, index) => {
              const trimmed = line.trim();
              if (!trimmed) return null;
              const content = trimmed.startsWith('•') ? trimmed.substring(1).trim() : trimmed;
              return (
                <View key={index} style={classicStyles.summaryBulletContainer}>
                  <Text style={classicStyles.summaryBullet}>•</Text>
                  <Text style={classicStyles.summaryBulletText}>{content}</Text>
                </View>
              );
            })}
          </View>
        </View>
      ) : null}

      {/* Two Column Layout split by vertical line */}
      <View style={classicStyles.columnsContainer}>
        {/* Left Column (38%) */}
        <View style={classicStyles.leftColumn}>
          {/* Education */}
          {data.education.length > 0 ? (
            <View style={{ marginBottom: 8 }} wrap={false}>
              <View style={classicStyles.sectionTitleWrapper}>
                <Text style={classicStyles.sectionTitle}>Education</Text>
              </View>
              {data.education.map((edu) => (
                <View key={edu.id} style={classicStyles.eduItem}>
                  <Text style={classicStyles.eduInst}>{edu.institution}</Text>
                  <Text style={classicStyles.eduMeta}>
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ''}{formatEducationDates(edu.startDate, edu.endDate) ? ` (${formatEducationDates(edu.startDate, edu.endDate)})` : ''}
                  </Text>
                </View>
              ))}
            </View>
          ) : null}

          {/* Skills */}
          {data.skills.length > 0 ? (
            <View style={{ marginBottom: 8 }} wrap={false}>
              <View style={classicStyles.sectionTitleWrapper}>
                <Text style={classicStyles.sectionTitle}>Skills</Text>
              </View>
              {data.skills.map((skill) => (
                <View key={skill.id} style={classicStyles.leftBulletContainer}>
                  <Text style={{ width: 8, fontSize: 9.0 }}>•</Text>
                  <Text style={classicStyles.leftBulletText}>{skill.name}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {/* Certifications */}
          {certificationsSection && certificationsSection.items.length > 0 ? (
            <View style={{ marginBottom: 8 }} wrap={false}>
              <View style={classicStyles.sectionTitleWrapper}>
                <Text style={classicStyles.sectionTitle}>{certificationsSection.title}</Text>
              </View>
              {certificationsSection.items.map((item) => (
                <View key={item.id} style={classicStyles.leftBulletContainer}>
                  <Text style={{ width: 8, fontSize: 9.0 }}>•</Text>
                  <Text style={classicStyles.leftBulletText}>
                    {item.name}{item.description ? ` - ${item.description}` : ''}
                  </Text>
                </View>
              ))}
            </View>
          ) : null}

          {/* Languages */}
          {languagesSection && languagesSection.items.length > 0 ? (
            <View style={{ marginBottom: 8 }} wrap={false}>
              <View style={classicStyles.sectionTitleWrapper}>
                <Text style={classicStyles.sectionTitle}>{languagesSection.title}</Text>
              </View>
              {languagesSection.items.map((item) => (
                <View key={item.id} style={classicStyles.leftBulletContainer}>
                  <Text style={{ width: 8, fontSize: 9.0 }}>•</Text>
                  <Text style={classicStyles.leftBulletText}>{item.name}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {/* Hobbies */}
          {hobbiesSection && hobbiesSection.items.length > 0 ? (
            <View style={{ marginBottom: 8 }} wrap={false}>
              <View style={classicStyles.sectionTitleWrapper}>
                <Text style={classicStyles.sectionTitle}>{hobbiesSection.title}</Text>
              </View>
              {hobbiesSection.items.map((item) => (
                <View key={item.id} style={classicStyles.leftBulletContainer}>
                  <Text style={{ width: 8, fontSize: 9.0 }}>•</Text>
                  <Text style={classicStyles.leftBulletText}>{item.name}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {/* Other Custom Sections */}
          {otherCustomSections.map((section) => (
            <View key={section.id} style={{ marginBottom: 8 }} wrap={false}>
              <View style={classicStyles.sectionTitleWrapper}>
                <Text style={classicStyles.sectionTitle}>{section.title}</Text>
              </View>
              {section.items.map((item) => (
                <View key={item.id} style={{ marginBottom: 4 }}>
                  <Text style={{ fontSize: 9.5, fontWeight: 'bold', fontFamily: 'Times-Bold' }}>{item.name}</Text>
                  {item.date ? <Text style={{ fontSize: 7.5, color: '#4B5563', marginBottom: 1 }}>{item.date}</Text> : null}
                  {item.description ? <Text style={{ fontSize: 9.0, color: '#1F2937' }}>{item.description}</Text> : null}
                </View>
              ))}
            </View>
          ))}
        </View>



        {/* Right Column (62%) */}
        <View style={classicStyles.rightColumn}>
          {/* Professional Experience */}
          {data.experience.length > 0 ? (
            <View style={{ marginBottom: 8 }}>
              <View style={classicStyles.sectionTitleWrapper} wrap={false}>
                <Text style={classicStyles.sectionTitle}>Professional Experience</Text>
              </View>
              {data.experience.map((exp) => {
                const hasCompanyOrLocation = exp.company.trim() || (exp.location && exp.location.trim());
                const hasDates = exp.startDate.trim() || exp.endDate.trim();
                
                // If everything is completely empty, let's not render it
                if (!exp.position.trim() && !hasCompanyOrLocation && !hasDates && (!exp.description || exp.description.length === 0)) {
                  return null;
                }

                return (
                  <View key={exp.id} style={classicStyles.expItem} wrap={false}>
                    {exp.position.trim() ? (
                      <Text style={classicStyles.expTitle}>{exp.position}</Text>
                    ) : (
                      <Text style={[classicStyles.expTitle, { color: '#9CA3AF', fontFamily: 'Times-Italic' }]}>Position</Text>
                    )}
                    
                    {(hasCompanyOrLocation || hasDates) && (
                      <Text style={classicStyles.expMeta}>
                        {hasCompanyOrLocation && (
                          <Text>{exp.company}{exp.location ? `, ${exp.location}` : ''}</Text>
                        )}
                        {hasCompanyOrLocation && hasDates && <Text>  |  </Text>}
                        {hasDates && (
                          <Text>
                            {exp.startDate.trim() || 'Present'} - {exp.endDate.trim() || 'Present'}
                          </Text>
                        )}
                      </Text>
                    )}
                    
                    {exp.description.map((bullet, idx) => (
                      <View key={idx} style={classicStyles.rightBulletContainer}>
                        <Text style={{ width: 8, fontSize: 9.0 }}>•</Text>
                        <Text style={classicStyles.rightBulletText}>{bullet}</Text>
                      </View>
                    ))}
                  </View>
                );
              })}
            </View>
          ) : null}

          {/* Projects */}
          {nonEmptyProjects.length > 0 ? (
            <View style={{ marginBottom: 8 }}>
              <View style={classicStyles.sectionTitleWrapper} wrap={false}>
                <Text style={classicStyles.sectionTitle}>Projects</Text>
              </View>
              {nonEmptyProjects.map((project) => (
                <View key={project.id} style={classicStyles.projectItem} wrap={false}>
                  <View style={classicStyles.projectGrid}>
                    <Text style={classicStyles.projectKey}>Title</Text>
                    <Text style={classicStyles.projectVal}>: {project.name}</Text>
                  </View>
                  {project.technologies.length > 0 ? (
                    <View style={classicStyles.projectGrid}>
                      <Text style={classicStyles.projectKey}>Technologies</Text>
                      <Text style={classicStyles.projectVal}>: {project.technologies.join(', ')}</Text>
                    </View>
                  ) : null}
                  {project.link ? (
                    <View style={classicStyles.projectGrid}>
                      <Text style={classicStyles.projectKey}>Link</Text>
                      <Text style={[classicStyles.projectVal, { color: '#2563EB', textDecoration: 'underline' }]}>: {project.link}</Text>
                    </View>
                  ) : null}
                  
                  {project.description ? (
                    <View style={{ marginTop: 2 }}>
                      {project.description.split('\n').map((line, lineIdx) => {
                        const trimmed = line.trim();
                        if (!trimmed) return <View key={lineIdx} style={{ height: 2 }} />;
                        const match = trimmed.match(/^([^:]+):(.*)$/);
                        if (match && match[1].length < 20 && !trimmed.toLowerCase().startsWith('http')) {
                          return (
                            <View key={lineIdx} style={classicStyles.projectRoleRow}>
                              <Text style={classicStyles.projectRoleKey}>{match[1].trim()}</Text>
                              <Text style={classicStyles.projectRoleVal}>: {match[2].trim()}</Text>
                            </View>
                          );
                        }
                        return (
                          <Text key={lineIdx} style={classicStyles.projectDesc}>
                            {trimmed}
                          </Text>
                        );
                      })}
                    </View>
                  ) : null}
                </View>
              ))}
            </View>
          ) : null}
        </View>
      </View>
    </Page>
  );
};

export const DeveloperPortfolioPDFLayout: React.FC<PDFLayoutProps> = ({ data, themeColorText, themeColorBg, themeColorBorder }) => {
  const nonEmptyProjects = getNonEmptyProjects(data);

  // Group skills by category if available
  const skillCategories = React.useMemo(() => {
    const categories: Record<string, string[]> = {};
    data.skills.forEach((skill) => {
      const cat = skill.category?.trim() || 'Core Technologies';
      if (!categories[cat]) {
        categories[cat] = [];
      }
      categories[cat].push(skill.name);
    });
    return categories;
  }, [data.skills]);

  const styles = StyleSheet.create({
    page: {
      paddingHorizontal: 36,
      paddingVertical: PDF_PAGE_V_MARGIN,
      fontFamily: 'Helvetica',
      fontSize: 8.5,
      color: '#0f172a',
      backgroundColor: '#ffffff'
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      borderBottomWidth: 1.5,
      borderBottomColor: '#0f172a',
      paddingBottom: 8,
      marginBottom: 8
    },
    headerLeft: {
      flex: 1,
      paddingRight: 12
    },
    name: {
      fontFamily: 'Times-Bold',
      fontSize: 20,
      color: '#0f172a',
      lineHeight: 1.1
    },
    titleBadge: {
      fontFamily: 'Helvetica-Bold',
      fontSize: 8.0,
      color: themeColorText,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      marginTop: 3
    },
    headerRight: {
      width: '46%',
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    contactCell: {
      width: '50%',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 3
    },
    contactText: {
      fontSize: 7.5,
      color: '#475569',
      marginLeft: 4
    },
    section: {
      marginBottom: 7
    },
    sectionTitle: {
      fontFamily: 'Times-Bold',
      fontSize: 9.0,
      color: '#0f172a',
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      borderBottomWidth: 0.75,
      borderBottomColor: '#cbd5e1',
      paddingBottom: 2,
      marginBottom: 4
    },
    summaryText: {
      fontSize: 8.0,
      color: '#334155',
      lineHeight: 1.35
    },
    skillsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    skillRow: {
      width: '50%',
      flexDirection: 'row',
      paddingRight: 8,
      marginBottom: 2.5
    },
    skillCategoryLabel: {
      fontFamily: 'Helvetica-Bold',
      fontSize: 7.8,
      color: '#0f172a'
    },
    skillValues: {
      fontSize: 7.8,
      color: '#334155',
      flex: 1
    },
    expItem: {
      marginBottom: 5
    },
    expHeaderRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 1.5
    },
    expPosition: {
      fontFamily: 'Helvetica-Bold',
      fontSize: 8.5,
      color: '#0f172a'
    },
    expCompany: {
      fontFamily: 'Helvetica-Bold',
      fontSize: 8.2,
      color: themeColorText
    },
    expDate: {
      fontFamily: 'Helvetica',
      fontSize: 7.5,
      color: '#64748b'
    },
    bulletRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginTop: 1,
      paddingLeft: 4
    },
    bulletDot: {
      width: 8,
      fontSize: 8,
      color: '#64748b'
    },
    bulletText: {
      flex: 1,
      fontSize: 7.8,
      color: '#334155',
      lineHeight: 1.3
    },
    projectCard: {
      backgroundColor: '#f8fafc',
      borderWidth: 0.75,
      borderColor: '#e2e8f0',
      borderRadius: 4,
      padding: 5,
      marginBottom: 3.5
    },
    projectHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 1.5
    },
    projectName: {
      fontFamily: 'Helvetica-Bold',
      fontSize: 8.2,
      color: '#0f172a'
    },
    projectTech: {
      fontFamily: 'Helvetica-Bold',
      fontSize: 7.2,
      color: themeColorText
    },
    projectLink: {
      fontSize: 7.0,
      color: '#64748b',
      marginBottom: 1
    },
    projectDesc: {
      fontSize: 7.6,
      color: '#334155',
      lineHeight: 1.28
    },
    eduItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 3
    },
    eduDegree: {
      fontFamily: 'Helvetica-Bold',
      fontSize: 8.2,
      color: '#0f172a'
    },
    eduSchool: {
      fontFamily: 'Helvetica',
      fontSize: 7.8,
      color: '#475569'
    },
    gridRow: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    gridCard: {
      flex: 1,
      backgroundColor: '#f8fafc',
      borderWidth: 0.75,
      borderColor: '#e2e8f0',
      borderRadius: 3,
      padding: 3.5,
      marginHorizontal: 2,
      alignItems: 'center'
    },
    gridCardTitle: {
      fontFamily: 'Helvetica-Bold',
      fontSize: 7.8,
      color: '#0f172a',
      textAlign: 'center'
    },
    gridCardDesc: {
      fontSize: 6.8,
      color: '#64748b',
      textAlign: 'center',
      marginTop: 1
    }
  });

  return (
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header} wrap={false}>
        <View style={styles.headerLeft}>
          <Text style={styles.name}>{data.personalInfo.firstName} {data.personalInfo.lastName}</Text>
          {data.personalInfo.title ? (
            <Text style={styles.titleBadge}>{data.personalInfo.title}</Text>
          ) : null}
        </View>

        <View style={styles.headerRight}>
          {data.personalInfo.email ? (
            <View style={styles.contactCell}>
              <PdfIconMail color={themeColorText} />
              <Text style={styles.contactText}>{data.personalInfo.email}</Text>
            </View>
          ) : null}
          {data.personalInfo.website ? (
            <View style={styles.contactCell}>
              <PdfIconGlobe color={themeColorText} />
              <Text style={styles.contactText}>{data.personalInfo.website.replace(/^https?:\/\//, '')}</Text>
            </View>
          ) : null}
          {data.personalInfo.phone ? (
            <View style={styles.contactCell}>
              <PdfIconPhone color={themeColorText} />
              <Text style={styles.contactText}>{data.personalInfo.phone}</Text>
            </View>
          ) : null}
          {data.personalInfo.linkedin ? (
            <View style={styles.contactCell}>
              <PdfIconLinkedInGlyph color={themeColorText} />
              <Text style={styles.contactText}>{data.personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</Text>
            </View>
          ) : null}
          {data.personalInfo.location ? (
            <View style={styles.contactCell}>
              <PdfIconMapPin color={themeColorText} />
              <Text style={styles.contactText}>{data.personalInfo.location}</Text>
            </View>
          ) : null}
        </View>
      </View>

      {/* Professional Summary */}
      {data.summary ? (
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
          <Text style={styles.summaryText}>{data.summary}</Text>
        </View>
      ) : null}

      {/* Technical Skills */}
      {data.skills.length > 0 ? (
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>TECHNICAL SKILLS</Text>
          <View style={styles.skillsGrid}>
            {Object.entries(skillCategories).map(([catName, skillNames]) => (
              <View key={catName} style={styles.skillRow}>
                <Text style={styles.skillCategoryLabel}>{catName}: </Text>
                <Text style={styles.skillValues}>{skillNames.join(', ')}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : null}

      {/* Work Experience */}
      {data.experience.length > 0 ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle} wrap={false}>WORK EXPERIENCE</Text>
          {data.experience.map((exp) => (
            <View key={exp.id} style={styles.expItem} wrap={false}>
              <View style={styles.expHeaderRow}>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', flex: 1, paddingRight: 8 }}>
                  <Text style={styles.expPosition}>{exp.position}</Text>
                  {exp.company ? (
                    <Text style={styles.expCompany}> — {exp.company}</Text>
                  ) : null}
                </View>
                {(exp.startDate || exp.endDate) ? (
                  <Text style={styles.expDate}>
                    {exp.startDate || 'Present'} – {exp.current ? 'Present' : (exp.endDate || 'Present')}
                  </Text>
                ) : null}
              </View>
              {exp.description && exp.description.length > 0 ? (
                exp.description.map((bullet, idx) => (
                  <View key={idx} style={styles.bulletRow}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.bulletText}>{bullet}</Text>
                  </View>
                ))
              ) : null}
            </View>
          ))}
        </View>
      ) : null}

      {/* Selected Technical Projects */}
      {nonEmptyProjects.length > 0 ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle} wrap={false}>TECHNICAL PROJECTS</Text>
          {nonEmptyProjects.map((project) => (
            <View key={project.id} style={styles.projectCard} wrap={false}>
              <View style={styles.projectHeader}>
                <Text style={styles.projectName}>{project.name}</Text>
                {project.technologies.length > 0 ? (
                  <Text style={styles.projectTech}>{project.technologies.join(' · ')}</Text>
                ) : null}
              </View>
              {project.link ? (
                <Text style={styles.projectLink}>{project.link.replace(/^https?:\/\//, '')}</Text>
              ) : null}
              {project.description ? (
                project.description.includes('\n') ? (
                  project.description.split('\n').filter(l => l.trim()).map((line, lIdx) => (
                    <View key={lIdx} style={styles.bulletRow}>
                      <Text style={styles.bulletDot}>•</Text>
                      <Text style={styles.bulletText}>{line.trim()}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.projectDesc}>{project.description}</Text>
                )
              ) : null}
            </View>
          ))}
        </View>
      ) : null}

      {/* Education */}
      {data.education.length > 0 ? (
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>EDUCATION</Text>
          {data.education.map((edu) => (
            <View key={edu.id} style={styles.eduItem}>
              <View>
                <Text style={styles.eduDegree}>{edu.degree}</Text>
                <Text style={styles.eduSchool}>
                  {edu.institution}
                  {edu.field && edu.field !== edu.degree ? ` — ${edu.field}` : ''}
                  {edu.gpa ? ` (GPA: ${edu.gpa})` : ''}
                </Text>
              </View>
              {(edu.startDate || edu.endDate) ? (
                <Text style={styles.expDate}>{formatEducationDates(edu.startDate, edu.endDate)}</Text>
              ) : null}
            </View>
          ))}
        </View>
      ) : null}

      {/* Custom Sections / Key Strengths */}
      {data.customSections && data.customSections.length > 0 ? (
        data.customSections.map((section) => (
          <View key={section.id} style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.gridRow}>
              {section.items.map((item) => (
                <View key={item.id} style={styles.gridCard}>
                  <Text style={styles.gridCardTitle}>{item.name}</Text>
                  {item.description ? (
                    <Text style={styles.gridCardDesc}>{item.description}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          </View>
        ))
      ) : null}
    </Page>
  );
};

