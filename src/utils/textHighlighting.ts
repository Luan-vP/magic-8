import type { DistortionResult } from '../types/distortion';

// Color mapping for Meta-Model distortion types
export const getDistortionColor = (type: DistortionResult['type']): string => {
  const colors = {
    'deletion': '#ef4444', // red
    'distortion': '#f97316', // orange
    'generalization': '#8b5cf6' // purple
  };
  return colors[type] || '#6b7280';
};

// Create highlighted HTML from text and distortions
export const createHighlightedHTML = (inputText: string, distortions: DistortionResult[]): string => {
  if (!inputText || distortions.length === 0) {
    return inputText;
  }

  // Sort distortions by start position
  const sortedDistortions = [...distortions].sort((a, b) => a.start - b.start);
  
  let html = '';
  let lastIndex = 0;

  sortedDistortions.forEach((distortion) => {
    // Add text before this distortion
    html += inputText.slice(lastIndex, distortion.start);
    
    // Add highlighted distortion
    html += `<span 
      class="distortion-highlight" 
      data-type="${distortion.type}"
      data-subtype="${distortion.sub_type || ''}"
      data-question="${distortion.question}"
      data-confidence="${distortion.confidence || 3}"
      style="text-decoration: underline; text-decoration-color: ${getDistortionColor(distortion.type)}; text-decoration-thickness: 2px;"
    >`;
    html += inputText.slice(distortion.start, distortion.end);
    html += '</span>';
    
    lastIndex = distortion.end;
  });

  // Add remaining text
  html += inputText.slice(lastIndex);
  
  return html;
};
