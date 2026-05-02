// src/app/store.ts
import { create } from 'zustand';
// Ensure these types exist in your ../shared/types file
import type { PlayerArc, Corridor } from '../shared/types';

/**
 * Valid phases for the application flow
 */
export type Phase = 'framing' | 'origin' | 'pipeline' | 'map';

interface AppStore {
  // Navigation State
  phase: Phase;
  setPhase: (phase: Phase) => void;
  
  // Pipeline/Financial State
  budget: number; 
  setBudget: (amount: number | ((prev: number) => number)) => void;

  // Selection State
  selectedCorridor: Corridor | null;
  setCorridor: (c: Corridor) => void;

  // Final Outcome State
  playerArc: PlayerArc | null;
  setPlayerArc: (arc: PlayerArc) => void;

  // Global Reset
  reset: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  // 1. Initial State: Starting at the Framing screen
  phase: 'framing', 
  setPhase: (phase) => set({ phase }),
  
  // 2. Budget: Set to $12,000 as discussed for the optimal "squeeze"
  budget: 12000, 
  setBudget: (amount) => set((state) => ({ 
    budget: typeof amount === 'function' ? amount(state.budget) : amount 
  })),

  // 3. Narrative Selections
  selectedCorridor: null,
  setCorridor: (selectedCorridor) => set({ selectedCorridor }),

  // 4. End-game State
  playerArc: null,
  setPlayerArc: (playerArc) => set({ playerArc }),

  /**
   * Resets the store to initial values for a new playthrough
   */
  reset: () => set({
    phase: 'framing',
    selectedCorridor: null,
    playerArc: null,
    budget: 12000,
  }),
}));