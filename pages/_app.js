import "../styles/globals.css";
import "../styles/dist.css";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import MobileNav from "../components/navbar/mobile-nav";
import Navbar from "../components/navbar/Navbar";

import ScrollButton from "../components/utils/Scroll-btn"
import Sidebar from "../components/Sidebar";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    // `session` comes from `getServerSideProps` or `getInitialProps`.
    // Avoids flickering/session loading on first load.
    <SessionProvider session={session}>
      <RecoilRoot>
        <div className="bg-white dark:bg-gray-900">
          <Navbar />
          <div className="h-screen">
            <div className="mt-16 lg:flex lg:flex-row dark:bg-gray-900">
              {/* Left */}
              <Sidebar />
              <Component {...pageProps} />
            </div>
          </div>
        </div>
        <MobileNav />
        <ScrollButton />
      </RecoilRoot>
    </SessionProvider>
  );
}
