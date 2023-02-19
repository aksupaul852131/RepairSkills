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
import ShareBtns from "../../../components/utils/shareBtns";
import Discussion from "../../../components/post/discussion";
import Head from "next/head";

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

                <>


                    <Head>

                        <title>{`${article?.data()?.title} - RepairSkills`}</title>
                        <link rel="icon" href="/favicon.ico" />

                        <meta charset="UTF-8" />
                        <meta name="description"
                            content={article?.data()?.description} />

                        <meta name="author"
                            content={article?.data()?.username} />
                        <meta name="viewport"
                            content="width=device-width, initial-scale=1.0" />

                        {/* og graph */}

                        {/* <meta property="og:title" content={`${article?.data()?.title} - RepairSkills`} />
                        <meta property="og:site_name" content="RepairSkills" />
                        <meta property="og:url" content={window.location.href} />
                        <meta property="og:description" content={article?.data()?.description} />
                        <meta property="og:type" content="article" />
                        <meta property="og:image" content={article?.data()?.postImg} /> */}
                        <meta http-equiv="etag" content="2efdc27c8967f14e2c829e601f7a1228" />
                        <meta property="og:title" content="South Jersey Aerial Photograpahy" />
                        <meta property="og:type" content="website" />
                        <meta property="og:url" content={window.location.href} />
                        <meta property="og:image" content="https://static.example.com/media/56a444_9273e80a60684dc8b38e56025059f356%7Emv2_d_3200_1800_s_2.png" />
                        <meta property="og:site_name" content="South Jersey Aerial Photograpahy" />
                        <meta property="og:description" content="South Jersey Aerial Photography is South Jersey's premier aerial photography and aerial videography company. Fully licensed and insured. Contact us today!" />
                        <meta name="SKYPE_TOOLBAR" content="SKYPE_TOOLBAR_PARSER_COMPATIBLE" />

                        {/* schema */}

                        <script
                            key="structured-data"
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{
                                __html: JSON.stringify(
                                    {
                                        "@context": "https://schema.org",
                                        "@type": "Article",
                                        "mainEntityOfPage": {
                                            "@type": "WebPage",
                                            "@id": "https://repair-skills.vercel.app"
                                        },
                                        "headline": `${article?.data()?.title} - RepairSkills`,
                                        "description": article?.data()?.description,
                                        "image": article?.data()?.postImg,
                                        "author": {
                                            "@type": "Person",
                                            "name": article?.data()?.username,
                                            "url": `https://repair-skills.vercel.app/account/profile?uid=${article?.data()?.uid}`
                                        },
                                        "publisher": {
                                            "@type": "Organization",
                                            "name": "RepairSkills",
                                            "logo": {
                                                "@type": "ImageObject",
                                                "url": "https://repair-skills.vercel.app/RepairSkills.png"
                                            }
                                        },

                                    }
                                )
                            }}
                        />
                    </Head>
                    <div className="pt-6 px-3 md:px-24 w-full font-[Urbanist]">
                        <article>
                            <h1 className="font-bold text-2xl dark:text-white">{article?.data()?.title}</h1>
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
                                                await navigator.clipboard.writeText(window.location.href);
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
                            <ShareBtns windowLoc={window.location.href} />
                        </article>

                        <section className="mt-6 pb-24">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                                    Discussion ({comentList.length})
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
                                        required
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

                            <Discussion CommentList={comentList} setReplyId={setReplyId} session={session?.user?.uid} sendReply={sendReply} setReply={setReply} dbKey={dbKey} db={db} doc={doc} replyId={replyId} postTypeKey='blogs' />

                            <Toaster
                                position="bottom-center"
                                reverseOrder={false}
                            />

                        </section>
                        {/* related post */}
                        <section className="pb-24">
                            <h2 className="text-black dark:text-white">Related Updates</h2>
                            <RelatedPost title={article.data().title} refrehPage={setLoading2} />
                        </section>
                    </div>
                </>
            }

            <div className="w-1/4">

            </div>

        </>
    )
}