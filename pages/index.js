import Head from "next/head";
import Rightbar from "../components/RightBar";
import Feed from "../components/Feed";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react'
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { db } from "./api/auth/firebase-config";
import { useSession } from "next-auth/react";


export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    (() => getResponse())();
  });

  const getResponse = async () => {

    if (session && loading) {
      const docRef = doc(db, "users", session.user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setLoading(false);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");

        const userData = {
          name: session.user.name,
          profileImg: session.user.image,
          bio: '',
          uid: session.user.uid,
          timestamp: serverTimestamp(),
          skills: [{ pos: 128, name: 'Not Added' }],
          workExp: 0,
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
        setLoading(false);
      }
    }

  }

  return (
    <>
      <Head>
        <title>Home / Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <div className="w-full sm:w-600 md:h-screen pt-2">

        <div className="px-2 md:px-16 lg:px-48 font-[Urbanist] select-none">
          <div className="my-2 border px-5 py-4 flex justify-between rounded-2xl"
            onClick={() => router.push('/create-post')}
          >
            <div className="flex items-center">
              <span className="text-gray-600 text-sm font-bold ">Type to add something</span>
            </div>

            <div className="bg-primary rounded-full py-2 px-4 text-xs text-white">
              <span>post</span>
            </div>

          </div>
          {/* Timeline */}
          {/* New Tweets */}
          <div className="border-b border-gray-200 dark:border-dim-200 bg-gray-50 dark:bg-dim-300 py-2 border-l border-r">
            <div className="flex flex-shrink-0 items-center justify-center py-4 bg-white dark:bg-dim-900 border-b border-t border-gray-200 dark:border-dim-200 hover:bg-gray-50 dark:hover:bg-dim-300 cursor-pointer transition duration-350 ease-in-out text-gray-600 text-sm">
              New 10 Quetions Posted
            </div>
          </div>
          {/* /New Tweets */}
          <Feed />
          {/* /Tweet */}
          {/* Timeline Notification */}

        </div>
        {/* /Post Tweet */}




        {/* /Timeline */}
      </div>
      {/* /Middle */}


      {/* Right */}
      <Rightbar />

    </>
  );
}


