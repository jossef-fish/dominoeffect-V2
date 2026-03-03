export interface PerformanceReport {
  hook_score: number;
  curiosity_gap_score: number;
  emotional_intensity_score: number;
  clarity_score: number;
  loop_potential_score: number;
  viral_probability_estimate: number;
  performance_summary: string;
  improvement_suggestions: string[];
  stronger_hook_variants: string[];
  recommended_structure: {
    "0-3_sec": string;
    "3-8_sec": string;
    "8-20_sec": string;
    "final_5_sec": string;
  };
}

export interface VideoInput {
  title: string;
  script: string;
  topic: string;
  audience: string;
  length: number;
}
