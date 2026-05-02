import { useRef, useState, type PointerEvent, type WheelEvent } from 'react';
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

type GlobeProps = {
  famousPlayers: FamousPlayer[];
  failedArcs: FailedArc[];
  dimArcs: DimArc[];
  mode: MapMode;
  playerArc?: PlayerArcDatum | null;
  onHover?: (hovered: HoveredArc | null) => void;
};

type Point = {
  x: number;
  y: number;
};

type DragState = {
  pointerId: number;
  startClient: Point;
  startPan: Point;
};

type DimCluster = {
  tag: string;
  count: number;
  sample: DimArc;
  point: Point;
};

const canadaBounds = {
  west: -141,
  east: -52,
  north: 70,
  south: 41,
};

const markerOffsets: Point[] = [
  { x: 0, y: 0 },
  { x: 2.4, y: -4 },
  { x: -2.8, y: 3.4 },
  { x: 5.4, y: 1.8 },
  { x: -5.2, y: -1.7 },
  { x: 1.2, y: 6.2 },
  { x: 5.9, y: -4.5 },
  { x: -6.1, y: 5.7 },
  { x: 8, y: -0.4 },
  { x: -8, y: -4.6 },
  { x: 3.2, y: 8 },
  { x: -2.6, y: -7.8 },
];

