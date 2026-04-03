import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      background: '#0f172a',
      borderTop: '1px solid #1e293b',
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
      flexWrap: 'wrap',
      boxShadow: '0 -4px 20px rgba(0,0,0,0.3)',
    }}>
      <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.75)', lineHeight: '1.6', flex: 1, minWidth: '200px' }}>
        🍪 We use cookies to analyze traffic and show relevant ads (Google AdSense). By clicking <strong style={{ color: 'white' }}>Accept</strong>, you consent to our use of cookies.{' '}
        <Link href="/cookies" style={{ color: '#60a5fa', textDecoration: 'underline' }}>Cookie Policy</Link>
        {' · '}
        <Link href="/privacy" style={{ color: '#60a5fa', textDecoration: 'underline' }}>Privacy Policy</Link>
      </p>
      <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
        <button
          onClick={decline}
          style={{ padding: '8px 18px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
        >
          Decline
        </button>
        <button
          onClick={accept}
          style={{ padding: '8px 18px', borderRadius: '8px', border: 'none', background: '#3b82f6', color: 'white', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
        >
          Accept All
        </button>
      </div>
    </div>
  );
}
