import { publicConflictId } from '@/shared/lib/env';
import { fmtDate } from '@/shared/lib/format';
import { prisma } from '@/server/lib/db';

import { PAGE_SIZE } from './events';

const CONFLICT_ID = publicConflictId;

export async function getBriefs(filters?: { page?: number }) {
  const where = { conflictId: CONFLICT_ID };
  const page = Math.max(1, filters?.page ?? 1);

  const [rows, total] = await Promise.all([
    prisma.conflictDaySnapshot.findMany({
      where,
      orderBy: { day: 'desc' },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        day: true,
        dayLabel: true,
        summary: true,
        escalation: true,
        keyFacts: true,
      },
    }),
    prisma.conflictDaySnapshot.count({ where }),
  ]);

  return {
    briefs: rows.map((r) => ({
      ...r,
      day: fmtDate(r.day.toISOString()),
    })),
    total,
  };
}

export async function getBrief(day: string) {
  const date = new Date(day + 'T00:00:00Z');

  const row = await prisma.conflictDaySnapshot.findFirst({
    where: { conflictId: CONFLICT_ID, day: date },
    include: {
      casualties: true,
      economicChips: { orderBy: { ord: 'asc' } },
      scenarios: { orderBy: { ord: 'asc' } },
    },
  });

  if (!row) return null;

  return {
    ...row,
    day: fmtDate(row.day.toISOString()),
  };
}
