
// Removed Interpretation as it is not exported by types.ts
import { AnalysisFrame, ValidationMetrics } from '../types';

const STORAGE_KEY = 'rosettas_archive_v3';

export interface ArchiveEntry {
  id: string;
  timestamp: number;
  label: string;
  summary: string;
  resonance: number;
  metrics: Partial<ValidationMetrics>;
}

export const saveToArchive = (entry: ArchiveEntry) => {
  const current = getArchive();
  const updated = [entry, ...current].slice(0, 50); // Keep last 50
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const getArchive = (): ArchiveEntry[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const clearArchive = () => {
  localStorage.removeItem(STORAGE_KEY);
};
