import Link from "next/link";
import { useRouter } from "next/router";

function Sidebar() {
  const router = useRouter();
  return (

    <>
      {
        router.pathname != '/login' && (
          <div className="hidden lg:block">
            <div className="w-0 lg:w-[19.5rem] h-screen font-[Urbanist]">
              <div className="flex flex-col h-screen xl:pr-3 px-0 lg:px-6 border-r-2 bg-[#FCFBFF] dark:bg-gray-800 fixed overflow-y-auto w-[16%]">



                {/* Nav */}
                <nav className="mt-4">
                  <Link
                    href="#"
                    className="flex items-center justify-center text-sm text-blue-700 xl:justify-start mb-6 transition duration-350 ease-in-out"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 lg:w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                    </svg>
                    <span className="hidden xl:block ml-3 font-semibold">Saved</span>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center justify-between text-gray-500 text-sm xl:justify-between mb-6 transition duration-350 ease-in-out"
                  >
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 lg:w-6 dark:text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                      </svg>
                      <span className="hidden xl:block ml-3 text-black font-semibold dark:text-white">Groups</span>
                    </div>
                    <div className="bg-primary rounded-full dark:text-white px-3">12
                    </div>
                  </Link>

                  <Link
                    href="#"
                    className="flex items-center justify-center text-gray-500 dark:text-white text-sm xl:justify-start mb-6 transition duration-350 ease-in-out"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 lg:w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                    </svg>
                    <span className="hidden xl:block ml-3 text-black font-semibold dark:text-white">Messages</span>
                  </Link>

                  <Link
                    href="#"
                    className="flex items-center justify-center text-gray-500 dark:text-white text-sm xl:justify-start mb-6 transition duration-350 ease-in-out"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 lg:w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>

                    <span className="hidden xl:block ml-3 text-black font-semibold dark:text-white">Notifications</span>
                  </Link>

                  <Link
                    href="#"
                    className="flex items-center justify-center text-gray-500 dark:text-white text-sm xl:justify-start mb-6 transition duration-350 ease-in-out"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 lg:w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>

                    <span className="hidden xl:block ml-3 text-black font-semibold dark:text-white">Freinds</span>
                  </Link>

                  <hr />



                </nav>
                {/* /Nav */}

              </div>
            </div>
          </div>
        )
      }

    </>


  );
}

export default Sidebar;
