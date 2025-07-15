import React from 'react';
import BoardCell from './BoardCell';

const ChessBoard = ({ 
  boardState, 
  highlightPosition = null,
  interactive = false,
  onCellClick 
}) => {
  const size = boardState.length;

  return (
    <div 
      className={`
        grid border-2 border-gray-800 shadow-lg
        w-full max-w-md mx-auto
      `}
      style={{ 
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        gridTemplateRows: `repeat(${size}, 1fr)`
      }}
    >
      {boardState.map((row, rowIndex) =>
        row.map((hasQueen, colIndex) => (
          <BoardCell
            key={`${rowIndex}-${colIndex}`}
            row={rowIndex}
            col={colIndex}
            hasQueen={hasQueen}
            isHighlighted={
              highlightPosition?.row === rowIndex && 
              highlightPosition?.col === colIndex
            }
            onClick={
              interactive && onCellClick 
                ? () => onCellClick(rowIndex, colIndex) 
                : undefined
            }
          />
        ))
      )}
    </div>
  );
};

export default ChessBoard;
