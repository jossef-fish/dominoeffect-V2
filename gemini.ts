import { GoogleGenAI, Type } from "@google/genai";
import { PerformanceReport, VideoInput } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generatePerformanceReport(input: VideoInput): Promise<PerformanceReport> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the following short-form video data and provide a detailed performance intelligence report.
    
    Video Title: ${input.title}
    First 5 Seconds Script: ${input.script}
    Topic: ${input.topic}
    Target Audience: ${input.audience}
    Video Length: ${input.length} seconds

    Scoring Rules:
    - Immediate tension increases hook_score
    - Clear curiosity gap increases viral_probability_estimate
    - Generic phrasing reduces clarity_score
    - Emotional escalation increases retention probability
    - Loop potential requires replay trigger or unresolved tension
    - Specificity increases performance potential

    Tone: Analytical, data-driven, professional creator intelligence engine.`,
    config: {
      systemInstruction: "You are a professional social media performance analyst. You provide data-driven insights for short-form content creators. Always justify your scoring.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          hook_score: { type: Type.NUMBER },
          curiosity_gap_score: { type: Type.NUMBER },
          emotional_intensity_score: { type: Type.NUMBER },
          clarity_score: { type: Type.NUMBER },
          loop_potential_score: { type: Type.NUMBER },
          viral_probability_estimate: { type: Type.NUMBER },
          performance_summary: { type: Type.STRING },
          improvement_suggestions: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          stronger_hook_variants: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          recommended_structure: {
            type: Type.OBJECT,
            properties: {
              "0-3_sec": { type: Type.STRING },
              "3-8_sec": { type: Type.STRING },
              "8-20_sec": { type: Type.STRING },
              "final_5_sec": { type: Type.STRING }
            },
            required: ["0-3_sec", "3-8_sec", "8-20_sec", "final_5_sec"]
          }
        },
        required: [
          "hook_score", "curiosity_gap_score", "emotional_intensity_score", 
          "clarity_score", "loop_potential_score", "viral_probability_estimate",
          "performance_summary", "improvement_suggestions", "stronger_hook_variants",
          "recommended_structure"
        ]
      }
    }
  });

  return JSON.parse(response.text || "{}");
}
