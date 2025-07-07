import { useState } from 'react';
import { useDistortionAnalyzer } from './hooks/useDistortionAnalyzer';
import { useTooltip } from './hooks/useTooltip';
import { useWebLLM } from './contexts/WebLLMContext';
import { EditableTextArea } from './components/EditableTextArea';
import { Tooltip } from './components/Tooltip';
import { WebLLMLoader } from './components/WebLLMLoader';
import { ModelSelector } from './components/ModelSelector';

export const CognitiveDistortionAnalyzer = () => {
  const [inputText, setInputText] = useState('');
  const { analyzeTextDebounced, distortions, isProcessing } = useDistortionAnalyzer();
  const { tooltip, handleMouseEnter, handleMouseLeave } = useTooltip();
  const { isLoading, isReady, error, loadProgress, initializeEngine } = useWebLLM();

  const handleTextChange = (text: string) => {
    setInputText(text);
    analyzeTextDebounced(text); // Debounced analysis on text change
  };

  return (
    <div className="relative">
      <ModelSelector />
      
      <WebLLMLoader
        isLoading={isLoading}
        loadProgress={loadProgress}
        error={error}
        onLoadClick={initializeEngine}
      />
      
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