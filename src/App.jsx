import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import Header from './components/Header';
import MusicControls from './components/MusicControls';

const emojis = [
  '🐶', '🐶', '🐱', '🐱', '🐭', '🐭', '🐹', '🐹',
  '🐰', '🐰', '🦊', '🦊', '🐻', '🐻', '🐷', '🐷'
];

const App = () => {
  const [cards, setCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [totalMoves, setTotalMoves] = useState(() => {
    const savedTotalMoves = localStorage.getItem('totalMoves');
    return savedTotalMoves !== null ? parseInt(savedTotalMoves, 10) : 0;
  });
  const [gameCompleted, setGameCompleted] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const resetGame = () => {
    const shuffledEmojis = [...emojis].sort(() => Math.random() - 0.5);
    const newCards = shuffledEmojis.map((emoji, index) => ({ id: index, emoji, isOpen: false, isMatched: false }));
    setCards(newCards);
    setMoves(0);
    setTime(0);
    setGameCompleted(false);
    setIsTimerRunning(false);
  };

  useEffect(() => {
    resetGame(); // Initialize a new game when the component mounts
  }, []);

  useEffect(() => {
    localStorage.setItem('totalMoves', totalMoves.toString());
  }, [totalMoves]);

  useEffect(() => {
    let timer;
    if (isTimerRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning]);

  const incrementTotalMoves = () => {
    setTotalMoves((prevTotalMoves) => prevTotalMoves + 1);
  };

  return (
    <div className="container">
      <Header moves={moves} time={time} totalMoves={totalMoves} />
      <GameBoard 
        cards={cards} 
        setCards={setCards} 
        moves={moves} 
        setMoves={setMoves} 
        incrementTotalMoves={incrementTotalMoves}
        setIsTimerRunning={setIsTimerRunning} 
        gameCompleted={gameCompleted}
        setGameCompleted={setGameCompleted}
      />
      <button className="reset" onClick={resetGame}>New Game</button>
      <MusicControls />
    </div>
  );
};

export default App;