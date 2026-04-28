const { useState } = React;

/* ── Inline SVG diagrams ──────────────────────────────────────── */
const DiagramMultiplayer = () => (
  <svg viewBox="0 0 120 70" fill="none" style={{ width: '100%', height: 70 }}>
    {/* Server center */}
    <rect x="45" y="25" width="30" height="20" rx="2"
      stroke="var(--color-tick)" strokeWidth="1.2" fill="rgba(0,200,220,0.07)" />
    <text x="60" y="38" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill="var(--color-tick)">SRV</text>
    {/* Clients */}
    {[[10,10],[10,50],[100,10],[100,50]].map(([cx,cy],i) => (
      <g key={i}>
        <circle cx={cx+6} cy={cy+5} r="7" stroke="var(--color-hud)" strokeWidth="1" fill="rgba(80,100,130,0.12)" />
        <line x1={cx+6} y1={cy+5} x2={i < 2 ? 45 : 75} y2={35}
          stroke="var(--color-border)" strokeWidth="0.8" strokeDasharray="3,2" />
      </g>
    ))}
    <text x="60" y="67" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6.5" fill="var(--color-hud)">state sync</text>
  </svg>
);

const DiagramGameplay = () => (
  <svg viewBox="0 0 120 70" fill="none" style={{ width: '100%', height: 70 }}>
    {[['PLAYER',0],['PROGRESSION',1],['ABILITIES',2],['INVENTORY',3]].map(([label,i]) => (
      <g key={label}>
        <rect x={8 + i*5} y={8 + i*8} width={104 - i*10} height="12" rx="1.5"
          stroke="var(--color-border)" strokeWidth="0.8"
          fill={i === 0 ? 'rgba(0,200,220,0.1)' : 'rgba(60,70,90,0.25)'} />
        <text x={60} y={17 + i*8} textAnchor="middle"
          fontFamily="JetBrains Mono" fontSize="6" fill={i===0 ? 'var(--color-tick)' : 'var(--color-hud)'}>{label}</text>
      </g>
    ))}
    <text x="60" y="67" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6.5" fill="var(--color-hud)">modular stack</text>
  </svg>
);

const DiagramPerformance = () => (
  <svg viewBox="0 0 120 70" fill="none" style={{ width: '100%', height: 70 }}>
    {/* Waveform */}
    <polyline
      points="5,20 20,18 35,40 42,55 48,58 54,50 65,28 80,20 95,18 110,16"
      stroke="var(--color-tick)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Target line */}
    <line x1="5" y1="24" x2="115" y2="24" stroke="var(--color-crit)" strokeWidth="0.8" strokeDasharray="4,3" />
    <text x="42" y="54" fontFamily="JetBrains Mono" fontSize="6" fill="var(--color-crit)">bottleneck</text>
    <text x="70" y="15" fontFamily="JetBrains Mono" fontSize="6" fill="var(--color-xp)">recovered</text>
    <text x="60" y="67" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6.5" fill="var(--color-hud)">frame budget</text>
  </svg>
);

const DiagramLiveOps = () => (
  <svg viewBox="0 0 120 70" fill="none" style={{ width: '100%', height: 70 }}>
    {[['GAME',8],['PlayFab',40],['IAP/Ads',72],['Analytics',104]].map(([label, x], i, arr) => (
      <g key={label}>
        <rect x={x} y={20} width={26} height={16} rx="2"
          stroke={i === 1 ? 'var(--color-tick)' : 'var(--color-border)'} strokeWidth="0.9"
          fill={i === 1 ? 'rgba(0,200,220,0.1)' : 'rgba(60,70,90,0.2)'} />
        <text x={x+13} y={31} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="5.5"
          fill={i === 1 ? 'var(--color-tick)' : 'var(--color-hud)'}>{label}</text>
        {i < arr.length - 1 && (
          <line x1={x+26} y1={28} x2={arr[i+1][1]} y2={28}
            stroke="var(--color-border)" strokeWidth="0.8" markerEnd="url(#arrow)" />
        )}
      </g>
    ))}
    <defs>
      <marker id="arrow" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
        <path d="M0 0 L4 2 L0 4 Z" fill="var(--color-border)"/>
      </marker>
    </defs>
    <text x="60" y="67" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6.5" fill="var(--color-hud)">live-ops pipeline</text>
  </svg>
);

