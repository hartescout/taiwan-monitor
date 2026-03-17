/**
 * PHAROS — RSS News Feeds
 * 40+ curated feeds from major global news sources + conflict-specific collections.
 */

import type { RssFeed, ConflictCollection } from '@/types/domain';

// ─── ALL FEEDS ───────────────────────────────────────────────

export const RSS_FEEDS: RssFeed[] = [
  // ── Global Wire / Western ──
  { id: 'reuters',       name: 'Reuters',              url: 'https://news.google.com/rss/search?q=site:reuters.com+when:1d&hl=en-US&gl=US&ceid=US:en', perspective: 'WESTERN', country: 'UK/US', tags: ['world', 'wire'], tier: 1 },
  { id: 'ap',            name: 'Associated Press',     url: 'https://feedx.net/rss/ap.xml',                      perspective: 'WESTERN',     country: 'US',        tags: ['world', 'wire'], tier: 1 },
  { id: 'bbc',           name: 'BBC World',            url: 'https://feeds.bbci.co.uk/news/world/rss.xml',       perspective: 'WESTERN',     country: 'UK',        tags: ['world'], tier: 2 },
  { id: 'nyt',           name: 'New York Times',       url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml', perspective: 'WESTERN', country: 'US',        tags: ['world'], tier: 2 },
  { id: 'guardian',      name: 'The Guardian',         url: 'https://www.theguardian.com/world/rss',             perspective: 'WESTERN',     country: 'UK',        tags: ['world'], tier: 2 },
  { id: 'ft',            name: 'Financial Times',      url: 'https://www.ft.com/world?format=rss',               perspective: 'WESTERN',     country: 'UK',        tags: ['world', 'finance'], tier: 2 },

  // ── US Government / Military ──
  { id: 'dod',           name: 'US Dept of Defense',   url: 'https://www.defense.gov/DesktopModules/ArticleCS/RSS.ashx?ContentType=1&Site=945&max=10', perspective: 'US_GOV', country: 'US', tags: ['military', 'official'], tier: 1 },
  { id: 'indopacom',     name: 'INDOPACOM News',       url: 'https://news.google.com/rss/search?q=INDOPACOM+when:1d&hl=en-US&gl=US&ceid=US:en', perspective: 'US_GOV', country: 'US', tags: ['military', 'official', 'pacific'], tier: 1 },
  { id: '7thfleet',      name: 'US 7th Fleet',         url: 'https://news.google.com/rss/search?q=7th+Fleet+when:1d&hl=en-US&gl=US&ceid=US:en', perspective: 'US_GOV', country: 'US', tags: ['military', 'official', 'pacific'], tier: 1 },

  // ── Taiwan Media (Local English) ──
  { id: 'focustaiwan',   name: 'Focus Taiwan',         url: 'https://focustaiwan.tw/rss/all.xml',                perspective: 'WESTERN',     country: 'Taiwan',    tags: ['taiwan', 'asia'], tier: 1 },
  { id: 'taipeitimes',   name: 'Taipei Times',         url: 'https://www.taipeitimes.com/xml/index.rss',         perspective: 'WESTERN',     country: 'Taiwan',    tags: ['taiwan', 'asia'], tier: 2 },
  { id: 'libertytimes',  name: 'Liberty Times',        url: 'https://news.ltn.com.tw/rss/all.xml',               perspective: 'WESTERN',     country: 'Taiwan',    tags: ['taiwan', 'local'], tier: 3 },
  { id: 'taiwantoday',   name: 'Taiwan Today',         url: 'https://taiwantoday.tw/rss.php',                    perspective: 'WESTERN',     country: 'Taiwan',    tags: ['taiwan', 'official'], tier: 3 },

  // ── Chinese Media (State / Aligned) ──
  { id: 'xinhua',        name: 'Xinhua',               url: 'https://www.xinhuanet.com/english/rss/worldrss.xml', perspective: 'CHINESE',    country: 'China',     tags: ['world', 'official'], stateFunded: true, tier: 4 },
  { id: 'globaltimes',   name: 'Global Times',         url: 'https://www.globaltimes.cn/rss/china.xml',          perspective: 'CHINESE',    country: 'China',     tags: ['world', 'official'], stateFunded: true, tier: 4 },
  { id: 'scmp',          name: 'South China Morning Post', url: 'https://www.scmp.com/rss/91/feed',              perspective: 'CHINESE',     country: 'Hong Kong', tags: ['world', 'asia'], tier: 3 },
  { id: 'chinadaily',    name: 'China Daily',          url: 'https://www.chinadaily.com.cn/rss/world.xml',       perspective: 'CHINESE',    country: 'China',     tags: ['world', 'official'], stateFunded: true, tier: 4 },

  // ── Regional Perspectives ──
  { id: 'japantimes',    name: 'The Japan Times',      url: 'https://www.japantimes.co.jp/feed/',                perspective: 'WESTERN',     country: 'Japan',     tags: ['japan', 'asia'], tier: 2 },
  { id: 'nhk',           name: 'NHK World',            url: 'https://www3.nhk.or.jp/nhkworld/rss/world.xml',     perspective: 'WESTERN',     country: 'Japan',     tags: ['world', 'asia'], stateFunded: true, tier: 2 },
  { id: 'straitstimes',  name: 'The Straits Times',    url: 'https://www.straitstimes.com/news/world/rss.xml',   perspective: 'WESTERN',     country: 'Singapore', tags: ['world', 'asia'], tier: 3 },
  { id: 'asiatimes',     name: 'Asia Times',           url: 'https://asiatimes.com/feed/',                       perspective: 'WESTERN',     country: 'HK',        tags: ['asia', 'geopolitics'], tier: 3 },

  // ── Defense / OSINT / Analysis ──
  { id: 'janes',         name: 'Janes Defense',        url: 'https://www.janes.com/news/rss',                    perspective: 'INDEPENDENT', country: 'UK',         tags: ['military', 'intelligence'], tier: 1 },
  { id: 'navalnews',     name: 'Naval News',           url: 'https://www.navalnews.com/feed/',                   perspective: 'INDEPENDENT', country: 'France',     tags: ['military', 'naval'], tier: 2 },
  { id: 'usninews',      name: 'USNI News',            url: 'https://news.usni.org/feed',                        perspective: 'WESTERN',     country: 'US',         tags: ['military', 'naval'], tier: 2 },
  { id: 'warzone',       name: 'The War Zone',         url: 'https://www.twz.com/feed',                          perspective: 'INDEPENDENT', country: 'US',        tags: ['military', 'defense'], tier: 3 },
  { id: 'breakingdefense', name: 'Breaking Defense',   url: 'https://breakingdefense.com/category/indo-pacific/feed/', perspective: 'WESTERN', country: 'US',    tags: ['military', 'defense'], tier: 2 },
  { id: 'diplomat',      name: 'The Diplomat',         url: 'https://thediplomat.com/category/asia-defense/feed/', perspective: 'WESTERN',     country: 'US',        tags: ['asia', 'defense'], tier: 2 },
  { id: 'aspistrategist', name: 'ASPI Strategist',     url: 'https://www.aspistrategist.org.au/feed/',           perspective: 'INDEPENDENT', country: 'Australia',  tags: ['strategy', 'analysis'], tier: 2 },
  { id: 'warontherocks', name: 'War on the Rocks',     url: 'https://warontherocks.com/feed/',                   perspective: 'INDEPENDENT', country: 'US',        tags: ['military', 'analysis'], tier: 3 },
  { id: 'chinapower',    name: 'CSIS China Power',     url: 'https://chinapower.csis.org/feed/',                 perspective: 'INDEPENDENT', country: 'US',        tags: ['china', 'analysis'], tier: 2 },
  { id: 'aei',           name: 'AEI (Critical Threats)', url: 'https://www.aei.org/feed/',                        perspective: 'INDEPENDENT', country: 'US',         tags: ['geopolitics', 'analysis'], tier: 2 },
];

// ─── CONFLICT COLLECTIONS ─────────────────────────────────────

export const CONFLICT_COLLECTIONS: ConflictCollection[] = [
  {
    id: 'taiwan-strait-crisis',
    name: 'TAIWAN STRAIT CRISIS 2026',
    description: 'Operation Formosa Shield / Joint Sword-2026A — Comprehensive multi-perspective monitoring of the Taiwan Strait confrontation.',
    channels: [
      {
        label: 'WESTERN WIRE',
        description: 'Reuters, AP, BBC, FT — fact-first wire and global reporting',
        perspective: 'Western / Wire Services',
        feedIds: ['reuters', 'ap', 'bbc', 'ft'],
        color: '#3b82f6',
      },
      {
        label: 'DEFENSE / INTEL',
        description: 'Janes, Naval News, USNI, Breaking Defense, War Zone — military OSINT',
        perspective: 'Military / Intelligence Analysis',
        feedIds: ['janes', 'navalnews', 'usninews', 'breakingdefense', 'warzone'],
        color: '#a78bfa',
      },
      {
        label: 'US / INDOPACOM',
        description: 'Official US military & government sources — INDOPACOM, DoD, 7th Fleet',
        perspective: 'US Government / Military',
        feedIds: ['indopacom', 'dod', '7thfleet'],
        color: '#60a5fa',
      },
      {
        label: 'TAIWAN / ROC',
        description: 'Focus Taiwan, Taipei Times, Liberty Times, Taiwan Today — Taiwan local reporting',
        perspective: 'Taiwanese',
        feedIds: ['focustaiwan', 'taipeitimes', 'libertytimes', 'taiwantoday'],
        color: '#10b981',
      },
      {
        label: 'CHINESE STATE',
        description: 'Xinhua, Global Times, SCMP, China Daily — Chinese state narrative',
        perspective: 'Chinese State Media',
        feedIds: ['xinhua', 'globaltimes', 'scmp', 'chinadaily'],
        color: '#ef4444',
      },
      {
        label: 'REGIONAL ASIA',
        description: 'Japan Times, NHK, Straits Times, Asia Times — Regional Asian perspectives',
        perspective: 'Regional / Asian Media',
        feedIds: ['japantimes', 'nhk', 'straitstimes', 'asiatimes'],
        color: '#f59e0b',
      },
      {
        label: 'STRATEGIC ANALYSIS',
        description: 'The Diplomat, ASPI, CSIS, War on the Rocks, AEI — Geopolitical deep dives',
        perspective: 'Strategic Think Tanks',
        feedIds: ['diplomat', 'aspistrategist', 'chinapower', 'warontherocks', 'aei'],
        color: '#34d399',
      },
    ],
  },
];

// Helper: get feed by id
export function getFeedById(id: string): RssFeed | undefined {
  return RSS_FEEDS.find(f => f.id === id);
}

// Helper: get feeds for a channel
export function getFeedsForChannel(feedIds: string[]): RssFeed[] {
  return feedIds.map(id => RSS_FEEDS.find(f => f.id === id)).filter(Boolean) as RssFeed[];
}
