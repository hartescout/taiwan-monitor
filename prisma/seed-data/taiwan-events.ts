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
  },
  {
    id: 'evt-tw-006',
    conflictId: 'taiwan-2026',
    timestamp: new Date('2026-03-01T05:30:00Z'),
    severity: 'HIGH',
    type: 'INTELLIGENCE',
    title: 'Massive DDoS Attack Targets Taiwan Government Portals',
    location: 'Taipei, Taiwan',
    summary: 'Websites for the Office of the President, Ministry of Foreign Affairs, and Ministry of National Defense have been taken offline by a massive DDoS attack.',
    fullContent: 'Traffic spikes exceeding 1.5 Tbps were detected originating from thousands of IP addresses, primarily mapped to mainland China. The coordinated attack hit at H-hour + 90 minutes, effectively cutting off official government communication channels to the public. Technical teams are attempting to shift to secondary cloud-based delivery networks.',
    verified: true,
    tags: ['Cyber', 'DDoS', 'C2'],
    sources: [{ name: 'NetBlocks', tier: 2, reliability: 5 }],
    actorResponses: []
  },
  {
    id: 'evt-tw-007',
    conflictId: 'taiwan-2026',
    timestamp: new Date('2026-03-01T11:45:00Z'),
    severity: 'CRITICAL',
    type: 'MILITARY',
    title: 'Naval Engagement Confirmed Near Penghu Islands',
    location: 'Penghu Archipelago',
    summary: 'A Taiwanese Tuo Chiang-class corvette was reportedly struck by a PLA YJ-18 anti-ship missile during a high-speed intercept mission.',
    fullContent: 'The ROCN vessel was attempting to challenge a PLAN Type 052D destroyer that had crossed the median line. After multiple warnings, the PLAN vessel launched two missiles. Impact confirmed; SAR operations are underway, but hampered by the exclusion zone restrictions.',
    verified: true,
    tags: ['Naval Battle', 'Penghu', 'Kinetic'],
    sources: [{ name: 'ROCN Command', tier: 1, reliability: 5 }, { name: 'Reuters Asia', tier: 1, reliability: 4 }],
    actorResponses: [
      { actorId: 'taiwan', actorName: 'Taiwan', stance: 'OPPOSING', type: 'STATEMENT', statement: 'This unprovoked attack on our sovereign defenders will not go unanswered.' }
    ]
  },
  {
    id: 'evt-tw-008',
    conflictId: 'taiwan-2026',
    timestamp: new Date('2026-03-01T14:00:00Z'),
    severity: 'HIGH',
    type: 'MILITARY',
    title: 'Japan Mobilizes JSDF; Activates Bases in Okinawa',
    location: 'Okinawa / Sakishima Islands',
    summary: 'The Japanese Ministry of Defense has raised the alert level to its highest tier and deployed F-15J fighters to Naha Air Base.',
    fullContent: 'Prime Minister Ishiba has authorized the deployment of Patriot PAC-3 batteries to Ishigaki and Miyako islands. Japan has formally protested the inclusion of waters near the Senkaku Islands in the PLA exclusion zone. Japan Coast Guard has been ordered to provide "defensive escort" for Japanese commercial vessels in the Philippine Sea.',
    verified: true,
    tags: ['Japan', 'JSDF', 'Escalation'],
    sources: [{ name: 'NHK World', tier: 1, reliability: 5 }, { name: 'Janes Defense', tier: 1, reliability: 5 }],
    actorResponses: [
      { actorId: 'us', actorName: 'United States', stance: 'SUPPORTING', type: 'STATEMENT', statement: 'We welcome Japan\'s proactive steps to maintain regional stability.' }
    ]
  },
  {
    id: 'evt-tw-009',
    conflictId: 'taiwan-2026',
    timestamp: new Date('2026-03-01T16:30:00Z'),
    severity: 'STANDARD',
    type: 'HUMANITARIAN',
    title: 'Mass Flight Cancellations; 50,000 Travelers Stranded',
    location: 'Taoyuan International Airport',
    summary: 'Major international airlines have suspended all flights to and from Taiwan following the declaration of the exclusion zone.',
    fullContent: 'EVA Air, China Airlines, Cathay Pacific, and United have all grounded flights scheduled for the next 72 hours. Taoyuan Airport is operating on limited backup power. Thousands of foreign nationals are attempting to reach representative offices for evacuation guidance.',
    verified: true,
    tags: ['Evacuation', 'Aviation', 'Civilian'],
    sources: [{ name: 'CNA', tier: 1, reliability: 5 }],
    actorResponses: []
  },
  {
    id: 'evt-tw-010',
    conflictId: 'taiwan-2026',
    timestamp: new Date('2026-03-01T20:00:00Z'),
    severity: 'HIGH',
    type: 'POLITICAL',
    title: 'UN Security Council Emergency Session Ends in Deadlock',
    location: 'New York, USA',
    summary: 'A draft resolution calling for an immediate PLA withdrawal was vetoed by China and Russia.',
    fullContent: 'The emergency session, called by the US and UK, devolved into heated exchanges. The Chinese representative stated that the "Taiwan issue is purely an internal matter" and that the UN has no jurisdiction. The US Ambassador warned that the "paralysis of the Council only hastens the path to broader conflict."',
    verified: true,
    tags: ['UN', 'Diplomacy', 'Veto'],
    sources: [{ name: 'UN Press Office', tier: 1, reliability: 5 }],
    actorResponses: [
      { actorId: 'us', actorName: 'United States', stance: 'OPPOSING', type: 'STATEMENT', statement: 'The failure of the Council today is a tragedy for international law.' }
    ]
  },
  {
    id: 'evt-tw-011',
    conflictId: 'taiwan-2026',
    timestamp: new Date('2026-03-01T06:45:00Z'),
    severity: 'HIGH',
    type: 'MILITARY',
    title: 'PLA Air Force Sorties 56 Aircraft into Taiwan ADIZ',
    location: 'Southwest ADIZ, Taiwan',
    summary: 'The largest single-day air incursion in 2026 was recorded today, with PLA J-16 and H-6 bombers testing Taiwan\'s southern defenses.',
    fullContent: 'Taiwan\'s MND reported that 56 PLA aircraft entered the southwestern ADIZ. The package included 34 J-16 fighters, 12 H-6 nuclear-capable bombers, and 10 support aircraft. ROCAF scrambled interceptors and activated land-based missile systems to track the formations.',
    verified: true,
    tags: ['ADIZ', 'PLAAF', 'Air Incursion'],
    sources: [{ name: 'Taiwan MND', tier: 1, reliability: 5 }],
    actorResponses: []
  },
  {
    id: 'evt-tw-012',
    conflictId: 'taiwan-2026',
    timestamp: new Date('2026-03-01T09:15:00Z'),
    severity: 'HIGH',
    type: 'INTELLIGENCE',
    title: 'Reports of Undersea Cable Severance Near Matsu Islands',
    location: 'Matsu Archipelago',
    summary: 'Two critical undersea fiber-optic cables connecting Matsu to the main island of Taiwan have been cut.',
    fullContent: 'Internet connectivity to the Matsu islands has dropped by 95%. Preliminary data suggests the cables were severed by a dragging anchor or specialized cutting tool. A Chinese fishing vessel was spotted in the vicinity shortly before the outage.',
    verified: true,
    tags: ['Cables', 'Infrastructure', 'Gray Zone'],
    sources: [{ name: 'Chunghwa Telecom', tier: 1, reliability: 5 }],
    actorResponses: []
  },
  {
    id: 'evt-tw-013',
    conflictId: 'taiwan-2026',
    timestamp: new Date('2026-03-01T13:30:00Z'),
    severity: 'STANDARD',
    type: 'MILITARY',
    title: 'US P-8A Poseidon Conducts Surveillance Mission in Strait',
    location: 'Taiwan Strait',
    summary: 'A US Navy surveillance aircraft transited the Taiwan Strait in international airspace to monitor PLAN movements.',
    fullContent: 'The P-8A Poseidon flew a standard mission to provide maritime domain awareness. The PLA Eastern Theater Command reportedly shadowed the aircraft and issued multiple radio warnings, which were ignored by the US crew.',
    verified: true,
    tags: ['US Navy', 'Surveillance', 'Freedom of Navigation'],
    sources: [{ name: 'US 7th Fleet Public Affairs', tier: 1, reliability: 5 }],
    actorResponses: []
  },
  {
    id: 'evt-tw-014',
    conflictId: 'taiwan-2026',
    timestamp: new Date('2026-03-01T15:45:00Z'),
    severity: 'HIGH',
    type: 'MILITARY',
    title: 'Taiwan Coast Guard Confronts Chinese Maritime Militia',
    location: 'Kinmen Islands',
    summary: 'A tense standoff occurred near Kinmen after dozens of Chinese "fishing" vessels entered restricted waters.',
    fullContent: 'Taiwan Coast Guard Administration (CGA) vessels deployed water cannons to repel the militia ships. The Chinese vessels retreated only after a PLAN corvette appeared on the horizon. No shots were fired, but the incident marks a significant escalation in gray-zone pressure.',
    verified: true,
    tags: ['Kinmen', 'Maritime Militia', 'Gray Zone'],
    sources: [{ name: 'CGA Taiwan', tier: 1, reliability: 5 }],
    actorResponses: []
  },
  {
    id: 'evt-tw-015',
    conflictId: 'taiwan-2026',
    timestamp: new Date('2026-03-01T18:20:00Z'),
    severity: 'STANDARD',
    type: 'INTELLIGENCE',
    title: 'ASPI Identifies Surge in Pro-PRC Cognitive Warfare',
    location: 'Cyber / Social Media',
    summary: 'Researchers have detected a massive, coordinated disinformation campaign aimed at spreading panic within Taiwan.',
    fullContent: 'The Australian Strategic Policy Institute (ASPI) reported a 400% increase in bot activity on X and Facebook. The campaign focuses on fake reports of "imminent surrender" and "US abandonment." Many accounts were traced back to known PLA Strategic Support Force clusters.',
    verified: true,
    tags: ['Disinformation', 'Cognitive Warfare', 'ASPI'],
    sources: [{ name: 'ASPI International Cyber Policy Centre', tier: 2, reliability: 5 }],
    actorResponses: []
  }
];
