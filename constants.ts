
import { config } from './services/config';

/**
 * Historical constants maintained for backward compatibility.
 * These are now dynamic properties backed by the RosettasConfig singleton.
 */

export const HARMONIC_MEAN_BASELINE = 432.0; // Default fallback

export const CONFIG = {
  get SYSTEM_NAME() { return config.system_name; },
  get VERSION() { return config.version; },
  get MAX_HISTORY() { return config.max_history; },
  get TOPOLOGICAL_PRECISION() { return config.tda_precision; },
  get STABILITY_THRESHOLD() { return config.stability_threshold; },
  get SKEPTICISM_THRESHOLD() { return config.skepticism_threshold; },
  get UNIVERSAL_MIRROR_TRIALS() { return config.universal_mirror_trials; },
  get LIQUID_DELTA_MAX() { return config.liquid_delta_max; },
  get CHAOTIC_DELTA_MIN() { return config.chaotic_delta_min; },
  get BASELINE_HZ() { return config.baseline_hz; },
  get SAMPLING_RATE() { return config.sample_rate; },
  get WINDOW_SIZE() { return config.chunk_size; },
  get HOP_LENGTH() { return config.hop_length; }
};

export const THEME = {
  accent: '#06b6d4',
  stable: '#10b981',
  evolving: '#3b82f6',
  stochastic: '#f43f5e',
  inactive: '#737373',
  artifact: '#facc15', // Yellow for warnings
  bg: '#050505',
  card: '#121212',
  border: '#262626',
  harmonic: '#a855f7'
};

export const CALIBRATION_BENCHMARKS = {
  GAUSSIAN_RANDOM: { zScore: 0.2, entropy: 2.9, name: "Control: Stochastic Noise" },
  STRUCTURED_TONE: { zScore: 9.5, entropy: 0.2, name: "Reference: Pure Sine" },
  COMPLEX_HARMONIC: { zScore: 4.8, entropy: 1.5, name: "Reference: Biological Signal" }
};
