import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'
import { doc, getDoc } from '@firebase/firestore'
import { db } from '../../pages/api/auth/firebase-config'
import { useTheme } from 'next-themes'

const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Tools', href: '/tools/home', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);

    const [userImg, setUserImg] = useState(session?.user?.image);

    useEffect(() => {
        (() => getResponse())();
    });


    const getResponse = async () => {
        if(session && loading) {
            const docRef = doc(db, "users", session.user.uid);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()) {
                setUserImg(docSnap.data().profileImg);
                setLoading(false);
            } else { setLoading(false) }
        }
    }
    const LogOut = async () => {
        signOut();
        router.push('/')
    }


    return (
        <>
            {
                router.pathname != '/login' && (
                    <Disclosure as="nav" className="bg-white dark:bg-gray-800 shadow-sm fixed top-0 z-50 w-full select-none">
                        {({ open }) => (
                            <>
                                <div className="mx-auto px-2 sm:px-6 lg:px-8 py-1">
                                    <div className="relative flex h-14 items-center justify-between">

                                        <div className="flex flex-1 ">

                                            <div

                                                className="flex flex-shrink-0 items-center">
                                                <Link href='/'>
                                                    {
                                                        theme === 'dark' ?
                                                            <img src='/logo2.png' className='w-32' alt='ReairSkils' />
                                                            : <img src='/RepairSkills.png' className='w-32' alt='ReairSkils' />}
                                                </Link>
                                            </div>

                                            <div className="hidden sm:ml-6 sm:block w-full">
                                                <div className="flex space-x-4 justify-center">
                                                    {navigation.map((item) => (
                                                        <Link
                                                            key={item.name}
                                                            href={item.href}
                                                            className={classNames(
                                                                item.current ? 'text-primary' : 'text-black hover:bg-gray-700 hover:text-white',
                                                                'px-4 py-2 rounded-full text-sm font-semibold tracking-wide dark:text-white'
                                                            )}
                                                            aria-current={item.current ? 'page' : undefined}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                                            <button
                                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${theme === 'dark' && 'fill-black'} w-6 h-6 mr-3`}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                                                </svg>

                                            </button>

                                            <Link
                                                href='/steps/home'
                                                className="rounded-full bg-gray-100 border border-primary border-dashed p-1 text-black"
                                            >
                                                <span className="sr-only">View notifications</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                                                </svg>

                                            </Link>

                                            {/* Profile dropdown */}
                                            <Menu as="div" className="relative ml-3">
                                                <div>
                                                    <Menu.Button className="flex rounded-full text-sm ">
                                                        <span className="sr-only">Open user menu</span>
                                                        {session?.user?.image ?
                                                            <img
                                                                className="h-8 w-8 object-cover rounded-full"
                                                                src={userImg}
                                                                alt=""
                                                            />
                                                            :
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="stroke-primary w-9">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                        }
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link
                                                                    href={`/account/${session?.user?.uid}`}
                                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                                >
                                                                    Your Profile
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link
                                                                    href="#"
                                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                                >
                                                                    Settings
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <>
                                                                    {
                                                                        session ?
                                                                            <div
                                                                                onClick={LogOut}
                                                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100')}
                                                                            >
                                                                                Sign Out
                                                                            </div>
                                                                            :
                                                                            <div
                                                                                onClick={() => router.push('/login')}
                                                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm hover:bg-gray-100 text-primary')}
                                                                            >
                                                                                Sign In
                                                                            </div>
                                                                    }
                                                                </>
                                                            )}
                                                        </Menu.Item>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>
                                </div>


                            </>
                        )}
                    </Disclosure>
                )
            }
        </>

    )
}
