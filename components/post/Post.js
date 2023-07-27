import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "@firebase/firestore";
import { useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { db } from "../../pages/api/auth/firebase-config";

import 'react-toastify/dist/ReactToastify.css';
import ShareModalBox from "../model/share";
import PostModelBox from "../model/post-model";
import Link from "next/link";
import Image from "next/image";
import { getAuth, onAuthStateChanged } from "firebase/auth";


function Post({ id, post, userpage }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);

  // vote length
  const [voteUpLength, setVoteUpLength] = useState([]);
  const [voteDownLength, setVoteDownLength] = useState([]);

  // 
  const [holdVote, setholdVote] = useState(0);
  const router = useRouter();
  const [share, setShare] = useState(false);
  const [menu, setMenu] = useState(false);

  const auth = getAuth();
  const [uid, setUid] = useState();
  const [loading2, setLoading2] = useState(false);

  const [fetchLoad, setFetchLoad] = useState(true);
  const [user, setUser] = useState();
  const [image, setImages] = useState([]);

  useEffect(() => {
    (() => {
      onAuthStateChanged(auth, (user) => {
        if(user) {

          setUid(user.uid);
          setLoading2(true);
          // ...
        } else {
          router.push('account/login')
        }
      });
      getResponse();
      fetchData();
    })();
  });



  const getResponse = async () => {
    if(loading2) {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()) {
        setUser(docSnap);
        setLoading2(false);
      } else { setLoading2(false) }
    }
  }


  const fetchData = async () => {

    if(fetchLoad) {
      const docRef = doc(db, "users", post?.uid);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()) {
        setUser(docSnap);
      }
      if(post?.imLen != 0) {

        onSnapshot(
          query(
            collection(db, "posts", post?.postId, 'gallery'),
          ),
          (snapshot) => setImages(snapshot.docs)
        );
      }
      setFetchLoad(false);
    }
  }


  return (
    <div
      className="py-5 rounded-md px-4 border-b shadow my-3 font-[Urbanist] dark:text-white dark:bg-gray-800"
    >
      {/* profile */}
      <div className="w-full flex">
        {
          !userpage && (
            <Link
              href={`/account/manage/${post?.uid}`}
            >
              <Image
                width={160}
                height={120}
                src={user?.data()?.photoUrl == 'empety' ? '/no-image.png' : user?.data()?.photoUrl}
                alt={user?.data()?.username}
                title={user?.data()?.username}
                className="h-11 w-11 rounded-full mr-4"
              />
            </Link>
          )
        }
        <div>
          <div className="flex">
            <h2
              className={`font-bold text-[15px] sm:text-base group-hover:underline inline-block`}
            >
              <Link
                href={`/account/manage/${post?.uid}`}
              >{user?.data()?.username}</Link>

            </h2>
          </div>
          {/* post time */}
          <span className="hover:underline text-gray-600 dark:text-gray-400 text-sm sm:text-[15px]">
            <Moment fromNow>{userpage ? post?.datePublished : post?.datePublished?.toDate()}</Moment>
          </span>
        </div>
        {/* 3 dots */}
        <div
          onClick={() => menu ? setMenu(false) : setMenu(true)}
          className="icon group flex-shrink-0 ml-auto ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-gray-600 mt-2 dark:fill-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
        </div>
      </div>


      {/* post text */}
      <p onClick={() => router.push(`/quetion/${id}`)} className="text-gray-700 dark:text-white text-[15px] sm:text-base my-3">
        {post?.description}
      </p>

      <div className="flex flex-col space-y-2 w-full">


        {/* post image */}
        <div>
          {image.map((e) => (<>

            {
              <Image
                width={500}
                height={500}
                src={e.data().url}
                alt={`${post?.description} - RepairSkills`}
                className="rounded-2xl md:max-h-[350px] w-full object-cover my-2"
                onClick={() => router.push(`/quetion/${post.postId}`)}
              />
            }
          </>
          ))}

        </div>



        {/* buttons */}

        <div className="mt-4"></div>

        {
          !userpage && (
            <div
              className={`text-[#6e767d] flex items-center justify-between py-2 gap-6`}
            >

              {/* Voting */}

              {/* up */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  likePost();
                }}
                className={`rounded-full px-3 py-1 flex gap-2 ${holdVote == 1 ? `bg-primary text-white` : `bg-gray-100 dark:bg-gray-800`}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 dark:stroke-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                </svg>
                {post?.likes.length > 0 && (
                  <span
                  >
                    {post?.likes.length}
                  </span>
                )}
              </div>



              <div
                className="flex items-center space-x-1 group bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-1"
                onClick={() => router.push(`/quetion/${id}`)}
              >
                <div className="icon flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                  </svg>

                </div>
                {comments.length == 0 ?
                  <span className={`text-xs ${userpage ? 'hidden' : 'block'}`}>Add</span>
                  :
                  <span className={`group-hover:text-[#1d9bf0] text-sm ${userpage ? 'hidden' : 'block'}`}>
                    View {comments.length}
                  </span>
                }
              </div>


              <div
                onClick={() => share ? setShare(false) : setShare(true)}
                className="icon group px-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 dark:stroke-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                </svg>
              </div>

            </div>
          )
        }


      </div>
      <ShareModalBox showModel={share} closeModel={setShare} shareLink={`https://repair-skills.vercel.app/quetion/${id}`} />

    </div>
  );
}


export default Post;


