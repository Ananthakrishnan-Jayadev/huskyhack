import React, { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useAppStore } from '../../app/store';

export const MoneyMeter = () => {
  // Pull the current budget from your global Zustand store
  const budget = useAppStore((state) => state.budget);
  
  // Create a spring-animated value for the "counting down" effect
  // This makes the money roll down like a slot machine
  const springValue = useSpring(budget ?? 8000, {
    stiffness: 50,
    damping: 15,
  });

  // Keep the spring in sync with the actual budget value
  useEffect(() => {
    springValue.set(budget ?? 8000);
  }, [budget, springValue]);

  // Format the animated number as Canadian Currency
  const displayValue = useTransform(springValue, (latest) => 
    Math.floor(latest).toLocaleString('en-CA', {
      style: 'currency',
      currency: 'CAD',
      maximumFractionDigits: 0,
    })
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-8 right-8 z-50 text-right"
    >
      <div className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-semibold mb-1">
        Family Savings
      </div>
      
      {/* The budget turns red as it approaches zero to increase stress */}
      <motion.div 
        className={`text-3xl font-mono font-bold tracking-tighter ${
          budget < 2000 ? 'text-red-500' : 'text-emerald-500'
        }`}
      >
        <motion.span>{displayValue}</motion.span>
      </motion.div>

      {/* Visual warning for low funds */}
      {budget < 1000 && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-[10px] text-red-600 font-bold mt-1 uppercase"
        >
          Insufficient Funds for Next Season
        </motion.p>
      )}
    </motion.div>
  );
};