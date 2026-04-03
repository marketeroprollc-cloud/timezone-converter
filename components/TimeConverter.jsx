import { useState, useMemo, useRef, useEffect, useCallback } from 'react';

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

const TIMEZONES = [
  { abbr: 'UTC',  name: 'UTC',           city: 'Universal Time',  offset: 'UTC',                    flag: '🌐' },
  { abbr: 'EST',  name: 'Eastern',       city: 'New York',        offset: 'America/New_York',       flag: '🗽' },
  { abbr: 'PST',  name: 'Pacific',       city: 'Los Angeles',     offset: 'America/Los_Angeles',    flag: '🌴' },
  { abbr: 'GMT',  name: 'Greenwich',     city: 'London',          offset: 'Europe/London',          flag: '🇬🇧' },
  { abbr: 'CET',  name: 'Central Euro',  city: 'Paris',           offset: 'Europe/Paris',           flag: '🗼' },
  { abbr: 'GST',  name: 'Gulf',          city: 'Dubai',           offset: 'Asia/Dubai',             flag: '🇦🇪' },
  { abbr: 'IST',  name: 'India',         city: 'Mumbai / Delhi',  offset: 'Asia/Kolkata',           flag: '🇮🇳' },
  { abbr: 'SGT',  name: 'Singapore',     city: 'Singapore',       offset: 'Asia/Singapore',         flag: '🇸🇬' },
  { abbr: 'AEDT', name: 'Australia E.',  city: 'Sydney',          offset: 'Australia/Sydney',       flag: '🦘' },
  { abbr: 'JST',  name: 'Japan',         city: 'Tokyo',           offset: 'Asia/Tokyo',             flag: '🗾' },
  { abbr: 'HKT',  name: 'Hong Kong',     city: 'Hong Kong',       offset: 'Asia/Hong_Kong',         flag: '🇭🇰' },
  { abbr: 'BRT',  name: 'Brasilia',      city: 'São Paulo',       offset: 'America/Sao_Paulo',      flag: '🇧🇷' },
];

const OFFSETS = {
  'UTC': 0,
  'America/New_York': -5 * 60,
  'America/Los_Angeles': -8 * 60,
  'Europe/London': 0,
  'Europe/Paris': 1 * 60,
  'Asia/Dubai': 4 * 60,
  'Asia/Kolkata': 5.5 * 60,
  'Asia/Singapore': 8 * 60,
  'Australia/Sydney': 11 * 60,
  'Asia/Tokyo': 9 * 60,
  'Asia/Hong_Kong': 8 * 60,
  'America/Sao_Paulo': -3 * 60,
};

