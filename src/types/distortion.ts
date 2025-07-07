export interface DistortionResult {
  start: number;
  end: number;
  type: 'deletion' | 'distortion' | 'generalization';
  sub_type: string;
  cue_phrases: string[];
  question: string;
  confidence: number;
}

export interface DistortionPattern {
  patterns: RegExp[];
  questions: string[];
}

export interface DistortionCategory {
  [key: string]: DistortionPattern;
}

export interface DistortionPatterns {
  deletion: DistortionCategory;
  distortion: DistortionCategory;
  generalization: DistortionCategory;
}
