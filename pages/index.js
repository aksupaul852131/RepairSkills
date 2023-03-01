import Head from "next/head";
import Link from "next/link";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";


export default function Home() {

  const rating = [
    {
      title: '“What are some common HVAC maintenance tasks that homeowners can do themselves?”',
      author: 'Md Adnan',
      vote: '40 votes'
    },
    {
      title: '“You Need To Refilling Gas Using Weight Scale Meter”',
      author: 'B Stech',
      vote: '123 votes'
    }
  ]

  return (
    <>
      <Head>
        <title>RepairSkills - Worlwide RepairMan Community</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://repair-skills.com" />
        <meta name="ahrefs-site-verification" content="71828f375ee433f62e3adfe3fd7437a06468f17e250ad50976527cc50de6600b" />

        <meta name="keywords" content="repair skills, home repair, maintenance, DIY, tutorials, articles, videos, troubleshooting, community forum, professional technicians" />
        <meta name="description" content="RepairSkills is the ultimate online destination for anyone looking to improve their repair and maintenance skills. Our website is packed with informative articles, videos, tutorials, and other resources to help you tackle any home repair project with confidence" />

      </Head>

      <div className="w-full pb-24">
        <header className="overflow-hidden bg-slate-100 dark:bg-gray-900 lg:bg-transparent lg:px-5">
          <div className="mx-auto grid max-w-6xl grid-cols-1 grid-rows-[auto_1fr] gap-y-16 pt-16 md:pt-20 lg:grid-cols-12 lg:gap-y-20 lg:px-3 lg:pb-36 lg:pt-20 xl:py-32">
            <div className="relative flex items-end lg:col-span-5 lg:row-span-2">
              <div className="absolute -top-20 -bottom-12 left-0 right-1/2 z-10 rounded-br-6xl bg-primary text-white/50 md:bottom-8 lg:-inset-y-32 lg:right-full lg:left-[-100vw] lg:-mr-40">
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
                  alt="RepairSkills"
                  src="/cover-bg.png"
                  width={960}
                  height={1284}
                  decoding="async"
                  data-nimg={1}
                  className="w-full"
                  style={{ color: "transparent" }}
                />
              </div>
            </div>
            <div className="mt-8 md:mt-0 relative px-4 sm:px-6 lg:col-span-7 lg:pr-0 lg:pb-14 lg:pl-16 xl:pl-20">
              <div className="hidden lg:absolute lg:bottom-0 lg:-top-32 lg:right-[-100vw] lg:left-[-100vw] lg:block lg:bg-slate-100 dark:bg-gray-900" />

              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={false}
                modules={[Autoplay, Pagination, Navigation]}
                className="w-full z-0"
              >


                {

                  rating.map(
                    (e, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <figure className="relative mx-auto max-w-md text-center lg:mx-0 lg:text-left">
                            <div className="flex justify-center text-blue-600 lg:justify-start">
                              <span>{e.vote}</span>
                            </div>
                            <blockquote className="mt-2">
                              <p className="font-display text-xl font-medium text-slate-900 dark:text-white">
                                {e.title}
                              </p>
                            </blockquote>
                            <figcaption className="mt-2 text-sm text-slate-500">
                              <strong className="font-semibold text-blue-600 before:content-['—_']">
                                {e.author}
                              </strong>
                              ,at Repair-SKills.com
                            </figcaption>
                          </figure>
                        </SwiperSlide>
                      )
                    }
                  )
                }

              </Swiper>

            </div>
            <div className="bg-white dark:bg-gray-900 pt-16 lg:col-span-7 lg:bg-transparent lg:pt-0 lg:pl-16 xl:pl-20">
              <div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-0">
                <h1 className="font-display text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white sm:text-6xl">
                  Welcome To RepairSkills Platform
                </h1>
                <p className="mt-4 text-md md:text-3xl text-slate-600 dark:text-gray-400">
                  RepairSkills is a comprehensive online resource for anyone looking to improve their repair and maintenance skills. Whether you're a DIY enthusiast, a professional technician seeking to expand your knowledge, RepairSkills offers a wide range of articles, videos, tutorials, and other resources to help you succeed.
                </p>
                <div className="mt-8 flex gap-4">
                  <Link
                    className="inline-flex justify-center rounded-md py-1 px-4 text-base font-semibold tracking-tight shadow-sm focus:outline-none bg-primary text-black hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:bg-blue-700 active:text-white/80 disabled:opacity-30 disabled:hover:bg-blue-600"
                    href="/ask"
                  >
                    Ask Quetion
                  </Link>
                  <Link
                    className="inline-flex justify-center rounded-md border py-[calc(theme(spacing.1)-1px)] px-[calc(theme(spacing.4)-1px)] text-base font-semibold tracking-tight focus:outline-none border-blue-300 text-primary hover:border-blue-400 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:text-blue-600/70 disabled:opacity-40 disabled:hover:border-blue-300 disabled:hover:bg-transparent"
                    href="/tools/home"
                  >
                    Explore Tool
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>

        <footer>
          <ul className="mt-8 text-sm text-gray-500 my-4 mx-2 select-none">
            <li className="inline-block mx-2">
              <a className="hover:underline" href="/about">
                About Us
              </a>
            </li>
            <li className="inline-block mx-2">
              <a className="hover:underline" href="/contact">
                Contact Us
              </a>
            </li>
            <li className="inline-block mx-2">© 2020 RepairSkills, Inc.</li>
          </ul>
        </footer>

      </div>

    </>
  );
}


