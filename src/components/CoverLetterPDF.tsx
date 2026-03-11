import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { CoverLetterData } from '../types/coverLetter';

// Register standard fonts
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff' }, // Regular
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hjp-Ek-_EeA.woff', fontWeight: 700 } // Bold
  ]
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 50,
    fontFamily: 'Inter',
  },
  senderSection: {
    marginBottom: 30,
  },
  senderName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  senderInfo: {
    fontSize: 10,
    color: '#4B5563',
    lineHeight: 1.4,
  },
  dateSection: {
    marginBottom: 20,
    fontSize: 11,
    color: '#111827',
  },
  recipientSection: {
    marginBottom: 25,
  },
  recipientName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
  },
  recipientInfo: {
    fontSize: 11,
    color: '#374151',
    lineHeight: 1.4,
  },
  subjectSection: {
    marginBottom: 20,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
  },
  greetingSection: {
    marginBottom: 15,
    fontSize: 11,
    color: '#111827',
  },
  contentSection: {
    marginBottom: 30,
  },
  paragraph: {
    fontSize: 11,
    color: '#374151',
    lineHeight: 1.6,
    marginBottom: 10,
  },
  closingSection: {
    marginTop: 20,
  },
  closing: {
    fontSize: 11,
    color: '#111827',
    marginBottom: 30, // Space for signature
  },
  signature: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
  }
});

interface CoverLetterPDFProps {
  data: CoverLetterData;
}

export const CoverLetterPDF: React.FC<CoverLetterPDFProps> = ({ data }) => {
  const contentParagraphs = data.content.split('\n\n');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sender Info */}
        <View style={styles.senderSection}>
          <Text style={styles.senderName}>{data.senderInfo.name}</Text>
          <Text style={styles.senderInfo}>{data.senderInfo.address}</Text>
          <Text style={styles.senderInfo}>{data.senderInfo.phone}</Text>
          <Text style={styles.senderInfo}>{data.senderInfo.email}</Text>
        </View>

        {/* Date */}
        <View style={styles.dateSection}>
          <Text>{data.date}</Text>
        </View>

        {/* Recipient Info */}
        <View style={styles.recipientSection}>
          <Text style={styles.recipientName}>{data.recipientInfo.name}</Text>
          {data.recipientInfo.title && <Text style={styles.recipientInfo}>{data.recipientInfo.title}</Text>}
          {data.recipientInfo.company && <Text style={styles.recipientInfo}>{data.recipientInfo.company}</Text>}
          <Text style={styles.recipientInfo}>{data.recipientInfo.address}</Text>
        </View>

        {/* Subject */}
        {data.subject && (
          <View style={styles.subjectSection}>
            <Text>Subject: {data.subject}</Text>
          </View>
        )}

        {/* Greeting */}
        <View style={styles.greetingSection}>
          <Text>Dear {data.recipientInfo.name || 'Hiring Manager'},</Text>
        </View>

        {/* Content */}
        <View style={styles.contentSection}>
          {contentParagraphs.map((paragraph, index) => (
            <Text key={index} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))}
        </View>

        {/* Closing */}
        <View style={styles.closingSection}>
          <Text style={styles.closing}>{data.closing},</Text>
          <Text style={styles.signature}>{data.signature || data.senderInfo.name}</Text>
        </View>
      </Page>
    </Document>
  );
};
