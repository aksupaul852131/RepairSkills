import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import Head from "next/head";

export default function ToolHome() {

    const tool = [
        {
            name: 'AC Installation',
            urlKey: ''
        },
        {
            name: 'Gas Refilling',
            urlKey: ''
        },
        {
            name: 'AC Dismantle',
            urlKey: 'acGasRefilling'
        },
        {
            name: 'AC Servicing',
            urlKey: 'acGasRefilling'
        },

    ]




    return (
        <>
            <Head>
                <title>Tools Home</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="canonical" href="https://repair-skills.com/tools/home" />

                <meta name="keywords" content="HVAC Tools, Tools List, Technician Tools, Tool App, Tool Website" />
                <meta name="description" content="This Tool Help To HVAC & Electronics Technician Daily Use Tool Finding" />
            </Head>

            <div className="pt-6 pb-24 w-full font-[Urbanist] px-3 md:px-32">
                <div>
                    <h1 className="mt-6 font-extrabold dark:text-white">Daily Use Tools HVAC Tech</h1>

                    <div className="border-t mt-8 mb-8 relative">
                        <span className="-top-4 left-2 text-sm absolute bg-white px-4 py-1 rounded-full border dark:text-black">Split AC Tools</span>
                    </div>


                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        <Link
                            href={{
                                pathname: '/tools/tools-list',
                                query: { key: `ACInstallationTools` },
                            }}
                        >
                            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl h-48 w-full grid items-center text-center text-white">
                                <h2 className="text-lg">AC Installation</h2>
                            </div>
                        </Link>

                        <Link
                            href={{
                                pathname: '/tools/tools-list',
                                query: { key: `ff` },
                            }}
                        >
                            <div className="bg-gradient-to-r from-pink-400 to-pink-500 rounded-2xl h-48 w-full grid items-center text-center text-white">
                                <h2 className="text-lg">AC Installation</h2>
                            </div>
                        </Link>

                        <Link
                            href={{
                                pathname: '/tools/tools-list',
                                query: { key: `acGasRefilling` },
                            }}
                        >
                            <div className="bg-gradient-to-r from-green-300 to-green-600 rounded-2xl h-48 w-full grid items-center text-center text-white">
                                <h2 className="text-lg">AC Installation</h2>
                            </div>
                        </Link>


                    </div>
                </div>


                {/* <div className="bg-primary shadow-xl py-6 px-4 mt-6 w-full grid justify-items-center">
                    <div className="">
                        <h2 className="font-extrabold text-white text-center">Get Installation Ideas And More</h2>
                        <Link
                            href={{
                                pathname: '/tools/tools-list',
                                query: { key: `InstallIdea` },
                            }}>
                            <div className="mt-4 grid justify-items-center">
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
                                    <SwiperSlide>
                                        <img
                                            className="object-cover"
                                            src="https://firebasestorage.googleapis.com/v0/b/wire360b.appspot.com/o/Frame%202%20(6).png?alt=media&token=6b14a89b-11cc-4f94-8234-05b2c1bc3089"
                                            alt="image slide 1"
                                        />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img
                                            className=""
                                            src="https://firebasestorage.googleapis.com/v0/b/wire360b.appspot.com/o/Frame%201%20(11).png?alt=media&token=04636dfe-eb53-4c3a-9fdb-cd7c9947cb5f"
                                            alt="image slide 1"
                                        />
                                    </SwiperSlide>

                                </Swiper>
                            </div>
                        </Link>
                        <div className="border-t mt-8 mb-2 relative">
                            <Link
                                href={{
                                    pathname: '/tools/tools-list',
                                    query: { key: `InstallIdea` },
                                }}
                                className="-top-4 left-1/3 text-sm ml-2 absolute bg-white dark:text-black px-4 py-1 rounded-full border">view gallery</Link>
                        </div>
                    </div>
                </div> */}


            </div>


            <div className="w-1/4">

            </div>
        </>
    )
}