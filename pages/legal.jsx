import Head from 'next/head';
import Link from 'next/link';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://timezone.business';
const LAST_UPDATED = 'April 3, 2025';

export default function LegalNotice() {
  return (
    <>
      <Head>
        <title>Legal Notice | timezone.business</title>
        <meta name="description" content="Legal Notice for timezone.business — Time Zone Converter & Meeting Planner. Website owner information, terms of use, liability disclaimer, and intellectual property." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/legal`} />
      </Head>

      <main style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e3a8a 0%, #312e81 50%, #4c1d95 100%)', paddingBottom: '60px' }}>
        {/* Breadcrumb */}
        <div style={{ maxWidth: '780px', margin: '0 auto', padding: '20px 20px 0', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', textDecoration: 'none' }}>Home</Link>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>›</span>
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px' }}>Legal Notice</span>
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', padding: '40px 20px 32px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: '900', color: 'white', margin: '0 0 12px', lineHeight: 1.2 }}>
            Legal Notice
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
                title: '1. Website Owner',
                content: 'This website, timezone.business, is operated as a free online service providing time zone conversion and meeting planning tools. For inquiries regarding the operation of this website, please contact us at: privacy@timezone.business.',
              },
              {
                title: '2. Purpose of the Website',
                content: 'timezone.business provides free tools for converting time zones and planning global meetings. The service is intended for informational and productivity purposes only. No registration or personal information is required to use the core features of this website.',
              },
              {
                title: '3. Accuracy of Information',
                content: 'While we make every effort to ensure the accuracy of time zone conversions and related information, timezone.business makes no warranty, express or implied, regarding the accuracy, completeness, or suitability of any information provided. Time zone offsets and daylight saving time rules may change. Always verify critical scheduling information through official sources or your operating system\'s time settings.',
              },
              {
                title: '4. Limitation of Liability',
                content: 'timezone.business shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with the use of this website or the information provided herein. This includes, without limitation, damages for loss of business, lost profits, or scheduling errors arising from reliance on time zone information provided by this service. Use of this website is at your own risk.',
              },
              {
                title: '5. Intellectual Property',
                content: 'All content on this website, including but not limited to text, graphics, logos, and software code, is the property of timezone.business or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from any content on this website without express written permission, except for personal, non-commercial use.',
              },
              {
                title: '6. Third-Party Links',
                content: 'This website may contain links to third-party websites. These links are provided for your convenience and information only. timezone.business has no control over the content of those sites and accepts no responsibility for them or for any loss or damage that may arise from your use of them. Access to any other website linked to timezone.business is at your own risk.',
              },
              {
                title: '7. Advertising',
                content: 'This website may display advertisements served by Google AdSense and other advertising partners. The display of advertisements does not constitute an endorsement of the products or services advertised. timezone.business is not responsible for the content of any advertisement displayed on this website.',
              },
              {
                title: '8. Applicable Law',
                content: 'This Legal Notice shall be governed by and construed in accordance with applicable law. Any disputes arising in connection with this website shall be subject to the exclusive jurisdiction of the competent courts.',
              },
              {
                title: '9. Changes to This Notice',
                content: 'We reserve the right to modify this Legal Notice at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after any changes constitutes your acceptance of the new Legal Notice.',
              },
              {
                title: '10. Contact',
                content: 'For any legal inquiries or notices, please contact us at: privacy@timezone.business or by visiting timezone.business.',
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

          {/* Related legal links */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/privacy" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>Privacy Policy</Link>
            <Link href="/cookies" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>Cookie Policy</Link>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>← Back to Converter</Link>
          </div>
        </div>
      </main>
    </>
  );
}
