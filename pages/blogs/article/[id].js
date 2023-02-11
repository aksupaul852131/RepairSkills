import { onSnapshot, collection, query, orderBy, doc, getDoc, setDoc, serverTimestamp, updateDoc, arrayUnion, arrayRemove, deleteDoc, } from "@firebase/firestore";
import { db } from "../../api/auth/firebase-config";
import { useEffect, useState, Fragment, useRef } from "react";
import LoadingP from "../../../components/utils/Loading";
import { useSession } from "next-auth/react";
import toast, { Toaster } from 'react-hot-toast';
import Link from "next/link";
import Moment from "react-moment";
import uuid from "react-uuid";
import { Disclosure, Menu, Transition } from '@headlessui/react'
import RelatedPost from "../../../components/blog/RelatedPost";

export default function Tool() {
    // sesson for user auth
    const { data: session } = useSession();

    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [article, setArticle] = useState();
    const [comentList, setComentList] = useState([]);
    const [dbKey, setDbKey] = useState('acGasRefilling');
    const [user, setUser] = useState();



    useEffect(() => {
        (() => getResponse())();
    });

    const getResponse = async () => {
        const urlSearchParams = new URLSearchParams(window.location.search)
        setDbKey(urlSearchParams.get('key'));


        if (loading2) {
            const docRef = doc(db, "blogs", dbKey);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setArticle(docSnap);

                onSnapshot(
                    query(collection(db, "blogs", dbKey, "comments"), orderBy("timestamp", "desc")),
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
                await setDoc(doc(db, "blogs", article.data().articleId, "comments", `${user?.name}-${uuid()}`), RepsonseData);
                commentbox.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                toast.success('Comment Added');
            }

        }
    }

    //  const [replyId, setReplyId] = useState('');

    const [reply, setReply] = useState('');
    const [replyId, setReplyId] = useState('');
    const commentbox = useRef(null);

    const sendReply = async (e) => {
        console.log('sssss', replyId)
        e.preventDefault();
        if (!session) {
            // router.push('/login');
        } else {
            if (reply != '') {
                const dbRef = doc(db, "blogs", article.data().articleId, "comments", replyId);
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


                <div className="pt-6 px-3 w-full font-[Urbanist] select-none">
                    <article>
                        <h1 className="font-bold text-2xl dark:text-white">{article.data().title}</h1>
                        <p className="mt-2 text-secondry dark:text-gray-100">By <Link
                            href={{
                                pathname: '/account/profile',
                                query: { uid: `${article?.data()?.uid}` },
                            }}
                            className="text-primary hover:underline">{article.data().username} </Link>
                            at <Moment fromNow>{article?.data()?.timestamp?.toDate()}</Moment>
                        </p>
                        <div className="mt-4 flex justify-between text-black dark:text-white">
                            <div className="flex gap-2">
                                <Link
                                    href={
                                        `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`
                                    }
                                    className="border px-2 py-1 rounded flex gap-1 items-center">
                                    <svg
                                        class="w-5 h-5 fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                                        />
                                    </svg>
                                    <span className="text-xs">share</span>
                                </Link>

                                <Link
                                    href={
                                        `whatsapp://send?text=${window.location.href}`
                                    }
                                    className="border px-2 py-1 rounded flex gap-1 items-center">
                                    <svg
                                        class="w-6 h-6 fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512">
                                        <path
                                            d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                                        ></path>
                                    </svg>
                                    <span className="text-xs">Whatsapp</span>
                                </Link>

                                <button
                                    onClick={async (e) => {
                                        try {
                                            await navigator.clipboard.writeText('copyMe');
                                            toast.success('link Copied')
                                        }
                                        catch (err) {
                                        }

                                    }}
                                    className="border px-2 py-1 rounded flex gap-1 items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
                                    </svg>
                                    <span className="text-xs">CopyLink</span>
                                </button>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.1} stroke="currentColor" className="w-8 h-8 stroke-gray-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                            </svg>
                        </div>
                        <hr className="mt-6" />


                        <div className="single-article pb-24">
                            <img src={article.data().postImg} className='max-h-64 object-cover rounded-md' />
                            <div dangerouslySetInnerHTML={{ __html: article.data().body }} />
                        </div>

                    </article>

                    <section className="pb-24">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                                Discussion (20)
                            </h2>
                        </div>


                        <form className="mb-6">
                            <div className="py-2 px-2 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                <label htmlFor="comment" className="sr-only">
                                    Your comment
                                </label>
                                <textarea
                                    id="comment"
                                    rows={5}
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
                                    <div className='px-3 py-3 bg-gray-200 dark:bg-gray-800 rounded'>
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
                                                                        await deleteDoc(doc(db, "blogs", article.data().articleId, "comments", replyId)
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
                                                                                const dbRef = doc(db, "blogs", article.data().articleId, "comments", replyId);
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
                    {/* related post */}
                    <section className="pb-24">
                        <h2 className="text-black dark:text-white">Related Updates</h2>
                        <RelatedPost />
                    </section>
                </div>
            }

            <div className="w-1/4">

            </div>

        </>
    )
}