import Head from 'next/head';
import type { AppProps } from 'next/app';
import 'prism-theme-night-owl';

import '../styles/index.css';
import { ColorThemeProvider } from '../context/ColorThemeContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

              if (localStorage.theme === "dark" || (!localStorage.theme && prefersDark)) {
                document.querySelector('html').classList.add('dark');
              } else {
                document.querySelector('html').classList.add('light');
              }`,
          }}
        />

        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <ColorThemeProvider>
        <Component {...pageProps} />
      </ColorThemeProvider>
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp;