import { onSnapshot, collection, query, orderBy, doc, getDoc, setDoc, serverTimestamp, updateDoc, arrayUnion, arrayRemove, deleteDoc, } from "@firebase/firestore";
import { db } from "../api/auth/firebase-config";
import { useEffect, useState, Fragment, useRef } from "react";
import LoadingP from "../../components/utils/Loading";
import { useSession } from "next-auth/react";
import toast, { Toaster } from 'react-hot-toast';
import Link from "next/link";
import Moment from "react-moment";
import uuid from "react-uuid";
import { Menu, Transition } from '@headlessui/react'
import RelatedPost from "../../components/utils/RelatedPost";

export default function Tool() {
    // sesson for user auth
    const { data: session } = useSession();

    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [stepData, setStepData] = useState();
    const [comentList, setComentList] = useState([]);
    const [dbKey, setDbKey] = useState('qnyvPj9savn1ybpPcame');
    const [user, setUser] = useState();
    const [showStep, setShowStep] = useState('');




    useEffect(() => {
        (() => getResponse())();
    });

    const getResponse = async () => {
        // const urlSearchParams = new URLSearchParams(window.location.search)
        // setDbKey(urlSearchParams.get('key'));


        if (loading2) {
            const docRef = doc(db, "steps", dbKey);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setStepData(docSnap);
                onSnapshot(
                    query(collection(db, "steps", dbKey, "comments"), orderBy("timestamp", "desc")),
                    (snapshot) => {
                        setComentList(snapshot.docs);
                    }
                );
                if (session) {
                    const docRef = doc(db, "users", session.user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setUser(docSnap.data());
                    }
                }

                setLoading2(false);
                setLoading(false);
                console.log('akkk')
            }
        }


    }



    // add Response    
    const [comment, setComment] = useState('');


    const RepsonseData = {
        comment: comment,
        username: user?.name,
        uid: session?.user.uid,
        userImg: user?.profileImg,
        timestamp: serverTimestamp(),
        reply: [],
    }


    const sendComment = async (e) => {
        e.preventDefault();
        if (!session) {
            // router.push('/login');
        } else {
            if (comment != '') {
                await setDoc(doc(db, "steps", dbKey, "comments", `${user?.name}-${uuid()}`), RepsonseData);
                commentbox.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                toast.success('Comment Added');
            }

        }
    }

    const [reply, setReply] = useState('');
    const [replyId, setReplyId] = useState('');
    const commentbox = useRef(null);

    const sendReply = async (e) => {

        e.preventDefault();
        if (!session) {
            // router.push('/login');
        } else {
            if (reply != '') {
                const dbRef = doc(db, "blogs", dbKey, "comments", replyId);
                await updateDoc(dbRef, {
                    reply: arrayUnion(
                        {
                            name: user?.name,
                            text: reply,
                            uid: session?.user.uid,
                        }
                    )
                });
                toast.success('Reply Added');
            } else {
                toast.error('Please Write Something')
            }

        }
    }

    return (
        <>
            {loading ?
                <LoadingP />
                :
                <div className="pt-6 px-3 md:px-24 w-full font-[Urbanist] select-none">

                    <h1 className="font-bold text-2xl dark:text-white">{stepData?.data()?.title}</h1>
                    <p className="mt-1 first-letter:text-sm dark:text-white">{stepData?.data()?.description}</p>
                    <div className="mt-5 flex bg-primary/10 border border-primary p-4 gap-3 rounded-md items-center">
                        <div className="relative">
                            <svg className="h-16 w-16 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-75" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path className="opacity-50 text-white" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className="top-[18.2px] left-4 absolute text-lg font-bold">
                                90%
                            </span>
                        </div>

                        <p className="mt-1">
                            Accurecy, <br />
                            Technican Use This Steps Always
                        </p>
                    </div>
                    <hr className="my-6" />
                    {/* steps body */}
                    {stepData?.data()?.AllSteps.map((e, index) => (
                        <div key={index} className="py-3">
                            <div
                                onClick={() => showStep != e.heading ? setShowStep(e.heading) : setShowStep('')}
                                className="bg-gray-100/50 w-full px-3 py-6 rounded border flex gap-3 items-center hover:bg-primary/10">
                                <h3 className="bg-primary rounded-full w-8 h-8 text-center pt-1 text-white">{index + 1}</h3>
                                <h2 className="font-semibold">{e.heading}</h2>
                                <div
                                    className="ml-auto">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </div>
                            </div>
                            <div className={`${showStep != e.heading && 'hidden'}`}>
                                <ul className="pl-6">
                                    {
                                        e?.flow?.map((j, i) => (
                                            <li
                                                key={i}
                                                className='pt-4 -pt-4 border-l px-2'
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                                </svg>
                                                <h4>{j?.step}</h4>
                                                <ul className="mt-3 flex flex-nowrap gap-3">
                                                    {
                                                        j?.resources?.map((r) => (
                                                            <li className={`${r.name == 'watch video' ? 'bg-red-300' : 'bg-gray-200'} px-3 py-1 rounded-2xl text-sm`}>
                                                                {r?.name}
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    ))}

                    <section className="mt-6 pb-24">
                        <div className="mb-6">
                            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                                knowledge Board
                            </h2>
                            <p className="text-sm text-gray-600">Add Your Thougts & Suggetion To Help Community</p>
                        </div>


                        <form className="mb-6">
                            <div className="py-2 px-2 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                <label htmlFor="comment" className="sr-only">
                                    Your comment
                                </label>
                                <textarea
                                    id="comment"
                                    rows={3}
                                    className="p-2 w-full text-sm text-gray-900 border-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                    placeholder="Write a comment..."
                                    required=""
                                    defaultValue={""}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                onClick={sendComment}
                                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                            >
                                Post comment
                            </button>
                        </form>
                        <div ref={commentbox}></div>
                        {
                            comentList?.map((e) => (

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
                                                <div onClick={() => setReplyId(`${e?.id}`)}>
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

                                                        {e?.data().uid != session?.user?.uid && (
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

                                                        {e?.data().uid == session?.user.uid && (
                                                            <Menu.Item>
                                                                <button
                                                                    onClick={async () => {
                                                                        await deleteDoc(doc(db, "steps", dbKey, "comments", replyId)
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
                                                    onClick={() => setReplyId(`${e?.id}`)}
                                                    onChange={(e) =>
                                                        setReply(e.target.value)
                                                    }
                                                    type="text" id="first_name" placeholder="write here..." />
                                            </div>
                                            <button
                                                onClick={sendReply}
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
                                                            onClick={() => setReplyId(`${e?.id}`)}
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

                                                                {r?.uid != session?.user?.uid && (
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

                                                                {r?.uid == session?.user?.uid && (
                                                                    <Menu.Item>
                                                                        <button
                                                                            onClick={async () => {
                                                                                const dbRef = doc(db, "steps", dbKey, "comments", replyId);
                                                                                await updateDoc(dbRef, {
                                                                                    reply: arrayRemove(
                                                                                        {
                                                                                            name: r.name,
                                                                                            text: r.text,
                                                                                            uid: session?.user.uid,
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
                            reverseOrder={false}
                        />

                    </section>

                </div>
            }

            <div className="w-1/4">

            </div>

        </>
    )
}