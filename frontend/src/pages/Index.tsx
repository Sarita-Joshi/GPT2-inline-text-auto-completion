
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
