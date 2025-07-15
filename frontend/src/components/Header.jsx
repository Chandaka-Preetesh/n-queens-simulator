import React from 'react';
import { Check as Chess } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-green-500 text-white p-4 shadow-md">
      <div className="max-w-4xl mx-auto flex items-center gap-2">
        <Chess size={28} className="text-yellow-300" />
        <h1 className="text-xl md:text-2xl font-bold">N-Queens Solver</h1>
      </div>
    </header>
  );
};

export default Header;
