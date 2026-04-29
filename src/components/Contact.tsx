'use client';

import type { ContactLink } from '@/lib/types';

const LINKS: ContactLink[] = [
  { label: 'Email',    value: 'knandkar007@gmail.com',        href: 'mailto:knandkar007@gmail.com',   hud: 'PRIMARY' },
  { label: 'LinkedIn', value: 'linkedin.com/in/karannandkar', href: 'https://linkedin.com/in/karannandkar/', hud: 'PROFILE' },
  { label: 'GitHub',   value: 'github.com/CodeKaran13',       href: 'https://github.com/CodeKaran13', hud: 'CODE'    },
  { label: 'Phone',    value: '+91 77100 37151',              href: 'tel:+917710037151',               hud: 'MOBILE'  },
];

const ContactLinkRow = ({ link }: { link: ContactLink }) => (
  <a href={link.href}
    target={link.href.startsWith('http') ? '_blank' : undefined}
    rel="noopener noreferrer"
    style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '18px 22px',
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 3,
      textDecoration: 'none',
      transition: 'border-color 0.25s, transform 0.25s var(--ease-out-expo), box-shadow 0.25s',
      gap: 16,
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = 'var(--color-tick)';
      e.currentTarget.style.transform = 'translateX(4px)';
      e.currentTarget.style.boxShadow = '0 0 16px rgba(0,200,220,0.1)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = 'var(--color-border)';
      e.currentTarget.style.transform = 'none';
      e.currentTarget.style.boxShadow = 'none';
    }}>
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', minWidth: 0 }}>
      <span className="hud-label" style={{
        padding: '2px 7px',
        border: '1px solid var(--color-border)',
        borderRadius: 2,
        flexShrink: 0,
      }}>{link.hud}</span>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 14,
        color: 'var(--color-text)', whiteSpace: 'nowrap',
        overflow: 'hidden', textOverflow: 'ellipsis',
      }}>
        {link.value}
      </span>
    </div>
    <span style={{ color: 'var(--color-tick)', fontFamily: 'var(--font-mono)', fontSize: 14, flexShrink: 0 }}>→</span>
  </a>
);

export default function Contact() {
  return (
    <section id="contact" style={{ padding: '100px 24px 120px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <div style={{ marginBottom: 56 }}>
          <div className="hud-label" style={{ marginBottom: 10 }}>{'// 05 · CONTACT'}</div>
          <h2 style={{
            fontFamily: 'var(--font-mono)', fontWeight: 700,
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            color: 'var(--color-text)', letterSpacing: '-0.02em',
          }}>
            Let&apos;s build something
          </h2>
          <div style={{ width: 48, height: 2, background: 'var(--color-tick)', marginTop: 16, boxShadow: '0 0 8px var(--color-tick)' }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap: 48, alignItems: 'start',
        }}>

          {/* Left: status + now */}
          <div>
            <div style={{
              padding: '24px',
              border: '1px solid var(--color-tick)',
              borderRadius: 3,
              background: 'rgba(0,200,220,0.04)',
              marginBottom: 20,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: 'var(--color-tick)',
                  animation: 'pulse-dot 2.2s ease-in-out infinite',
                }} />
                <span className="hud-label" style={{ color: 'var(--color-tick)' }}>AVAILABILITY STATUS</span>
              </div>
              <p style={{ fontSize: 15, color: 'var(--color-text)', lineHeight: 1.7 }}>
                Open to <strong style={{ color: 'var(--color-tick)' }}>Senior and Lead Gameplay Engineering</strong> roles.
                Remote-from-India and visa-sponsored relocation both welcome.
              </p>
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--color-border-subtle)' }}>
                <div className="hud-label" style={{ marginBottom: 6 }}>TARGETING</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {['Ubisoft', 'Larian', 'CD Projekt', 'Riot', 'Sumo', 'Build A Rocket Boy', 'Keywords'].map(s => (
                    <span key={s} style={{
                      fontFamily: 'var(--font-mono)', fontSize: 10,
                      padding: '3px 8px',
                      border: '1px solid var(--color-border)',
                      borderRadius: 2,
                      color: 'var(--color-text-dim)',
                      letterSpacing: '0.05em',
                    }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{
              padding: '20px 22px',
              border: '1px solid var(--color-border)',
              borderRadius: 3,
              background: 'var(--color-surface)',
            }}>
              <div className="hud-label" style={{ marginBottom: 10 }}>NOW · April 2026</div>
              <p style={{ fontSize: 14, color: 'var(--color-text-dim)', lineHeight: 1.7, fontStyle: 'italic' }}>
                Learning and Developing systems in Unreal Engine.
              </p>
            </div>
          </div>

          {/* Right: contact links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {LINKS.map(link => <ContactLinkRow key={link.label} link={link} />)}
          </div>

        </div>
      </div>
    </section>
  );
}
