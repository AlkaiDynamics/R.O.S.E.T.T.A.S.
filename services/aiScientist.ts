
import { GoogleGenAI, Type } from "@google/genai";
import { AcousticToken, ResearchInsight, AgentRole } from '../types';

/**
 * AI-Scientist Service
 * Orchestrates a multi-agent framework to discover foundational principles
 * underlying sound, etymology, and geometry.
 */
export class AIScientist {
  private knowledgeBase: string = "Initial State: Seeking the lost Rosetta stone of acoustic meaning.";

  /**
   * Performs a collaborative research sprint across three specialized agents.
   */
  public async performResearchSprint(
    currentTokens: AcousticToken[],
    humanMetadata: string
  ): Promise<ResearchInsight[]> {
    const tokenTrace = currentTokens.map(t => t.label).join(' -> ');
    
    const roles: AgentRole[] = ['Philologist', 'Acoustician', 'Synthesizer'];
    const results = await Promise.all(roles.map(role => this.queryAgent(role, tokenTrace, humanMetadata)));
    
    // Update internal knowledge base with the new findings
    this.knowledgeBase += "\n" + results.map(r => r.hypothesis).join(' ');
    
    return results;
  }

  /**
   * Generates research insights from a specific agent role.
   * Instantiates GoogleGenAI per request to ensure use of current environment variables.
   */
  private async queryAgent(role: AgentRole, trace: string, metadata: string): Promise<ResearchInsight> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const systemInstructions = this.getAgentInstruction(role);
    
    const prompt = `
      CURRENT KNOWLEDGE: ${this.knowledgeBase}
      ACOUSTIC TRACE: ${trace}
      ENVIRONMENTAL METADATA: ${metadata}
      
      TASK: Based on your expertise, generate a new hypothesis connecting this signal to the 'Rosetta Stone' of universal communication.
    `;

    try {
      // Correct usage of generateContent with model and contents.
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: {
          systemInstruction: systemInstructions,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              hypothesis: { type: Type.STRING },
              supportingData: { type: Type.STRING },
              connectionToRosettaStone: { type: Type.STRING, description: 'How this finding brings us closer to the fundamental principle of communication' }
            },
            required: ["hypothesis", "supportingData", "connectionToRosettaStone"]
          }
        }
      });

      // Extract generated text directly from property .text
      const text = response.text || "{}";
      const parsed = JSON.parse(text);
      return {
        id: Math.random().toString(36).substr(2, 9),
        agent: role,
        timestamp: Date.now(),
        ...parsed
      };
    } catch (error) {
      console.error(`AI Scientist Agent (${role}) error:`, error);
      throw error;
    }
  }

  private getAgentInstruction(role: AgentRole): string {
    switch(role) {
      case 'Philologist':
        return "You are 'Agent Logos', a digital philologist. You study the etymology of sound and the evolution of linguistic structure. You seek isomorphisms between geometric standing waves and ancient phonemes.";
      case 'Acoustician':
        return "You are 'Agent Vibra', a theoretical acoustician. You specialize in the physics of resonance and the Helmholtz Wave Equation. You interpret signal topology as physical nucleus on information density.";
      case 'Synthesizer':
        return "You are 'Agent Synthe', the lead scientific coordinator. Your job is to connect the findings of Logos and Vibra to propose the 'Rosetta Stone'—the foundational principle underlying all matter-sound interaction.";
    }
  }
}

export const aiScientist = new AIScientist();
