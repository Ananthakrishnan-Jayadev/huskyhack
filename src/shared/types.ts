// /src/shared/types.ts
// LOCKED FILE. Do not modify, refactor, rename, or "improve."
// This is the integration contract between Pipeline and Map.

export type Corridor = {
  id: string;
  originCountry: string;
  originCity?: string;
  originLatLng: [number, number];
  arrivalYear: number;
  canadianCity: string;
  canadianLatLng: [number, number];
  context: string;
  realCorridorNote: string;
  hasFamousPlayer: boolean;
};

export type ExitReason =
  | 'priced-out'
  | 'aged-out'
  | 'family-pressure'
  | 'made-academy'
  | 'free-program-saved'
  | 'left-canada';

export type PlayerArc = {
  corridorId: string;
  exitAge: number;
  exitReason: ExitReason;
  totalSpent: number;
  monthsInPipeline: number;
};

export type FamousPlayer = {
  id: string;
  name: string;
  birthplace: string;
  birthLatLng: [number, number];
  transitPoint?: string;
  transitLatLng?: [number, number];
  canadianCity: string;
  canadianLatLng: [number, number];
  finalLatLng?: [number, number];
  arrivalYear: number;
  pathway: string;
  bypassedSystem: boolean;
  partialBypass?: boolean;
  story: string;
};

export type FailedArc = {
  id: string;
  label: string;
  isComposite: true;
  originLatLng: [number, number];
  destLatLng: [number, number];
  brokeAtAge: number;
  pattern: string;
  story: string;
  sourceNote: string;
};

export type DimArc = {
  id: string;
  from: [number, number];
  to: [number, number];
  corridorTag: string;
  year: number;
};

export type AppPhase = 'title' | 'pipeline' | 'seam' | 'map';
