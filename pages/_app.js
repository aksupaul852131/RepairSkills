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
        <div className="bg-white">
          <Navbar />
          <div className="mt-20 h-screen">
            <div className=" lg:flex lg:flex-row">
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
