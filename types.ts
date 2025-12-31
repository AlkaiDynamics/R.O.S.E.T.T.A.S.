
export enum StabilityState {
  STABLE = 'STABLE',     
  EVOLVING = 'EVOLVING', 
  STOCHASTIC = 'STOCHASTIC', 
  INACTIVE = 'INACTIVE',    
  ARTIFACT = 'ARTIFACT'     
}

export interface AcousticToken {
  n: number;
  m: number;
  betti0: number; 
  betti1: number; 
  harmonicComplexity: number;
  label: string;
}

export interface PhonosemanticToken {
  id: string;
  centroid: number[];
  count: number;
  label: string;
}

export interface AnalysisFrame {
  timestamp: number;
  frequency: number;
  token: AcousticToken;
  clusterId?: string; // Discovered via adaptive Bayesian clustering
  delta: number;
  state: StabilityState;
  structuralIntegrity: number; 
  gpuLatency?: number;
}

export interface ValidationMetrics {
  nativeDelta: number;
  shuffledDelta: number;
  zScore: number;
  compressionRatio: number;
  entropy: number;
  verdict: string;
  isReliable: boolean; 
}

export interface SignalReport {
  structuralAnalysis: string;
  comparativeContext: string;
  efficiencyRating: number;
}

// AI-Scientist Module Interfaces
export type AgentRole = 'Philologist' | 'Acoustician' | 'Synthesizer';

export interface ResearchInsight {
  id: string;
  agent: AgentRole;
  timestamp: number;
  hypothesis: string;
  supportingData: string;
  connectionToRosettaStone: string;
}

export interface ScientificState {
  cumulativeKnowledge: string;
  activeHypotheses: ResearchInsight[];
  isThinking: boolean;
}
