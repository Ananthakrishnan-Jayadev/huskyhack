import type { DimArc, FailedArc, FamousPlayer } from '@/shared/types';

export type MapMode = 'famous-only' | 'all';

export type SelectedMapItem =
  | { kind: 'famous'; data: FamousPlayer }
  | { kind: 'failed'; data: FailedArc }
  | { kind: 'dim'; data: DimArc }
  | { kind: 'player' }
  | null;

export type PlayerArcDatum = {
  kind: 'player';
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
};

export type ProjectionFn = (point: [number, number]) => [number, number] | null;
