import React from 'react';
import { useWebLLM } from '../contexts/WebLLMContext';

export const ModelSelector: React.FC = () => {
  const { currentModel, availableModels, initializeEngine, isLoading, isReady } = useWebLLM();

  const handleModelChange = async (modelName: string) => {
    if (modelName !== currentModel && !isLoading) {
      await initializeEngine(modelName);
    }
  };

  return (
    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900">AI Model</h3>
          <p className="text-xs text-gray-600">
            {isReady ? `Loaded: ${currentModel}` : 'No model loaded'}
          </p>
        </div>
        
        <select
          value={currentModel}
          onChange={(e) => handleModelChange(e.target.value)}
          disabled={isLoading}
          className="ml-4 px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {availableModels.map((model) => (
            <option key={model} value={model}>
              {model.replace('-q4f32_1-MLC', '').replace('-q4f16_1-MLC', '')}
            </option>
          ))}
        </select>
      </div>
      
      {!isReady && !isLoading && (
        <div className="mt-2 text-xs text-amber-600">
          💡 Select a model and click "Load AI Model" to enable advanced analysis
        </div>
      )}
    </div>
  );
};
