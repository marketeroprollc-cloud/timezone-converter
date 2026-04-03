// AdSense component — set NEXT_PUBLIC_ADSENSE_PUB_ID in Vercel env vars to activate
const PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;

// Ad slot IDs — create these in your AdSense dashboard once approved
// and set them as env vars, or hardcode here after approval
const AD_SLOTS = {
  horizontal: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HORIZONTAL || '0000000000',
  square: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SQUARE || '1111111111',
  sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR || '2222222222',
};

export default function AdSense({ slot = 'horizontal', style = {} }) {
  // Don't render anything until AdSense is configured
  if (!PUB_ID || PUB_ID === 'ca-pub-XXXXXXXXXX') return null;

  const slotId = AD_SLOTS[slot] || AD_SLOTS.horizontal;

  const defaultStyles = {
    horizontal: { display: 'block', width: '100%', minHeight: '90px' },
    square: { display: 'block', width: '100%', minHeight: '250px' },
    sidebar: { display: 'block', width: '100%', minHeight: '600px' },
  };

  return (
    <div style={{ textAlign: 'center', margin: '8px 0', ...style }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...defaultStyles[slot] }}
        data-ad-client={PUB_ID}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: '(adsbygoogle = window.adsbygoogle || []).push({});',
        }}
      />
    </div>
  );
}
