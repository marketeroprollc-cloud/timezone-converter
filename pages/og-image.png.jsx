// Dynamic OG image served as SVG via redirect
export default function OgImage() {
  return null;
}

export async function getServerSideProps({ res }) {
  const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e3a8a"/>
      <stop offset="50%" style="stop-color:#312e81"/>
      <stop offset="100%" style="stop-color:#4c1d95"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <!-- Globe icon circle -->
  <circle cx="600" cy="200" r="80" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
  <text x="600" y="220" font-family="system-ui,sans-serif" font-size="80" text-anchor="middle" fill="white">🌍</text>
  <!-- Title -->
  <text x="600" y="350" font-family="system-ui,-apple-system,sans-serif" font-size="52" font-weight="900" text-anchor="middle" fill="white">Free Time Zone Converter</text>
  <text x="600" y="415" font-family="system-ui,-apple-system,sans-serif" font-size="40" font-weight="700" text-anchor="middle" fill="rgba(255,255,255,0.85)">&amp; Global Meeting Planner</text>
  <!-- Subtitle -->
  <text x="600" y="490" font-family="system-ui,-apple-system,sans-serif" font-size="24" text-anchor="middle" fill="rgba(255,255,255,0.65)">Convert time zones instantly · Find meeting overlap · 100% free</text>
  <!-- Domain -->
  <rect x="450" y="530" width="300" height="48" rx="24" fill="rgba(255,255,255,0.15)"/>
  <text x="600" y="562" font-family="system-ui,-apple-system,sans-serif" font-size="20" font-weight="600" text-anchor="middle" fill="rgba(255,255,255,0.9)">timezone.business</text>
</svg>`;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.write(svg);
  res.end();
  return { props: {} };
}
