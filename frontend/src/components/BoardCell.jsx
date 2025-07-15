import React from 'react';

const BoardCell = ({ 
  row, 
  col, 
  hasQueen, 
  isHighlighted = false,
  onClick 
}) => {
  const isDark = (row + col) % 2 === 1;

  return (
    <div 
      className={`
        aspect-square w-full flex items-center justify-center
        transition-all duration-200 relative
        ${isDark ? 'bg-gray-800' : 'bg-white'}
        ${isHighlighted ? 'ring-2 ring-yellow-400' : ''}
        ${onClick ? 'cursor-pointer hover:brightness-110' : ''}
      `}
      onClick={onClick}
    >
      {hasQueen && (
        <div 
          className={`
            text-3xl md:text-4xl flex items-center justify-center
            ${isDark ? 'text-yellow-300' : 'text-gray-800'}
            transform transition-transform duration-300 
            ${isHighlighted ? 'scale-110' : 'scale-100'}
          `}
        >
          ♕
        </div>
      )}
    </div>
  );
};

export default BoardCell;
