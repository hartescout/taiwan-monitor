import { notFound } from 'next/navigation';

import type { Metadata } from 'next';

import { EventArticle } from '@/features/browse/components/EventArticle';
import { getEvent, getXPostsByEvent } from '@/features/browse/queries';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const event = await getEvent(id);
  if (!event) return { title: 'Event not found' };

  return {
    title: event.title,
    description: event.summary,
    openGraph: {
      title: `${event.title} — PHAROS`,
      description: event.summary,
      url: `https://www.conflicts.app/browse/events/${id}`,
    },
    alternates: { canonical: `https://www.conflicts.app/browse/events/${id}` },
  };
}

export default async function BrowseEventPage({ params }: Props) {
  const { id } = await params;
  const [event, xPosts] = await Promise.all([
    getEvent(id),
    getXPostsByEvent(id),
  ]);

  if (!event) notFound();

  const signals = xPosts.map((p) => ({
    handle: p.handle,
    displayName: p.displayName,
    significance: p.significance,
    timestamp: p.timestamp,
    content: p.content,
    likes: p.likes,
    retweets: p.retweets,
    views: p.views,
    pharosNote: p.pharosNote,
  }));

  return <EventArticle event={event} signals={signals} />;
}
