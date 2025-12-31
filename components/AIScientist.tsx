
import React, { useState } from 'react';
import { ResearchInsight, AcousticToken, AgentRole } from '../types';
import { aiScientist } from '../services/aiScientist';

interface AIScientistProps {
  history: AcousticToken[];
  context: string;
}

const AIScientist: React.FC<AIScientistProps> = ({ history, context }) => {
  const [insights, setInsights] = useState<ResearchInsight[]>([]);
  const [isSprinting, setIsSprinting] = useState(false);

  const startSprint = async () => {
    if (history.length < 5) return;
    setIsSprinting(true);
    try {
      const newInsights = await aiScientist.performResearchSprint(history.slice(-10), context);
      setInsights(prev => [...newInsights, ...prev]);
    } catch (err) {
      console.error("Sprint failed", err);
    } finally {
      setIsSprinting(false);
    }
  };

  const getAgentColor = (role: AgentRole) => {
    switch(role) {
      case 'Philologist': return 'text-purple-400 border-purple-900/30';
      case 'Acoustician': return 'text-cyan-400 border-cyan-900/30';
      case 'Synthesizer': return 'text-amber-400 border-amber-900/30';
    }
  };

  return (
    <div className="w-full max-w-5xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-8 bg-neutral-900/50 border border-neutral-800 rounded-[2rem]">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            <span className="w-3 h-3 bg-amber-500 rounded-full animate-pulse" />
            AI-Scientist Module
          </h2>
          <p className="text-xs text-neutral-500 mono uppercase tracking-widest font-bold">Automated Insight Discovery & Rosetta Synthesis</p>
        </div>
        <button 
          onClick={startSprint}
          disabled={isSprinting || history.length < 5}
          className={`px-8 py-3 rounded-full font-bold text-sm transition-all border-b-4 ${isSprinting ? 'bg-neutral-800 text-neutral-500 border-neutral-950 cursor-wait' : 'bg-amber-600 text-white border-amber-800 hover:bg-amber-500'}`}
        >
          {isSprinting ? 'EXECUTING RESEARCH SPRINT...' : 'INITIALIZE RESEARCH SPRINT'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.length === 0 && !isSprinting && (
          <div className="md:col-span-3 h-64 border border-dashed border-neutral-800 rounded-[2rem] flex flex-col items-center justify-center text-neutral-600 space-y-2 italic">
            <p className="text-sm">No research insights generated.</p>
            <p className="text-[10px] mono uppercase">Awaiting signal ingestion...</p>
          </div>
        )}

        {isSprinting && insights.length === 0 && (
          <div className="md:col-span-3 h-64 border border-dashed border-neutral-800 rounded-[2rem] flex flex-col items-center justify-center text-neutral-400 space-y-4">
             <div className="flex gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce delay-150"></div>
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce delay-300"></div>
             </div>
             <p className="text-xs mono uppercase tracking-widest animate-pulse">Agents Logos, Vibra, and Synthe are deliberating...</p>
          </div>
        )}

        {insights.map((insight) => (
          <div 
            key={insight.id} 
            className={`p-6 bg-black border rounded-3xl space-y-4 shadow-xl transition-all hover:scale-[1.02] ${getAgentColor(insight.agent)}`}
          >
            <div className="flex justify-between items-center">
              <span className="text-[10px] mono uppercase font-black px-2 py-0.5 rounded border border-current">{insight.agent}</span>
              <span className="text-[8px] text-neutral-500 mono">{new Date(insight.timestamp).toLocaleTimeString()}</span>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white leading-tight">"{insight.hypothesis}"</h4>
              <p className="text-xs text-neutral-400 leading-relaxed italic">Evidence: {insight.supportingData}</p>
              
              <div className="pt-4 border-t border-white/5">
                 <div className="text-[7px] uppercase font-black mb-1 opacity-50">Rosetta Core Bridge</div>
                 <p className="text-[10px] text-amber-200/80 leading-snug">{insight.connectionToRosettaStone}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIScientist;
