const { useState, useEffect, useLayoutEffect } = React;

/* ── Section divider ──────────────────────────────────────────── */
const Divider = () => (
  <div style={{
    maxWidth: 1200, margin: '0 auto', padding: '0 24px',
    display: 'flex', alignItems: 'center', gap: 16,
  }}>
    <div style={{ flex: 1, height: 1, background: 'var(--color-border-subtle)' }} />
    <span style={{
      fontFamily: 'var(--font-mono)', fontSize: 9,
      color: 'var(--color-border)', letterSpacing: '0.15em',
    }}>◆</span>
    <div style={{ flex: 1, height: 1, background: 'var(--color-border-subtle)' }} />
  </div>
);

/* ── Scroll-triggered fade-in ─────────────────────────────────── */
const FadeIn = ({ children, delay = 0 }) => {
  const ref = React.useRef(null);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) { setVisible(true); return; }

    // If already in viewport on mount, show synchronously before first paint
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      return;
    }

    // Fallback: reveal after 900ms regardless
    const fallback = setTimeout(() => setVisible(true), 900);

    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); clearTimeout(fallback); } },
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(fallback); };
  }, []);

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(24px)',
      transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
};

/* ── App ──────────────────────────────────────────────────────── */
const App = () => (
  <div style={{ minHeight: '100vh' }}>
    <Nav />
    <main>
      <FadeIn><Hero /></FadeIn>
      <Divider />
      <FadeIn delay={80}><Work /></FadeIn>
      <Divider />
      <FadeIn delay={80}><Systems /></FadeIn>
      <Divider />
      <FadeIn delay={80}><Experience /></FadeIn>
      <Divider />
      <FadeIn delay={80}><Writing /></FadeIn>
      <Divider />
      <FadeIn delay={80}><Contact /></FadeIn>
    </main>
    <Footer />
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
