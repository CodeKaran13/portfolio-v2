export default function Divider() {
  return (
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
}
