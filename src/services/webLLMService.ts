import { CreateMLCEngine, MLCEngine } from "@mlc-ai/web-llm";

// WebLLM Engine singleton
class WebLLMService {
  private static instance: WebLLMService;
  private engine: MLCEngine | null = null;
  private initPromise: Promise<MLCEngine> | null = null;
  private isInitializing = false;

  private constructor() {}

  static getInstance(): WebLLMService {
    if (!WebLLMService.instance) {
      WebLLMService.instance = new WebLLMService();
    }
    return WebLLMService.instance;
  }

  // Initialize the engine with progress tracking
  async initialize(
    selectedModel = "Llama-3.1-8B-Instruct-q4f32_1-MLC",
    onProgress?: (progress: any) => void
  ): Promise<MLCEngine> {
    // Return existing engine if already initialized
    if (this.engine) {
      return this.engine;
    }

    // Return existing promise if already initializing
    if (this.initPromise) {
      return this.initPromise;
    }

    // Start initialization
    this.isInitializing = true;
    
    this.initPromise = this.createEngine(selectedModel, onProgress);
    
    try {
      this.engine = await this.initPromise;
      this.isInitializing = false;
      return this.engine;
    } catch (error) {
      this.isInitializing = false;
      this.initPromise = null;
      throw error;
    }
  }

  private async createEngine(
    selectedModel: string,
    onProgress?: (progress: any) => void
  ): Promise<MLCEngine> {
    const initProgressCallback = (initProgress: any) => {
      console.log('WebLLM Loading:', initProgress);
      onProgress?.(initProgress);
    };

    return await CreateMLCEngine(
      selectedModel,
      { initProgressCallback }
    );
  }

  // Get engine if initialized, otherwise return null
  getEngine(): MLCEngine | null {
    return this.engine;
  }

  // Check if engine is ready
  isReady(): boolean {
    return this.engine !== null;
  }

  // Check if currently initializing
  isLoading(): boolean {
    return this.isInitializing;
  }

  // Lazy initialization - only loads when first needed
  async getOrInitializeEngine(): Promise<MLCEngine> {
    if (this.engine) {
      return this.engine;
    }
    return this.initialize();
  }
}

export const webLLMService = WebLLMService.getInstance();
