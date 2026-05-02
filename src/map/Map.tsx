import { useCallback, useEffect, useState } from 'react';
import { dimArcs } from '@/shared/dimArcs';
import { failedArcs } from '@/shared/failedArcs';
import { famousPlayers } from '@/shared/players';
import { playSound, reveal } from '@/shared/sounds';
import { useAppStore } from '@/app/store';
import { ArcDetail } from './ArcDetail';
import { Globe, type HoveredArc, type MapMode } from './Globe';
import { PlayerArc } from './PlayerArc';

type MapProps = {
  mode?: MapMode;
};

type StoreShape = {
  phase: string;
};

type PlayerArcDatum = {
  kind: 'player';
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
};

export function Map({ mode = 'famous-only' }: MapProps) {
  const phase = useAppStore((state: StoreShape) => state.phase);
  const [hovered, setHovered] = useState<HoveredArc | null>(null);
  const [playerArc, setPlayerArc] = useState<PlayerArcDatum | null>(null);

  useEffect(() => {
    if (phase !== 'map') return undefined;

    const timers = famousPlayers.map((_, index) =>
      window.setTimeout(() => playSound(reveal), index * 400),
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [phase]);

  const handlePlayerArcReady = useCallback((arc: PlayerArcDatum | null) => {
    setPlayerArc(arc);
  }, []);

  if (phase !== 'map') return null;

  return (
    <section className="fixed inset-0 overflow-hidden bg-slate-950">
      <Globe
        famousPlayers={famousPlayers}
        failedArcs={failedArcs}
        dimArcs={dimArcs}
        mode={mode}
        playerArc={playerArc}
        onHover={setHovered}
      />
      <PlayerArc mode={mode} onArcReady={handlePlayerArcReady} />
      <ArcDetail hovered={hovered} />
    </section>
  );
}
