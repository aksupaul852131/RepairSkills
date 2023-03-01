import Head from "next/head";

export default function Contact() {
    return (
        <>
            <Head>
                <title>About Us</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="canonical" href="https://repair-skills.com/about" />

                <meta name="description" content="RepairSkills is a comprehensive online resource for anyone looking to improve their repair and maintenance skills. Our website features a wide range of informative articles, tutorials, videos, and other resources designed to help you tackle any home repair project with confidence." />
            </Head>
            {/* ====== Contact Section Start */}
            <section className="relative z-10 overflow-hidden bg-white dark:bg-gray-900 px-3 py-20 lg:py-[120px]">
                <div className="container mx-auto">
                    <div className="-mx-4 flex flex-wrap lg:justify-between">
                        <div className="w-full px-4 lg:w-1/2 xl:w-6/12">
                            <div className="mb-12 max-w-[570px] lg:mb-0">
                                <span className="text-primary mb-4 block text-base font-semibold">
                                    About Us
                                </span>
                                <h2 className="text-dark mb-6 text-[32px] font-bold uppercase sm:text-[40px] lg:text-[36px] xl:text-[40px]">
                                    Know About RepairSkills
                                </h2>
                                <p className="text-body-color mb-9 text-base leading-relaxed">
                                    Welcome to RepairSkills - the online community for technicians and repair professionals! Our website is dedicated to providing a platform for skilled technicians to connect, share knowledge, and learn from each other.
                                </p>
                                <p className="text-body-color mb-9 text-base leading-relaxed">
                                    At RepairSkills, we believe that the key to success in the repair industry is collaboration and continuous learning. Our community is made up of technicians from all walks of life, from HVAC specialists to appliance repair professionals, who are passionate about their work and eager to share their expertise with others.
                                </p>
                                <p className="text-body-color mb-9 text-base leading-relaxed">
                                    Whether you are a seasoned veteran or just starting out in the repair industry, RepairSkills has something to offer you. Our website features a variety of resources, including articles, tutorials, and forums, designed to help you stay up-to-date with the latest repair trends and techniques. We also offer certification programs and training courses, so you can continue to develop your skills and expand your knowledge.
                                </p>
                                <p className="text-body-color mb-9 text-base leading-relaxed">
                                    At RepairSkills, we are committed to fostering a supportive and inclusive community where all members are respected and valued. We encourage our members to share their experiences, offer advice, and help each other succeed in their careers. Join us today and become a part of the RepairSkills community!
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            {/* ====== Contact Section End */}
        </>

    )
}