import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from 'next';

import { Toaster } from '@/components/ui/sonner';

import { SITE_URL } from '@/features/browse/constants';

import { PostHogPageView } from '@/shared/lib/posthog-provider';
import { QueryProvider } from '@/shared/lib/query-provider';
import { ReduxProvider } from '@/shared/state/redux-provider';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: 'Taiwan Monitor',
  title: {
    default: 'Taiwan Monitor - Live Geopolitical Intelligence Dashboard',
    template: '%s | Taiwan Monitor',
  },
  description: 'Taiwan Monitor is a live geopolitical intelligence dashboard tracking the 2026 Taiwan Strait Crisis across events, actors, signals, and map-based analysis.',
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Taiwan Monitor',
    title: 'Taiwan Monitor - Live Geopolitical Intelligence Dashboard',
    description: 'Taiwan Monitor is a live geopolitical intelligence dashboard tracking the 2026 Taiwan Strait Crisis across events, actors, signals, and map-based analysis.',
    images: [
      {
        url: '/og-image-1200x630.jpg',
        width: 1200,
        height: 630,
        alt: 'Taiwan Monitor live intelligence dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taiwan Monitor - Live Geopolitical Intelligence Dashboard',
    description: 'Taiwan Monitor is a live geopolitical intelligence dashboard tracking the 2026 Taiwan Strait Crisis across events, actors, signals, and map-based analysis.',
    images: ['/og-image-1200x630.jpg'],
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PostHogPageView />
        <ReduxProvider>
          <QueryProvider>
            {children}
            <Toaster theme="dark" position="bottom-right" />
          </QueryProvider>
        </ReduxProvider>
        <Analytics />
      </body>
    </html>
  );
}
