const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://timezone-converter.vercel.app';

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
];

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];

  const staticPages = [
    { url: `${SITE_URL}/`, priority: '1.0', changefreq: 'daily' },
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
