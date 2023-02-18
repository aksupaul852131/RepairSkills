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
import { useRouter } from "next/router";
import ShareBtns from "../../components/utils/shareBtns";
import Discussion from "../../components/post/discussion";


export default function Tool() {
    // sesson for user auth
    const { data: session } = useSession();

    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [stepData, setStepData] = useState();
    const [comentList, setComentList] = useState([]);
    const [dbKey, setDbKey] = useState('s');
    const [user, setUser] = useState();
    const [showStep, setShowStep] = useState('');

    // vote length
    const [voteUpLength, setVoteUpLength] = useState([]);
    const [voteDownLength, setVoteDownLength] = useState([]);

    // 
    const [holdVote, setholdVote] = useState(0);
    const router = useRouter();



    useEffect(() => {
        (() => getResponse())();
    });

    const getResponse = async () => {
        const urlSearchParams = new URLSearchParams(window.location.search)
        setDbKey(urlSearchParams.get('key'));


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
                // upvote

                onSnapshot(
                    query(collection(db, "steps", dbKey, "upVote")),
                    (snapshot) => {
                        setVoteUpLength(snapshot.docs);
                        if (voteUpLength.findIndex((like) => like.id === session?.user?.uid) !== -1) {
                            setholdVote(
                                1
                            )
                        }
                    },
                );

                onSnapshot(
                    query(collection(db, "steps", dbKey, "downVote")),
                    (snapshot) => {
                        setVoteDownLength(snapshot.docs);
                        if (voteDownLength.findIndex((like) => like.id === session?.user?.uid) !== -1) {
                            setholdVote(
                                2
                            )
                        }
                    }
                )
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
                setComment('');
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
                const dbRef = doc(db, "steps", dbKey, "comments", replyId);
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

    //  do things
    const likePost = async () => {
        if (!session) {
            router.push('/login');
        } else {
            if (holdVote == 0 || holdVote == 2) {
                setholdVote(1);
                await deleteDoc(doc(db, "steps", dbKey, "downVote", session.user.uid));
                await setDoc(doc(db, "steps", dbKey, "upVote", session.user.uid), {
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
                await deleteDoc(doc(db, "steps", dbKey, "upVote", session.user.uid));
                await setDoc(doc(db, "steps", dbKey, "downVote", session.user.uid), {
                    username: session.user.name,
                });
            }
        }
    };


    const shareBtn = [
        {
            icon: <svg
                class="w-10 h-6 text-white fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
            </svg>,
            link: 'https://www.facebook.com/sharer.php?u=',
            bgColor: 'bg-blue-600',
        },
        {
            icon: <svg
                class="w-6 h-6 text-white fill-current mx-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path
                    d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                />
            </svg>,
            link: 'https://twitter.com/intent/tweet?url=',
            bgColor: 'bg-blue-500',
        },
        {
            icon: <svg
                class="w-10 h-6 text-white fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512">
                <path
                    d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                ></path>
            </svg>,
            link: 'https://api.whatsapp.com/send?text=',
            bgColor: 'bg-green-600',
        },
    ]

    return (
        <>
            {loading ?
                <LoadingP />
                :
                <div className="pt-6 px-3 md:px-24 w-full font-[Urbanist] select-none">

                    <h1 className="font-bold text-2xl dark:text-white">{stepData?.data()?.title}</h1>
                    <p className="mt-1 first-letter:text-lg text-gray-800 dark:text-white">{stepData?.data()?.description}</p>
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
                    <hr className="my-3" />
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

                    <section className="mt-6 border px-2 py-5">
                        <div className="mb-6">
                            <h3 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                                Vote For Sure!
                            </h3>

                        </div>
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
                    </section>

                    <ShareBtns windowLoc={window.location.href} />
                    <section className="mt-6 pb-24">
                        <div className="mb-6">
                            <h3 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                                knowledge Board
                            </h3>
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



                        <Discussion CommentList={comentList} setReplyId={setReplyId} session={session?.user?.uid} sendReply={sendReply} setReply={setReply} dbKey={dbKey} db={db} doc={doc} replyId={replyId} />






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