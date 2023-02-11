
import { useEffect, useState } from "react";
import { onSnapshot, collection, query, orderBy, } from "@firebase/firestore";
import { db } from "../pages/api/auth/firebase-config";
import Post from "./post/Post";


function Feed() {
  const [posts, setPosts] = useState([]);


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





  return (
    <div className="pb-24">
      {posts.map((post) => (
        <Post key={post.id} id={post.id} post={post.data()} />
      ))}
    </div>
  );
}

export default Feed;
