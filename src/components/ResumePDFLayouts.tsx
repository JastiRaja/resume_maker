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
const PDF_ICON_GRAY = '#6B7280';
const PDF_ICON_MUTED = '#9CA3AF';
const PDF_ICON_ON_DARK = '#D1D5DB';
const PDF_ICON_ON_THEME = 'rgba(255,255,255,0.88)';

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
  <Text style={{ fontSize: 8, fontWeight: 'bold', color, width: 10, textAlign: 'center' }}>in</Text>
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
                <Text style={stdStyles.itemDate}>{formatDate(data.education[0].endDate)}</Text>
              </View>
            )}
          </View>
          
          {data.education.slice(1).map((edu) => (
            <View wrap={false} key={edu.id} style={[stdStyles.itemContainer, { flexDirection: 'row', justifyContent: 'space-between' }]}>
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
          <View wrap={false}>
            <Text style={stdStyles.sectionTitle}>Projects</Text>
            {nonEmptyProjects.length > 0 && (
              <View style={stdStyles.itemHeader}>
                <Text style={stdStyles.itemTitle}>{nonEmptyProjects[0].name}</Text>
                {nonEmptyProjects[0].link ? <Text style={{ fontSize: 9, color: themeColorText, textDecoration: 'none' }}>{nonEmptyProjects[0].link as string}</Text> : null}
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
        {data.personalInfo.email ? (
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 }} wrap={false}>
            <View style={pdfContactIconCell()}>
              <PdfIconMail color={PDF_ICON_ON_THEME} />
            </View>
            <Text style={[colStyles.contactItemLeft, { flex: 1, marginBottom: 0 }]}>{data.personalInfo.email}</Text>
          </View>
        ) : null}
        {data.personalInfo.phone ? (
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 }} wrap={false}>
            <View style={pdfContactIconCell()}>
              <PdfIconPhone color={PDF_ICON_ON_THEME} />
            </View>
            <Text style={[colStyles.contactItemLeft, { flex: 1, marginBottom: 0 }]}>{data.personalInfo.phone}</Text>
          </View>
        ) : null}
        {data.personalInfo.location ? (
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 }} wrap={false}>
            <View style={pdfContactIconCell()}>
              <PdfIconMapPin color={PDF_ICON_ON_THEME} />
            </View>
            <Text style={[colStyles.contactItemLeft, { flex: 1, marginBottom: 0 }]}>{data.personalInfo.location}</Text>
          </View>
        ) : null}
        {data.personalInfo.linkedin ? (
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 }} wrap={false}>
            <View style={pdfContactIconCell()}>
              <PdfIconLinkedInGlyph color={PDF_ICON_ON_THEME} />
            </View>
            <Text style={[colStyles.contactItemLeft, { flex: 1, marginBottom: 0 }]}>{data.personalInfo.linkedin}</Text>
          </View>
        ) : null}
        {data.personalInfo.website ? (
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 }} wrap={false}>
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
              <View key={skill.id} style={{ marginBottom: 8 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                  <Text style={{ fontSize: 10, color: '#FFFFFF' }}>{skill.name}</Text>
                </View>
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
          <View wrap={false}>
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

        {/* Custom Sections (Moved to left sidebar) */}
        {data.customSections?.map((section) => section.items.length > 0 && (
          <View key={section.id} wrap={false} style={{ marginBottom: 10 }}>
            <Text style={colStyles.sectionTitleLeft}>{section.title}</Text>
            {section.items.map((item) => (
              <View key={item.id} style={{ marginBottom: 8 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                  <Text style={{ fontSize: 10, color: '#FFFFFF', fontWeight: 'bold' }}>{item.name}</Text>
                </View>
                {item.date && (
                  <Text style={{ fontSize: 8, color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>{item.date}</Text>
                )}
                {item.description && (
                  <Text style={{ fontSize: 9, color: 'rgba(255,255,255,0.8)', lineHeight: 1.3 }}>{item.description}</Text>
                )}
              </View>
            ))}
          </View>
        ))}
      </View>

      <View style={colStyles.rightCol}>
        <Text style={colStyles.name}>{data.personalInfo.firstName} {data.personalInfo.lastName}</Text>
        <Text style={[colStyles.title, { color: themeColorText }]}>{data.personalInfo.title}</Text>

        {data.summary && (
          <View wrap={false}>
            <Text style={[colStyles.sectionTitleRight, { borderBottomColor: themeColorBg }]}>Profile</Text>
            <Text style={colStyles.summaryTextRight}>{data.summary}</Text>
          </View>
        )}

        {data.experience.length > 0 && (
          <View>
            <View wrap={false}>
              <Text style={[colStyles.sectionTitleRight, { borderBottomColor: themeColorBg }]}>Experience</Text>
              {data.experience.length > 0 && (
                <View style={colStyles.expHeaderRight}>
                  <View>
                    <Text style={colStyles.expTitleRight}>{data.experience[0].position}</Text>
                    <Text style={[colStyles.expCompanyRight, { color: themeColorText }]}>{data.experience[0].company}</Text>
                  </View>
                  <View style={{ backgroundColor: '#F3F4F6', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 3 }}>
                    <Text style={{ fontSize: 9, color: '#4B5563', fontWeight: 'bold' }}>{formatDate(data.experience[0].startDate)} - {formatDate(data.experience[0].endDate)}</Text>
                  </View>
                </View>
              )}
              {data.experience.length > 0 && (
                <View style={{ marginBottom: 12 }}>
                  {data.experience[0].description.map((desc, idx) => (
                    <View key={idx} style={colStyles.bulletContainerRight}>
                      <Text style={[colStyles.bulletPointRight, { color: themeColorText }]}>•</Text>
                      <Text style={colStyles.bulletTextRight}>{desc}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>

            {data.experience.slice(1).map((exp) => (
              <View key={exp.id} wrap={false} style={colStyles.expItemRight}>
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
            <View wrap={false}>
              <Text style={[colStyles.sectionTitleRight, { borderBottomColor: themeColorBg }]}>Projects</Text>
              {nonEmptyProjects.length > 0 && (
                <View style={colStyles.expHeaderRight}>
                  <Text style={colStyles.expTitleRight}>{nonEmptyProjects[0].name}</Text>
                  {nonEmptyProjects[0].link ? <Text style={{ fontSize: 9, color: themeColorText }}>{nonEmptyProjects[0].link as string}</Text> : null}
                </View>
              )}
              {nonEmptyProjects.length > 0 && (
                <View style={{ marginBottom: 12 }}>
                  {nonEmptyProjects[0].description && <Text style={colStyles.projectDescRight}>{nonEmptyProjects[0].description}</Text>}
                  {nonEmptyProjects[0].technologies && nonEmptyProjects[0].technologies.length > 0 && (
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 4 }}>
                      {nonEmptyProjects[0].technologies.map((tech, idx) => (
                        <Text key={idx} style={{ fontSize: 8, color: '#6B7280', backgroundColor: '#F3F4F6', paddingVertical: 2, paddingHorizontal: 4, borderRadius: 2 }}>{tech}</Text>
                      ))}
                    </View>
                  )}
                </View>
              )}
            </View>

            {nonEmptyProjects.slice(1).map((project) => (
              <View key={project.id} wrap={false} style={colStyles.expItemRight}>
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
                  <Text style={cntStyles.itemDate}>{formatDate(data.education[0].endDate)}</Text>
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
                <Text style={cntStyles.itemDate}>{formatDate(edu.endDate)}</Text>
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
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                <Text style={cntStyles.itemTitle}>{nonEmptyProjects[0].name}</Text>
                {nonEmptyProjects[0].link ? <Text style={{ fontSize: 9, color: themeColorText }}>{nonEmptyProjects[0].link as string}</Text> : null}
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
  leftCol: { width: '35%', paddingRight: 20, borderRightWidth: 4, borderLeftWidth: 8, paddingLeft: 15 },
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

export const YellowSidebarPDFLayout: React.FC<PDFLayoutProps> = ({ data, themeColorBg }) => {
  const nonEmptyProjects = getNonEmptyProjects(data);
  const primaryBg = themeColorBg !== '#2563EB' ? themeColorBg : '#FECE2F';

  return (
    <Page size="A4" style={ysStyles.page}>
      <View style={[ysStyles.leftCol, { borderRightColor: primaryBg, borderLeftColor: primaryBg }]}>
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
                <Text style={ysStyles.eduDateLeft}>{formatDate(edu.endDate)}</Text>
                <Text style={ysStyles.eduDegreeLeft}>{edu.degree}</Text>
                <Text style={ysStyles.eduInstLeft}>{edu.institution}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={ysStyles.rightCol}>
        <View style={{ marginBottom: 20 }}>
          <Text style={ysStyles.name}>{data.personalInfo.firstName}   {data.personalInfo.lastName}</Text>
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
                <View style={ysStyles.expHeaderRight}>
                  <Text style={ysStyles.expTitleRight}>{nonEmptyProjects[0].name}</Text>
                  {nonEmptyProjects[0].link ? <Text style={{ fontSize: 9, color: primaryBg }}>{nonEmptyProjects[0].link as string}</Text> : null}
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
                <View style={ysStyles.expHeaderRight}>
                  <Text style={ysStyles.expTitleRight}>{project.name}</Text>
                  {project.link ? <Text style={{ fontSize: 9, color: primaryBg }}>{project.link as string}</Text> : null}
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
        <Text style={nsStyles.name}>{data.personalInfo.firstName} {data.personalInfo.lastName}</Text>
        <Text style={nsStyles.title}>{data.personalInfo.title}</Text>

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
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
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
                  <Text style={[nsStyles.itemSubtitle, { color: primaryText, marginTop: 2 }]}>{nonEmptyProjects[0].link as string}</Text>
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
                  <Text style={[nsStyles.itemSubtitle, { color: primaryText, marginTop: 2 }]}>{project.link as string}</Text>
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
  page: { flexDirection: 'column', backgroundColor: '#FFFFFF', padding: 40, fontFamily: 'Inter' },
  header: { alignItems: 'center', marginBottom: 25 },
  name: { fontSize: 28, fontWeight: 'bold', color: '#7F1D1D', marginBottom: 4, fontFamily: 'Inter' },
  title: { fontSize: 13, color: '#4B5563', letterSpacing: 1, textTransform: 'uppercase' },
  contactInfo: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginTop: 10 },
  contactItem: { fontSize: 9, color: '#6B7280', textTransform: 'uppercase' },
  bodyRow: { flexDirection: 'row' },
  leftCol: { width: '70%', paddingRight: 25, borderRightWidth: 1, borderRightColor: '#E5E7EB' },
  rightCol: { width: '30%', paddingLeft: 25 },
  sectionTitle: { fontSize: 13, fontWeight: 'bold', color: '#111827', textTransform: 'uppercase', marginBottom: 15, letterSpacing: 1 },
  summaryText: { fontSize: 10, color: '#374151', lineHeight: 1.6, textAlign: 'justify', marginBottom: 20 },
  itemContainer: { marginBottom: 15 },
  itemHeader: { marginBottom: 4 },
  itemTitle: { fontSize: 11, fontWeight: 'bold', color: '#111827' },
  itemSubtitle: { fontSize: 10, color: '#4B5563', marginTop: 2 },
  itemDate: { fontSize: 9, color: '#6B7280', marginTop: 2 },
  bulletContainer: { flexDirection: 'row', marginBottom: 4 },
  bulletPoint: { width: 10, fontSize: 10, color: '#111827' },
  bulletText: { flex: 1, fontSize: 10, color: '#374151', lineHeight: 1.5, textAlign: 'justify' },
  skillItem: { fontSize: 10, color: '#374151', marginBottom: 8, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' }
});

export const FormalRedPDFLayout: React.FC<PDFLayoutProps> = ({ data, themeColorText }) => {
  const nonEmptyProjects = getNonEmptyProjects(data);
  const primaryColor = themeColorText !== '#2563EB' ? themeColorText : '#7F1D1D';

  return (
    <Page size="A4" style={frStyles.page}>
      <View style={frStyles.header}>
        <Text style={[frStyles.name, { color: primaryColor }]}>
          {(data.personalInfo.firstName || '')} {(data.personalInfo.lastName || '')}
        </Text>
        {data.personalInfo.title && <Text style={frStyles.title}>{data.personalInfo.title}</Text>}
        <View style={frStyles.contactInfo}>
          {data.personalInfo.location ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }} wrap={false}>
              <PdfIconMapPin color="#6B7280" />
              <Text style={[frStyles.contactItem, { marginLeft: 4 }]}>{data.personalInfo.location}</Text>
            </View>
          ) : null}
          {data.personalInfo.location &&
          (data.personalInfo.email || data.personalInfo.phone || data.personalInfo.linkedin || data.personalInfo.website) ? (
            <Text style={frStyles.contactItem}> | </Text>
          ) : null}
          {data.personalInfo.email ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }} wrap={false}>
              <PdfIconMail color="#6B7280" />
              <Text style={[frStyles.contactItem, { marginLeft: 4 }]}>{data.personalInfo.email}</Text>
            </View>
          ) : null}
          {data.personalInfo.email &&
          (data.personalInfo.phone || data.personalInfo.linkedin || data.personalInfo.website) ? (
            <Text style={frStyles.contactItem}> | </Text>
          ) : null}
          {data.personalInfo.phone ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }} wrap={false}>
              <PdfIconPhone color="#6B7280" />
              <Text style={[frStyles.contactItem, { marginLeft: 4 }]}>{data.personalInfo.phone}</Text>
            </View>
          ) : null}
          {data.personalInfo.phone && (data.personalInfo.linkedin || data.personalInfo.website) ? (
            <Text style={frStyles.contactItem}> | </Text>
          ) : null}
          {data.personalInfo.linkedin ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }} wrap={false}>
              <PdfIconLinkedInGlyph color="#6B7280" />
              <Text style={[frStyles.contactItem, { marginLeft: 4 }]}>{data.personalInfo.linkedin}</Text>
            </View>
          ) : null}
          {data.personalInfo.linkedin && data.personalInfo.website ? <Text style={frStyles.contactItem}> | </Text> : null}
          {data.personalInfo.website ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }} wrap={false}>
              <PdfIconGlobe color="#6B7280" />
              <Text style={[frStyles.contactItem, { marginLeft: 4 }]}>{data.personalInfo.website}</Text>
            </View>
          ) : null}
        </View>
      </View>

      <View style={frStyles.bodyRow}>
        <View style={frStyles.leftCol}>
          {data.summary && (
            <View wrap={false}>
              <Text style={frStyles.sectionTitle}>Profile</Text>
              <Text style={frStyles.summaryText}>{data.summary}</Text>
            </View>
          )}

          {data.experience.length > 0 && (
            <View>
              <View wrap={false}>
                <Text style={frStyles.sectionTitle}>Employment History</Text>
                <View key={data.experience[0].id} wrap={false} style={frStyles.itemContainer}>
                  <View style={frStyles.itemHeader}>
                    <Text style={frStyles.itemTitle}>{data.experience[0].position || 'Position'}, {(data.experience[0].company || 'Company')}</Text>
                    <Text style={frStyles.itemDate}>{formatDate(data.experience[0].startDate)} - {formatDate(data.experience[0].endDate)}</Text>
                  </View>
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
                  <View style={frStyles.itemHeader}>
                    <Text style={frStyles.itemTitle}>{exp.position || 'Position'}, {(exp.company || 'Company')}</Text>
                    <Text style={frStyles.itemDate}>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</Text>
                  </View>
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
            <View wrap={false} style={{ marginTop: 10 }}>
              <Text style={frStyles.sectionTitle}>Education</Text>
              {data.education.map((edu) => (
                <View key={edu.id} style={frStyles.itemContainer}>
                  <Text style={frStyles.itemTitle}>{(edu.institution || '')}, {edu.degree || ''}</Text>
                  <Text style={frStyles.itemDate}>{formatDate(edu.endDate)}</Text>
                </View>
              ))}
            </View>
          )}

          {nonEmptyProjects.length > 0 && (
            <View style={{ marginTop: 10 }}>
              <View wrap={false}>
                <Text style={frStyles.sectionTitle}>Projects</Text>
                <View key={nonEmptyProjects[0].id} wrap={false} style={frStyles.itemContainer}>
                  <View style={frStyles.itemHeader}>
                    <Text style={frStyles.itemTitle}>{nonEmptyProjects[0].name || 'Project'}</Text>
                    {nonEmptyProjects[0].link ? <Text style={frStyles.itemDate}>{nonEmptyProjects[0].link as string}</Text> : null}
                  </View>
                  {nonEmptyProjects[0].description && (
                    <View style={frStyles.bulletContainer}>
                      <Text style={frStyles.bulletPoint}>•</Text>
                      <Text style={frStyles.bulletText}>{nonEmptyProjects[0].description}</Text>
                    </View>
                  )}
                </View>
              </View>
              {nonEmptyProjects.slice(1).map((project) => (
                <View key={project.id} wrap={false} style={frStyles.itemContainer}>
                  <View style={frStyles.itemHeader}>
                    <Text style={frStyles.itemTitle}>{project.name || 'Project'}</Text>
                    {project.link ? <Text style={frStyles.itemDate}>{project.link as string}</Text> : null}
                  </View>
                  {project.description && (
                    <View style={frStyles.bulletContainer}>
                      <Text style={frStyles.bulletPoint}>•</Text>
                      <Text style={frStyles.bulletText}>{project.description}</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={frStyles.rightCol}>
          {data.skills.length > 0 && (
            <View wrap={false}>
              <Text style={frStyles.sectionTitle}>Skills</Text>
              {data.skills.map((skill) => (
                 <Text key={skill.id} style={frStyles.skillItem}>{skill.name || 'Skill'}</Text>
              ))}
            </View>
          )}
        </View>
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
  leftCol: { width: '35%', padding: 25, backgroundColor: '#F3F4F6' },
  rightCol: { width: '65%', backgroundColor: '#FFFFFF' },
  headerRight: { padding: 30, backgroundColor: '#334155', justifyContent: 'center' },
  name: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 5 },
  title: { fontSize: 14, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 1 },
  bodyRight: { padding: 30 },
  sectionTitleLeft: { fontSize: 12, fontWeight: 'bold', color: '#111827', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12, paddingBottom: 5, borderBottomWidth: 1, borderBottomColor: '#D1D5DB' },
  sectionTitleRight: { fontSize: 14, fontWeight: 'bold', color: '#111827', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 15, paddingBottom: 5, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  normalTextLeft: { fontSize: 9, color: '#4B5563', lineHeight: 1.5, marginBottom: 8 },
  normalTextRight: { fontSize: 10, color: '#4B5563', lineHeight: 1.5, textAlign: 'justify' },
  timelineContainer: { borderLeftWidth: 1, borderLeftColor: '#E5E7EB', paddingLeft: 12, marginLeft: 5, marginBottom: 15 },
  itemHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 },
  itemTitle: { fontSize: 12, fontWeight: 'bold', color: '#111827' },
  itemSubtitle: { fontSize: 10, color: '#4B5563', fontWeight: 'bold' },
  itemDate: { fontSize: 9, color: '#6B7280' },
  bulletContainer: { flexDirection: 'row', marginBottom: 3 },
  bulletPoint: { width: 10, fontSize: 10, color: '#4B5563' },
  bulletText: { flex: 1, fontSize: 10, color: '#4B5563', lineHeight: 1.4 },
  timelineDot: { position: 'absolute', left: -16, top: 4, width: 7, height: 7, borderRadius: 3.5, backgroundColor: '#334155', borderWidth: 1, borderColor: '#FFFFFF' }
});

export const TimelineDarkPDFLayout: React.FC<PDFLayoutProps> = ({ data, themeColorBg }) => {
  const nonEmptyProjects = getNonEmptyProjects(data);
  const primaryBg = themeColorBg !== '#2563EB' ? themeColorBg : '#334155';

  return (
    <Page size="A4" style={tlStyles.page}>
      <View style={tlStyles.leftCol}>
        {data.personalInfo.imageUrl && (
           <Image src={data.personalInfo.imageUrl} style={{ width: 90, height: 90, borderRadius: 45, marginBottom: 20, alignSelf: 'center', objectFit: 'cover' }} />
        )}
        <Text style={tlStyles.sectionTitleLeft}>Contact</Text>
        {data.personalInfo.phone ? (
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 }} wrap={false}>
            <View style={pdfContactIconCell()}>
              <PdfIconPhone color={PDF_ICON_GRAY} />
            </View>
            <Text style={[tlStyles.normalTextLeft, { flex: 1, marginBottom: 0 }]}>{data.personalInfo.phone}</Text>
          </View>
        ) : null}
        {data.personalInfo.email ? (
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 }} wrap={false}>
            <View style={pdfContactIconCell()}>
              <PdfIconMail color={PDF_ICON_GRAY} />
            </View>
            <Text style={[tlStyles.normalTextLeft, { flex: 1, marginBottom: 0 }]}>{data.personalInfo.email}</Text>
          </View>
        ) : null}
        {data.personalInfo.location ? (
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 }} wrap={false}>
            <View style={pdfContactIconCell()}>
              <PdfIconMapPin color={PDF_ICON_GRAY} />
            </View>
            <Text style={[tlStyles.normalTextLeft, { flex: 1, marginBottom: 0 }]}>{data.personalInfo.location}</Text>
          </View>
        ) : null}
        {data.personalInfo.linkedin ? (
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 }} wrap={false}>
            <View style={pdfContactIconCell()}>
              <PdfIconLinkedInGlyph color={PDF_ICON_GRAY} />
            </View>
            <Text style={[tlStyles.normalTextLeft, { flex: 1, marginBottom: 0 }]}>{data.personalInfo.linkedin}</Text>
          </View>
        ) : null}
        {data.personalInfo.website ? (
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 }} wrap={false}>
            <View style={pdfContactIconCell()}>
              <PdfIconGlobe color={PDF_ICON_GRAY} />
            </View>
            <Text style={[tlStyles.normalTextLeft, { flex: 1, marginBottom: 0 }]}>{data.personalInfo.website}</Text>
          </View>
        ) : null}

        {data.skills.length > 0 && (
          <View wrap={false} style={{ marginTop: 20 }}>
            <Text style={tlStyles.sectionTitleLeft}>Skills</Text>
            {data.skills.map((skill) => (
              <View key={skill.id} style={{ marginBottom: 6 }}>
                <Text style={{ fontSize: 9, color: '#111827', fontWeight: 'bold' }}>{skill.name}</Text>
                {skill.level && <Text style={{ fontSize: 8, color: '#6B7280' }}>{skill.level}</Text>}
              </View>
            ))}
          </View>
        )}

        {data.education.length > 0 && (
          <View wrap={false} style={{ marginTop: 20 }}>
            <Text style={tlStyles.sectionTitleLeft}>Education</Text>
            {data.education.map((edu) => (
              <View key={edu.id} style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 9, color: '#111827', fontWeight: 'bold' }}>{edu.degree}</Text>
                <Text style={{ fontSize: 8, color: '#4B5563', marginTop: 2 }}>{edu.institution}</Text>
                <Text style={{ fontSize: 8, color: '#6B7280', marginTop: 2 }}>
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </Text>
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
            <View wrap={false} style={{ marginBottom: 20 }}>
              <Text style={tlStyles.sectionTitleRight}>Profile</Text>
              <Text style={tlStyles.normalTextRight}>{data.summary}</Text>
            </View>
          )}

          {data.experience.length > 0 && (
            <View>
              <View wrap={false}>
                <Text style={tlStyles.sectionTitleRight}>Work Experience</Text>
                <View key={data.experience[0].id} wrap={false} style={tlStyles.timelineContainer}>
                  <View style={[tlStyles.timelineDot, { backgroundColor: primaryBg }]} />
                  <View style={tlStyles.itemHeaderRow}>
                    <Text style={tlStyles.itemTitle}>{data.experience[0].company}</Text>
                    <Text style={tlStyles.itemDate}>{formatDate(data.experience[0].startDate)} - {formatDate(data.experience[0].endDate)}</Text>
                  </View>
                  <Text style={[tlStyles.itemSubtitle, { marginBottom: 6 }]}>{data.experience[0].position}</Text>
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
                  <Text style={[tlStyles.itemSubtitle, { marginBottom: 6 }]}>{exp.position}</Text>
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

          {nonEmptyProjects.length > 0 && (
            <View>
              <View wrap={false}>
                <Text style={tlStyles.sectionTitleRight}>Projects</Text>
                <View key={nonEmptyProjects[0].id} wrap={false} style={tlStyles.timelineContainer}>
                  <View style={[tlStyles.timelineDot, { backgroundColor: primaryBg }]} />
                  <View style={tlStyles.itemHeaderRow}>
                    <Text style={tlStyles.itemTitle}>{nonEmptyProjects[0].name}</Text>
                    {nonEmptyProjects[0].link ? <Text style={tlStyles.itemDate}>{nonEmptyProjects[0].link as string}</Text> : null}
                  </View>
                  {nonEmptyProjects[0].description && (
                    <View style={[tlStyles.bulletContainer, { marginTop: 4 }]}>
                      <Text style={tlStyles.bulletPoint}>•</Text>
                      <Text style={tlStyles.bulletText}>{nonEmptyProjects[0].description}</Text>
                    </View>
                  )}
                  {nonEmptyProjects[0].technologies && nonEmptyProjects[0].technologies.length > 0 ? (
                    <Text style={[tlStyles.itemDate, { marginTop: 4 }]}>
                      Tech: {nonEmptyProjects[0].technologies.join(', ')}
                    </Text>
                  ) : null}
                </View>
              </View>
              {nonEmptyProjects.slice(1).map((project) => (
                <View key={project.id} wrap={false} style={tlStyles.timelineContainer}>
                  <View style={[tlStyles.timelineDot, { backgroundColor: primaryBg }]} />
                  <View style={tlStyles.itemHeaderRow}>
                    <Text style={tlStyles.itemTitle}>{project.name}</Text>
                    {project.link ? <Text style={tlStyles.itemDate}>{project.link as string}</Text> : null}
                  </View>
                  {project.description && (
                    <View style={[tlStyles.bulletContainer, { marginTop: 4 }]}>
                      <Text style={tlStyles.bulletPoint}>•</Text>
                      <Text style={tlStyles.bulletText}>{project.description}</Text>
                    </View>
                  )}
                  {project.technologies && project.technologies.length > 0 ? (
                    <Text style={[tlStyles.itemDate, { marginTop: 4 }]}>
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
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
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
                    <Text style={pnhStyles.itemDate}>{formatDateRange(edu.startDate, edu.endDate)}</Text>
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
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
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
                  {nonEmptyProjects[0].description ? (
                    <Text style={[cbaStyles.normalText, { marginBottom: 6 }]}>{nonEmptyProjects[0].description}</Text>
                  ) : null}
                  {(nonEmptyProjects[0].technologies && nonEmptyProjects[0].technologies.length > 0) ? (
                    <Text style={{ fontSize: 8, color: '#6B7280', fontWeight: 'bold' }}>
                      Links/Tech: {nonEmptyProjects[0].link ? String(nonEmptyProjects[0].link) : nonEmptyProjects[0].technologies.join(', ')}
                    </Text>
                  ) : nonEmptyProjects[0].link ? (
                    <Text style={{ fontSize: 8, color: '#6B7280' }}>{String(nonEmptyProjects[0].link)}</Text>
                  ) : null}
                </View>
              </View>
              {nonEmptyProjects.slice(1).map((project) => (
                <View key={project.id} style={cbaStyles.itemContainer}>
                  <Text style={cbaStyles.itemTitle}>{project.name}</Text>
                  {project.description ? (
                    <Text style={[cbaStyles.normalText, { marginBottom: 6 }]}>{project.description}</Text>
                  ) : null}
                  {(project.technologies && project.technologies.length > 0) ? (
                    <Text style={{ fontSize: 8, color: '#6B7280', fontWeight: 'bold' }}>
                      Links/Tech: {project.link ? String(project.link) : project.technologies.join(', ')}
                    </Text>
                  ) : project.link ? (
                    <Text style={{ fontSize: 8, color: '#6B7280' }}>{String(project.link)}</Text>
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
