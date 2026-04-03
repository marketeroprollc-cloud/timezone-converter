import { useState, useEffect } from 'react';

function useIsMobile(breakpoint = 600) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);
  return isMobile;
}

const CITIES = [
  { name: 'New York', offset: -5, flag: '🗽', tz: 'EST' },
  { name: 'London', offset: 0, flag: '🇬🇧', tz: 'GMT' },
  { name: 'Paris', offset: 1, flag: '🗼', tz: 'CET' },
  { name: 'Dubai', offset: 4, flag: '🇦🇪', tz: 'GST' },
  { name: 'India', offset: 5.5, flag: '🇮🇳', tz: 'IST' },
  { name: 'Singapore', offset: 8, flag: '🇸🇬', tz: 'SGT' },
  { name: 'Tokyo', offset: 9, flag: '🗾', tz: 'JST' },
  { name: 'Sydney', offset: 11, flag: '🦘', tz: 'AEDT' },
];

function getLocalTime(utcHour, offset) {
  let t = (utcHour + offset) % 24;
  if (t < 0) t += 24;
  return Math.floor(t);
}

function getStatus(h) {
  if (h >= 22 || h < 7) return 'night';
  if (h >= 9 && h < 18) return 'work';
  return 'offhrs';
}

const STATUS_STYLES = {
  night: { bg: '#0f172a', border: '#1e293b', text: 'white', subtext: '#64748b', badge: '#1e293b', badgeText: '#94a3b8', label: '🌙 Asleep' },
  work: { bg: '#f0fdf4', border: '#bbf7d0', text: '#14532d', subtext: '#16a34a', badge: '#dcfce7', badgeText: '#15803d', label: '✅ Working' },
  offhrs: { bg: '#fffbeb', border: '#fde68a', text: '#78350f', subtext: '#d97706', badge: '#fef3c7', badgeText: '#b45309', label: '🌅 Off hours' },
};

export default function MeetingPlanner({ headingOverride } = {}) {
  const isMobile = useIsMobile();
  const [meetingHour, setMeetingHour] = useState(14);

  const workingCount = CITIES.filter(c => getStatus(getLocalTime(meetingHour, c.offset)) === 'work').length;
  const offCount = CITIES.filter(c => getStatus(getLocalTime(meetingHour, c.offset)) === 'offhrs').length;
  const nightCount = CITIES.filter(c => getStatus(getLocalTime(meetingHour, c.offset)) === 'night').length;

  const formatHour = (h) => {
    const period = h >= 12 ? 'PM' : 'AM';
    const display = h % 12 === 0 ? 12 : h % 12;
    return `${display}:00 ${period}`;
  };

  return (
    <div style={{ background: 'white', borderRadius: '20px', padding: isMobile ? '20px' : '32px', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ background: 'linear-gradient(135deg, #10b981, #3b82f6)', borderRadius: '10px', padding: '6px 10px', fontSize: '18px', flexShrink: 0 }}>📅</span>
          {headingOverride || 'Global Meeting Planner'}
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>Drag the slider to find the best meeting time for your global team</p>
      </div>

      {/* Slider */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <label style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Meeting time (UTC)</label>
          <div style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '999px', padding: '4px 16px' }}>
            <span style={{ color: 'white', fontWeight: '700', fontSize: '16px' }}>{String(meetingHour).padStart(2,'0')}:00 UTC</span>
          </div>
        </div>
        <div style={{ position: 'relative', padding: '8px 0' }}>
          <input
            type="range"
            min="0"
            max="23"
            value={meetingHour}
            onChange={e => setMeetingHour(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#3b82f6', cursor: 'pointer', height: '6px' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
            {[0,3,6,9,12,15,18,21].map(h => (
              <span key={h} style={{ fontSize: '10px', color: '#94a3b8' }}>{String(h).padStart(2,'0')}h</span>
            ))}
          </div>
        </div>
      </div>

      {/* Score summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '28px' }}>
        {[
          { count: workingCount, label: 'In business hours', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', icon: '✅' },
          { count: offCount, label: 'Off hours / flexible', color: '#d97706', bg: '#fffbeb', border: '#fde68a', icon: '🌅' },
          { count: nightCount, label: 'Asleep / night', color: '#94a3b8', bg: '#1e293b', border: '#334155', icon: '🌙', dark: true },
        ].map(({ count, label, color, bg, border, icon, dark }) => (
          <div key={label} style={{ background: bg, border: `1px solid ${border}`, borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: '800', color: dark ? 'white' : color }}>{count}</div>
            <div style={{ fontSize: '11px', color: dark ? '#64748b' : color, fontWeight: '600', marginTop: '2px' }}>{icon} {label}</div>
          </div>
        ))}
      </div>

      {/* City grid */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '10px' }}>
        {CITIES.map(city => {
          const localH = getLocalTime(meetingHour, city.offset);
          const status = getStatus(localH);
          const s = STATUS_STYLES[status];
          const localM = '00';
          const period = localH >= 12 ? 'PM' : 'AM';
          const displayH = localH % 12 === 0 ? 12 : localH % 12;

          return (
            <div key={city.name} style={{
              background: s.bg, border: `1px solid ${s.border}`, borderRadius: '14px',
              padding: isMobile ? '12px 14px' : '14px 16px',
              display: 'flex', alignItems: 'center', gap: '12px',
            }}>
              <span style={{ fontSize: '24px', lineHeight: 1, flexShrink: 0 }}>{city.flag}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontSize: '20px', fontWeight: '800', color: s.text, lineHeight: 1 }}>
                    {String(displayH).padStart(2,'0')}:{localM}
                  </span>
                  <span style={{ fontSize: '12px', color: s.subtext, fontWeight: '600' }}>{period}</span>
                </div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: s.text, marginTop: '2px' }}>{city.name}</div>
                <div style={{ fontSize: '11px', color: s.subtext }}>{city.tz} · UTC{city.offset >= 0 ? '+' : ''}{city.offset}</div>
              </div>
              <div style={{ background: s.badge, borderRadius: '8px', padding: '4px 8px', fontSize: '10px', fontWeight: '600', color: s.badgeText, flexShrink: 0 }}>
                {s.label}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '20px', padding: '14px 16px', background: '#f8fafc', borderRadius: '12px', borderLeft: '4px solid #10b981', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
        <span style={{ fontSize: '16px' }}>💡</span>
        <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>
          <strong>Best time:</strong> Aim for {workingCount >= 5 ? 'this time — most of your team is in business hours!' : 'a time when more green cards appear. Try sliding to 9-10 AM UTC.'}
        </p>
      </div>
    </div>
  );
}
