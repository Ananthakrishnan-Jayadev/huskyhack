import { useMemo, useState } from 'react';
import type { FamousPlayer } from '@/shared/types';
import type { ProjectionFn, SelectedMapItem } from './mapTypes';

type CityDotsProps = {
  famousPlayers: FamousPlayer[];
  projection: ProjectionFn;
  onSelect: (item: SelectedMapItem) => void;
};

type CityPoint = {
  key: string;
  player: FamousPlayer;
  coords: [number, number];
};

export function CityDots({ famousPlayers, projection, onSelect }: CityDotsProps) {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const cities = useMemo(() => uniqueCities(famousPlayers), [famousPlayers]);
  const gtaLabel = projection([-79.5, 44]);

  return (
    <g>
      {gtaLabel && (
        <text
          x={gtaLabel[0] + 12}
          y={gtaLabel[1] - 36}
          fill="rgba(255,255,255,0.5)"
          fontSize="11"
          textAnchor="middle"
        >
          Brampton / GTA - 5 of 13 national-teamers from here
        </text>
      )}

      {cities.map((city) => {
        const point = projection(city.coords);
        if (!point) return null;
        const isHovered = hoveredCity === city.key;

        return (
          <g
            key={city.key}
            className="cursor-pointer"
            onClick={(event) => {
              event.stopPropagation();
              onSelect({ kind: 'famous', data: city.player });
            }}
            onMouseEnter={() => setHoveredCity(city.key)}
            onMouseLeave={() => setHoveredCity(null)}
          >
            {isHovered && (
              <circle
                cx={point[0]}
                cy={point[1]}
                r={7}
                fill="none"
                stroke="rgba(253,230,138,0.55)"
                strokeWidth={1}
              />
            )}
            <circle
              cx={point[0]}
              cy={point[1]}
              r={3}
              fill="#fde68a"
              opacity={0.9}
              stroke="#facc15"
              strokeWidth={0.5}
            />
          </g>
        );
      })}
    </g>
  );
}

function uniqueCities(players: FamousPlayer[]) {
  const cities = new Map<string, CityPoint>();

  for (const player of players) {
    const key = player.canadianCity;
    if (cities.has(key)) continue;

    cities.set(key, {
      key,
      player,
      coords: toLonLat(player.canadianLatLng),
    });
  }

  return Array.from(cities.values());
}

function toLonLat([lat, lng]: [number, number]): [number, number] {
  return [lng, lat];
}
