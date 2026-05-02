// src/pipeline/logic/outcome.ts
import type { PlayerArc, Corridor } from '../../shared/types';

interface OutcomeState {
  corridor: Corridor | null;
  budget: number;
  visibility: number;
  stress: number;
  currentDecision: number;
  decisionHistory: any[];
}

export const computeOutcome = (state: OutcomeState): PlayerArc => {
  const { budget, decisionHistory } = state;

  // 1. Check for Financial Failure (The "Priced Out" Terminal State)
  if (budget <= 0) {
    return {
      title: "THE DREAM IS PRICED OUT",
      message: "You haven't become that 'one in a million' success story. The financial barrier was simply too high. Between the $3,200 OPDL fees and travel costs, your journey ends at the kitchen table, not on the pitch.",
      exitAge: 15, 
      status: 'failed'
    } as any;
  }

  // 2. Check for Voluntary Exit
  const quitEarly = decisionHistory.some(h => h.choiceId === 'quit-team');
  if (quitEarly) {
    return {
      title: "PATH ABANDONED",
      message: "You made the difficult choice to step away. You recognized that the pressure on your family was unsustainable. You haven't become one in a million, but you've preserved your family's stability.",
      exitAge: 13,
      status: 'failed'
    } as any;
  }

  // 3. Success State (Completing the Pipeline)
  return {
    title: "THE FINAL HURDLE",
    message: "You finished the pipeline with money in the bank, but the scouts chose someone else. Even with the investment, you haven't become that 'one in a million' professional.",
    exitAge: 18,
    status: 'failed'
  } as any;
}; // This is the '}' that was likely missing!