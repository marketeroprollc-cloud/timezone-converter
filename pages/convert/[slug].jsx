import Head from 'next/head';
import Link from 'next/link';
import { CITY_PAIRS, TIMEZONE_DATA, getOffsetDiff, getReferenceTable } from '../../lib/timezone-pairs';
import { WebAppSchema, FAQSchema, BreadcrumbSchema } from '../../components/SchemaMarkup';
import AdSense from '../../components/AdSense';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://timezone.business';

// Map timezone keys → relevant blog posts
const BLOG_BY_TZ = {
  est: [
    { label: 'Best Time to Schedule EST ↔ PST Meetings', slug: 'best-time-schedule-meeting-est-pst' },
    { label: 'How to Schedule Meetings Across Time Zones', slug: 'how-to-schedule-meeting-across-time-zones' },
    { label: 'US Time Zones Explained', slug: 'time-zones-united-states' },
  ],
  pst: [
    { label: 'Best Time to Schedule EST ↔ PST Meetings', slug: 'best-time-schedule-meeting-est-pst' },
    { label: 'How to Schedule Meetings Across Time Zones', slug: 'how-to-schedule-meeting-across-time-zones' },
    { label: 'US Time Zones Explained', slug: 'time-zones-united-states' },
  ],
  gmt: [
    { label: 'GMT vs UTC — What Is the Difference?', slug: 'gmt-vs-utc-difference' },
    { label: 'New York to London Time Difference', slug: 'new-york-to-london-time-difference' },
    { label: 'How to Schedule Meetings Across Time Zones', slug: 'how-to-schedule-meeting-across-time-zones' },
  ],
  utc: [
    { label: 'UTC Explained: What Is UTC Offset?', slug: 'utc-explained' },
    { label: 'GMT vs UTC — What Is the Difference?', slug: 'gmt-vs-utc-difference' },
    { label: 'How to Schedule Meetings Across Time Zones', slug: 'how-to-schedule-meeting-across-time-zones' },
  ],
  ist: [
    { label: 'India Time Zone (IST) Guide', slug: 'india-time-zone-ist' },
    { label: 'How to Schedule Meetings Across Time Zones', slug: 'how-to-schedule-meeting-across-time-zones' },
    { label: 'Remote Work Time Zone Tips', slug: 'remote-work-time-zone-tips' },
  ],
  cet: [
    { label: 'How to Schedule Meetings Across Time Zones', slug: 'how-to-schedule-meeting-across-time-zones' },
    { label: 'Daylight Saving Time Explained', slug: 'daylight-saving-time-explained' },
    { label: 'Remote Work Time Zone Tips', slug: 'remote-work-time-zone-tips' },
  ],
  jst: [
    { label: 'Tokyo to New York Time Difference', slug: 'tokyo-to-new-york-time' },
    { label: 'How to Schedule Meetings Across Time Zones', slug: 'how-to-schedule-meeting-across-time-zones' },
    { label: 'Remote Work Time Zone Tips', slug: 'remote-work-time-zone-tips' },
  ],
  aest: [
    { label: 'Sydney to London Time Difference', slug: 'sydney-to-london-time' },
    { label: 'How to Schedule Meetings Across Time Zones', slug: 'how-to-schedule-meeting-across-time-zones' },
    { label: 'Remote Work Time Zone Tips', slug: 'remote-work-time-zone-tips' },
  ],
};

function getRelevantBlogPosts(fromKey, toKey) {
  const seen = new Set();
  const posts = [];
  for (const key of [fromKey, toKey]) {
    for (const post of (BLOG_BY_TZ[key] || [])) {
      if (!seen.has(post.slug)) {
        seen.add(post.slug);
        posts.push(post);
      }
    }
  }
  return posts.slice(0, 4);
}

