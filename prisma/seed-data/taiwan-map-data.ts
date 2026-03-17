import type { StrikeArc, MissileTrack, Target, Asset, ThreatZone, HeatPoint } from '@/data/map-data';

export const STRIKE_ARCS: StrikeArc[] = [
  {
    id: 'sa-tw-001',
    actor: 'CHINA',
    priority: 'P1',
    category: 'KINETIC',
    type: 'AIRSTRIKE',
    status: 'COMPLETE',
    timestamp: '2026-03-01T04:00:00Z',
    from: [118.0, 24.5], // Xiamen area
    to: [121.2, 24.8],   // Hsinchu Air Base
    label: 'Initial Strike - Hsinchu',
    severity: 'CRITICAL'
  }
];

export const MISSILE_TRACKS: MissileTrack[] = [
  {
    id: 'mt-tw-001',
    actor: 'CHINA',
    priority: 'P1',
    category: 'KINETIC',
    type: 'BALLISTIC',
    status: 'IMPACTED',
    timestamp: '2026-03-01T04:05:00Z',
    from: [116.0, 26.0], // Inland Fujian
    to: [121.5, 25.0],   // Taipei
    label: 'DF-17 Hypersonic Track',
    severity: 'CRITICAL'
  }
];

export const TARGETS: Target[] = [
  {
    id: 'tg-tw-001',
    actor: 'TAIWAN',
    priority: 'P1',
    category: 'INSTALLATION',
    type: 'AIR_BASE',
    status: 'ACTIVE',
    timestamp: '2026-03-01T04:00:00Z',
    name: 'Hsinchu Air Base',
    position: [120.9, 24.8],
    description: 'Home of the ROCAF 2nd Tactical Fighter Wing (Mirage 2000-5).'
  },
  {
    id: 'tg-tw-002',
    actor: 'TAIWAN',
    priority: 'P1',
    category: 'INSTALLATION',
    type: 'GOVERNMENT',
    status: 'ACTIVE',
    timestamp: '2026-03-01T04:00:00Z',
    name: 'Presidential Office Building',
    position: [121.5, 25.0],
    description: 'Heart of the ROC government in Taipei.'
  }
];

export const ALLIED_ASSETS: Asset[] = [
  {
    id: 'as-tw-001',
    actor: 'US',
    priority: 'P1',
    category: 'INSTALLATION',
    type: 'CARRIER',
    status: 'ACTIVE',
    name: 'USS Ronald Reagan (CVN-76)',
    position: [124.0, 20.0], // Philippine Sea
    description: 'Lead ship of CSG-5, moving to Luzon Strait.'
  },
  {
    id: 'as-tw-002',
    actor: 'US',
    priority: 'P2',
    category: 'INSTALLATION',
    type: 'AIR_BASE',
    status: 'ACTIVE',
    name: 'Kadena Air Base',
    position: [127.7, 26.3], // Okinawa
    description: 'Key US air power hub in the Pacific.'
  }
];

export const THREAT_ZONES: ThreatZone[] = [
  {
    id: 'tz-tw-001',
    actor: 'CHINA',
    priority: 'P1',
    category: 'ZONE',
    type: 'RESTRICTED',
    name: 'PLA Blockade Zone North',
    coordinates: [
      [121.0, 26.0], [122.5, 26.0], [122.5, 25.3], [121.0, 25.3]
    ],
    color: [255, 0, 0, 0.3]
  },
  {
    id: 'tz-tw-002',
    actor: 'CHINA',
    priority: 'P1',
    category: 'ZONE',
    type: 'RESTRICTED',
    name: 'PLA Blockade Zone South',
    coordinates: [
      [119.5, 22.8], [121.0, 22.8], [121.0, 22.0], [119.5, 22.0]
    ],
    color: [255, 0, 0, 0.3]
  }
];

export const HEAT_POINTS: HeatPoint[] = [
  {
    id: 'hp-tw-001',
    actor: 'CHINA',
    priority: 'P2',
    position: [121.0, 24.9],
    weight: 0.8
  }
];
