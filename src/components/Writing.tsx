'use client';

import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/data/blog-posts';
import BlogCard from '@/components/BlogCard';

export default function Writing() {
  return (
    <section id="writing" style={{ padding: '100px 24px', background: 'rgba(0,0,0,0.12)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <div style={{ marginBottom: 56 }}>
          <div className="hud-label" style={{ marginBottom: 10 }}>{'// 04 · WRITING & CASE STUDIES'}</div>
          <h2 style={{
            fontFamily: 'var(--font-mono)', fontWeight: 700,
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            color: 'var(--color-text)', letterSpacing: '-0.02em',
          }}>
            How I think about problems
          </h2>
          <div style={{ width: 48, height: 2, background: 'var(--color-tick)', marginTop: 16, boxShadow: '0 0 8px var(--color-tick)' }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
          gap: 20,
          marginBottom: 32,
        }}>
          {BLOG_POSTS.map(post => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <div style={{ textAlign: 'right' }}>
          <Link href="/blogs"
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 13,
              color: 'var(--color-text-dim)', textDecoration: 'none',
              borderBottom: '1px solid var(--color-border)',
              paddingBottom: 2,
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-tick)'; e.currentTarget.style.borderBottomColor = 'var(--color-tick)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-dim)'; e.currentTarget.style.borderBottomColor = 'var(--color-border)'; }}>
            Read all writings →
          </Link>
        </div>

      </div>
    </section>
  );
}
