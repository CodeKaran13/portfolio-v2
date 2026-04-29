'use client';

import Link from 'next/link';
import type { BlogPost } from '@/lib/types';

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blogs/${post.slug}`} style={{ textDecoration: 'none', display: 'flex' }}>
      <article
        style={{
          flex: 1,
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 3,
          padding: '24px 24px 20px',
          display: 'flex', flexDirection: 'column', gap: 14,
          transition: 'transform 0.3s var(--ease-out-expo), border-color 0.3s, box-shadow 0.3s',
          cursor: 'pointer',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.borderColor = post.tagColor;
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.borderColor = 'var(--color-border)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 9,
            padding: '3px 8px',
            border: `1px solid ${post.tagColor}`,
            borderRadius: 2, color: post.tagColor,
            letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>
            {post.tag}
          </span>
          <span className="hud-label" style={{ fontSize: 9 }}>{post.readTime}</span>
        </div>

        <h3 style={{
          fontFamily: 'var(--font-mono)', fontWeight: 700,
          fontSize: 15, color: 'var(--color-text)',
          lineHeight: 1.4, letterSpacing: '-0.01em',
        }}>
          {post.title}
        </h3>

        <p style={{ fontSize: 13, color: 'var(--color-text-dim)', lineHeight: 1.7, flex: 1 }}>
          {post.summary}
        </p>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: 12, borderTop: '1px solid var(--color-border-subtle)',
        }}>
          <span className="hud-label">{post.engine}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: post.tagColor }}>
            Read →
          </span>
        </div>
      </article>
    </Link>
  );
}
