import React, { useRef } from 'react';
import { createHighlightedHTML } from '../utils/textHighlighting';
import type { DistortionResult } from '../types/distortion';

interface EditableTextAreaProps {
  inputText: string;
  distortions: DistortionResult[];
  isProcessing: boolean;
  onTextChange: (text: string) => void;
  onMouseEnter: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave: (e: React.MouseEvent<HTMLElement>) => void;
}

export const EditableTextArea: React.FC<EditableTextAreaProps> = ({
  inputText,
  distortions,
  isProcessing,
  onTextChange,
  onMouseEnter,
  onMouseLeave
}) => {
  const contentEditableRef = useRef<HTMLDivElement>(null);

  const handleContentChange = () => {
    const content = contentEditableRef.current;
    if (content) {
      const text = content.innerText || content.textContent || '';
      onTextChange(text);
    }
  };

  return (
    <div className="relative">
      <div
        ref={contentEditableRef}
        contentEditable
        className="w-full min-h-[200px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        style={{ fontSize: '16px', lineHeight: '1.5' }}
        onInput={handleContentChange}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        dangerouslySetInnerHTML={{ __html: createHighlightedHTML(inputText, distortions) }}
        suppressContentEditableWarning={true}
      />
      
      {isProcessing && (
        <div className="absolute top-2 right-2 text-sm text-gray-500">
          Analyzing...
        </div>
      )}
    </div>
  );
};
