import { useState, useEffect, useCallback } from 'react';

const useSoundEffects = () => {
  const [sounds, setSounds] = useState({});

  useEffect(() => {
    const flipAudio = new Audio('/MemoryCardGame-React/flipcard.mp3');
    const victoryAudio = new Audio('/MemoryCardGame-React/victory-sound.mp3');

    flipAudio.preload = 'auto';
    victoryAudio.preload = 'auto';

    setSounds({
      flip: flipAudio,
      victory: victoryAudio,
    });

    return () => {
      flipAudio.src = '';
      victoryAudio.src = '';
    };
  }, []);

  const playSound = useCallback(
    (soundName, volume = 1) => {
      const sound = sounds[soundName];
      if (sound) {
        sound.volume = volume;
        sound.currentTime = 0;
        sound
          .play()
          .catch((error) => console.error('Error playing sound:', error));
      }
    },
    [sounds]
  );

  return {
    playFlipSound: () => playSound('flip', 0.3),
    playVictorySound: () => playSound('victory', 0.5),
  };
};

export default useSoundEffects;
