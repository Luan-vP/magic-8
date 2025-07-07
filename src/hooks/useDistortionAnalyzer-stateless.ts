import { useState, useCallback, useRef } from 'react';
import { distortionPatterns } from '../utils/distortionPatterns';
import type { DistortionResult, DistortionPattern } from '../types/distortion';

// Stateless version - function receives input
export const useDistortionAnalyzer = () => {
  const [distortions, setDistortions] = useState<DistortionResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const processingTimeoutRef = useRef<number | null>(null);

  const analyzeText = useCallback(async (text: string) => {
    // Clear any pending analysis
    if (processingTimeoutRef.current) {
      clearTimeout(processingTimeoutRef.current);
    }

    if (!text.trim()) {
      setDistortions([]);
      return;
    }

    setIsProcessing(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Enhanced distortion detection using Meta-Model patterns
    const detectedDistortions: DistortionResult[] = [];
    
    // Process each category of distortions
    Object.entries(distortionPatterns).forEach(([category, subcategories]) => {
      Object.entries(subcategories).forEach(([subtype, config]) => {
        const typedConfig = config as DistortionPattern;
        typedConfig.patterns.forEach(pattern => {
          let match;
          const regex = new RegExp(pattern.source, pattern.flags);
          
          while ((match = regex.exec(text)) !== null) {
            const randomQuestion = typedConfig.questions[Math.floor(Math.random() * typedConfig.questions.length)];
            
            detectedDistortions.push({
              start: match.index,
              end: match.index + match[0].length,
              type: category as 'deletion' | 'distortion' | 'generalization',
              sub_type: subtype,
              cue_phrases: [match[0]],
              question: randomQuestion,
              confidence: Math.floor(Math.random() * 3) + 3 // 3-5 confidence
            });
          }
        });
      });
    });

    // Remove overlapping distortions (keep the first one)
    const uniqueDistortions: DistortionResult[] = [];
    detectedDistortions.sort((a, b) => a.start - b.start);
    
    detectedDistortions.forEach(distortion => {
      const overlaps = uniqueDistortions.some(existing => 
        (distortion.start >= existing.start && distortion.start < existing.end) ||
        (distortion.end > existing.start && distortion.end <= existing.end)
      );
      
      if (!overlaps) {
        uniqueDistortions.push(distortion);
      }
    });

    setDistortions(uniqueDistortions);
    setIsProcessing(false);
  }, []);

  // Debounced version for real-time analysis
  const analyzeTextDebounced = useCallback((text: string, delay = 500) => {
    if (processingTimeoutRef.current) {
      clearTimeout(processingTimeoutRef.current);
    }
    
    processingTimeoutRef.current = window.setTimeout(() => {
      analyzeText(text);
    }, delay);
  }, [analyzeText]);

  return {
    analyzeText,
    analyzeTextDebounced,
    distortions,
    isProcessing
  };
};
