import type { ActivityLevel, Stance } from '@/types/domain';

export const ACTOR_SNAPSHOTS = [
  {
    actorId: 'us',
    day: '2026-03-01',
    activityLevel: 'CRITICAL' as ActivityLevel,
    activityScore: 95,
    stance: 'DEFENDER' as Stance,
    saying: '"Operation Formosa Shield is a defensive necessity to preserve the freedom of the Pacific."',
    doing: [
      'Deploying Carrier Strike Groups 5 and 7 to intercept positions.',
      'Activating real-time intelligence sharing with Taipei.',
      'Enforcing energy counter-blockade in the Malacca Strait.'
    ],
    assessment: 'The US is rapidly transitioning to a war footing in the Pacific. Priority is breaking the blockade of Taiwan without triggering a mainland strike.'
  },
  {
    actorId: 'china',
    day: '2026-03-01',
    activityLevel: 'CRITICAL' as ActivityLevel,
    activityScore: 98,
    stance: 'AGGRESSOR' as Stance,
    saying: '"Joint Sword-2026A is a legitimate response to separatist provocations."',
    doing: [
      'Maintaining Total Exclusion Zone around Taiwan.',
      'Conducting saturated missile strikes on air defense nodes.',
      'Executing island-wide cyber-kinetic operations.'
    ],
    assessment: 'China has achieved strategic surprise with the scale of its blockade and cyber opening. PLAN is testing US resolve in the Philippine Sea.'
  },
  {
    actorId: 'taiwan',
    day: '2026-03-01',
    activityLevel: 'CRITICAL' as ActivityLevel,
    activityScore: 92,
    stance: 'DEFENDER' as Stance,
    saying: '"Every citizen is a defender of our home. Taiwan will not bow."',
    doing: [
      'Activating Overall Defense Concept (ODC).',
      'Deploying mobile anti-ship missile batteries.',
      'Transitioning leadership to mountain bunkers.'
    ],
    assessment: 'Taiwan\'s military remains functional despite the blackout. The main challenge is maintaining C2 and managing the immediate economic shock.'
  }
];
