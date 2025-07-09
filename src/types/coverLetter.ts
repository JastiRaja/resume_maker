export interface SenderInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface RecipientInfo {
  name: string;
  title: string;
  company: string;
  address: string;
}

export interface CoverLetterData {
  senderInfo: SenderInfo;
  recipientInfo: RecipientInfo;
  date: string;
  subject: string;
  content: string;
  closing: string;
  signature: string;
}

export interface CoverLetterTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: string;
  isPremium: boolean;
  sampleData: CoverLetterData;
}