const POSTS = [
  {
    slug: 'ecorun-endless-runner',
    tag: 'Architecture',
    tagColor: 'var(--color-tick)',
    title: 'EcoRun: Architecting an Endless Runner for Live Content',
    summary: 'How I designed a deterministic spawner and PlayFab-driven progression system that could ship new seasons without engineering changes.',
    engine: 'Unity · C#',
    readTime: '8 min read',
    href: 'https://blog.codekarangames.dev',
  },
  {
    slug: 'ykr-ue5-performance',
    tag: 'Performance',
    tagColor: 'var(--color-crit)',
    title: 'Yaaro Ki Rasoi: Rescuing Framerate in UE5 Mobile',
    summary: 'A deep dive into Unreal Insights, Tick budgeting, world-space widget batching, and the profiling workflow that recovered 18–22ms per frame on Android.',
    engine: 'Unreal Engine 5 · C++',
    readTime: '11 min read',
    href: 'https://blog.codekarangames.dev',
  },
  {
    slug: 'bullbash-pvp-sync',
    tag: 'Multiplayer',
    tagColor: 'var(--color-xp)',
    title: 'BullBash: Real-Time PvP Sync on Mobile',
    summary: 'Server-authoritative loops, lag compensation history buffers, and designing for jitter tolerance in a 1v1 mobile PvP title.',
    engine: 'Unity · Custom Netcode',
    readTime: '10 min read',
    href: 'https://blog.codekarangames.dev',
  },
];

const Writing = () => (
  <section id="writing" style={{ padding: '100px 24px', background: 'rgba(0,0,0,0.12)' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>

      <div style={{ marginBottom: 56 }}>
        <div className="hud-label" style={{ marginBottom: 10 }}>// 04 · WRITING & CASE STUDIES</div>
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
        {POSTS.map(post => (
          <a key={post.slug} href={post.href} target="_blank" rel="noopener noreferrer"
            style={{ textDecoration: 'none', display: 'flex' }}>
            <article style={{
              flex: 1,
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 3,
              padding: '24px 24px 20px',
              display: 'flex', flexDirection: 'column', gap: 14,
              transition: 'transform 0.3s var(--ease-out-expo), border-color 0.3s, box-shadow 0.3s',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = post.tagColor;
                e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,0,0,0.4)`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.boxShadow = 'none';
              }}>

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

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid var(--color-border-subtle)' }}>
                <span className="hud-label">{post.engine}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: post.tagColor }}>
                  Read →
                </span>
              </div>

            </article>
          </a>
        ))}
      </div>

      <div style={{ textAlign: 'right' }}>
        <a href="https://blog.codekarangames.dev" target="_blank" rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-mono)', fontSize: 13,
            color: 'var(--color-text-dim)', textDecoration: 'none',
            borderBottom: '1px solid var(--color-border)',
            paddingBottom: 2,
            transition: 'color 0.2s, border-color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-tick)'; e.currentTarget.style.borderColor = 'var(--color-tick)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-dim)'; e.currentTarget.style.borderColor = 'var(--color-border)'; }}>
          Read all case studies → blog.codekarangames.dev
        </a>
      </div>

    </div>
  </section>
);

Object.assign(window, { Writing });
