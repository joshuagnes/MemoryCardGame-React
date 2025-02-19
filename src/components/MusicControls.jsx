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

      <audio
        id="background-music"
        loop
        src="MemoryCardGame-React/backgroundMusic.mp3"
      ></audio>
    </>
  );
};

export default MusicControls;
