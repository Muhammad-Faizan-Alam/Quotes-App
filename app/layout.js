import "./globals.css";
import ReduxProvider from "./components/ReduxProvider";
import Header from "./components/Header";
import Head from "next/head";

export const metadata = {
  title: "Quotes App",
  description: "A simple app to display quotes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <Head>
        {/* Set the favicon */}
        <link
          rel="icon"
          href="/images/SahilAdeem.webp"
        />
        {/* Optional: Dynamic title */}
        {/* <title>{metadata.title}</title> */}
        {/* <meta name="description" content={metadata.description} /> */}
      </Head>

      <body>
        <ReduxProvider>
          <Header />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}