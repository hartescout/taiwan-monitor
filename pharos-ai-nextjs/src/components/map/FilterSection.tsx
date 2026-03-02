'use client';

import { Button } from '@/components/ui/button';

import FilterRow from '@/components/map/FilterRow';

import type { FacetOption } from '@/lib/map-filter-engine';

// ─── Types ──────────────────────────────────────────────────────────────────────

type Props = {
  title:       string;
  options:     FacetOption[];
  activeKeys:  Set<string>;
  onToggle:    (key: string) => void;
  isGrouped?:  boolean;     // group options by option.group
  isColumned?: boolean;     // split into columns by group
};

// ─── Helpers ────────────────────────────────────────────────────────────────────

function groupBy(options: FacetOption[]): Map<string, FacetOption[]> {
  const map = new Map<string, FacetOption[]>();
  for (const o of options) {
    const g = o.group ?? '';
    const arr = map.get(g) ?? [];
    arr.push(o);
    map.set(g, arr);
  }
  return map;
}

// ─── Component ──────────────────────────────────────────────────────────────────

export default function FilterSection({ title, options, activeKeys, onToggle, isGrouped, isColumned }: Props) {
  if (options.length === 0) return null;

  const allOn = options.every(o => activeKeys.has(o.key));

  const handleToggleAll = () => {
    // If all on, turn all off (but keep at least one)
    // If some off, turn all on
    for (const o of options) {
      if (allOn && options.length > 1) {
        // Only works if we toggle each — parent handles set logic
      }
      onToggle(o.key);
    }
  };

  const groups = (isGrouped || isColumned) ? groupBy(options) : null;

  return (
    <div className="px-2.5 py-2" style={{ borderTop: '1px solid var(--bd-s)' }}>
      {/* Header row */}
      <div className="flex items-center justify-between mb-1">
        <span className="label">{title}</span>
        <Button
          variant="ghost"
          className="h-4 px-1 text-[9px] text-[var(--t4)] hover:text-[var(--t2)] rounded-sm"
          onClick={handleToggleAll}
        >
          {allOn ? 'none' : 'all'}
        </Button>
      </div>

      {/* Content */}
      {isColumned && groups ? (
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${Math.min(groups.size, 3)}, 1fr)` }}>
          {[...groups.entries()].map(([group, opts]) => (
            <div key={group}>
              {group && <span className="label text-[8px] text-[var(--t4)] mb-0.5 block">{group}</span>}
              {opts.map(o => (
                <FilterRow key={o.key} option={o} isOn={activeKeys.has(o.key)} onToggle={() => onToggle(o.key)} />
              ))}
            </div>
          ))}
        </div>
      ) : isGrouped && groups ? (
        <div>
          {[...groups.entries()].map(([group, opts]) => (
            <div key={group} className="mb-1">
              {group && <span className="label text-[8px] text-[var(--t4)] mb-0.5 block pl-2">{group}</span>}
              <div className="grid grid-cols-2 gap-x-1">
                {opts.map(o => (
                  <FilterRow key={o.key} option={o} isOn={activeKeys.has(o.key)} onToggle={() => onToggle(o.key)} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-1">
          {options.map(o => (
            <FilterRow key={o.key} option={o} isOn={activeKeys.has(o.key)} onToggle={() => onToggle(o.key)} />
          ))}
        </div>
      )}
    </div>
  );
}
