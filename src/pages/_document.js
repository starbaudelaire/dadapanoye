import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="id">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Portal Resmi Padukuhan Dadapan, Timbulharjo, Sewon, Bantul, D.I. Yogyakarta." />
        <meta property="og:title" content="Portal Resmi Padukuhan Dadapan" />
        <meta property="og:description" content="Portal Resmi Padukuhan Dadapan, Timbulharjo, Sewon, Bantul, D.I. Yogyakarta." />
        <meta property="og:url" content="https://padukuhandadapan.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://padukuhandadapan.com/logo-kkn.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Portal Resmi Padukuhan Dadapan" />
        <meta name="twitter:description" content="Portal Resmi Padukuhan Dadapan, Timbulharjo, Sewon, Bantul, D.I. Yogyakarta." />
        <meta name="twitter:image" content="https://padukuhandadapan.com/logo-kkn.webp" />
        <link rel="icon" href="/logo-kkn.webp" type="image/webp" />
        {/* Google Fonts: Plus Jakarta Sans */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const theme = localStorage.getItem('theme') || 'dark';
              if (theme === 'dark') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            })();
          `
        }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
