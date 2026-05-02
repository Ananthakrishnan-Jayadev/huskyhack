import { useState } from 'react';
import { getPlayerImageSrc, playerImageExtensions } from '@/shared/playerImages';
import type { DimArc, FailedArc, FamousPlayer } from '@/shared/types';

type ArcDetailProps = {
  hovered:
    | { kind: 'famous'; data: FamousPlayer }
    | { kind: 'failed'; data: FailedArc }
    | { kind: 'dim'; data: DimArc }
    | { kind: 'player' }
    | null;
  onClose?: () => void;
};

export function ArcDetail({ hovered, onClose }: ArcDetailProps) {
  if (!hovered) return null;

  return (
    <div
      className="fixed right-6 top-[100px] z-20 max-h-[70vh] w-[420px] max-w-[calc(100vw-48px)] overflow-y-auto rounded-lg border border-white/10 bg-[#0a0e1a]/[0.92] p-4 text-white shadow-2xl backdrop-blur-md"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded border border-white/10 bg-black/40 text-sm font-bold text-white/70 hover:bg-white/10 hover:text-white"
        type="button"
        aria-label="Close detail panel"
        onClick={onClose}
      >
        X
      </button>
      {hovered.kind === 'famous' && <FamousDetail player={hovered.data} />}
      {hovered.kind === 'failed' && <FailedDetail arc={hovered.data} />}
      {hovered.kind === 'dim' && <DimDetail arc={hovered.data} />}
      {hovered.kind === 'player' && <PlayerDetail />}
    </div>
  );
}

function FamousDetail({ player }: { player: FamousPlayer }) {
  return (
    <div className="grid gap-4 pr-7 md:grid-cols-[140px_1fr]">
      <PlayerImage player={player} />
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold leading-tight">{player.name}</h3>
          {player.bypassedSystem && (
            <span className="shrink-0 rounded bg-red-600/80 px-2 py-1 text-xs font-bold">
              BYPASSED
            </span>
          )}
          {!player.bypassedSystem && (
            <span className="shrink-0 rounded bg-yellow-600/80 px-2 py-1 text-xs font-bold">
              ACADEMY PRODUCT
            </span>
          )}
        </div>
        <div className="text-sm font-semibold text-white/70">Born: {player.birthplace}</div>
        <div className="font-mono text-xs leading-5 text-white/55">{player.pathway}</div>
        <p className="text-sm leading-6 text-white/90">{player.story}</p>
      </div>
    </div>
  );
}

function PlayerImage({ player }: { player: FamousPlayer }) {
  const [extensionIndex, setExtensionIndex] = useState(0);
  const failed = extensionIndex >= playerImageExtensions.length;

  if (failed) {
    return (
      <div className="flex h-[180px] items-center justify-center rounded-md border border-white/10 bg-slate-800 text-4xl font-black text-amber-300 md:h-full">
        {player.name
          .split(' ')
          .map((part) => part[0])
          .slice(0, 2)
          .join('')}
      </div>
    );
  }

  return (
    <img
      alt={player.name}
      className="h-[180px] w-full rounded-md border border-white/10 bg-black object-contain md:h-full"
      src={getPlayerImageSrc(player.id, extensionIndex)}
      onError={() => setExtensionIndex((current) => current + 1)}
    />
  );
}

function FailedDetail({ arc }: { arc: FailedArc }) {
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-xl font-bold">{arc.label}</h3>
        <span className="rounded bg-amber-700/80 px-2 py-1 text-xs font-bold">
          COMPOSITE
        </span>
      </div>
      <div className="text-sm italic text-white/70">{arc.pattern}</div>
      <p className="text-sm leading-relaxed">{arc.story}</p>
      <p className="border-t border-white/10 pt-2 text-xs leading-relaxed text-white/50">
        {arc.sourceNote}
      </p>
    </div>
  );
}

function DimDetail({ arc }: { arc: DimArc }) {
  const note = corridorNotes[arc.corridorTag] ?? {
    title: 'Migration corridor',
    description: arc.corridorTag,
  };

  return (
    <div className="space-y-2">
      <h3 className="text-base font-medium text-white/80">{note.title}</h3>
      <p className="text-sm text-white/60">{note.description}</p>
      <p className="pt-2 text-xs text-white/40">Arrival: ~{arc.year}</p>
    </div>
  );
}

function PlayerDetail() {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-bold">Your family.</h3>
      <p className="text-sm text-white/70">
        You are one of the corridors. The system was not built for you.
      </p>
    </div>
  );
}

const corridorNotes: Record<string, { title: string; description: string }> = {
  'liberian-edmonton': {
    title: 'Liberian family, Edmonton',
    description: 'Resettled to Alberta during the 2003-2010 wave following the second Liberian civil war. One corridor produced Alphonso Davies. Most did not.',
  },
  'liberian-toronto': {
    title: 'Liberian family, Toronto',
    description: 'Same resettlement wave, different destination. The same talent can land in a different city and meet a different system.',
  },
  'vietnamese-toronto': {
    title: 'Vietnamese family, Toronto',
    description: 'Boat people resettled after 1979. A major Canadian refugee story, rarely named in Canadian soccer history.',
  },
  'vietnamese-montreal': {
    title: 'Vietnamese family, Montreal',
    description: 'Quebec absorbed a large share of the Vietnamese diaspora after the fall of Saigon.',
  },
  'tamil-toronto': {
    title: 'Tamil family, Toronto',
    description: 'A major Toronto diaspora shaped by war, displacement, and dense community life.',
  },
  'bosnian-toronto': {
    title: 'Bosnian family, Toronto',
    description: 'Refugees of the 1992-1995 Bosnian war. Another community whose soccer lives often remained outside the official story.',
  },
  'somali-toronto': {
    title: 'Somali family, Toronto',
    description: 'Refugees of the 1990s civil war and ongoing displacement. Among the largest African diasporas in Toronto.',
  },
  'somali-ottawa': {
    title: 'Somali family, Ottawa',
    description: 'Ottawa absorbed a significant share of Somali refugee resettlement.',
  },
  'syrian-gta': {
    title: 'Syrian family, GTA',
    description: 'Resettled in the 2015-2017 wave. The children who arrived then are now teenagers inside Canada\'s soccer economy.',
  },
  'eritrean-toronto': {
    title: 'Eritrean family, Toronto',
    description: 'Ongoing migration. Eritrean community soccer is part of Scarborough\'s weekend geography.',
  },
  'afghan-toronto': {
    title: 'Afghan family, Toronto',
    description: 'Resettled after the 2021 Taliban takeover. A new corridor entering the same old youth-sport market.',
  },
  'afghan-ottawa': {
    title: 'Afghan family, Ottawa',
    description: 'Ottawa is a major destination for Afghan resettlement.',
  },
  'salvadoran-toronto': {
    title: 'Salvadoran family, Toronto',
    description: 'Civil war refugees of the 1980s. Community leagues carried the game across the GTA.',
  },
  'haitian-montreal': {
    title: 'Haitian family, Montreal',
    description: 'The largest Haitian diaspora in Canada is concentrated in Montreal. Jonathan David\'s family corridor runs through this geography by way of Brooklyn and Ottawa.',
  },
  'punjabi-brampton': {
    title: 'Punjabi family, Brampton',
    description: 'One of Canada\'s largest immigrant corridors. StatsCan counted 340,815 South Asian residents and 57,075 Punjabi-origin residents in Brampton in 2021.',
  },
  'jamaican-brampton': {
    title: 'Jamaican family, Brampton',
    description: 'A Caribbean diaspora corridor that produced Canadian national-team players through side doors, scholarships, private academies, and early exits.',
  },
};
