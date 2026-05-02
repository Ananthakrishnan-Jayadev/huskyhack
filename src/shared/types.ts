// /src/shared/types.ts

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

export type AppPhase = 'title' | 'pipeline' | 'seam' | 'map';

// Game state DURING the pipeline (internal to Person A)
export type PipelineState = {
  corridor: Corridor | null;
  budget: number;
  visibility: number;
  stress: number;
  currentDecision: number;
  decisionHistory: DecisionChoice[];
};

export type DecisionChoice = {
  decisionId: string;
  choiceId: string;
  budgetDelta: number;
  visibilityDelta: number;
  stressDelta: number;
};