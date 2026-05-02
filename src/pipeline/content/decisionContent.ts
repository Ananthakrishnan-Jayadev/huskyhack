// /src/pipeline/content/decisionContent.ts

export const decisions = [
  {
    id: 'opdl-invoice',
    age: 9,
    framing: "The OPDL registration invoice came in the mail. $3,200 for the season. Coach said this is the league the scouts watch. The community house league is $250.",
    choices: [
      { id: 'pay-opdl', label: "Pay the $3,200. Cut groceries this month.", budgetDelta: -3200, visibilityDelta: 30, stressDelta: 25 },
      { id: 'house-league', label: "House league. He'll still be playing.", budgetDelta: -250, visibilityDelta: -10, stressDelta: 0 },
      { id: 'decline', label: "We can't do it this year. Wait.", budgetDelta: 0, visibilityDelta: -25, stressDelta: 5 }
    ],
    realDataNote: "OPDL fees range $2,500-$5,000/year. Source: Ontario Player Development League public fee schedules."
  },
  {
    id: 'cleveland-showcase',
    age: 11,
    framing: "The team is going to a showcase tournament in Cleveland. $1,400 — registration, hotel, gas, food. The coach said American college scouts will be there. Three weekends in the season are showcase weekends. This is the first.",
    choices: [
      { id: 'pay-showcase', label: "Pay it. Drive overnight to save the hotel night.", budgetDelta: -1100, visibilityDelta: 25, stressDelta: 15 },
      { id: 'borrow', label: "Borrow from your brother. He'll mention it at every dinner.", budgetDelta: -1400, visibilityDelta: 25, stressDelta: 30 },
      { id: 'skip-showcase', label: "Skip it. He'll catch the next one.", budgetDelta: 0, visibilityDelta: -20, stressDelta: 10 }
    ],
    realDataNote: "US showcase tournaments cost $1,000-$2,000 per weekend including travel for Canadian families. Source: composite from publicly listed tournament fees and parent-reported costs."
  },
  {
    id: 'family-pressure',
    age: 13,
    framing: "Mom's hours got cut at the long-term care home. Sister starts braces in the fall. The OPDL invoice for next year sits on the kitchen table. He's been training six days a week. Last weekend he scored a hat trick.",
    choices: [
      { id: 'keep-going', label: "Keep him in. Mom takes a second job at the gas station.", budgetDelta: -3200, visibilityDelta: 20, stressDelta: 40 },
      { id: 'drop-to-rec', label: "Drop him to recreational. He'll still play.", budgetDelta: -300, visibilityDelta: -25, stressDelta: -10 },
      { id: 'quit-team', label: "He has to quit. Talk to him after dinner.", budgetDelta: 0, visibilityDelta: -100, stressDelta: 20 }
    ],
    realDataNote: "Statistics Canada has reported immigrant families are roughly 32% less likely to enroll their children in sports than Canadian-born families, primarily due to cost barriers."
  },
  {
    id: 'the-fork',
    age: 15,
    // ADDED PLACEHOLDER CONTENT TO PREVENT CRASH
    framing: "At 15, the path splits. You've made it this far, but the costs for the Elite Academy residence are doubling. Simultaneously, a local free community program is offering a trial.",
    choices: [
      { id: 'elite-academy', label: "Apply for the Vancouver Academy. $15,000/yr.", budgetDelta: -15000, visibilityDelta: 50, stressDelta: 50 },
      { id: 'free-program', label: "Join the Free Footie community trial.", budgetDelta: 0, visibilityDelta: 10, stressDelta: -20 },
      { id: 'stop-playing', label: "Hang up the boots. Focus on school.", budgetDelta: 0, visibilityDelta: -100, stressDelta: 0 }
    ],
    realDataNote: "Free Footie is a real Edmonton-based program founded specifically because the official soccer pipeline is unaffordable to many newcomer families. Alphonso Davies was discovered through it."
  }
];

// Add this at the very bottom of the file
export const terminalDecisions = {
  standard: {
    id: 'terminal-budget-out',
    age: 13,
    framing: "The OPDL invoice came. You looked at the bank account. You looked at the invoice. You looked at the bank account again. Your kid is in the next room doing homework. He doesn't know yet.",
    choices: [
      { id: 'tell-tonight', label: "Tell him after dinner.", budgetDelta: 0 },
      { id: 'let-him-find-out', label: "Don't say anything. He'll figure it out when the team practices without him.", budgetDelta: 0 }
    ]
  },
  lateGame: {
    id: 'terminal-scout-broken',
    age: 15,
    framing: "The scout camp invitation is on the kitchen table. The flights to Burnaby alone are eight hundred and fifty dollars. He doesn't know about the invitation yet. You haven't decided whether to tell him.",
    choices: [
      { id: 'tell-tonight', label: "Tell him after dinner.", budgetDelta: 0 },
      { id: 'let-him-find-out', label: "Hide the letter. It's kinder if he never knows how close he was.", budgetDelta: 0 }
    ]
  }
};