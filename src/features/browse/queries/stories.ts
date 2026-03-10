import { publicConflictId } from '@/shared/lib/env';
import { prisma } from '@/server/lib/db';

const CONFLICT_ID = publicConflictId;

export async function getStories() {
  const rows = await prisma.mapStory.findMany({
    where: { conflictId: CONFLICT_ID },
    orderBy: { timestamp: 'desc' },
    select: {
      id: true,
      title: true,
      tagline: true,
      iconName: true,
      category: true,
      narrative: true,
      keyFacts: true,
      timestamp: true,
      events: { orderBy: { ord: 'asc' }, select: { id: true, ord: true, time: true, label: true, type: true } },
    },
  });

  return rows.map((r) => ({
    ...r,
    timestamp: r.timestamp.toISOString(),
  }));
}

export async function getStory(storyId: string) {
  const row = await prisma.mapStory.findFirst({
    where: { id: storyId, conflictId: CONFLICT_ID },
    include: {
      events: { orderBy: { ord: 'asc' } },
    },
  });

  if (!row) return null;

  return {
    ...row,
    timestamp: row.timestamp.toISOString(),
  };
}
