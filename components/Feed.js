
import { useEffect, useState } from "react";
import { onSnapshot, collection, query, orderBy, } from "@firebase/firestore";
import { db } from "../pages/api/auth/firebase-config";
import Post from "./post/Post";
import Loading from '../components/utils/Loading'


function Feed() {
  const [posts, setPosts] = useState([]);
  const [fetchLoad, setFetchLoad] = useState(true);

  useEffect(() => {
    (() => fetchData())();
  });


  const fetchData = () => {

    if(fetchData) {
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      );
      setFetchLoad(false)
    }
  }

  return (
    <>
      {
        fetchLoad ?
          <Loading />
          :
          <div className="pb-24 ">
            {posts.map((post) => (
              <Post key={post.id} id={post.id} post={post.data()} />
            ))}
          </div>
      }
    </>
  );
}

export default Feed;
