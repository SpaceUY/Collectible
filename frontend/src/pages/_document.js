import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

          <meta
            name="twitter:card"
            content="summary_large_image"
            key="twcard"
          />
          <meta name="twitter:site" content="@Collectible" key="twhandle" />
          <meta property="og:type" content="website" key="ogtype" />
          <meta
            property="og:url"
            content={process.env.NEXT_PUBLIC_HOST}
            key="ogurl"
          />
          <meta
            property="og:image"
            content={`${process.env.NEXT_PUBLIC_HOST}/og-card.png`}
            key="ogimage"
          />
          <meta
            property="og:site_name"
            content="Collectible"
            key="ogsitename"
          />
          <meta property="og:title" content="Collectible" key="ogtitle" />
          <meta
            property="og:description"
            content="Welcome to Collectible, your one-stop-shop for unique NFTs. Start exploring, trading, and creating digital art like never before."
            key="ogdesc"
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
