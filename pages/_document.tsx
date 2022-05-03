import { Html, Main, NextScript, Head } from 'next/document'

const MyDocument = () => {
  return (
    <Html lang='ja-JP' dir='ltr'>
      <Head>
        {/* 一般 */}
        <meta name='theme-color' content='#000' />
        <link rel='apple-touch-icon' href='/icon.png' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='manifest' href='/manifest.json' />
      </Head>

      <body style={{ background: 'rgb(247,246,247)' }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default MyDocument
