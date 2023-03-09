import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <title>Daelim Tech Community | 대림대학교 기술 커뮤니티</title>
        <Head>
          <link rel='icon' href='/asset/images/daelimLogo.svg' />
          <meta
            charSet='utf-8'
            name='description'
            content='대림대학교 기술 커뮤니티'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
