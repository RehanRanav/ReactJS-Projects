import React from 'react';
import Calc from './components/Calc_container';

function App() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-gray-600">
      <h1 className="font-bold underline font-mono text-lg text-slate-900 py-1">
        Scientific Calculator
      </h1>

      <Calc />

    </div>
  );
}

export default App;
