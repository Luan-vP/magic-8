// Application configuration
export const APP_CONFIG = {
  // WebLLM Configuration
  webLLM: {
    defaultModel: "Llama-3.2-3B-Instruct-q4f16_1-MLC",
    availableModels: [
      "Llama-3.2-3B-Instruct-q4f16_1-MLC",
    ],
    autoLoad: false, // Whether to load model on app start
  },
  
  // Analysis Configuration
  analysis: {
    debounceDelay: 500, // ms to wait before analyzing text
    maxTextLength: 10000, // max characters to analyze
  },
  
  // UI Configuration
  ui: {
    tooltipDelay: 200,
    animationDuration: 300,
  }
} as const;

// Type for the config
export type AppConfig = typeof APP_CONFIG;