const DiagramCrossEngine = () => (
  <svg viewBox="0 0 120 70" fill="none" style={{ width: '100%', height: 70 }}>
    <rect x="4" y="16" width="36" height="24" rx="2"
      stroke="rgba(140,200,255,0.7)" strokeWidth="1.2" fill="rgba(140,200,255,0.07)" />
    <text x="22" y="26" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fontWeight="700" fill="rgba(140,200,255,0.9)">Unity</text>
    <text x="22" y="35" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="5.5" fill="var(--color-hud)">C#</text>
    <rect x="80" y="16" width="36" height="24" rx="2"
      stroke="rgba(255,160,80,0.7)" strokeWidth="1.2" fill="rgba(255,160,80,0.07)" />
    <text x="98" y="26" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="5.8" fontWeight="700" fill="rgba(255,160,80,0.9)">Unreal 5</text>
    <text x="98" y="35" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="5.5" fill="var(--color-hud)">C++ / BP</text>
    {/* Bridge */}
    <line x1="40" y1="28" x2="80" y2="28" stroke="var(--color-tick)" strokeWidth="1.2" strokeDasharray="4,3"/>
    <circle cx="60" cy="28" r="4" fill="var(--color-tick)" opacity="0.85"/>
    <text x="60" y="67" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6.5" fill="var(--color-hud)">production grade</text>
  </svg>
);

const DiagramCrash = () => (
  <svg viewBox="0 0 120 70" fill="none" style={{ width: '100%', height: 70 }}>
    <polyline
      points="5,15 18,17 30,22 42,32 52,44 60,48 70,40 82,28 95,20 110,15"
      stroke="var(--color-xp)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline
      points="5,15 18,17 30,22 42,32 52,44"
      stroke="var(--color-crit)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="60" cy="48" r="3" fill="var(--color-hud)" />
    <text x="58" y="59" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6" fill="var(--color-hud)">intervention</text>
    <text x="60" y="67" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6.5" fill="var(--color-hud)">crash rate</text>
  </svg>
);

const SYSTEMS = [
  {
    id: 'multiplayer',
    icon: '⬡',
    title: 'Multiplayer Architecture',
    subtitle: 'Server-authoritative design, lag compensation, deterministic state sync. Shipped across BullBash and Tankz N Glory.',
    Diagram: DiagramMultiplayer,
    detail: 'For BullBash, I designed a server-authoritative loop where all game state lived server-side and clients sent only intent. Lag compensation used a rolling history buffer to rewind and re-evaluate hit events — the same pattern used in Counter-Strike. For Tankz N Glory I extended this to 4v4 with per-entity interest management to reduce unnecessary sync traffic.',
  },
  {
    id: 'gameplay',
    icon: '⬡',
    title: 'Gameplay System Design',
    subtitle: 'Modular player, progression, ability, and inventory systems designed for live-content expansion.',
    Diagram: DiagramGameplay,
    detail: 'In EcoRun, I separated the player controller, progression manager, and spawner into decoupled modules connected through scriptable-object event channels. This let designers add new content drops without touching code. In Yaaro Ki Rasoi, I used a component-based interaction system where each kitchen object registered its own interactable contract — scaling cleanly to hundreds of objects.',
  },
  {
    id: 'performance',
    icon: '⬡',
    title: 'Performance Engineering',
    subtitle: 'UE5 Tick reduction, widget optimization, mobile profiling, pooling systems. Restored framerate on shipped UE5 mobile title.',
    Diagram: DiagramPerformance,
    detail: 'On Yaaro Ki Rasoi (UE5 mobile), I used Unreal Insights and a stat overlay to trace the frame budget and found two culprits: hundreds of actors ticking every frame and world-space UI widgets re-rendering without dirty-checking. I disabled tick on idle actors, batched widget updates, and introduced a custom object-pool for FX — recovering 18–22ms per frame on a mid-range Android device.',
  },
  {
    id: 'liveops',
    icon: '⬡',
    title: 'Live Ops & Telemetry',
    subtitle: 'PlayFab integration, IAP, ads, analytics pipelines. 4 years at Loco shipping live mobile titles.',
    Diagram: DiagramLiveOps,
    detail: 'At Loco I owned the full live-ops integration layer: PlayFab player data, economy, and matchmaking; MoPub/AdMob mediation; and a custom analytics pipeline routing events to BigQuery for the data team. I also built an A/B test harness in Unity that read experiment assignments from PlayFab flags — no app update required to flip feature variants.',
  },
  {
    id: 'engines',
    icon: '⬡',
    title: 'Cross-Engine Engineering',
    subtitle: 'Production-grade work across Unity (C#) and Unreal Engine 5 (C++/Blueprints).',
    Diagram: DiagramCrossEngine,
    detail: 'Most engineers specialise in one engine. I have shipped to production in both: Unity C# at Tap Cube, Loco, and P99SOFT; Unreal Engine 5 C++ and Blueprints at P99SOFT for Yaaro Ki Rasoi. The mental model transfers — but the tooling, memory model, and profiling workflows are different enough that genuine dual-engine fluency takes years to build.',
  },
  {
    id: 'crash',
    icon: '⬡',
    title: 'Crash Reduction & Stability',
    subtitle: 'Owned crash-rate reduction and runtime stability across live mobile titles at Loco.',
    Diagram: DiagramCrash,
    detail: 'At Loco I was the go-to engineer for production fires. I built a triage workflow using Firebase Crashlytics and logcat symbolication, correlating spikes to specific build deltas. Key fixes included eliminating null-ref chains in async callback trees, hardening state machines against unexpected server payloads, and adding defensive guards around ad-network SDK calls that were the source of ~30% of non-fatal errors.',
  },
];

