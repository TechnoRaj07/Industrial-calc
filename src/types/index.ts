export type UserRole =
  | 'Student'
  | 'Teacher'
  | 'Research Scholar'
  | 'Dairy Technologist'
  | 'Food Technologist'
  | 'Biotechnologist'
  | 'Microbiologist'
  | 'Quality Assurance Executive'
  | 'Quality Control Analyst'
  | 'Production Executive'
  | 'Production Manager'
  | 'Process Engineer'
  | 'Plant Engineer'
  | 'Maintenance Engineer'
  | 'Laboratory Technician'
  | 'R&D Scientist'
  | 'Regulatory Affairs Officer'
  | 'Packaging Engineer'
  | 'Safety Officer'
  | 'Factory Manager'
  | 'Consultant'
  | 'Entrepreneur'
  | 'Government Officer'
  | 'Other';

export type CalculatorCategory =
  | 'General Chemistry'
  | 'Industrial Processes'
  | 'Food & Dairy'
  | 'Biotechnology'
  | 'Chemical Engineering'
  | 'Water & Environmental'
  | 'Quality Control'
  | 'Utilities & Automation'
  | 'Packaging & Modern Tech'
  | 'Production & Manufacturing';

export interface CalculatorInput {
  name: string;
  label: string;
  unit?: string;
  defaultValue: number | string;
  type: 'number' | 'select' | 'text';
  options?: { label: string; value: string | number }[];
  min?: number;
  max?: number;
  step?: number;
  description?: string;
}

export interface CalculatorResultItem {
  label: string;
  value: number | string;
  unit?: string;
  description?: string;
  highlight?: boolean;
}

export interface CalculatorDef {
  id: string;
  slug: string;
  title: string;
  category: CalculatorCategory;
  description: string;
  formula: string;
  longExplanation: string;
  useCases: string[];
  faqs: { question: string; answer: string }[];
  inputs: CalculatorInput[];
  calculate: (inputs: Record<string, any>) => {
    results: CalculatorResultItem[];
    chartData?: { name: string; value: number; unit?: string }[];
  };
}

export interface LeadInfo {
  name: string;
  email: string;
  mobile: string;
  role: UserRole;
}

export interface GeneratedReport {
  reportId: string;
  verificationCode: string;
  timestamp: string;
  calculatorTitle: string;
  calculatorSlug: string;
  lead: LeadInfo;
  inputs: { label: string; value: string | number; unit?: string }[];
  results: CalculatorResultItem[];
  qrCodeUrl: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
  tags: string[];
  featured?: boolean;
}

export interface SiteStats {
  totalCalculations: number;
  activeUsers: number;
  reportsGenerated: number;
  industriesServed: number;
}
