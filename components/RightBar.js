import Link from "next/link";

const RightBar = () => {
    return (
        <div className="w-full lg:w-[55%] font-[Urbanist]">
            <div className="relative lg:fixed pb-16">
                {/* Search */}
                <div className="relative mx-2 mt-9">
                    <div className="absolute right-0 text-white bg-primary rounded-md flex items-center px-6 h-full cursor-pointer ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-mail"
                            width={16}
                            height={16}
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
                        </svg>
                    </div>
                    <input
                        className="w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-dim-400 text-gray-100 focus:bg-gray-100 dark:focus:bg-dim-900 focus:outline-none focus:border focus:border-blue-200 font-normal h-14 md:h-16 flex items-center pl-4 py-2 text-sm rounded-md border"
                        placeholder="Search Twitter"
                    />
                </div>
                {/* /Search */}

                <div className="bg-white dark:bg-gray-800 rounded-2xl mt-6 mx-2 border">
                    <h3 className="text-gray-900 dark:text-white text-md font-bold p-3 border-b border-gray-200 dark:border-gray-600">
                        Groups Joined
                    </h3>
                    {/* Trending Topic */}
                    <div className="text-blue-400 text-sm font-normal p-3 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-dim-300 cursor-pointer transition duration-350 ease-in-out">
                        <h2 className="font-bold text-md text-gray-800 dark:text-white hover:text-primary">
                            #FreePS5Monday
                        </h2>
                        <p className="text-xs text-gray-400">29.7K Tweets</p>
                    </div>
                    {/* /Trending Topic */}
                    {/* Trending Topic */}
                    <div className="text-blue-400 text-sm font-normal p-3 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-dim-300 cursor-pointer transition duration-350 ease-in-out">
                        <h2 className="font-bold text-md text-gray-800 dark:text-white hover:text-primary">
                            #BTSonGMA
                        </h2>
                        <p className="text-xs text-gray-400">351K Tweets</p>
                    </div>
                    {/* /Trending Topic */}
                    {/* Trending Topic */}
                    <div className="text-blue-400 text-sm font-normal p-3 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-dim-300 cursor-pointer transition duration-350 ease-in-out">
                        <h2 className="font-bold text-md text-gray-800 dark:text-white hover:text-primary">
                            #AstraZeneca
                        </h2>
                        <p className="text-xs text-gray-400">52.7K Tweets</p>
                    </div>
                    {/* /Trending Topic */}
                    <div className="text-blue-400 text-sm font-normal p-3 hover:bg-gray-100 dark:hover:bg-dim-300 cursor-pointer transition duration-350 ease-in-out">
                        Show more
                    </div>
                </div>

                {/* /Who to follow */}
                <footer>
                    <ul className="text-xs text-gray-500 my-4 mx-2">
                        <li className="inline-block mx-2">
                            <a className="hover:underline" href="#">
                                Terms of Service
                            </a>
                        </li>
                        <li className="inline-block mx-2">
                            <a className="hover:underline" href="#">
                                Privacy Policy
                            </a>
                        </li>
                        <li className="inline-block mx-2">
                            <a className="hover:underline" href="#">
                                Cookie Policy
                            </a>
                        </li>
                        <li className="inline-block mx-2">
                            <a className="hover:underline" href="#">
                                Ads info
                            </a>
                        </li>
                        <li className="inline-block mx-2">
                            <a className="hover:underline" href="#">
                                More
                            </a>
                        </li>
                        <li className="inline-block mx-2">© 2020 Twitter, Inc.</li>
                    </ul>
                </footer>
            </div>
        </div>
    )
}

export default RightBar;