import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { webLLMService } from '../services/webLLMService';
import { APP_CONFIG } from '../config/appConfig';
import type { MLCEngine } from '@mlc-ai/web-llm';

interface WebLLMContextType {
  engine: MLCEngine | null;
  isLoading: boolean;
  isReady: boolean;
  error: string | null;
  loadProgress: any;
  currentModel: string;
  availableModels: readonly string[];
  initializeEngine: (modelName?: string) => Promise<void>;
}

const WebLLMContext = createContext<WebLLMContextType | undefined>(undefined);

interface WebLLMProviderProps {
  children: ReactNode;
  autoLoad?: boolean; // Whether to start loading immediately
  defaultModel?: string; // Override default model
}

export const WebLLMProvider: React.FC<WebLLMProviderProps> = ({ 
  children, 
  autoLoad = APP_CONFIG.webLLM.autoLoad,
  defaultModel = APP_CONFIG.webLLM.defaultModel
}) => {
  const [engine, setEngine] = useState<MLCEngine | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadProgress, setLoadProgress] = useState<any>(null);
  const [currentModel, setCurrentModel] = useState<string>(defaultModel);

  const initializeEngine = async (modelName = currentModel) => {
    if (webLLMService.isReady() || webLLMService.isLoading()) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setCurrentModel(modelName);

    try {
      const engineInstance = await webLLMService.initialize(
        modelName,
        (progress) => {
          setLoadProgress(progress);
        }
      );
      setEngine(engineInstance);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to initialize WebLLM';
      setError(errorMessage);
      console.error('WebLLM initialization failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-load on mount if enabled
  useEffect(() => {
    if (autoLoad) {
      initializeEngine();
    }
  }, [autoLoad]);

  const value: WebLLMContextType = {
    engine,
    isLoading,
    isReady: webLLMService.isReady(),
    error,
    loadProgress,
    currentModel,
    availableModels: APP_CONFIG.webLLM.availableModels,
    initializeEngine,
  };

  return (
    <WebLLMContext.Provider value={value}>
      {children}
    </WebLLMContext.Provider>
  );
};

export const useWebLLM = (): WebLLMContextType => {
  const context = useContext(WebLLMContext);
  if (context === undefined) {
    throw new Error('useWebLLM must be used within a WebLLMProvider');
  }
  return context;
};
