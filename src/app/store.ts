import { create } from 'zustand';
import { corridors } from '@/shared/corridors';
import type { AppPhase, Corridor, PlayerArc } from '@/shared/types';

// CONFLICT RESOLUTION:
// Your branch had 'title' | 'seam' | 'map' (and 'pipeline' from types.ts)
// Their branch had 'framing' | 'origin' | 'pipeline' | 'map'
// Merged: union of both. The Pipeline could either route through global
// 'framing'/'origin' or manage them internally -- either way works because
// 'framing' and 'origin' are now valid phase strings.
//
// If types.ts already defines AppPhase as the union of all six strings,
// importing it directly is enough. If types.ts only has the original four,
// either update types.ts or use a local type here. We use the import
// and trust that types.ts has been updated to include all six.

type AppStore = {
  // Navigation
  phase: AppPhase;
  setPhase: (phase: AppPhase) => void;

  // Selection
  selectedCorridor: Corridor | null;
  selectCorridor: (corridor: Corridor) => void;

  // Pipeline financial state (from teammate's branch)
  budget: number;
  setBudget: (amount: number | ((prev: number) => number)) => void;

  // Outcome
  playerArc: PlayerArc | null;
  setPlayerArc: (playerArc: PlayerArc | null) => void;

  // Helpers
  startDemoMap: () => void; // dev shortcut -- jumps from any phase straight to the seam with default data
  reset: () => void;
};

const defaultCorridor = corridors[0] ?? null;
const STARTING_BUDGET = 12000;

const buildDefaultPlayerArc = (corridor: Corridor | null): PlayerArc | null => {
  if (!corridor) return null;
  return {
    corridorId: corridor.id,
    exitAge: 17,
    exitReason: 'aged-out',
    totalSpent: 18000,
    monthsInPipeline: 96,
  };
};

export const useAppStore = create<AppStore>((set) => ({
  // CONFLICT RESOLUTION:
  // Initial phase is 'title' (yours), not 'framing' (theirs).
  // 'title' is the user's first screen. 'framing' comes after Start.
  phase: 'title',

  // CONFLICT RESOLUTION:
  // Pre-select the default corridor (Liberia -> Edmonton).
  // This means if the user clicks through corridor selection without picking,
  // they land on the Davies family corridor -- which is the demo's intended
  // default per the spec.
  selectedCorridor: defaultCorridor,

  // CONFLICT RESOLUTION:
  // No pre-populated playerArc on initial load (theirs).
  // The playerArc gets written by the Pipeline outcome logic.
  // The startDemoMap helper still works because it generates a default arc on call.
  playerArc: null,

  // From teammate's branch -- budget tracking
  budget: STARTING_BUDGET,

  // Setters
  setPhase: (phase) => set({ phase }),
  selectCorridor: (corridor) => set({ selectedCorridor: corridor }),
  setBudget: (amount) =>
    set((state) => ({
      budget: typeof amount === 'function' ? amount(state.budget) : amount,
    })),
  setPlayerArc: (playerArc) => set({ playerArc }),

  // Dev shortcut from your branch -- useful for testing the map in isolation
  startDemoMap: () =>
    set((state) => {
      const corridor = state.selectedCorridor ?? defaultCorridor;
      return {
        phase: 'seam',
        selectedCorridor: corridor,
        playerArc: buildDefaultPlayerArc(corridor),
      };
    }),

  // Reset from teammate's branch -- for "play again" flows
  reset: () =>
    set({
      phase: 'title', // Reset to title (not 'framing') to match the new phase model
      selectedCorridor: defaultCorridor,
      playerArc: null,
      budget: STARTING_BUDGET,
    }),
}));
