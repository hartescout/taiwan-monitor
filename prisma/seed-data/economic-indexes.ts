/**
 * PHAROS — Economic Indexes
 * 15 conflict-relevant market indicators with Yahoo Finance tickers.
 */

import type { EconomicIndex, EconCategory } from '@/types/domain';

export const ECON_CATEGORIES: { key: EconCategory; label: string; color: string; description: string }[] = [
  { key: 'ENERGY',     label: 'ENERGY',       color: '#ef4444', description: 'Oil, gas, and energy commodities — direct conflict impact' },
  { key: 'SAFE_HAVEN', label: 'SAFE HAVEN',   color: '#f59e0b', description: 'Gold, treasuries — flight-to-safety indicators' },
  { key: 'VOLATILITY', label: 'VOLATILITY',   color: '#a78bfa', description: 'Fear gauges and risk metrics' },
  { key: 'EQUITIES',   label: 'EQUITIES',     color: '#3b82f6', description: 'Major stock indexes — broad market sentiment' },
  { key: 'DEFENSE',    label: 'DEFENSE',       color: '#60a5fa', description: 'Defense and aerospace sector' },
  { key: 'CURRENCY',   label: 'CURRENCY',      color: '#10b981', description: 'Key FX pairs affected by conflict' },
  { key: 'SHIPPING',   label: 'SHIPPING',      color: '#f97316', description: 'Maritime and logistics — Taiwan Strait chokepoint impact' },
];

export const ECON_CATEGORY_MAP = Object.fromEntries(
  ECON_CATEGORIES.map(c => [c.key, c]),
) as Record<EconCategory, (typeof ECON_CATEGORIES)[number]>;

export const ECONOMIC_INDEXES: EconomicIndex[] = [
  // ── ENERGY (Tier 1 — direct conflict impact) ──
  {
    id: 'brent',
    ticker: 'BZ=F',
    name: 'Brent Crude Oil',
    shortName: 'BRENT',
    category: 'ENERGY',
    tier: 1,
    unit: '$',
    description: 'Global oil benchmark. Regional instability impacts supply chains.',
    color: '#ef4444',
  },
  {
    id: 'wti',
    ticker: 'CL=F',
    name: 'WTI Crude Oil',
    shortName: 'WTI',
    category: 'ENERGY',
    tier: 1,
    unit: '$',
    description: 'US oil benchmark.',
    color: '#dc2626',
  },
  {
    id: 'xle',
    ticker: 'XLE',
    name: 'Energy Select Sector ETF',
    shortName: 'XLE',
    category: 'ENERGY',
    tier: 2,
    unit: '$',
    description: 'S&P 500 energy sector — ExxonMobil, Chevron, ConocoPhillips.',
    color: '#fb923c',
  },

  // ── SAFE HAVEN (Tier 1) ──
  {
    id: 'gold',
    ticker: 'GC=F',
    name: 'Gold Futures',
    shortName: 'GOLD',
    category: 'SAFE_HAVEN',
    tier: 1,
    unit: '$',
    description: 'Primary flight-to-safety asset. Spikes during military escalation.',
    color: '#f59e0b',
  },
  {
    id: 'tnx',
    ticker: '^TNX',
    name: 'US 10-Year Treasury Yield',
    shortName: '10Y YIELD',
    category: 'SAFE_HAVEN',
    tier: 1,
    unit: '%',
    description: 'Treasury demand indicator. Yield drops = flight to safety.',
    color: '#eab308',
  },

  // ── VOLATILITY (Tier 1) ──
  {
    id: 'vix',
    ticker: '^VIX',
    name: 'CBOE Volatility Index',
    shortName: 'VIX',
    category: 'VOLATILITY',
    tier: 1,
    unit: 'pts',
    description: 'Fear index. Above 30 = extreme fear. Conflict-driven spikes.',
    color: '#a78bfa',
  },

  // ── EQUITIES (Tier 2) ──
  {
    id: 'sp500',
    ticker: '^GSPC',
    name: 'S&P 500',
    shortName: 'S&P 500',
    category: 'EQUITIES',
    tier: 2,
    unit: 'pts',
    description: 'US large-cap benchmark. Broad market risk sentiment.',
    color: '#3b82f6',
  },
  {
    id: 'nasdaq',
    ticker: '^IXIC',
    name: 'NASDAQ Composite',
    shortName: 'NASDAQ',
    category: 'EQUITIES',
    tier: 2,
    unit: 'pts',
    description: 'Tech-heavy index. Growth stock sensitivity to semiconductor supply.',
    color: '#2563eb',
  },
  {
    id: 'tsmc',
    ticker: 'TSM',
    name: 'TSMC (ADR)',
    shortName: 'TSM',
    category: 'EQUITIES',
    tier: 1,
    unit: '$',
    description: 'Taiwan Semiconductor Manufacturing Co. Central to global tech supply chain.',
    color: '#60a5fa',
  },

  // ── DEFENSE (Tier 2) ──
  {
    id: 'ita',
    ticker: 'ITA',
    name: 'iShares US Aerospace & Defense ETF',
    shortName: 'DEFENSE',
    category: 'DEFENSE',
    tier: 2,
    unit: '$',
    description: 'Lockheed, RTX, Northrop, General Dynamics. War = sector rally.',
    color: '#60a5fa',
  },

  // ── CURRENCY (Tier 2) ──
  {
    id: 'dxy',
    ticker: 'DX-Y.NYB',
    name: 'US Dollar Index',
    shortName: 'DXY',
    category: 'CURRENCY',
    tier: 1,
    unit: 'pts',
    description: 'Dollar strength against basket. Safe-haven currency flows.',
    color: '#10b981',
  },
  {
    id: 'usdtwd',
    ticker: 'TWD=X',
    name: 'USD/TWD (Taiwan Dollar)',
    shortName: 'USD/TWD',
    category: 'CURRENCY',
    tier: 2,
    unit: '$',
    description: 'Taiwanese dollar weakness = domestic conflict pressure.',
    color: '#34d399',
  },
  {
    id: 'usdcny',
    ticker: 'CNY=X',
    name: 'USD/CNY (Chinese Yuan)',
    shortName: 'USD/CNY',
    category: 'CURRENCY',
    tier: 2,
    unit: '¥',
    description: 'Chinese yuan performance during conflict.',
    color: '#6ee7b7',
  },

  // ── SHIPPING (Tier 2) ──
  {
    id: 'shipping',
    ticker: 'BDRY',
    name: 'Breakwave Dry Bulk Shipping ETF',
    shortName: 'SHIPPING',
    category: 'SHIPPING',
    tier: 2,
    unit: '$',
    description: 'Dry bulk shipping rates proxy. Taiwan Strait disruption tracker.',
    color: '#f97316',
  },
];

export function getIndexById(id: string): EconomicIndex | undefined {
  return ECONOMIC_INDEXES.find(i => i.id === id);
}

export function getIndexesByCategory(cat: EconCategory): EconomicIndex[] {
  return ECONOMIC_INDEXES.filter(i => i.category === cat);
}

export function getIndexesByTier(tier: 1 | 2 | 3): EconomicIndex[] {
  return ECONOMIC_INDEXES.filter(i => i.tier === tier);
}
