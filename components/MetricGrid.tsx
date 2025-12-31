
import React from 'react';
import { AnalysisFrame, StabilityState } from '../types';

interface MetricGridProps {
  currentFrame: AnalysisFrame;
  stability: number;
}

// Define MetricWrapperProps interface for children typing
interface MetricWrapperProps {
  title: string;
  info: string;
  children: React.ReactNode;
}

/**
 * MetricWrapper: A styled container for metric data with a hover explainer.
 * Defined outside the main component to resolve TypeScript inference errors for JSX children.
 */
const MetricWrapper: React.FC<MetricWrapperProps> = ({ title, children, info }) => (
  <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl group relative overflow-hidden transition-all hover:border-neutral-700">
    <div className="text-neutral-500 text-[9px] uppercase font-bold mb-1 flex items-center justify-between">
      {title}
      <span className="text-[7px] text-cyan-500 cursor-help opacity-50">ⓘ</span>
    </div>
    {children}
    <div className="absolute inset-0 bg-neutral-900 p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex flex-col items-center justify-center text-center">
      <div className="text-[8px] text-cyan-500 mono uppercase mb-1">Deep Explainer</div>
      <p className="text-[9px] text-neutral-300 leading-tight px-2">{info}</p>
    </div>
  </div>
);

const MetricGrid: React.FC<MetricGridProps> = ({ currentFrame }) => {
  const getStatusColor = (state: StabilityState) => {
    switch (state) {
      case StabilityState.STABLE: return 'text-emerald-400';
      case StabilityState.EVOLVING: return 'text-blue-400';
      case StabilityState.STOCHASTIC: return 'text-rose-400';
      case StabilityState.ARTIFACT: return 'text-amber-400';
      default: return 'text-neutral-400';
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      {/* Stability State Metric */}
      <MetricWrapper 
        title="Stability State" 
        info="The system uses a 5-step hysteresis algorithm. 'Stable' means the topological invariants (n, m) have locked into a standing wave pattern, indicating low signal turbulence."
      >
        <div className={`text-xl font-bold mono ${getStatusColor(currentFrame.state)}`}>
          {currentFrame.state}
        </div>
      </MetricWrapper>
      
      {/* Peak Frequency Metric */}
      <MetricWrapper 
        title="Peak Frequency" 
        info="The fundamental mode of vibration. We normalize this against the Planck-constant derived 432Hz baseline to calculate 'Resonant Deviation'."
      >
        <div className="text-xl font-bold mono text-white">
          {currentFrame.frequency.toFixed(1)} <span className="text-xs font-normal text-neutral-600">Hz</span>
        </div>
      </MetricWrapper>

      {/* GPU Parallelism Metric */}
      <MetricWrapper 
        title="GPU Parallelism" 
        info="Current GPGPU throughput. Measuring the parallelization of 100,000 particle coordinates and Bessel mode superpositions in the vertex shader."
      >
        <div className="text-xl font-bold mono text-cyan-400">
          100K <span className="text-[8px] text-neutral-500 uppercase">Ops/F</span>
        </div>
      </MetricWrapper>

      {/* Structural Integrity Metric */}
      <MetricWrapper 
        title="Structural Integrity" 
        info="A calculation of the 'Geometric Delta'. High integrity means the shape of the sound is resisting entropy and maintaining its topological signature across time-steps."
      >
        <div className="flex items-end gap-2">
          <div className="text-xl font-bold mono text-white">
            {(currentFrame.structuralIntegrity * 100).toFixed(0)}%
          </div>
          <div className="h-4 w-12 bg-neutral-800 rounded-full overflow-hidden mb-1">
            <div 
              className={`h-full transition-all duration-300 ${currentFrame.structuralIntegrity > 0.8 ? 'bg-emerald-500' : 'bg-neutral-500'}`} 
              style={{ width: `${currentFrame.structuralIntegrity * 100}%` }}
            />
          </div>
        </div>
      </MetricWrapper>
    </div>
  );
};

export default MetricGrid;
