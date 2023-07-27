import "../styles/globals.css";
import { RecoilRoot } from "recoil";
import MobileNav from "../components/navbar/mobile-nav";
import Navbar from "../components/navbar/Navbar";
import NextNProgress from 'nextjs-progressbar';
import ScrollButton from "../components/utils/Scroll-btn"
import Script from "next/script";
import { useRouter } from "next/router";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {

  const { pathname } = useRouter();
  return (
    <>

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-SBR01K67B9"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-SBR01K67B9');
        `}
      </Script>



      <RecoilRoot>

        <div className="font-[Urbanist]">
          {pathname?.includes('/login') || pathname?.includes('/register') ?
            <></> : <Navbar />}


          <NextNProgress color="#0dd354" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />

          <div className="pt-16 dark:bg-white dark:text-white">
            <Component {...pageProps} />
          </div>
        </div>
        <MobileNav />
        <ScrollButton />
      </RecoilRoot>


    </>

  );
}
