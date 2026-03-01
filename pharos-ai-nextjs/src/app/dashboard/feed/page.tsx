'use client';
import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams }   from 'next/navigation';
import Link                  from 'next/link';
import { CheckCircle, FileText, ArrowRight } from 'lucide-react';
import { EVENTS, type Severity, type EventType, type IntelEvent } from '@/data/iranEvents';
import { getPostsForEvent }  from '@/data/iranXPosts';
import XPostCard             from '@/components/dashboard/XPostCard';

const SEV: Record<string, string> = { CRITICAL: 'var(--danger)', HIGH: 'var(--warning)', STANDARD: 'var(--info)' };
const TIER_C: Record<number, string> = { 1: 'var(--success)', 2: 'var(--warning)', 3: 'var(--t4)' };
const TIER_L: Record<number, string> = { 1: 'T1', 2: 'T2', 3: 'T3' };
const STANCE_C: Record<string, string> = { SUPPORTING: 'var(--success)', OPPOSING: 'var(--danger)', NEUTRAL: 'var(--t4)', UNKNOWN: 'var(--t4)' };
const TYPE_C: Record<string, string> = { MILITARY: 'var(--danger)', DIPLOMATIC: 'var(--info)', INTELLIGENCE: '#a78bfa', ECONOMIC: 'var(--warning)', HUMANITARIAN: 'var(--success)', POLITICAL: 'var(--t2)' };

function ts(t: string) { return new Date(t).toISOString().slice(11, 16); }

function groupByDate(events: IntelEvent[]) {
  const groups: Record<string, IntelEvent[]> = {};
  events.forEach(e => {
    const d = new Date(e.timestamp).toISOString().slice(0, 10);
    if (!groups[d]) groups[d] = [];
    groups[d].push(e);
  });
  return groups;
}

const ALL_TYPES: EventType[] = ['MILITARY', 'DIPLOMATIC', 'INTELLIGENCE', 'ECONOMIC', 'HUMANITARIAN', 'POLITICAL'];

