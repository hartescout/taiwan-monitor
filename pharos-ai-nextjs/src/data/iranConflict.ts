/**
 * OPERATION EPIC FURY / ROARING LION
 * US–Israel joint strike on Iran, February 28 – March 1, 2026
 * Source: Reuters, NYT, Guardian, ISW/CTP, CNBC, Wikipedia
 */

export const CONFLICT = {
  id:            'iran-2026',
  name:          'US–Israel Strikes on Iran',
  codename:      { us: 'Operation Epic Fury', il: 'Operation Roaring Lion' },
  status:        'ONGOING' as const,
  threatLevel:   'CRITICAL' as const,
  startDate:     '2026-02-28T04:30:00Z',  // first strikes, Tehran
  region:        'Iran / Persian Gulf / Middle East',
  escalation:    94,

  summary: `On February 28, 2026, the United States and Israel launched a coordinated joint strike on Iran — the most ambitious Western military operation against the Islamic Republic since its founding. Codenamed Operation Epic Fury by the Pentagon and Operation Roaring Lion by the IDF, the campaign targeted Iranian nuclear facilities, ballistic missile infrastructure, air defense networks, and regime leadership. Supreme Leader Ali Khamenei was killed when his compound in Tehran was struck. Multiple IRGC commanders and ministers were simultaneously assassinated. Iran responded with waves of ballistic missiles against Israel and U.S. military bases across the Gulf. The Strait of Hormuz remains closed. Operations are ongoing as of March 1, 2026.`,

  keyFacts: [
    'Khamenei confirmed killed — IRNA state media confirmation 14:30 UTC Feb 28',
    '14 GBU-57 Massive Ordnance Penetrators dropped on Fordow and Natanz — largest B-2 strike in US history',
    'Strait of Hormuz closed by IRGC — 200+ vessels anchored, 14M bbl/day disrupted',
    'Iran fired 35+ ballistic missiles at Israel; struck US bases in 6 Gulf nations',
    '3 US service members KIA, 5 seriously wounded (CENTCOM, Mar 1 09:30 ET)',
    '11 Israeli civilians killed, 450+ injured by Iranian retaliatory strikes',
    'Ben Gurion Airport closed to all commercial/charter traffic',
    'Maersk pausing Trans-Suez sailings, rerouting via Cape of Good Hope',
    'Houthis announcing resumption of Red Sea shipping attacks',
  ],

  objectives: {
    us:  'Destroy Iranian nuclear & missile capability, prevent nuclear breakout, topple regime',
    il:  'Remove existential threats — nuclear/missile programs, eliminate Axis of Resistance leadership',
  },

  commanders: {
    us: ['President Donald Trump', 'SecDef Pete Hegseth', 'CENTCOM CG Dan Caine', 'Adm. Brad Cooper'],
    il: ['PM Benjamin Netanyahu', 'DefMin Israel Katz', 'IDF Chief Eyal Zamir', 'IAF Chief Tomer Bar'],
    ir: ['President Masoud Pezeshkian (transitional)', 'Judiciary Chief Mohseni Ejei', 'Ali Larijani'],
  },

  casualties: {
    us:       { kia: 3,   wounded: 5,    civilians: 0 },
    israel:   { kia: 0,   wounded: 0,    civilians: 11, injured: 450 },
    iran:     { killed: 201, injured: 747 },  // IRCS figures
    regional: 'UAE 3 killed, Kuwait 1 killed, Qatar 16 injured, Bahrain 4 injured',
  },
};

export type ThreatLevel = 'CRITICAL' | 'HIGH' | 'ELEVATED' | 'MONITORING';
export type ConflictStatus = 'ONGOING' | 'PAUSED' | 'CEASEFIRE' | 'RESOLVED';
