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
                    <h1 className="mt-6 font-extrabold dark:text-white">Daily Use Tools</h1>

                    <div className="border-t border-blue-700 mt-8 mb-8 relative">
                        <span className="-top-4 left-2 text-white text-sm absolute bg-blue-700 px-4 py-1 rounded-full">Split AC Tools</span>
                    </div>

                    <div className="mt-4 grid grid-cols-3 lg:grid-cols-4 gap-3">
                        <Link
                            href={{
                                pathname: '/tools/tools-list',
                                query: { key: `ACInstallationTools` },
                            }}
                        >
                            <div>
                                <div className="rounded-full p-6 bg-green-200 border-2 border-green-500">


                                    <img src='/check.png' className='w-32 h-32' alt='ReairSkils' width={100} height={100} title='Home' />
                                </div>

                                <h4 className="text-xs text-center mt-3">Installation</h4>
                            </div>
                        </Link>

                        <Link
                            href={{
                                pathname: '/tools/tools-list',
                                query: { key: `acDismantle` },
                            }}
                        >
                            <div>
                                <div className="rounded-full p-6 bg-green-200 border-2 border-green-500">
                                    <img src='/repair.png' className='w-32' alt='ReairSkils' width={100} height={100} title='Home' />
                                </div>

                                <h4 className="text-xs text-center mt-3">Dismantle</h4>
                            </div>
                        </Link>

                        <Link
                            href={{
                                pathname: '/tools/tools-list',
                                query: { key: `acGasRefilling` },
                            }}
                        >
                            <div>
                                <div className="rounded-full p-6 bg-green-200 border-2 border-green-500">
                                    <img src='/ac-gas.png' className='w-32' alt='ReairSkils' width={100} height={100} title='Home' />
                                </div>
                                <h4 className="text-xs text-center mt-3">Gas Refilling</h4>
                            </div>
                        </Link>

                    </div>


                    <div className="border-t mt-12 mb-8 relative border-blue-700">
                        <span className="-top-4 left-2 text-white text-sm absolute bg-blue-700 px-4 py-1 rounded-full">Window AC Tools</span>
                    </div>

                    <div className="mt-4 grid grid-cols-3 lg:grid-cols-4 gap-3">
                        <Link
                            href={{
                                pathname: '/tools/tools-list',
                                query: { key: `WindowAcInstallation` },
                            }}
                        >
                            <div>
                                <div className="rounded-full p-6 bg-green-200 border-2 border-green-500">
                                    <img src='/window-ac.png' className='w-32' alt='ReairSkils' width={100} height={100} title='Home' />
                                </div>

                                <h4 className="text-xs text-center mt-3">Installation</h4>
                            </div>
                        </Link>

                        <Link
                            href={{
                                pathname: '/tools/tools-list',
                                query: { key: `WindowAcDismantle` },
                            }}
                        >
                            <div>
                                <div className="rounded-full p-6 bg-green-200 border-2 border-green-500">
                                    <img src='/window-dis.png' className='w-32' alt='ReairSkils' width={100} height={100} title='Home' />
                                </div>

                                <h4 className="text-xs text-center mt-3">Dismantle</h4>
                            </div>
                        </Link>

                        <Link
                            href={{
                                pathname: '/tools/tools-list',
                                query: { key: `WindowAcGas` },
                            }}
                        >
                            <div>
                                <div className="rounded-full p-6 bg-green-200 border-2 border-green-500">
                                    <img src='/window-gas.png' className='w-32' alt='ReairSkils' width={100} height={100} title='Home' />
                                </div>
                                <h4 className="text-xs text-center mt-3">Gas Refilling</h4>
                            </div>
                        </Link>

                    </div>

                    <div className="border-t border-blue-700 mt-20 mb-8 relative">
                        <span className="-top-4 left-2 text-white text-sm absolute bg-blue-700 px-4 py-1 rounded-full">Refrigrator Tools</span>
                    </div>

                    <div className="mt-4 grid grid-cols-3 lg:grid-cols-4 gap-3">

                        <Link
                            href={{
                                pathname: '/tools/tools-list',
                                query: { key: `Fridge-Gas-Refilling` },
                            }}
                        >
                            <div>
                                <div className="rounded-full p-6 bg-green-200 border-2 border-green-500">
                                    <img src='/fridge-gas.png' className='w-32' alt='ReairSkils' width={100} height={100} title='Home' />
                                </div>
                                <h4 className="text-xs text-center mt-3">Gas Refilling</h4>
                            </div>
                        </Link>

                    </div>

                    <div className="border-t border-blue-700 mt-20 mb-8 relative">
                        <span className="-top-4 left-2 text-white text-sm absolute bg-blue-700 px-4 py-1 rounded-full">Washing Machine Tools</span>
                    </div>

                    <div className="mt-4 grid grid-cols-3 lg:grid-cols-4 gap-3">

                        <Link
                            href={{
                                pathname: '/tools/tools-list',
                                query: { key: `Washing-Machine-Inspection-Tools` },
                            }}
                        >
                            <div>
                                <div className="rounded-full p-6 bg-green-200 border-2 border-green-500">
                                    <img src='/washing-machine.png' className='w-32' alt='ReairSkils' width={100} height={100} title='Home' />
                                </div>
                                <h4 className="text-xs text-center mt-3">Inspection</h4>
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