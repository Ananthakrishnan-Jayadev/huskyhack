import { useEffect, useMemo, useRef } from 'react';
import { corridors } from '@/shared/corridors';
import { arcDraw, playSound } from '@/shared/sounds';
import { useAppStore } from '@/app/store';
import type { Corridor, PlayerArc as PlayerArcState } from '@/shared/types';
import type { MapMode } from './Globe';

type PlayerArcDatum = {
  kind: 'player';
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
};

type StoreShape = {
  playerArc: PlayerArcState | null;
  selectedCorridor: Corridor | null;
};

type PlayerArcProps = {
  mode: MapMode;
  onArcReady: (arc: PlayerArcDatum | null) => void;
};

export function PlayerArc({ mode, onArcReady }: PlayerArcProps) {
  const hasPlayed = useRef(false);
  const playerArc = useAppStore((state: StoreShape) => state.playerArc);
  const selectedCorridor = useAppStore((state: StoreShape) => state.selectedCorridor);

  const arc = useMemo(() => {
    if (mode !== 'all' || !playerArc || !selectedCorridor) return null;

    const corridor =
      selectedCorridor.id === playerArc.corridorId
        ? selectedCorridor
        : corridors.find((item) => item.id === playerArc.corridorId);

    if (!corridor) return null;

    return {
      kind: 'player' as const,
      startLat: corridor.originLatLng[0],
      startLng: corridor.originLatLng[1],
      endLat: corridor.canadianLatLng[0],
      endLng: corridor.canadianLatLng[1],
    };
  }, [mode, playerArc, selectedCorridor]);

  useEffect(() => {
    onArcReady(arc);

    if (arc && !hasPlayed.current) {
      hasPlayed.current = true;
      playSound(arcDraw);
    }
  }, [arc, onArcReady]);

  return null;
}