function MultiSelectDropdown({ selected, onChange, isMobile }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggle = (offset) => {
    if (selected.includes(offset)) {
      if (selected.length === 1) return; // keep at least one
      onChange(selected.filter(z => z !== offset));
    } else {
      onChange([...selected, offset]);
    }
  };

  const label = (() => {
    const abbrs = selected.map(o => TIMEZONES.find(t => t.offset === o)?.abbr).filter(Boolean);
    if (abbrs.length === 0) return 'Select time zones…';
    if (abbrs.length <= 3) return abbrs.join(', ');
    return `${abbrs.slice(0, 3).join(', ')} +${abbrs.length - 3} more`;
  })();

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%' }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          padding: '10px 36px 10px 12px',
          border: '2px solid #e2e8f0',
          borderRadius: '10px',
          fontSize: '14px',
          color: '#1e293b',
          background: 'white',
          cursor: 'pointer',
          textAlign: 'left',
          position: 'relative',
          outline: 'none',
          fontWeight: '500',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {label}
        <span style={{ position: 'absolute', right: '12px', top: '50%', transform: `translateY(-50%) rotate(${open ? 180 : 0}deg)`, transition: 'transform 0.2s', color: '#94a3b8', fontSize: '12px' }}>▼</span>
      </button>

      {open && (
        <div style={isMobile ? {
          position: 'fixed', left: '12px', right: '12px', bottom: '12px',
          background: 'white', border: '2px solid #e2e8f0', borderRadius: '16px',
          boxShadow: '0 -4px 30px rgba(0,0,0,0.15)', zIndex: 200,
          maxHeight: '60vh', overflowY: 'auto',
        } : {
          position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, minWidth: '240px',
          background: 'white', border: '2px solid #e2e8f0', borderRadius: '12px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)', zIndex: 100,
          maxHeight: '280px', overflowY: 'auto',
        }}>
          {TIMEZONES.map(tz => {
            const isSelected = selected.includes(tz.offset);
            return (
              <div
                key={tz.offset}
                onClick={() => toggle(tz.offset)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  cursor: 'pointer',
                  background: isSelected ? '#eff6ff' : 'white',
                  borderBottom: '1px solid #f1f5f9',
                  transition: 'background 0.1s',
                }}
              >
                <div style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '4px',
                  border: isSelected ? '2px solid #3b82f6' : '2px solid #cbd5e1',
                  background: isSelected ? '#3b82f6' : 'white',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  color: 'white',
                  fontWeight: '700',
                }}>
                  {isSelected ? '✓' : ''}
                </div>
                <span style={{ fontSize: '16px' }}>{tz.flag}</span>
                <span style={{ fontWeight: '700', color: '#1e293b', fontSize: '14px', minWidth: '38px' }}>{tz.abbr}</span>
                <span style={{ color: '#64748b', fontSize: '13px' }}>{tz.city}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function TimeConverter({ headingOverride } = {}) {
  const isMobile = useIsMobile();
  const [sourceTime, setSourceTime] = useState('12:00');
  const [sourceDate, setSourceDate] = useState(new Date().toISOString().split('T')[0]);
  const [sourceZone, setSourceZone] = useState('UTC');
  const [selectedZones, setSelectedZones] = useState(['America/New_York', 'Europe/London', 'Asia/Tokyo']);

  const conversions = useMemo(() => {
    try {
      const sourceDateTime = new Date(`${sourceDate}T${sourceTime}:00`);
      return selectedZones.map(zone => {
        try {
          const offsetMinutes = OFFSETS[zone] - OFFSETS[sourceZone];
          const convertedTime = new Date(sourceDateTime.getTime() + offsetMinutes * 60000);
          const h = convertedTime.getHours();
          const m = convertedTime.getMinutes();
          const isNight = h >= 22 || h < 7;
          const isBusiness = h >= 9 && h < 18;
          const tz = TIMEZONES.find(t => t.offset === zone);
          return {
            zone,
            abbr: tz?.abbr || zone,
            city: tz?.city || zone,
            flag: tz?.flag || '🌐',
            time: `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`,
            date: convertedTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            isNight,
            isBusiness,
          };
        } catch { return null; }
      }).filter(Boolean);
    } catch { return []; }
  }, [sourceTime, sourceDate, sourceZone, selectedZones]);

  return (
    <div style={{ background: 'white', borderRadius: '20px', padding: 'clamp(20px, 4vw, 32px)', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '10px', padding: '6px 10px', fontSize: '18px' }}>⏰</span>
          {headingOverride || 'Time Zone Converter'}
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>Select a time and see it across the world instantly</p>
      </div>

      {/* Inputs row */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr 1fr', gap: isMobile ? '12px' : '16px', marginBottom: '28px' }}>
        {/* From */}
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>From</label>
          <select
            value={sourceZone}
            onChange={e => setSourceZone(e.target.value)}
            style={{ width: '100%', padding: '10px 12px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', color: '#1e293b', background: 'white', outline: 'none', cursor: 'pointer', fontWeight: '500' }}
          >
            {TIMEZONES.map(tz => (
              <option key={tz.offset} value={tz.offset}>{tz.flag} {tz.abbr} ({tz.city})</option>
            ))}
          </select>
        </div>

        {/* Convert to */}
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Convert to</label>
          <MultiSelectDropdown selected={selectedZones} onChange={setSelectedZones} isMobile={isMobile} />
        </div>

        {/* Date */}
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Date</label>
          <input
            type="date"
            value={sourceDate}
            onChange={e => setSourceDate(e.target.value)}
            style={{ width: '100%', padding: '10px 12px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', color: '#1e293b', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        {/* Time */}
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Time</label>
          <input
            type="time"
            value={sourceTime}
            onChange={e => setSourceTime(e.target.value)}
            style={{ width: '100%', padding: '10px 12px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', color: '#1e293b', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
      </div>

      {/* Results */}
      {conversions.length > 0 && (
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Results</label>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px' }}>
            {conversions.map(conv => (
              <div
                key={conv.zone}
                style={{
                  padding: '16px',
                  borderRadius: '14px',
                  background: conv.isNight ? '#1e293b' : conv.isBusiness ? '#f0fdf4' : '#fffbeb',
                  border: `1px solid ${conv.isNight ? '#334155' : conv.isBusiness ? '#bbf7d0' : '#fde68a'}`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span style={{ fontSize: '20px' }}>{conv.flag}</span>
                  <span style={{
                    fontSize: '10px', fontWeight: '600', padding: '2px 8px', borderRadius: '999px',
                    background: conv.isNight ? '#334155' : conv.isBusiness ? '#dcfce7' : '#fef3c7',
                    color: conv.isNight ? '#94a3b8' : conv.isBusiness ? '#16a34a' : '#d97706',
                  }}>
                    {conv.isNight ? '🌙 Night' : conv.isBusiness ? '✅ Work' : '🌅 Off-hrs'}
                  </span>
                </div>
                <div style={{ fontSize: '28px', fontWeight: '800', color: conv.isNight ? 'white' : '#1e293b', lineHeight: 1, marginBottom: '4px' }}>
                  {conv.time}
                </div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: conv.isNight ? '#e2e8f0' : '#1e293b' }}>
                  {conv.abbr}
                </div>
                <div style={{ fontSize: '12px', color: conv.isNight ? '#94a3b8' : '#64748b', marginTop: '2px' }}>
                  {conv.city}
                </div>
                <div style={{ fontSize: '11px', color: conv.isNight ? '#64748b' : '#94a3b8', marginTop: '2px' }}>
                  {conv.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: '20px', padding: '14px 16px', background: '#f8fafc', borderRadius: '12px', borderLeft: '4px solid #3b82f6', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
        <span style={{ fontSize: '16px' }}>💡</span>
        <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>
          <strong>Pro Tip:</strong> Green cards = business hours. Dark cards = night time. Avoid scheduling meetings during night hours!
        </p>
      </div>
    </div>
  );
}
