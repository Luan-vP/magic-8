import React, { useState } from 'react';

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  question: string;
}

export const useTooltip = () => {
  const [tooltip, setTooltip] = useState<TooltipState>({ 
    visible: false, 
    x: 0, 
    y: 0, 
    question: '' 
  });

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('distortion-highlight')) {
      const rect = target.getBoundingClientRect();
      setTooltip({
        visible: true,
        x: rect.left + window.scrollX,
        y: rect.bottom + window.scrollY + 5,
        question: target.getAttribute('data-question') || ''
      });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('distortion-highlight')) {
      setTooltip({ visible: false, x: 0, y: 0, question: '' });
    }
  };

  return {
    tooltip,
    handleMouseEnter,
    handleMouseLeave
  };
};
