import { CITIES, BASE_CITY, PANEL_COST, LABOR_COST, getCitiesByDepartment } from '../data/cities';
import type { QuoteResult } from '../types';
import { insertLead, type InsertLeadPayload } from '../lib/leads';

export const fmtCOP = (n: number): string =>
  '$' + Math.round(n).toLocaleString('es-CO');

const estDays = (panels: number): number => {
  if (panels <= 3) return 2;
  if (panels <= 6) return 3;
  if (panels <= 10) return 4;
  return 5;
};

export const findCity = (input: string, department: string | null = null): string | null => {
  const normalize = (t: string) =>
    t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const ni = normalize(input);
  const pool = department ? getCitiesByDepartment(department) : Object.keys(CITIES);
  return (
    pool.find((c) => {
      const nc = normalize(c);
      return nc.includes(ni) || ni.includes(nc);
    }) ?? null
  );
};

export const calcSystem = (bill: number, cityName: string): QuoteResult => {
  const city = CITIES[cityName];
  const kwh = bill / city.energia;
  const panels = Math.ceil(kwh / 150);
  const panelCost = panels * PANEL_COST;
  const labor = panels * LABOR_COST;
  const days = estDays(panels);
  const techs = panels <= 5 ? 2 : 3;

  let transport = 0;
  let lodging = 0;
  let food = 0;

  if (cityName !== BASE_CITY) {
    transport = city.transporte * 2;
    lodging = city.hospedaje * days * techs;
    food = city.alimentacion * days * techs;
  }

  const totalInstall = labor + transport + lodging + food;
  const systemCost = panelCost + totalInstall;
  const yearlySaving = bill * 12;
  const payback = systemCost / yearlySaving;

  return {
    panels,
    panelCost,
    labor,
    transport,
    lodging,
    food,
    totalInstall,
    systemCost,
    monthly: bill,
    yearlySaving,
    payback,
    kwh,
    costKwh: city.energia,
    days,
    techs,
    saving25y: yearlySaving * 25,
  };
};



export const saveLead = async (payload: InsertLeadPayload): Promise<void> => {
  await insertLead(payload);
};

export const TOP_CITIES = [
  'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Bucaramanga', 'Pereira', 'Manizales',
];

export const BILL_CHIPS = ['50000', '100000', '150000', '200000', '300000', '500000'];
