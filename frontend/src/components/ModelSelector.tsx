
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface ModelSelectorProps {
  selectedModel: 't5' | 'gpt2';
  onModelChange: (model: 't5' | 'gpt2') => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onModelChange }) => {
  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg px-4 py-2 shadow-lg">
      <div className="flex items-center space-x-3">
        <Label htmlFor="model-switch" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          T5
        </Label>
        <Switch
          id="model-switch"
          checked={selectedModel === 'gpt2'}
          onCheckedChange={(checked) => onModelChange(checked ? 'gpt2' : 't5')}
          className="data-[state=checked]:bg-blue-600"
        />
        <Label htmlFor="model-switch" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          GPT-2
        </Label>
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
        {selectedModel === 't5' ? 'Seq2Seq Model' : 'Decoder-Only Model'}
      </div>
    </div>
  );
};

export default ModelSelector;
