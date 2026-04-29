import type { Metadata } from 'next';
import { PROJECTS } from '@/lib/data/projects';
import ProjectDetailCard from '@/components/ProjectDetailCard';

const DESCRIPTION =
  'Every shipped game I\'ve led or contributed to as a gameplay engineer — architecture, systems, and the decisions behind them.';

export const metadata: Metadata = {
  title: 'Projects — Karan Nandkar',
  description: DESCRIPTION,
};

export default function ProjectsPage() {
  return (
    <main style={{ padding: '100px 24px 80px', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Page header */}
        <div style={{ marginBottom: 56 }}>
          <div className="hud-label" style={{ marginBottom: 10 }}>{'// PROJECTS'}</div>
          <h1 style={{
            fontFamily: 'var(--font-mono)', fontWeight: 700,
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            color: 'var(--color-text)', letterSpacing: '-0.02em',
          }}>
            Shipped work
          </h1>
          <p style={{
            marginTop: 12,
            fontSize: 14.5, color: 'var(--color-text-dim)', lineHeight: 1.65,
            maxWidth: 560,
          }}>
            {DESCRIPTION}
          </p>
          <div style={{
            width: 48, height: 2,
            background: 'var(--color-tick)',
            marginTop: 16,
            boxShadow: '0 0 8px var(--color-tick)',
          }} />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map(p => (
            <ProjectDetailCard key={p.slug} project={p} />
          ))}
        </div>

        {/* Earlier work footnote */}
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
    </main>
  );
}
