import { useState } from 'react';

const useTypingEffect = (onLineComplete: (line: string) => Promise<void>) => {
  const [currentLine, setCurrentLine] = useState<string | null>('');
  const [isTyping, setIsTyping] = useState(false);

  const playTypingEffect = async (battleRounds: { lines: string[] }[]) => {
    setIsTyping(true);

    for (const round of battleRounds) {
      for (const line of round.lines) {
        // Start typing the line and trigger TTS concurrently
        await Promise.all([
          typeLine(line),
          onLineComplete(line), // Start TTS while typing
        ]);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Pause after TTS and typing
      }
    }

    setCurrentLine(null);
    setIsTyping(false);
  };

  const typeLine = async (line: string) => {
    setCurrentLine(''); // Reset current line
    for (let i = 0; i <= line.length; i++) {
      setCurrentLine(line.slice(0, i));
      await new Promise((resolve) => setTimeout(resolve, 50)); // Typing speed
    }
  };

  return { currentLine, isTyping, playTypingEffect };
};

export default useTypingEffect;
