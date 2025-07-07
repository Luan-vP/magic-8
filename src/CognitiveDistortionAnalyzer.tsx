import { useState } from 'react';
import { useDistortionAnalyzer } from './hooks/useDistortionAnalyzer';
import { useTooltip } from './hooks/useTooltip';
import { EditableTextArea } from './components/EditableTextArea';
import { Tooltip } from './components/Tooltip';

export const CognitiveDistortionAnalyzer = () => {
  const [inputText, setInputText] = useState('');
  const { analyzeTextDebounced, distortions, isProcessing } = useDistortionAnalyzer();
  const { tooltip, handleMouseEnter, handleMouseLeave } = useTooltip();

  const handleTextChange = (text: string) => {
    setInputText(text);
    analyzeTextDebounced(text); // Debounced analysis on text change
  };

  return (
    <div className="relative">
      <EditableTextArea
        inputText={inputText}
        distortions={distortions}
        isProcessing={isProcessing}
        onTextChange={handleTextChange}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      
      <Tooltip
        visible={tooltip.visible}
        x={tooltip.x}
        y={tooltip.y}
        question={tooltip.question}
      />
    </div>
  );
};

export default CognitiveDistortionAnalyzer;