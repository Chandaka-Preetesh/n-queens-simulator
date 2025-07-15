// Create an empty board of size n x n
export const createEmptyBoard = (n) => {
  return Array(n).fill(0).map(() => Array(n).fill(false));
};

// Check if a position is safe to place a queen
export const isSafe = (board, row, col) => {
  const n = board.length;
  
  // Check column
  for (let i = 0; i < row; i++) {
    if (board[i][col]) {
      return false;
    }
  }
  
  // Check upper left diagonal
  for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
    if (board[i][j]) {
      return false;
    }
  }
  
  // Check upper right diagonal
  for (let i = row, j = col; i >= 0 && j < n; i--, j++) {
    if (board[i][j]) {
      return false;
    }
  }
  
  return true;
};

// Deep clone a board
export const cloneBoard = (board) => {
  return board.map(row => [...row]);
};

// Solve the N-Queens problem and record steps
export const solveNQueens = (n) => {
  const steps = [];
  const board = createEmptyBoard(n);
  const solutions = [];
  
  steps.push({
    board: cloneBoard(board),
    action: 'start'
  });
  
  let solutionCount = 0;
  
  const solve = (row) => {
    if (row === n) {
      // Found a solution
      solutionCount++;
      solutions.push(cloneBoard(board));
      
      steps.push({
        board: cloneBoard(board),
        action: 'solution',
        solutionCount
      });
      
      return;
    }
    
    for (let col = 0; col < n; col++) {
      if (isSafe(board, row, col)) {
        // Place queen
        board[row][col] = true;
        
        steps.push({
          board: cloneBoard(board),
          position: { row, col },
          action: 'place'
        });
        
        // Recur to place rest of the queens
        solve(row + 1);
        
        // Backtrack
        board[row][col] = false;
        
        steps.push({
          board: cloneBoard(board),
          position: { row, col },
          action: 'remove'
        });
      }
    }
  };
  
  solve(0);
  return steps;
};

// Get all solutions for N-Queens problem
export const getAllSolutions = (n) => {
  const solutions = [];
  const board = createEmptyBoard(n);
  
  const solve = (row) => {
    if (row === n) {
      solutions.push(cloneBoard(board));
      return;
    }
    
    for (let col = 0; col < n; col++) {
      if (isSafe(board, row, col)) {
        board[row][col] = true;
        solve(row + 1);
        board[row][col] = false;
      }
    }
  };
  
  solve(0);
  return solutions;
};