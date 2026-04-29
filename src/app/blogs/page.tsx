import { BLOG_POSTS } from '@/lib/data/blog-posts';
import BlogCard from '@/components/BlogCard';

export const metadata = {
  title: 'Writing — Karan Nandkar',
  description: 'Technical articles on gameplay engineering, architecture, and performance.',
};

export default function BlogsPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--color-bg)', paddingTop: 100 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 100px' }}>

        <div style={{ marginBottom: 56 }}>
          <div className="hud-label" style={{ marginBottom: 10 }}>{'// WRITING'}</div>
          <h1 style={{
            fontFamily: 'var(--font-mono)', fontWeight: 700,
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            color: 'var(--color-text)', letterSpacing: '-0.02em',
          }}>
            How I think about problems
          </h1>
          <div style={{
            width: 48, height: 2,
            background: 'var(--color-tick)',
            marginTop: 16,
            boxShadow: '0 0 8px var(--color-tick)',
          }} />
          <p style={{
            marginTop: 20, fontSize: 14,
            color: 'var(--color-text-dim)', lineHeight: 1.7,
            maxWidth: 600,
          }}>
            Technical deep-dives on gameplay architecture, engine systems, and the engineering decisions behind shipped titles.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
          gap: 20,
        }}>
          {BLOG_POSTS.map(post => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

      </div>
    </main>
  );
}
