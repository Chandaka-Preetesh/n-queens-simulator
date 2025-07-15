import { useState, useEffect, useRef, useCallback } from 'react';
import { createEmptyBoard, solveNQueens, getAllSolutions } from '../utils/nQueensSolver';

export const useNQueensSolver = (initialSize = 8) => {
  const [boardSize, setBoardSize] = useState(initialSize);
  const [solverState, setSolverState] = useState({
    steps: [],
    currentStepIndex: 0,
    speed: 3,
    isPlaying: false,
    isSolving: false,
    solutionCount: 0,
    solutions: [],
    currentSolutionIndex: 0,
  });
  
  const timerRef = useRef(null);
  const [showingSolutions, setShowingSolutions] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };
  
  // Handle solving the N-Queens problem
  const startSolving = useCallback(() => {
    const steps = solveNQueens(boardSize);
    const allSolutions = getAllSolutions(boardSize);
    
    setSolverState({
      steps,
      currentStepIndex: 0,
      speed: 3,
      isPlaying: true,
      isSolving: true,
      solutionCount: allSolutions.length,
      solutions: allSolutions,
      currentSolutionIndex: 0,
    });
    
    setShowingSolutions(false);
  }, [boardSize]);
  
  // Reset solving state
  const resetSolving = useCallback(() => {
    clearTimer();
    
    setSolverState({
      steps: [],
      currentStepIndex: 0,
      speed: 3,
      isPlaying: false,
      isSolving: false,
      solutionCount: 0,
      solutions: [],
      currentSolutionIndex: 0,
    });
    
    setShowingSolutions(false);
  }, []);
  
  // Toggle between solving and resetting
  const handleSolveToggle = useCallback(() => {
    if (solverState.isSolving) {
      resetSolving();
    } else {
      startSolving();
    }
  }, [solverState.isSolving, resetSolving, startSolving]);
  
  // Handle board size change
  const handleBoardSizeChange = useCallback((newSize) => {
    if (solverState.isSolving) {
      resetSolving();
    }
    setBoardSize(newSize);
  }, [solverState.isSolving, resetSolving]);
  
  // Handle play/pause
  const handlePlayPause = useCallback(() => {
    if (!solverState.isSolving) return;
    
    setSolverState((prev) => ({
      ...prev,
      isPlaying: !prev.isPlaying,
    }));
  }, [solverState.isSolving]);
  
  // Handle stepping forward
  const handleStepForward = useCallback(() => {
    if (!solverState.isSolving || solverState.isPlaying) return;
    
    setSolverState((prev) => {
      if (prev.currentStepIndex >= prev.steps.length - 1) return prev;
      
      return {
        ...prev,
        currentStepIndex: prev.currentStepIndex + 1,
      };
    });
  }, [solverState.isSolving, solverState.isPlaying]);
  
  // Handle stepping backward
  const handleStepBackward = useCallback(() => {
    if (!solverState.isSolving || solverState.isPlaying) return;
    
    setSolverState((prev) => {
      if (prev.currentStepIndex <= 0) return prev;
      
      return {
        ...prev,
        currentStepIndex: prev.currentStepIndex - 1,
      };
    });
  }, [solverState.isSolving, solverState.isPlaying]);
  
  // Handle speed change
  const handleSpeedChange = useCallback((speed) => {
    setSolverState((prev) => ({
      ...prev,
      speed,
    }));
  }, []);
  
  // Handle showing previous solution
  const handlePrevSolution = useCallback(() => {
    if (!showingSolutions) return;
    
    setSolverState((prev) => {
      if (prev.currentSolutionIndex <= 0) return prev;
      
      return {
        ...prev,
        currentSolutionIndex: prev.currentSolutionIndex - 1,
      };
    });
  }, [showingSolutions]);
  
  // Handle showing next solution
  const handleNextSolution = useCallback(() => {
    if (!showingSolutions) return;
    
    setSolverState((prev) => {
      if (prev.currentSolutionIndex >= prev.solutions.length - 1) return prev;
      
      return {
        ...prev,
        currentSolutionIndex: prev.currentSolutionIndex + 1,
      };
    });
  }, [showingSolutions]);
  
  // Get current board state and highlighted position
  const getCurrentBoard = useCallback(() => {
    if (showingSolutions && solverState.solutions.length > 0) {
      return [solverState.solutions[solverState.currentSolutionIndex], null];
    }
    
    if (solverState.steps.length === 0) {
      return [createEmptyBoard(boardSize), null];
    }
    
    const currentStep = solverState.steps[solverState.currentStepIndex];
    return [currentStep.board, currentStep.position];
  }, [boardSize, showingSolutions, solverState]);
  
  // Get current step information
  const getCurrentStep = useCallback(() => {
    if (solverState.steps.length === 0) return null;
    
    const step = solverState.steps[solverState.currentStepIndex];
    return {
      ...step,
      stepIndex: solverState.currentStepIndex,
      totalSteps: solverState.steps.length,
    };
  }, [solverState]);
  
  // Auto-advance steps when playing
  useEffect(() => {
    if (solverState.isPlaying && solverState.isSolving) {
      clearTimer();
      
      if (solverState.currentStepIndex < solverState.steps.length - 1) {
        // Calculate delay based on speed (1-5)
        // Speed 1: 1000ms, Speed 5: 50ms
        const delay = 1050 - (solverState.speed * 200);
        
        timerRef.current = window.setTimeout(() => {
          setSolverState((prev) => ({
            ...prev,
            currentStepIndex: prev.currentStepIndex + 1,
          }));
        }, delay);
      } else {
        // Reached the end, show solutions
        setSolverState((prev) => ({
          ...prev,
          isPlaying: false,
        }));
        
        setShowingSolutions(true);
      }
    }
    
    return () => clearTimer();
  }, [solverState.isPlaying, solverState.isSolving, solverState.currentStepIndex, solverState.steps.length, solverState.speed]);
  
  return {
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
  };
};