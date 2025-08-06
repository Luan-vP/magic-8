import React from 'react';
import './Tooltip.css';

interface TooltipProps {
  visible: boolean;
  x: number;
  y: number;
  question: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ visible, x, y, question }) => {
  if (!question) return null;

  return (
    <div
      className={`tooltip-container ${visible ? 'visible' : 'hidden'}`}
      style={{
        left: x,
        top: y - 60,
        transform: 'translateX(-50%)',
      }}
    >
      <div className="tooltip-content">
        <div className="tooltip-header">
          Meta-Model Question:
        </div>
        <div className="tooltip-text">{question}</div>
        <div className="tooltip-arrow" />
      </div>
    </div>
  );
};
