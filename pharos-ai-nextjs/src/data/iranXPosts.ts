/**
 * X (Twitter) Signal posts — Operation Epic Fury / Roaring Lion
 * Based on real reporting patterns: Reuters, CENTCOM, IDF, ISW, OSINTdefender
 * All timestamps UTC, Feb 28–Mar 1 2026
 */

export interface XPost {
  id: string;
  handle: string;
  displayName: string;
  avatar: string;           // 2-char initials
  avatarColor: string;
  verified: boolean;
  accountType: 'military' | 'government' | 'journalist' | 'analyst' | 'official';
  significance: 'BREAKING' | 'HIGH' | 'STANDARD';
  timestamp: string;        // ISO 8601
  content: string;
  images?: string[];
  videoThumb?: string;
  likes: number;
  retweets: number;
  replies: number;
  views: number;
  eventId?: string;         // links to iranEvents evt-xxx
  actorId?: string;         // links to iranActors id
  pharosNote?: string;      // '⚠️ ' prefix = warning
}

export function fmt(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000)     return (n / 1_000).toFixed(1) + 'K';
  return String(n);
}

export const X_POSTS: XPost[] = [
  // ── 1. CENTCOM — US KIA confirmed ─────────────────────────────────────────
  {
    id: 'xi-001',
    handle: '@CENTCOM',
    displayName: 'US Central Command',
    avatar: 'CC',
    avatarColor: '#1a56db',
    verified: true,
    accountType: 'military',
    significance: 'BREAKING',
    timestamp: '2026-03-01T14:32:00Z',
    content: 'CENTCOM STATEMENT — March 1, 2026:\n\nThree U.S. service members have been killed in action and five are seriously wounded as part of Operation Epic Fury. Several others sustained minor injuries during Iranian retaliatory strikes on regional installations.\n\nThe names of the fallen will be released after notification of next of kin. We honor their sacrifice and remain committed to mission success.\n\nOperations are ongoing.',
    likes: 181000,
    retweets: 94000,
    replies: 28700,
    views: 12400000,
    eventId: 'evt-005',
    actorId: 'us',
    pharosNote: '✅ Official CENTCOM statement. First confirmed US KIA figure — 3 killed, 5 seriously wounded. Cross-reference with DoD casualty release.',
  },

  // ── 2. IDF — Opening strike confirmed ────────────────────────────────────
  {
    id: 'xi-002',
    handle: '@IDF',
    displayName: 'Israel Defense Forces',
    avatar: 'ID',
    avatarColor: '#0049a0',
    verified: true,
    accountType: 'military',
    significance: 'BREAKING',
    timestamp: '2026-02-28T04:55:00Z',
    content: 'OPERATION ROARING LION — UNDERWAY\n\nThe IDF is currently conducting extensive strikes against Iranian nuclear facilities, ballistic missile launchers, and regime leadership targets across Iran.\n\nTargets include:\n▸ Iranian nuclear enrichment sites\n▸ IRGC leadership compounds, Tehran\n▸ Surface-to-surface missile launcher arrays\n▸ Air defense infrastructure\n\nThe State of Israel is exercising its inherent right of self-defense. Operations are ongoing. Updates will follow.',
    likes: 224000,
    retweets: 117000,
    replies: 61000,
    views: 19800000,
    eventId: 'evt-001',
    actorId: 'idf',
    pharosNote: '✅ First official IDF confirmation. Note language: "nuclear facilities" explicitly named — unusually direct for IDF public comms. Significant.',
  },

  // ── 3. Reuters BREAKING — Khamenei killed ────────────────────────────────
  {
    id: 'xi-003',
    handle: '@Reuters',
    displayName: 'Reuters',
    avatar: 'RT',
    avatarColor: '#ff8000',
    verified: true,
    accountType: 'journalist',
    significance: 'BREAKING',
    timestamp: '2026-02-28T14:38:00Z',
    content: 'BREAKING: Iran\'s state broadcaster IRNA confirms Supreme Leader Ali Khamenei was killed in Israeli airstrikes on his residential compound in Tehran earlier today.\n\nIRGC confirms "martyrdom of the Supreme Leader" — Khamenei, 86, had led the Islamic Republic since 1989.\n\nTransitional leadership now forming under constitutional succession procedure. Full story: reuters.com',
    likes: 892000,
    retweets: 441000,
    replies: 189000,
    views: 67000000,
    eventId: 'evt-003',
    actorId: 'iran',
    pharosNote: '✅ Confirmed via IRNA (Iranian state media) and Axios sourcing senior Israeli officials. This is the highest-confidence confirmation available.',
  },

  // ── 4. NYT — GBU-57 MOP strike detail ────────────────────────────────────
  {
    id: 'xi-004',
    handle: '@nytimes',
    displayName: 'The New York Times',
    avatar: 'NY',
    avatarColor: '#000000',
    verified: true,
    accountType: 'journalist',
    significance: 'HIGH',
    timestamp: '2026-02-28T08:12:00Z',
    content: 'NEW: The US Air Force dropped 14 GBU-57 Massive Ordnance Penetrators — each weighing 30,000 pounds — on Iran\'s underground nuclear facilities at Fordow and Natanz, per US officials.\n\nThis is the largest B-2 Spirit operational strike in US history. The US is believed to hold roughly 20 MOPs total.\n\nThe IAEA has lost sensor contact with both facilities. nytimes.com',
    likes: 523000,
    retweets: 278000,
    replies: 97000,
    views: 38000000,
    eventId: 'evt-002',
    actorId: 'us',
    pharosNote: '✅ Senior Pentagon officials confirmed 14 MOPs. Depleting ~70% of US MOP stockpile in a single operation is strategically significant — limits options for any future contingency.',
  },

  // ── 5. OSINT_Defender — Thermal imagery ──────────────────────────────────
  {
    id: 'xi-005',
    handle: '@OSINTdefender',
    displayName: 'OSINTdefender',
    avatar: 'OD',
    avatarColor: '#7c3aed',
    verified: true,
    accountType: 'analyst',
    significance: 'HIGH',
    timestamp: '2026-02-28T06:47:00Z',
    content: 'OSINT THREAD — Fordow nuclear site:\n\nSentinel-1 SAR imagery from 05:30Z shows massive ground disturbance signatures at grid [33.894° N, 51.077° E] consistent with multiple large-yield bunker penetrator strikes.\n\nThermal anomaly persists 90 min post-strike — indicates subsurface structural collapse and possible fire/gas release.\n\nMatches B-2 routing observed in ADS-B/MLAT data from Diego Garcia ~4h prior. Thread 🧵 [1/12]',
    images: ['osint-thermal-1'],
    likes: 187000,
    retweets: 104000,
    replies: 24000,
    views: 8900000,
    eventId: 'evt-002',
    pharosNote: '✅ OSINTdefender is a tier-1 OSINT analyst with strong track record on nuclear facility analysis. Thermal anomaly interpretation is consistent with deep penetrator strikes.',
  },

  // ── 6. ISW Research — Leadership decapitation assessment ─────────────────
  {
    id: 'xi-006',
    handle: '@ISWResearch',
    displayName: 'ISW Research',
    avatar: 'IS',
    avatarColor: '#1e3a5f',
    verified: true,
    accountType: 'analyst',
    significance: 'HIGH',
    timestamp: '2026-02-28T19:15:00Z',
    content: 'ISW SPECIAL ASSESSMENT — IRAN LEADERSHIP DECAPITATION:\n\nConfirmed killed (Feb 28): Supreme Leader Khamenei, IRGC CINC Pakpour, DefMin Nasirzadeh, SNSC Sec Shamkhani, Army Chief Mousavi.\n\nThis is the most comprehensive elimination of a state security leadership in a single operational day since WWII. Iran\'s formal command structure is effectively destroyed.\n\nKey uncertainty: IRGC unit-level cohesion and pre-delegated retaliatory authority. Pre-planned protocols are likely executing autonomously. Full assessment: understandingwar.org',
    likes: 143000,
    retweets: 89000,
    replies: 19400,
    views: 6700000,
    eventId: 'evt-003',
    pharosNote: '✅ ISW/CTP is a tier-1 conflict analysis organization. Assessment of autonomous retaliation protocols is analytically sound — IRGC doctrine includes pre-delegated strike authority.',
  },

  // ── 7. PressTV — Iranian state media propaganda ───────────────────────────
  {
    id: 'xi-007',
    handle: '@PressTV',
    displayName: 'Press TV',
    avatar: 'PT',
    avatarColor: '#006633',
    verified: false,
    accountType: 'government',
    significance: 'STANDARD',
    timestamp: '2026-02-28T15:22:00Z',
    content: 'The Islamic Republic\'s armed forces have launched Operation True Promise 3, striking Zionist entity and American imperial bases across the region in response to the criminal aggression against our sovereign territory.\n\n35+ precision ballistic missiles confirmed hitting targets in the occupied territories. All IRGC units at maximum readiness. The Resistance Axis will prevail. #TruePromise3 #EpicFury',
    likes: 47000,
    retweets: 21000,
    replies: 34000,
    views: 3100000,
    eventId: 'evt-004',
    actorId: 'iran',
    pharosNote: '⚠️ Iranian state media. Casualty and damage claims are systematically inflated. Treat all specifics as unverified propaganda. Cross-reference with CENTCOM/IDF readouts and independent satellite BDA.',
  },

  // ── 8. IRNA English — Hormuz closure declaration ─────────────────────────
  {
    id: 'xi-008',
    handle: '@IRNA_English',
    displayName: 'IRNA (Islamic Republic News Agency)',
    avatar: 'IR',
    avatarColor: '#006633',
    verified: false,
    accountType: 'government',
    significance: 'BREAKING',
    timestamp: '2026-02-28T12:05:00Z',
    content: 'URGENT: The Islamic Revolutionary Guard Corps has formally declared the Strait of Hormuz closed to all commercial and military traffic effective immediately.\n\n"Any vessel attempting transit will be treated as a hostile actor supporting aggression against the Islamic Republic."\n\n— IRGC Navy Command Statement, February 28, 2026',
    likes: 88000,
    retweets: 67000,
    replies: 41000,
    views: 9200000,
    eventId: 'evt-006',
    actorId: 'irgc',
    pharosNote: '⚠️ IRNA is Iranian state media. However, Hormuz closure is independently confirmed by maritime tracking (Kpler, MarineTraffic) and Reuters. The closure itself is factual; IRGC enforcement capacity is the key uncertainty.',
  },

  // ── 9. Trump Truth Social screenshot ─────────────────────────────────────
  {
    id: 'xi-009',
    handle: '@realDonaldTrump',
    displayName: 'Donald J. Trump (Truth Social screenshot)',
    avatar: 'DT',
    avatarColor: '#b91c1c',
    verified: true,
    accountType: 'government',
    significance: 'BREAKING',
    timestamp: '2026-02-28T05:15:00Z',
    content: '[Truth Social post screenshotted to X]\n\nThe United States, together with our GREAT ally Israel, has just launched military strikes on Iran\'s nuclear program. I have been saying for years that this needed to be done. The Iranian people will SOON be FREE. This is a very NOBLE mission for the world — not just for America.\n\nTo the people of Iran: We are not your enemy. Your Supreme Leader and the IRGC are your enemy. Help is on the way. ❤️🇺🇸',
    videoThumb: 'trump-mar-a-lago',
    likes: 1400000,
    retweets: 620000,
    replies: 890000,
    views: 94000000,
    eventId: 'evt-001',
    actorId: 'us',
    pharosNote: '✅ Confirmed authentic Truth Social post. Note direct appeal to Iranian population — indicates regime change as unstated US objective alongside nuclear dismantlement.',
  },

  // ── 10. Journalist — Hormuz maritime disruption ───────────────────────────
  {
    id: 'xi-010',
    handle: '@FarnoushAmiri',
    displayName: 'Farnoush Amiri / AP',
    avatar: 'FA',
    avatarColor: '#1d4ed8',
    verified: true,
    accountType: 'journalist',
    significance: 'HIGH',
    timestamp: '2026-02-28T14:20:00Z',
    content: 'From Persian Gulf: 200+ vessels now at anchor outside the Strait of Hormuz. MarineTraffic live shows ZERO tanker transits in last 4 hours. IRGC fast-attack boats visible on AIS approaching Larak Island.\n\nOne tanker captain I spoke with: "No one is moving. We are waiting. Nobody knows how long."\n\nBrent crude now +38% in after-hours. Gasoline futures limit-up. This is already the largest supply shock since the 1973 embargo.',
    likes: 204000,
    retweets: 118000,
    replies: 31000,
    views: 11400000,
    eventId: 'evt-006',
    actorId: 'irgc',
    pharosNote: '✅ On-the-ground AP reporting with primary source (captain). AIS data corroborates zero Hormuz transit. Oil price impact (+38%) is significant — if sustained >2 weeks, global recession risk elevated.',
  },

  // ── 11. Maersk corporate statement ───────────────────────────────────────
  {
    id: 'xi-011',
    handle: '@Maersk',
    displayName: 'Maersk',
    avatar: 'MK',
    avatarColor: '#42b0d5',
    verified: true,
    accountType: 'official',
    significance: 'HIGH',
    timestamp: '2026-02-28T15:45:00Z',
    content: 'MAERSK CUSTOMER ADVISORY — February 28, 2026:\n\nMaersk is pausing all Trans-Suez sailings through the Bab el-Mandeb Strait. Vessels in transit are being diverted. All Hormuz crossings are suspended pending security assessment.\n\nAffected sailings will be rerouted around the Cape of Good Hope. Customers will receive individual shipment updates within 24 hours.\n\nWe continue to monitor the situation closely and prioritize crew safety above all else. maersk.com/advisory',
    likes: 47000,
    retweets: 38000,
    replies: 12000,
    views: 4100000,
    eventId: 'evt-009',
    pharosNote: '✅ Official Maersk communication. Both major chokepoints (Hormuz + Bab el-Mandeb) simultaneously closed is the worst-case maritime scenario. Cape rerouting adds ~14 days and $2M+ per voyage.',
  },

  // ── 12. Oil price reporter ─────────────────────────────────────────────────
  {
    id: 'xi-012',
    handle: '@JavierBlas',
    displayName: 'Javier Blas / Bloomberg',
    avatar: 'JB',
    avatarColor: '#1d4ed8',
    verified: true,
    accountType: 'journalist',
    significance: 'HIGH',
    timestamp: '2026-02-28T13:10:00Z',
    content: 'OIL MARKETS THREAD 🧵\n\nBrent crude: +35.4% → $143.28/bbl (first close above $140 since 2008)\nWTI: +33.1% → $138.90\nHenry Hub gas: +29%\nGasoline futures: LIMIT UP\n\nMath: Hormuz = 20% of global oil, Bab el-Mandeb = another 10%. Both closed simultaneously for the first time in history.\n\nThis is not 2022 Ukraine. Inventories are low, SPR was never fully replenished. If the Strait stays closed 3+ weeks: $180–$200/bbl territory. Recalibrate your assumptions.',
    likes: 312000,
    retweets: 189000,
    replies: 48000,
    views: 21000000,
    eventId: 'evt-006',
    pharosNote: '✅ Javier Blas is Bloomberg\'s lead energy correspondent. Price figures and supply math are accurate. The $180–200 scenario is realistic under 3+ week closure — economic damage would be severe globally.',
  },

  // ── 13. Iranian civilians celebrating (user account) ─────────────────────
  {
    id: 'xi-013',
    handle: '@IranianVoice2024',
    displayName: 'دختر تهران / Tehran Girl',
    avatar: 'TG',
    avatarColor: '#6d28d9',
    verified: false,
    accountType: 'analyst',
    significance: 'STANDARD',
    timestamp: '2026-02-28T17:30:00Z',
    content: 'TEHRAN RIGHT NOW 🎉\n\nPeople are dancing in Vanak Square. I have not seen this since... I have never seen this. Fireworks on the street. People crying with happiness.\n\nKhamenei killed the protesters. Khamenei killed the women who just wanted to live free. Khamenei killed my cousin in Mahsa protests.\n\nToday Tehran breathes.\n\nI know this is war. I know more bombs will fall. But I cannot pretend I am sad. I am not. #MahsaAmini #WomanLifeFreedom',
    videoThumb: 'tehran-celebration',
    likes: 1200000,
    retweets: 578000,
    replies: 203000,
    views: 44000000,
    eventId: 'evt-007',
    actorId: 'iran',
    pharosNote: '⚠️ Unverified account but video and geolocation confirmed as authentic Tehran by multiple OSINT analysts. Significant strategic intelligence: Iranian civilian celebration of Khamenei\'s death undermines regime legitimacy narrative.',
  },

  // ── 14. Sen. Warner statement ─────────────────────────────────────────────
  {
    id: 'xi-014',
    handle: '@MarkWarner',
    displayName: 'Sen. Mark Warner (D-VA)',
    avatar: 'MW',
    avatarColor: '#1e40af',
    verified: true,
    accountType: 'government',
    significance: 'HIGH',
    timestamp: '2026-03-01T11:04:00Z',
    content: 'I sit on the Senate Intelligence Committee. I am fully cleared and have reviewed the relevant intelligence.\n\nI want to be clear: I saw NO intelligence that Iran was on the verge of launching any kind of preemptive strike against the United States of America. None.\n\nThe administration\'s legal justification for this operation under the War Powers Resolution is not supported by the evidence I reviewed. Congress must be fully briefed immediately.\n\nThree Americans are now dead. The American people deserve the truth.',
    likes: 487000,
    retweets: 234000,
    replies: 178000,
    views: 28000000,
    eventId: 'evt-011',
    actorId: 'us',
    pharosNote: '⚠️ Sen. Warner (ranking member, Senate Intelligence Committee) directly contradicts the Trump administration\'s legal basis for the operation. This creates significant War Powers Resolution jeopardy if other cleared members corroborate.',
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

export function getPostsForEvent(eventId: string): XPost[] {
  return X_POSTS.filter(p => p.eventId === eventId);
}

export function getPostsForActor(actorId: string): XPost[] {
  return X_POSTS.filter(p => p.actorId === actorId);
}

export function getBreakingPosts(): XPost[] {
  return X_POSTS.filter(p => p.significance === 'BREAKING');
}
