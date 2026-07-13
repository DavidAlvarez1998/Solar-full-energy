import type { NavItem, SectionId, SectionMeta } from '../types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
  { id: 'servicios', icon: '⚡', label: 'Servicios' },
  { id: 'instalados', icon: '🏗️', label: 'Instalaciones' },
  { id: 'redes', icon: '📡', label: 'Comunidad' },
  { id: 'chatbot', icon: '☀️', label: 'Cotizador Solar', badge: 'NEW' },
  { id: 'admin', icon: '⚙️', label: 'Admin' },
];

export const SECTION_META: Record<SectionId, SectionMeta> = {
  dashboard: { title: 'DASHBOARD', subtitle: 'Energía Solar Inteligente' },
  servicios: { title: 'SERVICIOS PRESTADOS', subtitle: 'Catálogo de consultoría y diseño solar' },
  instalados: { title: 'SERVICIOS INSTALADOS', subtitle: 'Historial de instalaciones en Colombia' },
  redes: { title: 'REDES SOCIALES', subtitle: 'Comunidad digital · Conéctate con nosotros' },
  chatbot: { title: 'COTIZA TU SISTEMA SOLAR', subtitle: 'Cotizador inteligente · Precio en minutos' },
  admin: { title: 'PANEL DE ADMINISTRACIÓN', subtitle: 'Gestión de leads, contenido e imágenes' },
};
