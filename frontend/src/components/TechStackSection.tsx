
import React from 'react';
import { Code, Server, Brain } from 'lucide-react';

const TechStackSection = () => {
  const frontendTech = [
    { name: 'React', description: 'Component-based UI library' },
    { name: 'TypeScript', description: 'Type-safe JavaScript' },
    { name: 'Tailwind CSS', description: 'Utility-first styling' },
    { name: 'Vite', description: 'Fast build tool' }
  ];

  const backendTech = [
    { name: 'FastAPI', description: 'High-performance Python web framework' },
    { name: 'REST API', description: 'RESTful service architecture' },
    { name: 'Python', description: 'Backend programming language' }
  ];

  const aiTech = [
    { name: 'GPT-2', description: 'Transformer-based language model' },
    { name: 'PyTorch', description: 'Deep learning framework' },
    { name: 'Transformers', description: 'Hugging Face model library' },
    { name: 'CUDA', description: 'GPU acceleration for faster inference' }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Built With Modern Tech
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Leveraging cutting-edge technologies for optimal performance and user experience
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Frontend */}
          <div className="bg-white dark:bg-slate-700 rounded-3xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-2xl p-3 mr-4">
                <Code className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Frontend</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Modern React application with TypeScript for type safety and Tailwind CSS for responsive design.
            </p>
            <div className="space-y-4">
              {frontendTech.map((tech, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{tech.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Backend */}
          <div className="bg-white dark:bg-slate-700 rounded-3xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 dark:bg-green-900/30 rounded-2xl p-3 mr-4">
                <Server className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Backend</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              High-performance FastAPI backend serving our AI models with efficient REST endpoints.
            </p>
            <div className="space-y-4">
              {backendTech.map((tech, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{tech.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI/ML */}
          <div className="bg-white dark:bg-slate-700 rounded-3xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 dark:bg-purple-900/30 rounded-2xl p-3 mr-4">
                <Brain className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">AI/ML</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Fine-tuned language models powered by PyTorch and optimized for email completion tasks.
            </p>
            <div className="space-y-4">
              {aiTech.map((tech, index) => (
                <div key={index} className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{tech.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
