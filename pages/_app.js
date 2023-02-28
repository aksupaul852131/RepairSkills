import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import MobileNav from "../components/navbar/mobile-nav";
import Navbar from "../components/navbar/Navbar";
import { ThemeProvider } from 'next-themes'
import NextNProgress from 'nextjs-progressbar';

import ScrollButton from "../components/utils/Scroll-btn"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    // `session` comes from `getServerSideProps` or `getInitialProps`.
    // Avoids flickering/session loading on first load.
    <ThemeProvider attribute="class">
      <SessionProvider session={session}>
        <RecoilRoot>

          <div className="font-[Urbanist]">
            <Navbar />
            <NextNProgress color="#0dd354" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />

            <div className="pt-16 dark:bg-gray-900">
              <Component {...pageProps} />
            </div>
          </div>
          <MobileNav />
          <ScrollButton />
        </RecoilRoot>
      </SessionProvider>
    </ThemeProvider >
  );
}
