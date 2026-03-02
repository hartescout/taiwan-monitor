'use client';

import { Button } from '@/components/ui/button';

import type { FacetOption } from '@/lib/map-filter-engine';

// ─── Types ──────────────────────────────────────────────────────────────────────

type Props = {
  option:   FacetOption;
  isOn:     boolean;
  onToggle: () => void;
};

// ─── Component ──────────────────────────────────────────────────────────────────

export default function FilterRow({ option, isOn, onToggle }: Props) {
  const dotColor = option.color ?? 'var(--t4)';

  return (
    <Button
      variant="ghost"
      onClick={onToggle}
      className="w-full justify-start gap-2 rounded-none px-2 py-0 h-6 text-xs hover:bg-[var(--bg-3)]"
    >
      {/* Checkbox */}
      <span
        className="flex-shrink-0 rounded-sm"
        style={{
          width: 10,
          height: 10,
          border: `1px solid ${isOn ? dotColor : 'var(--t4)'}`,
          background: isOn ? dotColor : 'transparent',
        }}
      />

      {/* Label */}
      <span
        className="mono flex-1 text-left truncate"
        style={{ color: isOn ? 'var(--t2)' : 'var(--t4)' }}
      >
        {option.label}
      </span>

      {/* Dot leader fill */}
      <span className="flex-1 min-w-4 border-b border-dotted border-[var(--bd-s)]" />

      {/* Count */}
      <span
        className="mono flex-shrink-0 text-right tabular-nums"
        style={{ color: isOn ? 'var(--t3)' : 'var(--t4)', minWidth: 20 }}
      >
        {option.count}
      </span>
    </Button>
  );
}
