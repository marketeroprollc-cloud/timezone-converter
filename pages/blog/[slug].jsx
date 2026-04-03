import Head from 'next/head';
import Link from 'next/link';
import { BLOG_POSTS, getBlogPost } from '../../lib/blog-posts';
import { FAQSchema, BreadcrumbSchema } from '../../components/SchemaMarkup';
import { CITY_PAIRS, TIMEZONE_DATA } from '../../lib/timezone-pairs';
import AdSense from '../../components/AdSense';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://timezone.business';

export async function getStaticPaths() {
  return {
    paths: BLOG_POSTS.map(p => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = getBlogPost(params.slug);
  if (!post) return { notFound: true };
  return { props: { post } };
}

export default function BlogPost({ post }) {
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    author: { '@type': 'Organization', name: 'Time Zone Converter', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'Time Zone Converter', url: SITE_URL },
  };

  return (
    <>
      <Head>
        <title>{post.metaTitle}</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/blog/${post.slug}`} />
        <meta property="og:title" content={post.metaTitle} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:url" content={`${SITE_URL}/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <FAQSchema faqs={post.faqs} />
        <BreadcrumbSchema items={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ]} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
        />
      </Head>

      <main style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e3a8a 0%, #312e81 50%, #4c1d95 100%)', paddingBottom: '60px' }}>
        {/* Breadcrumb */}
        <div style={{ maxWidth: '780px', margin: '0 auto', padding: '20px 20px 0', display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', textDecoration: 'none' }}>Home</Link>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>›</span>
          <Link href="/blog" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', textDecoration: 'none' }}>Blog</Link>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>›</span>
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px' }}>{post.title}</span>
        </div>

        {/* Article header */}
        <div style={{ textAlign: 'center', padding: '40px 20px 32px' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', padding: '6px 16px', marginBottom: '20px', border: '1px solid rgba(255,255,255,0.2)' }}>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              📖 {post.readTime} read · {new Date(post.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: '900', color: 'white', margin: '0 auto 16px', lineHeight: 1.2, maxWidth: '700px' }}>
            {post.title}
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', maxWidth: '560px', margin: '0 auto', lineHeight: '1.6' }}>
            {post.intro}
          </p>
        </div>

        <div style={{ maxWidth: '780px', margin: '0 auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Article body */}
          <article style={{ background: 'white', borderRadius: '20px', padding: '40px', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
            {post.sections.map((section, i) => (
              <section key={i} style={{ marginBottom: i < post.sections.length - 1 ? '32px' : 0 }}>
                <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', margin: '0 0 12px', paddingBottom: '8px', borderBottom: '2px solid #f1f5f9' }}>
                  {section.h2}
                </h2>
                <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.75', margin: 0 }}>
                  {section.content}
                </p>
              </section>
            ))}
          </article>

          {/* CTA — tool link, always visible, high SEO value */}
          <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #4c1d95)', borderRadius: '20px', padding: '28px 32px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '24px' }}>⏰</span>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'white', margin: 0 }}>
                Try the Free Time Zone Converter
              </h2>
            </div>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: '1.6' }}>
              Convert time zones instantly and find the best meeting time for your global team — no signup required.
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Link href="/" style={{ display: 'inline-block', background: 'white', color: '#1e3a8a', fontWeight: '700', fontSize: '14px', padding: '10px 22px', borderRadius: '10px', textDecoration: 'none' }}>
                Open Time Zone Converter →
              </Link>
              <Link href="/#meeting-planner" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', color: 'white', fontWeight: '600', fontSize: '14px', padding: '10px 22px', borderRadius: '10px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)' }}>
                Meeting Planner
              </Link>
            </div>
          </div>

          {/* Ad slot — between article and FAQ (high visibility) */}
          <AdSense slot="horizontal" />

          {/* FAQ section */}
          <div style={{ background: 'white', borderRadius: '20px', padding: '32px', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', margin: '0 0 20px' }}>❓ Common Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {post.faqs.map((faq, i) => (
                <div key={i} style={{ borderLeft: '3px solid #3b82f6', paddingLeft: '16px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', margin: '0 0 6px' }}>{faq.q}</h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: '1.6' }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related tools */}
          {post.relatedLinks && post.relatedLinks.length > 0 && (
            <div style={{ background: 'white', borderRadius: '20px', padding: '28px', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', margin: '0 0 16px' }}>🔗 Related Converters</h2>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {post.relatedLinks.map(({ label, slug }) => (
                  <Link key={slug} href={`/convert/${slug}`} style={{ padding: '8px 16px', background: '#eff6ff', borderRadius: '999px', border: '1px solid #bfdbfe', color: '#2563eb', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}>
                    {label}
                  </Link>
                ))}
                <Link href="/" style={{ padding: '8px 16px', background: '#1e3a8a', borderRadius: '999px', color: 'white', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}>
                  🌍 Full Time Zone Converter →
                </Link>
              </div>
            </div>
          )}

          {/* Ad slot — bottom of page */}
          <AdSense slot="horizontal" />

          {/* Back */}
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
              ← Back to Time Zone Converter
            </Link>
            <Link href="/privacy" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>Privacy Policy</Link>
            <Link href="/cookies" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>Cookie Policy</Link>
            <Link href="/legal" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>Legal Notice</Link>
          </div>
        </div>
      </main>
    </>
  );
}
