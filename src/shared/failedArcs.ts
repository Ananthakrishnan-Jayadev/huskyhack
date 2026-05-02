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
    story: 'Composite case, not a single real person. Born in Brampton to Caribbean immigrant parents. Private academy from age twelve. Named to youth provincial squads. Family spent thousands each year on club fees, travel, and equipment. Released at seventeen without a professional contract. NCAA options fell apart around grades, eligibility, and money. Now working in logistics in Mississauga.',
    sourceNote: 'COMPOSITE, built from recurring pay-to-play and academy attrition patterns. Keep exact rates and dollar figures source-linked in presentation; do not imply this is one identifiable Sigma FC player.',
  },
  {
    id: 'trafficked-trial',
    label: 'The False Trial',
    isComposite: true,
    originLatLng: [14.7167, -17.4677],
    destLatLng: [43.6532, -79.3832],
    brokeAtAge: 16,
    pattern: 'Predatory recruitment, broken promise',
    story: 'Composite case, not a single real person. Born in Senegal in 2003. Recruited at fifteen by an unlicensed intermediary promising a Canadian college scholarship and a professional tryout. Family paid $4,500 for travel and "registration." The tryout did not become a contract. The intermediary disappeared. Visa status became precarious. He stayed in the GTA, playing in weekend leagues and trying to find legal help.',
    sourceNote: 'COMPOSITE, based on documented football-trafficking and false-agent patterns described by Foot Solidaire and migrant-rights organizations. Canadian soccer-specific data is thin, so the framing is intentionally cautious.',
  },
];
