import React from 'react';
import { useAppStore } from './app/store';
import { FramingCard } from './pipeline/cards/FramingCard';
import { OriginCard } from './pipeline/cards/OriginCard'; // Ensure this path is correct
import { Pipeline } from './pipeline/Pipeline';

function App() {
  const { phase } = useAppStore();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center overflow-hidden">
      {/* 1. Framing Screen */}
      {phase === 'framing' && <FramingCard />}
      
      {/* 2. REAL Origin Selection Screen */}
      {phase === 'origin' && <OriginCard />}
      
      {/* 3. The Pipeline (Game) */}
      {phase === 'pipeline' && <Pipeline />}
      
      {/* 4. Global Map */}
      {phase === 'map' && <div className="text-white">Transitioning...</div>}
    </main>
  );
}

export default App;