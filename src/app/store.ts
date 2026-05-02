import { create } from 'zustand';
import { corridors } from '@/shared/corridors';
import type { AppPhase, Corridor, PlayerArc } from '@/shared/types';

type AppStore = {
  phase: AppPhase;
  selectedCorridor: Corridor | null;
  playerArc: PlayerArc | null;
  setPhase: (phase: AppPhase) => void;
  selectCorridor: (corridor: Corridor) => void;
  setPlayerArc: (playerArc: PlayerArc | null) => void;
  startDemoMap: () => void;
};

const defaultCorridor = corridors[0] ?? null;

export const useAppStore = create<AppStore>((set) => ({
  phase: 'title',
  selectedCorridor: defaultCorridor,
  playerArc: defaultCorridor
    ? {
        corridorId: defaultCorridor.id,
        exitAge: 17,
        exitReason: 'aged-out',
        totalSpent: 18000,
        monthsInPipeline: 96,
      }
    : null,
  setPhase: (phase) => set({ phase }),
  selectCorridor: (corridor) => set({ selectedCorridor: corridor }),
  setPlayerArc: (playerArc) => set({ playerArc }),
  startDemoMap: () =>
    set((state) => {
      const corridor = state.selectedCorridor ?? defaultCorridor;

      return {
        phase: 'seam',
        selectedCorridor: corridor,
        playerArc: corridor
          ? {
              corridorId: corridor.id,
              exitAge: 17,
              exitReason: 'aged-out',
              totalSpent: 18000,
              monthsInPipeline: 96,
            }
          : null,
      };
    }),
}));
