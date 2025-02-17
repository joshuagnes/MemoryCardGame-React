import React from 'react';
import Card from './Card';
import useSoundEffects from './SoundEffect';

const GameBoard = ({
  cards,
  setCards,
  moves,
  setMoves,
  setIsTimerRunning,
  gameCompleted,
  setGameCompleted,
}) => {
  const { playFlipSound, playVictorySound } = useSoundEffects();

  const handleCardClick = (clickedCard) => {
    if (clickedCard.isOpen || clickedCard.isMatched || gameCompleted) return;

    playFlipSound();

    const updatedCards = cards.map((card) =>
      card.id === clickedCard.id ? { ...card, isOpen: true } : card
    );

    const openCards = updatedCards.filter(
      (card) => card.isOpen && !card.isMatched
    );

    if (openCards.length === 2) {
      if (openCards[0].emoji === openCards[1].emoji) {
        openCards.forEach((card) => (card.isMatched = true));
      } else {
        setTimeout(() => {
          openCards.forEach((card) => (card.isOpen = false));
          setCards([...updatedCards]);
        }, 500);
      }
      setMoves(moves + 1);
    }

    if (!gameCompleted && updatedCards.every((card) => card.isMatched)) {
      setGameCompleted(true);
      playVictorySound();
      alert('YOU WIN!!');
      setIsTimerRunning(false);
    }

    if (!gameCompleted && moves === 0) {
      setIsTimerRunning(true);
    }

    setCards([...updatedCards]);
  };

  return (
    <div className="game">
      {cards.map((card) => (
        <Card key={card.id} card={card} onClick={() => handleCardClick(card)} />
      ))}
    </div>
  );
};

export default GameBoard;
