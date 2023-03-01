import { ArticleJsonLd, HowToJsonLd, NextSeo } from "next-seo";

import { onSnapshot, collection, query, doc, getDoc, setDoc, serverTimestamp, updateDoc, arrayUnion, deleteDoc, getDocs } from "@firebase/firestore";
import { db } from "../api/auth/firebase-config";
import { useEffect, useState } from "react";
import LoadingP from "../../components/utils/Loading";
import { useSession } from "next-auth/react";
import toast, { Toaster } from 'react-hot-toast';
import uuid from "react-uuid";
import { useRouter } from "next/router";
import ShareBtns from "../../components/utils/shareBtns";
import Discussion from "../../components/post/discussion";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";


const Steps = ({ post, allComments, notFound }: any) => {
    // sesson for user auth
    const { data: session } = useSession();

    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);

    const [dbKey, setDbKey] = useState('qnyvPj9savn1ybpPcame');
    const [user, setUser] = useState();
    const [showStep, setShowStep] = useState('');

    // vote length
    const [voteUpLength, setVoteUpLength] = useState([]);
    const [voteDownLength, setVoteDownLength] = useState([]);

    // 
    const [holdVote, setholdVote] = useState(0);
    const router = useRouter();
    const [commentId] = useState(uuid());

    useEffect(() => {
        (() => getResponse())();
    });

    const getResponse = async () => {
        if (!notFound) {
            if (loading2) {

                if (session) {
                    const docRef = doc(db, "users", session?.user?.uid as string);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setUser(docSnap.data());
                        setLoading2(false);
                    }
                }
                // upvote

                onSnapshot(
                    query(collection(db, "steps", post.stepId, "upVote")),
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
                    query(collection(db, "steps", post.stepId, "downVote")),
                    (snapshot) => {
                        setVoteDownLength(snapshot.docs);
                        if (voteDownLength.findIndex((like) => like.id === session?.user?.uid) !== -1) {
                            setholdVote(
                                2
                            )
                        }
                    }
                )

                setLoading(false);
            }

        }

    }

    // add Response    
    const [comment, setComment] = useState('');

    const sendComment = async (e: any) => {
        e.preventDefault();
        if (!session) {
            // router.push('/login');
        } else {
            const RepsonseData = {
                comment: comment,
                commentId: commentId,
                username: user?.name,
                uid: session?.user.uid,
                userImg: user?.profileImg,
                timestamp: serverTimestamp(),
                reply: [],
            }

            if (comment != '') {
                await setDoc(doc(db, "steps", post.stepId, "comments", commentId), RepsonseData);
                toast.success('Comment Added');
                setComment('');
                window.location.reload();
            }

        }
    }

    const [reply, setReply] = useState('');
    const [replyId, setReplyId] = useState('');

    const sendReply = async (e: any) => {

        e.preventDefault();
        if (!session) {
            // router.push('/login');
        } else {
            if (reply != '') {
                const dbRef = doc(db, "steps", post.stepId, "comments", replyId);
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
                window.location.reload();
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



    return (
        <>

            <NextSeo
                title={post.title}
                description={post.description}
                canonical={`https://repair-skills.vercel.app/steps/${post.stepId}`}
                openGraph={{
                    url: `https://repair-skills.vercel.app/steps/${post.stepId}`,
                    title: post.title,
                    description: post.description,
                    images: [
                        {
                            url: post.img,
                            width: 800,
                            height: 600,
                            alt: `${post.title} - RepairSkills`,
                            type: 'image/jpeg',
                        },

                        { url: post.img },
                    ],
                    siteName: 'RepairSkills',
                }}
                facebook={{
                    appId: '1641619032945210',
                }}
                twitter={{
                    handle: '@handle',
                    site: '@site',
                    cardType: 'summary_large_image',
                }
                }
            />

            <Head>
                <script
                    key="structured-data"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: post.schema,
                    }}
                />
            </Head>

            {
                notFound ? <p className="mt-32 text-center">page not found</p>
                    :

                    <>

                        {loading ?
                            <LoadingP />
                            :
                            <div className="mx-auto md:w-1/2 pt-6 px-3 md:px-24 w-full font-[Urbanist] select-none">

                                <h1 className="font-bold text-2xl dark:text-white">{post.title}</h1>
                                <p className="mt-1 first-letter:text-lg text-gray-800 dark:text-white">{post.description}</p>
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
                                {post.AllSteps.map((e: any, index: number) => (
                                    <div key={index} className="py-3">
                                        <div
                                            onClick={() => showStep != e.heading ? setShowStep(e.heading) : setShowStep('')}
                                            className="bg-gray-100/50 dark:bg-gray-800 w-full px-3 py-6 rounded border flex gap-3 items-center hover:bg-primary/10">
                                            <span className="bg-primary rounded-full w-8 h-8 text-center pt-1 text-white">{index + 1}</span>
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
                                                    e?.flow?.map((j: any, i: number) => (
                                                        <li
                                                            key={i}
                                                            className='pt-4 -pt-4 border-l px-2'
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                                            </svg>
                                                            <h3>{j?.step}</h3>
                                                            <ul className="mt-3 flex flex-nowrap gap-3">
                                                                {
                                                                    j?.resources?.map((r) => (
                                                                        <li className={`${r.name == 'watch video' ? 'bg-red-300' : 'bg-gray-200'} px-3 py-1 rounded-2xl text-sm dark:bg-gray-800 select-none`}>
                                                                            <Link
                                                                                href={r?.link}
                                                                            >
                                                                                {r?.name}
                                                                            </Link>
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
                                                required
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


                                    <Discussion CommentList={allComments} setReplyId={setReplyId} session={session?.user?.uid} sendReply={sendReply} setReply={setReply} dbKey={post.stepId} db={db} doc={doc} replyId={replyId} postTypeKey='steps' />
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
            }

        </>
    )
}


export async function getServerSideProps(context: GetServerSidePropsContext) {

    try {
        const stepRef = doc(db, 'steps', context.query.id as string);
        const getSteps = await getDoc(stepRef);


        const q = query(collection(db, "steps", context.query.id as string, 'comments'));
        const querySnapshot = await getDocs(q);

        const allComment = querySnapshot.docs.map(docSnap => {
            return {
                ...docSnap.data(),
                timestamp: docSnap.data().timestamp.toMillis(),
            }
        })


        return {
            props: {
                post: {
                    ...getSteps.data(),
                    timestamp: getSteps.data().timestamp.toMillis(),
                },
                allComments: allComment,
            },
        };
    } catch (error) {
        return {
            props: {
                notFound: true,
            },
        };
    }

}


export default Steps;