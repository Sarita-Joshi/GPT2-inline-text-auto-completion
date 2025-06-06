import { useState, useCallback, useRef } from 'react';

interface UseSuggestionsReturn {
  suggestion: string;
  isLoading: boolean;
  fetchSuggestion: (prefix: string, model: string) => void;
  clearSuggestion: () => void;
}

export const useSuggestions = (): UseSuggestionsReturn => {
  const [suggestion, setSuggestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentRequestRef = useRef<AbortController | null>(null);

  const fetchSuggestion = useCallback((prefix: string, model: string) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(async () => {
      try {
        if (currentRequestRef.current) {
          currentRequestRef.current.abort();
        }

        currentRequestRef.current = new AbortController();

        setIsLoading(true);
        setSuggestion('');
        const needsSpace = !prefix.endsWith(' ');


        // ✅ Updated to use your localhost backend
        const response = await fetch(`http://localhost:8000/suggest?model=${model}&prefix=${encodeURIComponent(prefix)}`, {
          signal: currentRequestRef.current.signal,
        });

        if (response.ok) {
          const data = await response.json();
          const finalSuggestion = data.suggestion || '';
          setSuggestion(finalSuggestion);
        } 
        
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error fetching suggestion:', error);
          // const mockSuggestions = generateMockSuggestion(prefix);
          // setSuggestion(mockSuggestions);
        }
      } finally {
        setIsLoading(false);
        currentRequestRef.current = null;
      }
    }, 300);
  }, []);

  const clearSuggestion = useCallback(() => {
    setSuggestion('');
    setIsLoading(false);
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    if (currentRequestRef.current) {
      currentRequestRef.current.abort();
      currentRequestRef.current = null;
    }
  }, []);

  return {
    suggestion,
    isLoading,
    fetchSuggestion,
    clearSuggestion,
  };
};

function generateMockSuggestion(prefix: string): string {
  const lowercasePrefix = prefix.toLowerCase();

  const suggestions: Record<string, string[]> = {
    'thank you': [' for your time and consideration.', ' for reaching out to us.', ' for your prompt response.'],
    'i hope': [' this email finds you well.', ' you are doing great.', ' we can schedule a meeting soon.'],
    'please let': [' me know if you have any questions.', ' me know if this works for you.', ' me know your availability.'],
    'looking forward': [' to hearing from you.', ' to our meeting.', ' to your response.'],
    'i would': [' like to schedule a meeting.', ' appreciate your feedback.', ' be happy to discuss this further.'],
    'best': [' regards,', ' wishes,'],
    'kind': [' regards,'],
    'hope to': [' hear from you soon.', ' connect with you.'],
    'please feel': [' free to reach out if you have any questions.', ' free to contact me.'],
    'it was': [' great meeting you today.', ' wonderful to speak with you.'],
    'thank you for': [' your time today.', ' considering our proposal.', ' your patience.'],
  };

  for (const [key, values] of Object.entries(suggestions)) {
    if (lowercasePrefix.includes(key)) {
      return values[Math.floor(Math.random() * values.length)];
    }
  }

  if (lowercasePrefix.includes('meeting')) return ' to discuss this further.';
  if (lowercasePrefix.includes('project')) return ' and provide updates as needed.';
  if (lowercasePrefix.includes('question')) return ' or concerns you might have.';
  if (lowercasePrefix.includes('time')) return ' that works best for your schedule.';

  return ' and I look forward to your response.';
}
