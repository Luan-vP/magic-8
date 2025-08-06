import React, { useRef, useEffect } from 'react';
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
  const cursorPositionRef = useRef<number>(0);

  const saveCursorPosition = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0 && contentEditableRef.current) {
      const range = selection.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(contentEditableRef.current);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      cursorPositionRef.current = preCaretRange.toString().length;
    }
  };

  const restoreCursorPosition = () => {
    if (contentEditableRef.current && cursorPositionRef.current >= 0) {
      const selection = window.getSelection();
      if (selection) {
        const range = document.createRange();
        const textNode = contentEditableRef.current.firstChild;
        if (textNode && textNode.nodeType === Node.TEXT_NODE) {
          const maxPos = Math.min(cursorPositionRef.current, textNode.textContent?.length || 0);
          range.setStart(textNode, maxPos);
          range.setEnd(textNode, maxPos);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    }
  };

  const handleContentChange = () => {
    saveCursorPosition();
    const content = contentEditableRef.current;
    if (content) {
      const text = content.innerText || content.textContent || '';
      onTextChange(text);
    }
  };

  // Update the content only if it's different from what's currently in the DOM
  useEffect(() => {
    if (contentEditableRef.current) {
      const currentText = contentEditableRef.current.innerText || contentEditableRef.current.textContent || '';
      if (currentText !== inputText && !document.activeElement || document.activeElement !== contentEditableRef.current) {
        contentEditableRef.current.textContent = inputText;
      }
    }
  }, [inputText]);

  // Restore cursor position after render
  useEffect(() => {
    restoreCursorPosition();
  });

  return (
    <div className="relative">
      {/* Background layer with highlights */}
      <div
        className="absolute inset-0 w-full min-h-[200px] p-4 pointer-events-none whitespace-pre-wrap"
        style={{ fontSize: '16px', lineHeight: '1.5', color: 'transparent' }}
        dangerouslySetInnerHTML={{ __html: createHighlightedHTML(inputText, distortions) }}
      />
      
      {/* Foreground editable layer */}
      <div
        ref={contentEditableRef}
        contentEditable
        className="relative w-full min-h-[200px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-transparent whitespace-pre-wrap"
        style={{ fontSize: '16px', lineHeight: '1.5' }}
        onInput={handleContentChange}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
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
