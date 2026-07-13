import type { CityData } from '../types';

export const CITIES: Record<string, CityData> = {
  'Bogotá': { energia: 851, transporte: 491084, hospedaje: 81639, alimentacion: 69012, department: 'Cundinamarca' },
  'Medellín': { energia: 801, transporte: 582113, hospedaje: 89144, alimentacion: 63358, department: 'Antioquia' },
  'Cali': { energia: 856, transporte: 491161, hospedaje: 115741, alimentacion: 62848, department: 'Valle del Cauca' },
  'Barranquilla': { energia: 845, transporte: 528604, hospedaje: 82082, alimentacion: 60976, department: 'Atlántico' },
  'Cartagena': { energia: 781, transporte: 900314, hospedaje: 95247, alimentacion: 76559, department: 'Bolívar' },
  'Cúcuta': { energia: 847, transporte: 900956, hospedaje: 68390, alimentacion: 56515, department: 'Norte de Santander' },
  'Bucaramanga': { energia: 861, transporte: 190363, hospedaje: 72981, alimentacion: 67856, department: 'Santander' },
  'Pasto': { energia: 823, transporte: 77787, hospedaje: 64719, alimentacion: 59115, department: 'Nariño' },
  'Manizales': { energia: 770, transporte: 218916, hospedaje: 76405, alimentacion: 55231, department: 'Caldas' },
  'Pereira': { energia: 859, transporte: 130785, hospedaje: 61149, alimentacion: 59105, department: 'Risaralda' },
  'Armenia': { energia: 789, transporte: 76443, hospedaje: 75018, alimentacion: 61029, department: 'Quindío' },
  'Ibagué': { energia: 783, transporte: 44312, hospedaje: 62449, alimentacion: 53169, department: 'Tolima' },
  'Montería': { energia: 815, transporte: 110165, hospedaje: 69782, alimentacion: 58667, department: 'Córdoba' },
  'Santa Marta': { energia: 775, transporte: 211294, hospedaje: 65054, alimentacion: 67571, department: 'Magdalena' },
  'Sincelejo': { energia: 785, transporte: 119230, hospedaje: 32582, alimentacion: 51044, department: 'Sucre' },
  'Valledupar': { energia: 807, transporte: 184794, hospedaje: 70267, alimentacion: 61850, department: 'Cesar' },
  'Neiva': { energia: 843, transporte: 70407, hospedaje: 73087, alimentacion: 52279, department: 'Huila' },
  'Villavicencio': { energia: 775, transporte: 193346, hospedaje: 57467, alimentacion: 59482, department: 'Meta' },
  'Yopal': { energia: 780, transporte: 81024, hospedaje: 58392, alimentacion: 43654, department: 'Casanare' },
  'Tunja': { energia: 818, transporte: 92869, hospedaje: 44857, alimentacion: 52415, department: 'Boyacá' },
  'Popayán': { energia: 816, transporte: 62638, hospedaje: 42130, alimentacion: 47820, department: 'Cauca' },
  'Florencia': { energia: 796, transporte: 195682, hospedaje: 38748, alimentacion: 53498, department: 'Caquetá' },
  'Mocoa': { energia: 857, transporte: 189878, hospedaje: 32339, alimentacion: 51980, department: 'Putumayo' },
  'San Andrés': { energia: 851, transporte: 64862, hospedaje: 47502, alimentacion: 53946, department: 'Archipiélago de San Andrés' },
  'Quibdó': { energia: 801, transporte: 62834, hospedaje: 45147, alimentacion: 48216, department: 'Chocó' },
  'Riohacha': { energia: 804, transporte: 187772, hospedaje: 52549, alimentacion: 51125, department: 'La Guajira' },
  'Mitú': { energia: 798, transporte: 199467, hospedaje: 40626, alimentacion: 55809, department: 'Vaupés' },
  'Puerto Carreño': { energia: 868, transporte: 223423, hospedaje: 31832, alimentacion: 45752, department: 'Vichada' },
  'Inírida': { energia: 774, transporte: 102694, hospedaje: 43145, alimentacion: 46386, department: 'Guainía' },
  'Leticia': { energia: 778, transporte: 75307, hospedaje: 59921, alimentacion: 51292, department: 'Amazonas' },
  'Arauca': { energia: 861, transporte: 102490, hospedaje: 36967, alimentacion: 52738, department: 'Arauca' },
  'San José del Guaviare': { energia: 833, transporte: 123712, hospedaje: 58989, alimentacion: 52532, department: 'Guaviare' },
};

export const BASE_CITY = 'Pereira';
export const PANEL_COST = 3_500_000;
export const LABOR_COST = 350_000;
export const WA_NUMBER = '573217344209';

// Derived department → municipality index (computed once at module load)
const _byDepartment: Record<string, string[]> = Object.entries(CITIES).reduce<Record<string, string[]>>(
  (acc, [city, data]) => {
    const dept = data.department;
    if (!acc[dept]) acc[dept] = [];
    acc[dept].push(city);
    return acc;
  },
  {}
);

export const getDepartments = (): string[] => Object.keys(_byDepartment).sort();

export const getCitiesByDepartment = (dept: string): string[] =>
  (_byDepartment[dept] ?? []).slice().sort();
