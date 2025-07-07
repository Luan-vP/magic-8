import { useState, useCallback, useRef } from 'react';
import { distortionPatterns } from '../utils/distortionPatterns';
import { analyzeTextWithWebLLM } from '../services/webLLMAnalyzer';
import { APP_CONFIG } from '../config/appConfig';
import type { DistortionResult, DistortionPattern } from '../types/distortion';
import type { MLCEngine } from '@mlc-ai/web-llm';

export const useDistortionAnalyzer = (engine?: MLCEngine | null) => {
  const [distortions, setDistortions] = useState<DistortionResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const processingTimeoutRef = useRef<number | null>(null);
  const currentRequestRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef<number>(0);

  // Core analysis function with WebLLM integration
  const analyzeText = useCallback(async (text: string) => {
    // Cancel any existing request
    if (currentRequestRef.current) {
      currentRequestRef.current.abort();
    }

    if (!text.trim()) {
      setDistortions([]);
      setIsProcessing(false);
      return;
    }

    // Create new abort controller for this request
    const abortController = new AbortController();
    currentRequestRef.current = abortController;
    
    // Generate unique request ID to prevent race conditions
    const requestId = ++requestIdRef.current;

    setIsProcessing(true);
    
    try {
      let results: DistortionResult[];

      // Use WebLLM if available, otherwise fallback to pattern matching
      if (engine) {
        console.log('Using WebLLM for analysis...');
        results = await analyzeTextWithWebLLM(text, engine, abortController.signal);
      } else {
        console.log('Using pattern matching for analysis...');
        results = await analyzeWithPatterns(text, abortController, requestId);
      }

      // Check if this request was cancelled or superseded
      if (abortController.signal.aborted || requestId !== requestIdRef.current) {
        return;
      }

      setDistortions(results);
      
    } catch (error) {
      // Don't update state if cancelled
      if (error instanceof Error && error.message === 'Analysis cancelled') {
        return;
      }
      // Handle other errors
      console.error('Analysis error:', error);
      setDistortions([]);
    } finally {
      // Only clear processing if this is still the current request
      if (requestId === requestIdRef.current) {
        setIsProcessing(false);
      }
      
      // Clear the abort controller if this was the current one
      if (currentRequestRef.current === abortController) {
        currentRequestRef.current = null;
      }
    }
  }, [engine]);

  // Fallback pattern matching analysis (your original logic)
  const analyzeWithPatterns = async (
    text: string, 
    abortController: AbortController, 
    requestId: number
  ): Promise<DistortionResult[]> => {
    // Simulate API delay
    await new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(resolve, 1000);
      
      // Listen for abort signal
      abortController.signal.addEventListener('abort', () => {
        clearTimeout(timeout);
        reject(new Error('Analysis cancelled'));
      });
    });

    // Check if this request was cancelled or superseded
    if (abortController.signal.aborted || requestId !== requestIdRef.current) {
      throw new Error('Analysis cancelled');
    }
    
    // Enhanced distortion detection using Meta-Model patterns
    const detectedDistortions: DistortionResult[] = [];
    
    // Process each category of distortions
    Object.entries(distortionPatterns).forEach(([category, subcategories]) => {
      // Check for cancellation during processing
      if (abortController.signal.aborted || requestId !== requestIdRef.current) {
        return;
      }
      
      Object.entries(subcategories).forEach(([subtype, config]) => {
        const typedConfig = config as DistortionPattern;
        typedConfig.patterns.forEach(pattern => {
          let match;
          const regex = new RegExp(pattern.source, pattern.flags);
          
          while ((match = regex.exec(text)) !== null) {
            // Check for cancellation during intensive processing
            if (abortController.signal.aborted || requestId !== requestIdRef.current) {
              return;
            }
            
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

    return uniqueDistortions;
  };

  // Debounced version - waits for pause in input before analyzing
  const analyzeTextDebounced = useCallback((text: string, delay = APP_CONFIG.analysis.debounceDelay) => {
    // Clear any pending analysis timeout
    if (processingTimeoutRef.current) {
      clearTimeout(processingTimeoutRef.current);
    }
    
    // Schedule new analysis
    processingTimeoutRef.current = window.setTimeout(() => {
      analyzeText(text);
    }, delay);
  }, [analyzeText]);

  // Clear any pending analysis (useful for cleanup)
  const cancelAnalysis = useCallback(() => {
    // Cancel pending timeout
    if (processingTimeoutRef.current) {
      clearTimeout(processingTimeoutRef.current);
      processingTimeoutRef.current = null;
    }
    
    // Cancel current request
    if (currentRequestRef.current) {
      currentRequestRef.current.abort();
      currentRequestRef.current = null;
    }
    
    setIsProcessing(false);
  }, []);

  return {
    analyzeText,           // Immediate analysis
    analyzeTextDebounced,  // Debounced analysis
    cancelAnalysis,        // Cancel pending analysis
    distortions,
    isProcessing
  };
};
