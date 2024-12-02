import { useState, useRef, useCallback } from 'react';

export default function useTypingEffect() {
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<number | null>(null);

  const playTypingEffect = useCallback((text: string, typingSpeed = 10) => {
    setIsTyping(true);
    setCurrentText(''); // Clear any previous text
    let index = -1;

    const typeCharacter = () => {
      if (index < text.length) {
        setCurrentText((prev) => prev + text.charAt(index)); // Use `charAt` to avoid `undefined`
        index += 1;
        typingTimeoutRef.current = window.setTimeout(typeCharacter, typingSpeed);
      } else {
        setIsTyping(false); // Typing finished
      }
    };

    // Start typing
    typeCharacter();
  }, []);

  const resetTypingEffect = useCallback(() => {
    setCurrentText('');
    setIsTyping(false);
    if (typingTimeoutRef.current !== null) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null; // Reset the ref
    }
  }, []);

  return {
    currentText,
    isTyping,
    playTypingEffect,
    resetTypingEffect,
  };
}
