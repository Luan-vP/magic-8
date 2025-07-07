import React from 'react';

interface WebLLMLoaderProps {
  isLoading: boolean;
  loadProgress: any;
  error: string | null;
  onLoadClick: () => void;
}

export const WebLLMLoader: React.FC<WebLLMLoaderProps> = ({
  isLoading,
  loadProgress,
  error,
  onLoadClick
}) => {
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
        <div className="flex items-center">
          <div className="text-red-600 font-medium">Failed to load AI model</div>
        </div>
        <div className="text-red-600 text-sm mt-1">{error}</div>
        <button
          onClick={onLoadClick}
          className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3"></div>
          <div className="text-blue-600 font-medium">Loading AI model...</div>
        </div>
        {loadProgress && (
          <div className="mt-2">
            <div className="text-blue-600 text-sm">
              {loadProgress.text || 'Initializing...'}
            </div>
            {loadProgress.progress !== undefined && (
              <div className="w-full bg-blue-200 rounded-full h-2 mt-1">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(loadProgress.progress || 0) * 100}%` }}
                ></div>
              </div>
            )}
          </div>
        )}
        <div className="text-blue-600 text-xs mt-2">
          This may take a few minutes on first load...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-yellow-800 font-medium">AI model not loaded</div>
          <div className="text-yellow-700 text-sm">
            Load the AI model for enhanced distortion analysis
          </div>
        </div>
        <button
          onClick={onLoadClick}
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
        >
          Load AI Model
        </button>
      </div>
    </div>
  );
};
