// services/schemeService.ts
import { schemes, Scheme } from '../data/schemes';

export const getAllSchemes = (): Scheme[] => schemes;

export const getSchemeById = (id: string): Scheme | undefined => 
  schemes.find(s => s.id === id);

export const getSchemesByCategory = (category: string): Scheme[] => 
  schemes.filter(s => s.category === category);

export const searchSchemes = (query: string): Scheme[] => {
  const q = query.toLowerCase();
  return schemes.filter(s => 
    s.name.toLowerCase().includes(q) || 
    s.description.toLowerCase().includes(q)
  );
};

export const getSchemesByMeeSevaRequirement = (required: boolean): Scheme[] => 
  schemes.filter(s => s.requiresMeeSeva === required);