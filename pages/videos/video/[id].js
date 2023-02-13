import { onSnapshot, collection, query, orderBy, doc, getDoc, setDoc, serverTimestamp, updateDoc, arrayUnion, arrayRemove, deleteDoc, } from "@firebase/firestore";
import { db } from "../../api/auth/firebase-config";
import { useEffect, useState, Fragment, useRef } from "react";
import LoadingP from "../../../components/utils/Loading";
import { useSession } from "next-auth/react";
import toast, { Toaster } from 'react-hot-toast';
import Link from "next/link";
import Moment from "react-moment";
import uuid from "react-uuid";
import { Menu, Transition } from '@headlessui/react'
import RelatedPost from "../../../components/utils/RelatedPost";
import RelatedVideo from "../../../components/utils/RelateVideo";

export default function Video() {
    // sesson for user auth
    const { data: session } = useSession();

    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [readmore, setReadmore] = useState(40);

    const [comentList, setComentList] = useState([]);
    const [dbKey, setDbKey] = useState('test-&id=b69b22d9-3660-99de-3f53-fbc13f21fd1a');
    const [user, setUser] = useState();

    const [video, setVideo] = useState();
    const [viewLoad, setViewLoad] = useState(true);

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


        if (loading2) {
            const docRef = doc(db, "videos", dbKey);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setVideo(docSnap);

                onSnapshot(
                    query(collection(db, "videos", dbKey, "comments"), orderBy("timestamp", "desc")),
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
        if (!session) {
            // router.push('/login');
        } else {
            if (comment != '') {
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
        if (!session) {
            // router.push('/login');
        } else {
            if (reply != '') {
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
            if (voteUpLength.findIndex((like) => like.id === session?.user?.uid) !== -1) {
                setholdVote(
                    1
                )
            } else if (voteDownLength.findIndex((like) => like.id === session?.user?.uid) !== -1) {
                setholdVote(
                    2
                )
            }
        },
        [voteUpLength, voteDownLength]
    );


    //  do things
    const likePost = async () => {
        if (!session) {
            router.push('/login');
        } else {
            if (holdVote == 0 || holdVote == 2) {
                setholdVote(1);
                await deleteDoc(doc(db, "videos", video?.data()?.videoId, "downVote", session.user.uid));
                await setDoc(doc(db, "videos", video?.data()?.videoId, "upVote", session.user.uid), {
                    username: session.user.name,
                });
            }
        }
    };



    const downV = async () => {
        if (!session) {
            router.push('/login');
        } else {
            if (holdVote == 0 || holdVote == 1) {
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

                                <div className="aspect-w-16 aspect-h-9">
                                    <iframe src={`https://www.youtube.com/embed/${video?.data()?.urlId}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                </div>

                                <div className="py-4 px-3">
                                    <p className="flex text-gray-600 dark:text-gray-200 text-xs">
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
                                    </p>
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

                                {/* share */}
                                <div className=" px-3 flex justify-between text-black dark:text-white">
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
                            </div>


                            {/* related post */}
                            <section className="pb-24 px-3 col-span-3 md:col-span-2">

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
                </div>
            }


        </>
    )
}