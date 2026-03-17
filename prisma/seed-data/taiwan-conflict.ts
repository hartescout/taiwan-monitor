import type { ThreatLevel, ConflictStatus, ConflictDaySnapshot } from '@/types/domain';
export type { ThreatLevel, ConflictStatus };

export const CONFLICT = {
  id:            'taiwan-2026',
  name:          'Taiwan Strait Crisis 2026',
  codename:      { us: 'Operation Formosa Shield', cn: 'Joint Sword-2026A' },
  status:        'ONGOING' as const,
  threatLevel:   'CRITICAL' as const,
  startDate:     '2026-03-01T04:00:00Z',
  region:        'Taiwan Strait / South China Sea / East Asia',
  timezone:      'Asia/Taipei',
  escalation:    92,

  summary: `On March 1, 2026, the People's Liberation Army (PLA) initiated "Joint Sword-2026A," a massive multi-domain blockade of Taiwan, following a declaration of a "Total Exclusion Zone" around the island. The operation began with a devastating cyber-kinetic opening that disabled Taiwan's power grid and undersea cables. The United States responded by activating "Operation Formosa Shield," deploying Carrier Strike Groups 5 and 7 to the Philippine Sea. Initial clashes have occurred in the air and sea, with the PLA conducting missile strikes on military infrastructure in Keelung and Kaohsiung. Taiwan has mobilized all reservists and activated its "Overall Defense Concept." Global markets are in freefall as the Taiwan Strait, responsible for 50% of global container traffic and 90% of advanced semiconductor supply, is effectively closed to commercial shipping.`,

  keyFacts: [
    'PLA declares "Total Exclusion Zone" around Taiwan, effective March 1, 2026.',
    'Undersea fiber optic cables connecting Taiwan to the global internet severed.',
    'Massive missile barrage targets Taiwanese airbases and early warning radars.',
    'US Carrier Strike Groups 5 (USS Ronald Reagan) and 7 (USS George Washington) moving to intercept positions.',
    'Japan places JSDF on high alert and begins evacuation of Sakishima Islands.',
    'TSMC facilities in Hsinchu placed under "scorched earth" security protocol.',
    'Global tech stocks crash; NASDAQ futures down 12% in opening hours.',
    'China halts all exports of rare earth elements to "unfriendly nations."',
    'First naval engagement reported near Penghu Islands; loss of Taiwanese corvette confirmed.',
    'US President issues ultimatum for PLA withdrawal; Beijing rejects "interference in internal affairs."',
  ],

  objectives: {
    us:  'Maintain freedom of navigation, defend Taiwan\'s autonomy, secure semiconductor supply chains.',
    cn:  'Achieve national reunification, eliminate "separatist forces," deny US access to the first island chain.',
    tw:  'Preserve sovereignty, repel invasion forces, maintain critical infrastructure until international intervention.',
  },

  commanders: {
    us: ['President Donald Trump', 'SecDef Pete Hegseth', 'INDOPACOM Adm. Samuel Paparo', '7th Fleet Vice Adm. Fred Kacher'],
    cn: ['President Xi Jinping', 'Gen. Zhang Youxia', 'Eastern Theater Command Gen. Lin Xiangyang', 'PLAN Adm. Hu Zhongming'],
    tw: ['President Lai Ching-te', 'DefMin Wellington Koo', 'Chief of General Staff Adm. Mei Chia-shu'],
  },

  casualties: {
    us:       { kia: 12,  wounded: 45,   civilians: 0 },
    taiwan:   { kia: 450, wounded: 1200, civilians: 85, injured: 400 },
    china:    { killed: 210, injured: 500 },
    regional: {
      japan:     { killed: 0, injured: 12 },
      philippines: { killed: 2, injured: 15 },
    },
  },

  daySnapshots: [
    {
      day: '2026-03-01',
      dayLabel: 'DAY 1',
      summary: 'The conflict began at 04:00 local time with a massive wave of DF-15 and DF-17 ballistic missiles targeting Taiwan\'s air defense network and command centers. Simultaneously, a state-sponsored cyberattack took down 70% of Taiwan\'s power grid. The PLA Navy (PLAN) established six exercise zones surrounding the island, effectively creating a blockade. The US 7th Fleet moved toward the Luzon Strait.',
      keyFacts: [
        'Missile strikes on Hsinchu, Ching Chuan Kang, and Tainan airbases.',
        'Total blackout in Taipei and Kaohsiung following cyber-kinetic strikes.',
        'PLAN East Sea Fleet ships cross the median line in force.',
        'US CSG-5 enters the Philippine Sea from Guam.',
        'Taiwan activates the "Mountain Shield" bunkers for leadership.',
      ],
      escalation: 85,
      casualties: {
        us:       { kia: 0, wounded: 0, civilians: 0 },
        taiwan:   { kia: 120, wounded: 300, civilians: 45, injured: 150 },
        china:    { killed: 15, injured: 40 },
        regional: {
          japan:     { killed: 0, injured: 0 },
          philippines: { killed: 0, injured: 0 },
        },
      },
      economicImpact: {
        chips: [
          { label: 'NASDAQ', val: '-12%', sub: 'Limit Down', color: 'var(--danger)' },
          { label: 'TSMC (ADR)', val: '-25%', sub: 'Suspended', color: 'var(--danger)' },
          { label: 'Brent Crude', val: '$95/bbl', sub: '+15% ↑', color: 'var(--warning)' },
          { label: 'Shipping', val: '400+', sub: 'Diverted', color: 'var(--warning)' },
        ],
        narrative: 'The global economy suffered an immediate "Semiconductor Shock." Tech companies lost nearly $2 trillion in market cap within hours. Shipping rates for Pacific routes quadrupled as insurers withdrew coverage for the Taiwan Strait.',
      },
      scenarios: [
        { label: 'DE-ESCALATION', subtitle: 'Diplomatic off-ramp via ASEAN/UN', color: 'var(--success)', prob: '10%',
          body: 'International pressure forces a temporary ceasefire. China maintains the blockade but pauses kinetic strikes. Negotiations begin in Singapore. Very low probability given the scale of initial strikes.' },
        { label: 'PROTRACTED BLOCKADE', subtitle: 'Sustained siege and attrition', color: 'var(--warning)', prob: '55%',
          body: 'China avoids a full-scale amphibious landing, focusing on strangling Taiwan\'s economy and military via blockade. The US conducts "Freedom of Navigation" escort missions, leading to frequent naval skirmishes. Conflict lasts months.' },
        { label: 'TOTAL WAR', subtitle: 'Amphibious invasion and US intervention', color: 'var(--danger)', prob: '35%',
          body: 'PLA attempts a massive amphibious assault on northern beaches. The US and Japan enter the conflict directly. Large-scale naval and air battles across the first island chain. Risk of nuclear escalation if mainland targets are hit.' },
      ],
    },
  ] as ConflictDaySnapshot[],
};
