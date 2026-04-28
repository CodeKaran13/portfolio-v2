const { useState, useEffect, useRef } = React;

const Monogram = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
    {/* Hitbox corner brackets */}
    <path d="M3 8 L3 3 L8 3" stroke="var(--color-tick)" strokeWidth="1.5" strokeLinecap="square"/>
    <path d="M32 3 L37 3 L37 8" stroke="var(--color-tick)" strokeWidth="1.5" strokeLinecap="square"/>
    <path d="M3 32 L3 37 L8 37" stroke="var(--color-tick)" strokeWidth="1.5" strokeLinecap="square"/>
    <path d="M32 37 L37 37 L37 32" stroke="var(--color-tick)" strokeWidth="1.5" strokeLinecap="square"/>
    <text x="20" y="27" textAnchor="middle"
      fontFamily="JetBrains Mono, monospace"
      fontSize="14" fontWeight="700"
      fill="var(--color-tick)">KN</text>
  </svg>
);

const NAV_ITEMS = [
  { label: 'Work',       href: '#work'       },
  { label: 'Systems',   href: '#systems'    },
  { label: 'Experience',href: '#experience' },
  { label: 'Writing',   href: '#writing'    },
  { label: 'Contact',   href: '#contact'    },
];

const Nav = () => {
  const [active, setActive]       = useState('work');
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });
  const itemRefs   = useRef([]);
  const listRef    = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const ids = NAV_ITEMS.map(n => n.label.toLowerCase());
      let found = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) found = id;
      }
      setActive(found);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const idx = NAV_ITEMS.findIndex(n => n.label.toLowerCase() === active);
    const el  = itemRefs.current[idx];
    const list = listRef.current;
    if (el && list) {
      const er = el.getBoundingClientRect();
      const lr = list.getBoundingClientRect();
      setIndicator({ left: er.left - lr.left, width: er.width, ready: true });
    }
  }, [active]);

  const headerStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
    background: scrolled ? 'rgba(18,22,30,0.96)' : 'rgba(18,22,30,0.7)',
    borderBottom: `1px solid ${scrolled ? 'var(--color-border)' : 'transparent'}`,
    transition: 'background 0.4s var(--ease-out-expo), border-color 0.4s var(--ease-out-expo)',
  };

  const innerStyle = {
    maxWidth: 1200, margin: '0 auto',
    padding: scrolled ? '10px 24px' : '16px 24px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    transition: 'padding 0.4s var(--ease-out-expo)',
  };

  return (
    <>
      <header role="banner" style={headerStyle}>
        <div style={innerStyle}>

          {/* Left */}
          <a href="#" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
            <Monogram size={scrolled ? 26 : 30} />
            <div>
              <div style={{ fontFamily:'var(--font-mono)', fontWeight:700, fontSize:13, color:'var(--color-text)', lineHeight:1.2 }}>
                Karan Nandkar
              </div>
              <div className="hud-label" style={{ marginTop:1 }}>Senior Gameplay Engineer</div>
            </div>
          </a>

          {/* Center nav — desktop */}
          <nav aria-label="Main navigation" className="hide-mobile">
            <div ref={listRef} style={{ display:'flex', position:'relative', gap:2 }}>
              {NAV_ITEMS.map((item, i) => (
                <a key={item.label}
                  ref={el => itemRefs.current[i] = el}
                  href={item.href}
                  style={{
                    fontFamily: 'var(--font-mono)', fontSize:13,
                    padding: '6px 14px',
                    color: active === item.label.toLowerCase() ? 'var(--color-tick)' : 'var(--color-text-dim)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                    position: 'relative', zIndex: 1,
                  }}>
                  {item.label}
                </a>
              ))}
              {/* Sliding underline */}
              {indicator.ready && (
                <div style={{
                  position:'absolute', bottom:0,
                  left: indicator.left, width: indicator.width,
                  height: 2,
                  background: 'var(--color-tick)',
                  boxShadow: '0 0 8px var(--color-tick)',
                  transition: 'left 0.38s var(--ease-out-expo), width 0.38s var(--ease-out-expo)',
                }} />
              )}
            </div>
          </nav>

          {/* Right */}
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div className="hide-mobile" style={{
              display:'flex', alignItems:'center', gap:6,
              padding:'4px 10px',
              border:'1px solid var(--color-border)',
              borderRadius:100,
              background:'rgba(0,200,220,0.05)',
            }}>
              <span style={{
                width:6, height:6, borderRadius:'50%',
                background:'var(--color-tick)',
                animation: 'pulse-dot 2.2s ease-in-out infinite',
              }} />
              <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--color-tick)', letterSpacing:'0.06em' }}>
                Open · Lead roles · Remote / Relocate
              </span>
            </div>
            {/* Hamburger */}
            <button className="hide-desktop"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              style={{ background:'none', border:'none', cursor:'pointer', padding:4, color:'var(--color-text)' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div style={{
          position:'fixed', inset:0, background:'var(--color-base)', zIndex:200,
          display:'flex', flexDirection:'column', padding:'24px',
        }} role="dialog" aria-modal="true" aria-label="Navigation menu">
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:48 }}>
            <Monogram size={36}/>
            <button onClick={() => setMobileOpen(false)} aria-label="Close menu"
              style={{ background:'none', border:'none', cursor:'pointer', color:'var(--color-text)', padding:8 }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M5 5l12 12M5 17L17 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <nav style={{ display:'flex', flexDirection:'column' }}>
            {NAV_ITEMS.map(item => (
              <a key={item.label} href={item.href} onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily:'var(--font-mono)', fontSize:36, fontWeight:600,
                  color:'var(--color-text)', textDecoration:'none',
                  padding:'14px 0',
                  borderBottom:'1px solid var(--color-border-subtle)',
                  display:'flex', alignItems:'center', justifyContent:'space-between',
                }}>
                {item.label}
                <span style={{ color:'var(--color-tick)', fontSize:20 }}>→</span>
              </a>
            ))}
          </nav>
          <div style={{ marginTop:'auto' }}>
            <div className="hud-label">Mumbai, India · Remote / Visa-sponsored relocation</div>
          </div>
        </div>
      )}
    </>
  );
};

Object.assign(window, { Nav, Monogram });
