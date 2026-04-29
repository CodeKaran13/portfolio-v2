'use client';

import Link from 'next/link';

function HoverLink({ href, children, align = 'left' }: { href: string; children: React.ReactNode; align?: 'left' | 'right' }) {
  return (
    <Link href={href}
      style={{
        fontFamily: 'var(--font-mono)', fontSize: 13,
        color: 'var(--color-text-dim)', textDecoration: 'none',
        borderBottom: '1px solid var(--color-border)', paddingBottom: 2,
        transition: 'color 0.2s, border-color 0.2s',
      }}
      onMouseEnter={e => { const el = e.currentTarget; el.style.color = 'var(--color-tick)'; el.style.borderBottomColor = 'var(--color-tick)'; }}
      onMouseLeave={e => { const el = e.currentTarget; el.style.color = 'var(--color-text-dim)'; el.style.borderBottomColor = 'var(--color-border)'; }}
    >
      {children}
    </Link>
  );
}

export function BlogBackLink() {
  return (
    <HoverLink href="/blogs">← All writings</HoverLink>
  );
}

export function BlogArticleFooterNav() {
  return (
    <div style={{
      marginTop: 80, paddingTop: 32,
      borderTop: '1px solid var(--color-border)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      <HoverLink href="/blogs">← Back to all writings</HoverLink>
      <HoverLink href="/">Portfolio →</HoverLink>
    </div>
  );
}
