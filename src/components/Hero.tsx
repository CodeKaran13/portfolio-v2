'use client';

import { useRef, useEffect, useState } from 'react';

const LagCompCanvas = () =>
{
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const latencyRef = useRef(80);
  const runningRef = useRef(true);
  const [latency, setLatency] = useState(80);

  useEffect(() =>
  {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const resize = () =>
    {
      const w = canvas.parentElement!.getBoundingClientRect().width;
      canvas.width = Math.floor(w);
      canvas.height = 260;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    const io = new IntersectionObserver(
      ([e]) => { runningRef.current = e.isIntersecting; },
      { threshold: 0.1 }
    );
    io.observe(canvas);

    const s = {
      mouseX: canvas.width / 2, mouseY: 130,
      clientX: canvas.width / 2, clientY: 130,
      serverX: canvas.width / 2, serverY: 130,
      history: [] as { x: number; y: number; t: number }[],
      trail: [] as { x: number; y: number }[],
    };

    const onMouseMove = (e: MouseEvent) =>
    {
      const r = canvas.getBoundingClientRect();
      s.mouseX = e.clientX - r.left;
      s.mouseY = e.clientY - r.top;
    };
    const onTouchMove = (e: TouchEvent) =>
    {
      e.preventDefault();
      const r = canvas.getBoundingClientRect();
      s.mouseX = e.touches[0].clientX - r.left;
      s.mouseY = e.touches[0].clientY - r.top;
    };
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });

    let rafId: number;
    let last = performance.now();

    const tick = (now: number) =>
    {
      rafId = requestAnimationFrame(tick);
      if (!runningRef.current) return;

      const dt = Math.min(now - last, 50);
      last = now;

      /* Record cursor */
      s.history.push({ x: s.mouseX, y: s.mouseY, t: now });
      while (s.history.length && now - s.history[0].t > 1500) s.history.shift();

      /* Client: exponential lerp — time constant 28 ms */
      const a = 1 - Math.exp(-dt / 28);
      s.clientX += (s.mouseX - s.clientX) * a;
      s.clientY += (s.mouseY - s.clientY) * a;

      /* Server: same cursor but delayed */
      const targetT = now - latencyRef.current;
      let sx = s.mouseX, sy = s.mouseY;
      for (let i = s.history.length - 1; i >= 0; i--)
      {
        if (s.history[i].t <= targetT) { sx = s.history[i].x; sy = s.history[i].y; break; }
      }
      const as2 = 1 - Math.exp(-dt / 38);
      s.serverX += (sx - s.serverX) * as2;
      s.serverY += (sy - s.serverY) * as2;

      /* Trail */
      s.trail.push({ x: s.clientX, y: s.clientY });
      if (s.trail.length > 28) s.trail.shift();

      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      /* Grid */
      ctx.strokeStyle = 'rgba(0,190,215,0.055)';
      ctx.lineWidth = 1;
      for (let x = 0; x <= W; x += 40)
      {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y <= H; y += 40)
      {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      /* Corner brackets */
      const B = 14;
      ctx.strokeStyle = 'rgba(0,190,215,0.18)';
      ctx.lineWidth = 1;
      ([[0, 0], [W, 0], [W, H], [0, H]] as [number, number][]).forEach(([cx, cy]) =>
      {
        const sx2 = cx ? -1 : 1, sy2 = cy ? -1 : 1;
        ctx.beginPath();
        ctx.moveTo(cx, cy + sy2 * B);
        ctx.lineTo(cx, cy);
        ctx.lineTo(cx + sx2 * B, cy);
        ctx.stroke();
      });

      /* Reconciliation gap line */
      const gap = Math.hypot(s.clientX - s.serverX, s.clientY - s.serverY);
      if (latencyRef.current > 15 && gap > 5)
      {
        ctx.save();
        ctx.strokeStyle = 'rgba(255,145,55,0.55)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 5]);
        ctx.beginPath();
        ctx.moveTo(s.clientX, s.clientY);
        ctx.lineTo(s.serverX, s.serverY);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
        const mx = (s.clientX + s.serverX) / 2, my = (s.clientY + s.serverY) / 2;
        ctx.fillStyle = 'rgba(255,145,55,0.8)';
        ctx.font = '9px JetBrains Mono';
        ctx.fillText(`Δ${Math.round(gap)}px`, mx + 5, my - 4);
      }

      /* Client ghost trail */
      s.trail.forEach((p, i) =>
      {
        const t = i / s.trail.length;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5 * t, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,200,230,${t * 0.22})`;
        ctx.fill();
      });

      /* Server dot */
      if (latencyRef.current > 0)
      {
        ctx.beginPath();
        ctx.arc(s.serverX, s.serverY, 10, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,140,45,0.1)';
        ctx.strokeStyle = 'rgba(255,140,45,0.88)';
        ctx.lineWidth = 2;
        ctx.fill(); ctx.stroke();
        ctx.fillStyle = 'rgba(255,140,45,0.9)';
        ctx.font = '9px JetBrains Mono';
        ctx.fillText('SERVER  AUTH', s.serverX + 14, s.serverY + 4);
      }

      /* Client dot */
      ctx.beginPath();
      ctx.arc(s.clientX, s.clientY, 10, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,200,230,0.12)';
      ctx.strokeStyle = 'rgba(0,200,230,0.95)';
      ctx.lineWidth = 2;
      ctx.fill(); ctx.stroke();
      ctx.shadowColor = 'rgba(0,200,230,0.5)';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(0,200,230,0.9)';
      ctx.font = '9px JetBrains Mono';
      ctx.fillText('CLIENT  PREDICTED', s.clientX + 14, s.clientY + 4);

      /* Latency readout */
      ctx.fillStyle = latencyRef.current > 150 ? 'rgba(255,100,60,0.85)' : 'rgba(0,200,230,0.55)';
      ctx.font = '10px JetBrains Mono';
      ctx.fillText(`${latencyRef.current}ms`, W - 44, 16);
    };

    rafId = requestAnimationFrame(tick);
    return () =>
    {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('touchmove', onTouchMove);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <div style={{ borderRadius: 3, border: '1px solid var(--color-border)', overflow: 'hidden', background: 'rgba(0,0,0,0.35)', position: 'relative' }}>
      <canvas ref={canvasRef}
        style={{ display: 'block', width: '100%', height: 260, cursor: 'crosshair' }}
        aria-label="Interactive lag-compensation demo. Move cursor to see client-side prediction vs server authority." />
      <div style={{ position: 'absolute', bottom: 10, left: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span className="hud-label">SIM LATENCY</span>
        <input type="range" min={0} max={300} value={latency}
          onChange={e => { const v = +e.target.value; setLatency(v); latencyRef.current = v; }}
          style={{
            width: 110, height: 3, cursor: 'pointer',
            background: `linear-gradient(to right, var(--color-tick) ${latency / 3}%, var(--color-border) ${latency / 3}%)`,
            borderRadius: 2,
          }}
          aria-label="Simulated network latency in milliseconds" />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-tick)', minWidth: 38, fontVariantNumeric: 'tabular-nums' }}>
          {latency}ms
        </span>
      </div>
    </div>
  );
};

export default function Hero()
{
  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 80 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', padding: '80px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'center' }}>

          {/* Text column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 20 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-xp)', flexShrink: 0, boxShadow: '0 0 6px var(--color-xp)' }} />
              <span className="hud-label">Mumbai, India · Open to remote and visa-sponsored relocation</span>
            </div>

            <h1 style={{
              fontFamily: 'var(--font-mono)', fontWeight: 700,
              fontSize: 'clamp(44px, 6vw, 76px)',
              lineHeight: 0.95, letterSpacing: '-0.03em',
              color: 'var(--color-text)', marginBottom: 10,
            }}>
              Karan<br />Nandkar
            </h1>

            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 'clamp(13px, 1.4vw, 16px)',
              color: 'var(--color-tick)', letterSpacing: '0.07em',
              marginBottom: 28,
            }}>
              Senior Gameplay Engineer
            </div>

            <p style={{
              fontSize: 'clamp(16px, 1.6vw, 20px)', fontWeight: 500,
              lineHeight: 1.4, color: 'var(--color-text)',
              marginBottom: 8, maxWidth: 500,
              fontStyle: 'italic',
            }}>
              &ldquo;I build systems that scale —<br />not features that break later.&rdquo;
            </p>

            <p style={{ fontSize: 15, color: 'var(--color-text-dim)', lineHeight: 1.7, marginBottom: 40, maxWidth: 440 }}>
              Multiplayer architecture · Gameplay systems · Mobile performance
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="/projects" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '11px 24px',
                background: 'var(--color-tick)', color: 'var(--color-base)',
                fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 13,
                textDecoration: 'none', borderRadius: 3,
                transition: 'all 0.25s var(--ease-out-expo)',
                letterSpacing: '0.03em',
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 20px rgba(0,200,220,0.4)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}>
                View shipped work →
              </a>
              <a href="https://codekarangames.dev" target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '11px 24px',
                border: '1px solid var(--color-border)', color: 'var(--color-text)',
                fontFamily: 'var(--font-mono)', fontSize: 13,
                textDecoration: 'none', borderRadius: 3,
                transition: 'all 0.25s var(--ease-out-expo)',
                background: 'transparent',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-tick)'; e.currentTarget.style.color = 'var(--color-tick)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text)'; }}>
                Download CV
              </a>
            </div>
          </div>

          {/* Canvas column */}
          <div>
            <LagCompCanvas />
            <p className="hud-label" style={{ marginTop: 10, textAlign: 'center', lineHeight: 1.6 }}>
              Move cursor · adjust latency · watch client-side prediction vs. server authority reconciliation
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
