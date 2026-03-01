'use client';
import Link           from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { label: 'Situation Room', href: '/dashboard' },
  { label: 'Intel Feed',     href: '/dashboard/feed' },
  { label: 'Actors',         href: '/dashboard/actors' },
  { label: 'Daily Briefs',   href: '/dashboard/briefs' },
];

export function Header() {
  const path = usePathname();
  const isActive = (href: string) =>
    href === '/dashboard' ? path === '/dashboard' : path.startsWith(href);

  return (
    <header style={{
      height: 44,
      background: 'var(--bg-app)',
      borderBottom: '1px solid var(--bd)',
      display: 'flex',
      alignItems: 'stretch',
      paddingLeft: 16,
      paddingRight: 20,
      flexShrink: 0,
      zIndex: 50,
    }}>
      {/* Logo */}
      <Link href="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, marginRight: 28 }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <polygon points="9,1.5 16.5,5.5 16.5,12.5 9,16.5 1.5,12.5 1.5,5.5"
            fill="none" stroke="var(--blue)" strokeWidth="1.5" />
          <circle cx="9" cy="9" r="2.5" fill="var(--blue)" />
        </svg>
        <div>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--t1)', letterSpacing: '0.04em' }}>
            Pharos
          </span>
          <span style={{ fontSize: 10, color: 'var(--t4)', marginLeft: 6, letterSpacing: '0.06em' }}>
            Intelligence
          </span>
        </div>
      </Link>

      {/* Nav */}
      <nav style={{ display: 'flex', alignItems: 'stretch', height: '100%', borderLeft: '1px solid var(--bd)' }}>
        {NAV.map(item => {
          const active = isActive(item.href);
          return (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none', display: 'flex', alignItems: 'stretch' }}>
              <div className={`nav-item${active ? ' active' : ''}`}>
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Right side */}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div className="dot dot-live" />
          <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--t3)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Live</span>
        </div>
        <span style={{ fontSize: 10, color: 'var(--t4)', fontFamily: 'SFMono-Regular, monospace' }}>
          2026-03-01 · UTC
        </span>
        <div style={{
          width: 26, height: 26, borderRadius: '50%',
          background: 'var(--bg-3)', border: '1px solid var(--bd)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 10, fontWeight: 700, color: 'var(--t3)',
        }}>
          OP
        </div>
      </div>
    </header>
  );
}
