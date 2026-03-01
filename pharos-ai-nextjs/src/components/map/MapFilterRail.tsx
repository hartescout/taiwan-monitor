'use client';

import { useState, useMemo } from 'react';
import { SlidersHorizontal, RotateCcw, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { ACTOR_META, CATEGORY_LABEL, STATUS_META, FRIENDLY_ACTORS, HOSTILE_ACTORS, ALL_CATEGORIES, ALL_STATUSES } from '@/data/mapTokens';
import { STRIKE_ARCS, MISSILE_TRACKS, TARGETS, ALLIED_ASSETS, THREAT_ZONES } from '@/data/mapData';
import ActorBadge from './ActorBadge';

import type { Actor, MarkerCategory, MarkerStatus } from '@/data/mapTokens';
import type { FilterState } from '@/hooks/use-map-filters';

// ─── Actor item counts (static — computed once from raw data) ─────────────────

function useActorCounts(): Record<Actor, number> {
  return useMemo(() => {
    const all = [
      ...STRIKE_ARCS, ...MISSILE_TRACKS,
      ...TARGETS,     ...ALLIED_ASSETS, ...THREAT_ZONES,
    ] as Array<{ actor: Actor }>;
    const counts: Partial<Record<Actor, number>> = {};
    for (const item of all) counts[item.actor] = (counts[item.actor] ?? 0) + 1;
    return counts as Record<Actor, number>;
  }, []);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({ label, isOpen, onToggle }: { label: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <Button variant="ghost" onClick={onToggle}
      className="w-full h-6 px-0 justify-between rounded-none"
      style={{ color: 'var(--t4)', fontSize: 9, letterSpacing: '0.1em' }}
    >
      <span className="label" style={{ color: 'var(--t4)' }}>{label}</span>
      {isOpen
        ? <ChevronDown size={10} strokeWidth={2.5} />
        : <ChevronRight size={10} strokeWidth={2.5} />
      }
    </Button>
  );
}

function Chip({ label, color, isActive, onClick }: { label: string; color?: string; isActive: boolean; onClick: () => void }) {
  return (
    <Button variant="ghost" size="sm" onClick={onClick}
      className="h-auto px-2 py-0.5 rounded-sm text-[9px] font-bold font-mono tracking-wide"
      style={{
        color:      isActive ? (color ?? 'var(--t2)') : 'var(--t4)',
        background: isActive ? (color ? `color-mix(in srgb, ${color} 14%, transparent)` : 'var(--bg-3)') : 'transparent',
        border:     `1px solid ${isActive ? (color ? `color-mix(in srgb, ${color} 35%, transparent)` : 'var(--bd)') : 'transparent'}`,
      }}
    >
      {label}
    </Button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

type Props = FilterState & {
  onToggleActor:    (a: Actor) => void;
  onToggleCategory: (c: MarkerCategory) => void;
  onToggleStatus:   (s: MarkerStatus) => void;
  onToggleHeat:     () => void;
  onReset:          () => void;
};

export default function MapFilterRail({
  actors, categories, statuses, showHeat,
  onToggleActor, onToggleCategory, onToggleStatus, onToggleHeat, onReset,
}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSections, setOpenSections] = useState({ actor: true, category: true, status: false });
  const counts = useActorCounts();

  const toggleSection = (key: keyof typeof openSections) =>
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));

  const isFiltered =
    actors.size < 6 || categories.size < 3 ||
    statuses.size < ALL_STATUSES.length || !showHeat;

  return (
    <div className="flex flex-col" style={{
      background:   'rgba(28,33,39,0.96)',
      border:       '1px solid var(--bd)',
      borderRadius: 2,
      minWidth:     200,
      maxWidth:     230,
    }}>
      {/* Header */}
      <div className="flex items-center gap-2 px-3" style={{ height: 32, borderBottom: '1px solid var(--bd-s)', flexShrink: 0 }}>
        <SlidersHorizontal size={11} strokeWidth={2.5} style={{ color: isFiltered ? 'var(--blue)' : 'var(--t4)', flexShrink: 0 }} />
        <span className="label flex-1" style={{ color: isFiltered ? 'var(--blue-l)' : 'var(--t4)' }}>
          FILTER {isFiltered && '•'}
        </span>
        {isFiltered && (
          <Button variant="ghost" size="sm" onClick={onReset} className="h-5 px-1.5 text-[9px] font-mono" style={{ color: 'var(--t4)' }}>
            <RotateCcw size={8} strokeWidth={2.5} />
          </Button>
        )}
        <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(c => !c)} className="h-5 px-1" style={{ color: 'var(--t4)' }}>
          {isCollapsed ? <ChevronRight size={10} strokeWidth={2.5} /> : <ChevronDown size={10} strokeWidth={2.5} />}
        </Button>
      </div>

      {!isCollapsed && (
        <div className="flex flex-col gap-0 p-2">

          {/* ── Actor ─────────────────────────────────────────────────── */}
          <SectionHeader label="ACTOR" isOpen={openSections.actor} onToggle={() => toggleSection('actor')} />
          {openSections.actor && (
            <div className="flex flex-col gap-1 mb-2">
              {/* Friendly group */}
              <div className="flex flex-wrap gap-1">
                {FRIENDLY_ACTORS.map(a => (
                  <button key={a} onClick={() => onToggleActor(a)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                    <ActorBadge actor={a} isActive={actors.has(a)} />
                    <span className="mono" style={{ fontSize: 8, color: 'var(--t4)', marginLeft: 2 }}>
                      ({counts[a] ?? 0})
                    </span>
                  </button>
                ))}
              </div>
              {/* Hostile group */}
              <div className="flex flex-wrap gap-1">
                {HOSTILE_ACTORS.map(a => (
                  <button key={a} onClick={() => onToggleActor(a)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                    <ActorBadge actor={a} isActive={actors.has(a)} />
                    <span className="mono" style={{ fontSize: 8, color: 'var(--t4)', marginLeft: 2 }}>
                      ({counts[a] ?? 0})
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Category ──────────────────────────────────────────────── */}
          <SectionHeader label="CATEGORY" isOpen={openSections.category} onToggle={() => toggleSection('category')} />
          {openSections.category && (
            <div className="flex flex-wrap gap-1 mb-2">
              {ALL_CATEGORIES.map(c => (
                <Chip key={c} label={CATEGORY_LABEL[c].toUpperCase()} isActive={categories.has(c)} onClick={() => onToggleCategory(c)} />
              ))}
            </div>
          )}

          {/* ── Status ────────────────────────────────────────────────── */}
          <SectionHeader label="STATUS" isOpen={openSections.status} onToggle={() => toggleSection('status')} />
          {openSections.status && (
            <div className="flex flex-wrap gap-1 mb-2">
              {ALL_STATUSES.map(s => (
                <Chip key={s} label={STATUS_META[s].label.toUpperCase()} color={STATUS_META[s].cssVar} isActive={statuses.has(s)} onClick={() => onToggleStatus(s)} />
              ))}
            </div>
          )}

          {/* ── Heat overlay ───────────────────────────────────────────── */}
          <div className="flex items-center justify-between" style={{ paddingTop: 4, borderTop: '1px solid var(--bd-s)' }}>
            <span className="label" style={{ color: 'var(--t4)' }}>HEAT OVERLAY</span>
            <button onClick={onToggleHeat} style={{
              width: 28, height: 14, borderRadius: 7, border: 'none', cursor: 'pointer', padding: 0, position: 'relative',
              background: showHeat ? 'var(--cyber)' : 'var(--bd)',
              transition: 'background 0.15s',
            }}>
              <span style={{
                position: 'absolute', top: 2, left: showHeat ? 16 : 2,
                width: 10, height: 10, borderRadius: '50%', background: 'var(--t1)',
                transition: 'left 0.15s',
              }} />
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
