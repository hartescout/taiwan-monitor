'use client';
import { useState, useMemo } from 'react';
import { X_POSTS, type XPost } from '@/data/iranXPosts';
import XPostCard from '@/components/dashboard/XPostCard';

type Significance  = 'BREAKING' | 'HIGH' | 'STANDARD';
type AccountType   = 'military' | 'government' | 'journalist' | 'analyst' | 'official';

const SIG_LABELS: Significance[]  = ['BREAKING', 'HIGH', 'STANDARD'];
const ACCT_LABELS: AccountType[]  = ['military', 'government', 'journalist', 'analyst'];

const SIG_C: Record<Significance, string> = {
  BREAKING: 'var(--danger)',
  HIGH:     'var(--warning)',
  STANDARD: 'var(--info)',
};

export default function SignalsPage() {
  const [sigFilter,  setSigFilter]  = useState<Record<Significance, boolean>>({ BREAKING: true, HIGH: true, STANDARD: true });
  const [acctFilter, setAcctFilter] = useState<Record<AccountType, boolean>>({ military: true, government: true, journalist: true, analyst: true, official: true });
  const [pharosOnly, setPharosOnly] = useState(false);

  const filtered = useMemo(() => X_POSTS.filter(p => {
    if (!sigFilter[p.significance])                     return false;
    if (!acctFilter[p.accountType as AccountType])      return false;
    if (pharosOnly && !p.pharosNote)                    return false;
    return true;
  }), [sigFilter, acctFilter, pharosOnly]);

  const breaking = filtered.filter(p => p.significance === 'BREAKING');
  const high     = filtered.filter(p => p.significance === 'HIGH');
  const standard = filtered.filter(p => p.significance === 'STANDARD');

  return (
    <div style={{ display: 'flex', flex: 1, minWidth: 0, overflow: 'hidden' }}>

      {/* ── FILTER RAIL ── 240px ── */}
      <div style={{ width: 240, minWidth: 240, flexShrink: 0, borderRight: '1px solid var(--bd)', display: 'flex', flexDirection: 'column' }}>
        <div className="panel-header">
          <span style={{ fontSize: 13, color: 'var(--t1)', lineHeight: 1 }}>𝕏</span>
          <span className="section-title">Signal Filters</span>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <FilterBlock label="SIGNIFICANCE">
            {SIG_LABELS.map(s => (
              <CRow key={s} label={s} color={SIG_C[s]} checked={sigFilter[s]} onChange={v => setSigFilter(p => ({ ...p, [s]: v }))} />
            ))}
          </FilterBlock>

          <FilterBlock label="ACCOUNT TYPE">
            {ACCT_LABELS.map(a => (
              <CRow key={a} label={a.toUpperCase()} color="var(--info)" checked={acctFilter[a]} onChange={v => setAcctFilter(p => ({ ...p, [a]: v }))} />
            ))}
          </FilterBlock>

          <FilterBlock label="ANALYST NOTES">
            <ToggleRow label="Pharos notes only" checked={pharosOnly} onChange={setPharosOnly} />
          </FilterBlock>
        </div>
        <div style={{ padding: '8px 12px', borderTop: '1px solid var(--bd)' }}>
          <span className="mono" style={{ fontSize: 9, color: 'var(--t3)' }}>{filtered.length} / {X_POSTS.length} SIGNALS</span>
        </div>
      </div>

      {/* ── SIGNAL FEED ── fills ── */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div className="panel-header">
          <span className="section-title">Field Signals — Operation Epic Fury</span>
          <span className="label" style={{ marginLeft: 'auto', color: 'var(--t4)' }}>PHAROS-CURATED</span>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>

          {/* BREAKING */}
          {breaking.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <SectionHeader label="BREAKING" count={breaking.length} color="var(--danger)" />
              {breaking.map(p => <XPostCard key={p.id} post={p as import('@/data/mockXPosts').XPost} />)}
            </div>
          )}

          {/* HIGH */}
          {high.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <SectionHeader label="HIGH SIGNIFICANCE" count={high.length} color="var(--warning)" />
              {high.map(p => <XPostCard key={p.id} post={p as import('@/data/mockXPosts').XPost} />)}
            </div>
          )}

          {/* STANDARD */}
          {standard.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <SectionHeader label="STANDARD" count={standard.length} color="var(--info)" />
              {standard.map(p => <XPostCard key={p.id} post={p as import('@/data/mockXPosts').XPost} />)}
            </div>
          )}

          {filtered.length === 0 && (
            <div style={{ padding: 60, textAlign: 'center' }}>
              <span style={{ fontSize: 24, color: 'var(--t3)' }}>𝕏</span>
              <p className="label" style={{ color: 'var(--t3)', marginTop: 12 }}>No signals match current filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ label, count, color }: { label: string; count: number; color: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      marginBottom: 10, padding: '4px 0',
      borderBottom: `2px solid ${color}`,
    }}>
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0 }} />
      <span style={{ fontSize: 10, fontWeight: 700, color, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</span>
      <span style={{
        fontSize: 9, fontWeight: 700, padding: '1px 6px',
        background: color + '20', color,
        marginLeft: 4,
      }}>
        {count}
      </span>
      <div style={{ flex: 1, height: 1, background: color + '30' }} />
    </div>
  );
}

function FilterBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: '10px 0', borderBottom: '1px solid var(--bd-s)' }}>
      <div className="label" style={{ padding: '0 14px', marginBottom: 4, fontSize: 8 }}>{label}</div>
      {children}
    </div>
  );
}

function CRow({ label, color, checked, onChange }: { label: string; color: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!checked)} className="row-btn" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 14px' }}>
      <div style={{
        width: 11, height: 11, flexShrink: 0,
        border: `1px solid ${checked ? color : 'var(--bd)'}`,
        background: checked ? color : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {checked && <div style={{ width: 5, height: 5, background: 'var(--bg-app)' }} />}
      </div>
      <span style={{ fontSize: 10, color: checked ? 'var(--t1)' : 'var(--t2)' }}>{label}</span>
    </button>
  );
}

function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!checked)} className="row-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 14px' }}>
      <span style={{ fontSize: 10, color: checked ? 'var(--t1)' : 'var(--t2)' }}>{label}</span>
      <div style={{
        width: 28, height: 16, borderRadius: 8,
        background: checked ? 'var(--blue)' : 'var(--bg-3)',
        border: '1px solid var(--bd)',
        position: 'relative', transition: 'background .15s',
        flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute', top: 2, left: checked ? 14 : 2,
          width: 10, height: 10, borderRadius: '50%',
          background: 'var(--t1)',
          transition: 'left .15s',
        }} />
      </div>
    </button>
  );
}
