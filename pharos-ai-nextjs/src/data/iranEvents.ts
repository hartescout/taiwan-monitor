/**
 * Event timeline — Operation Epic Fury / Roaring Lion
 * Sources: Reuters, NYT, Guardian, ISW/CTP, CENTCOM, IDF, CNBC, Wikipedia
 * All times UTC
 */

export type Severity = 'CRITICAL' | 'HIGH' | 'STANDARD';
export type EventType = 'MILITARY' | 'DIPLOMATIC' | 'INTELLIGENCE' | 'ECONOMIC' | 'HUMANITARIAN' | 'POLITICAL';

export interface Source {
  name: string;
  tier: 1 | 2 | 3;
  reliability: number;
  url?: string;
}

export interface ActorResponse {
  actorId: string;
  actorName: string;
  stance: 'SUPPORTING' | 'OPPOSING' | 'NEUTRAL' | 'UNKNOWN';
  type: string;
  statement: string;
}

export interface IntelEvent {
  id:             string;
  timestamp:      string;
  severity:       Severity;
  type:           EventType;
  title:          string;
  location:       string;
  summary:        string;
  fullContent:    string;
  verified:       boolean;
  sources:        Source[];
  actorResponses: ActorResponse[];
  tags:           string[];
}

export const EVENTS: IntelEvent[] = [
  {
    id:        'evt-001',
    timestamp: '2026-02-28T04:32:00Z',
    severity:  'CRITICAL',
    type:      'MILITARY',
    title:     'First strikes hit Tehran — Khamenei compound targeted',
    location:  'Tehran, Iran',
    summary:   'US B-2 Spirit bombers and Israeli F-35I aircraft launched the opening wave of Operation Epic Fury / Roaring Lion, striking Khamenei\'s residential compound and IRGC headquarters in Tehran. Multiple large explosions reported across the capital. Iranian air defenses were simultaneously suppressed by Tomahawk cruise missile volleys from the USS Gerald R. Ford CSG.',
    fullContent: `At 04:32 UTC on February 28, 2026, US and Israeli forces launched the opening strikes of a coordinated campaign against Iran.

US Air Force B-2 Spirit stealth bombers, operating from Diego Garcia, delivered the first munitions against leadership compounds in Tehran. Simultaneously, IDF F-35I Adir jets struck Khamenei's residential compound in Saadatabad, northwest Tehran. Multiple secondary explosions were observed by satellite.

US Navy Tomahawk cruise missiles from the USS Gerald R. Ford carrier strike group targeted Iranian S-300 and SA-65 air defense batteries in western Iran to suppress retaliatory capability. Pentagon officials confirmed the operation had been in planning for several months.

Israeli Defense Minister Israel Katz issued a public statement within minutes of the strikes commencing: "The IDF is striking the head of the snake." Trump posted a video to Truth Social stating that the US had launched operations alongside Israel to destroy Iran's nuclear program and missile capability.

Iranian state television was disrupted but resumed broadcast within 30 minutes. Initial reports from Tehran residents described a sequence of heavy explosions followed by sustained anti-aircraft fire visible across the city.`,
    verified: true,
    sources: [
      { name: 'Reuters',            tier: 1, reliability: 99 },
      { name: 'IDF Spokesperson',   tier: 1, reliability: 90 },
      { name: 'Pentagon Readout',   tier: 1, reliability: 95 },
      { name: 'NYT live feed',      tier: 1, reliability: 97 },
    ],
    actorResponses: [
      { actorId: 'us',  actorName: 'President Trump',    stance: 'SUPPORTING', type: 'STATEMENT', statement: 'We have launched strikes on Iran alongside our great ally Israel. Their nuclear program is being destroyed. The Iranian people will soon be free.' },
      { actorId: 'idf', actorName: 'IDF Spokesperson',  stance: 'SUPPORTING', type: 'STATEMENT', statement: 'The IDF is conducting Operation Roaring Lion against existential threats to the State of Israel. We are striking the head of the snake.' },
    ],
    tags: ['operation-epic-fury', 'khamenei', 'tehran', 'first-strike'],
  },

  {
    id:        'evt-002',
    timestamp: '2026-02-28T05:50:00Z',
    severity:  'CRITICAL',
    type:      'MILITARY',
    title:     'GBU-57 MOPs strike Fordow and Natanz — largest B-2 strike in US history',
    location:  'Fordow / Natanz, Iran',
    summary:   'In the largest B-2 operational strike in US history, 14 GBU-57A/B Massive Ordnance Penetrators — each weighing 30,000 lbs — were dropped on Iran\'s underground nuclear enrichment facilities at Fordow (near Qom) and Natanz. Both sites are assessed to be heavily damaged or destroyed. IAEA reports loss of sensor contact with both facilities.',
    fullContent: `At approximately 05:50 UTC, USAF B-2 Spirit bombers delivered 14 GBU-57A/B Massive Ordnance Penetrators (MOPs) — the world's most powerful conventional bunker-buster bomb — against the deeply buried nuclear enrichment facilities at Fordow and Natanz.

Fordow, buried 80–100m beneath a mountain near Qom, had been assessed as the most hardened nuclear facility in Iran. The facility housed approximately 1,000 IR-1 centrifuges. Multiple MOPs were required to penetrate to the facility level. Initial BDA (bomb damage assessment) via satellite indicates catastrophic structural damage.

Natanz, the primary uranium enrichment site, was struck with additional GBU-57s and conventional JDAMs. The above-ground pilot fuel enrichment plant was simultaneously targeted by Israeli F-15I aircraft.

Foundation for Defense of Democracies confirmed via FDD Action: "This is the largest B-2 operational strike in US history." The strike employed 14 of the roughly 20 MOPs believed to be in the US arsenal.

IAEA Director General confirmed loss of safeguards sensor contact with both Fordow and Natanz approximately 40 minutes after the strikes. Russia immediately called for an emergency IAEA Board of Governors session.

Former US National Security Advisor John Bolton: "This is exactly what should have been done 20 years ago."`,
    verified: true,
    sources: [
      { name: 'FDD Action',         tier: 2, reliability: 89 },
      { name: 'IAEA Statement',     tier: 1, reliability: 98 },
      { name: 'Reuters',            tier: 1, reliability: 99 },
      { name: 'Pentagon readout',   tier: 1, reliability: 95 },
    ],
    actorResponses: [
      { actorId: 'iaea', actorName: 'IAEA Director General', stance: 'NEUTRAL', type: 'STATEMENT', statement: 'We have lost sensor contact with safeguarded nuclear facilities at Fordow and Natanz. An emergency Board of Governors session has been requested.' },
      { actorId: 'russia', actorName: 'Russian MFA', stance: 'OPPOSING', type: 'STATEMENT', statement: 'Russia condemns the illegal military strikes on civilian nuclear infrastructure under IAEA safeguards. This is a gross violation of international law.' },
    ],
    tags: ['nuclear', 'fordow', 'natanz', 'bunker-buster', 'gbu-57'],
  },

  {
    id:        'evt-003',
    timestamp: '2026-02-28T07:15:00Z',
    severity:  'CRITICAL',
    type:      'INTELLIGENCE',
    title:     'Khamenei, IRGC Commander, Defense Minister, NSC Secretary confirmed killed',
    location:  'Tehran, Iran',
    summary:   'Israeli officials confirmed the IDF killed Supreme Leader Ali Khamenei, IRGC Commander MG Mohammad Pakpour, Defense Minister BG Aziz Nasirzadeh, NSC Secretary Ali Shamkhani, and Army Chief Gen. Abdolrahim Mousavi. Iran\'s state media initially denied Khamenei\'s death before confirming it at 14:30 UTC. The decapitation strikes eliminated virtually the entire Iranian security establishment simultaneously.',
    fullContent: `Multiple senior Israeli intelligence officials, speaking to Axios and other outlets, confirmed the assassination of the following Iranian leadership:

• Supreme Leader Ali Khamenei — struck in Saadatabad residential compound, Tehran. Satellite imagery published by NYT shows multiple buildings within the compound complex destroyed. IRNA confirmed death at 14:30 UTC.

• IRGC Commander Major General Mohammad Pakpour — killed in IRGC HQ strike. Pakpour had replaced Hossein Salami, who was killed in the June 2025 war.

• Defense Minister Brigadier General Aziz Nasirzadeh — killed in Ministry of Defense building strike, Tehran.

• Supreme National Security Council Secretary Ali Shamkhani — killed in SNSC headquarters strike.

• Islamic Republic of Iran Army Chief General Abdolrahim Mousavi — killed in Army HQ strike.

Iranian state media initially denied all deaths. President Masoud Pezeshkian, Judiciary Chief Gholamhossein Mohseni Ejei, and Assembly of Experts head Alireza Arafi have assumed transitional leadership per constitutional succession. Former President Ahmadinejad's condition remains unknown — he was reportedly targeted.

Crowds of Iranians began gathering in Tehran and other cities to celebrate following Khamenei's confirmed death, according to multiple reports and social media footage.`,
    verified: true,
    sources: [
      { name: 'Axios / Israeli officials', tier: 1, reliability: 93 },
      { name: 'IRNA (Iranian state media)', tier: 2, reliability: 80 },
      { name: 'Reuters',                   tier: 1, reliability: 99 },
      { name: 'ISW/CTP Special Report',    tier: 1, reliability: 97 },
    ],
    actorResponses: [
      { actorId: 'iran', actorName: 'Iran Transitional Government', stance: 'OPPOSING', type: 'STATEMENT', statement: 'The Islamic Republic confirms the martyrdom of the Supreme Leader. The revolution will not die with him. All Islamic forces have been called to maximum retaliation.' },
      { actorId: 'idf',  actorName: 'Israeli PM Netanyahu',         stance: 'SUPPORTING', type: 'STATEMENT', statement: 'Israel has eliminated several leaders responsible for the Iranian nuclear programme. The existential threat posed by the Iranian regime is being dismantled.' },
    ],
    tags: ['khamenei', 'decapitation', 'pakpour', 'shamkhani', 'leadership'],
  },

  {
    id:        'evt-004',
    timestamp: '2026-02-28T08:45:00Z',
    severity:  'CRITICAL',
    type:      'MILITARY',
    title:     'Iran launches 35+ ballistic missiles at Israel; Tel Aviv and Jerusalem hit',
    location:  'Israel / Iran',
    summary:   'Iran launched the first retaliatory wave — approximately 35 ballistic missiles targeting Tel Aviv, Jerusalem, Haifa, and Eilat. Iron Dome and Arrow-3 systems intercepted a majority, but Iranian warheads struck residential areas in Jerusalem and Tel Aviv. 11 Israeli civilians were killed, 450+ injured. Ben Gurion Airport declared closed to all commercial traffic.',
    fullContent: `At 08:45 UTC, Iran launched an initial barrage of approximately 35 Shahab-3, Emad, and Kheibar Shekan ballistic missiles from launchers in western and central Iran at Israeli population centers.

Israel's Arrow-3 and Arrow-2 systems intercepted the majority of incoming missiles at high altitude. Iron Dome engaged shorter-range threats. However, several warheads penetrated Israeli defenses and struck:

• Jerusalem: Three missiles struck residential neighborhoods near the Jerusalem suburb of Gilo. 7 confirmed killed, over 200 injured.
• Tel Aviv: Two impacts in the Ramat Aviv and Kiryat Ono districts. 4 killed, 190+ injured.
• Haifa: Iron Dome successfully intercepted all incoming missiles.
• Eilat: Two missiles intercepted by Arrow-3.

Ben Gurion Airport immediately suspended all commercial and charter flights. The US Embassy issued an emergency alert directing all American citizens in Israel to shelter in place. The Embassy stated it was "not in a position to evacuate or directly assist Americans" leaving Israel.

IDF Home Front Command issued a nationwide shelter-in-place order for all Israeli residents.

A second missile barrage was reported approximately 90 minutes later.`,
    verified: true,
    sources: [
      { name: 'IDF Spokesperson', tier: 1, reliability: 90 },
      { name: 'Reuters',          tier: 1, reliability: 99 },
      { name: 'ISW/CTP',          tier: 1, reliability: 97 },
      { name: 'AP',               tier: 1, reliability: 98 },
    ],
    actorResponses: [
      { actorId: 'us',  actorName: 'US Embassy Jerusalem', stance: 'NEUTRAL', type: 'ALERT', statement: 'The U.S. Embassy is not in a position to evacuate or directly assist Americans leaving Israel. All personnel directed to shelter in place.' },
      { actorId: 'iran', actorName: 'IRGC Spokesperson',  stance: 'OPPOSING', type: 'STATEMENT', statement: 'The Islamic Revolutionary Guard Corps confirms the launch of Operation True Promise 3 in response to the criminal aggression of the Zionist regime and its American sponsors.' },
    ],
    tags: ['missile-strike', 'israel', 'jerusalem', 'tel-aviv', 'ben-gurion', 'iron-dome'],
  },

  {
    id:        'evt-005',
    timestamp: '2026-02-28T10:00:00Z',
    severity:  'CRITICAL',
    type:      'MILITARY',
    title:     'Iran strikes US bases in Bahrain, Qatar, Kuwait, UAE, Jordan, Saudi Arabia',
    location:  'Persian Gulf region',
    summary:   'Iran launched simultaneous ballistic missile and drone attacks against US military installations across the Gulf. NSA Al-Dhafra (UAE), Al-Udeid (Qatar), Ali Al Salem (Kuwait), Al-Tanf (Jordan), and multiple Saudi bases were hit. CENTCOM confirmed 3 US service members killed, 5 seriously wounded. Attacks intended to deny US forces ability to continue strike operations.',
    fullContent: `At approximately 10:00 UTC, Iran executed a coordinated multi-directional retaliatory strike against US military installations across the Middle East and Gulf region.

Confirmed strikes and casualties:

• NSA Bahrain (home of US 5th Fleet): Multiple Shahed-136 drones and Fateh-110 missiles intercepted; 4 injuries.
• Al-Udeid Air Base, Qatar: 3 missile impacts on runway and fuel storage. 16 injuries. F-15 sorties temporarily suspended.
• NSA Souda Bay via Iranian proxies in Syria: Unconfirmed.
• Ali Al Salem Air Base, Kuwait: 1 US serviceman killed, 1 Kuwaiti civilian killed.
• Al-Tanf Garrison, Jordan: 2 US service members killed. Direct hit on barracks.
• King Khalid Military City, Saudi Arabia: 3 missile impacts; Saudi defenses intercepted majority.
• Unknown UAE base: 3 UAE civilians killed.

CENTCOM statement at 09:30 ET (14:30 UTC March 1): "Three U.S. service members have been killed in action and five are seriously wounded as part of Operation Epic Fury."

Iran also attacked civilian aviation infrastructure — international airports in Kuwait and UAE were struck by missiles. Maersk immediately suspended Trans-Suez sailings.

President Trump, speaking to CNBC from Mar-a-Lago: "That often happens in war. We are doing this not for now, we are doing this for the future and it is a noble mission."`,
    verified: true,
    sources: [
      { name: 'CENTCOM official statement', tier: 1, reliability: 99 },
      { name: 'Reuters',                    tier: 1, reliability: 99 },
      { name: 'CNBC',                       tier: 1, reliability: 95 },
      { name: 'ISW/CTP',                    tier: 1, reliability: 97 },
    ],
    actorResponses: [
      { actorId: 'us',  actorName: 'CENTCOM',         stance: 'SUPPORTING', type: 'STATEMENT', statement: 'Three U.S. service members have been killed in action and five are seriously wounded as part of Operation Epic Fury. Several others sustained minor injuries.' },
      { actorId: 'trump', actorName: 'President Trump', stance: 'SUPPORTING', type: 'STATEMENT', statement: 'Casualties often happen in war. We are doing this not for now, we are doing this for the future. It is a noble mission. Everything is ahead of schedule.' },
    ],
    tags: ['us-bases', 'gulf', 'casualties', 'centcom', 'al-udeid', 'bahrain'],
  },

  {
    id:        'evt-006',
    timestamp: '2026-02-28T12:00:00Z',
    severity:  'CRITICAL',
    type:      'ECONOMIC',
    title:     'IRGC declares Strait of Hormuz closed — 200+ vessels anchored',
    location:  'Strait of Hormuz',
    summary:   'The IRGC formally declared the Strait of Hormuz closed to all traffic. Over 200 vessels, including oil tankers and LNG carriers, dropped anchor in surrounding waters. Maersk paused Trans-Suez sailings and rerouted via Cape of Good Hope. Three tankers were damaged in the Gulf — unclear if deliberate. 14 million barrels per day of oil flow disrupted.',
    fullContent: `At 12:00 UTC, the IRGC formally announced the closure of the Strait of Hormuz to all commercial and military traffic, executing a long-stated deterrence threat.

The Strait, at its narrowest just 21 nautical miles wide between Iran and Oman, is the world's most critical energy chokepoint. More than 14 million barrels per day — approximately one-third of global seaborne crude exports — transit the Strait annually, along with significant volumes of LNG.

Shipping reports confirmed over 200 vessels, including oil tankers, LNG carriers, and container ships, dropped anchor in the waters approaching the Strait. The IRGC deployed fast-attack craft and threatened to fire upon any vessel attempting transit.

Reuters confirmed: "At least three tankers in the Gulf have been damaged since the U.S. and Israel began trading strikes with Iran. It is unclear whether the damage was done deliberately or accidentally."

Maersk statement: "We have paused Trans-Suez sailings through the Bab el-Mandeb Strait for the moment. Some sailings will be rerouted around the Cape of Good Hope. All vessel crossings in the Strait of Hormuz are also suspended."

Oil futures spiked approximately 35% in after-hours trading. Brent crude hit $143/barrel. US gasoline futures jumped significantly. Economists warned of a severe supply shock if the closure persists beyond 1–2 weeks.

US 5th Fleet issued a statement it was "monitoring the situation" but declined to announce active efforts to reopen the Strait.`,
    verified: true,
    sources: [
      { name: 'Reuters',             tier: 1, reliability: 99 },
      { name: 'Maersk statement',    tier: 1, reliability: 98 },
      { name: 'CNBC',                tier: 1, reliability: 95 },
      { name: 'Kpler data',          tier: 2, reliability: 92 },
    ],
    actorResponses: [
      { actorId: 'iran', actorName: 'IRGC Navy',       stance: 'OPPOSING', type: 'MILITARY ACTION', statement: 'All vessels are warned: the Strait of Hormuz is closed. Any vessel attempting transit will be treated as a hostile actor.' },
      { actorId: 'us',   actorName: 'US 5th Fleet',    stance: 'NEUTRAL',  type: 'STATEMENT',       statement: 'The US Navy Fifth Fleet is monitoring the situation in the Strait of Hormuz and remains committed to freedom of navigation in international waters.' },
    ],
    tags: ['hormuz', 'oil', 'shipping', 'maersk', 'economic', 'energy'],
  },

  {
    id:        'evt-007',
    timestamp: '2026-02-28T16:00:00Z',
    severity:  'HIGH',
    type:      'POLITICAL',
    title:     'Iranians celebrate in Tehran streets following Khamenei\'s confirmed death',
    location:  'Tehran, Isfahan, Shiraz, Iran',
    summary:   'Large crowds gathered in Tehran, Isfahan, and other Iranian cities overnight, celebrating the confirmed death of Supreme Leader Khamenei. This follows the largest protest movement in Iran since the Islamic Revolution (2025–2026), during which Iran killed thousands of civilian protesters. The celebrations represent a major intelligence indicator regarding the regime\'s domestic legitimacy.',
    fullContent: `Following IRNA's confirmation of Supreme Leader Khamenei's death, large crowds of Iranians took to the streets of Tehran, Isfahan, Shiraz, and other cities in scenes of celebration.

The New York Times reported: "Large crowds of Iranians poured into the streets of Tehran and other cities across Iran overnight, celebrating the news that Iran's supreme leader, Ayatollah Ali Khamenei, had been killed during a day of coordinated U.S. and Israeli attacks."

This development has significant intelligence implications. The 2025–2026 Iranian protests — described as the largest since the Islamic Revolution — were met with a massacre of thousands of civilians by regime security forces in January 2026. Trump had stated "help is on the way" in response to the crackdown.

The celebratory response suggests a significant portion of the Iranian population views the regime's collapse as positive. This undermines the regime's claim to represent the Iranian people and complicates the IRGC's ability to mobilize domestic support for continued retaliation.

Senator Mark Warner (D-VA), speaking on CNN, stated: "I saw no intelligence that Iran was on the verge of launching any kind of preemptive strike against the United States of America. None." This directly contradicted the Trump administration's stated justification for the operation.

Transitional government leadership confirmed: President Pezeshkian, Judiciary Chief Mohseni Ejei, and Assembly of Experts head Arafi have assumed collective leadership per constitutional succession procedures.`,
    verified: true,
    sources: [
      { name: 'NYT',               tier: 1, reliability: 97 },
      { name: 'Guardian',          tier: 1, reliability: 96 },
      { name: 'CNN / Sen. Warner', tier: 1, reliability: 95 },
      { name: 'IRNA (state media)', tier: 2, reliability: 78 },
    ],
    actorResponses: [
      { actorId: 'warner', actorName: 'Sen. Mark Warner (D-VA)', stance: 'OPPOSING', type: 'STATEMENT', statement: 'I saw no intelligence that Iran was on the verge of launching any kind of preemptive strike against the United States. None.' },
      { actorId: 'cotton', actorName: 'Sen. Tom Cotton (R-AR)',  stance: 'SUPPORTING', type: 'STATEMENT', statement: 'President Trump is right that it is absolutely vital and necessary to address Iran\'s threat before it fully materializes.' },
    ],
    tags: ['iran-domestic', 'celebration', 'khamenei-death', 'protests', 'transitional'],
  },

  {
    id:        'evt-008',
    timestamp: '2026-02-28T18:30:00Z',
    severity:  'HIGH',
    type:      'DIPLOMATIC',
    title:     'Russia calls emergency IAEA Board of Governors session; UN Security Council convened',
    location:  'Vienna / New York',
    summary:   'Russia formally requested an emergency session of the IAEA Board of Governors, citing US-Israeli strikes on nuclear facilities under IAEA safeguards as a violation of international law. The UN Security Council convened an emergency session. Russia and China vetoed a ceasefire resolution. Western nations defended Israel\'s and the US\'s right to self-defense.',
    fullContent: `Russia's Permanent Mission to the International Organizations in Vienna formally requested an emergency Board of Governors session "on matters related to military strikes of the United States and Israel against the territory of the Islamic Republic of Iran that started in the morning of 28 February 2026."

The diplomatic note specifically cited strikes against "nuclear facilities under IAEA safeguards" as grounds for the emergency convening. The session was confirmed for Monday morning, Vienna time.

Simultaneously, the UN Security Council convened an emergency session. Russia and China introduced a draft resolution calling for an immediate ceasefire. The US vetoed the resolution. The UK abstained.

Key diplomatic positions:
• Russia (opposing): "Gross violation of international law and sovereignty."
• China (opposing): "Unilateral military action against a sovereign state is condemned."
• UK (neutral-supporting): "Raised serious concerns about civilian casualties while affirming Israel's right to self-defense."
• France: "Called for immediate cessation of hostilities pending diplomatic engagement."
• Germany: "Deeply concerned. Called for protection of civilian nuclear infrastructure."

ISW/CTP noted: "The UN Security Council action is unlikely to have practical effect given US veto power but signals significant multilateral diplomatic isolation for Washington and Tel Aviv."`,
    verified: true,
    sources: [
      { name: 'PBS NewsHour',     tier: 1, reliability: 95 },
      { name: 'AP',               tier: 1, reliability: 98 },
      { name: 'Reuters',          tier: 1, reliability: 99 },
      { name: 'ISW/CTP',          tier: 1, reliability: 97 },
    ],
    actorResponses: [
      { actorId: 'russia', actorName: 'Russian MFA',  stance: 'OPPOSING', type: 'DIPLOMATIC', statement: 'Russia calls for an immediate IAEA emergency session. These strikes on safeguarded nuclear facilities represent a grave violation of international law.' },
      { actorId: 'us',     actorName: 'US Ambassador to UN', stance: 'SUPPORTING', type: 'DIPLOMATIC', statement: 'The United States exercised its veto. No other nation has done more to prevent nuclear proliferation. Iran had a nuclear weapon within months.' },
    ],
    tags: ['iaea', 'un', 'russia', 'china', 'diplomatic', 'veto', 'international-law'],
  },

  {
    id:        'evt-009',
    timestamp: '2026-02-28T20:00:00Z',
    severity:  'HIGH',
    type:      'MILITARY',
    title:     'Houthis announce resumption of Red Sea shipping attacks',
    location:  'Yemen / Red Sea',
    summary:   'Yemen-based Houthis announced they would resume attacks on shipping in the Red Sea and Bab el-Mandeb Strait in solidarity with Iran. The announcement followed the US-Israeli strikes. Maersk, which had already paused Suez sailings, confirmed the Red Sea route was now untenable. Global shipping costs surging. Bab el-Mandeb effectively closed.',
    fullContent: `The Houthis, designated as a terrorist organization by the US and operating from Yemen, announced via their official Telegram channel and spokesperson that they would resume attacks on commercial shipping in the Red Sea, Arabian Sea, and Gulf of Aden in response to US-Israeli strikes on Iran.

"In support of our brothers in the Islamic Republic of Iran and in response to the criminal aggression of the US and Zionist entity, the Yemeni Armed Forces declare the resumption of military operations against all ships linked to the enemies of Islam in the Red Sea, Bab el-Mandeb, and the Arabian Sea."

Maersk confirmed it was pausing all Trans-Suez sailings and rerouting available vessels via the Cape of Good Hope. Other major carriers including CMA CGM and MSC were assessing their routes.

The Bab el-Mandeb closure, combined with the Strait of Hormuz closure, has effectively bottled up oil and gas exports from the Persian Gulf entirely. Lloyd's of London declared a "war risk" zone covering the entire Persian Gulf, Red Sea, and Arabian Sea — triggering insurance rate spikes.

Houthi actions had previously disrupted approximately 15% of global trade during 2024–2025. The resumption of attacks following a period of relative calm significantly widens the conflict's economic impact.

US 5th Fleet confirmed CENTCOM was "re-assessing Houthi threat posture" but no immediate strike operations against Yemen were announced.`,
    verified: true,
    sources: [
      { name: 'Reuters',           tier: 1, reliability: 99 },
      { name: 'Maersk statement',  tier: 1, reliability: 98 },
      { name: 'Times of Israel',   tier: 2, reliability: 86 },
      { name: 'ISW/CTP',           tier: 1, reliability: 97 },
    ],
    actorResponses: [
      { actorId: 'houthis', actorName: 'Houthi Military Spokesperson', stance: 'OPPOSING', type: 'STATEMENT', statement: 'We declare the resumption of military operations against all ships of the enemies in the Red Sea and Bab el-Mandeb in support of Iran.' },
    ],
    tags: ['houthis', 'red-sea', 'shipping', 'bab-el-mandeb', 'maersk', 'maritime'],
  },

  {
    id:        'evt-010',
    timestamp: '2026-03-01T06:00:00Z',
    severity:  'HIGH',
    type:      'MILITARY',
    title:     'IDF continues strikes — Isfahan nuclear complex, IRGC Navy assets targeted',
    location:  'Isfahan / Chabahar, Iran',
    summary:   'The IDF confirmed continued strikes into Day 2, targeting the Isfahan nuclear complex (above-ground research buildings), IRGC Navy frigate IRIS Jamaran, and the IRGC Navy Imam Ali base in Chabahar. Nuclear-related missile production sites in Parchin also reportedly struck. Netanyahu: "Strikes against sites linked to the nuclear program will continue in the coming days."',
    fullContent: `As Operation Epic Fury / Roaring Lion entered its second day, the IDF confirmed continued strike operations against a range of Iranian military and nuclear-related targets.

IDF confirmed targets on Day 2 (as of 06:00 UTC March 1):

Nuclear-related:
• Isfahan nuclear complex — above-ground administration and research buildings. Separate from the underground enrichment facility struck Day 1.
• Parchin military complex — explosive research and testing facility. CSIS confirmed unverified reports of strikes at Parchin.
• Iran Atomic Energy Agency headquarters, Tehran — secondary administrative strike.

Military:
• IRGC Navy frigate IRIS Jamaran — struck at berth in Bandar Abbas. Unconfirmed destruction status per ISW/CTP.
• IRGC Navy Imam Ali Naval Base, Chabahar — unverified reports of strikes.
• Additional Shahab-3 and Kheibar Shekan missile launcher sites in western Iran.

PM Netanyahu statement: "Israeli strikes have also killed several leaders involved in the Iranian nuclear programme and that strikes against sites linked to the programme would continue in the coming days."

CSIS analysis: "Initial reports suggest targets have included administrative hubs and dual-use scientific research facilities. There are unconfirmed reports that the United States has struck the Iran Atomic Energy Agency headquarters in Tehran and the explosive research testing facility at Parchin, as well as conducted further strikes at the Isfahan nuclear complex."`,
    verified: true,
    sources: [
      { name: 'IDF Spokesperson', tier: 1, reliability: 90 },
      { name: 'CSIS analysis',    tier: 1, reliability: 94 },
      { name: 'Reuters',          tier: 1, reliability: 99 },
      { name: 'ISW OSINT account',tier: 2, reliability: 82 },
    ],
    actorResponses: [
      { actorId: 'idf', actorName: 'PM Netanyahu', stance: 'SUPPORTING', type: 'STATEMENT', statement: 'Israeli strikes have killed several leaders of the Iranian nuclear programme. Strikes against nuclear sites will continue in the coming days. The job is not finished.' },
    ],
    tags: ['day-2', 'isfahan', 'parchin', 'irgc-navy', 'jamaran', 'nuclear-continued'],
  },

  {
    id:        'evt-011',
    timestamp: '2026-03-01T09:30:00Z',
    severity:  'HIGH',
    type:      'POLITICAL',
    title:     'Trump: Iran operations "ahead of schedule"; Democrats question legal basis',
    location:  'Washington D.C. / Mar-a-Lago',
    summary:   'President Trump told CNBC the operation is "moving along very well — ahead of schedule." He described it as "a very noble mission for the world." However, Senate Intelligence Committee ranking member Mark Warner stated he had seen "no intelligence" suggesting Iran was planning a preemptive strike — directly contradicting the administration\'s legal justification. Congressional Democrats demanded briefings.',
    fullContent: `President Trump conducted a phone interview with CNBC's Joe Kernen from Mar-a-Lago on the morning of March 1, 2026:

"We're moving along very well, very well — ahead of schedule. It's a very violent regime, one of the most violent regimes in history. We're doing our job not just for us but for the world. And everything is ahead of schedule."

Trump described a potential off-ramp: "Things are evolving in a very positive way right now, a very positive way." He did not specify terms for a ceasefire.

However, Sen. Mark Warner (D-VA), ranking member of the Senate Intelligence Committee and cleared for highly classified intelligence, contradicted the administration's justification:

"I saw no intelligence that Iran was on the verge of launching any kind of preemptive strike against the United States of America. None." Warner was responding to a senior Trump official's claim that "we had analysis that basically told us, if we sat back and waited to get hit first, the amount of casualties and damage would be substantially higher."

Republican counterpart Sen. Tom Cotton (R-AR) defended the strikes: "President Trump is right that it is absolutely vital and necessary now to address that threat before it fully materializes in the near future."

This political divide has significant implications for the operation's legal standing under the War Powers Resolution and for the bipartisan support required for sustained funding.`,
    verified: true,
    sources: [
      { name: 'CNBC',               tier: 1, reliability: 95 },
      { name: 'CNN State of Union', tier: 1, reliability: 95 },
      { name: 'AP',                 tier: 1, reliability: 98 },
    ],
    actorResponses: [
      { actorId: 'trump',  actorName: 'President Trump',    stance: 'SUPPORTING', type: 'STATEMENT', statement: 'Everything is ahead of schedule. It\'s a very noble mission for the world.' },
      { actorId: 'warner', actorName: 'Sen. Warner (D-VA)', stance: 'OPPOSING',   type: 'STATEMENT', statement: 'I saw no intelligence that Iran was planning a preemptive strike. None. This requires a full congressional briefing.' },
    ],
    tags: ['trump', 'political', 'legal-basis', 'war-powers', 'congress', 'warner'],
  },

  {
    id:        'evt-012',
    timestamp: '2026-03-01T13:42:00Z',
    severity:  'STANDARD',
    type:      'HUMANITARIAN',
    title:     'Iran casualty figures: 201 killed including 150 civilians — IRCS; Minab school airstrike',
    location:  'Iran (nationwide)',
    summary:   'Iranian Red Crescent Society (IRCS) reported 201 killed and 747 injured across Iran from US-Israeli strikes. HRANA (Human Rights Activists in Iran) reported 133 killed and 200+ injured. The Minab school airstrike in Hormozgan Province reportedly killed 148 civilians, including children. The incident drew condemnation from the UN and humanitarian organizations. Israel denied targeting the school.',
    fullContent: `The Iranian Red Crescent Society reported an updated toll of 201 killed and 747 injured across Iran as of March 1, 2026. Separately, HRANA (Human Rights Activists in Iran) reported 133 killed and at least 200 injured — the lower figure reflects verified reports excluding contested incidents.

The most significant humanitarian incident involves the Minab school airstrike in Hormozgan Province, southern Iran. Initial reports suggest 148 civilians were killed when a building housing displaced families was struck near a military installation. The incident is under investigation.

• IDF statement: "We do not target civilian infrastructure. All strikes are against military and strategic targets. We investigate all reports of civilian casualties."
• Iran: "The Zionist enemy deliberately targeted civilian shelters."
• ICRC: Called for immediate access to assess civilian casualties.
• UN Secretary-General: "Deeply alarmed by reports of civilian deaths. All parties must comply with international humanitarian law."

Regional casualties (outside Iran):
• UAE: 3 civilians killed, 58 injured
• Kuwait: 1 civilian killed, 32 injured  
• Qatar: 16 injured
• Bahrain: 4 injured
• Oman (Strait of Hormuz): 1 injured
• Syria: 5 civilians killed (from Iranian proxy operations)`,
    verified: true,
    sources: [
      { name: 'IRCS (Iranian Red Crescent)', tier: 2, reliability: 85 },
      { name: 'HRANA',                       tier: 2, reliability: 88 },
      { name: 'Reuters',                     tier: 1, reliability: 99 },
      { name: 'UN OCHA',                     tier: 1, reliability: 96 },
    ],
    actorResponses: [
      { actorId: 'un',  actorName: 'UN Secretary-General', stance: 'NEUTRAL', type: 'STATEMENT', statement: 'Deeply alarmed by reports of civilian deaths. All parties must comply with international humanitarian law. I call for an immediate ceasefire.' },
      { actorId: 'idf', actorName: 'IDF Spokesperson',     stance: 'NEUTRAL', type: 'STATEMENT', statement: 'We do not target civilian infrastructure. All strikes are directed at military and strategic objectives. We investigate all reports of civilian casualties.' },
    ],
    tags: ['casualties', 'humanitarian', 'minab', 'civilians', 'ircs', 'hrana'],
  },
];

export const SEV_STYLE: Record<Severity, { bg: string; color: string; dimBg: string }> = {
  CRITICAL: { bg: 'var(--danger)',  color: 'var(--danger)',  dimBg: 'var(--danger-dim)' },
  HIGH:     { bg: 'var(--warning)', color: 'var(--warning)', dimBg: 'var(--warning-dim)' },
  STANDARD: { bg: 'var(--info)',    color: 'var(--info)',    dimBg: 'var(--info-dim)' },
};
