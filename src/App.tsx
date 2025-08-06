import './App.css'
import { CognitiveDistortionAnalyzer } from './CognitiveDistortionAnalyzer.tsx'
import { WebLLMProvider } from './contexts/WebLLMContext.tsx'

function App() {
  return (
    <WebLLMProvider>
      <div className="App">
        <header className="App-header">
          <h1>Cognitive Distortion Analyzer</h1>
        </header>
        <main>
          <div className="max-w-4xl mx-auto p-6 bg-white">
            <div className="mb-8">
              <p className="text-gray-600">
                Type your thoughts below. Cognitive distortions will be highlighted with different colors. 
                Hover over them to see clarifying questions.
              </p>
            </div>

            <div className="mb-6">
              <div className="flex gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1 bg-red-500"></div>
                  <span>Deletion</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1 bg-orange-500"></div>
                  <span>Distortion</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1 bg-purple-500"></div>
                  <span>Generalization</span>
                </div>
              </div>
            </div>
            <CognitiveDistortionAnalyzer />
          </div>
        </main>
        <footer>
        </footer>
      </div>
    </WebLLMProvider>
  )
}

export default App
