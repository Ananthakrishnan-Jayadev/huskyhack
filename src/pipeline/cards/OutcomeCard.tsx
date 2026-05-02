import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../app/store';

export const OutcomeCard = () => {
  const { playerArc, setPhase } = useAppStore();

  useEffect(() => {
    // This is the "magic" that moves the app to the map automatically
    const timer = setTimeout(() => {
      setPhase('map'); 
    }, 4500); // 4.5 seconds gives them time to read the message
    
    return () => clearTimeout(timer);
  }, [setPhase]);

  if (!playerArc) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="text-center p-12 max-w-lg mx-auto"
    >
      <h1 className="text-red-500 font-mono text-sm mb-4 tracking-widest uppercase">
        SYSTEM EXIT // AGE {playerArc.exitAge}
      </h1>
      
      <p className="text-2xl text-slate-100 font-serif italic mb-8 leading-relaxed">
        "{playerArc.message}"
      </p>

      {/* Narrative Progress Bar: This tells the user "something is happening" */}
      <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 4.5, ease: "linear" }}
          className="h-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]"
        />
      </div>
      
      <p className="mt-4 text-slate-500 text-xs uppercase tracking-tighter">
        Connecting to global migration dataset...
      </p>
    </motion.div>
  );
};