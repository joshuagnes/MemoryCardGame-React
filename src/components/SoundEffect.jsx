import { useState, useEffect, useCallback } from 'react';

const useSoundEffects = () => {
  const [sounds, setSounds] = useState({
    flip: null,
    victory: null,
  });

  useEffect(() => {
    setSounds({
      flip: new Audio('/src/assets/flip-sound.mp3'),
      victory: new Audio('/src/assets/victory-sound.mp3'),
    });
  }, []);

  const playSound = useCallback(
    (soundName, volume = 1) => {
      const sound = sounds[soundName];
      if (sound) {
        sound.currentTime = 0;
        sound.volume = volume;
        sound
          .play()
          .catch((error) => console.error('Error playing sound:', error));
      }
    },
    [sounds]
  );

  const playFlipSound = useCallback(() => {
    playSound('flip', 0.3);
  }, [playSound]);

  const playVictorySound = useCallback(() => {
    playSound('victory', 0.5);
  }, [playSound]);

  return { playFlipSound, playVictorySound };
};

export default useSoundEffects;