const SystemTile = ({ system }) => {
  const [expanded, setExpanded] = useState(false);
  const { Diagram } = system;

  return (
    <div
      className={`system-tile${expanded ? ' expanded' : ''}`}
      style={{ cursor: 'pointer' }}
      onClick={() => setExpanded(v => !v)}
      role="button"
      aria-expanded={expanded}
      tabIndex={0}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setExpanded(v => !v)}
    >
      {/* Header */}
      <div style={{ padding: '20px 22px 16px', display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 10,
              color: expanded ? 'var(--color-tick)' : 'var(--color-hud)',
              transition: 'color 0.2s',
              letterSpacing: '0.1em',
            }}>
              {expanded ? '[ OPEN ]' : '[ — ]'}
            </span>
            <h3 style={{
              fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 14,
              color: expanded ? 'var(--color-tick)' : 'var(--color-text)',
              transition: 'color 0.2s',
            }}>
              {system.title}
            </h3>
          </div>
          <p style={{ fontSize: 13, color: 'var(--color-text-dim)', lineHeight: 1.65 }}>
            {system.subtitle}
          </p>
        </div>
        <div style={{ width: 100, flexShrink: 0, opacity: expanded ? 1 : 0.65, transition: 'opacity 0.2s' }}>
          <Diagram />
        </div>
      </div>

      {/* Expanded detail */}
      <div style={{
        maxHeight: expanded ? 200 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.45s var(--ease-out-expo)',
      }}>
        <div style={{
          padding: '0 22px 20px',
          borderTop: `1px solid var(--color-border-subtle)`,
          paddingTop: 16,
        }}>
          <p style={{ fontSize: 13.5, color: 'var(--color-text-dim)', lineHeight: 1.75 }}>
            {system.detail}
          </p>
        </div>
      </div>
    </div>
  );
};

const Systems = () => (
  <section id="systems" style={{ padding: '100px 24px', background: 'rgba(0,0,0,0.15)' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>

      <div style={{ marginBottom: 56 }}>
        <div className="hud-label" style={{ marginBottom: 10 }}>// 02 · SYSTEMS I'VE OWNED</div>
        <h2 style={{
          fontFamily: 'var(--font-mono)', fontWeight: 700,
          fontSize: 'clamp(28px, 3.5vw, 44px)',
          color: 'var(--color-text)', letterSpacing: '-0.02em',
        }}>
          Not skills. Systems.
        </h2>
        <p style={{ fontSize: 15, color: 'var(--color-text-dim)', marginTop: 12, maxWidth: 560, lineHeight: 1.7 }}>
          Click any tile to read the specific technical decision.
        </p>
        <div style={{ width: 48, height: 2, background: 'var(--color-tick)', marginTop: 16, boxShadow: '0 0 8px var(--color-tick)' }} />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 520px), 1fr))',
        gap: 16,
      }}>
        {SYSTEMS.map(s => <SystemTile key={s.id} system={s} />)}
      </div>

    </div>
  </section>
);

Object.assign(window, { Systems });
