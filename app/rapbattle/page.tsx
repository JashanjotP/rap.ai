'use client';

import { useState, useEffect, useRef } from 'react';
import useTypingEffect from './TypeEffect';
import { useBattle } from '@/contexts/BattleContext';
import { useObjectNames } from '@/contexts/ObjectsContext';
import Image from 'next/image';

export default function RapBattle() {
  const [battleRounds, setBattleRounds] = useState<{ lines: string[] }[]>([]);
  const [imageUrls, setImageUrls] = useState<{ object1: string | null; object2: string | null }>({
    object1: null,
    object2: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleTTS = async (line: string) => {
    try {
      const response = await fetch('/api/generatetts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: line }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to perform TTS.');
      }

      const audio = new Audio(data.audioUrl);
      await new Promise((resolve) => {
        audio.onended = resolve;
        audio.onerror = resolve;
        audio.play();
      });
    } catch (err) {
      console.error('TTS Error:', err);
    }
  };

  const { currentLine, isTyping, playTypingEffect } = useTypingEffect(handleTTS);
  const { battleData } = useBattle();
  const { objectNames } = useObjectNames();

  // Fetch the AI-generated image for a given object
  const fetchAIImage = async (objectName: string) => {
    try {
      const response = await fetch('/api/generateimage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ objectName }),
      });

      const data = await response.json();

      if (response.ok) {
        return data.imageUrl;
      } else {
        throw new Error(data.error || 'Failed to generate image.');
      }
    } catch (err) {
      console.error('Error:', err);
      throw new Error('An error occurred while generating the image.');
    }
  };

  const preloadImages = async () => {
    try {
      const [object1Image, object2Image] = await Promise.all([
        fetchAIImage(objectNames.object1),
        fetchAIImage(objectNames.object2),
      ]);
      setImageUrls({ object1: object1Image, object2: object2Image });
      setCurrentImage(object1Image); // Set the first image as default
    } catch (err) {
      setError(err.message || 'An error occurred while preloading images.');
    } finally {
      setLoading(false);
    }
  };

  const startRapBattle = async () => {
    if (!battleData || battleData.length === 0) {
      console.error('No battle data available');
      return;
    }

    const rounds = battleData.map((round) => ({
      lines: [
        `Welcome to round ${round.round}`,
        `${objectNames.object1}'s turn`,
        ...round.object1.split('\n'),
        `${objectNames.object2}'s turn`,
        ...round.object2.split('\n'),
      ],
    }));

    setBattleRounds(rounds);

    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Restart audio
      audioRef.current.play(); // Start background audio
      audioRef.current.volume = 0.5;
    }

    await playTypingEffect(rounds); // Trigger the typing effect
  };

  // Update the image based on the current line
  useEffect(() => {
    if (currentLine?.includes(`${objectNames.object1}'s turn`) && imageUrls.object1) {
      setCurrentImage(imageUrls.object1);
    } else if (currentLine?.includes(`${objectNames.object2}'s turn`) && imageUrls.object2) {
      setCurrentImage(imageUrls.object2);
    }
  }, [currentLine, imageUrls, objectNames]);

  useEffect(() => {
    preloadImages(); // Preload both images on component mount
  }, [objectNames]);


  return (
    <div style={{ paddingTop: '80px', padding: '20px' }}>
      <h1 style={{ paddingBottom: '7px' }}>
        {objectNames.object1} vs {objectNames.object2}
      </h1>
      <button
        onClick={startRapBattle}
        disabled={isTyping || loading}
        style={{
          backgroundColor: isTyping || loading ? 'gray' : 'blue',
          color: 'white',
          padding: '5px 10px',
          border: 'none',
          borderRadius: '5px',
          cursor: isTyping || loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Loading...' : isTyping ? 'Rapping...' : 'Start Rap Battle'}
      </button>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '20px',
        }}
      >
        <div
          style={{
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontFamily: 'monospace',
            marginBottom: '20px',
          }}
        >
          {currentLine || ' '}
        </div>

        {loading ? (
          <p>Loading images...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : currentImage ? (
          <Image
            src={currentImage}
            alt="Current rapper"
            width={300}
            height={300}
            style={{
              borderRadius: '10px',
              border: '2px solid black',
            }}
          />
        ) : (
          <p>No image available</p>
        )}
      </div>

      <audio ref={audioRef} loop>
        <source src="./rapbattle.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
