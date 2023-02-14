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
import RelatedVideo from "../../components/utils/RelateVideo";
import { useRouter } from "next/router";
import ShareModalBox from '../../components/model/share'

export default function Video() {
    // sesson for user auth
    const { data: session } = useSession();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [readmore, setReadmore] = useState(40);

    const [comentList, setComentList] = useState([]);
    const [dbKey, setDbKey] = useState('test-&id=b69b22d9-3660-99de-3f53-fbc13f21fd1a');
    const [user, setUser] = useState();

    const [video, setVideo] = useState();
    const [viewLoad, setViewLoad] = useState(true);
    const [share, setShare] = useState(false);

    //

    // vote length
    const [voteUpLength, setVoteUpLength] = useState([]);
    const [voteDownLength, setVoteDownLength] = useState([]);

    // 
    const [holdVote, setholdVote] = useState(0);


    useEffect(() => {
        (() => getResponse())();
    });

    const getResponse = async () => {
        const urlSearchParams = new URLSearchParams(window.location.search)
        setDbKey(urlSearchParams.get('key'));


        if(loading2) {
            const docRef = doc(db, "videos", dbKey);
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()) {
                setVideo(docSnap);

                onSnapshot(
                    query(collection(db, "videos", dbKey, "comments"), orderBy("timestamp", "desc")),
                    (snapshot) => {
                        setComentList(snapshot.docs);
                    }
                );
                if(session) {
                    const docRef = doc(db, "users", session.user.uid);
                    const docSnap = await getDoc(docRef);
                    if(docSnap.exists()) {
                        setUser(docSnap.data());
                    }
                }

                // upvote

                onSnapshot(
                    query(collection(db, "videos", dbKey, "upVote")),
                    (snapshot) => {
                        setVoteUpLength(snapshot.docs);

                    },
                );

                onSnapshot(
                    query(collection(db, "videos", dbKey, "downVote")),
                    (snapshot) => {
                        setVoteDownLength(snapshot.docs);
                    }
                )


                setTimeout(() => {
                    updateDoc(doc(db, "videos", dbKey), {
                        views: viewLoad ? docSnap.data().views + 1 : docSnap.data().views + 0,
                    },
                    );
                }, 5000);

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
        if(!session) {
            // router.push('/login');
        } else {
            if(comment != '') {
                await setDoc(doc(db, "videos", video?.data()?.videoId, "comments", `${user?.name}-${uuid()}`), RepsonseData);
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
        if(!session) {
            // router.push('/login');
        } else {
            if(reply != '') {
                const dbRef = doc(db, "videos", video?.data()?.videoId, "comments", replyId);
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


    // voting



    // fetch post vote length
    // only for bg color of vote btn
    useEffect(
        () => {
            if(voteUpLength.findIndex((like) => like.id === session?.user?.uid) !== -1) {
                setholdVote(
                    1
                )
            } else if(voteDownLength.findIndex((like) => like.id === session?.user?.uid) !== -1) {
                setholdVote(
                    2
                )
            }
        },
        [voteUpLength, voteDownLength]
    );


    //  do things
    const likePost = async () => {
        if(!session) {
            router.push('/login');
        } else {
            if(holdVote == 0 || holdVote == 2) {
                setholdVote(1);
                await deleteDoc(doc(db, "videos", video?.data()?.videoId, "downVote", session.user.uid));
                await setDoc(doc(db, "videos", video?.data()?.videoId, "upVote", session.user.uid), {
                    username: session.user.name,
                });
            }
        }
    };



    const downV = async () => {
        if(!session) {
            router.push('/login');
        } else {
            if(holdVote == 0 || holdVote == 1) {
                setholdVote(2);
                await deleteDoc(doc(db, "videos", video?.data()?.videoId, "upVote", session.user.uid));
                await setDoc(doc(db, "videos", video?.data()?.videoId, "downVote", session.user.uid), {
                    username: session.user.name,
                });
            }
        }
    };


    return (
        <>
            {loading ?
                <LoadingP />
                :


                <div className="pt-0 md:pt-6 md:px-8 lg:px-28 w-full font-[Urbanist] select-none">
                    <article>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 lg:gap-8">
                            <div className="col-span-3">
                                {/* <img src='https://img.youtube.com/vi/D_vOqkEgmY0/mqdefault.jpg' className="w-full h-54 lg:h-72" /> */}

                                <div className="aspect-w-16 aspect-h-9 sticky top-16">
                                    <iframe src={`https://www.youtube.com/embed/${video?.data()?.urlId}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                </div>

                                <div className="py-4 px-3">
                                    <div className="flex text-gray-600 dark:text-gray-200 text-xs">
                                        {/* time */}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="font-light ml-1"> <Moment fromNow>{video?.data()?.timestamp?.toDate()}</Moment></span>
                                        {/* views */}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 ml-3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>

                                        <span className="font-light ml-1">{video?.data()?.views} Views</span>

                                        {video?.data()?.tags[0] && (
                                            <span className="text-primary ml-2">
                                                #{video?.data()?.tags[0]}
                                            </span>
                                        )}
                                    </div>
                                    <h1 className="mt-2 text-md dark:text-white">{video.data().title}</h1>
                                    <div className="mt-3 flex justify-between items-center">
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                likePost();
                                            }}
                                            className={`${holdVote == 1 && `bg-primary text-white`}dark:bg-gray-800 dark:text-white rounded-full p-2 flex gap-1 items-center`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                                            </svg>
                                            {voteUpLength.length > 0 && (
                                                <span
                                                >
                                                    {voteUpLength.length}
                                                </span>
                                            )}
                                        </div>

                                        <div className='h-1 mx-4 w-full bg-gray-300 flex'>
                                            <div
                                                style={{ width: `${100 * voteUpLength.length}%` }}
                                                className={`h-full ${80 < 70 ? 'bg-red-600' : 'bg-green-600'}`}>
                                            </div>
                                            <div
                                                style={{ width: `${100 * voteDownLength.length}%` }}
                                                className={`h-full ${50 < 70 ? 'bg-red-600' : 'bg-green-600'} ml-auto`}>
                                            </div>
                                        </div>

                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                downV();
                                            }}
                                            className={`${holdVote == 2 && `bg-primary text-white`}dark:bg-gray-800 dark:text-white rounded-full p-2 flex gap-1 items-center`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
                                            </svg>
                                            {voteDownLength.length > 0 && (
                                                <span
                                                >
                                                    {voteDownLength.length}
                                                </span>
                                            )}
                                        </div>

                                    </div>
                                    <p className={`mt-2 text-sm text-gray-700 dark:text-gray-300`}>
                                        {video.data().description.substring(0, readmore)}
                                        {
                                            video.data().description.length > 100 && (
                                                <span
                                                    onClick={() => readmore == 40 ? setReadmore(video.data().description.length) : setReadmore(40)}
                                                    className="text-primary ml-2">{readmore == 40 ? '...show more' : 'show less'}</span>
                                            )

                                        }
                                    </p>

                                </div>

                                {/* profile - share */}
                                <div className="px-3 text-black dark:text-white">
                                    <div className="flex  justify-between">

                                        <div className="flex flex-shrink-0 pb-0">
                                            <Link
                                                href={{
                                                    pathname: '/account/profile',
                                                    query: { uid: `${video.data()?.id}` },
                                                }}
                                                className="flex-shrink-0 group block">
                                                <div className="flex items-top">
                                                    <div>
                                                        <img
                                                            className="inline-block h-8 w-8 rounded-full"
                                                            src={video.data()?.userImg}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-base leading-6 font-medium text-gray-800 dark:text-white">
                                                            {video?.data()?.username}
                                                        </p>

                                                    </div>
                                                </div>
                                            </Link>
                                        </div>



                                        <button
                                            onClick={() => share ? setShare(false) : setShare(true)}
                                            className="border px-2 py-1 rounded flex gap-1 items-center flex-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                                            </svg>

                                            <span className="text-xs">Share</span>
                                        </button>
                                    </div>

                                </div>
                                <hr className="mt-6" />
                            </div>


                            {/* related post */}
                            <section className="pb-24 px-2 col-span-3 md:col-span-2">

                                <RelatedVideo videoId={video.data().videoId} refrehPage={setLoading2} viewCounter={setViewLoad} />
                            </section>
                        </div>

                    </article>

                    <section className="pb-24 px-3">
                        <div className="grid grid-cols-1 lg:grid-cols-5">
                            <div className="col-span-3">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="mt-2 text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                                        Discussion ({comentList?.length})
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
                                                                                await deleteDoc(doc(db, "videos", video?.data()?.videoId, "comments", replyId)
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
                                                                                        const dbRef = doc(db, "videos", video?.data()?.videoId, "comments", replyId);
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
                            </div>
                            <div className="col-span-2">

                            </div>
                        </div>

                    </section>
                    <Toaster
                        position="bottom-center"
                        reverseOrder={false}
                    />
                    <ShareModalBox showModel={share} closeModel={setShare} shareLink={`${window.location.hostname}/videos/m?key=${video.data().videoId}`} />
                </div>
            }


        </>
    )
}