'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import type { Project } from '@/lib/types';

const CornerBrackets = () => (
  <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} fill="none">
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
);

export default function ProjectDetailCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const hasVideo = !!project.media.video;
  const showCrossfade = hasVideo && !reducedMotion;

  const handleMouseEnter = () => {
    setHovered(true);
    if (showCrossfade && videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const isSvg = project.media.image.endsWith('.svg');

  return (
    <article
      className="project-card"
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Media region — 16:9 */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 9',
        overflow: 'hidden',
        borderBottom: '1px solid var(--color-border)',
        flexShrink: 0,
        background: 'var(--color-base)',
      }}>
        <Image
          src={project.media.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{
            objectFit: 'cover',
            transition: showCrossfade ? 'opacity 0.4s' : undefined,
            opacity: (showCrossfade && hovered) ? 0 : 1,
          }}
          unoptimized={isSvg}
        />
        {hasVideo && !reducedMotion && (
          <video
            ref={videoRef}
            src={project.media.video}
            poster={project.media.videoPoster}
            muted
            loop
            playsInline
            preload="metadata"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              transition: 'opacity 0.4s',
              opacity: hovered ? 1 : 0,
            }}
          />
        )}
        <CornerBrackets />
      </div>

      {/* Card body */}
      <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 20, flex: 1 }}>

        {/* Header row */}
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
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 9,
              padding: '3px 8px',
              border: `1px solid ${project.engineColor}`,
              borderRadius: 2,
              color: project.engineColor,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}>
              {project.engine}
            </span>
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

        {/* Title block */}
        <div>
          <h3 style={{
            fontFamily: 'var(--font-mono)', fontWeight: 700,
            fontSize: 22, marginBottom: 4,
            transition: 'color 0.2s',
            color: hovered ? 'var(--color-tick)' : 'var(--color-text)',
          }}>
            {project.title}
          </h3>
          <div className="hud-label" style={{ color: 'var(--color-hud)' }}>{project.role}</div>
          <div className="hud-label" style={{ marginTop: 3 }}>{project.platform} · {project.year}</div>
        </div>

        {/* Summary */}
        <p style={{ fontSize: 14.5, color: 'var(--color-text-dim)', lineHeight: 1.65 }}>
          {project.summary}
        </p>

        {/* Owned */}
        <div>
          <div className="hud-label" style={{ marginBottom: 10 }}>// OWNED</div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {project.owned.map((item, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-tick)', flexShrink: 0, marginTop: 2, opacity: 0.7 }}>›</span>
                <span style={{ fontSize: 13.5, color: 'var(--color-text-dim)', lineHeight: 1.6 }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Key Decisions */}
        {project.decisions.length > 0 && (
          <div>
            <div className="hud-label" style={{ marginBottom: 10 }}>// KEY DECISIONS</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {project.decisions.map((d, i) => (
                <li key={i}>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600,
                    color: 'var(--color-tick)', lineHeight: 1.5,
                  }}>
                    {d.title}
                  </div>
                  {d.rationale && (
                    <div style={{ fontSize: 13, color: 'var(--color-text-dim)', lineHeight: 1.6, marginTop: 2 }}>
                      {d.rationale}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {project.tags.map(t => (
            <span key={t} style={{
              fontFamily: 'var(--font-mono)', fontSize: 10,
              padding: '3px 8px',
              border: '1px solid var(--color-border)',
              borderRadius: 2,
              color: 'var(--color-text-dim)',
              letterSpacing: '0.06em',
            }}>{t}</span>
          ))}
        </div>

        {/* Footer buttons */}
        <div style={{
          display: 'flex', gap: 10, flexWrap: 'wrap',
          paddingTop: 16, borderTop: '1px solid var(--color-border-subtle)',
          marginTop: 'auto',
        }}>
          <Link href={project.links.caseStudy} style={{
            fontFamily: 'var(--font-mono)', fontSize: 13,
            padding: '8px 16px',
            background: 'var(--color-tick)',
            color: 'var(--color-base)',
            borderRadius: 2,
            textDecoration: 'none',
            fontWeight: 600,
            letterSpacing: '0.04em',
            flexShrink: 0,
          }}>
            View Case Study →
          </Link>

          {project.links.gameplay ? (
            <a
              href={project.links.gameplay}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-mono)', fontSize: 13,
                padding: '8px 16px',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-dim)',
                borderRadius: 2,
                textDecoration: 'none',
                letterSpacing: '0.04em',
                display: 'flex', alignItems: 'center', gap: 6,
                flexShrink: 0,
              }}
            >
              Watch Gameplay
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 2h8M10 2v8M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ) : (
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 13,
              padding: '8px 16px',
              border: '1px solid var(--color-border-subtle)',
              color: 'var(--color-hud)',
              borderRadius: 2,
              letterSpacing: '0.04em',
              opacity: 0.5,
              cursor: 'default',
            }}>
              Gameplay coming soon
            </span>
          )}
        </div>

      </div>
    </article>
  );
}
