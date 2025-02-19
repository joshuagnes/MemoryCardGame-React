import React, { useState, useEffect, useCallback } from 'react';

const MusicControls = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    const backgroundMusic = document.getElementById('background-music');

    if (isPlaying) {
      backgroundMusic.pause();
    } else {
      backgroundMusic.play().catch((error) => {
        console.error('Autoplay blocked:', error);
      });
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <button className="music" onClick={toggleMusic}>
        {isPlaying ? 'Pause Music' : 'Play Music'}
      </button>

      <audio id="background-music" loop>
        <source
          src="https://joshuagnes.github.io/MemoryCardGame-React/backgroundMusic.mp3"
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>
    </>
  );
};

export default MusicControls;
