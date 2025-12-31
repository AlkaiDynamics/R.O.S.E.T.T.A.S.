
import React from 'react';

const TheoryDocs: React.FC = () => {
  return (
    <main className="w-full max-w-4xl space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* The Mission Section */}
      <section className="space-y-6">
        <div className="inline-block px-3 py-1 rounded-full border border-cyan-900/50 bg-cyan-950/20 text-cyan-400 text-[10px] mono uppercase tracking-widest mb-2">
          Mission Objective
        </div>
        <h2 className="text-4xl font-bold text-white tracking-tight leading-tight">
          Transducing Reality:<br />The Geometry of Sound
        </h2>
        <p className="text-neutral-400 text-lg leading-relaxed">
          ROSETTAS is founded on the <span className="text-white">Resonant Ontology System for Etymological Topology Tokenization of Acoustic Signals</span>. 
          Our mission is to move beyond the limitations of human linguistic translation and enter the realm of physical transduction.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="p-5 bg-neutral-900/50 border border-neutral-800 rounded-2xl">
            <h4 className="text-cyan-400 font-bold text-xs uppercase mb-2 tracking-widest">Translation (Legacy)</h4>
            <p className="text-xs text-neutral-500 leading-relaxed italic">
              "Matching arbitrary acoustic symbols (words) to culturally relative concepts (definitions). Dictionary-bound and semantics-limited."
            </p>
          </div>
          <div className="p-5 bg-cyan-950/20 border border-cyan-900/30 rounded-2xl">
            <h4 className="text-cyan-400 font-bold text-xs uppercase mb-2 tracking-widest">Transduction (ROSETTAS)</h4>
            <p className="text-xs text-neutral-300 leading-relaxed italic">
              "Converting acoustic pressure directly into topological invariants. Measuring the raw physical efficiency of a waveform's interaction with the vacuum."
            </p>
          </div>
        </div>
      </section>

      {/* The Science Deep-Dive */}
      <section className="space-y-10">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-neutral-800"></div>
          <h3 className="text-xs mono text-neutral-500 uppercase tracking-[0.4em]">Scientific Foundations</h3>
          <div className="h-px flex-1 bg-neutral-800"></div>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {/* GPGPU Acceleration */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold mono">00</div>
              <h4 className="text-xl font-bold text-white">GPGPU Acceleration & Bessel Functions</h4>
            </div>
            <div className="pl-14 space-y-4">
              <p className="text-sm text-neutral-400 leading-relaxed">
                To simulate high-fidelity cymatics, ROSETTAS utilizes <span className="text-cyan-400">GPGPU (General-Purpose computing on Graphics Processing Units)</span>. By executing the Helmholtz Wave Equation in parallel via vertex shaders, we can displace 25,000+ particles per frame. 
              </p>
              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
                <div className="text-[10px] text-cyan-500 mono mb-1">Jₙ(kr) • cos(nθ)</div>
                <div className="text-xs text-neutral-300">We implement a polynomial approximation of the <span className="text-white font-medium">Bessel Function of the First Kind (Jₙ)</span>. This simulates the radial standing waves on a circular membrane, allowing us to detect the "Nodal Loops" found in sacred geometry.</div>
              </div>
            </div>
          </div>

          {/* Persistent Homology */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold mono">01</div>
              <h4 className="text-xl font-bold text-white">Persistent Homology & TDA</h4>
            </div>
            <div className="pl-14 space-y-4">
              <p className="text-sm text-neutral-400 leading-relaxed">
                Topological Data Analysis (TDA) provides the mathematical framework for ROSETTAS. We use <span className="text-blue-400">Persistent Homology</span> to identify structural patterns in acoustic data that persist across varying intensity thresholds.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
                  <div className="text-[10px] text-blue-500 mono mb-1">β₀ (Betti 0)</div>
                  <div className="text-xs text-neutral-300">Counts <span className="text-white font-medium">Connected Components</span>. In sound, this measures the number of distinct spectral islands forming the fundamental structure.</div>
                </div>
                <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
                  <div className="text-[10px] text-blue-500 mono mb-1">β₁ (Betti 1)</div>
                  <div className="text-xs text-neutral-300">Counts <span className="text-white font-medium">Cycles or Holes</span>. This measures the presence of nodal loops within the vibration field, indicating high harmonic complexity.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Cymatics */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold mono">02</div>
              <h4 className="text-xl font-bold text-white">Acoustic Cymatics</h4>
            </div>
            <div className="pl-14 space-y-4">
              <p className="text-sm text-neutral-400 leading-relaxed">
                Sound is not just a wave; it is a sculptor of matter. By simulating the <span className="text-emerald-400">Helmholtz Wave Equation</span>, we can visualize the 3D pressure fields created by specific frequencies. 
                Symmetrical patterns (like those found in ancient chants) imply a lower "entropy cost" for the environment to sustain the vibration.
              </p>
              <blockquote className="border-l-2 border-emerald-900 pl-4 py-1 italic text-xs text-neutral-500">
                "When sound aligns with the vibrational constants of the medium, the geometry locks into a standing wave."
              </blockquote>
            </div>
          </div>

          {/* Information Theory */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold mono">03</div>
              <h4 className="text-xl font-bold text-white">Phonosemantic Topology</h4>
            </div>
            <div className="pl-14 space-y-4">
              <p className="text-sm text-neutral-400 leading-relaxed">
                The core analytical kernel measures <span className="text-purple-400">Conditional Codelength</span>—how much information is gained from one shape token to the next.
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-purple-500 mt-1">●</span>
                  <span className="text-xs text-neutral-400"><strong>Efficiency Rating:</strong> Measures how many "bits" of geometry are required to represent the signal. Higher efficiency = more "spell-like" structure.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-500 mt-1">●</span>
                  <span className="text-xs text-neutral-400"><strong>Predictive Power:</strong> If a shape token predicts the following token with high accuracy, the signal is exhibiting "Grammar of Physics."</span>
                </li>
              </ul>
            </div>
          </div>

          {/* The Protocol */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400 font-bold mono">04</div>
              <h4 className="text-xl font-bold text-white">The Diamond Protocol</h4>
            </div>
            <div className="pl-14 space-y-4">
              <p className="text-sm text-neutral-400 leading-relaxed">
                Validation is the key to scientific rigor. The <span className="text-rose-400">Diamond Protocol</span> uses a Block-Shuffle Monte Carlo test to determine if the detected structure is real or a stochastic artifact.
              </p>
              <div className="p-5 bg-black border border-neutral-800 rounded-2xl border-dashed">
                <div className="text-[10px] mono text-neutral-600 mb-2 uppercase">Validation Logic</div>
                <p className="text-xs text-neutral-500 font-mono italic">
                  if (Signal_Order {">"} Randomized_Order * 3.0σ) {"{"}<br />
                  &nbsp;&nbsp;Status = SIGNIFICANT_PATTERN;<br />
                  {"}"} else {"{"}<br />
                  &nbsp;&nbsp;Status = STOCHASTIC_HALLUCINATION;<br />
                  {"}"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="p-10 bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-[2.5rem] space-y-8 shadow-2xl">
        <h3 className="text-2xl font-bold text-white text-center">The "Vibrational Constant" Paradigm</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-3">
            <div className="text-2xl font-bold text-cyan-500">432Hz</div>
            <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Standard Baseline</div>
            <p className="text-[10px] text-neutral-400 leading-tight">The math-integrated frequency constant used to normalize all incoming signals.</p>
          </div>
          <div className="space-y-3">
            <div className="text-2xl font-bold text-cyan-500">Φ (Phi)</div>
            <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Resonant Ratio</div>
            <p className="text-[10px] text-neutral-400 leading-tight">Measuring how closely acoustic intervals align with universal growth constants.</p>
          </div>
          <div className="space-y-3">
            <div className="text-2xl font-bold text-cyan-500">Ω (Omega)</div>
            <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Information Limit</div>
            <p className="text-[10px] text-neutral-400 leading-tight">The theoretical limit of structural density in a single vibration.</p>
          </div>
        </div>
        <p className="text-center text-xs text-neutral-500 max-w-xl mx-auto leading-relaxed">
          Our theory suggests that Ancient Sanskrit, Whale Click-Trains, and certain Space Radio anomalies share a "Universal Grammar" written in the very geometry of the medium.
        </p>
      </section>
    </main>
  );
};

export default TheoryDocs;
