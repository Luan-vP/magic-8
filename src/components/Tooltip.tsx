import React from 'react';

interface TooltipProps {
  visible: boolean;
  x: number;
  y: number;
  question: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ visible, x, y, question }) => {
  if (!visible) return null;

  return (
    <div
      className="absolute z-10 bg-gray-800 text-white p-3 rounded-lg shadow-lg max-w-xs"
      style={{
        left: x,
        top: y,
        transform: 'translateX(-50%)'
      }}
    >
      <div className="text-sm font-medium mb-1">Meta-Model Question:</div>
      <div className="text-sm">{question}</div>
    </div>
  );
};
