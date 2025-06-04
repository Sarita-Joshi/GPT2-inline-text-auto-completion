
import { useState, useCallback, useRef } from 'react';

interface UseSuggestionsReturn {
  suggestion: string;
  isLoading: boolean;
  fetchSuggestion: (prefix: string) => void;
  clearSuggestion: () => void;
}

export const useSuggestions = (): UseSuggestionsReturn => {
  const [suggestion, setSuggestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentRequestRef = useRef<AbortController | null>(null);

  const fetchSuggestion = useCallback((prefix: string) => {
    // Clear previous debounce timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Debounce the API call
    debounceTimeoutRef.current = setTimeout(async () => {
      try {
        // Abort previous request if it exists
        if (currentRequestRef.current) {
          currentRequestRef.current.abort();
        }

        // Create new abort controller
        currentRequestRef.current = new AbortController();
        
        setIsLoading(true);
        setSuggestion('');

        // Mock API call - replace with your actual endpoint
        const response = await fetch(`/api/suggest?prefix=${encodeURIComponent(prefix)}`, {
          signal: currentRequestRef.current.signal,
        });

        if (response.ok) {
          const data = await response.json();
          setSuggestion(data.suggestion || '');
        } else {
          // Fallback to mock suggestions for demo
          const mockSuggestions = generateMockSuggestion(prefix);
          setSuggestion(mockSuggestions);
        }
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error fetching suggestion:', error);
          // Fallback to mock suggestions
          const mockSuggestions = generateMockSuggestion(prefix);
          setSuggestion(mockSuggestions);
        }
      } finally {
        setIsLoading(false);
        currentRequestRef.current = null;
      }
    }, 300); // 300ms debounce
  }, []);

  const clearSuggestion = useCallback(() => {
    setSuggestion('');
    setIsLoading(false);
    
    // Clear debounce timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    // Abort current request
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

// Mock suggestion generator for demo purposes
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

  // Find matching suggestions
  for (const [key, values] of Object.entries(suggestions)) {
    if (lowercasePrefix.includes(key)) {
      return values[Math.floor(Math.random() * values.length)];
    }
  }

  // Generic fallbacks based on context
  if (lowercasePrefix.includes('meeting')) {
    return ' to discuss this further.';
  }
  if (lowercasePrefix.includes('project')) {
    return ' and provide updates as needed.';
  }
  if (lowercasePrefix.includes('question')) {
    return ' or concerns you might have.';
  }
  if (lowercasePrefix.includes('time')) {
    return ' that works best for your schedule.';
  }

  return ' and I look forward to your response.';
}
