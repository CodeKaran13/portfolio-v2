'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Project } from '@/lib/types';
import { PROJECTS } from '@/lib/data/projects';

const FEATURED = PROJECTS.slice(0, 2);

const Tag = ({ label }: { label: string }) => (
  <span style={{
    fontFamily: 'var(--font-mono)', fontSize: 10,
    padding: '3px 8px',
    border: '1px solid var(--color-border)',
    borderRadius: 2,
    color: 'var(--color-text-dim)',
    letterSpacing: '0.06em',
  }}>{label}</span>
);

const EngineBadge = ({ engine, color }: { engine: string; color: string }) => (
  <span style={{
    fontFamily: 'var(--font-mono)', fontSize: 9,
    padding: '3px 8px',
    border: `1px solid ${color}`,
    borderRadius: 2,
    color: color,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    fontWeight: 600,
  }}>{engine}</span>
);

const MediaPlaceholder = ({ codename }: { codename: string }) => (
  <div style={{
    position: 'relative',
    width: '100%', height: 180,
    background: 'var(--color-base)',
    overflow: 'hidden',
    borderBottom: '1px solid var(--color-border)',
    flexShrink: 0,
  }}>
    <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
      <defs>
        <pattern id={`stripe-${codename}`} x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="6" height="12" fill="rgba(255,255,255,0.025)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#stripe-${codename})`} />
    </svg>
    <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }} fill="none">
      {([
        ['12,8', '8,8', '8,20'],
        ['calc(100% - 12px),8', 'calc(100% - 8px),8', 'calc(100% - 8px),20'],
        ['12,calc(100% - 8px)', '8,calc(100% - 8px)', '8,calc(100% - 20px)'],
        ['calc(100% - 12px),calc(100% - 8px)', 'calc(100% - 8px),calc(100% - 8px)', 'calc(100% - 8px),calc(100% - 20px)'],
      ] as [string, string, string][]).map(([a, b, c], i) => (
        <polyline key={i} points={`${a} ${b} ${c}`}
          stroke="rgba(0,200,220,0.25)" strokeWidth="1.5" strokeLinecap="square" />
      ))}
    </svg>
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 8,
    }}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" opacity="0.3">
        <rect x="2" y="6" width="28" height="20" rx="2" stroke="var(--color-tick)" strokeWidth="1.2" />
        <circle cx="10" cy="13" r="3" stroke="var(--color-tick)" strokeWidth="1.2" />
        <polyline points="2,24 10,16 16,22 22,16 30,24" stroke="var(--color-tick)" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
      </svg>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 10,
        color: 'rgba(0,200,220,0.35)', letterSpacing: '0.12em',
        textAlign: 'center', lineHeight: 1.6,
      }}>
        gameplay screenshot / video<br />drop {codename.toLowerCase()}.mp4 or .png
      </span>
    </div>
  </div>
);

const ProjectCard = ({ project }: { project: Project }) =>
{
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="project-card"
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <MediaPlaceholder codename={project.codename} />
      <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 20, flex: 1 }}>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 10,
              padding: '3px 8px',
              background: 'var(--color-surface-raised)',
              borderRadius: 2,
              color: 'var(--color-hud)',
              letterSpacing: '0.1em',
              fontWeight: 600,
            }}>
              {project.codename}
            </span>
            <EngineBadge engine={project.engine} color={project.engineColor} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
            <span style={{
              width: 5, height: 5, borderRadius: '50%',
              background: project.status.includes('Live') ? 'var(--color-xp)' : 'var(--color-hud)',
              boxShadow: project.status.includes('Live') ? '0 0 6px var(--color-xp)' : 'none',
            }} />
            <span className="hud-label" style={{ fontSize: 9 }}>{project.status}</span>
          </div>
        </div>

        <div>
          <h3 style={{
            fontFamily: 'var(--font-mono)', fontWeight: 700,
            fontSize: 20, marginBottom: 4,
            transition: 'color 0.2s',
            color: hovered ? 'var(--color-tick)' : 'var(--color-text)',
          }}>
            {project.title}
          </h3>
          <div className="hud-label" style={{ color: 'var(--color-hud)' }}>{project.role}</div>
          <div className="hud-label" style={{ marginTop: 3 }}>{project.platform} · {project.year}</div>
        </div>

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
          {project.owned.map((b, i) => (
            <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-tick)', flexShrink: 0, marginTop: 2, opacity: 0.7 }}>›</span>
              <span style={{ fontSize: 13.5, color: 'var(--color-text-dim)', lineHeight: 1.6 }}>{b}</span>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, paddingTop: 16, borderTop: '1px solid var(--color-border-subtle)' }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {project.tags.map(t => <Tag key={t} label={t} />)}
          </div>
          <Link href={project.links.caseStudy}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 12,
              color: 'var(--color-tick)', textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: 4,
              transition: 'gap 0.2s var(--ease-out-expo)',
              flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.gap = '8px'; }}
            onMouseLeave={e => { e.currentTarget.style.gap = '4px'; }}>
            Case study →
          </Link>
        </div>

      </div>
    </article>
  );
};

export default function Work()
{
  return (
    <section id="work" style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <div style={{ marginBottom: 56 }}>
          <div className="hud-label" style={{ marginBottom: 10 }}>// 01 · SHIPPED WORK</div>
          <h2 style={{
            fontFamily: 'var(--font-mono)', fontWeight: 700,
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            color: 'var(--color-text)', letterSpacing: '-0.02em',
          }}>
            Games I&apos;ve shipped
          </h2>
          <div style={{ width: 48, height: 2, background: 'var(--color-tick)', marginTop: 16, boxShadow: '0 0 8px var(--color-tick)' }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 480px), 1fr))',
          gap: 20,
        }}>
          {FEATURED.map(p => <ProjectCard key={p.codename} project={p} />)}
        </div>

        {/* View all button */}
        <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
          <Link href="/projects" style={{
            fontFamily: 'var(--font-mono)', fontSize: 13,
            padding: '10px 24px',
            border: '1px solid var(--color-border)',
            borderRadius: 2,
            color: 'var(--color-tick)',
            textDecoration: 'none',
            letterSpacing: '0.05em',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
            onMouseEnter={e =>
            {
              e.currentTarget.style.borderColor = 'var(--color-tick)';
              e.currentTarget.style.boxShadow = '0 0 12px rgba(0,200,220,0.15)';
            }}
            onMouseLeave={e =>
            {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
            All Shipped Games →
          </Link>
        </div>

        <div style={{
          marginTop: 40,
          padding: '16px 20px',
          border: '1px solid var(--color-border-subtle)',
          borderRadius: 3,
          background: 'rgba(0,0,0,0.15)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ color: 'var(--color-hud)', fontSize: 12 }}>┄</span>
          <p style={{ fontSize: 13.5, color: 'var(--color-text-dim)', lineHeight: 1.6 }}>
            Earlier shipped work:{' '}
            <span style={{ color: 'var(--color-text)' }}>4 years at Loco</span>
            {' '}(live mobile games, SDE 3) ·{' '}
            <span style={{ color: 'var(--color-text)' }}>Tap Cube Studios</span>
            {' '}catalog (Android racing, platformer, action)
          </p>
        </div>

      </div>
    </section>
  );
}
