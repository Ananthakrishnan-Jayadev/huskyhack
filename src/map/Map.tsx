import { useEffect, useState } from 'react';
import { geoAlbers } from 'd3-geo';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import { dimArcs } from '@/shared/dimArcs';
import { failedArcs } from '@/shared/failedArcs';
import { famousPlayers } from '@/shared/players';
import { arcDraw, playSound, reveal } from '@/shared/sounds';
import { useAppStore } from '@/app/store';
import { ArcDetail } from './ArcDetail';
import { Arcs } from './Arcs';
import { CityDots } from './CityDots';
import type { MapMode, SelectedMapItem } from './mapTypes';
import type { PlayerArc as PlayerArcState } from '@/shared/types';

const geographyUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const mapWidth = 1100;
const mapHeight = 650;

// Used only by Arcs and CityDots - matches ComposableMap's internal projection.
const arcProjection = geoAlbers()
  .rotate([98, -45, 0])
  .parallels([49, 77])
  .scale(900)
  .translate([mapWidth / 2, mapHeight / 2]);

type MapProps = {
  mode?: MapMode;
};

type StoreShape = {
  phase: string;
  playerArc: PlayerArcState | null;
};

export function Map({ mode = 'all' }: MapProps) {
  const phase = useAppStore((state: StoreShape) => state.phase);
  const playerArc = useAppStore((state: StoreShape) => state.playerArc);
  const [selected, setSelected] = useState<SelectedMapItem>(null);

  useEffect(() => {
    if (phase !== 'map') return undefined;

    const timers = famousPlayers.map((_, index) =>
      window.setTimeout(() => playSound(reveal), index * 400),
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== 'map' || !playerArc) return;

    playSound(arcDraw);
  }, [phase, playerArc]);

  if (phase !== 'map') return null;

  return (
    <section
      className="fixed inset-0 overflow-hidden bg-[#0a0e1a] text-white"
      onClick={() => setSelected(null)}
    >
      <header className="pointer-events-none absolute left-6 top-6 z-10 max-w-xl">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-300/90">
          Canada, mapped
        </p>
        <h2 className="mt-2 text-4xl font-black leading-tight md:text-6xl">
          The almost-stories.
        </h2>
        <p className="mt-4 max-w-lg text-sm leading-6 text-white/[0.62] md:text-base md:leading-7">
          Every dim arc is a family who took the same journey as a national-team
          player and didn't get the same outcome. Every gold arc is the exception.
        </p>
      </header>

      <div className="absolute inset-0 pt-28">
        <ComposableMap
          width={mapWidth}
          height={mapHeight}
          projection="geoAlbers"
          projectionConfig={{
            rotate: [98, -45, 0],
            parallels: [49, 77],
            scale: 900,
          }}
          style={{
            width: '120%',
            height: '120%',
            marginLeft: '-10%',
            marginTop: '-5%',
            background: '#0a0e1a',
          }}
        >
          <ZoomableGroup
            zoom={1.4}
            center={[-79, 50]}
            minZoom={0.8}
            maxZoom={3}
          >
            <Geographies geography={geographyUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="rgba(255, 255, 255, 0.03)"
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: 'none' },
                      hover: { outline: 'none' },
                      pressed: { outline: 'none' },
                    }}
                  />
                ))
              }
            </Geographies>

            <Arcs
              dimArcs={dimArcs}
              failedArcs={failedArcs}
              famousPlayers={famousPlayers}
              mode={mode}
              playerArc={playerArc}
              projection={arcProjection}
              onSelect={setSelected}
            />

            <CityDots
              famousPlayers={famousPlayers}
              projection={arcProjection}
              onSelect={setSelected}
            />
          </ZoomableGroup>
        </ComposableMap>
      </div>

      <Legend />

      <ArcDetail
        hovered={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}

function Legend() {
  return (
    <div className="fixed bottom-6 left-6 z-10 rounded border border-white/[0.08] bg-[#0a0e1a]/90 p-3 text-[11px] leading-none text-white/70 backdrop-blur">
      <LegendRow color="#facc15" label="GOLD ARCS - National-team players" />
      <LegendRow color="#fef3c7" label="PALE ARC - Your family" />
      <LegendRow color="#b45309" label="RED ARCS - Documented failure patterns" />
      <LegendRow color="rgba(255,255,255,0.3)" label="DIM ARCS - Migration corridors with no famous outcome" />
    </div>
  );
}

function LegendRow({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 py-1.5">
      <span
        className="h-px w-3 shrink-0"
        style={{ backgroundColor: color }}
      />
      <span>{label}</span>
    </div>
  );
}
