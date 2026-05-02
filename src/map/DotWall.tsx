import { useMemo, useState } from 'react';
import { dimArcs } from '@/shared/dimArcs';
import { failedArcs } from '@/shared/failedArcs';
import { famousPlayers } from '@/shared/players';
import type { DimArc, FailedArc, FamousPlayer } from '@/shared/types';
import { ArcDetail } from './ArcDetail';

type SelectedDot =
  | { kind: 'famous'; data: FamousPlayer }
  | { kind: 'failed'; data: FailedArc }
  | { kind: 'dim'; data: DimArc }
  | null;

type CorridorGroup = {
  tag: string;
  label: string;
  arcs: DimArc[];
  players: FamousPlayer[];
};

const corridorLabels: Record<string, string> = {
  'liberian-edmonton': 'Liberian -> Edmonton, 2003-2010',
  'liberian-toronto': 'Liberian -> Toronto, 2003-2010',
  'vietnamese-toronto': 'Vietnamese -> Toronto, 1979-1985',
  'vietnamese-montreal': 'Vietnamese -> Montreal, 1979-1985',
  'tamil-toronto': 'Tamil -> Toronto, 1983-2009',
  'bosnian-toronto': 'Bosnian -> Toronto, 1992-1997',
  'somali-toronto': 'Somali -> Toronto, 1991-2010',
  'somali-ottawa': 'Somali -> Ottawa, 1991-2010',
  'syrian-gta': 'Syrian -> GTA, 2015-2017',
  'eritrean-toronto': 'Eritrean -> Toronto, 2010-2024',
  'afghan-toronto': 'Afghan -> Toronto, 2021-2024',
  'afghan-ottawa': 'Afghan -> Ottawa, 2021-2024',
  'salvadoran-toronto': 'Salvadoran -> Toronto, 1980-1992',
  'haitian-montreal': 'Haitian -> Montreal, 1970-2024',
  'punjabi-brampton': 'Punjabi -> Brampton, 1980-2024',
  'jamaican-brampton': 'Jamaican -> Brampton, 1970-2024',
  'colombian-toronto': 'Colombian -> Toronto, 1970-2024',
  'portuguese-leamington': 'Portuguese -> Leamington, 1970-2024',
  'ivorian-montreal': 'Ivorian -> Montreal, 1990-2024',
  'bc-burnaby': 'BC youth corridor -> Burnaby/Vancouver',
};

export function DotWall() {
  const [selected, setSelected] = useState<SelectedDot>(null);
  const groups = useMemo(() => buildCorridorGroups(), []);

  return (
    <section
      className="fixed inset-0 overflow-y-auto bg-[#0a0e1a] px-6 py-6 text-white"
      onClick={() => setSelected(null)}
    >
      <header className="mb-7 max-w-5xl">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-300/90">
          Canada, mapped
        </p>
        <h2 className="mt-2 text-4xl font-black leading-tight md:text-6xl">
          The almost-stories.
        </h2>
        <p className="mt-4 max-w-4xl text-sm leading-6 text-white/[0.62] md:text-base md:leading-7">
          Every dot is a family who came to Canada through one of these corridors.
          Gold dots made the national team. Amber dots are documented failure
          patterns. Click any dot.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-3 pb-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {groups.map((group) => (
          <CorridorBlock
            key={group.tag}
            group={group}
            onSelect={setSelected}
          />
        ))}
        <FailureBlock onSelect={setSelected} />
      </div>

      <ArcDetail
        hovered={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}

function CorridorBlock({
  group,
  onSelect,
}: {
  group: CorridorGroup;
  onSelect: (item: SelectedDot) => void;
}) {
  const firstArc = group.arcs[0];

  return (
    <article className="min-h-[132px] rounded border border-white/[0.08] bg-white/[0.035] p-3 shadow-[0_18px_60px_rgba(0,0,0,0.22)]">
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="text-[11px] font-bold uppercase leading-4 tracking-[0.12em] text-white/58">
          {group.label}
        </h3>
        <span className="shrink-0 text-[10px] font-bold text-white/35">
          {group.arcs.length + group.players.length}
        </span>
      </div>
      <div className="flex flex-wrap content-start gap-1.5">
        {group.arcs.map((arc) => (
          <button
            key={arc.id}
            className="h-1.5 w-1.5 rounded-full bg-white/[0.18] transition hover:scale-150 hover:bg-white/35"
            type="button"
            aria-label={group.label}
            onClick={(event) => {
              event.stopPropagation();
              onSelect({ kind: 'dim', data: firstArc ?? arc });
            }}
          />
        ))}
        {group.players.map((player) => (
          <button
            key={player.id}
            className="h-2.5 w-2.5 rounded-full bg-[#facc15] shadow-[0_0_14px_rgba(250,204,21,0.9)] transition hover:scale-125 animate-[dotPulse_1.8s_ease-in-out_infinite]"
            type="button"
            aria-label={player.name}
            onClick={(event) => {
              event.stopPropagation();
              onSelect({ kind: 'famous', data: player });
            }}
          />
        ))}
      </div>
    </article>
  );
}

function FailureBlock({
  onSelect,
}: {
  onSelect: (item: SelectedDot) => void;
}) {
  return (
    <article className="min-h-[132px] rounded border border-amber-700/25 bg-amber-950/[0.12] p-3 shadow-[0_18px_60px_rgba(0,0,0,0.22)]">
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="text-[11px] font-bold uppercase leading-4 tracking-[0.12em] text-amber-200/70">
          Documented failure patterns
        </h3>
        <span className="shrink-0 text-[10px] font-bold text-amber-100/40">
          {failedArcs.length}
        </span>
      </div>
      <div className="flex flex-wrap content-start gap-2">
        {failedArcs.map((arc) => (
          <button
            key={arc.id}
            className="h-2 w-2 rounded-full bg-[#b45309] transition hover:scale-150 hover:bg-amber-500"
            type="button"
            aria-label={arc.label}
            onClick={(event) => {
              event.stopPropagation();
              onSelect({ kind: 'failed', data: arc });
            }}
          />
        ))}
      </div>
    </article>
  );
}

function buildCorridorGroups(): CorridorGroup[] {
  const grouped = new Map<string, DimArc[]>();

  for (const arc of dimArcs) {
    const current = grouped.get(arc.corridorTag) ?? [];
    current.push(arc);
    grouped.set(arc.corridorTag, current);
  }

  const playersByTag = new Map<string, FamousPlayer[]>();
  for (const player of famousPlayers) {
    if (!player.corridorTag) continue;

    const current = playersByTag.get(player.corridorTag) ?? [];
    current.push(player);
    playersByTag.set(player.corridorTag, current);
  }

  return Array.from(grouped.entries()).map(([tag, arcs]) => ({
    tag,
    label: corridorLabels[tag] ?? tag,
    arcs,
    players: playersByTag.get(tag) ?? [],
  }));
}
