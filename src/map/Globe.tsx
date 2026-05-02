import { useEffect, useRef, useState } from 'react';
import ReactGlobe from 'react-globe.gl';
import type { DimArc, FailedArc, FamousPlayer } from '@/shared/types';

export type MapMode = 'famous-only' | 'all';

export type HoveredArc =
  | { kind: 'famous'; data: FamousPlayer }
  | { kind: 'failed'; data: FailedArc }
  | { kind: 'dim'; data: DimArc }
  | { kind: 'player' };

type PlayerArcDatum = {
  kind: 'player';
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
};

type GlobeArc =
  | {
      kind: 'famous';
      data: FamousPlayer;
      startLat: number;
      startLng: number;
      endLat: number;
      endLng: number;
    }
  | {
      kind: 'failed';
      data: FailedArc;
      startLat: number;
      startLng: number;
      endLat: number;
      endLng: number;
    }
  | {
      kind: 'dim';
      data: DimArc;
      startLat: number;
      startLng: number;
      endLat: number;
      endLng: number;
    }
  | PlayerArcDatum;

type GlobeProps = {
  famousPlayers: FamousPlayer[];
  failedArcs: FailedArc[];
  dimArcs: DimArc[];
  mode: MapMode;
  playerArc?: PlayerArcDatum | null;
  onHover?: (hovered: HoveredArc | null) => void;
};

export function Globe({
  famousPlayers,
  failedArcs,
  dimArcs,
  mode,
  playerArc,
  onHover,
}: GlobeProps) {
  const globeRef = useRef<{ pointOfView: (position: object, duration?: number) => void } | null>(null);
  const [dimensions, setDimensions] = useState(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }));

  useEffect(() => {
    globeRef.current?.pointOfView({ lat: 43.65, lng: -79.38, altitude: 1.5 }, 0);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const famous = famousPlayers.map((player): GlobeArc => {
    const destination = player.finalLatLng ?? player.canadianLatLng;
    return {
      kind: 'famous',
      data: player,
      startLat: player.birthLatLng[0],
      startLng: player.birthLatLng[1],
      endLat: destination[0],
      endLng: destination[1],
    };
  });

  const failed = failedArcs.map((arc): GlobeArc => ({
    kind: 'failed',
    data: arc,
    startLat: arc.originLatLng[0],
    startLng: arc.originLatLng[1],
    endLat: arc.destLatLng[0],
    endLng: arc.destLatLng[1],
  }));

  const dim = dimArcs.map((arc): GlobeArc => ({
    kind: 'dim',
    data: arc,
    startLat: arc.from[0],
    startLng: arc.from[1],
    endLat: arc.to[0],
    endLng: arc.to[1],
  }));

  const arcs: GlobeArc[] =
    mode === 'famous-only'
      ? famous
      : [...dim, ...failed, ...(playerArc ? [playerArc] : []), ...famous];

  return (
    <ReactGlobe
      ref={globeRef}
      backgroundColor="#020617"
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      arcsData={arcs}
      arcStartLat="startLat"
      arcStartLng="startLng"
      arcEndLat="endLat"
      arcEndLng="endLng"
      arcColor={(arc) => getArcColor(arc as GlobeArc)}
      arcAltitude={(arc) => getArcAltitude(arc as GlobeArc)}
      arcStroke={(arc) => getArcStroke(arc as GlobeArc)}
      arcDashLength={(arc) => {
        const kind = (arc as GlobeArc).kind;
        if (kind === 'famous') return 0.72;
        if (kind === 'player') return 0.65;
        return 1;
      }}
      arcDashGap={(arc) => {
        const kind = (arc as GlobeArc).kind;
        if (kind === 'famous') return 0.28;
        if (kind === 'player') return 0.16;
        return 0;
      }}
      arcDashInitialGap={(arc) => ((arc as GlobeArc).kind === 'famous' ? 1 : 0)}
      arcDashAnimateTime={(arc) => {
        const kind = (arc as GlobeArc).kind;
        if (kind === 'famous') return 2200;
        if (kind === 'player') return 1400;
        return 0;
      }}
      onArcHover={(arc) => onHover?.(toHoveredArc(arc as GlobeArc | null))}
      atmosphereColor="#7dd3fc"
      atmosphereAltitude={0.18}
      width={dimensions.width}
      height={dimensions.height}
    />
  );
}

function getArcColor(arc: GlobeArc) {
  if (arc.kind === 'famous') return '#facc15';
  if (arc.kind === 'failed') return '#b45309';
  if (arc.kind === 'player') return '#fef3c7';
  return 'rgba(255,255,255,0.15)';
}

function getArcAltitude(arc: GlobeArc) {
  if (arc.kind === 'famous') return 0.34;
  if (arc.kind === 'player') return 0.24;
  if (arc.kind === 'failed') return 0.18;
  return 0.12;
}

function getArcStroke(arc: GlobeArc) {
  if (arc.kind === 'famous') return 1.4;
  if (arc.kind === 'player') return 0.95;
  if (arc.kind === 'failed') return 0.7;
  return 0.35;
}

function toHoveredArc(arc: GlobeArc | null): HoveredArc | null {
  if (!arc) return null;
  if (arc.kind === 'player') return { kind: 'player' };
  return { kind: arc.kind, data: arc.data } as HoveredArc;
}
