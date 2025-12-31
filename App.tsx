
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { 
  AnalysisFrame, 
  StabilityState, 
  AcousticToken, 
  ValidationMetrics 
} from './types';
import { GroundedReport, analyzeTopologicalStream } from './services/gemini';
import { mapToAcousticTopology, StabilityEngine } from './services/physics';
import { runBlockShuffleTest } from './services/analysis';
import { phonosemanticQuantizer } from './services/quantizer';
import CymaticDisplay from './components/CymaticDisplay';
import MetricGrid from './components/MetricGrid';
import TheoryDocs from './components/TheoryDocs';
import AIScientist from './components/AIScientist';
import { THEME, HARMONIC_MEAN_BASELINE, CONFIG, CALIBRATION_BENCHMARKS } from './constants';

const App: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [humanContext, setHumanContext] = useState("Standard field recording");
  const [clusterCount, setClusterCount] = useState(0);
  const [currentFrame, setCurrentFrame] = useState<AnalysisFrame>({
    timestamp: 0,
    frequency: 0,
    token: { n: 0, m: 0, betti0: 0, betti1: 0, harmonicComplexity: 0, label: 'INIT' },
    delta: 0,
    state: StabilityState.INACTIVE,
    structuralIntegrity: 0
  });
  const [history, setHistory] = useState<AnalysisFrame[]>([]);
  const [logs, setLogs] = useState<{timestamp: number, message: string, type: string}[]>([]);
  const [validation, setValidation] = useState<Partial<ValidationMetrics>>({});
  const [report, setReport] = useState<GroundedReport | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [view, setView] = useState<'console' | 'research' | 'theory' | 'benchmarks'>('console');

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const lastTokenRef = useRef<AcousticToken | null>(null);
  const stabilityEngineRef = useRef(new StabilityEngine());

  const frequencyHistory = useMemo(() => history.map(h => h.frequency), [history]);
  const tokenHistory = useMemo(() => history.map(h => h.token), [history]);

  const addLog = (message: string, type: string = 'info') => {
    setLogs(prev => [{ timestamp: Date.now(), message, type }, ...prev].slice(0, 30));
  };

  const startAnalysis = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyzerRef.current = audioContextRef.current.createAnalyser();
      analyzerRef.current.fftSize = 2048;
      source.connect(analyzerRef.current);
      
      setIsActive(true);
      phonosemanticQuantizer.reset();
      addLog("Transducer active. Bayesian discovery engine engaged.", "success");
      processAudio();
    } catch (err) {
      addLog("Hardware access denied.", "warning");
    }
  };

  const processAudio = () => {
    if (!analyzerRef.current) return;
    
    const bufferLength = analyzerRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyzerRef.current.getByteFrequencyData(dataArray);

    let maxVal = 0;
    let maxIndex = -1;
    for (let i = 0; i < bufferLength; i++) {
      if (dataArray[i] > maxVal) {
        maxVal = dataArray[i];
        maxIndex = i;
      }
    }

    const nyquist = audioContextRef.current!.sampleRate / 2;
    const freq = maxVal > 50 ? (maxIndex * nyquist) / bufferLength : 0;
    const token = mapToAcousticTopology(freq);
    
    // Adaptive Bayesian Quantization
    const clusterId = phonosemanticQuantizer.quantize(token, freq);
    const discoveredCount = phonosemanticQuantizer.getActiveClusterCount();
    if (discoveredCount > clusterCount) {
      setClusterCount(discoveredCount);
      addLog(`New archetype discovered: ${clusterId}`, 'success');
    }

    let delta = 0;
    if (lastTokenRef.current) {
      delta = Math.abs(token.n - lastTokenRef.current.n) + Math.abs(token.m - lastTokenRef.current.m);
    }

    const state = stabilityEngineRef.current.processFrame(freq, delta, validation.zScore);
    const integrity = Math.max(0, 1 - delta / 10);

    const frame: AnalysisFrame = {
      timestamp: Date.now(),
      frequency: freq,
      token,
      clusterId,
      delta,
      state,
      structuralIntegrity: freq === 0 ? 0 : integrity
    };

    setCurrentFrame(frame);
    lastTokenRef.current = token;
    
    setHistory(prev => [...prev.slice(-(CONFIG.MAX_HISTORY - 1)), frame]);

    animationFrameRef.current = requestAnimationFrame(processAudio);
  };

  const runFalsifiabilityTest = useCallback(() => {
    addLog("Running Monte Carlo skepticism test...", "info");
    const tokens = history.map(h => h.clusterId || h.token.label);
    const result = runBlockShuffleTest(tokens);
    setValidation(result);
    if (result.isReliable && result.zScore! > 3) {
      addLog(`Significant structure verified: Z=${result.zScore?.toFixed(2)}σ`, "success");
    } else if (!result.isReliable) {
      addLog("Warning: High probability of stochastic artifact.", "warning");
    }
  }, [history]);

  const requestAnalysis = async () => {
    setIsAnalyzing(true);
    addLog("Performing topological isomorphism analysis...", "info");
    const tokens = history.map(h => h.token);
    const result = await analyzeTopologicalStream(tokens, humanContext);
    setReport(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8 space-y-8 max-w-7xl mx-auto pb-24">
      <header className="w-full flex flex-col md:flex-row justify-between items-center gap-6 py-4 border-b border-neutral-800">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-neutral-800 border border-neutral-700 rounded-xl flex items-center justify-center font-bold text-white text-2xl shadow-[0_0_20px_rgba(6,182,212,0.2)]">R</div>
          <div>
            <h1 className="text-2xl font-bold tracking-tighter text-white">ROSETTAS <span className="text-[10px] bg-neutral-900 text-cyan-500 px-2 py-0.5 rounded ml-2 mono border border-cyan-900/30 uppercase font-bold">ADAPTIVE_TOKENIZATION</span></h1>
            <p className="text-[10px] mono text-neutral-500 uppercase tracking-[0.2em]">Resonant Ontology System for Etymological Topology Tokenization of Acoustic Signals</p>
          </div>
        </div>
        
        <nav className="flex items-center gap-2 bg-neutral-900 p-1 rounded-full border border-neutral-800">
          {(['console', 'research', 'theory', 'benchmarks'] as const).map(v => (
            <button 
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest transition-all ${view === v ? 'bg-neutral-800 text-white shadow-lg' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              {v.toUpperCase()}
            </button>
          ))}
        </nav>

        <button 
          onClick={isActive ? () => setIsActive(false) : startAnalysis}
          className={`px-8 py-2 rounded-full font-bold text-sm transition-all border-b-4 ${isActive ? 'bg-rose-900 text-white border-rose-950 shadow-[0_0_20px_rgba(225,29,72,0.3)]' : 'bg-neutral-200 text-black border-neutral-400'}`}
        >
          {isActive ? 'SHUTDOWN' : 'INITIALIZE'}
        </button>
      </header>

      {view === 'console' && (
        <main className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <section className="lg:col-span-8 space-y-8">
            <CymaticDisplay 
              token={currentFrame.token} 
              isLocked={currentFrame.state === StabilityState.STABLE} 
              history={frequencyHistory}
            />
            
            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl space-y-4 shadow-xl">
               <label className="text-[10px] mono text-neutral-500 uppercase tracking-widest font-bold">Context Engine (Human Metadata)</label>
               <input 
                 type="text" 
                 value={humanContext}
                 onChange={(e) => setHumanContext(e.target.value)}
                 placeholder="Describe input environment..."
                 className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-200 focus:outline-none focus:border-cyan-500 transition-colors"
               />
            </div>

            <MetricGrid currentFrame={currentFrame} stability={0} />

            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 h-48 overflow-y-auto space-y-2 scrollbar-thin shadow-inner">
              {logs.map((log, i) => (
                <div key={i} className={`mono text-[10px] ${log.type === 'warning' ? 'text-rose-500 font-bold' : log.type === 'success' ? 'text-emerald-400' : 'text-neutral-500'}`}>
                  [{new Date(log.timestamp).toLocaleTimeString()}] {log.message}
                </div>
              ))}
            </div>
          </section>

          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6 shadow-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-white uppercase tracking-widest">Skepticism Test</h2>
                <button onClick={runFalsifiabilityTest} disabled={history.length < 15} className="text-[9px] bg-neutral-800 px-3 py-1 rounded border border-neutral-700 hover:bg-neutral-700 transition-colors">RUN_TEST</button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-black rounded-xl border border-neutral-800">
                  <div className="text-[7px] text-neutral-500 uppercase font-black mb-1">Discovered Archetypes</div>
                  <div className="text-xl font-bold text-cyan-400 mono">{clusterCount}</div>
                </div>
                <div className="p-3 bg-black rounded-xl border border-neutral-800">
                  <div className="text-[7px] text-neutral-500 uppercase font-black mb-1">Current Token</div>
                  <div className="text-xl font-bold text-white mono">{currentFrame.clusterId || '---'}</div>
                </div>
              </div>

              {validation.verdict && (
                <div className={`p-4 rounded-xl border ${validation.isReliable ? 'bg-emerald-950/20 border-emerald-900/50 text-emerald-400' : 'bg-rose-950/20 border-rose-900/50 text-rose-500'}`}>
                  <div className="text-[8px] uppercase font-bold mb-1 tracking-widest">Reliability Status</div>
                  <div className="text-xs font-bold mono">{validation.verdict}</div>
                </div>
              )}
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 min-h-[400px] shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-bold text-white uppercase tracking-widest">Signal Report</h2>
                <button onClick={requestAnalysis} disabled={history.length < 15 || isAnalyzing} className="text-[9px] bg-neutral-800 px-3 py-1 rounded border border-neutral-700 hover:bg-neutral-700 transition-colors">
                  {isAnalyzing ? 'PROCESSING...' : 'ANALYZE'}
                </button>
              </div>

              {report ? (
                <div className="space-y-4 animate-in fade-in duration-500">
                  <div className="p-4 bg-black rounded-xl border border-neutral-800">
                    <div className="text-[8px] text-neutral-500 uppercase mb-2 font-bold tracking-widest">Structural Analysis</div>
                    <div className="text-xs text-neutral-300 leading-relaxed italic font-medium">"{report.structuralAnalysis}"</div>
                  </div>
                  {report.falsifiabilityWarning && (
                    <div className="p-3 bg-amber-950/20 border border-amber-900/50 text-amber-500 text-[10px] font-bold rounded-xl">
                      ⚠ {report.falsifiabilityWarning}
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-2">
                     <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                        <div className="text-[7px] text-neutral-500 uppercase mb-1 font-bold">Confidence</div>
                        <div className="text-sm font-bold text-white mono">{(report.confidenceInterval * 100).toFixed(1)}%</div>
                     </div>
                     <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                        <div className="text-[7px] text-neutral-500 uppercase mb-1 font-bold">Efficiency</div>
                        <div className="text-sm font-bold text-white mono">{(report.efficiencyRating * 100).toFixed(1)}%</div>
                     </div>
                  </div>
                </div>
              ) : (
                <div className="h-48 flex items-center justify-center text-[10px] text-neutral-700 mono italic uppercase font-bold">Signal context required.</div>
              )}
            </div>
          </aside>
        </main>
      )}

      {view === 'research' && (
        <AIScientist 
          history={tokenHistory} 
          context={humanContext} 
        />
      )}

      {view === 'theory' && <TheoryDocs />}

      {view === 'benchmarks' && (
        <main className="w-full max-w-3xl space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">Calibration Benchmarks</h2>
          <div className="grid grid-cols-1 gap-4">
            {Object.entries(CALIBRATION_BENCHMARKS).map(([key, bench]) => (
              <div key={key} className="p-6 bg-neutral-900 border border-neutral-800 rounded-2xl flex justify-between items-center hover:border-neutral-700 transition-colors shadow-lg">
                <div>
                  <h3 className="font-bold text-white">{bench.name}</h3>
                  <div className="text-[10px] text-neutral-500 mono">{key}</div>
                </div>
                <div className="text-right">
                   <div className="text-sm font-bold text-white mono">{bench.zScore}σ</div>
                   <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Target Z</div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}
    </div>
  );
};

export default App;
