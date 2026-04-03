import Head from 'next/head';
import Link from 'next/link';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://timezone.business';
const LAST_UPDATED = 'April 3, 2025';

export default function CookiePolicy() {
  return (
    <>
      <Head>
        <title>Cookie Policy | timezone.business</title>
        <meta name="description" content="Cookie Policy for timezone.business. Learn what cookies we use, why we use them, and how to control or disable them." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/cookies`} />
      </Head>

      <main style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e3a8a 0%, #312e81 50%, #4c1d95 100%)', paddingBottom: '60px' }}>
        {/* Breadcrumb */}
        <div style={{ maxWidth: '780px', margin: '0 auto', padding: '20px 20px 0', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', textDecoration: 'none' }}>Home</Link>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>›</span>
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px' }}>Cookie Policy</span>
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', padding: '40px 20px 32px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: '900', color: 'white', margin: '0 0 12px', lineHeight: 1.2 }}>
            Cookie Policy
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
            Last updated: {LAST_UPDATED}
          </p>
        </div>

        {/* Content */}
        <div style={{ maxWidth: '780px', margin: '0 auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '40px', boxShadow: '0 20px 60px rgba(0,0,0,0.12)', lineHeight: '1.75', color: '#475569', fontSize: '15px' }}>

            {[
              {
                title: '1. What Are Cookies?',
                content: 'Cookies are small text files stored on your device (computer, tablet, or smartphone) when you visit a website. They allow the website to remember your actions and preferences over a period of time so you do not have to re-enter them whenever you return to the site or browse from one page to another.',
              },
              {
                title: '2. What Cookies Do We Use?',
                content: 'timezone.business uses the following types of cookies: (a) Essential cookies — strictly necessary for the website to function. Without these cookies, services you have asked for cannot be provided. These cookies do not gather information about you that could be used for marketing. (b) Analytics cookies — we use Google Analytics to understand how visitors use our website. These cookies collect anonymous information about how visitors interact with the site, including which pages are visited most often. (c) Advertising cookies — if advertisements are displayed on this site, Google AdSense uses cookies to show ads relevant to you based on your browsing history. These are third-party cookies set by Google.',
              },
              {
                title: '3. Google Analytics Cookies',
                content: 'We use Google Analytics to analyze traffic on our website. The following cookies may be set: _ga (expires 2 years) — used to distinguish users. _gid (expires 24 hours) — used to distinguish users. _gat (expires 1 minute) — used to throttle request rate. These cookies collect information in an anonymous form including the number of visitors to the site and pages visited. You can opt out of Google Analytics tracking at https://tools.google.com/dlpage/gaoptout.',
              },
              {
                title: '4. Google AdSense Cookies',
                content: 'Google AdSense sets cookies to serve ads based on your prior visits to our website or other websites. Google\'s use of advertising cookies enables it and its partners to serve ads based on your visit to this site and/or other sites on the Internet. You may opt out of personalized advertising by visiting https://www.google.com/settings/ads. Alternatively, you can opt out of third-party vendor\'s use of cookies for personalized advertising by visiting www.aboutads.info.',
              },
              {
                title: '5. How to Control Cookies',
                content: 'You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. If you do so, however, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work. To manage cookies in your browser: Chrome: Settings → Privacy and Security → Cookies. Firefox: Settings → Privacy & Security → Cookies. Safari: Preferences → Privacy → Manage Website Data. Edge: Settings → Site Permissions → Cookies.',
              },
              {
                title: '6. Cookie Consent',
                content: 'When you first visit timezone.business, you may see a cookie notice. By continuing to use our website after seeing this notice, you consent to our use of cookies as described in this policy. You can withdraw your consent at any time by adjusting your browser settings to refuse cookies.',
              },
              {
                title: '7. Third-Party Cookies',
                content: 'Please note that third parties (including, for example, advertising networks and providers of external services like web traffic analysis services) may also use cookies, over which we have no control. These cookies are likely to be analytical/performance cookies or targeting cookies. We encourage you to review the privacy policies of these third-party services.',
              },
              {
                title: '8. Changes to This Cookie Policy',
                content: 'We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. Any changes will become effective when we post the revised policy on this page. We encourage you to periodically review this page for the latest information about our cookie practices.',
              },
              {
                title: '9. Contact Us',
                content: 'If you have any questions about our use of cookies, please contact us at: privacy@timezone.business',
              },
            ].map((section, i, arr) => (
              <div key={i} style={{ marginBottom: i < arr.length - 1 ? '28px' : 0 }}>
                <h2 style={{ fontSize: '17px', fontWeight: '700', color: '#1e293b', margin: '0 0 10px', paddingBottom: '8px', borderBottom: '2px solid #f1f5f9' }}>
                  {section.title}
                </h2>
                <p style={{ margin: 0 }}>{section.content}</p>
              </div>
            ))}
          </div>

          {/* Back */}
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
              ← Back to Time Zone Converter
            </Link>
            <Link href="/privacy" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px' }}>Privacy Policy</Link>
          </div>
        </div>
      </main>
    </>
  );
}
