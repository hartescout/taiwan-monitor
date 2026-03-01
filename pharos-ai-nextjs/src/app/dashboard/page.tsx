'use client';
import Link from 'next/link';
import { TrendingUp, TrendingDown, Minus, ArrowRight, CheckCircle } from 'lucide-react';
import { CONFLICTS } from '@/data/mockConflicts';
import { EVENTS }   from '@/data/mockEvents';
import { X_POSTS }  from '@/data/mockXPosts';
import XPostCard    from '@/components/dashboard/XPostCard';

/* Status → colour mapping for Blueprint palette */
const STATUS_C: Record<string, { dot: string; text: string; label: string }> = {
  CRITICAL:       { dot: 'var(--danger)',  text: 'var(--danger)',  label: 'Critical'      },
  ESCALATING:     { dot: 'var(--danger)',  text: 'var(--danger)',  label: 'Escalating'    },
  ELEVATED:       { dot: 'var(--info)',    text: 'var(--info)',    label: 'Elevated'      },
  MONITORING:     { dot: 'var(--success)', text: 'var(--success)', label: 'Monitoring'    },
  'DE-ESCALATING':{ dot: 'var(--success)', text: 'var(--success)', label: 'De-Escalating' },
};
const SEV_C: Record<string, string> = {
  CRITICAL: 'var(--danger)',
  HIGH:     'var(--warning)',
  STANDARD: 'var(--info)',
};

function fmtTime(ts: string) { return new Date(ts).toISOString().slice(11, 16); }
function ago(ts: string) {
  const ms = Date.now() - new Date(ts).getTime();
  if (ms < 3600000)  return Math.round(ms / 60000) + 'm';
  if (ms < 86400000) return Math.round(ms / 3600000) + 'h';
  return Math.round(ms / 86400000) + 'd';
}

