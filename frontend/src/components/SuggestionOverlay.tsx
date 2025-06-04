import React from 'react';

interface SuggestionOverlayProps {
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  content: string;
  suggestion: string;
  cursorPosition: number;
}

const SuggestionOverlay: React.FC<SuggestionOverlayProps> = ({
  textareaRef,
  content,
  suggestion,
  cursorPosition,
}) => {
  if (!suggestion || !textareaRef.current) return null;

  const beforeCursor = content.slice(0, cursorPosition);
  const afterCursor = content.slice(cursorPosition);

  return (
    <div className="absolute top-0 left-0 w-full h-full p-6 pointer-events-none z-0">
      <div
        className="whitespace-pre-wrap text-base leading-relaxed font-sans text-transparent"
        style={{
          fontFamily: window.getComputedStyle(textareaRef.current).fontFamily,
          fontSize: window.getComputedStyle(textareaRef.current).fontSize,
          lineHeight: window.getComputedStyle(textareaRef.current).lineHeight,
          padding: window.getComputedStyle(textareaRef.current).padding,
        }}
      >
        <span>{beforeCursor}</span>
        <span className="text-gray-400">{suggestion}</span>
        <span>{afterCursor}</span>
      </div>
    </div>
  );
};

export default SuggestionOverlay;
