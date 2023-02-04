import "../styles/globals.css";
import "../styles/dist.css";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import MobileNav from "../components/navbar/mobile-nav";
import ScrollButton from "../components/utils/Scroll-btn"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    // `session` comes from `getServerSideProps` or `getInitialProps`.
    // Avoids flickering/session loading on first load.
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
        <MobileNav />
        <ScrollButton />
      </RecoilRoot>
    </SessionProvider>
  );
}
