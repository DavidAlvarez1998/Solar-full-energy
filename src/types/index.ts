export type SectionId = 'dashboard' | 'servicios' | 'instalados' | 'redes' | 'chatbot';

export interface NavItem {
  id: SectionId;
  icon: string;
  label: string;
  badge?: string;
}

export interface SectionMeta {
  title: string;
  subtitle: string;
}

export interface StatChip {
  emoji: string;
  value: string;
  label: string;
}

export interface ServiceRow {
  name: string;
  description: string;
  badge: { text: string; variant: 'success' | 'gold' | 'cyan' | 'violet' };
}

export interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  featured?: boolean;
}

export interface SocialLink {
  href: string;
  icon: string;
  name: string;
  handle: string;
  stat: string;
  qrData?: string;
  color: string;
  glow: string;
}

export interface CityData {
  energia: number;
  transporte: number;
  hospedaje: number;
  alimentacion: number;
}

export interface QuoteResult {
  panels: number;
  panelCost: number;
  labor: number;
  transport: number;
  lodging: number;
  food: number;
  totalInstall: number;
  systemCost: number;
  monthly: number;
  yearlySaving: number;
  payback: number;
  kwh: number;
  costKwh: number;
  days: number;
  techs: number;
  saving25y: number;
}

export type ChatStep = 'welcome' | 'email' | 'phone' | 'city' | 'bill' | 'quote' | 'interest' | 'restart';

export interface ChatState {
  step: ChatStep;
  name: string | null;
  email: string | null;
  phone: string | null;
  city: string | null;
  bill: number | null;
  lastQuote: QuoteResult | null;
}

export interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  quoteData?: { quote: QuoteResult; cityName: string; clientName: string; clientEmail: string };
}

export interface Lead {
  id: number;
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  billAmount: number;
  interested: boolean;
  quoteData: { panels: number; systemCost: number; payback: number };
}
