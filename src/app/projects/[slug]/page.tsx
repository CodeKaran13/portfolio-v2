import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { PROJECTS } from '@/lib/data/projects';
import { CASE_STUDIES } from '@/lib/data/case-studies';
import type { CaseStudyDecision, CaseStudySubSection } from '@/lib/types';

export function generateStaticParams() {
  return PROJECTS.map(p => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find(p => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Karan Nandkar`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Karan Nandkar`,
      description: project.summary,
      url: `https://codekarangames.dev/projects/${slug}`,
    },
  };
}

const CORNER_PTS: [string, string, string][] = [
  ['12,8', '8,8', '8,20'],
  ['calc(100% - 12px),8', 'calc(100% - 8px),8', 'calc(100% - 8px),20'],
  ['12,calc(100% - 8px)', '8,calc(100% - 8px)', '8,calc(100% - 20px)'],
  ['calc(100% - 12px),calc(100% - 8px)', 'calc(100% - 8px),calc(100% - 8px)', 'calc(100% - 8px),calc(100% - 20px)'],
];

function SectionDivider({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '64px 0 40px' }}>
      <div style={{ flex: 1, height: 1, background: 'var(--color-border-subtle)' }} />
      <span
        className="hud-label"
        style={{ color: 'var(--color-tick)', letterSpacing: '0.15em', opacity: 0.85, flexShrink: 0 }}
      >
        {`// ${label}`}
      </span>
      <div style={{ flex: 1, height: 1, background: 'var(--color-border-subtle)' }} />
    </div>
  );
}

function BulletItem({ text }: { text: string }) {
  return (
    <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 12,
        color: 'var(--color-tick)', flexShrink: 0, marginTop: 3, opacity: 0.8,
      }}>›</span>
      <span style={{ fontSize: 14, color: 'var(--color-text-dim)', lineHeight: 1.65 }}>{text}</span>
    </li>
  );
}

function SubSection({ sub, first }: { sub: CaseStudySubSection; first: boolean }) {
  return (
    <div style={{
      marginTop: first ? 8 : 20,
      paddingTop: first ? 0 : 16,
      borderTop: first ? undefined : '1px solid var(--color-border-subtle)',
    }}>
      <div className="hud-label" style={{ color: 'var(--color-text)', marginBottom: 10, letterSpacing: '0.12em' }}>
        {sub.title}
      </div>
      {sub.intro && (
        <p style={{ fontSize: 13.5, color: 'var(--color-text-dim)', lineHeight: 1.65, marginBottom: 10 }}>
          {sub.intro}
        </p>
      )}
      {sub.bulletLabel && (
        <div className="hud-label" style={{ marginBottom: 8, color: 'var(--color-hud)' }}>
          {sub.bulletLabel}
        </div>
      )}
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {sub.items.map((item, i) => <BulletItem key={i} text={item} />)}
      </ul>
      {sub.footer && (
        <p style={{ fontSize: 13.5, color: 'var(--color-text-dim)', lineHeight: 1.65, marginTop: 10 }}>
          {sub.footer}
        </p>
      )}
    </div>
  );
}

