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
            urlKey: 'ACInstallationTools'
        },
        {
            name: 'Gas Refilling',
            urlKey: 'acGasRefilling'
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
                <title>RepairSteps || Worlwide RepairMan Community</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="pt-6 pb-24 w-full font-[Urbanist] px-3 md:px-32">
                <div className="bg-black text-white py-4 rounded-md">
                    <h1 className="text-center">Advance Pocket Tools</h1>
                </div>

                <div>
                    <h2 className="mt-6 font-extrabold dark:text-white">Daily Use Tools</h2>
                    <div className="border-t mt-8 mb-8 relative">
                        <span className="-top-4 left-2 text-sm absolute bg-white px-4 py-1 rounded-full border">Split AC Tools</span>
                    </div>
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                        {
                            tool.map((e, index) => (
                                <Link
                                    key={index}
                                    href={{
                                        pathname: '/tools/tools-list',
                                        query: { key: `${e.urlKey}` },
                                    }}
                                >
                                    <div className="bg-primary/30 rounded border-2 border-primary h-32 w-full grid items-center text-center dark:text-white">
                                        <h2>{e.name}</h2>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>


                <div className="bg-primary shadow-xl py-6 -mx-3 px-4 mt-6">
                    <h2 className="font-extrabold text-white text-center">Get Installation Ideas And More</h2>
                    <Link
                        href={{
                            pathname: '/tools/tools-list',
                            query: { key: `InstallIdea` },
                        }}>
                        <div className="mt-4 grid justify-items-center h-32">
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
                            className="-top-4 left-1/3 text-sm ml-2 absolute bg-white px-4 py-1 rounded-full border">view gallery</Link>
                    </div>
                </div>


            </div>


            <div className="w-1/4">

            </div>
        </>
    )
}