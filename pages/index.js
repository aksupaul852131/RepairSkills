import Head from "next/head";
import Rightbar from "../components/RightBar";
import Feed from "../components/Feed";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react'
import { doc, getDoc, serverTimestamp, setDoc } from "@firebase/firestore";
import { db } from "./api/auth/firebase-config";
import { useSession } from "next-auth/react";


export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    (() => getResponse())();
  });

  const getResponse = async () => {


    if (session) {
      if (loading) {
        const docRef = doc(db, "users", session?.user?.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setLoading(false);

        } else {
          // doc.data() will be undefined in this case

          const userData = {
            name: session.user.name,
            profileImg: session.user.image,
            bio: '',
            uid: session.user.uid,
            timestamp: serverTimestamp(),
            skills: [],
            workExp: 0,
            // experince: [{
            //   brandImg: '',
            //   brandInfo: '',
            //   brandLink: '',
            //   brandName: '',
            //   workLocation: '',
            //   expYear: '',
            // }]
          }
          setDoc(doc(db, "users", session.user.uid), userData);
          setLoading(false);
        }
      }
    }

  }

  return (
    <>
      <Head>
        <title>RepairSkills || Worlwide RepairMan Community</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <div className="w-full pt-2">


        <header className="overflow-hidden bg-slate-100 lg:bg-transparent lg:px-5">
          <div className="mx-auto grid max-w-6xl grid-cols-1 grid-rows-[auto_1fr] gap-y-16 pt-16 md:pt-20 lg:grid-cols-12 lg:gap-y-20 lg:px-3 lg:pb-36 lg:pt-20 xl:py-32">
            <div className="relative flex items-end lg:col-span-5 lg:row-span-2">
              <div className="absolute -top-20 -bottom-12 left-0 right-1/2 z-10 rounded-br-6xl bg-blue-600 text-white/10 md:bottom-8 lg:-inset-y-32 lg:right-full lg:left-[-100vw] lg:-mr-40">
                <svg aria-hidden="true" className="absolute inset-0 h-full w-full">
                  <defs>
                    <pattern
                      id=":R196:"
                      width={128}
                      height={128}
                      patternUnits="userSpaceOnUse"
                      x="100%"
                      y="100%"
                      patternTransform="translate(112 64)"
                    >
                      <path d="M0 128V.5H128" fill="none" stroke="currentColor" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#:R196:)" />
                </svg>
              </div>
              <div className="relative z-10 mx-auto flex w-64 rounded-xl bg-slate-600 shadow-xl md:w-80 lg:w-auto">
                <img
                  alt=""

                  src="https://primer.tailwindui.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcover.63d6cb7d.png&w=1080&q=75"
                  width={960}
                  height={1284}
                  decoding="async"
                  data-nimg={1}
                  className="w-full"
                  style={{ color: "transparent" }}
                />
              </div>
            </div>
            <div className="relative px-4 sm:px-6 lg:col-span-7 lg:pr-0 lg:pb-14 lg:pl-16 xl:pl-20">
              <div className="hidden lg:absolute lg:bottom-0 lg:-top-32 lg:right-[-100vw] lg:left-[-100vw] lg:block lg:bg-slate-100" />
              <figure className="relative mx-auto max-w-md text-center lg:mx-0 lg:text-left">
                <div className="flex justify-center text-blue-600 lg:justify-start">
                  <div className="flex gap-1">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      className="h-5 w-5 fill-current"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      className="h-5 w-5 fill-current"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      className="h-5 w-5 fill-current"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      className="h-5 w-5 fill-current"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      className="h-5 w-5 fill-current"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
                <blockquote className="mt-2">
                  <p className="font-display text-xl font-medium text-slate-900">
                    “This method of designing icons is genius. I wish I had known this
                    method a lot sooner.”
                  </p>
                </blockquote>
                <figcaption className="mt-2 text-sm text-slate-500">
                  <strong className="font-semibold text-blue-600 before:content-['—_']">
                    Stacey Solomon
                  </strong>
                  , Founder at Retail Park
                </figcaption>
              </figure>
            </div>
            <div className="bg-white pt-16 lg:col-span-7 lg:bg-transparent lg:pt-0 lg:pl-16 xl:pl-20">
              <div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-0">
                <h1 className="font-display text-5xl font-extrabold text-slate-900 sm:text-6xl">
                  Get lost in the world of icon design.
                </h1>
                <p className="mt-4 text-3xl text-slate-600">
                  A book and video course that teaches you how to design your own icons
                  from scratch.
                </p>
                <div className="mt-8 flex gap-4">
                  <a
                    className="inline-flex justify-center rounded-md py-1 px-4 text-base font-semibold tracking-tight shadow-sm focus:outline-none bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:bg-blue-700 active:text-white/80 disabled:opacity-30 disabled:hover:bg-blue-600"
                    href="/#free-chapters"
                  >
                    Get sample chapter
                  </a>
                  <a
                    className="inline-flex justify-center rounded-md border py-[calc(theme(spacing.1)-1px)] px-[calc(theme(spacing.4)-1px)] text-base font-semibold tracking-tight focus:outline-none border-blue-300 text-blue-600 hover:border-blue-400 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:text-blue-600/70 disabled:opacity-40 disabled:hover:border-blue-300 disabled:hover:bg-transparent"
                    href="/#pricing"
                  >
                    Buy book
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>


        {/* <div className="px-0 md:px-16 lg:px-48 font-[Urbanist] select-none">
          <div className="my-2 px-5 py-4 flex justify-between"
            onClick={() => router.push('/create-post')}
          >
            <div className="flex items-center">
              <span className="text-gray-600 dark:text-gray-200 text-sm font-semibold ">Type to add something</span>
            </div>

            <div className="bg-primary rounded-full py-2 px-4 text-xs text-white">
              <span>post</span>
            </div>
          </div>

          <Feed />
        </div> */}
      </div>



    </>
  );
}


