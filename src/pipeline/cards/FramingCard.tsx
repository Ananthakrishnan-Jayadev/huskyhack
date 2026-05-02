import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../app/store';

export const FramingCard = () => {
  const { setPhase } = useAppStore();

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="max-w-xl text-center px-6"
    >
      <div className="space-y-6 text-slate-100 font-serif italic text-xl leading-relaxed">
        <p>You arrived in Canada with a son.</p>
        <p>He is eight. He has just discovered football.</p>
        <p>Over the next eight years, you will make four decisions about whether he keeps playing.</p>
        <p className="text-red-400 font-bold not-italic font-sans uppercase tracking-widest text-sm">
          The decisions are about money.
        </p>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }} // Forced pause to ensure they read
        onClick={() => setPhase('origin')}
        className="mt-12 px-12 py-3 border border-slate-700 hover:bg-white hover:text-slate-950 transition-all duration-500 text-sm tracking-widest uppercase"
      >
        Continue
      </motion.button>
    </motion.div>
  );
};