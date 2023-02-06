
import { useEffect, useState } from "react";
import { onSnapshot, collection, query, orderBy, setDoc, doc, where, addDoc, Timestamp, serverTimestamp } from "@firebase/firestore";
import { db } from "../pages/api/auth/firebase-config";
import Post from "./post/Post";
import { useSession } from "next-auth/react";


function Feed() {
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
  const [user, setUser] = useState([]);


  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );


  //  first time users

  useEffect(
    () => {


      if (session) {
        // #1 if user logged then check - We have data or not

        //  #2 check data ONLY 4 current logged user details
        onSnapshot(
          query(
            collection(db, "users"),
            where('uid', '==', session.user.uid)
          ),
          (snapshot) => {

            setUser(snapshot.docs);
            if (session?.user.uid != user[0]?.data().uid) {
              console.log('passssssssss')
            }
            // #3 check firestore datbase & current user name exist or not
            if (session?.user.uid != user[0]?.data().uid) {
              const userData = {
                name: session.user.name,
                profileImg: session.user.image,
                bio: '',
                uid: session.user.uid,
                timestamp: serverTimestamp(),
                skills: ['AC Tech'],
                // experince: [{
                //   brandImg: '',
                //   brandInfo: '',
                //   brandLink: '',
                //   brandName: '',
                //   workLocation: '',
                //   expYear: '',
                // }]
              }
              setDoc(doc(db, "users", session.user.uid), userData);
            }
          }
        );
      }
    },
    []
  );



  return (
    <div className="pb-72">

      {
        session?.user.uid == user[0]?.data().uid ?
          <div>pass</div>
          : <div>fail</div>
      }
      {posts.map((post) => (
        <Post key={post.id} id={post.id} post={post.data()} />
      ))}
    </div>
  );
}

export default Feed;
