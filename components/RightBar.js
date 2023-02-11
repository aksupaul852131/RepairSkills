import Link from "next/link";

const RightBar = () => {
    return (
        <div className="w-full lg:w-[55%] font-[Urbanist]">
            <div className="relative lg:fixed">
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

                {/* Groups Joined */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl mt-6 mx-2 border border-gray-300 py-1">
                    <h3 className="text-gray-900 dark:text-white text-md font-bold py-3 border-b border-gray-200 dark:border-gray-600 px-4">
                        Groups Joined
                    </h3>
                    {/* Group */}
                    <Link href='#'>
                        <div className=" text-sm font-normal mx-5 py-3 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-dim-300 cursor-pointer transition duration-350 ease-in-out">
                            <div className="flex items-center">
                                <img className="w-14 md:w-12 rounded-md mr-3" src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80' />
                                <div>
                                    <h4 className="font-bold text-md text-gray-800 dark:text-white">
                                        HVAC Professional
                                    </h4>
                                    <p className="text-xs text-gray-400">31 Daily Posts</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    {/* Group */}
                    <Link href='#'>
                        <div className=" text-sm font-normal mx-5 py-3 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-dim-300 cursor-pointer transition duration-350 ease-in-out">
                            <div className="flex items-center">
                                <img className="w-14 h-14 md:h-12 md:w-12 rounded-md mr-3" src='https://i.pinimg.com/originals/7b/2a/86/7b2a86993b5bb7eafa019815af8a2d0c.png' />
                                <div>
                                    <h4 className="font-bold text-md text-gray-800 dark:text-white">
                                        Refrigrator Tech
                                    </h4>
                                    <p className="text-xs text-gray-400">658 Daily Posts</p>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <div className="text-blue-400 text-sm font-normal mx-5 py-0 hover:bg-gray-100 dark:hover:bg-dim-300 cursor-pointer transition duration-350 ease-in-out">
                        Show more
                    </div>
                </div>
                {/* /What’s happening */}

                {/* What’s happening */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl mt-6 mx-2 border">
                    <h3 className="text-gray-900 dark:text-white text-md font-bold p-3 border-b border-gray-200 dark:border-gray-600">
                        Groups Joined
                    </h3>
                    {/* Trending Topic */}
                    <div className="text-blue-400 text-sm font-normal p-3 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-dim-300 cursor-pointer transition duration-350 ease-in-out">
                        <h2 className="font-bold text-md text-gray-800 dark:text-white">
                            #FreePS5Monday
                        </h2>
                        <p className="text-xs text-gray-400">29.7K Tweets</p>
                    </div>
                    {/* /Trending Topic */}
                    {/* Trending Topic */}
                    <div className="text-blue-400 text-sm font-normal p-3 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-dim-300 cursor-pointer transition duration-350 ease-in-out">
                        <h2 className="font-bold text-md text-gray-800 dark:text-white">
                            #BTSonGMA
                        </h2>
                        <p className="text-xs text-gray-400">351K Tweets</p>
                    </div>
                    {/* /Trending Topic */}
                    {/* Trending Topic */}
                    <div className="text-blue-400 text-sm font-normal p-3 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-dim-300 cursor-pointer transition duration-350 ease-in-out">
                        <h2 className="font-bold text-md text-gray-800 dark:text-white">
                            #AstraZeneca
                        </h2>
                        <p className="text-xs text-gray-400">52.7K Tweets</p>
                    </div>
                    {/* /Trending Topic */}
                    <div className="text-blue-400 text-sm font-normal p-3 hover:bg-gray-100 dark:hover:bg-dim-300 cursor-pointer transition duration-350 ease-in-out">
                        Show more
                    </div>
                </div>
                {/* /What’s happening */}
                {/* Who to follow */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl m-2">
                    <h1 className="text-gray-900 dark:text-white text-md font-bold p-3 border-b border-gray-200 dark:border-gray-600">
                        Who to follow
                    </h1>
                    {/* Twitter Account */}
                    <div className="text-blue-400 text-sm font-normal p-3 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-dim-300 cursor-pointer transition duration-350 ease-in-out">
                        <div className="flex flex-row justify-between p-2">
                            <div className="flex flex-row">
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src="https://pbs.twimg.com/profile_images/1308769664240160770/AfgzWVE7_normal.jpg"
                                    alt="Joe Biden"
                                />
                                <div className="flex flex-col ml-2">
                                    <h1 className="text-gray-900 dark:text-white font-bold text-sm">
                                        Joe Biden
                                    </h1>
                                    <p className="text-gray-400 text-sm">@JoeBiden</p>
                                </div>
                            </div>
                            <div className="">
                                <div className="flex items-center h-full text-gray-800 dark:text-white">
                                    <a
                                        href="#"
                                        className="text-xs font-bold text-blue-400 px-4 py-1 rounded-full border-2 border-blue-400"
                                    >
                                        Follow
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Twitter Account */}
                    {/* Twitter Account */}
                    <div className="text-blue-400 text-sm font-normal p-3 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-dim-300 cursor-pointer transition duration-350 ease-in-out">
                        <div className="flex flex-row justify-between p-2">
                            <div className="flex flex-row">
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src="https://pbs.twimg.com/profile_images/1308769664240160770/AfgzWVE7_normal.jpg"
                                    alt="Joe Biden"
                                />
                                <div className="flex flex-col ml-2">
                                    <h1 className="text-gray-900 dark:text-white font-bold text-sm">
                                        Joe Biden
                                    </h1>
                                    <p className="text-gray-400 text-sm">@JoeBiden</p>
                                </div>
                            </div>
                            <div className="">
                                <div className="flex items-center h-full text-gray-800 dark:text-white">
                                    <a
                                        href="#"
                                        className="text-xs font-bold text-blue-400 px-4 py-1 rounded-full border-2 border-blue-400"
                                    >
                                        Follow
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Twitter Account */}
                    {/* Loader */}
                    <div className="border-b border-gray-200 dark:border-gray-600 p-4 max-w-sm w-full mx-auto">
                        <div className="animate-pulse flex space-x-4">
                            <div className="rounded-full bg-gray-400 h-12 w-12" />
                            <div className="flex-1 space-y-4 py-1">
                                <div className="h-4 bg-gray-400 rounded w-3/4" />
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-400 rounded" />
                                    <div className="h-4 bg-gray-400 rounded w-5/6" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Loader */}
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