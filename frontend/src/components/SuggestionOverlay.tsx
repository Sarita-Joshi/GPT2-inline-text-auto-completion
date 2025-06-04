import React, { useEffect, useState, RefObject } from 'react';

interface SuggestionOverlayProps {
  textareaRef: RefObject<HTMLTextAreaElement>;
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
  const [overlayStyle, setOverlayStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (!textareaRef.current || !suggestion) {
      return;
    }

    const textarea = textareaRef.current;
    const computedStyle = window.getComputedStyle(textarea);
    
    // Create a temporary div to measure text
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.visibility = 'hidden';
    tempDiv.style.whiteSpace = 'pre-wrap';
    tempDiv.style.wordWrap = 'break-word';
    tempDiv.style.font = computedStyle.font;
    tempDiv.style.fontSize = computedStyle.fontSize;
    tempDiv.style.fontFamily = computedStyle.fontFamily;
    tempDiv.style.lineHeight = computedStyle.lineHeight;
    tempDiv.style.padding = computedStyle.padding;
    tempDiv.style.border = computedStyle.border;
    tempDiv.style.width = computedStyle.width;
    tempDiv.style.boxSizing = computedStyle.boxSizing;
    
    document.body.appendChild(tempDiv);
    
    // Add text up to cursor position
    tempDiv.textContent = content.substring(0, cursorPosition);
    
    // Get the position
    const rect = tempDiv.getBoundingClientRect();
    const textareaRect = textarea.getBoundingClientRect();
    
    document.body.removeChild(tempDiv);
    
    // Calculate position relative to textarea
    const top = rect.height + parseInt(computedStyle.paddingTop);
    const left = parseInt(computedStyle.paddingLeft);
    
    setOverlayStyle({
      position: 'absolute',
      top: `${top}px`,
      left: `${left}px`,
      color: '#9ca3af',
      fontSize: computedStyle.fontSize,
      fontFamily: computedStyle.fontFamily,
      lineHeight: computedStyle.lineHeight,
      pointerEvents: 'none',
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
      zIndex: 5,
    });
  }, [content, cursorPosition, suggestion, textareaRef]);

  if (!suggestion) {
    return null;
  }

  return (
    <div style={overlayStyle}>
      {suggestion}
    </div>
  );
};

export default SuggestionOverlay;
