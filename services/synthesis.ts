
// Corrected BASELINE_HZ to HARMONIC_MEAN_BASELINE
import { HARMONIC_MEAN_BASELINE, CONFIG } from '../constants';
// Corrected CymaticToken to AcousticToken
import { AcousticToken } from '../types';

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let activeOscillators: OscillatorNode[] = [];

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
    masterGain.connect(audioCtx.destination);
  }
};

/**
 * Inverse Cymatic Synthesis: Transduces geometry tokens back into sound.
 */
// Changed CymaticToken to AcousticToken
export const synthesizeToken = (token: AcousticToken, isActive: boolean) => {
  initAudio();
  if (!audioCtx || !masterGain) return;

  const now = audioCtx.currentTime;

  // Cleanup old voices
  activeOscillators.forEach(osc => {
    try { osc.stop(now + 0.1); } catch(e) {}
  });
  activeOscillators = [];

  if (!isActive || token.label === 'SILENCE' || token.n === 0) {
    masterGain.gain.setTargetAtTime(0, now, 0.1);
    return;
  }

  // Calculate frequencies based on n (symmetry) and m (rings)
  // Corrected BASELINE_HZ to HARMONIC_MEAN_BASELINE
  const fundamental = HARMONIC_MEAN_BASELINE * Math.pow(1.5, (token.n - 4) / 2);
  
  // Add 3 oscillators to represent the "chord" of the geometry
  const ratios = [1, 1.5, 2.1]; // Fundamental, Fifth, Harmonics
  
  masterGain.gain.setTargetAtTime(0.15, now, 0.1);

  ratios.forEach((r, i) => {
    const osc = audioCtx!.createOscillator();
    osc.type = i === 0 ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(fundamental * r, now);
    
    const localGain = audioCtx!.createGain();
    localGain.gain.setValueAtTime(0.1 / (i + 1), now);
    
    osc.connect(localGain);
    localGain.connect(masterGain!);
    
    osc.start();
    activeOscillators.push(osc);
  });
};

export const playResonantPulse = (freq: number, duration: number = 0.5) => {
  initAudio();
  if (!audioCtx) return;

  const osc = audioCtx.createOscillator();
  const env = audioCtx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

  env.gain.setValueAtTime(0, audioCtx.currentTime);
  env.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.05);
  env.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

  osc.connect(env);
  env.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + duration);
};
