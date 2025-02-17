import React from 'react';

const Card = ({ card, onClick }) => {
  return (
    <div 
      className={`item ${card.isOpen ? 'boxOpen' : ''} ${card.isMatched ? 'boxMatch' : ''}`} 
      onClick={onClick}
    >
      {card.isOpen || card.isMatched ? card.emoji : ''}
    </div>
  );
};

export default Card;