function IntelFeedInner() {
  const searchParams = useSearchParams();
  const initEvent    = searchParams.get('event');

  const [sevFilter,  setSevFilter]  = useState<Record<Severity, boolean>>({ CRITICAL: true, HIGH: true, STANDARD: true });
  const [typeFilter, setTypeFilter] = useState<Record<EventType, boolean>>(
    Object.fromEntries(ALL_TYPES.map(t => [t, true])) as Record<EventType, boolean>
  );
  const [verOnly, setVerOnly] = useState(false);
  const [selId,   setSelId]   = useState<string | null>(initEvent);
  const [tab,     setTab]     = useState<'report' | 'signals'>('report');

  useEffect(() => { if (initEvent) setSelId(initEvent); }, [initEvent]);

  const filtered = useMemo(() => EVENTS.filter(e => {
    if (!sevFilter[e.severity]) return false;
    if (!typeFilter[e.type])    return false;
    if (verOnly && !e.verified) return false;
    return true;
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()), [sevFilter, typeFilter, verOnly]);

  const grouped  = groupByDate(filtered);
  const selected = EVENTS.find(e => e.id === selId) ?? null;

  return (
    <div style={{ display: 'flex', flex: 1, minWidth: 0, overflow: 'hidden' }}>

      {/* ── FILTER RAIL ── 160px ── */}
      <div style={{ width: 160, minWidth: 160, flexShrink: 0, borderRight: '1px solid var(--bd)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div className="panel-header">
          <span className="section-title">Filters</span>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <FilterBlock label="SEVERITY">
            {(['CRITICAL', 'HIGH', 'STANDARD'] as Severity[]).map(s => (
              <CRow key={s} label={s} color={SEV[s]} checked={sevFilter[s]} onChange={v => setSevFilter(p => ({ ...p, [s]: v }))} />
            ))}
          </FilterBlock>
          <FilterBlock label="VERIFIED">
            <CRow label="ONLY VERIFIED" color="var(--success)" checked={verOnly} onChange={setVerOnly} />
          </FilterBlock>
          <FilterBlock label="EVENT TYPE">
            {ALL_TYPES.map(t => (
              <CRow key={t} label={t} color={TYPE_C[t] ?? 'var(--t2)'} checked={typeFilter[t]} onChange={v => setTypeFilter(p => ({ ...p, [t]: v }))} />
            ))}
          </FilterBlock>
        </div>
        <div style={{ padding: '8px 12px', borderTop: '1px solid var(--bd)' }}>
          <span className="mono" style={{ fontSize: 9, color: 'var(--t3)' }}>{filtered.length} EVENTS</span>
        </div>
      </div>

      {/* ── EVENT LOG ── 300px ── */}
      <div style={{ width: 300, minWidth: 300, flexShrink: 0, borderRight: '1px solid var(--bd)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div className="panel-header" style={{ justifyContent: 'space-between' }}>
          <span className="section-title">Operation Epic Fury</span>
          <span className="label">{filtered.length}</span>
        </div>
        {/* Col headers */}
        <div style={{ display: 'grid', gridTemplateColumns: '40px 50px 1fr 24px', padding: '4px 12px', borderBottom: '1px solid var(--bd)', background: 'var(--bg-2)' }}>
          {['TIME', 'SEV', 'TITLE', ''].map(h => <span key={h} className="label" style={{ fontSize: 8 }}>{h}</span>)}
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filtered.length === 0 && (
            <div style={{ padding: 24, textAlign: 'center' }}>
              <span className="label">No results</span>
            </div>
          )}
          {Object.entries(grouped).map(([date, events]) => (
            <div key={date}>
              <div style={{ padding: '4px 12px', background: 'var(--bg-2)', borderBottom: '1px solid var(--bd)' }}>
                <span className="mono" style={{ fontSize: 9, color: 'var(--t3)' }}>{date}</span>
              </div>
              {events.map(evt => {
                const isOn = selId === evt.id;
                const sc   = SEV[evt.severity] ?? 'var(--info)';
                const xc   = getPostsForEvent(evt.id).length;
                return (
                  <button key={evt.id}
                    onClick={() => { setSelId(isOn ? null : evt.id); setTab('report'); }}
                    className="row-btn"
                    style={{
                      display: 'grid', gridTemplateColumns: '40px 50px 1fr 24px',
                      padding: '6px 12px',
                      borderBottom: '1px solid var(--bd-s)',
                      borderLeft: `3px solid ${isOn ? sc : 'transparent'}`,
                      background: isOn ? 'var(--bg-sel)' : 'transparent',
                    }}
                  >
                    <span className="mono" style={{ fontSize: 9, color: 'var(--t3)', alignSelf: 'center' }}>{ts(evt.timestamp)}</span>
                    <div style={{ alignSelf: 'center' }}>
                      <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: '.06em', color: sc }}>{evt.severity.slice(0, 4)}</span>
                    </div>
                    <div>
                      <p style={{
                        fontSize: 11, color: 'var(--t1)', lineHeight: 1.3, textAlign: 'left',
                        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                      }}>
                        {evt.title}
                      </p>
                      <div style={{ display: 'flex', gap: 6, marginTop: 2 }}>
                        <span className="mono" style={{ fontSize: 8, color: 'var(--t3)' }}>{evt.sources.length}src</span>
                        {xc > 0 && <span className="mono" style={{ fontSize: 8, color: 'var(--t2)' }}>𝕏{xc}</span>}
                        {evt.verified && <CheckCircle size={8} style={{ color: 'var(--success)' }} strokeWidth={2} />}
                      </div>
                    </div>
                    <ArrowRight size={9} style={{ color: 'var(--t3)', alignSelf: 'center' }} strokeWidth={1.5} />
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* ── DETAIL PANE ── fills ── */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {!selected ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <FileText size={32} style={{ color: 'var(--t3)' }} strokeWidth={1} />
            <span className="label" style={{ color: 'var(--t3)' }}>Select an event</span>
          </div>
        ) : (
          <EventDetail event={selected} tab={tab} setTab={setTab} />
        )}
      </div>
    </div>
  );
}

function EventDetail({ event, tab, setTab }: { event: IntelEvent; tab: 'report' | 'signals'; setTab: (t: 'report' | 'signals') => void }) {
  const sc     = SEV[event.severity] ?? 'var(--info)';
  const xPosts = getPostsForEvent(event.id);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '10px 20px', borderBottom: '1px solid var(--bd)', background: 'var(--bg-2)', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '2px 8px', border: `1px solid ${sc}`, background: sc + '18' }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: sc }} />
            <span style={{ fontSize: 9, fontWeight: 700, color: sc, letterSpacing: '0.08em' }}>{event.severity}</span>
          </div>
          <span className="label" style={{ color: 'var(--t3)', fontSize: 8 }}>{event.type}</span>
          {event.verified && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <CheckCircle size={9} style={{ color: 'var(--success)' }} strokeWidth={2} />
              <span className="label" style={{ fontSize: 8, color: 'var(--success)' }}>VERIFIED</span>
            </div>
          )}
        </div>
        <h1 style={{ fontSize: 15, fontWeight: 700, color: 'var(--t1)', lineHeight: 1.25, marginBottom: 8 }}>
          {event.title}
        </h1>
        <div style={{ display: 'flex', gap: 20 }}>
          <MetaChip label="TIMESTAMP" val={new Date(event.timestamp).toISOString().replace('T', ' ').slice(0, 19) + ' UTC'} />
          <MetaChip label="LOCATION"  val={event.location} />
          <MetaChip label="SOURCES"   val={String(event.sources.length)} />
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--bd)', flexShrink: 0, background: 'var(--bg-2)' }}>
        {(['report', 'signals'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className="row-btn" style={{
            padding: '8px 18px', width: 'auto',
            fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
            color: tab === t ? 'var(--t1)' : 'var(--t2)',
            borderBottom: tab === t ? '2px solid var(--blue)' : '2px solid transparent',
            background: tab === t ? 'var(--bg-1)' : 'transparent',
          }}>
            {t === 'signals' ? `𝕏 SIGNALS${xPosts.length > 0 ? ` (${xPosts.length})` : ''}` : 'INTEL REPORT'}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {tab === 'report' ? (
          <div style={{ padding: '20px 24px' }}>
            <Section label="EXECUTIVE SUMMARY">
              <div style={{ borderLeft: `3px solid ${sc}`, paddingLeft: 14 }}>
                <p style={{ fontSize: 13, color: 'var(--t1)', lineHeight: 1.7 }}>{event.summary}</p>
              </div>
            </Section>

            <Section label="INTELLIGENCE REPORT">
              <div style={{ fontSize: 12.5, color: 'var(--t1)', lineHeight: 1.7 }}>
                {event.fullContent.split('\n\n').map((p, i) => (
                  <p key={i} style={{ marginBottom: 12, color: i === 0 ? 'var(--t1)' : 'var(--t2)' }}>{p}</p>
                ))}
              </div>
            </Section>

            <Section label={`SOURCES (${event.sources.length})`}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {event.sources.map((src, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 10px', border: '1px solid var(--bd)' }}>
                    <span style={{ fontSize: 8, fontWeight: 700, padding: '1px 5px', background: TIER_C[src.tier] + '22', color: TIER_C[src.tier] }}>
                      {TIER_L[src.tier]}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--t1)', flex: 1 }}>{src.name}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 50, height: 3, background: 'var(--bd)' }}>
                        <div style={{ width: `${src.reliability}%`, height: '100%', background: src.reliability > 90 ? 'var(--success)' : src.reliability > 75 ? 'var(--warning)' : 'var(--danger)' }} />
                      </div>
                      <span className="mono" style={{ fontSize: 9, color: 'var(--t3)', minWidth: 26 }}>{src.reliability}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {event.actorResponses.length > 0 && (
              <Section label="ACTOR RESPONSES">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {event.actorResponses.map((r, i) => {
                    const stC = STANCE_C[r.stance] ?? 'var(--t2)';
                    return (
                      <Link key={i} href={`/dashboard/actors?actor=${r.actorId}`} style={{ textDecoration: 'none' }}>
                        <div style={{ padding: '8px 12px', border: '1px solid var(--bd)', borderLeft: `3px solid ${stC}`, cursor: 'pointer' }}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--bg-3)'}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                        >
                          <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--t1)' }}>{r.actorName}</span>
                            <span style={{ fontSize: 8, padding: '1px 5px', background: stC + '18', color: stC, fontWeight: 700, letterSpacing: '.05em' }}>{r.stance}</span>
                            <span className="label" style={{ fontSize: 8, marginLeft: 'auto', color: 'var(--t3)' }}>{r.type}</span>
                            <ArrowRight size={9} style={{ color: 'var(--t3)' }} strokeWidth={1.5} />
                          </div>
                          <p style={{ fontSize: 11.5, color: 'var(--t2)', lineHeight: 1.5, fontStyle: 'italic' }}>"{r.statement}"</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </Section>
            )}
          </div>
        ) : (
          <div style={{ padding: '12px 16px' }}>
            {xPosts.length === 0 ? (
              <div style={{ padding: 48, textAlign: 'center' }}>
                <span style={{ fontSize: 20, color: 'var(--t3)' }}>𝕏</span>
                <p className="label" style={{ color: 'var(--t3)', marginTop: 8 }}>No signals indexed for this event</p>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: 10 }}>
                  <span className="label" style={{ fontSize: 8 }}>{xPosts.length} POSTS · PHAROS-CURATED · CHRONOLOGICAL</span>
                </div>
                {xPosts.map(p => <XPostCard key={p.id} post={p as import('@/data/mockXPosts').XPost} />)}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function MetaChip({ label, val }: { label: string; val: string }) {
  return (
    <div>
      <div className="label" style={{ fontSize: 8, marginBottom: 1 }}>{label}</div>
      <span className="mono" style={{ fontSize: 10, color: 'var(--t1)' }}>{val}</span>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <span className="label" style={{ fontSize: 8 }}>{label}</span>
        <div style={{ flex: 1, height: 1, background: 'var(--bd-s)' }} />
      </div>
      {children}
    </div>
  );
}

function FilterBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: '10px 0', borderBottom: '1px solid var(--bd-s)' }}>
      <div className="label" style={{ padding: '0 12px', marginBottom: 4, fontSize: 8 }}>{label}</div>
      {children}
    </div>
  );
}

function CRow({ label, color, checked, onChange }: { label: string; color: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!checked)} className="row-btn" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 12px' }}>
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

export default function IntelFeedPage() {
  return (
    <Suspense fallback={
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className="label">Loading…</span>
      </div>
    }>
      <IntelFeedInner />
    </Suspense>
  );
}