function DecisionCard({ decision }: { decision: CaseStudyDecision }) {
  return (
    <div style={{ display: 'flex', gap: 0, marginBottom: 44 }}>
      <div style={{ flexShrink: 0, width: 52, paddingTop: 1 }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 24, fontWeight: 700,
          color: 'var(--color-tick)', opacity: 0.3, lineHeight: 1, display: 'block',
        }}>
          {decision.index}
        </span>
      </div>
      <div style={{ flex: 1, borderLeft: '1px solid var(--color-tick-dim)', paddingLeft: 24 }}>
        <h3 style={{
          fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700,
          color: 'var(--color-text)', letterSpacing: '-0.01em',
          marginBottom: 14, lineHeight: 1.4,
        }}>
          {decision.title}
        </h3>
        {decision.before.map((p, i) => (
          <p key={i} style={{ fontSize: 14, color: 'var(--color-text-dim)', lineHeight: 1.7, marginBottom: 12 }}>
            {p}
          </p>
        ))}
        {decision.bullets && (
          <div style={{ margin: '14px 0' }}>
            {decision.bulletLabel && (
              <div className="hud-label" style={{ marginBottom: 10, color: 'var(--color-hud)' }}>
                {decision.bulletLabel}
              </div>
            )}
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
              {decision.bullets.map((b, i) => <BulletItem key={i} text={b} />)}
            </ul>
          </div>
        )}
        {decision.transition?.map((t, i) => (
          <p key={i} style={{ fontSize: 14, color: 'var(--color-text-dim)', lineHeight: 1.7, margin: '12px 0' }}>
            {t}
          </p>
        ))}
        {decision.bullets2 && (
          <div style={{ margin: '14px 0' }}>
            {decision.bulletLabel2 && (
              <div className="hud-label" style={{ marginBottom: 10, color: 'var(--color-hud)' }}>
                {decision.bulletLabel2}
              </div>
            )}
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
              {decision.bullets2.map((b, i) => <BulletItem key={i} text={b} />)}
            </ul>
          </div>
        )}
        {decision.subsections && (
          <div style={{ marginTop: 8 }}>
            {decision.subsections.map((sub, i) => (
              <SubSection key={i} sub={sub} first={i === 0} />
            ))}
          </div>
        )}
        {decision.after?.map((p, i) => (
          <p key={i} style={{ fontSize: 14, color: 'var(--color-text-dim)', lineHeight: 1.7, marginTop: 12 }}>
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}

function ProblemCallout({ notText, wasText, closing }: {
  notText: string; wasText: string; closing: string;
}) {
  return (
    <div style={{
      border: '1px solid var(--color-border)',
      borderLeft: '3px solid var(--color-crit)',
      borderRadius: '0 3px 3px 0',
      background: 'rgba(0,0,0,0.2)',
      padding: '24px 28px',
      margin: '28px 0',
    }}>
      <div style={{ marginBottom: 20 }}>
        <div className="hud-label" style={{ color: 'var(--color-hud)', marginBottom: 10 }}>
          THE REAL PROBLEM WAS NOT
        </div>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: 13,
          color: 'var(--color-text-dim)', fontStyle: 'italic', lineHeight: 1.55,
        }}>
          &ldquo;{notText}&rdquo;
        </p>
      </div>
      <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: 20, marginBottom: 20 }}>
        <div className="hud-label" style={{ color: 'var(--color-tick)', marginBottom: 10 }}>
          IT WAS
        </div>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: 14,
          color: 'var(--color-text)', fontWeight: 600, lineHeight: 1.55,
        }}>
          &ldquo;{wasText}&rdquo;
        </p>
      </div>
      <p style={{
        fontSize: 13, color: 'var(--color-text-dim)', fontStyle: 'italic',
        lineHeight: 1.6, borderTop: '1px solid var(--color-border-subtle)', paddingTop: 16, margin: 0,
      }}>
        {closing}
      </p>
    </div>
  );
}

function RealQuestionCallout({ question }: { question: string }) {
  return (
    <div style={{
      border: '1px solid var(--color-border)',
      borderLeft: '3px solid var(--color-tick)',
      borderRadius: '0 3px 3px 0',
      background: 'rgba(0,200,220,0.04)',
      padding: '24px 28px',
      margin: '28px 0',
    }}>
      <div className="hud-label" style={{ color: 'var(--color-tick)', marginBottom: 12 }}>
        THE REAL ENGINEERING QUESTION
      </div>
      <p style={{
        fontFamily: 'var(--font-mono)', fontSize: 14,
        color: 'var(--color-text)', fontWeight: 600, lineHeight: 1.6,
      }}>
        &ldquo;{question}&rdquo;
      </p>
    </div>
  );
}

