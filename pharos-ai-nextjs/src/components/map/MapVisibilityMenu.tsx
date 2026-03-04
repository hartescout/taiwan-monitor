'use client';

import { useEffect, useRef, useState } from 'react';
import { Layers, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type OverlayVisibility = {
  timeline: boolean;
  filters:  boolean;
  legend:   boolean;
};

type Props = {
  visibility: OverlayVisibility;
  onToggle:   (key: keyof OverlayVisibility) => void;
};

const LABELS: { key: keyof OverlayVisibility; label: string }[] = [
  { key: 'timeline', label: 'TIMELINE' },
  { key: 'filters',  label: 'FILTERS'  },
  { key: 'legend',   label: 'LEGEND'   },
];

export default function MapVisibilityMenu({ visibility, onToggle }: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (!menuRef.current?.contains(target)) setOpen(false);
    };
    window.addEventListener('mousedown', handleOutside);
    return () => window.removeEventListener('mousedown', handleOutside);
  }, [open]);

  return (
    <div ref={menuRef} style={{ position: 'relative' }}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(v => !v)}
        className="mono h-7 w-7 p-0"
        style={{
          background:   'rgba(28,33,39,0.92)',
          border:       '1px solid var(--bd)',
          borderRadius: 2,
          color:        'var(--t3)',
        }}
        title="Toggle overlays"
      >
        <Layers size={14} strokeWidth={2} />
      </Button>

      {open && (
        <div style={{
          position:     'absolute',
          bottom:       '100%',
          right:        0,
          marginBottom: 4,
          background:   'rgba(28,33,39,0.95)',
          border:       '1px solid var(--bd)',
          borderRadius: 2,
          padding:      '6px 0',
          minWidth:     140,
          zIndex:       20,
        }}>
          {LABELS.map(({ key, label }) => {
            const visible = visibility[key];
            return (
              <button
                key={key}
                onClick={() => onToggle(key)}
                className="mono flex items-center gap-2 w-full"
                style={{
                  padding:   '5px 12px',
                  fontSize:  9,
                  fontWeight: 700,
                  color:     visible ? 'var(--t2)' : 'var(--t4)',
                  cursor:    'pointer',
                  background: 'transparent',
                  border:    'none',
                  letterSpacing: '0.06em',
                }}
              >
                {visible
                  ? <Eye size={12} strokeWidth={2} />
                  : <EyeOff size={12} strokeWidth={2} />}
                {label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