export default function SituationRoom() {
  const totalCrit  = EVENTS.filter(e => e.severity === 'CRITICAL').length;
  const totalHigh  = EVENTS.filter(e => e.severity === 'HIGH').length;
  const events     = [...EVENTS].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  const breaking   = X_POSTS.filter(p => p.significance === 'BREAKING').slice(0, 2);
  const rest       = X_POSTS.filter(p => p.significance !== 'BREAKING').slice(0, 4);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden', background: 'var(--bg-1)' }}>

      {/* ── Threat bar ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 20,
        padding: '0 18px', height: 34, flexShrink: 0,
        background: 'var(--bg-app)', borderBottom: '1px solid var(--bd)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="dot dot-danger" />
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--danger)', letterSpacing: '0.04em' }}>
            Threat Assessment: Critical
          </span>
        </div>
        <div style={{ width: 1, height: 14, background: 'var(--bd)' }} />
        <span style={{ fontSize: 11, color: 'var(--t3)' }}>
          {CONFLICTS.length} conflict zones active
        </span>
        <span style={{ fontSize: 11, color: 'var(--danger)' }}>{totalCrit} critical</span>
        <span style={{ fontSize: 11, color: 'var(--warning)' }}>{totalHigh} high</span>
        <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--t4)', fontFamily: 'SFMono-Regular, monospace' }}>
          2026-03-01 13:42 UTC
        </span>
      </div>

      {/* ── Three panes ── */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>

        {/* ── CONFLICT MATRIX ── 380px ── */}
        <div style={{ width: 380, flexShrink: 0, borderRight: '1px solid var(--bd)', display: 'flex', flexDirection: 'column', background: 'var(--bg-1)' }}>
          <div className="panel-header">
            <span className="section-title">Conflict Matrix</span>
            <span className="label" style={{ marginLeft: 'auto' }}>{CONFLICTS.length} zones</span>
          </div>

          <div className="panel-body">
            {CONFLICTS.map((c, i) => {
              const st     = STATUS_C[c.status] ?? STATUS_C.MONITORING;
              const isLast = i === CONFLICTS.length - 1;
              return (
                <div key={c.id} style={{
                  padding: '12px 16px',
                  borderBottom: isLast ? 'none' : '1px solid var(--bd)',
                  borderLeft: `3px solid ${st.dot}`,
                }}>
                  {/* Row 1: name + status */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <Link href={`/dashboard/conflicts/${c.id}`} style={{ textDecoration: 'none', flex: 1 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--t1)', cursor: 'pointer' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--blue-l)'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--t1)'}
                      >
                        {c.shortName}
                      </span>
                    </Link>
                    {c.trend === 'UP'     && <TrendingUp   size={12} style={{ color: 'var(--danger)' }}  strokeWidth={2} />}
                    {c.trend === 'DOWN'   && <TrendingDown size={12} style={{ color: 'var(--success)' }} strokeWidth={2} />}
                    {c.trend === 'STABLE' && <Minus        size={12} style={{ color: 'var(--t4)' }}      strokeWidth={2} />}
                    <span style={{ fontSize: 10, fontWeight: 600, color: st.text }}>{st.label}</span>
                  </div>

                  {/* Row 2: region */}
                  <div style={{ fontSize: 10, color: 'var(--t4)', marginBottom: 8, fontFamily: 'SFMono-Regular, monospace' }}>
                    {c.region}
                  </div>

                  {/* Row 3: escalation bar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <div className="bar-track" style={{ flex: 1 }}>
                      <div className="bar-fill" style={{ width: `${c.escalationScore}%`, background: st.dot }} />
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: st.text, fontFamily: 'SFMono-Regular, monospace', minWidth: 32, textAlign: 'right' }}>
                      {c.escalationScore}%
                    </span>
                  </div>

                  {/* Row 4: counts */}
                  <div style={{ display: 'flex', gap: 14, marginBottom: 10 }}>
                    <CountChip val={c.criticalToday} label="Crit" color="var(--danger)" />
                    <CountChip val={c.highToday}     label="High" color="var(--warning)" />
                    <CountChip val={c.standardToday} label="Std"  color="var(--info)" />
                  </div>

                  {/* Row 5: actions */}
                  <div style={{ display: 'flex', gap: 6 }}>
                    <ChipBtn href={`/dashboard/feed?conflict=${c.id}`}     label="Intel Feed" />
                    <ChipBtn href={`/dashboard/conflicts/${c.id}`}         label="Full Brief" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── LIVE EVENT FEED ── fills ── */}
        <div style={{ flex: 1, minWidth: 0, borderRight: '1px solid var(--bd)', display: 'flex', flexDirection: 'column', background: 'var(--bg-1)' }}>
          <div className="panel-header">
            <span className="section-title">Live Event Feed</span>
            <span className="label" style={{ marginLeft: 'auto' }}>{events.length} events</span>
          </div>

          {/* Column headers */}
          <div style={{
            display: 'grid', gridTemplateColumns: '50px 80px 55px 1fr 36px 22px',
            padding: '5px 16px',
            background: 'var(--bg-app)', borderBottom: '1px solid var(--bd)',
          }}>
            {['Time', 'Severity', 'Type', 'Event', 'Src', ''].map(h => (
              <span key={h} className="label" style={{ fontSize: 9 }}>{h}</span>
            ))}
          </div>

          <div className="panel-body">
            {events.map((evt, i) => {
              const sc     = SEV_C[evt.severity] ?? 'var(--info)';
              const confl  = CONFLICTS.find(c => c.id === evt.conflictId);
              const isLast = i === events.length - 1;
              return (
                <Link key={evt.id} href={`/dashboard/feed?event=${evt.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    display: 'grid', gridTemplateColumns: '50px 80px 55px 1fr 36px 22px',
                    padding: '7px 16px',
                    borderBottom: isLast ? 'none' : '1px solid var(--bd-s)',
                    cursor: 'pointer', alignItems: 'start',
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--bg-3)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                  >
                    <span style={{ fontSize: 10, color: 'var(--t4)', fontFamily: 'SFMono-Regular, monospace', paddingTop: 1 }}>
                      {fmtTime(evt.timestamp)}
                    </span>
                    <div style={{ paddingTop: 1 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: sc }}>{evt.severity}</span>
                    </div>
                    <span className="label" style={{ fontSize: 9, color: 'var(--t4)', paddingTop: 2 }}>{evt.type.slice(0, 6)}</span>
                    <div>
                      <p style={{ fontSize: 12, color: 'var(--t1)', lineHeight: 1.35, marginBottom: 2 }}>{evt.title}</p>
                      {confl && (
                        <span style={{ fontSize: 9, color: 'var(--t4)', fontFamily: 'SFMono-Regular, monospace' }}>
                          {confl.shortName}
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: 11, color: 'var(--t4)', fontFamily: 'SFMono-Regular, monospace', textAlign: 'right', paddingTop: 1 }}>
                      {evt.sources.length}
                    </span>
                    {evt.verified
                      ? <CheckCircle size={11} style={{ color: 'var(--success)', marginTop: 1 }} strokeWidth={2} />
                      : <div />
                    }
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ── X FIELD SIGNALS ── 300px ── */}
        <div style={{ width: 300, flexShrink: 0, display: 'flex', flexDirection: 'column', background: 'var(--bg-1)' }}>
          <div className="panel-header">
            <span style={{ fontSize: 14, color: 'var(--t1)', lineHeight: 1 }}>𝕏</span>
            <span className="section-title">Field Signals</span>
            <span className="label" style={{ marginLeft: 'auto' }}>Curated</span>
          </div>

          <div className="panel-body" style={{ padding: '10px' }}>
            {breaking.map(post => <XPostCard key={post.id} post={post} compact />)}

            {breaking.length > 0 && rest.length > 0 && (
              <div style={{ height: 1, background: 'var(--bd)', margin: '8px 0' }} />
            )}

            {rest.map(post => <XPostCard key={post.id} post={post} compact />)}
          </div>

          <div style={{ padding: '8px 10px', borderTop: '1px solid var(--bd)', flexShrink: 0 }}>
            <Link href="/dashboard/feed" style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                padding: '7px', border: '1px solid var(--bd)',
                cursor: 'pointer', transition: 'background .1s',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--bg-3)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
              >
                <span className="label" style={{ fontSize: 9, color: 'var(--blue-l)' }}>View All Signals</span>
                <ArrowRight size={10} strokeWidth={2} style={{ color: 'var(--blue-l)' }} />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function CountChip({ val, label, color }: { val: number; label: string; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
      <span style={{ fontSize: 16, fontWeight: 700, color, lineHeight: 1, fontFamily: 'SFMono-Regular, monospace' }}>{val}</span>
      <span className="label" style={{ fontSize: 8 }}>{label}</span>
    </div>
  );
}

function ChipBtn({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        padding: '3px 9px', border: '1px solid var(--bd)',
        cursor: 'pointer', transition: 'background .1s, border-color .1s',
      }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.background = 'var(--bg-3)';
          (e.currentTarget as HTMLElement).style.borderColor = 'var(--blue)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.background = 'transparent';
          (e.currentTarget as HTMLElement).style.borderColor = 'var(--bd)';
        }}
      >
        <span style={{ fontSize: 10, color: 'var(--blue-l)', fontWeight: 600 }}>{label}</span>
        <ArrowRight size={10} strokeWidth={2} style={{ color: 'var(--blue-l)' }} />
      </div>
    </Link>
  );
}