function PrincipleCallout({ principle }: { principle: string }) {
  const lines = principle.split('\n');
  return (
    <div style={{
      textAlign: 'center',
      padding: '40px 32px',
      margin: '28px 0',
      border: '1px solid var(--color-tick-dim)',
      borderRadius: 3,
      background: 'rgba(0,200,220,0.025)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <svg
        width="100%" height="100%"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        fill="none"
        aria-hidden="true"
      >
        {CORNER_PTS.map(([a, b, c], i) => (
          <polyline key={i} points={`${a} ${b} ${c}`}
            stroke="rgba(0,200,220,0.4)" strokeWidth="1.5" strokeLinecap="square" />
        ))}
      </svg>
      {lines.map((line, i) => (
        <p key={i} style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(17px, 2.2vw, 22px)',
          fontWeight: 700,
          color: 'var(--color-tick)',
          letterSpacing: '-0.01em',
          lineHeight: 1.55,
          margin: 0,
        }}>
          {line.trim()}
        </p>
      ))}
    </div>
  );
}

export default async function ProjectCaseStudy(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const project = PROJECTS.find(p => p.slug === slug);
  if (!project) notFound();

  const cs = CASE_STUDIES.find(c => c.slug === slug);

  if (!cs) {
    return (
      <main style={{ padding: '100px 24px 80px', minHeight: '100vh' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div className="hud-label" style={{ marginBottom: 12 }}>{'// CASE STUDY'}</div>
          <h1 style={{
            fontFamily: 'var(--font-mono)', fontWeight: 700,
            fontSize: 'clamp(24px, 3vw, 36px)',
            color: 'var(--color-text)', letterSpacing: '-0.02em', marginBottom: 8,
          }}>
            {project.title}
          </h1>
          <div className="hud-label" style={{ color: 'var(--color-hud)', marginBottom: 32 }}>
            {project.role} · {project.platform} · {project.year}
          </div>
          <div style={{
            padding: '24px 28px',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: 3,
            background: 'rgba(0,0,0,0.15)',
            marginBottom: 32,
          }}>
            <p style={{ fontSize: 14.5, color: 'var(--color-text-dim)', lineHeight: 1.65 }}>
              Case study in progress — full write-up coming soon.
            </p>
          </div>
          <Link href="/projects" style={{
            fontFamily: 'var(--font-mono)', fontSize: 13,
            color: 'var(--color-tick)', textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>
            ← Back to Projects
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ padding: '100px 24px 80px', minHeight: '100vh' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>

        {/* Back nav */}
        <Link href="/projects" style={{
          fontFamily: 'var(--font-mono)', fontSize: 11,
          color: 'var(--color-hud)', textDecoration: 'none',
          display: 'inline-flex', alignItems: 'center', gap: 8,
          letterSpacing: '0.1em',
        }}>
          ← PROJECTS / {project.codename}
        </Link>

        {/* ── Hero ── */}
        <div style={{ marginTop: 40 }}>
          <div className="hud-label" style={{ marginBottom: 10, color: 'var(--color-tick)', opacity: 0.7 }}>
            {'// CASE STUDY'}
          </div>
          <div style={{
            width: 48, height: 2,
            background: 'var(--color-tick)',
            marginBottom: 20,
            boxShadow: '0 0 8px var(--color-tick)',
          }} />
          <h1 style={{
            fontFamily: 'var(--font-mono)', fontWeight: 700,
            fontSize: 'clamp(28px, 4vw, 44px)',
            color: 'var(--color-text)', letterSpacing: '-0.03em',
            marginBottom: 8, lineHeight: 1.1,
          }}>
            {project.title}
          </h1>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(13px, 1.5vw, 15px)',
            color: 'var(--color-text-dim)', letterSpacing: '-0.01em',
            marginBottom: 20, lineHeight: 1.4,
          }}>
            {cs.subtitle}
          </p>

          {/* Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 9,
              padding: '3px 8px',
              border: `1px solid ${project.engineColor}`,
              borderRadius: 2, color: project.engineColor,
              letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600,
            }}>
              {project.engine}
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 9,
              padding: '3px 8px',
              border: '1px solid var(--color-border)',
              borderRadius: 2, color: 'var(--color-hud)',
              letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>
              {project.platform}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{
                width: 5, height: 5, borderRadius: '50%',
                background: project.status.includes('Live') ? 'var(--color-xp)' : 'var(--color-hud)',
                boxShadow: project.status.includes('Live') ? '0 0 6px var(--color-xp)' : 'none',
                flexShrink: 0,
              }} />
              <span className="hud-label" style={{ fontSize: 9 }}>{project.status}</span>
            </div>
          </div>

          {/* Tech tags */}
          <div className="hud-label" style={{ color: 'var(--color-hud)', marginBottom: 28, letterSpacing: '0.1em' }}>
            {cs.techTags.join(' · ')}
          </div>

          {/* Intro */}
          {cs.intro.map((p, i) => (
            <p key={i} style={{
              fontSize: 15.5, color: 'var(--color-text-dim)', lineHeight: 1.7,
              marginBottom: i < cs.intro.length - 1 ? 14 : 28,
            }}>
              {p}
            </p>
          ))}

          {/* Gameplay CTA */}
          {project.links.gameplay && project.links.gameplay !== '#' && (
            <a
              href={project.links.gameplay}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600,
                padding: '10px 20px',
                border: '1px solid var(--color-tick)',
                color: 'var(--color-tick)',
                borderRadius: 2, textDecoration: 'none',
                letterSpacing: '0.04em',
              }}
            >
              View Gameplay
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 2h8M10 2v8M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
        </div>

        {/* ── Project Overview ── */}
        <SectionDivider label="PROJECT OVERVIEW" />
        {cs.overview.map((p, i) => (
          <p key={i} style={{ fontSize: 14.5, color: 'var(--color-text-dim)', lineHeight: 1.7, marginBottom: 16 }}>
            {p}
          </p>
        ))}
        {cs.overviewBullets && (
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9, margin: '4px 0 16px' }}>
            {cs.overviewBullets.map((b, i) => <BulletItem key={i} text={b} />)}
          </ul>
        )}
        {cs.overviewPost?.map((p, i) => (
          <p key={i} style={{ fontSize: 14.5, color: 'var(--color-text-dim)', lineHeight: 1.7, marginBottom: 16 }}>
            {p}
          </p>
        ))}

        {/* ── My Ownership ── */}
        <SectionDivider label="MY OWNERSHIP" />
        <p style={{ fontSize: 14.5, color: 'var(--color-text-dim)', lineHeight: 1.7, marginBottom: 24 }}>
          {cs.ownership.intro}
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '4px 32px',
          marginBottom: 24,
        }}>
          {cs.ownership.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '6px 0' }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 12,
                color: 'var(--color-tick)', flexShrink: 0, marginTop: 3, opacity: 0.8,
              }}>›</span>
              <span style={{ fontSize: 13.5, color: 'var(--color-text-dim)', lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </div>
        <div style={{
          borderLeft: '2px solid var(--color-tick)',
          background: 'rgba(0,200,220,0.04)',
          padding: '12px 18px',
          borderRadius: '0 2px 2px 0',
        }}>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: 13,
            color: 'var(--color-tick)', margin: 0, lineHeight: 1.5, opacity: 0.9,
          }}>
            {cs.ownership.footer}
          </p>
        </div>

        {/* ── The Core Challenge ── */}
        <SectionDivider label="THE CORE CHALLENGE" />
        {cs.challenge.opening.map((p, i) => (
          <p key={i} style={{ fontSize: 14.5, color: 'var(--color-text-dim)', lineHeight: 1.7, marginBottom: 16 }}>
            {p}
          </p>
        ))}
        {cs.challenge.bottlenecks && (
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9, margin: '4px 0 20px' }}>
            {cs.challenge.bottlenecks.map((b, i) => <BulletItem key={i} text={b} />)}
          </ul>
        )}
        {cs.challenge.connector && (
          <p style={{ fontSize: 14.5, color: 'var(--color-text-dim)', lineHeight: 1.7, marginBottom: 16 }}>
            {cs.challenge.connector}
          </p>
        )}
        {cs.challenge.notText && cs.challenge.wasText && (
          <ProblemCallout
            notText={cs.challenge.notText}
            wasText={cs.challenge.wasText}
            closing={cs.challenge.closing}
          />
        )}
        {cs.challenge.realQuestion && (
          <>
            <RealQuestionCallout question={cs.challenge.realQuestion} />
            <p style={{ fontSize: 14.5, color: 'var(--color-text-dim)', lineHeight: 1.7, fontStyle: 'italic', opacity: 0.8 }}>
              {cs.challenge.closing}
            </p>
          </>
        )}

        {/* ── Key Technical Decisions ── */}
        <SectionDivider label="KEY TECHNICAL DECISIONS" />
        {cs.decisions.map(d => <DecisionCard key={d.index} decision={d} />)}

        {/* ── Results ── */}
        <SectionDivider label="RESULTS" />
        <p style={{ fontSize: 14.5, color: 'var(--color-text-dim)', lineHeight: 1.7, marginBottom: 24 }}>
          {cs.results.opening}
        </p>
        <div style={{ marginBottom: 24 }}>
          {cs.results.items.map((item, i) => (
            <div key={i} style={{
              display: 'flex', gap: 14, alignItems: 'center',
              padding: '13px 0',
              borderBottom: '1px solid var(--color-border-subtle)',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 12,
                color: 'var(--color-xp)', flexShrink: 0, fontWeight: 700,
              }}>✓</span>
              <span style={{ fontSize: 14, color: 'var(--color-text)', lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
        {cs.results.closing.map((p, i) => (
          <p key={i} style={{
            fontSize: 14.5, color: 'var(--color-text-dim)', lineHeight: 1.7,
            marginBottom: i < cs.results.closing.length - 1 ? 12 : 0,
          }}>
            {p}
          </p>
        ))}

        {/* ── What I'd Improve Next ── */}
        <SectionDivider label="WHAT I'D IMPROVE NEXT" />
        <p style={{ fontSize: 14.5, color: 'var(--color-text-dim)', lineHeight: 1.7, marginBottom: 20 }}>
          {cs.improvements.opening}
        </p>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 24 }}>
          {cs.improvements.items.map((item, i) => <BulletItem key={i} text={item} />)}
        </ul>
        {cs.improvements.closing.map((p, i) => (
          <p key={i} style={{ fontSize: 14.5, color: 'var(--color-text-dim)', lineHeight: 1.7, marginBottom: 12 }}>
            {p}
          </p>
        ))}

        {/* ── Final Reflection ── */}
        <SectionDivider label="FINAL REFLECTION" />
        {cs.reflection.opening.map((p, i) => (
          <p key={i} style={{ fontSize: 14.5, color: 'var(--color-text-dim)', lineHeight: 1.7, marginBottom: 14 }}>
            {p}
          </p>
        ))}
        <PrincipleCallout principle={cs.reflection.principle} />
        {cs.reflection.closing.map((p, i) => (
          <p key={i} style={{ fontSize: 14.5, color: 'var(--color-text-dim)', lineHeight: 1.7, marginBottom: 12 }}>
            {p}
          </p>
        ))}

        {/* ── Footer nav ── */}
        <div style={{
          marginTop: 80,
          paddingTop: 32,
          borderTop: '1px solid var(--color-border-subtle)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 16,
        }}>
          <Link href="/projects" style={{
            fontFamily: 'var(--font-mono)', fontSize: 13,
            color: 'var(--color-tick)', textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>
            ← Back to Projects
          </Link>
          <span className="hud-label" style={{ color: 'var(--color-hud)' }}>
            {`// ${project.codename} · ${project.year}`}
          </span>
        </div>

      </div>
    </main>
  );
}
