import React, { useState } from 'react';
import { useAppStore } from '../app/store';
import { decisions, terminalDecisions } from './content/decisionContent';
import { DecisionCard } from './cards/DecisionCard';
import { MoneyMeter } from './cards/MoneyMeter';
import { OutcomeCard } from './cards/OutcomeCard';
import { computeOutcome } from './logic/outcome';

export const Pipeline = () => {
  const store = useAppStore();

  // Local state for the current question index and tracking the decision path
  const [currentDecision, setCurrentDecision] = useState(0);
  const [decisionHistory, setDecisionHistory] = useState<any[]>([]);
  const [isTerminal, setIsTerminal] = useState(false);

  const handleChoice = (choice: any) => {
    // 1. Calculate the new budget and clamp it at 0
    const newBudget = Math.max(0, store.budget + (choice.budgetDelta || 0));
    
    const choiceRecord = { 
      decisionId: isTerminal ? 'terminal-exit' : (decisions[currentDecision] as any).id, 
      choiceId: choice.id,
      budgetDelta: choice.budgetDelta || 0,
      visibilityDelta: choice.visibilityDelta || 0,
      stressDelta: choice.stressDelta || 0
    };

    const newHistory = [...decisionHistory, choiceRecord];
    
    // 2. Update the global store (Zustand)
    store.setBudget(newBudget);
    setDecisionHistory(newHistory);

    // 3. Logic for the "Kitchen Table" moment
    // If budget hits 0 and we aren't in terminal mode yet, switch to Terminal
    if (newBudget <= 0 && !isTerminal) {
      setIsTerminal(true);
      return;
    }

    // 4. Check if the game is officially over
    const isLast = currentDecision === decisions.length - 1;
    const quitEarly = choice.id === 'quit-team' || isTerminal;

    if (isLast || quitEarly) {
      // Trigger the outcome calculation in outcome.ts
      const finalArc = computeOutcome({
        corridor: store.selectedCorridor,
        budget: newBudget,
        visibility: 0, 
        stress: 0,
        currentDecision,
        decisionHistory: newHistory
      } as any);
      
      store.setPlayerArc(finalArc);
    } else {
      // Move to next question
      setCurrentDecision(prev => prev + 1);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden">
      {/* Financial Status UI */}
      <MoneyMeter />

      {/* RENDER NORMAL DECISION CARDS */}
      {!isTerminal && !store.playerArc && (
        <DecisionCard 
          decision={decisions[currentDecision] as any} 
          onChoose={handleChoice} 
        />
      )}

      {/* RENDER TERMINAL CARD (Budget hit 0) */}
      {isTerminal && !store.playerArc && (
        <DecisionCard 
          decision={terminalDecisions.standard as any} 
          onChoose={handleChoice} 
        />
      )}

      {/* FINAL NARRATIVE OUTCOME (The 4-second pause) */}
      {store.playerArc && <OutcomeCard />}
    </div>
  );
};