export const TIMEZONE_DATA = {
  est: { name: 'EST', fullName: 'Eastern Standard Time', city: 'New York', offset: -5, flag: '🗽', iana: 'America/New_York' },
  pst: { name: 'PST', fullName: 'Pacific Standard Time', city: 'Los Angeles', offset: -8, flag: '🌴', iana: 'America/Los_Angeles' },
  gmt: { name: 'GMT', fullName: 'Greenwich Mean Time', city: 'London', offset: 0, flag: '🇬🇧', iana: 'Europe/London' },
  utc: { name: 'UTC', fullName: 'Coordinated Universal Time', city: 'UTC', offset: 0, flag: '🌐', iana: 'UTC' },
  cet: { name: 'CET', fullName: 'Central European Time', city: 'Paris', offset: 1, flag: '🗼', iana: 'Europe/Paris' },
  gst: { name: 'GST', fullName: 'Gulf Standard Time', city: 'Dubai', offset: 4, flag: '🇦🇪', iana: 'Asia/Dubai' },
  ist: { name: 'IST', fullName: 'India Standard Time', city: 'Mumbai', offset: 5.5, flag: '🇮🇳', iana: 'Asia/Kolkata' },
  sgt: { name: 'SGT', fullName: 'Singapore Time', city: 'Singapore', offset: 8, flag: '🇸🇬', iana: 'Asia/Singapore' },
  jst: { name: 'JST', fullName: 'Japan Standard Time', city: 'Tokyo', offset: 9, flag: '🗾', iana: 'Asia/Tokyo' },
  aest: { name: 'AEST', fullName: 'Australian Eastern Standard Time', city: 'Sydney', offset: 11, flag: '🦘', iana: 'Australia/Sydney' },
};

export const CITY_PAIRS = [
  { slug: 'est-to-pst', from: 'est', to: 'pst', searchVolume: '90k–150k' },
  { slug: 'pst-to-est', from: 'pst', to: 'est', searchVolume: '60k–100k' },
  { slug: 'gmt-to-est', from: 'gmt', to: 'est', searchVolume: '70k–120k' },
  { slug: 'est-to-gmt', from: 'est', to: 'gmt', searchVolume: '40k–80k' },
  { slug: 'utc-to-est', from: 'utc', to: 'est', searchVolume: '50k–100k' },
  { slug: 'est-to-utc', from: 'est', to: 'utc', searchVolume: '30k–60k' },
  { slug: 'ist-to-est', from: 'ist', to: 'est', searchVolume: '50k–90k' },
  { slug: 'est-to-ist', from: 'est', to: 'ist', searchVolume: '50k–90k' },
  { slug: 'utc-to-ist', from: 'utc', to: 'ist', searchVolume: '30k–60k' },
  { slug: 'ist-to-utc', from: 'ist', to: 'utc', searchVolume: '20k–40k' },
  { slug: 'gmt-to-ist', from: 'gmt', to: 'ist', searchVolume: '30k–60k' },
  { slug: 'ist-to-gmt', from: 'ist', to: 'gmt', searchVolume: '20k–40k' },
  { slug: 'pst-to-gmt', from: 'pst', to: 'gmt', searchVolume: '30k–60k' },
  { slug: 'gmt-to-pst', from: 'gmt', to: 'pst', searchVolume: '20k–40k' },
  { slug: 'cet-to-est', from: 'cet', to: 'est', searchVolume: '20k–40k' },
  { slug: 'est-to-cet', from: 'est', to: 'cet', searchVolume: '15k–30k' },
  { slug: 'jst-to-est', from: 'jst', to: 'est', searchVolume: '20k–40k' },
  { slug: 'est-to-jst', from: 'est', to: 'jst', searchVolume: '15k–30k' },
  { slug: 'aest-to-gmt', from: 'aest', to: 'gmt', searchVolume: '15k–25k' },
  { slug: 'gmt-to-aest', from: 'gmt', to: 'aest', searchVolume: '10k–20k' },
];

export function getOffsetDiff(fromKey, toKey) {
  const from = TIMEZONE_DATA[fromKey];
  const to = TIMEZONE_DATA[toKey];
  if (!from || !to) return null;
  const diff = to.offset - from.offset;
  if (diff === 0) return 'same time';
  const absDiff = Math.abs(diff);
  const hours = Math.floor(absDiff);
  const mins = (absDiff % 1) * 60;
  const minsStr = mins ? ` ${mins} minutes` : '';
  return diff > 0
    ? `${hours}${minsStr} hour${hours !== 1 ? 's' : ''} ahead`
    : `${hours}${minsStr} hour${hours !== 1 ? 's' : ''} behind`;
}

export function getReferenceTable(fromKey, toKey) {
  const from = TIMEZONE_DATA[fromKey];
  const to = TIMEZONE_DATA[toKey];
  if (!from || !to) return [];
  const rows = [];
  for (let h = 0; h < 24; h += 3) {
    let toH = (h + (to.offset - from.offset)) % 24;
    if (toH < 0) toH += 24;
    const fromLabel = `${String(h).padStart(2, '0')}:00 ${from.name}`;
    const toLabel = `${String(Math.floor(toH)).padStart(2, '0')}:${toH % 1 ? '30' : '00'} ${to.name}`;
    rows.push({ from: fromLabel, to: toLabel });
  }
  return rows;
}
