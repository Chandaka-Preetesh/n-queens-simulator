import React from 'react';

export default function InfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative animate-fade-in">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold text-purple-800 mb-4">About This Project</h2>
        <p className="text-gray-700 leading-relaxed">
          This N-Queens visualizer demonstrates the <strong>backtracking algorithm</strong> used to solve
          the classic N-Queens problem. It allows users to step through the algorithm, explore different
          solutions, and understand how recursion and backtracking work in solving constraint-based problems.
        </p>
        <p className="text-gray-700 mt-4">
          Built using <strong>React</strong> and styled with <strong>Tailwind CSS</strong>, this app is designed
          for educational purposes and interactive learning.
        </p>
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-md transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
