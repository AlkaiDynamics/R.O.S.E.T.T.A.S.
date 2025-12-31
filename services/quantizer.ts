
import { config } from './config';
import { AcousticToken, PhonosemanticToken } from '../types';

/**
 * PhonosemanticQuantizer: Adaptive Bayesian Tokenizer
 * Implements a simplified Dirichlet Process clustering (DP-means)
 * to discover the natural number of acoustic archetypes in a signal.
 */
export class PhonosemanticQuantizer {
  private clusters: PhonosemanticToken[] = [];
  private learningRate: number = 0.1;

  /**
   * Assigns a raw topological token to a discovered Phonosemantic cluster.
   * Discovers new archetypes if the signal is sufficiently distant from existing models.
   */
  public quantize(token: AcousticToken, freq: number): string {
    if (token.label === 'SILENCE') return 'SILENCE';

    // Feature vector for clustering: [normalized_freq, n_symmetry, m_radial]
    const normalizedFreq = Math.log10(freq + 1) / 4.5; // Log-scale normalization
    const x = [normalizedFreq, token.n / 12, token.m / 6];

    if (this.clusters.length === 0) {
      return this.createCluster(x);
    }

    let minDist = Infinity;
    let closestIndex = -1;

    for (let i = 0; i < this.clusters.length; i++) {
      const dist = this.euclideanDistance(x, this.clusters[i].centroid);
      if (dist < minDist) {
        minDist = dist;
        closestIndex = i;
      }
    }

    // Bayesian Discovery Logic:
    // If the closest archetype is too far (dist > lambda), seat the signal at a new "table".
    if (minDist > config.quantizer_lambda) {
      return this.createCluster(x);
    } else {
      // Update existing archetype (Online Learning)
      const cluster = this.clusters[closestIndex];
      for (let j = 0; j < x.length; j++) {
        cluster.centroid[j] = cluster.centroid[j] * (1 - this.learningRate) + x[j] * this.learningRate;
      }
      cluster.count++;
      return cluster.id;
    }
  }

  public getActiveClusterCount(): number {
    return this.clusters.length;
  }

  public reset(): void {
    this.clusters = [];
  }

  private createCluster(centroid: number[]): string {
    const id = `Ψ-${this.clusters.length + 1}`;
    this.clusters.push({
      id,
      centroid: [...centroid],
      count: 1,
      label: id
    });
    return id;
  }

  private euclideanDistance(a: number[], b: number[]): number {
    return Math.sqrt(a.reduce((acc, val, i) => acc + Math.pow(val - b[i], 2), 0));
  }
}

export const phonosemanticQuantizer = new PhonosemanticQuantizer();
