import Head from 'next/head';
import { useState } from 'react';
import TimeConverter from '../components/TimeConverter';
import MeetingPlanner from '../components/MeetingPlanner';
import { WebAppSchema, FAQSchema, BreadcrumbSchema } from '../components/SchemaMarkup';
import AdSense from '../components/AdSense';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://timezone.business';

const faqs = [
  { q: 'What is the best time to schedule a global meeting?', a: 'Look for times when most team members are within business hours (9 AM to 6 PM). For very distributed teams, early morning or late afternoon often works best to minimize night-time calls. Use the Meeting Planner above to find the optimal overlap.' },
  { q: 'How do I handle daylight saving time?', a: 'This converter uses standard timezone offsets. During daylight saving time transitions, times may shift by 1 hour. Always double-check during spring and fall transitions, especially for meetings between the US and Europe.' },
  { q: 'Can I share meeting times with my team?', a: "Copy the URL from your browser and share it with your team. They'll see the same conversions based on the time and zones you selected." },
  { q: 'Is this time zone converter free?', a: 'Yes! This time zone converter and meeting planner is completely free to use. No registration, no hidden fees, no limits. Use it as often as you need.' },
  { q: 'What time zones are supported?', a: 'We support all major time zones including UTC, EST (New York), PST (Los Angeles), GMT (London), CET (Paris), GST (Dubai), IST (India), SGT (Singapore), AEDT (Sydney), JST (Tokyo), HKT (Hong Kong), and BRT (São Paulo).' },
  { q: 'How do remote teams coordinate across time zones?', a: 'Use our Meeting Planner to find overlap hours where most team members are in business hours. Common strategies include rotating meeting times fairly, using async communication for non-urgent updates, and scheduling during the overlapping business hours window.' },
];

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ background: 'white', borderRadius: '20px', padding: '32px', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
      <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', margin: '0 0 24px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)', borderRadius: '10px', padding: '6px 10px', fontSize: '18px' }}>❓</span>
        Frequently Asked Questions
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {faqs.map((faq, i) => (
          <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{ width: '100%', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: open === i ? '#f8fafc' : 'white', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '12px' }}
            >
              <span style={{ fontWeight: '600', color: '#1e293b', fontSize: '15px' }}>{faq.q}</span>
              <span style={{ fontSize: '20px', color: '#94a3b8', flexShrink: 0, transition: 'transform 0.2s', display: 'inline-block', transform: open === i ? 'rotate(45deg)' : 'none' }}>+</span>
            </button>
            {open === i && (
              <div style={{ padding: '0 20px 16px', color: '#64748b', fontSize: '14px', lineHeight: '1.7', borderTop: '1px solid #f1f5f9' }}>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Time Zone Converter &amp; Meeting Planner — Free Online Tool</title>
        <meta name="description" content="Convert time zones instantly and plan global meetings. See business hours across 12+ cities, find the best overlap time for your remote team. 100% free, no signup." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="time zone converter, meeting planner time zones, schedule meeting across time zones, world clock, timezone calculator, EST to PST, GMT to EST, remote teams" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/`} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:title" content="Time Zone Converter &amp; Meeting Planner — Free Online Tool" />
        <meta property="og:description" content="Convert time zones instantly. Plan global meetings, see business hours across 12+ cities, find the best overlap time for your remote team. Free forever." />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Time Zone Converter" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Time Zone Converter &amp; Meeting Planner — Free" />
        <meta name="twitter:description" content="Convert time zones instantly and plan global meetings across 12+ cities. Free, no signup." />
        <meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />

        {/* Schema Markup */}
        <WebAppSchema />
        <FAQSchema faqs={faqs} />
        <BreadcrumbSchema items={[{ name: 'Home', path: '/' }]} />
      </Head>

      <main style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e3a8a 0%, #312e81 50%, #4c1d95 100%)', paddingBottom: '60px' }}>

        {/* Hero */}
        <div style={{ textAlign: 'center', padding: '60px 20px 40px' }}>
          <div style={{ display: 'inline-flex', gap: '24px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: '999px', padding: '10px 28px', marginBottom: '32px', border: '1px solid rgba(255,255,255,0.2)' }}>
            {['🗽 NY', '🇬🇧 LDN', '🇮🇳 IST', '🗾 TKY'].map(city => (
              <span key={city} style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', fontWeight: '500' }}>{city}</span>
            ))}
          </div>

          <h1 style={{ fontSize: '52px', fontWeight: '900', color: 'white', margin: '0 0 16px', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            🌍 Free Time Zone Converter<br />
            <span style={{ background: 'linear-gradient(90deg, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>&amp; Meeting Planner</span>
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.75)', maxWidth: '560px', margin: '0 auto 40px', lineHeight: '1.6' }}>
            The free time zone converter built for remote teams. Find the perfect meeting time across 12+ cities — no signup required.
          </p>

          <div style={{ display: 'inline-flex', gap: '40px', background: 'rgba(255,255,255,0.08)', borderRadius: '16px', padding: '16px 32px', border: '1px solid rgba(255,255,255,0.12)' }}>
            {[
              { n: '12+', label: 'Time Zones' },
              { n: '100%', label: 'Free' },
              { n: '24/7', label: 'Available' },
            ].map(({ n, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '22px', fontWeight: '800', color: 'white' }}>{n}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', fontWeight: '500' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* TimeConverter with SEO-optimized heading */}
          <section aria-label="Time Zone Converter Tool">
            <TimeConverter headingOverride="Convert Time Zones Instantly" />
          </section>

          {/* Ad slot — between converter and meeting planner */}
          <AdSense slot="horizontal" />

          {/* MeetingPlanner with SEO-optimized heading */}
          <section aria-label="Global Meeting Planner">
            <MeetingPlanner headingOverride="Find the Best Meeting Time Across Time Zones" />
          </section>

          {/* Popular conversions — internal links for SEO */}
          <div style={{ background: 'white', borderRadius: '20px', padding: '32px', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '10px', padding: '6px 10px', fontSize: '18px' }}>🔗</span>
              Popular Time Zone Conversions
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
              {[
                { label: 'EST to PST Converter', slug: 'est-to-pst' },
                { label: 'GMT to EST Converter', slug: 'gmt-to-est' },
                { label: 'UTC to EST Converter', slug: 'utc-to-est' },
                { label: 'IST to EST Converter', slug: 'ist-to-est' },
                { label: 'EST to IST Converter', slug: 'est-to-ist' },
                { label: 'PST to GMT Converter', slug: 'pst-to-gmt' },
                { label: 'CET to EST Converter', slug: 'cet-to-est' },
                { label: 'JST to EST Converter', slug: 'jst-to-est' },
              ].map(({ label, slug }) => (
                <a
                  key={slug}
                  href={`/convert/${slug}`}
                  style={{ display: 'block', padding: '10px 14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', color: '#3b82f6', fontSize: '13px', fontWeight: '600', textDecoration: 'none', transition: 'all 0.15s' }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Blog section — internal links for SEO authority */}
          <div style={{ background: 'white', borderRadius: '20px', padding: '32px', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ background: 'linear-gradient(135deg, #10b981, #3b82f6)', borderRadius: '10px', padding: '6px 10px', fontSize: '18px' }}>📝</span>
              Time Zone Guides &amp; Tips
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px', marginBottom: '16px' }}>
              {[
                { label: 'Best Time to Schedule EST ↔ PST Meetings', slug: 'best-time-schedule-meeting-est-pst' },
                { label: 'How to Schedule Meetings Across Time Zones', slug: 'how-to-schedule-meeting-across-time-zones' },
                { label: 'UTC Explained: What Is UTC Offset?', slug: 'utc-explained' },
                { label: 'Daylight Saving Time Explained', slug: 'daylight-saving-time-explained' },
                { label: 'US Time Zones: EST, CST, MST, PST', slug: 'time-zones-united-states' },
                { label: 'India Time Zone (IST) Guide', slug: 'india-time-zone-ist' },
              ].map(({ label, slug }) => (
                <Link key={slug} href={`/blog/${slug}`} style={{ display: 'block', padding: '10px 14px', background: '#f0fdf4', borderRadius: '10px', border: '1px solid #bbf7d0', color: '#059669', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}>
                  {label}
                </Link>
              ))}
            </div>
            <Link href="/blog" style={{ fontSize: '13px', color: '#6366f1', fontWeight: '600', textDecoration: 'none' }}>
              View all guides →
            </Link>
          </div>

          <FAQ />

          {/* Ad slot — after FAQ */}
          <AdSense slot="horizontal" />

          {/* Tips section with SEO heading */}
          <div style={{ background: 'white', borderRadius: '20px', padding: '32px', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', margin: '0 0 24px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', borderRadius: '10px', padding: '6px 10px', fontSize: '18px' }}>📚</span>
              How to Schedule Meetings Across Time Zones
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {[
                { color: '#3b82f6', title: 'Best time for Europe & Asia meetings', text: 'The sweet spot is 2–4 PM London time (10 PM–12 AM in Asia). Rotate who takes the inconvenient slot each week to be fair.' },
                { color: '#8b5cf6', title: 'Remote team scheduling best practices', text: 'Record all meetings. Use async communication for non-urgent updates. Rotate meeting times to share the timezone burden equally.' },
                { color: '#10b981', title: 'Understanding UTC and timezone offsets', text: 'UTC is the global standard. EST = UTC-5, IST = UTC+5:30, JST = UTC+9. Always reference UTC when scheduling across many zones.' },
                { color: '#f59e0b', title: 'Tools to coordinate remote teams', text: 'Combine this converter with Calendly for scheduling, Slack timezone integrations, or Google Calendar for a complete remote work stack.' },
              ].map(({ color, title, text }) => (
                <div key={title} style={{ borderLeft: `4px solid ${color}`, paddingLeft: '16px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', margin: '0 0 6px' }}>{title}</h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: '1.5' }}>{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #4c1d95)', borderRadius: '20px', padding: '32px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', textAlign: 'center' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '700', color: 'white', margin: '0 0 12px' }}>💼 Built for Remote Teams</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', margin: '0 0 24px', lineHeight: '1.6' }}>
              The best free time zone converter for project managers, freelancers, event organizers, and support teams covering global shifts.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
              {['🌐 Remote teams', '📋 Project managers', '💻 Freelancers', '🎙️ Event organizers', '🔧 Support teams'].map(tag => (
                <span key={tag} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '999px', padding: '6px 16px', fontSize: '13px', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.2)' }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div style={{ textAlign: 'center', paddingTop: '12px' }}>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', margin: '0 0 8px' }}>
              © 2025 Time Zone Converter · Built for remote teams · Free forever
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              {[
                { label: 'EST to PST', slug: 'est-to-pst' },
                { label: 'GMT to EST', slug: 'gmt-to-est' },
                { label: 'IST to EST', slug: 'ist-to-est' },
                { label: 'UTC to EST', slug: 'utc-to-est' },
              ].map(({ label, slug }) => (
                <a key={slug} href={`/convert/${slug}`} style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>{label}</a>
              ))}
              <Link href="/blog" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>Blog</Link>
              <Link href="/privacy" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>Privacy Policy</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