export async function getStaticPaths() {
  return {
    paths: CITY_PAIRS.map(p => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const pair = CITY_PAIRS.find(p => p.slug === params.slug);
  if (!pair) return { notFound: true };
  const from = TIMEZONE_DATA[pair.from];
  const to = TIMEZONE_DATA[pair.to];
  const table = getReferenceTable(pair.from, pair.to);
  const offsetDiff = getOffsetDiff(pair.from, pair.to);
  return { props: { pair, from, to, table, offsetDiff } };
}

export default function ConvertPage({ pair, from, to, table, offsetDiff }) {
  const title = `${from.name} to ${to.name} Converter — Free Time Zone Tool`;
  const description = `Convert ${from.name} (${from.fullName}, ${from.city}) to ${to.name} (${to.fullName}, ${to.city}). ${to.city} is ${offsetDiff} compared to ${from.city}. Free, instant, no signup.`;

  const faqs = [
    { q: `What is the time difference between ${from.name} and ${to.name}?`, a: `${to.city} (${to.name}) is ${offsetDiff} compared to ${from.city} (${from.name}). The offset is ${to.offset - from.offset >= 0 ? '+' : ''}${to.offset - from.offset} hours.` },
    { q: `When it is 9 AM ${from.name}, what time is it in ${to.name}?`, a: (() => { let h = (9 + (to.offset - from.offset)) % 24; if (h < 0) h += 24; return `When it is 9:00 AM ${from.name}, it is ${String(Math.floor(h)).padStart(2,'0')}:${h % 1 ? '30' : '00'} ${to.name}.`; })() },
    { q: `Does ${from.name} observe daylight saving time?`, a: `${['est','pst','cet'].includes(pair.from) ? `${from.fullName} (${from.name}) observes daylight saving time. During DST, the offset shifts by 1 hour. Always double-check during spring and fall clock changes.` : `${from.fullName} (${from.name}) does not observe daylight saving time and maintains a fixed UTC offset year-round.`}` },
    { q: `What countries use ${to.name}?`, a: `${to.name} (${to.fullName}) is used in ${to.city} and surrounding regions. Check your device's timezone settings for your exact offset.` },
  ];

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/convert/${pair.slug}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${SITE_URL}/convert/${pair.slug}`} />
        <meta property="og:type" content="website" />
        <WebAppSchema />
        <FAQSchema faqs={faqs} />
        <BreadcrumbSchema items={[
          { name: 'Home', path: '/' },
          { name: `${from.name} to ${to.name}`, path: `/convert/${pair.slug}` },
        ]} />
      </Head>

      <main style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e3a8a 0%, #312e81 50%, #4c1d95 100%)', paddingBottom: '60px' }}>
        {/* Breadcrumb */}
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '20px 20px 0', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', textDecoration: 'none' }}>Home</Link>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>›</span>
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px' }}>{from.name} to {to.name}</span>
        </div>

        {/* Hero */}
        <div style={{ textAlign: 'center', padding: '40px 20px 36px' }}>
          <div style={{ display: 'inline-flex', gap: '16px', alignItems: 'center', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', padding: '10px 24px', marginBottom: '24px', border: '1px solid rgba(255,255,255,0.2)' }}>
            <span style={{ fontSize: '22px' }}>{from.flag}</span>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px' }}>→</span>
            <span style={{ fontSize: '22px' }}>{to.flag}</span>
          </div>
          <h1 style={{ fontSize: '42px', fontWeight: '900', color: 'white', margin: '0 0 12px', lineHeight: 1.15 }}>
            {from.name} to {to.name} Converter
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', maxWidth: '500px', margin: '0 auto 16px', lineHeight: '1.6' }}>
            {from.city} ({from.fullName}) to {to.city} ({to.fullName})
          </p>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.12)', borderRadius: '12px', padding: '10px 24px', border: '1px solid rgba(255,255,255,0.2)' }}>
            <span style={{ color: 'white', fontWeight: '700', fontSize: '15px' }}>
              {to.city} is <span style={{ color: '#60a5fa' }}>{offsetDiff}</span> vs {from.city}
            </span>
          </div>
        </div>

        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Quick reference table */}
          <div style={{ background: 'white', borderRadius: '20px', padding: '32px', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', margin: '0 0 20px' }}>
              ⚡ Quick Reference Table
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ background: '#3b82f6', color: 'white', padding: '12px 16px', textAlign: 'left', fontWeight: '700', fontSize: '14px', borderRadius: '8px 0 0 0' }}>
                      {from.flag} {from.name} ({from.city})
                    </th>
                    <th style={{ background: '#8b5cf6', color: 'white', padding: '12px 16px', textAlign: 'left', fontWeight: '700', fontSize: '14px', borderRadius: '0 8px 0 0' }}>
                      {to.flag} {to.name} ({to.city})
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {table.map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? '#f8fafc' : 'white' }}>
                      <td style={{ padding: '10px 16px', fontSize: '14px', fontWeight: '600', color: '#1e293b', borderBottom: '1px solid #f1f5f9' }}>{row.from}</td>
                      <td style={{ padding: '10px 16px', fontSize: '14px', fontWeight: '600', color: '#1e293b', borderBottom: '1px solid #f1f5f9' }}>{row.to}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Ad slot — between table and FAQ */}
          <AdSense slot="horizontal" />

          {/* FAQ */}
          <div style={{ background: 'white', borderRadius: '20px', padding: '32px', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', margin: '0 0 20px' }}>
              ❓ {from.name} to {to.name} — Common Questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{ borderLeft: '3px solid #3b82f6', paddingLeft: '16px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', margin: '0 0 6px' }}>{faq.q}</h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: '1.6' }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA — link to homepage tool */}
          <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #4c1d95)', borderRadius: '20px', padding: '28px 32px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '24px' }}>⏰</span>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'white', margin: 0 }}>
                Try the Free Time Zone Converter
              </h2>
            </div>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: '1.6' }}>
              Convert any time zone instantly and plan global meetings with our free tool — no signup required.
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Link href="/" style={{ display: 'inline-block', background: 'white', color: '#1e3a8a', fontWeight: '700', fontSize: '14px', padding: '10px 22px', borderRadius: '10px', textDecoration: 'none' }}>
                Open Time Zone Converter →
              </Link>
              <Link href="/" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', color: 'white', fontWeight: '600', fontSize: '14px', padding: '10px 22px', borderRadius: '10px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)' }}>
                Meeting Planner
              </Link>
            </div>
          </div>

          {/* Blog guides — contextual internal links */}
          {(() => {
            const posts = getRelevantBlogPosts(pair.from, pair.to);
            if (!posts.length) return null;
            return (
              <div style={{ background: 'white', borderRadius: '20px', padding: '28px 32px', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', margin: '0 0 16px' }}>📖 Related Guides</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {posts.map(post => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', color: '#1e293b', fontSize: '14px', fontWeight: '600', textDecoration: 'none' }}>
                      <span style={{ color: '#3b82f6', fontSize: '16px' }}>→</span>
                      {post.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Related conversions */}
          <div style={{ background: 'white', borderRadius: '20px', padding: '32px', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', margin: '0 0 16px' }}>
              🔗 Related Conversions
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
              {CITY_PAIRS.filter(p => p.slug !== pair.slug && (p.from === pair.from || p.to === pair.to || p.from === pair.to || p.to === pair.from)).slice(0, 8).map(p => {
                const f = TIMEZONE_DATA[p.from];
                const t = TIMEZONE_DATA[p.to];
                return (
                  <Link key={p.slug} href={`/convert/${p.slug}`} style={{ display: 'block', padding: '10px 14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', color: '#3b82f6', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}>
                    {f.flag} {f.name} → {t.flag} {t.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Ad slot — bottom */}
          <AdSense slot="horizontal" />

          {/* Back link */}
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
              ← Back to Time Zone Converter
            </Link>
            <Link href="/privacy" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>Privacy Policy</Link>
          </div>
        </div>
      </main>
    </>
  );
}
