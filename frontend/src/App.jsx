import React, { useState } from 'react';
import ChessBoard from './components/ChessBoard';
import Controls from './components/Controls';
import SolutionInfo from './components/SolutionInfo';
import Header from './components/Header';
import InfoModal from './components/InfoModal';
import { useNQueensSolver } from './hooks/useNQueensSolver';
import { GraduationCap, Grid3X3 } from 'lucide-react';

function App() {
  const {
    boardSize,
    solverState,
    showingSolutions,
    isModalOpen,
    setIsModalOpen,
    handleBoardSizeChange,
    handlePlayPause,
    handleStepForward,
    handleStepBackward,
    handleSpeedChange,
    handlePrevSolution,
    handleNextSolution,
    getCurrentBoard,
    getCurrentStep,
    handleSolveToggle,
  } = useNQueensSolver(8);

  const [currentBoard, highlightedPosition] = getCurrentBoard();
  const currentStep = getCurrentStep();

  const [viewMode, setViewMode] = useState('solve');

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <Header />

      <InfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <main className="flex-1 p-4 md:p-6 max-w-4xl mx-auto w-full">
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <h2 className="text-xl font-bold text-emerald-900 mb-2">The N-Queens Problem</h2>
          <p className="text-gray-700">
            Place {boardSize} queens on a {boardSize}×{boardSize} chess board so that no two queens threaten each other.
            Watch the backtracking algorithm solve this classic problem step by step.
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-md shadow inline-flex">
            <button
              className={`px-4 py-2 flex items-center gap-2 ${
                viewMode === 'solve' 
                  ? 'bg-emerald-600 text-white font-medium rounded-l-md' 
                  : 'text-gray-700 hover:bg-emerald-100 rounded-l-md'
              }`}
              onClick={() => setViewMode('solve')}
            >
              <Grid3X3 size={18} />
              Solve
            </button>
            <button
              className={`px-4 py-2 flex items-center gap-2 ${
                viewMode === 'learn' 
                  ? 'bg-emerald-600 text-white font-medium rounded-r-md' 
                  : 'text-gray-700 hover:bg-emerald-100 rounded-r-md'
              }`}
              onClick={() => setViewMode('learn')}
            >
              <GraduationCap size={18} />
              Learn
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <ChessBoard 
              boardState={currentBoard} 
              highlightPosition={highlightedPosition} 
            />

            <Controls
              boardSize={boardSize}
              onBoardSizeChange={handleBoardSizeChange}
              isPlaying={solverState.isPlaying}
              onPlayPause={handlePlayPause}
              onStepForward={handleStepForward}
              onStepBackward={handleStepBackward}
              onReset={handleSolveToggle}
              onSpeedChange={handleSpeedChange}
              speed={solverState.speed}
              isSolving={solverState.isSolving}
              solutionCount={solverState.solutionCount}
              currentSolutionIndex={solverState.currentSolutionIndex}
              onPrevSolution={handlePrevSolution}
              onNextSolution={handleNextSolution}
              showingSolutions={showingSolutions}
            />
          </div>

          {viewMode === 'learn' ? (
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-lg font-bold text-emerald-900 mb-3">How the Algorithm Works</h3>
              <div className="prose prose-sm max-w-none text-gray-650">
                <p>
                  The N-Queens problem is solved using <strong>backtracking</strong>, a recursive algorithm that builds solutions incrementally.
                </p>
                <ol className="list-decimal pl-5 space-y-2 mt-2">
                  <li><strong>Start</strong> with an empty board.</li>
                  <li><strong>Place a queen</strong> in the first available safe position in the current row.</li>
                  <li><strong>Move to the next row</strong> and repeat step 2.</li>
                  <li>If no safe position is found, <strong>backtrack</strong> to the previous row and try the next position.</li>
                  <li>When all rows have a queen, a <strong>solution is found</strong>.</li>
                  <li>Continue backtracking to find <strong>all possible solutions</strong>.</li>
                </ol>
                <p className="mt-3">
                  A position is <strong>safe</strong> if no other queen can attack it — meaning no queen is in the same column or diagonal.
                </p>
                <p className="mt-3">
                  The time complexity is O(n!), making it challenging for larger boards.
                </p>
              </div>
            </div>
          ) : (
            <SolutionInfo 
              currentStep={currentStep} 
              boardSize={boardSize} 
              showingSolutions={showingSolutions}
              solutionCount={solverState.solutionCount}
              currentSolutionIndex={solverState.currentSolutionIndex}
            />
          )}
        </div>
      </main>

      <footer className="bg-emerald-800 text-white py-4 text-center text-sm">
        <p>N-Queens Solver - A visual demonstration of the backtracking algorithm</p>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="text-emerald-200 hover:text-white underline mt-1"
        >
          About this project
        </button>
      </footer>
    </div>
  );
}

export default App;
