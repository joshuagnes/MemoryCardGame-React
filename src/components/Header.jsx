import React, { useEffect, useState } from 'react';

const Header = ({ moves, time }) => {
  const [totalMoves, setTotalMoves] = useState(() => {
    const storedTotalMoves = localStorage.getItem('totalMoves');
    return storedTotalMoves ? parseInt(storedTotalMoves, 10) : 0;
  });

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'totalMoves') {
        setTotalMoves(parseInt(e.newValue, 10));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (moves > 0) {
      const newTotalMoves = totalMoves + 1;
      localStorage.setItem('totalMoves', newTotalMoves.toString());
      setTotalMoves(newTotalMoves);
    }
  }, [moves]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <header>
      <h2>Memory Game</h2>
      <div className="counting">
        <div>
          Total Moves: <span>{totalMoves}</span>
        </div>
        <div>
          Moves: <span>{moves}</span>
        </div>
        <div>
          Time: <span>{formatTime(time)}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
