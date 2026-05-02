# One in a Million, By Design

**Canada has one Alphonso Davies. The math says one. This is why.**

## What this is

On June 12, 2026, Canada plays Bosnia and Herzegovina at Toronto Stadium (the tournament name for BMO Field), Exhibition Place — Canada's first men's FIFA World Cup match on home soil.

The team Canada is selling is real: refugees, immigrants, and children of immigrants. The system that produced them is not what Canada is selling. Alphonso Davies was first carried by Free Footie, a free after-school program in Edmonton — not by the official Canadian developmental pathway, which costs thousands of dollars a year and prices most newcomer families out. Jonathan David skipped Canadian academies entirely and signed with a Belgian club at seventeen. Almost every star on Canada's men's roster reached the top through NCAA scholarships, private academies, overseas clubs, or free community programs — around, not through, the system.

This project is a two-part interactive experience. First, you play one immigrant family trying to put a kid through the Canadian soccer pipeline. Most playthroughs end with your kid quitting because the family runs out of money. Then your family's arc joins hundreds of others — kids who took the same migration journey and never got the same outcome — while thirteen Canadian national-team players light up as the exceptions.

Canada has one Davies. The math says one. The rest of the dots are why.

## How to play

1. Pick your family's origin corridor — Liberia → Edmonton, Jamaica → Brampton, Punjab → Brampton, or Syria → Mississauga.
2. Make four decisions about your kid's soccer career between ages 9 and 15.
3. Watch what happens.
4. See where your family fits among the others.

The whole experience runs about 90 seconds.

## How to run

```bash
npm install
npm run dev
```

Then open the localhost URL Vite prints. Click *Start* on the title screen.

## Player photos (optional)

Drop player photos into `public/players/` using the player IDs. PNG, JPG, and JPEG are supported:

```text
public/players/davies.png
public/players/david.jpg
public/players/larin.jpeg
public/players/tajon-buchanan.png
public/players/osorio.jpeg
public/players/hutchinson.png
public/players/eustaquio.png
public/players/kone.png
public/players/hoilett.png
public/players/sinclair.png
public/players/kadeisha-buchanan.png
public/players/lawrence.png
public/players/grosso.png
```

If a file is missing, the hover card falls back to player initials.

## Sources

**Migration and refugee data**

- Immigration, Refugees and Citizenship Canada (IRCC), Operation Syrian Refugees — 25,555 Syrian refugees resettled between December 2015 and February 2016; 26,172 in the full initial commitment.
- Statistics Canada, 2021 Census Profile for Brampton — 340,815 South Asian residents (52.42% of the city), 141,005 reporting Punjabi as mother tongue (the city's leading non-official language), 30,960 reporting Jamaican ethnic origin.
- CIC Facts and Figures 2010 — 647 permanent residents from Liberia admitted to Canada, 2003–2010.
- Statistics Canada, 2016 Census — 2,485 Canadians reported Liberian ethnic origin.
- Canadian Council for Refugees and Foot Solidaire (founded by Jean-Claude Mbvoumin) — methodology underpinning the composite "Trafficked Trial" framing.

**Football**

- FIFA World Cup 26 match schedule — Canada vs. Bosnia and Herzegovina, Group B, Toronto Stadium, June 12, 2026, 3 p.m. ET.
- Wikipedia player pages for Alphonso Davies, Jonathan David, Cyle Larin, Tajon Buchanan, Jonathan Osorio, Atiba Hutchinson, Stephen Eustáquio, Ismaël Koné, Junior Hoilett, Christine Sinclair, Kadeisha Buchanan, Ashley Lawrence, and Julia Grosso.
- Free Footie — Davies's Edmonton pathway.
- Sigma FC — Brampton-area academy that produced Larin, Tajon Buchanan, and others outside Canada Soccer's official developmental pathway.
- MLS SuperDraft public records — Canadian draft conversion rates underpinning the composite "Sigma Washout" framing.

## Built with

React, TypeScript, Vite, Tailwind CSS, Zustand, Framer Motion, and Howler.js.

## Credits

Built in 12 hours by Ananthakrishnan Jayadev,Hayagrive Srikanth for Huskyhack