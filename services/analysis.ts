
import { ValidationMetrics } from '../types';
import { CONFIG } from '../constants';

export const calculateEntropy = (tokens: string[]): number => {
  if (tokens.length === 0) return 0;
  const counts: Record<string, number> = {};
  tokens.forEach(t => counts[t] = (counts[t] || 0) + 1);
  const probs = Object.values(counts).map(c => c / tokens.length);
  return -probs.reduce((sum, p) => sum + p * Math.log2(p + 1e-10), 0);
};

export const calculateCompressionRatio = (tokens: string[]): number => {
  if (tokens.length === 0) return 1.0;
  const uniqueCount = new Set(tokens).size;
  return Math.min(15, (tokens.length / uniqueCount) * 1.1);
};

/**
 * Diamond Protocol: Statistical Falsifiability Suite.
 * Compares signal sequence efficiency against randomized null hypothesis.
 */
export const runBlockShuffleTest = (tokens: string[]): Partial<ValidationMetrics> => {
  if (tokens.length < 15) return {};
  
  const calculateTruthDelta = (t: string[]) => {
    let d = 0;
    for (let i = 1; i < t.length; i++) {
      if (t[i] !== t[i-1]) d++;
    }
    return d / t.length;
  };

  const nativeDelta = calculateTruthDelta(tokens);
  const trials = 50;
  let shuffledSum = 0;
  const shuffledDeltas: number[] = [];

  for (let i = 0; i < trials; i++) {
    const shuffled = [...tokens].sort(() => Math.random() - 0.5);
    const d = calculateTruthDelta(shuffled);
    shuffledSum += d;
    shuffledDeltas.push(d);
  }

  const shuffledDelta = shuffledSum / trials;
  const variance = shuffledDeltas.reduce((acc, d) => acc + Math.pow(d - shuffledDelta, 2), 0) / trials;
  const stdDev = Math.sqrt(variance) || 0.001;
  const zScore = (shuffledDelta - nativeDelta) / stdDev;
  
  // Falsifiability check: If structure is detected but entropy is maxed out, it's likely noise over-fitting.
  const entropy = calculateEntropy(tokens);
  const isReliable = zScore > CONFIG.SKEPTICISM_THRESHOLD || entropy < 2.5;

  let verdict = "STOCHASTIC";
  if (!isReliable) verdict = "SYSTEM_NOISE_ARTIFACT";
  else if (zScore > 5) verdict = "STATISTICALLY_SIGNIFICANT";
  else if (zScore > 2.5) verdict = "PATTERN_EMERGENT";

  return {
    nativeDelta,
    shuffledDelta,
    zScore,
    compressionRatio: calculateCompressionRatio(tokens),
    entropy,
    verdict,
    isReliable
  };
};
