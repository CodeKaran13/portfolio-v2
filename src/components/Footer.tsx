export default function Footer()
{
  return (
    <footer style={{
      borderTop: '1px solid var(--color-border)',
      padding: '24px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: 12,
      maxWidth: 1200, margin: '0 auto',
    }}>
      <div className="hud-label">
        Karan Nandkar · Senior Gameplay Engineer · Pune, India
      </div>
      <div className="hud-label" style={{ display: 'flex', gap: 20 }}>
        <a href="https://codekarangames.dev" target="_blank" rel="noopener noreferrer"
          style={{ color: 'var(--color-hud)', textDecoration: 'none' }}>
          codekarangames.dev
        </a>
        {/* <a href="https://blog.codekarangames.dev" target="_blank" rel="noopener noreferrer"
          style={{ color: 'var(--color-hud)', textDecoration: 'none' }}>
          blog.codekarangames.dev
        </a> */}
      </div>
    </footer>
  );
}
