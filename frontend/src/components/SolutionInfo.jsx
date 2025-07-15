import React from 'react';

const SolutionInfo = ({ 
  currentStep, 
  boardSize,
  showingSolutions,
  solutionCount,
  currentSolutionIndex
}) => {
  if (!currentStep) return null;
  
  const getActionText = (step) => {
    switch (step.action) {
      case 'place':
        return `Placing queen at row ${step.position?.row + 1}, column ${step.position?.col + 1}`;
      case 'remove':
        return `Removing queen from row ${step.position?.row + 1}, column ${step.position?.col + 1} (backtracking)`;
      case 'solution':
        return `Solution #${step.solutionCount} found!`;
      case 'start':
        return 'Starting solution process...';
      default:
        return '';
    }
  };
  
  const getActionColor = (step) => {
    switch (step.action) {
      case 'place':
        return 'text-green-600';
      case 'remove':
        return 'text-red-600';
      case 'solution':
        return 'text-yellow-600 font-bold';
      default:
        return 'text-gray-700';
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto bg-white p-4 rounded-lg shadow-md">
      {showingSolutions ? (
        <>
          <h3 className="font-medium text-emerald-900 mb-2">Solution #{currentSolutionIndex + 1}</h3>
          <p className="text-gray-700">
            This is one of {solutionCount} possible solutions for placing {boardSize} queens 
            on a {boardSize}×{boardSize} board so that no queen can attack another.
          </p>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-emerald-900">Solution Progress</h3>
            <span className="text-sm text-gray-500">
              Step {currentStep.stepIndex + 1} of {currentStep.totalSteps}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div 
              className="bg-emerald-600 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${(currentStep.stepIndex / (currentStep.totalSteps - 1)) * 100}%` }}
            ></div>
          </div>
          
          <p className={`${getActionColor(currentStep)}`}>
            {getActionText(currentStep)}
          </p>
          
          <div className="mt-2 flex justify-between items-center">
            <span className="text-sm text-gray-600">
              Queens placed: {currentStep.board.flat().filter(Boolean).length}
            </span>
            <span className="text-sm font-medium text-emerald-700">
              Solutions found: {solutionCount}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default SolutionInfo;
