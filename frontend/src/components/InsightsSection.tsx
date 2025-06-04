
import React from 'react';
import { BarChart3, Zap, Target, Clock } from 'lucide-react';

const InsightsSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Model Comparison
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Understanding the differences between T5 and GPT-2 for email completion tasks
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* T5 Model */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-3xl p-8 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center mb-6">
              <div className="bg-blue-600 dark:bg-blue-500 rounded-2xl p-3 mr-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-300">T5 (Text-to-Text)</h3>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Architecture</h4>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Encoder-decoder architecture that excels at understanding context and generating 
                well-structured, complete sentences.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">High Accuracy:</span>
                  <span className="text-gray-600 dark:text-gray-300 ml-2">Maintains context and coherence</span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">Structured Output:</span>
                  <span className="text-gray-600 dark:text-gray-300 ml-2">Generates complete, well-formed sentences</span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">Slower Inference:</span>
                  <span className="text-gray-600 dark:text-gray-300 ml-2">Complex architecture requires more computation</span>
                </div>
              </div>
            </div>
          </div>

          {/* GPT-2 Model */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-8 border border-purple-200 dark:border-purple-800">
            <div className="flex items-center mb-6">
              <div className="bg-purple-600 dark:bg-purple-500 rounded-2xl p-3 mr-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-purple-800 dark:text-purple-300">GPT-2 (Generative)</h3>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Architecture</h4>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Decoder-only architecture that generates text faster and offers more creative 
                variations in email suggestions.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">Fast Generation:</span>
                  <span className="text-gray-600 dark:text-gray-300 ml-2">Quick response times for real-time use</span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">Creative Variety:</span>
                  <span className="text-gray-600 dark:text-gray-300 ml-2">Diverse and natural-sounding suggestions</span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">Context Drift:</span>
                  <span className="text-gray-600 dark:text-gray-300 ml-2">May occasionally lose focus or generate incomplete text</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Comparison */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-3xl p-8 border border-gray-200 dark:border-slate-600">
          <div className="flex items-center mb-6">
            <BarChart3 className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mr-3" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Performance Overview</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Clock className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Speed</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                GPT-2 provides faster inference for real-time applications
              </p>
            </div>
            
            <div className="text-center">
              <Target className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Accuracy</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                T5 excels in maintaining context and generating coherent completions
              </p>
            </div>
            
            <div className="text-center">
              <Zap className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-3" />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Use Case</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Choose based on whether you prioritize speed or accuracy
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
