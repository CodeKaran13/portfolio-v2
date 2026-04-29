import type { Role } from '@/lib/types';

const ROLES: Role[] = [
  {
    title: 'Senior Game Developer',
    company: 'P99SOFT',
    period: '2023 — Present',
    type: 'Full-time',
    bullets: [
      'Lead gameplay direction across Unity and UE5 mobile titles',
      'Owned EcoRun (Unity, Android) and Yaaro Ki Rasoi (UE5, Mobile/PC) end-to-end',
      'Performance engineering lead — restored target framerate on UE5 mobile',
    ],
    tags: ['Unity', 'Unreal Engine 5', 'C#', 'C++', 'Mobile'],
    accent: 'var(--color-tick)',
  },
  {
    title: 'SDE 3 / Game Developer',
    company: 'Loco',
    period: '2019 — 2023',
    type: '4 years',
    bullets: [
      'Live mobile gameplay systems, multiplayer architecture, and monetisation across multiple shipped titles',
      'Owned PlayFab integration, IAP, ad mediation, and analytics pipelines',
      'Led crash-rate reduction and runtime stability initiatives across live titles',
    ],
    tags: ['Unity', 'C#', 'PlayFab', 'Multiplayer', 'Live Ops'],
    accent: 'var(--color-xp)',
  },
  {
    title: 'Game Developer',
    company: 'Tap Cube Studios',
    period: '2017 — 2019',
    type: '2 years',
    bullets: [
      'Shipped multiple Android titles across racing, platformer, and action genres',
      'Built core gameplay loops, player controllers, and progression systems',
    ],
    tags: ['Unity', 'C#', 'Android'],
    accent: 'var(--color-hud)',
  },
];

export default function Experience() {
  return (
    <section id="experience" style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <div style={{ marginBottom: 56 }}>
          <div className="hud-label" style={{ marginBottom: 10 }}>{'// 03 · EXPERIENCE'}</div>
          <h2 style={{
            fontFamily: 'var(--font-mono)', fontWeight: 700,
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            color: 'var(--color-text)', letterSpacing: '-0.02em',
          }}>
            9 years shipping games
          </h2>
          <div style={{ width: 48, height: 2, background: 'var(--color-tick)', marginTop: 16, boxShadow: '0 0 8px var(--color-tick)' }} />
        </div>

        <div style={{ position: 'relative', maxWidth: 720 }}>
          <div style={{
            position: 'absolute', left: 15, top: 32, bottom: 32,
            width: 1, background: 'var(--color-border)',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {ROLES.map((role, i) => (
              <div key={i} style={{ display: 'flex', gap: 32, paddingBottom: i < ROLES.length - 1 ? 48 : 0 }}>
                <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
                  <div style={{
                    width: 32, height: 32,
                    border: `2px solid ${role.accent}`,
                    borderRadius: 3,
                    background: 'var(--color-base)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 1, position: 'relative',
                    boxShadow: `0 0 12px ${role.accent}33`,
                  }}>
                    <div style={{ width: 8, height: 8, borderRadius: 1, background: role.accent }} />
                  </div>
                </div>

                <div style={{
                  flex: 1,
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 3,
                  padding: '22px 24px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                    <div>
                      <h3 style={{
                        fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 16,
                        color: 'var(--color-text)', marginBottom: 3,
                      }}>
                        {role.title}
                      </h3>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: role.accent, fontWeight: 600 }}>
                          {role.company}
                        </span>
                        <span className="hud-label" style={{ fontSize: 9 }}>{role.type}</span>
                      </div>
                    </div>
                    <span className="hud-label" style={{
                      padding: '4px 10px',
                      border: '1px solid var(--color-border)',
                      borderRadius: 2,
                      fontVariantNumeric: 'tabular-nums',
                      flexShrink: 0,
                    }}>
                      {role.period}
                    </span>
                  </div>

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                    {role.bullets.map((b, j) => (
                      <li key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <span style={{ color: role.accent, fontFamily: 'var(--font-mono)', fontSize: 12, flexShrink: 0, marginTop: 2, opacity: 0.8 }}>›</span>
                        <span style={{ fontSize: 13.5, color: 'var(--color-text-dim)', lineHeight: 1.65 }}>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {role.tags.map(t => (
                      <span key={t} style={{
                        fontFamily: 'var(--font-mono)', fontSize: 10,
                        padding: '2px 8px',
                        border: '1px solid var(--color-border)',
                        borderRadius: 2,
                        color: 'var(--color-text-dim)',
                        letterSpacing: '0.06em',
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
