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
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { db } from "../../firebase";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Post({ id, post, postPage }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  // vote length
  const [voteUpLength, setVoteUpLength] = useState([]);
  const [voteDownLength, setVoteDownLength] = useState([]);

  // 
  const [holdVote, setholdVote] = useState(0);
  const router = useRouter();


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
    [voteUpLength]
  );


  //  do things
  const likePost = async () => {
    if (holdVote == 0 || holdVote == 2) {
      await deleteDoc(doc(db, "posts", id, "downVote", session.user.uid));
      await setDoc(doc(db, "posts", id, "upVote", session.user.uid), {
        username: session.user.name,
      });
    }
  };



  const downV = async () => {
    if (holdVote == 0 || holdVote == 1) {
      await deleteDoc(doc(db, "posts", id, "upVote", session.user.uid));
      await setDoc(doc(db, "posts", id, "downVote", session.user.uid), {
        username: session.user.name,
      });
    }
  };

  // add comment
  const sendComment = async (e) => {
    e.preventDefault();
    if (comment != '') {
      await addDoc(collection(db, "posts", id, "comments"), {
        comment: comment,
        username: session.user.name,
        tag: session.user.tag,
        userImg: session.user.image,
        timestamp: serverTimestamp(),
      });
      toast("Comment Added");
      setComment('');
      router.push(`/quetion/${id}`)
    }


  }
  return (
    <div
      className="py-5 px-4 border-gray-200 border shadow-md rounded-2xl my-3 font-[Urbanist]"
    >
      {/* profile */}
      <div className="w-full flex">
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
      <p onClick={() => router.push(`/quetion/${id}`)} className="text-gray-700 text-[15px] sm:text-base my-3 ml-1">
        {post?.text}
      </p>

      <div className="flex flex-col space-y-2 w-full">


        {/* post image */}
        <div>
          <img
            src={post?.image}
            alt=""
            className="rounded-2xl max-h-[250px] md:max-h-[350px] w-full object-cover my-2"
            onClick={() => router.push(`/quetion/${id}`)}
          />
        </div>



        {/* buttons */}

        <div className="mt-4"></div>
        <div
          className={`text-[#6e767d] flex items-center justify-between py-2`}
        >


          {/* Voting */}

          {/* up */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              likePost();
            }}
            className={`rounded-full px-3 py-1 flex gap-2 ${holdVote == 1 ? `bg-primary text-white` : `bg-gray-100`}`}>
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
            className={`rounded-full px-3 py-1 flex gap-2 ${holdVote == 2 ? `bg-primary text-white` : `bg-gray-100`}`}>
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




          {/* comment */}
          {
            !postPage && (
              <div
                className="flex items-center space-x-1 group bg-gray-100 rounded-full px-2 py-1"
                onClick={() => router.push(`/quetion/${id}`)}
              >
                <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                  </svg>

                </div>
                {comments.length == 0 ?
                  <span className="text-xs">Add Response</span>
                  :
                  <span className="group-hover:text-[#1d9bf0] text-sm">
                    View Response {comments.length}
                  </span>
                }
              </div>
            )
          }


          {/* delete/retwit */}
          {/* {session.user.uid === post?.id ? (
            <div
              className="flex items-center space-x-1 group"
              onClick={(e) => {
                e.stopPropagation();
                deleteDoc(doc(db, "posts", id));
                router.push("/");
              }}
            >
              <div className="icon group-hover:bg-red-600/10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>

              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-1 group">
              <div className="icon group-hover:bg-green-500/10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>

              </div>
            </div>
          )} */}





          <div className="icon group ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>

          </div>

        </div>
        {/* comment model */}
        {
          postPage && (
            <div className="bg-white py-1 flex items-center w-full gap-2">
              <img className="rounded-full w-10" src={session?.user?.image} />
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-white dark:bg-dim-400 border-gray-200 dark:border-dim-400 text-black focus:bg-gray-100 dark:focus:bg-dim-900 focus:outline-none focus:border focus:border-blue-200 font-normal h-10 md:h-12 flex items-center pl-4 text-sm rounded-md border"
                placeholder="write something here"
              />
              <div
                onClick={sendComment}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </div>

            </div>
          )
        }
      </div>
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