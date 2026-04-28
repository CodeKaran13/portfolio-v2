'use client';

import { useState } from 'react';
import type { Project } from '@/lib/types';

const PROJECTS: Project[] = [
  {
    codename: 'ECORUN',
    engine: 'Unity',
    engineColor: 'rgba(140,200,255,0.9)',
    title: 'EcoRun',
    role: 'Lead Gameplay Engineer',
    platform: 'Mobile · Android',
    year: '2024',
    status: 'Live on Play Store',
    bullets: [
      'Architected modular endless-runner systems supporting deterministic spawning and PlayFab-driven progression',
      'Built reusable player and progression frameworks designed for multi-season content expansion',
      'Shipped to Play Store with stable mobile performance across low-end Android devices',
    ],
    tags: ['Unity', 'C#', 'PlayFab', 'Android'],
    caseStudy: 'https://blog.codekarangames.dev',
  },
  {
    codename: 'YKR',
    engine: 'Unreal Engine 5',
    engineColor: 'rgba(255,160,80,0.9)',
    title: 'Yaaro Ki Rasoi',
    role: 'Senior Gameplay Engineer · Perf Lead',
    platform: 'Mobile / PC',
    year: '2024',
    status: 'Live on Play Store',
    bullets: [
      'Resolved Tick-heavy gameplay bottlenecks and world-space widget costs on UE5 mobile, restoring target framerate',
      'Owned interaction system architecture for kitchen simulation across hundreds of interactable objects',
      'Optimized FX and runtime stability without compromising gameplay responsiveness',
    ],
    tags: ['Unreal Engine 5', 'C++', 'Blueprints', 'Mobile'],
    caseStudy: 'https://blog.codekarangames.dev',
  },
  {
    codename: 'BULLBASH',
    engine: 'Unity',
    engineColor: 'rgba(140,200,255,0.9)',
    title: 'BullBash',
    role: 'Multiplayer Systems Engineer',
    platform: 'Mobile · PvP',
    year: '2023',
    status: 'Shipped',
    bullets: [
      'Built real-time PvP architecture inspired by Clash Royale with synchronization reliability and lag compensation',
      'Designed strategic power-up and ability systems for fast-paced 1v1 matches',
      'Engineered server-authoritative gameplay loops resilient to network jitter',
    ],
    tags: ['Unity', 'C#', 'Multiplayer', 'Custom Netcode'],
    caseStudy: 'https://blog.codekarangames.dev',
  },
  {
    codename: 'TANKZ',
    engine: 'Unity',
    engineColor: 'rgba(140,200,255,0.9)',
    title: '4v4 Tankz N Glory',
    role: 'Multiplayer Gameplay Engineer',
    platform: 'Mobile · 4v4 Shooter',
    year: '2023',
    status: 'Shipped',
    bullets: [
      'Built ability and inventory architecture for team-based 4v4 tank combat',
      'Engineered server-authoritative synchronization for fair real-time gameplay',
      'Designed progression and customization systems supporting long-term player retention',
    ],
    tags: ['Unity', 'C#', 'Multiplayer', 'Mobile'],
    caseStudy: 'https://blog.codekarangames.dev',
  },
];

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

const ProjectCard = ({ project }: { project: Project }) => {
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
          {project.bullets.map((b, i) => (
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
          <a href={project.caseStudy} target="_blank" rel="noopener noreferrer"
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
          </a>
        </div>

      </div>
    </article>
  );
};

export default function Work() {
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
          {PROJECTS.map(p => <ProjectCard key={p.codename} project={p} />)}
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
