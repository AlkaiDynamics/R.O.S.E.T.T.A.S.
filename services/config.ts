
import jsyaml from 'js-yaml';

/**
 * RosettasConfig
 * Manages all physical constants and system parameters.
 * Supports asynchronous initialization from an external config.yaml.
 */
export class RosettasConfig {
  // Physical Constants & Sampling
  public baseline_hz: number = 432.0;
  public sample_rate: number = 44100;
  public chunk_size: number = 2048;
  public hop_length: number = 512;
  
  // Detection Thresholds
  public noise_threshold: number = 0.05;
  public stability_threshold: number = 8;
  public liquid_delta_max: number = 2;
  public chaotic_delta_min: number = 3;
  
  // Topology & Math
  public tda_precision: number = 0.01;
  public max_history: number = 500;
  public skepticism_threshold: number = 1.5;
  public universal_mirror_trials: number = 100;
  
  // Quantizer Params
  public quantizer_lambda: number = 0.75;
  
  // Advanced Config
  public planck_normalization: boolean = false;
  public system_name: string = "G.A.T.E.";
  public version: string = "1.0.0-CORE";

  private static instance: RosettasConfig;

  private constructor() {}

  /**
   * Singleton pattern to ensure a consistent configuration across the application.
   */
  public static getInstance(): RosettasConfig {
    if (!RosettasConfig.instance) {
      RosettasConfig.instance = new RosettasConfig();
    }
    return RosettasConfig.instance;
  }

  /**
   * Loads configuration from the external config.yaml file.
   * This allows researchers to modify parameters without recompiling.
   */
  public async load(): Promise<void> {
    try {
      const response = await fetch('config.yaml');
      if (!response.ok) {
        throw new Error(`Failed to fetch config.yaml: ${response.statusText}`);
      }
      const yamlText = await response.text();
      const data = jsyaml.load(yamlText) as any;
      
      if (data && data.rosettas) {
        const r = data.rosettas;
        // Map YAML properties to class properties
        if (r.baseline_hz !== undefined) this.baseline_hz = r.baseline_hz;
        if (r.sample_rate !== undefined) this.sample_rate = r.sample_rate;
        if (r.chunk_size !== undefined) this.chunk_size = r.chunk_size;
        if (r.hop_length !== undefined) this.hop_length = r.hop_length;
        if (r.noise_threshold !== undefined) this.noise_threshold = r.noise_threshold;
        if (r.stability_threshold !== undefined) this.stability_threshold = r.stability_threshold;
        if (r.tda_precision !== undefined) this.tda_precision = r.tda_precision;
        if (r.max_history !== undefined) this.max_history = r.max_history;
        if (r.liquid_delta_max !== undefined) this.liquid_delta_max = r.liquid_delta_max;
        if (r.chaotic_delta_min !== undefined) this.chaotic_delta_min = r.chaotic_delta_min;
        if (r.planck_normalization !== undefined) this.planck_normalization = r.planck_normalization;
        if (r.universal_mirror_trials !== undefined) this.universal_mirror_trials = r.universal_mirror_trials;
        if (r.quantizer_lambda !== undefined) this.quantizer_lambda = r.quantizer_lambda;
        if (r.skepticism_threshold !== undefined) this.skepticism_threshold = r.skepticism_threshold;
      }
      console.log(`[RosettasConfig] Configuration loaded for ${this.system_name}`);
    } catch (error) {
      console.warn("[RosettasConfig] Failed to load config.yaml, using defaults.", error);
    }
  }
}

// Global instance for convenience
export const config = RosettasConfig.getInstance();
