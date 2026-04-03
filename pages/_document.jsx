import { Html, Head, Main, NextScript } from 'next/document';

const PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="google-site-verification" content="sV7vph8WqTA9bLRipo9QqBL5pE5TXJTAF6K56TPL_5o" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {PUB_ID && PUB_ID !== 'ca-pub-XXXXXXXXXX' && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUB_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
