import { memo, useEffect, useRef, useState } from 'react';
import { corridors } from '@/shared/corridors';
import type { DimArc, FailedArc, FamousPlayer, PlayerArc as PlayerArcState } from '@/shared/types';
import type { PlayerArcDatum, ProjectionFn, SelectedMapItem } from './mapTypes';

type ArcsProps = {
  dimArcs: DimArc[];
  failedArcs: FailedArc[];
  famousPlayers: FamousPlayer[];
  playerArc: PlayerArcState | null;
  projection: ProjectionFn;
  mode: 'famous-only' | 'all';
  onSelect: (item: SelectedMapItem) => void;
};

type ArcPathProps = {
  d: string;
  stroke: string;
  strokeWidth: number;
  opacity?: number;
  animated?: boolean;
  pulsing?: boolean;
  onClick?: () => void;
};

const DimArcs = memo(function DimArcs({
  arcs,
  projection,
}: {
  arcs: DimArc[];
  projection: ProjectionFn;
}) {
  return (
    <g>
      {arcs.map((arc) => {
        const d = arcPath(toLonLat(arc.from), toLonLat(arc.to), projection, 0.3);
        if (!d) return null;

        return (
          <path
            key={arc.id}
            d={d}
            fill="none"
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth={0.4}
          />
        );
      })}
    </g>
  );
});

export function Arcs({
  dimArcs,
  failedArcs,
  famousPlayers,
  playerArc,
  projection,
  mode,
  onSelect,
}: ArcsProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const userArc = getUserArc(playerArc);

  return (
    <g>
      {mode === 'all' && <DimArcs arcs={dimArcs} projection={projection} />}

      {mode === 'all' &&
        failedArcs.map((arc) => {
          const d = arcPath(toLonLat(arc.originLatLng), toLonLat(arc.destLatLng), projection, 0.26);
          if (!d) return null;
          const isHovered = hoveredId === arc.id;

          return (
            <ArcPath
              key={arc.id}
              d={d}
              stroke="#b45309"
              strokeWidth={isHovered ? 1.5 : 1}
              opacity={isHovered ? 1 : 0.7}
              onClick={() => onSelect({ kind: 'failed', data: arc })}
              onMouseEnter={() => setHoveredId(arc.id)}
              onMouseLeave={() => setHoveredId(null)}
            />
          );
        })}

      {famousPlayers.map((player) => {
        const destination = player.finalLatLng ?? player.canadianLatLng;
        const d = arcPath(toLonLat(player.birthLatLng), toLonLat(destination), projection, 0.28);
        if (!d) return null;
        const isHovered = hoveredId === player.id;

        return (
          <ArcPath
            key={player.id}
            d={d}
            stroke="#facc15"
            strokeWidth={isHovered ? 2.5 : 1.5}
            animated
            onClick={() => onSelect({ kind: 'famous', data: player })}
            onMouseEnter={() => setHoveredId(player.id)}
            onMouseLeave={() => setHoveredId(null)}
          />
        );
      })}

      {mode === 'all' && userArc && (
        <ArcPath
          d={userArc.d}
          stroke="#fef3c7"
          strokeWidth={hoveredId === 'player' ? 3.2 : 2.5}
          pulsing
          onClick={() => onSelect({ kind: 'player' })}
          onMouseEnter={() => setHoveredId('player')}
          onMouseLeave={() => setHoveredId(null)}
        />
      )}
    </g>
  );

  function getUserArc(arc: PlayerArcState | null): { d: string } | null {
    if (!arc) return null;

    const corridor = corridors.find((item) => item.id === arc.corridorId);
    if (!corridor) return null;

    const d = arcPath(
      toLonLat(corridor.originLatLng),
      toLonLat(corridor.canadianLatLng),
      projection,
      0.3,
    );

    return d ? { d } : null;
  }
}

function ArcPath({
  d,
  stroke,
  strokeWidth,
  opacity = 1,
  animated = false,
  pulsing = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: ArcPathProps & {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const pathRef = useRef<SVGPathElement | null>(null);
  const [length, setLength] = useState(1);

  useEffect(() => {
    if (animated && pathRef.current) {
      setLength(pathRef.current.getTotalLength());
    }
  }, [animated, d]);

  return (
    <path
      ref={pathRef}
      className={[
        onClick ? 'cursor-pointer' : '',
        animated ? 'animate-[drawArc_1.2s_ease-out_forwards]' : '',
        pulsing ? 'animate-[pulseArc_1.6s_ease-in-out_infinite]' : '',
      ].join(' ')}
      d={d}
      fill="none"
      opacity={opacity}
      stroke={stroke}
      strokeLinecap="round"
      strokeWidth={strokeWidth}
      style={
        animated
          ? {
              strokeDasharray: length,
              strokeDashoffset: length,
            }
          : undefined
      }
      onClick={(event) => {
        event.stopPropagation();
        onClick?.();
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
}

function arcPath(
  start: [number, number],
  end: [number, number],
  projection: ProjectionFn,
  curvature = 0.3,
) {
  const projectedStart = projection(start);
  const projectedEnd = projection(end);

  if (!projectedStart || !projectedEnd) return null;

  const [sx, sy] = projectedStart;
  const [ex, ey] = projectedEnd;
  const mx = (sx + ex) / 2;
  const my = (sy + ey) / 2;
  const dx = ex - sx;
  const dy = ey - sy;
  const offsetX = -dy * curvature;
  const offsetY = dx * curvature;
  const cx = mx + offsetX;
  const cy = my + offsetY;

  return `M${sx},${sy} Q${cx},${cy} ${ex},${ey}`;
}

function toLonLat([lat, lng]: [number, number]): [number, number] {
  return [lng, lat];
}
