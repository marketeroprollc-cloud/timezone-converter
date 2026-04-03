import Head from 'next/head';
import Link from 'next/link';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://timezone.business';
const LAST_UPDATED = 'April 3, 2025';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Time Zone Converter — timezone.business</title>
        <meta name="description" content="Privacy Policy for timezone.business — Time Zone Converter & Meeting Planner. Learn how we collect and use data, cookies, and advertising." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/privacy`} />
      </Head>

      <main style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e3a8a 0%, #312e81 50%, #4c1d95 100%)', paddingBottom: '60px' }}>
        {/* Breadcrumb */}
        <div style={{ maxWidth: '780px', margin: '0 auto', padding: '20px 20px 0', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', textDecoration: 'none' }}>Home</Link>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>›</span>
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px' }}>Privacy Policy</span>
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', padding: '40px 20px 32px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: '900', color: 'white', margin: '0 0 12px', lineHeight: 1.2 }}>
            Privacy Policy
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
                title: '1. Who We Are',
                content: 'This Privacy Policy applies to timezone.business ("we", "our", or "us"), a free online time zone converter and meeting planner. Our website is located at https://timezone.business. If you have any questions about this policy, you can contact us at privacy@timezone.business.',
              },
              {
                title: '2. What Information We Collect',
                content: 'We do not require you to create an account or provide any personal information to use our service. We may collect limited non-personal technical information automatically when you visit our website, including: your IP address (anonymized), browser type and version, device type, pages visited and time spent, referring URL, and approximate geographic location (country/region level only). This data is collected through analytics tools and is used solely to improve the service.',
              },
              {
                title: '3. Cookies',
                content: 'We use cookies and similar tracking technologies to operate and improve our website. Types of cookies we use: (a) Essential cookies — necessary for the website to function correctly. (b) Analytics cookies — used by Google Analytics to understand how visitors use the site. These cookies collect anonymous data. (c) Advertising cookies — if you see advertisements on this site, they may be served by Google AdSense, which uses cookies to show relevant ads based on your browsing history. You can opt out of personalized advertising by visiting https://www.google.com/settings/ads. You can control and/or delete cookies through your browser settings. Disabling cookies may affect the functionality of some features.',
              },
              {
                title: '4. Google AdSense and Advertising',
                content: 'We use Google AdSense to display advertisements. Google AdSense uses cookies to serve ads based on your prior visits to our website or other websites. Google\'s use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet. You may opt out of personalized advertising by visiting https://www.google.com/settings/ads. For more information about how Google uses data, please visit https://policies.google.com/technologies/ads.',
              },
              {
                title: '5. Google Analytics',
                content: 'We may use Google Analytics to analyze traffic on our website. Google Analytics collects information anonymously and reports website trends without identifying individual visitors. We use this data to understand how visitors use our site and to improve the user experience. Google Analytics uses cookies that do not contain any personally identifiable information. You can opt out of Google Analytics by installing the Google Analytics opt-out browser add-on available at https://tools.google.com/dlpage/gaoptout.',
              },
              {
                title: '6. Third-Party Services',
                content: 'Our website may use the following third-party services: Google Analytics (analytics), Google AdSense (advertising), Vercel (hosting and infrastructure). Each of these services has its own privacy policy governing how they collect and use data. We encourage you to review their policies. We are not responsible for the privacy practices of these third-party services.',
              },
              {
                title: '7. Data Retention',
                content: 'We do not store any personal data on our servers. Any analytics data collected is retained by Google Analytics in accordance with their data retention policies (typically 26 months). Advertising data is handled by Google AdSense in accordance with Google\'s privacy policy.',
              },
              {
                title: '8. Your Rights (GDPR)',
                content: 'If you are located in the European Economic Area (EEA), you have the following rights regarding your personal data: the right to access, correct, or delete your data; the right to restrict or object to our processing; the right to data portability; the right to withdraw consent at any time. Since we do not collect personally identifiable information directly, most of these rights apply to data held by our third-party service providers. To exercise your rights with Google, please visit https://myaccount.google.com. To contact us about any privacy concerns, email privacy@timezone.business.',
              },
              {
                title: '9. Children\'s Privacy',
                content: 'Our service is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us and we will take steps to delete such information.',
              },
              {
                title: '10. Changes to This Policy',
                content: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this policy. We encourage you to review this Privacy Policy periodically.',
              },
              {
                title: '11. Contact Us',
                content: 'If you have any questions about this Privacy Policy, please contact us at: privacy@timezone.business or by visiting timezone.business.',
              },
            ].map((section, i) => (
              <div key={i} style={{ marginBottom: i < 10 ? '28px' : 0 }}>
                <h2 style={{ fontSize: '17px', fontWeight: '700', color: '#1e293b', margin: '0 0 10px', paddingBottom: '8px', borderBottom: '2px solid #f1f5f9' }}>
                  {section.title}
                </h2>
                <p style={{ margin: 0 }}>{section.content}</p>
              </div>
            ))}
          </div>

          {/* Back */}
          <div style={{ textAlign: 'center' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
              ← Back to Time Zone Converter
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
