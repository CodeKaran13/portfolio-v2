import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '@/lib/data/blog-posts';
import { BlogBackLink, BlogArticleFooterNav } from '@/components/BlogArticleNav';
import type { ContentBlock } from '@/lib/types';

export async function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — Karan Nandkar`,
    description: post.summary,
    openGraph: {
      title: `${post.title} — Karan Nandkar`,
      description: post.summary,
      url: `https://codekarangames.dev/blogs/${slug}`,
    },
  };
}

function renderBlock(block: ContentBlock, i: number) {
  if (block.type === 'h2') {
    return (
      <div key={i} style={{ margin: '48px 0 20px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 16,
          borderBottom: '1px solid var(--color-border)',
          paddingBottom: 12,
        }}>
          <span className="hud-label" style={{ fontSize: 9, whiteSpace: 'nowrap' }}>
            {'//'}
          </span>
          <h2 style={{
            fontFamily: 'var(--font-mono)', fontWeight: 700,
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: 'var(--color-text)', letterSpacing: '-0.01em',
            margin: 0,
          }}>
            {block.text}
          </h2>
        </div>
      </div>
    );
  }

  if (block.type === 'h3') {
    return (
      <h3 key={i} style={{
        fontFamily: 'var(--font-mono)', fontWeight: 700,
        fontSize: 14, color: 'var(--color-tick)',
        letterSpacing: '0.05em', textTransform: 'uppercase',
        margin: '32px 0 12px',
        paddingLeft: 12,
        borderLeft: '2px solid var(--color-tick)',
      }}>
        {block.text}
      </h3>
    );
  }

  if (block.type === 'p') {
    return (
      <p key={i} style={{
        fontSize: 15, color: 'var(--color-text-dim)',
        lineHeight: 1.8, margin: '12px 0',
      }}>
        {block.text}
      </p>
    );
  }

  if (block.type === 'ul') {
    return (
      <ul key={i} style={{ margin: '16px 0', paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {block.items.map((item, j) => (
          <li key={j} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 12,
              color: 'var(--color-tick)', marginTop: 3, flexShrink: 0,
            }}>▸</span>
            <span style={{ fontSize: 14, color: 'var(--color-text-dim)', lineHeight: 1.7 }}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    );
  }

  return null;
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === slug);
  if (!post) notFound();

  return (
    <main style={{ minHeight: '100vh', background: 'var(--color-bg)', paddingTop: 100 }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px 100px' }}>

        {/* Back nav */}
        <div style={{ marginBottom: 48 }}>
          <BlogBackLink />
        </div>

        {/* Header */}
        <header style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
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

          <h1 style={{
            fontFamily: 'var(--font-mono)', fontWeight: 700,
            fontSize: 'clamp(22px, 3vw, 34px)',
            color: 'var(--color-text)', letterSpacing: '-0.02em',
            lineHeight: 1.25, marginBottom: 16,
          }}>
            {post.title}
          </h1>

          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: 12,
            color: 'var(--color-text-dim)', marginBottom: 24,
          }}>
            {post.subtitle}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span className="hud-label">{post.engine}</span>
            <span style={{ width: 1, height: 12, background: 'var(--color-border)' }} />
            <span className="hud-label">Karan Nandkar</span>
          </div>

          <div style={{
            width: '100%', height: 1,
            background: 'var(--color-border)',
            marginTop: 32,
          }} />
        </header>

        {/* Content */}
        <article>
          {post.content.map((block, i) => renderBlock(block, i))}
        </article>

        {/* Footer nav */}
        <BlogArticleFooterNav />

      </div>
    </main>
  );
}
