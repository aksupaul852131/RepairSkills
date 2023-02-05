import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
} from "@firebase/firestore";

import EditorX from '../utils/editorX';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import Moment from "react-moment";
import { db } from "../../pages/api/auth/firebase-config";
import Comment from './Response'


// toast import
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// modal
import ShareModalBox from '../model/share';
import uuid from "react-uuid";
import Link from "next/link";




function Post({ id, post }) {

    // sesson for user auth
    const { data: session } = useSession();

    // comment state
    const [comments, setComments] = useState([]);

    // vote length
    const [voteUpLength, setVoteUpLength] = useState([]);
    const [voteDownLength, setVoteDownLength] = useState([]);

    // 
    const [holdVote, setholdVote] = useState(0);
    const router = useRouter();
    const [share, setShare] = useState(false);


    // fetch post vote length
    useEffect(
        () => {

            onSnapshot(collection(db, "posts", id, "upVote"), (snapshot) =>
                setVoteUpLength(snapshot.docs)
            );
            onSnapshot(collection(db, "posts", id, "downVote"), (snapshot) =>
                setVoteDownLength(snapshot.docs)
            );

        },
        [db, id]
    );


    // only for bg color of vote btn colors
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
        [voteUpLength]
    );


    //  voting fuctions
    const likePost = async () => {
        if (!session) {
            router.push('/login');
        } else {
            if (holdVote == 0 || holdVote == 2) {
                setholdVote(1);
                await deleteDoc(doc(db, "posts", id, "downVote", session?.user.uid));
                await setDoc(doc(db, "posts", id, "upVote", session?.user.uid), {
                    username: session?.user.name,
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
                await deleteDoc(doc(db, "posts", id, "upVote", session.user.uid));
                await setDoc(doc(db, "posts", id, "downVote", session.user.uid), {
                    username: session.user.name,
                });
            }
        }
    };


    // fetch comments
    useEffect(
        () =>
            onSnapshot(
                query(
                    collection(db, "posts", id, "comments"),
                    orderBy("timestamp", "desc")
                ),
                (snapshot) => setComments(snapshot.docs)
            ),
        [db, id]
    );


    // add Response    
    const [response, setResponse] = useState('');

    // for unique id
    const [respondId, setRespondId] = useState(uuid());

    const RepsonseData = {
        comment: response,
        username: session?.user.name,
        userid: session?.user.uid,
        tag: session?.user.tag,
        userImg: session?.user.image,
        id: `${session?.user.name}-${respondId}`,
        timestamp: serverTimestamp(),
    }


    const sendComment = async (e) => {
        e.preventDefault();
        if (!session) {
            router.push('/login');
        } else {
            if (response != '') {
                await setDoc(doc(db, "posts", id, "comments", `${session?.user.name}-${respondId}`), RepsonseData);
                toast("Comment Added");
                setRespondId(uuid());
            }
            setResponse('');
        }
    }


    // scroll to comment
    const commentbox = useRef(null);
    const executeScroll = () => commentbox.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

    return (
        <div
            className="font-[Urbanist] pb-8">
            <div>
                <img
                    src={post?.image}
                    alt=""
                    className="max-h-[600px] w-full bg-white object-cover"
                    onClick={() => router.push(`/quetion/${id}`)}
                />
            </div>


            <div className="mt-6 px-4 md:px-0 w-full flex">
                <img
                    src={post?.userImg}
                    alt=""
                    className="h-11 w-11 rounded-full mr-4"
                />
                <div>
                    <div className="flex">
                        <h4
                            className={`font-bold text-[15px] sm:text-base text-black group-hover:underline inline-block`}
                        >
                            {post?.username}
                        </h4>

                        {/* username */}
                        <span
                            className={`text-sm sm:text-[15px] ml-2`}
                        >
                            @{post?.tag}
                        </span>
                    </div>
                    {/* post time */}
                    <span className="hover:underline text-gray-600 text-sm sm:text-[15px]">
                        <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                    </span>
                </div>
                <div className="icon group flex-shrink-0 ml-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-gray-600 mt-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                </div>
            </div>

            {/* post text */}
            <p className="px-4 md:px-0 text-gray-700 text-lg font-semibold my-3 ml-1">
                {post?.text}
            </p>

            <div className="flex flex-col space-y-2 w-full">
                {/* buttons */}
                <div className={`text-[#6e767d] flex items-center justify-between py-2 px-4 md:px-0 gap-2`}>

                    {/* up */}
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            likePost();
                        }}
                        className={`w-full justify-center rounded-full px-3 py-2 flex gap-2 ${holdVote == 1 ? `bg-primary text-white` : `bg-gray-100`}`}>
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

                    {/* down */}
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            downV();
                        }}
                        className={`w-full justify-center rounded-full px-3 py-2 flex gap-2 ${holdVote == 2 ? `bg-primary text-white` : `bg-gray-100`}`}>
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
                    {/*share btn */}
                    <div
                        onClick={() => share ? setShare(false) : setShare(true)}
                        className="w-full justify-center rounded-full px-3 py-2 bg-gray-100 flex icon group ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                        </svg>
                    </div>

                    <ShareModalBox showModel={share} closeModel={setShare} />
                </div>


                {/* scroll btn */}
                <div
                    onClick={executeScroll}
                    className="bg-black text-center rounded-full p-3 mx-4 md:mx-0 text-white">
                    <span>Add a Response</span>
                </div>


                {/* all coments */}

                <h4 className="pt-8 pb-2 text-lg font-semibold mx-4">Users Repsonse</h4>

                {/*ALl Comments */}
                {comments.length > 0 && (
                    <div className="pb-16">
                        {comments.map((comment) => (<>
                            <Comment
                                id={comment.id}
                                key={comment.id}
                                postid={id}
                                commentAuthor={session.user.uid}
                                comment={comment.data()}
                            />

                        </>
                        ))}
                    </div>
                )}


                {/* add comments */}
                <form className="border shadow mx-2 min-h-24 pb-24" ref={commentbox}>
                    <h4 className="text-lg font-semibold my-5 mx-4">Add A Response</h4>
                    <EditorX onChangeResponse={setResponse} />
                </form>
                <div className="mt-16"></div>
                <div onClick={sendComment} className="bg-primary rounded text-white text-center mx-2 p-3 font-semibold">
                    Send
                </div>
                {
                    session?.user?.name ?

                        <p className="text-center text-xs mt-4">This Reply as <span className="text-primary">{session?.user?.name}</span></p>
                        :
                        <p className="text-center text-xs mt-4">you can not Reply <Link href='/login' className="text-primary">please login</Link></p>
                }
            </div>

            {/* commet toast */}
            <ToastContainer
                position="bottom-center"
                autoClose={1000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
}

export default Post;
