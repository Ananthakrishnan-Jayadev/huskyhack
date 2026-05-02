import type { DimArc } from './types';

type DimArcSeed = {
  origin: [number, number];
  dest: [number, number];
  count: number;
  tag: string;
  yearRange: [number, number];
};

const seedCorridors: DimArcSeed[] = [
  // Liberian resettlement (Edmonton, Toronto, Ottawa)
  { origin: [6.4281, -9.4295], dest: [53.5461, -113.4938], count: 30, tag: 'liberian-edmonton', yearRange: [2003, 2010] },
  { origin: [6.4281, -9.4295], dest: [43.6532, -79.3832], count: 25, tag: 'liberian-toronto', yearRange: [2003, 2010] },

  // Vietnamese boat people (Toronto, Montreal, Vancouver)
  { origin: [10.8231, 106.6297], dest: [43.6532, -79.3832], count: 60, tag: 'vietnamese-toronto', yearRange: [1979, 1985] },
  { origin: [10.8231, 106.6297], dest: [45.5019, -73.5674], count: 40, tag: 'vietnamese-montreal', yearRange: [1979, 1985] },

  // Tamil refugees (Toronto)
  { origin: [9.6615, 80.0255], dest: [43.6532, -79.3832], count: 80, tag: 'tamil-toronto', yearRange: [1983, 2009] },

  // Bosnian refugees (Toronto, GTA)
  { origin: [43.8563, 18.4131], dest: [43.6532, -79.3832], count: 35, tag: 'bosnian-toronto', yearRange: [1992, 1997] },

  // Somali refugees (Toronto, Ottawa)
  { origin: [2.0469, 45.3182], dest: [43.6532, -79.3832], count: 50, tag: 'somali-toronto', yearRange: [1991, 2010] },
  { origin: [2.0469, 45.3182], dest: [45.4215, -75.6972], count: 30, tag: 'somali-ottawa', yearRange: [1991, 2010] },

  // Syrian refugees (GTA)
  { origin: [33.5138, 36.2765], dest: [43.5890, -79.6441], count: 40, tag: 'syrian-gta', yearRange: [2015, 2017] },

  // Eritrean refugees (Toronto)
  { origin: [15.3229, 38.9251], dest: [43.6532, -79.3832], count: 30, tag: 'eritrean-toronto', yearRange: [2010, 2024] },

  // Afghan resettlement
  { origin: [34.5553, 69.2075], dest: [43.6532, -79.3832], count: 35, tag: 'afghan-toronto', yearRange: [2021, 2024] },
  { origin: [34.5553, 69.2075], dest: [45.4215, -75.6972], count: 20, tag: 'afghan-ottawa', yearRange: [2021, 2024] },

  // Salvadoran civil war refugees (Toronto)
  { origin: [13.6929, -89.2182], dest: [43.6532, -79.3832], count: 30, tag: 'salvadoran-toronto', yearRange: [1980, 1992] },

  // Haitian migration (Montreal-heavy)
  { origin: [18.5944, -72.3074], dest: [45.5019, -73.5674], count: 70, tag: 'haitian-montreal', yearRange: [1970, 2024] },

  // Punjabi migration (Brampton)
  { origin: [30.7333, 76.7794], dest: [43.7315, -79.7624], count: 90, tag: 'punjabi-brampton', yearRange: [1980, 2024] },

  // Jamaican migration (Toronto, Brampton)
  { origin: [17.9714, -76.7936], dest: [43.7315, -79.7624], count: 60, tag: 'jamaican-brampton', yearRange: [1970, 2024] },
];

function jitter(coord: [number, number], range = 0.5): [number, number] {
  return [
    coord[0] + (Math.random() - 0.5) * range,
    coord[1] + (Math.random() - 0.5) * range,
  ];
}

function randomYear([start, end]: [number, number]): number {
  return Math.floor(start + Math.random() * (end - start));
}

function generateDimArcs(seeds: DimArcSeed[]): DimArc[] {
  const arcs: DimArc[] = [];
  for (const seed of seeds) {
    for (let i = 0; i < seed.count; i++) {
      arcs.push({
        id: `${seed.tag}-${i}`,
        from: jitter(seed.origin),
        to: jitter(seed.dest),
        corridorTag: seed.tag,
        year: randomYear(seed.yearRange),
      });
    }
  }
  return arcs;
}

export const dimArcs: DimArc[] = generateDimArcs(seedCorridors);
