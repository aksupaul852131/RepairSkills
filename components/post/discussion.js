import Link from "next/link";
import Moment from "react-moment";
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from "react";
import { doc, updateDoc, arrayRemove, deleteDoc, } from "@firebase/firestore";
import { db } from "../../pages/api/auth/firebase-config";
import { toast, Toaster } from "react-hot-toast";


export default function Discussion(props) {


    return (
        <section className="mt-6 pb-24">


            {
                props.CommentList?.map((e) => (

                    <article className="relative mb-2  text-base rounded-lg">
                        <div className='px-3 py-3 bg-gray-200/50 dark:bg-gray-800 rounded'>
                            <footer className="flex justify-between items-center mb-2">
                                <div className="inline-flex items-start">
                                    <Link
                                        href={{
                                            pathname: '/account/profile',
                                            query: { uid: `${e?.data()?.uid}` },
                                        }}
                                    >
                                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white hover:underline">
                                            <img
                                                className="mr-2 w-6 h-6 rounded-full"
                                                src={e?.data().userImg}
                                                alt="Michael Gough"
                                            />
                                            {e?.data().username}
                                        </p>
                                    </Link>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        <Moment fromNow>{e?.data()?.timestamp?.toDate()}</Moment>
                                    </p>
                                </div>

                                {/* Dropdown menu */}
                                <Menu as="div" className="relative ml-3">
                                    <div onClick={() => props.setReplyId(`${e?.id}`)}>
                                        <Menu.Button className="flex rounded-2xl text-sm bg-white p-2">
                                            <span className="sr-only">Comment Setting</span>
                                            <svg
                                                className="w-5 h-5"
                                                aria-hidden="true"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                                            </svg>
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

                                            {e?.data().uid != props.session && (
                                                <>
                                                    <Menu.Item>
                                                        <button
                                                            className='block px-4 py-2 text-sm text-gray-700'
                                                        >
                                                            Report
                                                        </button>
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        <Link
                                                            href={{
                                                                pathname: '/account/profile',
                                                                query: { uid: `${e?.data()?.uid}` },
                                                            }}
                                                            className='block px-4 py-2 text-sm text-gray-700'
                                                        >
                                                            View Profile
                                                        </Link>
                                                    </Menu.Item>
                                                </>
                                            )}

                                            {e?.data().uid == props.session && (
                                                <Menu.Item>
                                                    <button
                                                        onClick={async () => {
                                                            await deleteDoc(doc(db, props.postTypeKey, props.dbKey, "comments", props.replyId)
                                                            );
                                                            toast.error('comment deleted');
                                                        }}
                                                        className='block px-4 py-2 text-sm text-red-600'
                                                    >
                                                        Delete
                                                    </button>
                                                </Menu.Item>
                                            )}

                                        </Menu.Items>
                                    </Transition>
                                </Menu>

                            </footer>
                            <p className="text-black dark:text-white">
                                {e?.data().comment}
                            </p>
                            <div className="flex items-center mt-4 space-x-4">
                                <button
                                    type="button"
                                    className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="mr-1 w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                        />
                                    </svg>
                                    Reply
                                </button>
                                <div className="input-feild">
                                    <input
                                        onClick={() => props.setReplyId(`${e?.id}`)}
                                        onChange={(e) =>
                                            props.setReply(e.target.value)
                                        }
                                        type="text" id="first_name" placeholder="write here..." />
                                </div>
                                <button
                                    onClick={props.sendReply}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 dark:stroke-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                    </svg>
                                </button>

                            </div>
                        </div>

                        {/* reply */}
                        {
                            e?.data()?.reply?.map((r) => (
                                <div className="p-2 ml-6 lg:ml-12 text-base bg-white border-l rounded-bl-sm dark:bg-gray-900">
                                    <footer className="flex justify-between items-center mb-2">
                                        <div className="">

                                            <p className="inline-flex mr-3 text-sm text-gray-900 dark:text-white">
                                                <Link
                                                    href={{
                                                        pathname: '/account/profile',
                                                        query: { uid: `${r.uid}` },
                                                    }}
                                                    className='hover:underline'
                                                >
                                                    {r.name}</Link>
                                                <i className="text-secondry mx-2 dark:text-gray-400">replying to</i> <span className="text-primary">
                                                    <Link
                                                        href={{
                                                            pathname: '/account/profile',
                                                            query: { uid: `${e?.data()?.uid}` },
                                                        }}
                                                        className='hover:underline'
                                                    >
                                                        {e.data().username}</Link>
                                                </span>
                                            </p>
                                        </div>

                                        <Menu as="div" className="relative ml-3">
                                            <div
                                                onClick={() => props.setReplyId(`${e?.id}`)}
                                            >
                                                <Menu.Button className="flex rounded-2xl text-sm p-2">
                                                    <span className="sr-only">Comment Setting</span>
                                                    <svg
                                                        className="w-5 h-5 dark:fill-white"
                                                        aria-hidden="true"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                                                    </svg>
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

                                                    {r?.uid != props.session && (
                                                        <>
                                                            <Menu.Item>
                                                                <button
                                                                    className='block px-4 py-2 text-sm text-gray-700'
                                                                >
                                                                    Report
                                                                </button>
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                <button
                                                                    className='block px-4 py-2 text-sm text-gray-700'
                                                                >
                                                                    View Profile
                                                                </button>
                                                            </Menu.Item>
                                                        </>
                                                    )}

                                                    {r?.uid == props.session && (
                                                        <Menu.Item>
                                                            <button
                                                                onClick={async () => {
                                                                    const dbRef = doc(db, props.postTypeKey, props.dbKey, "comments", props.replyId);
                                                                    await updateDoc(dbRef, {
                                                                        reply: arrayRemove(
                                                                            {
                                                                                name: r.name,
                                                                                text: r.text,
                                                                                uid: props.session,
                                                                            }
                                                                        )
                                                                    });

                                                                }}

                                                                className='block px-4 py-2 text-sm text-red-600'
                                                            >
                                                                Delete
                                                            </button>
                                                        </Menu.Item>
                                                    )}

                                                </Menu.Items>
                                            </Transition>
                                        </Menu>

                                        {/* Dropdown menu */}
                                        <div
                                            id="dropdownComment2"
                                            className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                                        >

                                        </div>
                                    </footer>
                                    <p className="text-black dark:text-white"> {r.text}</p>
                                    <div className="flex items-center mt-4 space-x-4">

                                    </div>
                                </div>
                            ))
                        }
                    </article>
                ))
            }

            <Toaster
                position="bottom-center"
            />
        </section>

    )
}