export function Globe({
  famousPlayers,
  failedArcs,
  dimArcs,
  mode,
  playerArc,
  onHover,
}: GlobeProps) {
  const dimClusters = mode === 'all' ? clusterDimArcs(dimArcs) : [];
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState<Point>({ x: 0, y: 0 });
  const [drag, setDrag] = useState<DragState | null>(null);

  const updateScale = (nextScale: number) => {
    setScale(clamp(nextScale, 1, 3.8));
  };

  const resetView = () => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    updateScale(scale + (event.deltaY < 0 ? 0.18 : -0.18));
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    setDrag({
      pointerId: event.pointerId,
      startClient: { x: event.clientX, y: event.clientY },
      startPan: pan,
    });
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag || drag.pointerId !== event.pointerId || !viewportRef.current) return;

    const rect = viewportRef.current.getBoundingClientRect();
    const dx = ((event.clientX - drag.startClient.x) / rect.width) * 100;
    const dy = ((event.clientY - drag.startClient.y) / rect.height) * 100;

    setPan({
      x: clamp(drag.startPan.x + dx, -70, 70),
      y: clamp(drag.startPan.y + dy, -55, 55),
    });
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (drag?.pointerId === event.pointerId) setDrag(null);
  };

  return (
    <div className="relative h-full min-h-screen w-full overflow-hidden bg-[#020617] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(14,165,233,0.16),transparent_34%),radial-gradient(circle_at_76%_62%,rgba(250,204,21,0.1),transparent_28%)]" />
      <div className="absolute left-6 top-6 z-10 max-w-md">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-300/90">
          Canada map
        </p>
        <h2 className="mt-2 text-3xl font-black leading-tight md:text-4xl">
          The routes end here.
        </h2>
        <p className="mt-3 max-w-sm text-sm leading-6 text-white/60">
          The world is still in the data. The visual punch is Canada: a handful
          of cities carrying thousands of almost-stories.
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-6 top-36 mx-auto max-w-7xl px-4 md:top-24">
        <div className="relative h-full">
          <div
            ref={viewportRef}
            className="relative h-full w-full touch-none cursor-grab overflow-hidden rounded-2xl border border-sky-200/10 bg-slate-900/25 shadow-[0_35px_100px_rgba(0,0,0,0.45)] backdrop-blur-sm active:cursor-grabbing"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onWheel={handleWheel}
          >
            <div className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded border border-white/10 bg-black/45 p-1 backdrop-blur">
              <button
                className="h-8 w-8 rounded text-lg font-bold text-white/80 hover:bg-white/10"
                type="button"
                onClick={() => updateScale(scale - 0.35)}
                aria-label="Zoom out"
              >
                -
              </button>
              <button
                className="h-8 rounded px-3 text-xs font-bold uppercase tracking-wide text-white/70 hover:bg-white/10"
                type="button"
                onClick={resetView}
              >
                Reset
              </button>
              <button
                className="h-8 w-8 rounded text-lg font-bold text-white/80 hover:bg-white/10"
                type="button"
                onClick={() => updateScale(scale + 0.35)}
                aria-label="Zoom in"
              >
                +
              </button>
            </div>
            <svg
              className="absolute inset-0 h-full w-full overflow-visible"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <g transform={`translate(${pan.x} ${pan.y}) scale(${scale})`}>
                <CanadaBase />
                {mode === 'all' &&
                  dimClusters.map((cluster) => (
                    <DimPulse
                      key={cluster.tag}
                      cluster={cluster}
                      onHover={onHover}
                    />
                  ))}
                {mode === 'all' &&
                  failedArcs.map((arc) => (
                    <FailedRoute
                      key={arc.id}
                      arc={arc}
                      onHover={onHover}
                    />
                  ))}
                {mode === 'all' && playerArc && (
                  <PlayerRoute playerArc={playerArc} onHover={onHover} />
                )}
                {famousPlayers.map((player, index) => (
                  <FamousMarker
                    key={player.id}
                    index={index}
                    player={player}
                    onHover={onHover}
                  />
                ))}
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function CanadaBase() {
  return (
    <g
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="canadaLand" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#1f4b63" />
          <stop offset="52%" stopColor="#18364a" />
          <stop offset="100%" stopColor="#0f2537" />
        </linearGradient>
        <filter id="landShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" floodColor="#38bdf8" floodOpacity="0.22" stdDeviation="2" />
        </filter>
      </defs>
      <path
        d="M3 41 L8 36 L15 34 L22 28 L31 27 L38 22 L45 25 L53 18 L61 21 L70 18 L79 23 L88 25 L96 31 L94 39 L86 42 L80 48 L76 57 L69 61 L61 59 L54 65 L45 63 L37 68 L30 65 L23 70 L15 67 L10 60 L5 55 Z"
        fill="url(#canadaLand)"
        filter="url(#landShadow)"
        opacity="0.95"
      />
      <path
        d="M3 41 L8 36 L15 34 L22 28 L31 27 L38 22 L45 25 L53 18 L61 21 L70 18 L79 23 L88 25 L96 31 L94 39 L86 42 L80 48 L76 57 L69 61 L61 59 L54 65 L45 63 L37 68 L30 65 L23 70 L15 67 L10 60 L5 55 Z"
        fill="none"
        stroke="rgba(186,230,253,0.28)"
        strokeWidth="0.45"
      />
      <g opacity="0.25" stroke="rgba(255,255,255,0.35)" strokeWidth="0.14">
        <path d="M14 36 L22 65" />
        <path d="M31 28 L36 67" />
        <path d="M49 24 L51 64" />
        <path d="M67 20 L66 60" />
        <path d="M84 26 L74 57" />
      </g>
    </g>
  );
}

function DimPulse({
  cluster,
  onHover,
}: {
  cluster: DimCluster;
  onHover?: (hovered: HoveredArc | null) => void;
}) {
  const radius = Math.min(7.5, 2.4 + Math.sqrt(cluster.count) * 0.42);

  return (
    <g
      className="cursor-pointer"
      onMouseEnter={() => onHover?.({ kind: 'dim', data: cluster.sample })}
      onMouseLeave={() => onHover?.(null)}
    >
      <circle
        cx={cluster.point.x}
        cy={cluster.point.y}
        r={radius}
        fill="rgba(255,255,255,0.08)"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="0.18"
      />
      <circle
        cx={cluster.point.x}
        cy={cluster.point.y}
        r={Math.max(0.7, radius * 0.26)}
        fill="rgba(226,232,240,0.75)"
      />
    </g>
  );
}

function FailedRoute({
  arc,
  onHover,
}: {
  arc: FailedArc;
  onHover?: (hovered: HoveredArc | null) => void;
}) {
  const destination = projectCanada(arc.destLatLng);
  const entry = projectEntry(arc.originLatLng, destination);

  return (
    <g
      className="cursor-pointer"
      onMouseEnter={() => onHover?.({ kind: 'failed', data: arc })}
      onMouseLeave={() => onHover?.(null)}
    >
      <path
        d={curvePath(entry, destination, -10)}
        fill="none"
        stroke="rgba(180,83,9,0.58)"
        strokeDasharray="2 2"
        strokeLinecap="round"
        strokeWidth="0.45"
      />
      <circle cx={destination.x} cy={destination.y} r="1.15" fill="#b45309" />
      <path
        d={`M ${destination.x - 1.3} ${destination.y - 1.3} L ${destination.x + 1.3} ${destination.y + 1.3} M ${destination.x + 1.3} ${destination.y - 1.3} L ${destination.x - 1.3} ${destination.y + 1.3}`}
        stroke="#fed7aa"
        strokeLinecap="round"
        strokeWidth="0.38"
      />
    </g>
  );
}

function PlayerRoute({
  playerArc,
  onHover,
}: {
  playerArc: PlayerArcDatum;
  onHover?: (hovered: HoveredArc | null) => void;
}) {
  const destination = projectCanada([playerArc.endLat, playerArc.endLng]);
  const entry = projectEntry([playerArc.startLat, playerArc.startLng], destination);

  return (
    <g
      className="cursor-pointer"
      onMouseEnter={() => onHover?.({ kind: 'player' })}
      onMouseLeave={() => onHover?.(null)}
    >
      <path
        d={curvePath(entry, destination, -13)}
        fill="none"
        stroke="#fef3c7"
        strokeLinecap="round"
        strokeWidth="0.72"
      >
        <animate attributeName="stroke-opacity" dur="1.4s" repeatCount="indefinite" values="0.35;1;0.35" />
      </path>
      <circle cx={destination.x} cy={destination.y} fill="#fef3c7" r="1.7">
        <animate attributeName="r" dur="1.4s" repeatCount="indefinite" values="1.3;2.4;1.3" />
      </circle>
    </g>
  );
}

function FamousMarker({
  player,
  index,
  onHover,
}: {
  player: FamousPlayer;
  index: number;
  onHover?: (hovered: HoveredArc | null) => void;
}) {
  const base = projectCanada(player.canadianLatLng);
  const offset = markerOffsets[index % markerOffsets.length];
  const point = { x: base.x + offset.x, y: base.y + offset.y };

  return (
    <g
      className="cursor-pointer"
      onMouseEnter={() => onHover?.({ kind: 'famous', data: player })}
      onMouseLeave={() => onHover?.(null)}
    >
      <line
        x1={base.x}
        x2={point.x}
        y1={base.y}
        y2={point.y}
        stroke="rgba(250,204,21,0.34)"
        strokeLinecap="round"
        strokeWidth="0.22"
      />
      <circle
        cx={point.x}
        cy={point.y}
        r="2.15"
        fill="rgba(250,204,21,0.2)"
        stroke="rgba(250,204,21,0.62)"
        strokeWidth="0.28"
      />
      <circle cx={point.x} cy={point.y} r="0.82" fill="#facc15" />
      {player.bypassedSystem && (
        <circle cx={point.x} cy={point.y} r="3.1" fill="none" stroke="rgba(248,113,113,0.42)" strokeWidth="0.24" />
      )}
    </g>
  );
}

function clusterDimArcs(dimArcs: DimArc[]) {
  const clusters = new Map<string, DimCluster>();

  for (const arc of dimArcs) {
    const current = clusters.get(arc.corridorTag);
    if (current) {
      current.count += 1;
      continue;
    }

    clusters.set(arc.corridorTag, {
      tag: arc.corridorTag,
      count: 1,
      sample: arc,
      point: projectCanada(arc.to),
    });
  }

  return Array.from(clusters.values());
}

function projectCanada([lat, lng]: [number, number]): Point {
  const x = ((lng - canadaBounds.west) / (canadaBounds.east - canadaBounds.west)) * 100;
  const y = ((canadaBounds.north - lat) / (canadaBounds.north - canadaBounds.south)) * 100;

  return {
    x: clamp(x, 3, 97),
    y: clamp(y, 8, 87),
  };
}

function projectEntry(origin: [number, number], destination: Point): Point {
  const rawX = ((origin[1] - canadaBounds.west) / (canadaBounds.east - canadaBounds.west)) * 100;
  const rawY = ((canadaBounds.north - origin[0]) / (canadaBounds.north - canadaBounds.south)) * 100;

  if (rawX >= 0 && rawX <= 100 && rawY >= 0 && rawY <= 100) {
    return {
      x: clamp(rawX, 2, 98),
      y: clamp(rawY, 6, 90),
    };
  }

  const edgeX = rawX < 50 ? 2 : 98;
  const edgeY = clamp(destination.y + (rawY < 50 ? -12 : 12), 7, 88);

  return { x: edgeX, y: edgeY };
}

function curvePath(from: Point, to: Point, lift: number) {
  const control = {
    x: (from.x + to.x) / 2,
    y: Math.min(from.y, to.y) + lift,
  };

  return `M ${from.x} ${from.y} Q ${control.x} ${control.y} ${to.x} ${to.y}`;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}
