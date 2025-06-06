
import React, { useState } from 'react';
import EmailComposer from '../components/EmailComposer';
import AboutSection from '../components/AboutSection';
import TechStackSection from '../components/TechStackSection';
import InsightsSection from '../components/InsightsSection';
import ThemeToggle from '../components/ThemeToggle';
import ModelSelector from '../components/ModelSelector';

const Index = () => {
  const [selectedModel, setSelectedModel] = useState<'t5' | 'gpt2'>('gpt2');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      {/* Header with theme toggle and model selector */}
      <header className="fixed top-4 right-4 z-50 flex items-center space-x-3">
        <ModelSelector selectedModel={selectedModel} onModelChange={setSelectedModel} />
        <a
          href="https://github.com/Sarita-Joshi/Smart-Email-Compose-GPT-2-and-T5"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg p-2 shadow-lg hover:shadow-xl transition-all duration-300"
          title="View on GitHub"
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-8 h-8 text-slate-600 dark:text-gray-300"
        >
          <path d="M12 0C5.37 0 0 5.373 0 12a12 12 0 008.205 11.387c.6.113.82-.26.82-.577v-2.234c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.775.42-1.305.763-1.605-2.665-.304-5.466-1.334-5.466-5.93 0-1.31.47-2.38 1.236-3.22-.124-.305-.536-1.526.117-3.176 0 0 1.01-.322 3.3 1.23a11.44 11.44 0 013.003-.404c1.02.005 2.045.138 3.003.404 2.29-1.553 3.297-1.23 3.297-1.23.655 1.65.243 2.87.12 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.805 5.624-5.478 5.92.432.373.817 1.103.817 2.223v3.293c0 .32.217.694.825.576A12.01 12.01 0 0024 12c0-6.627-5.373-12-12-12z" />
        </svg>
</a>

        <ThemeToggle />
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            AI Email Composer
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-2">
            Comparing T5 vs GPT-2 Models
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Experience intelligent autocomplete with two different AI architectures
          </p>
        </div>
        
        {/* Demo Section */}
        <div className="mb-16">
          <EmailComposer selectedModel={selectedModel} />
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Tech Stack Section */}
      <TechStackSection />

      {/* Insights Section */}
      <InsightsSection />

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Built with modern web technologies • AI Model Comparison Demo
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
