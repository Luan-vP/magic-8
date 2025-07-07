import type { DistortionResult } from '../types/distortion';
import type { MLCEngine } from '@mlc-ai/web-llm';
import { VERBOSE_ONESHOT_PROMPT_TEMPLATE, SIMPLE_JSON_OUTPUT_FORMAT } from '../prompts';

export const analyzeTextWithWebLLM = async (
  text: string, 
  engine: MLCEngine,
  signal?: AbortSignal
): Promise<DistortionResult[]> => {
  // Check for cancellation
  if (signal?.aborted) {
    throw new Error('Analysis cancelled');
  }

  // Build the complete prompt using your template
  const systemPrompt = VERBOSE_ONESHOT_PROMPT_TEMPLATE.replace(
    '{{output_format}}', 
    SIMPLE_JSON_OUTPUT_FORMAT
  );

  const userPrompt = text;

  const messages = [
    { role: "system" as const, content: systemPrompt },
    { role: "user" as const, content: userPrompt },
  ];

  try {
    const reply = await engine.chat.completions.create({
      messages,
      temperature: 0.3, // Lower temperature for more consistent analysis
      max_tokens: 2000,
      // Note: WebLLM doesn't support AbortSignal directly yet
      // We'll handle cancellation at the hook level
    });

    // Check for cancellation after API call
    if (signal?.aborted) {
      throw new Error('Analysis cancelled');
    }

    const responseContent = reply.choices[0]?.message?.content;
    if (!responseContent) {
      return [];
    }

    // Parse the JSON response
    try {
      const parsed = JSON.parse(responseContent);
      
      // Extract distortions from the expected format
      const distortions = parsed.distortions || [];
      
      // Convert to our internal format and validate
      if (Array.isArray(distortions)) {
        return distortions
          .map((d: any) => convertToDistortionResult(d, text))
          .filter((d): d is DistortionResult => d !== null);
      }
    } catch (parseError) {
      console.warn('Failed to parse WebLLM response as JSON:', parseError);
      console.log('Raw response:', responseContent);
      
      // Fallback: try to extract distortions from natural language response
      return parseNaturalLanguageResponse(responseContent, text);
    }

    return [];
    
  } catch (error) {
    if (error instanceof Error && error.message.includes('cancelled')) {
      throw error;
    }
    
    console.error('WebLLM analysis failed:', error);
    throw new Error('Analysis failed');
  }
};

// Convert from the prompt format to our internal DistortionResult format
const convertToDistortionResult = (distortion: any, originalText: string): DistortionResult | null => {
  try {
    // Find the positions of cue phrases in the original text
    const cuePhrase = distortion.cue_phrases?.[0];
    if (!cuePhrase || typeof cuePhrase !== 'string') {
      return null;
    }

    const startIndex = originalText.toLowerCase().indexOf(cuePhrase.toLowerCase());
    if (startIndex === -1) {
      return null;
    }

    return {
      start: startIndex,
      end: startIndex + cuePhrase.length,
      type: mapDistortionType(distortion.type),
      sub_type: distortion.sub_type || 'unknown',
      cue_phrases: Array.isArray(distortion.cue_phrases) ? distortion.cue_phrases : [cuePhrase],
      question: distortion.clarifying_question || 'Can you tell me more about this?',
      confidence: parseInt(distortion.confidence) || 3
    };
  } catch (error) {
    console.warn('Failed to convert distortion:', error, distortion);
    return null;
  }
};

// Map the prompt's distortion types to our internal types
const mapDistortionType = (type: string): 'deletion' | 'distortion' | 'generalization' => {
  const lowerType = type.toLowerCase();
  if (lowerType.includes('deletion')) return 'deletion';
  if (lowerType.includes('distortion')) return 'distortion';
  if (lowerType.includes('generalization')) return 'generalization';
  
  // Default fallback
  return 'generalization';
};

// Fallback parser for when WebLLM returns natural language instead of JSON
const parseNaturalLanguageResponse = (response: string, originalText: string): DistortionResult[] => {
  // This is a simple fallback - you could make it more sophisticated
  const distortions: DistortionResult[] = [];
  
  // Look for quoted text in the response that might be distortions
  const quotedTextRegex = /"([^"]+)"/g;
  let match;
  
  while ((match = quotedTextRegex.exec(response)) !== null) {
    const phrase = match[1];
    const startIndex = originalText.indexOf(phrase);
    
    if (startIndex !== -1) {
      distortions.push({
        start: startIndex,
        end: startIndex + phrase.length,
        type: 'generalization', // Default type
        sub_type: 'identified_by_llm',
        cue_phrases: [phrase],
        question: 'What specifically do you mean?',
        confidence: 3
      });
    }
  }
  
  return distortions;
};
