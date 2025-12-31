
import { GoogleGenAI, Type } from "@google/genai";
import { AcousticToken, SignalReport } from '../types';

export interface GroundedReport extends SignalReport {
  falsifiabilityWarning: string | null;
  confidenceInterval: number;
}

/**
 * Analyzes topological stream by grounding it in human-provided metadata.
 */
export const analyzeTopologicalStream = async (
  tokens: AcousticToken[], 
  humanContext: string = "Standard laboratory environment"
): Promise<GroundedReport> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const tokenString = tokens.slice(-15).map(t => t.label).join(', ');
  const prompt = `
    G.A.T.E. (Geometric Acoustic Topology Engine) - Signal Analysis
    Topological Sequence: [${tokenString}]
    Human Context/Metadata: ${humanContext}
    
    TASK: Provide a structural report on the isomorphism between this acoustic topology and known signal patterns.
    STRICT GUIDELINE: Avoid metaphysical or spiritual claims. Use Digital Signal Processing and Linguistic terminology.
    If the signal lacks structure, explicitly state it is stochastic.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            structuralAnalysis: { type: Type.STRING },
            comparativeContext: { type: Type.STRING },
            efficiencyRating: { type: Type.NUMBER },
            confidenceInterval: { type: Type.NUMBER, description: 'Statistical confidence in the pattern identification [0-1]' },
            falsifiabilityWarning: { type: Type.STRING, nullable: true, description: 'Warning if signal might be noise-induced artifact' }
          },
          required: ["structuralAnalysis", "comparativeContext", "efficiencyRating", "confidenceInterval", "falsifiabilityWarning"],
        },
      }
    });

    return JSON.parse(response.text) as GroundedReport;
  } catch (error) {
    console.error("G.A.T.E. Analysis Error:", error);
    return {
      structuralAnalysis: "Signal entropy exceeds structural thresholds for reliable analysis.",
      comparativeContext: "Stochastic background",
      efficiencyRating: 0.1,
      confidenceInterval: 0.0,
      falsifiabilityWarning: "High probability of stochastic hallucination."
    };
  }
};
