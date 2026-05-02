// /src/shared/failedArcs.ts
import type { FailedArc } from './types';

export const failedArcs: FailedArc[] = [
  {
    id: 'sigma-washout',
    label: 'The Sigma Washout',
    isComposite: true,
    originLatLng: [17.9714, -76.7936],
    destLatLng: [43.5890, -79.6441],
    brokeAtAge: 17,
    pattern: 'Priced through the threshold, then dropped',
    story: 'Composite case. Born in Brampton to Caribbean immigrant parents. Sigma FC academy from age twelve. Named to youth provincial squads. Family spent roughly $8,000 a year for six years on club fees, travel, and equipment. Released at seventeen after going unselected in the MLS SuperDraft. NCAA scholarship offers fell through due to academic eligibility. Currently working in logistics in Mississauga.',
    sourceNote: 'COMPOSITE based on the Canadian pay-to-play academy pathway. Sigma FC (Mississauga independent academy, founded ~2005) has produced multiple MLS and Canada national-team players (Larin, Tajon Buchanan, Laryea, Bekker) and over 140 NCAA scholarship athletes - yet, like all academies, the vast majority of graduates do not reach professional senior soccer. Industry conversion rates are extremely low: even top Premier League academies convert fewer than 1% of U9 intakes to first-team minutes; MLS SuperDraft data shows roughly one-third of draftees sign contracts, with long-term retention far lower. Sources: Sigma FC alumni records; MLS SuperDraft data; Aspen Institute Project Play; Michael Calvin, "No Hunger in Paradise."',
  },
  {
    id: 'trafficked-trial',
    label: 'The Trafficked Trial',
    isComposite: true,
    originLatLng: [14.7167, -17.4677],
    destLatLng: [43.6532, -79.3832],
    brokeAtAge: 16,
    pattern: 'Predatory recruitment, broken promise',
    story: 'Composite case. Born in Senegal in 2003. Recruited at fifteen by an unlicensed agent who promised a Canadian college scholarship and a professional tryout. Family paid $4,500 for travel and "registration." Arrived in Toronto on a tourist visa. The tryout was real but yielded no contract. The agent disappeared. Visa expired. Currently undocumented in the Greater Toronto Area, playing in Sunday leagues.',
    sourceNote: 'COMPOSITE based on documented football-trafficking patterns involving young West African players. Culture Foot Solidaire, founded by ex-Cameroonian international Jean-Claude Mbvoumin, estimates 15,000 teenage players are trafficked annually from West Africa via fake agents charging $3,000-$10,000 for visas, registration, and trials. Canadian-specific soccer-trial cases are not systematically tracked, but Canadian immigration lawyers and reports note comparable visa scams involving young foreign athletes recruited under false promises. Sources: Culture Foot Solidaire methodology; Canadian Council for Refugees reports.',
  },
];
