import React from 'react';
import { Play, Pause, SkipForward, SkipBack, FastForward, ChevronUp, ChevronDown } from 'lucide-react';

const Controls = ({
  boardSize,
  onBoardSizeChange,
  isPlaying,
  onPlayPause,
  onStepForward,
  onStepBackward,
  onReset,
  onSpeedChange,
  speed,
  isSolving,
  solutionCount,
  currentSolutionIndex,
  onPrevSolution,
  onNextSolution,
  showingSolutions
}) => {
  const handleSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    onBoardSizeChange(newSize);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-4 rounded-lg shadow-md space-y-4">
      <div className="space-y-2">
        <label className="flex items-center justify-between">
          <span className="font-medium text-emerald-900">Board Size: {boardSize}×{boardSize}</span>
          <span className="text-sm text-gray-500">{solutionCount > 0 ? `${solutionCount} solutions` : ''}</span>
        </label>
        <input
          type="range"
          min="4"
          max="10"
          value={boardSize}
          onChange={handleSizeChange}
          disabled={isSolving}
          className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
        />
      </div>

      {showingSolutions ? (
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={onPrevSolution}
            disabled={currentSolutionIndex <= 0}
            className={`
              flex items-center justify-center p-2 rounded-md
              ${currentSolutionIndex > 0 
                ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'}
            `}
          >
            <ChevronUp size={18} />
          </button>

          <span className="font-medium">
            Solution {currentSolutionIndex + 1} of {solutionCount}
          </span>

          <button
            onClick={onNextSolution}
            disabled={currentSolutionIndex >= solutionCount - 1}
            className={`
              flex items-center justify-center p-2 rounded-md
              ${currentSolutionIndex < solutionCount - 1 
                ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'}
            `}
          >
            <ChevronDown size={18} />
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={onStepBackward}
              disabled={isSolving && isPlaying}
              className={`
                p-2 rounded-md
                ${isSolving && !isPlaying 
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'}
              `}
            >
              <SkipBack size={18} />
            </button>

            <button
              onClick={onPlayPause}
              disabled={!isSolving}
              className={`
                flex items-center justify-center gap-1 px-4 py-2 rounded-md
                ${isSolving 
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'}
              `}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>

            <button
              onClick={onStepForward}
              disabled={isSolving && isPlaying}
              className={`
                p-2 rounded-md
                ${isSolving && !isPlaying 
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'}
              `}
            >
              <SkipForward size={18} />
            </button>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-sm text-gray-700">Speed:</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((speedLevel) => (
                <button
                  key={speedLevel}
                  onClick={() => onSpeedChange(speedLevel)}
                  disabled={!isSolving}
                  className={`
                    p-1 w-6 h-6 flex items-center justify-center rounded
                    ${speedLevel === speed 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
                    ${!isSolving ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  {speedLevel}
                </button>
              ))}
            </div>

            <button
              onClick={onReset}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
            >
              Reset
            </button>
          </div>
        </>
      )}

      <button
        onClick={onReset}
        className={`
          w-full py-2 px-4 rounded-md font-medium
          ${isSolving 
            ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
            : 'bg-emerald-600 text-white hover:bg-emerald-700'}
        `}
      >
        {isSolving ? 'Reset' : 'Solve'}
      </button>
    </div>
  );
};

export default Controls;
