import type { Severity, EventType, IntelEvent } from '@/types/domain';

export const EVENTS: (IntelEvent & { sources: any[], actorResponses: any[] })[] = [
  {
    id: 'evt-tw-001',
    conflictId: 'taiwan-2026',
    timestamp: new Date('2026-03-01T04:00:00Z'),
    severity: 'CRITICAL',
    type: 'MILITARY',
    title: 'PLA Launches "Joint Sword-2026A" with Massive Missile Barrage',
    location: 'Taiwan Strait / Coastal Taiwan',
    summary: 'The People\'s Liberation Army began a large-scale military operation against Taiwan, starting with coordinated missile strikes from the Eastern Theater Command. Initial targets include air defense radars, command and control centers, and major airbases.',
    fullContent: 'At 04:00 local time, over 100 ballistic and cruise missiles were detected launching from mainland China. The barrage included DF-15, DF-16, and DF-17 hypersonic missiles. Impact sites confirmed at Hsinchu Air Base, Ching Chuan Kang Air Base, and the Ministry of National Defense in Taipei. Taiwan\'s Sky Bow III and Patriot systems engaged multiple targets, but several high-value facilities suffered significant damage.',
    verified: true,
    tags: ['Missile Strike', 'Blockade', 'PLA', 'Taiwan Strait'],
    sources: [
      { name: 'Taiwan Ministry of National Defense', tier: 1, reliability: 5, url: 'https://www.mnd.gov.tw' },
      { name: 'AEI China-Taiwan Update (Mar 6, 2026)', tier: 1, reliability: 5, url: 'https://www.aei.org/articles/china-taiwan-update-march-6-2026/' },
      { name: 'INDOPACOM Satellite Intel', tier: 1, reliability: 5 }
    ],
    actorResponses: [
      { actorId: 'taiwan', actorName: 'Taiwan', stance: 'OPPOSING', type: 'STATEMENT', statement: 'President Lai has declared a national state of emergency. We will defend every inch of our territory.' },
      { actorId: 'china', actorName: 'China', stance: 'SUPPORTING', type: 'OFFICIAL', statement: 'Joint Sword-2026A is a necessary action to protect national sovereignty.' }
    ]
  },
  {
    id: 'evt-tw-002',
    conflictId: 'taiwan-2026',
    timestamp: new Date('2026-03-01T04:15:00Z'),
    severity: 'CRITICAL',
    type: 'INTELLIGENCE',
    title: 'Widespread Power Outage Following "Black Sky" Cyberattack',
    location: 'Island-wide Taiwan',
    summary: 'A sophisticated cyber-kinetic attack has disabled the majority of Taiwan\'s state-owned power grid (Taipower), causing a near-total blackout across the island.',
    fullContent: 'Simultaneous with the missile strikes, malware targeting Industrial Control Systems (ICS) was activated within Taiwan\'s power distribution network. The attack, attributed to China\'s PLA Unit 61398, caused cascading failures in major substations. Emergency services are operating on backup generators. Telecommunications are severely degraded.',
    verified: true,
    tags: ['Cyberattack', 'Blackout', 'Hybrid Warfare'],
    sources: [
      { name: 'Taipower Emergency Bulletin', tier: 1, reliability: 5 },
      { name: 'NetBlocks', tier: 2, reliability: 4 }
    ],
    actorResponses: []
  },
  {
    id: 'evt-tw-003',
    conflictId: 'taiwan-2026',
    timestamp: new Date('2026-03-01T06:00:00Z'),
    severity: 'HIGH',
    type: 'MILITARY',
    title: 'PLAN Establishes "Total Exclusion Zone" Around Taiwan',
    location: 'Waters surrounding Taiwan',
    summary: 'The People\'s Liberation Army Navy (PLAN) has deployed three carrier groups and dozens of surface combatants to enforce a maritime and aerial blockade.',
    fullContent: 'China has formally declared six exercise zones that effectively encircle Taiwan. Any vessel or aircraft entering these zones without PLA authorization is being warned they will be treated as hostile. This move has successfully halted all commercial shipping to the ports of Kaohsiung and Keelung.',
    verified: true,
    tags: ['Naval Blockade', 'Exclusion Zone', 'PLAN'],
    sources: [
      { name: 'Xinhua News Agency', tier: 1, reliability: 4 },
      { name: 'Janes: Taiwan Strategy OSINT Insight', tier: 1, reliability: 5, url: 'https://www.janes.com/osint-insights/defence-and-national-security-analysis/taiwan-strategy-likely-lead-to-increased-tension' },
      { name: 'US 7th Fleet Tracking', tier: 1, reliability: 5 }
    ],
    actorResponses: [
      { actorId: 'us', actorName: 'United States', stance: 'OPPOSING', type: 'DIPLOMATIC', statement: 'The US does not recognize the illegal exclusion zone and will maintain freedom of navigation.' }
    ]
  },
  {
    id: 'evt-tw-004',
    conflictId: 'taiwan-2026',
    timestamp: new Date('2026-03-01T08:30:00Z'),
    severity: 'HIGH',
    type: 'ECONOMIC',
    title: 'TSMC Suspends Operations; Hsinchu Science Park Evacuated',
    location: 'Hsinchu, Taiwan',
    summary: 'TSMC has officially suspended all semiconductor production across its Taiwan facilities following power instability and physical security threats.',
    fullContent: 'Following the "Black Sky" cyberattack and missile impacts near Hsinchu, TSMC activated its "Resilience Protocol." All extreme ultraviolet (EUV) lithography machines have been moved to a safe state. Staff have been evacuated to hardened shelters. This effectively halts 90% of the world\'s advanced chip production.',
    verified: true,
    tags: ['Semiconductors', 'TSMC', 'Economy'],
    sources: [
      { name: 'TSMC Corporate IR', tier: 1, reliability: 5 },
      { name: 'Bloomberg Technology', tier: 2, reliability: 4 }
    ],
    actorResponses: []
  },
  {
    id: 'evt-tw-005',
    conflictId: 'taiwan-2026',
    timestamp: new Date('2026-03-01T10:00:00Z'),
    severity: 'STANDARD',
    type: 'POLITICAL',
    title: 'G7 Issues Joint Statement Condemning PLA Aggression',
    location: 'Brussels / Global',
    summary: 'Leaders of the G7 nations have issued a coordinated condemnation of the blockade, calling for an immediate restoration of the status quo.',
    fullContent: 'In a rare Sunday morning emergency session, G7 leaders characterized Joint Sword-2026A as a "flagrant violation of international law." The statement warns of "massive economic consequences" if the blockade is not lifted within 24 hours. China\'s MFA has already rejected the statement as "illegal interference."',
    verified: true,
    tags: ['G7', 'Diplomacy', 'Sanctions'],
    sources: [
      { name: 'Reuters', tier: 1, reliability: 5 },
      { name: 'State Department Press Office', tier: 1, reliability: 5 }
    ],
    actorResponses: [
      { actorId: 'china', actorName: 'China', stance: 'OPPOSING', type: 'STATEMENT', statement: 'The G7 has no standing to comment on China\'s internal affairs.' }
    ]
  }
];
