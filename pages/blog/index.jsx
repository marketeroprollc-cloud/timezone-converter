import Head from 'next/head';
import Link from 'next/link';
import { BLOG_POSTS } from '../../lib/blog-posts';
import { BreadcrumbSchema } from '../../components/SchemaMarkup';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://timezone.business';

export default function BlogIndex() {
  return (
    <>
      <Head>
        <title>Time Zone Guides & Remote Work Tips | Time Zone Converter Blog</title>
        <meta name="description" content="Expert guides on time zones, scheduling across time zones, and remote team best practices. EST vs PST, UTC explained, daylight saving time, and more." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/blog`} />
        <meta property="og:title" content="Time Zone Guides & Remote Work Tips" />
        <meta property="og:description" content="Expert guides on time zones, scheduling across time zones, and remote team best practices." />
        <meta property="og:url" content={`${SITE_URL}/blog`} />
        <meta property="og:type" content="website" />
        <BreadcrumbSchema items={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ]} />
      </Head>

      <main style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e3a8a 0%, #312e81 50%, #4c1d95 100%)', paddingBottom: '60px' }}>
        {/* Breadcrumb */}
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px 20px 0', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', textDecoration: 'none' }}>Home</Link>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>›</span>
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px' }}>Blog</span>
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', padding: '48px 20px 36px' }}>
          <h1 style={{ fontSize: '40px', fontWeight: '900', color: 'white', margin: '0 0 14px', lineHeight: 1.2 }}>
            Time Zone Guides & Tips
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', maxWidth: '540px', margin: '0 auto', lineHeight: '1.6' }}>
            Everything you need to know about time zones, scheduling global meetings, and working with remote teams across the world.
          </p>
        </div>

        {/* Posts grid */}
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
          {BLOG_POSTS.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.12)', height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'transform 0.15s' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ background: '#eff6ff', borderRadius: '999px', padding: '4px 12px', color: '#2563eb', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    📖 {post.readTime} read
                  </span>
                </div>
                <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', margin: '0 0 10px', lineHeight: '1.4', flexGrow: 1 }}>
                  {post.title}
                </h2>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {post.intro}
                </p>
                <span style={{ color: '#2563eb', fontSize: '13px', fontWeight: '600' }}>
                  Read guide →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Back link */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
            ← Back to Time Zone Converter
          </Link>
        </div>
      </main>
    </>
  );
}
