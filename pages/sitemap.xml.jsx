const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://timezone.business';

const CITY_PAIR_SLUGS = [
  'est-to-pst', 'pst-to-est', 'gmt-to-est', 'est-to-gmt',
  'utc-to-est', 'est-to-utc', 'ist-to-est', 'est-to-ist',
  'utc-to-ist', 'ist-to-utc', 'gmt-to-ist', 'ist-to-gmt',
  'pst-to-gmt', 'gmt-to-pst', 'cet-to-est', 'est-to-cet',
  'jst-to-est', 'est-to-jst', 'aest-to-gmt', 'gmt-to-aest',
];

const BLOG_SLUGS = [
  'best-time-schedule-meeting-est-pst',
  'how-to-schedule-meeting-across-time-zones',
  'utc-explained',
  'daylight-saving-time-explained',
  'time-zones-united-states',
  'india-time-zone-ist',
  'gmt-vs-utc-difference',
  'new-york-to-london-time-difference',
  'tokyo-to-new-york-time',
  'sydney-to-london-time',
  'time-zone-abbreviations',
  'remote-work-time-zone-tips',
];

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];

  const staticPages = [
    { url: `${SITE_URL}/`, priority: '1.0', changefreq: 'daily' },
    { url: `${SITE_URL}/blog`, priority: '0.8', changefreq: 'weekly' },
    { url: `${SITE_URL}/privacy`, priority: '0.3', changefreq: 'yearly' },
  ];

  const cityPairPages = CITY_PAIR_SLUGS.map(slug => ({
    url: `${SITE_URL}/convert/${slug}`,
    priority: '0.8',
    changefreq: 'monthly',
  }));

  const blogPages = BLOG_SLUGS.map(slug => ({
    url: `${SITE_URL}/blog/${slug}`,
    priority: '0.7',
    changefreq: 'monthly',
  }));

  const allPages = [...staticPages, ...cityPairPages, ...blogPages];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
}

export default function Sitemap() {
  return null;
}

export async function getServerSideProps({ res }) {
  const sitemap = generateSitemap();
  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(sitemap);
  res.end();
  return { props: {} };
}
