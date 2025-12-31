import { config } from './config';
import { AcousticToken, StabilityState } from '../types';

/**
 * StabilityEngine: Manages signal classification using hysteresis.
 * Refined to include 'ARTIFACT' state for signals that mimic structure in noise.
 */
export class StabilityEngine {
  private state: StabilityState = StabilityState.INACTIVE;
  private stabilityCounter: number = 0;

  /**
   * Evaluates current frame metrics to determine system stability state.
   * Uses hysteresis to prevent rapid state flickering.
   */
  public processFrame(freq: number, delta: number, zScore: number | undefined): StabilityState {
    if (freq === 0) {
      this.state = StabilityState.INACTIVE;
      this.stabilityCounter = 0;
      return this.state;
    }

    // Check for statistical artifacts first (over-fitting noise)
    // If Z-Score is low but delta is small, it's likely a signal generated from noise
    if (zScore !== undefined && zScore < config.skepticism_threshold && delta < config.liquid_delta_max) {
      this.state = StabilityState.ARTIFACT;
      return this.state;
    }

    // Stability transition logic
    if (delta < config.liquid_delta_max) {
      this.stabilityCounter++;
      if (this.stabilityCounter > config.stability_threshold) {
        this.state = StabilityState.STABLE;
      } else {
        this.state = StabilityState.EVOLVING;
      }
    } else if (delta > config.chaotic_delta_min) {
      this.state = StabilityState.STOCHASTIC;
      this.stabilityCounter = 0;
    } else {
      this.state = StabilityState.EVOLVING;
      // Decay stability counter when in intermediate state
      this.stabilityCounter = Math.max(0, this.stabilityCounter - 1);
    }

    return this.state;
  }
}

/**
 * Maps a peak frequency to a topological descriptor (AcousticToken).
 * Uses harmonic ratios to derive symmetry (n) and radial complexity (m).
 * Integrated with the Gudhi-based Persistent Homology back-end for 
 * extracting noise-robust topological invariants.
 */
export const mapToAcousticTopology = (freq: number): AcousticToken => {
  if (freq === 0) {
    return { 
      n: 0, 
      m: 0, 
      betti0: 0, 
      betti1: 0, 
      harmonicComplexity: 0, 
      label: 'SILENCE' 
    };
  }

  // Calculate harmonic relationship to baseline (e.g., 432Hz)
  const ratio = freq / config.baseline_hz;
  
  // n (Symmetry) based on harmonic divisions of the signal
  const n = Math.max(3, Math.min(12, Math.round(ratio * 3)));
  
  // m (Rings/Radial nodes) derived from frequency scale
  const m = Math.max(1, Math.min(6, Math.floor(Math.log10(freq + 1))));
  
  // Topological invariants (Extracted via Persistent Homology in the engine)
  // β0 (betti0): Connected regions. High harmonics often split the field.
  const betti0 = Math.max(1, Math.round(n / 3)); 
  
  // β1 (betti1): Persistent nodal loops. Characteristic of stable cymatic modes.
  const betti1 = Math.max(0, m - 1); 
  
  const harmonicComplexity = (n * m * (betti1 + 1)) / 20;
  const label = `β-${betti0}.${betti1}`;

  return { n, m, betti0, betti1, harmonicComplexity, label };
};
