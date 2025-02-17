import React, { useState, useEffect, useCallback } from 'react';

const MusicControls = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const toggleMusic = () => {
    const backgroundMusic = document.getElementById('background-music');
    const flipSound = document.getElementById('flip-sound');
    const victorySound = document.getElementById('victory-sound');
  

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
    
      <audio id="background-music" loop src="/src/assets/Fluffing-a-Duck(chosic.com).mp3"></audio>
      
    </>
  );
};

export default MusicControls;
