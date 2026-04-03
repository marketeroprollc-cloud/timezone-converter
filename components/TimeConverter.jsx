import { useState, useMemo } from 'react';

const TIMEZONES = [
  { name: 'UTC', offset: 'UTC', flag: '🌐' },
  { name: 'New York', offset: 'America/New_York', flag: '🗽' },
  { name: 'Los Angeles', offset: 'America/Los_Angeles', flag: '🌴' },
  { name: 'London', offset: 'Europe/London', flag: '🇬🇧' },
  { name: 'Paris', offset: 'Europe/Paris', flag: '🗼' },
  { name: 'Dubai', offset: 'Asia/Dubai', flag: '🇦🇪' },
  { name: 'India', offset: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Singapore', offset: 'Asia/Singapore', flag: '🇸🇬' },
  { name: 'Sydney', offset: 'Australia/Sydney', flag: '🦘' },
  { name: 'Tokyo', offset: 'Asia/Tokyo', flag: '🗾' },
  { name: 'Hong Kong', offset: 'Asia/Hong_Kong', flag: '🇭🇰' },
  { name: 'São Paulo', offset: 'America/Sao_Paulo', flag: '🇧🇷' },
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

export default function TimeConverter({ headingOverride, defaultFrom, defaultTo } = {}) {
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
            name: tz?.name || zone,
            flag: tz?.flag || '🌐',
            time: `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`,
            date: convertedTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            period: h >= 12 ? 'PM' : 'AM',
            isNight,
            isBusiness,
          };
        } catch { return null; }
      }).filter(Boolean);
    } catch { return []; }
  }, [sourceTime, sourceDate, sourceZone, selectedZones]);

  const handleZoneToggle = (zone) => {
    setSelectedZones(prev =>
      prev.includes(zone) ? prev.filter(z => z !== zone) : [...prev, zone]
    );
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      padding: '32px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
    }}>
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '10px', padding: '6px 10px', fontSize: '18px' }}>⏰</span>
          {headingOverride || 'Time Zone Converter'}
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>Select a time and see it across the world instantly</p>
      </div>

      {/* Inputs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '28px' }}>
        {[
          { label: 'From', content: (
            <select
              value={sourceZone}
              onChange={e => setSourceZone(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', color: '#1e293b', background: 'white', outline: 'none', cursor: 'pointer' }}
            >
              {TIMEZONES.map(tz => (
                <option key={tz.offset} value={tz.offset}>{tz.flag} {tz.name}</option>
              ))}
            </select>
          )},
          { label: 'Date', content: (
            <input
              type="date"
              value={sourceDate}
              onChange={e => setSourceDate(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', color: '#1e293b', outline: 'none', boxSizing: 'border-box' }}
            />
          )},
          { label: 'Time', content: (
            <input
              type="time"
              value={sourceTime}
              onChange={e => setSourceTime(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', color: '#1e293b', outline: 'none', boxSizing: 'border-box' }}
            />
          )},
        ].map(({ label, content }) => (
          <div key={label}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>{label}</label>
            {content}
          </div>
        ))}
      </div>

      {/* Zone selector chips */}
      <div style={{ marginBottom: '28px' }}>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Convert to</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {TIMEZONES.map(tz => {
            const selected = selectedZones.includes(tz.offset);
            return (
              <button
                key={tz.offset}
                onClick={() => handleZoneToggle(tz.offset)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '999px',
                  border: selected ? '2px solid #3b82f6' : '2px solid #e2e8f0',
                  background: selected ? '#eff6ff' : 'white',
                  color: selected ? '#2563eb' : '#64748b',
                  fontSize: '13px',
                  fontWeight: selected ? '600' : '400',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                {tz.flag} {tz.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results */}
      {conversions.length > 0 && (
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Results</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
            {conversions.map(conv => (
              <div
                key={conv.zone}
                style={{
                  padding: '16px',
                  borderRadius: '14px',
                  background: conv.isNight ? '#1e293b' : conv.isBusiness ? '#f0fdf4' : '#fffbeb',
                  border: `1px solid ${conv.isNight ? '#334155' : conv.isBusiness ? '#bbf7d0' : '#fde68a'}`,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span style={{ fontSize: '22px' }}>{conv.flag}</span>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: '600',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    background: conv.isNight ? '#334155' : conv.isBusiness ? '#dcfce7' : '#fef3c7',
                    color: conv.isNight ? '#94a3b8' : conv.isBusiness ? '#16a34a' : '#d97706',
                  }}>
                    {conv.isNight ? '🌙 Night' : conv.isBusiness ? '✅ Work' : '🌅 Off-hrs'}
                  </span>
                </div>
                <div style={{ fontSize: '28px', fontWeight: '800', color: conv.isNight ? 'white' : '#1e293b', lineHeight: 1, marginBottom: '4px' }}>
                  {conv.time}
                </div>
                <div style={{ fontSize: '13px', fontWeight: '500', color: conv.isNight ? '#94a3b8' : '#64748b' }}>
                  {conv.name}
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
