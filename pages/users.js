const Users = () => {
    return (
        <div>


            <div className="bg-white">
                {/* <Nav /> */}
                <div className="h-screen mt-14">
                    <div className=" lg:flex lg:flex-row">
                        {/* Left */}
                        {/* <Sidebar /> */}
                        <div className="w-full sm:w-600 md:h-screen pt-2">
                            {/* /Middle */}
                            <div className="px-2 md:px-16 lg:px-48 font-[Urbanist] select-none">


                            </div>
                        </div>
                        {/* Right */}
                        {/* <Rightbar /> */}
                    </div>
                </div>
            </div>



            <div className="w-full min-h-screen">
                <div className="max-w-screen-md px-10 py-6 mx-4 mt-20 bg-white rounded-lg shadow md:mx-auto border-1">
                    <div className="flex flex-col items-start w-full m-auto sm:flex-row">
                        <div className="flex mx-auto sm:mr-10 sm:m-0">
                            <div className="items-center justify-center w-20 h-20 m-auto mr-4 sm:w-32 sm:h-32">
                                <img
                                    alt="profil"
                                    src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                    className="object-cover w-20 h-20 mx-auto rounded-full sm:w-32 sm:h-32"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col pt-4 mx-auto my-auto sm:pt-0 sm:mx-0">
                            <div className="flex flex-col mx-auto sm:flex-row sm:mx-0 ">
                                <h2 className="flex pr-4 text-xl font-light text-gray-900 sm:text-3xl">
                                    AlexNoah7
                                </h2>
                                <div className="flex">
                                    <a className="flex items-center px-1 text-sm font-medium text-gray-900 bg-transparent border border-gray-600 rounded outline-none sm:ml-2 hover:bg-blue-600 hover:text-white focus:outline-none hover:border-blue-700">
                                        Edit profile
                                    </a>
                                    <a
                                        className="p-1 ml-2 text-gray-700 border-transparent rounded-full cursor-pointer hover:text-blue-600 focus:outline-none focus:text-gray-600"
                                        aria-label="Notifications"
                                    >
                                        <svg
                                            className="w-4 h-4 sm:w-8 sm:h-8"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-3 space-x-2">
                                <div className="flex">
                                    <span className="mr-1 font-semibold">55 </span> Post
                                </div>
                                <div className="flex">
                                    <span className="mr-1 font-semibold">10k </span> Follower
                                </div>
                                <div className="flex">
                                    <span className="mr-1 font-semibold">20</span> Following
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full pt-5">
                        <h1 className="text-lg font-semibold text-gray-800 sm:text-xl">
                            Alexander Noah
                        </h1>
                        <p className="text-sm text-gray-500 md:text-base">Fotografer</p>
                        <p className="text-sm text-gray-800 md:text-base">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate,
                            quam?
                        </p>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Users;