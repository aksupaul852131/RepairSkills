import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Rightbar from "../components/RightBar";
import Feed from "../components/Feed";
import { useRouter } from "next/router";
import Nav from "../components/navbar/Navbar";

import { getProviders, getSession, useSession } from "next-auth/react";
import Login from "../components/Login";
import { modalState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";

export default function Home({ providers }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const router = useRouter();

  if (!session) return <Login providers={providers} />;

  return (
    <>
      <Head>
        <title>Home / Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>



      <div className="w-full sm:w-600 md:h-screen pt-2">

        <div className="px-2 md:px-16 lg:px-48 font-[Urbanist] select-none">
          <div className="my-2 border px-5 py-4 flex justify-between rounded-2xl"
            onClick={() => router.push('/create-post')}
          >
            <div className="flex items-center">
              <img
                className="h-8 w-8 rounded-full border-blue-400 border-2"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <span className="text-gray-600 ml-3 text-sm font-bold ">Type to add something</span>
            </div>

            <div className="bg-primary rounded-full py-2 px-4 text-xs text-white">
              <span>post</span>
            </div>

          </div>
          {/* Timeline */}
          {/* New Tweets */}
          <div className="border-b border-gray-200 dark:border-dim-200 bg-gray-50 dark:bg-dim-300 py-2 border-l border-r">
            <div className="flex flex-shrink-0 items-center justify-center py-4 bg-white dark:bg-dim-900 border-b border-t border-gray-200 dark:border-dim-200 hover:bg-gray-50 dark:hover:bg-dim-300 cursor-pointer transition duration-350 ease-in-out text-gray-600 text-sm">
              New 10 Quetions Posted
            </div>
          </div>
          {/* /New Tweets */}
          <Feed />
          {/* /Tweet */}
          {/* Timeline Notification */}

        </div>
        {/* /Post Tweet */}




        {/* /Timeline */}
      </div>
      {/* /Middle */}


      {/* Right */}
      <Rightbar />

    </>
  );
}

export async function getServerSideProps(context) {
  // const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
  //   (res) => res.json()
  // );
  // const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
  //   (res) => res.json()
  // );
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      // trendingResults,
      // followResults,
      providers,
      session,
    },
  };
}
