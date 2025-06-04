
import React from 'react';
import { Brain, Mail, Zap, Target } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About This Project
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A demonstration of AI-powered email composition using fine-tuned language models
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Smart Email Autocomplete
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              This demo showcases a fine-tuned GPT-2 model trained on the Enron email dataset, 
              designed to mimic Gmail's Smart Compose feature for intelligent email autocomplete.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              The system provides real-time predictions as you type, helping users write professional 
              emails quickly and efficiently. It compares two different AI architectures to show their 
              strengths and weaknesses in email composition tasks.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Future goals include learning from individual user writing styles to provide even more 
              personalized and contextually appropriate suggestions.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-6 text-center">
              <Brain className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI-Powered</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Custom trained models for professional communication</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl p-6 text-center">
              <Zap className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Real-time</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Instant suggestions as you type</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-6 text-center">
              <Mail className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Email Focused</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Specialized for professional email composition</p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-2xl p-6 text-center">
              <Target className="h-12 w-12 text-orange-600 dark:text-orange-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Contextual</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Understanding context for better suggestions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
