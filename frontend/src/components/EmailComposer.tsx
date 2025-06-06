
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SuggestionOverlay from './SuggestionOverlay';
import { useSuggestions } from '../hooks/useSuggestions';
import { useToast } from '../hooks/use-toast';

interface EmailComposerProps {
  selectedModel: 't5' | 'gpt2';
}

const EmailComposer: React.FC<EmailComposerProps> = ({ selectedModel }) => {
  const [content, setContent] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();
  
  const { suggestion, isLoading, fetchSuggestion, clearSuggestion } = useSuggestions();

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    setCursorPosition(e.target.selectionStart);
    
    // Clear suggestion if user deletes text
    if (newContent.length < content.length) {
      clearSuggestion();
      return;
    }
    
    // Get the text from cursor to beginning of current sentence/paragraph
    const textBeforeCursor = newContent.substring(0, e.target.selectionStart);
    // const lastSentence = textBeforeCursor.split(/[.!?]\s+/).pop() || '';
    const words = textBeforeCursor.trim().split(/\s+/);
    
    // Fetch suggestion if we have at least 2 words
    if (words.length >= 2 && words[words.length - 1].length > 0) {
      const prefix = words.slice(-10).join(' '); // Use last 3 words for context
      
      fetchSuggestion(prefix, selectedModel);
    } else {
      clearSuggestion();
    }
  }, [content, fetchSuggestion, clearSuggestion]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab' && suggestion) {
      e.preventDefault();

      // Clean up extra space at the join point
      const endsWithSpace = content.endsWith(' ');
      const startsWithSpace = suggestion.startsWith(' ');

      const joinedContent = endsWithSpace && startsWithSpace
        ? content + suggestion.trimStart()
        : content + suggestion;

      setContent(joinedContent);
      setCursorPosition(joinedContent.length);
      clearSuggestion();
      
      // Move cursor to end
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = newContent.length;
          textareaRef.current.selectionEnd = newContent.length;
          textareaRef.current.focus();
        }
      }, 0);
    }
    // Clear suggestion on Backspace or Escape
  if ((e.key === 'Backspace' || e.key === 'Escape') && suggestion) {
      clearSuggestion();
    }
  }, [suggestion, content, clearSuggestion]);

  const handleSend = () => {
    if (content.trim()) {
      toast({
        title: "Email sent!",
        description: "Your email has been sent successfully.",
      });
      setContent('');
      setCursorPosition(0);
      clearSuggestion();
    }
  };

  const handleClick = useCallback((e: React.MouseEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    setCursorPosition(target.selectionStart);
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-600 overflow-hidden transition-colors duration-300">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-slate-600 p-6 bg-gray-50 dark:bg-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 flex-1">
              <div className="flex items-center space-x-3 flex-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">To:</span>
                <input 
                  type="email" 
                  placeholder="recipient@example.com"
                  className="border-none outline-none bg-transparent text-sm text-gray-600 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 flex-1"
                />
              </div>
              <div className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full font-medium">
                Using {selectedModel.toUpperCase()} Model
              </div>
            </div>
          </div>
          <div>
            <input 
              type="text" 
              placeholder="Subject"
              className="w-full border-none outline-none bg-transparent text-sm text-gray-600 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>
        </div>

        {/* Compose Area */}
        <div className="relative">
        <div className="absolute top-0 left-0 w-full h-full p-6 pointer-events-none z-0 whitespace-pre-wrap text-base leading-relaxed font-sans text-gray-400">
          <span className="text-black dark:text-white">{content.slice(0, cursorPosition)}</span>
          <span className="text-gray-400">{suggestion}</span>
          <span>{content.slice(cursorPosition)}</span>
        </div>
          
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onClick={handleClick}
            className="relative z-10 w-full h-96 p-6 border-none outline-none resize-none bg-transparent text-base leading-relaxed text-black dark:text-white caret-blue-500"
            style={{ whiteSpace: 'pre-wrap' }}
          />
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="absolute top-4 right-4 z-20">
              <div className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>Thinking with {selectedModel.toUpperCase()}...</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-slate-600 p-6 bg-gray-50 dark:bg-slate-700">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {suggestion && (
                <span className="bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full font-medium">
                  Press Tab to accept suggestion
                </span>
              )}
            </div>
            <Button 
              onClick={handleSend}
              disabled={!content.trim()}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <Send className="h-4 w-4" />
              <span>Send</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailComposer;
