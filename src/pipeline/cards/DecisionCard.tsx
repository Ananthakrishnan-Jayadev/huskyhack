import React from 'react';
import { motion } from 'framer-motion';

interface Choice {
  id: string;
  label: string;
  budgetDelta: number;
  // Adding these to match the logic in Pipeline.tsx
  visibilityDelta?: number;
  stressDelta?: number;
}

interface Props {
  decision: {
    id: string; // Added id
    age: number;
    framing: string;
    choices: Choice[];
    realDataNote: string;
  };
  onChoose: (choice: Choice) => void; // Renamed from onChoice to onChoose
}

export const DecisionCard = ({ decision, onChoose }: Props) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl max-w-md w-full"
    >
      <div className="text-emerald-500 font-mono text-xs mb-2">AGE {decision.age}</div>
      <h2 className="text-xl text-slate-100 font-serif italic mb-8 leading-relaxed">
        "{decision.framing}"
      </h2>

      <div className="space-y-3">
        {decision.choices.map((choice) => (
          <button
            key={choice.id}
            onClick={() => onChoose(choice)} // Updated to onChoose
            className="w-full text-left p-4 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-100 hover:text-slate-950 transition-all group"
          >
            <span className="font-medium">{choice.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-800 text-[10px] text-slate-500 uppercase tracking-widest leading-loose">
        Note: {decision.realDataNote}
      </div>
    </motion.div>
  );
};