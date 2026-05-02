import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../app/store';

const CORRIDORS = [
  { id: 'liberia', label: 'Liberia → Edmonton', year: '2008' },
  { id: 'jamaica', label: 'Jamaica → Brampton', year: '2000' },
  { id: 'punjab', label: 'Punjab → Brampton', year: '2010' },
  { id: 'syria', label: 'Syria → Mississauga', year: '2016' }
];

export const OriginCard = () => {
  const { setPhase, setCorridor } = useAppStore();
  // Liberia is pre-selected by default
  const [selected, setSelected] = useState('liberia');

  const handleBegin = () => {
    const corridor = CORRIDORS.find(c => c.id === selected);
    if (corridor) setCorridor(corridor as any);
    setPhase('pipeline');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl w-full px-6 text-center"
    >
      <h2 className="text-slate-400 font-mono text-xs tracking-[0.3em] uppercase mb-12">
        Corridor Selection
      </h2>
      
      <h1 className="text-3xl text-slate-100 font-serif mb-16">
        Where did you come from?
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
        {CORRIDORS.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelected(c.id)}
            className={`p-6 border text-left transition-all duration-300 ${
              selected === c.id 
                ? 'border-emerald-500 bg-emerald-500/10' 
                : 'border-slate-800 hover:border-slate-600 bg-slate-900/50'
            }`}
          >
            <div className="text-xs font-mono text-slate-500 mb-1">{c.year}</div>
            <div className={`text-lg ${selected === c.id ? 'text-emerald-400' : 'text-slate-300'}`}>
              {c.label}
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={handleBegin}
        className="px-16 py-4 bg-white text-slate-950 font-bold uppercase tracking-widest text-sm hover:bg-emerald-400 transition-colors"
      >
        Begin
      </button>
    </motion.div>
  );
};