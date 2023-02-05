import {
    doc,
    onSnapshot,
} from "@firebase/firestore";
import { getProviders, getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FullPost from "../../components/post/Full-post";
import { db } from ".././api/auth/firebase-config";
import RightBar from "../../components/RightBar";

function PostPage({ providers }) {
    const { data: session } = useSession();
    const [post, setPost] = useState();
    const router = useRouter();
    const { id } = router.query;

    useEffect(
        () =>
            onSnapshot(doc(db, "posts", id), (snapshot) => {
                setPost(snapshot.data());
            }),
        [db]
    );


    // if (!session) return <Login providers={providers} />;

    return (
        <>
            <div className="w-full sm:w-600 md:h-screen">

                <div className="px-0 md:px-16 lg:px-48 font-[Urbanist] select-none">

                    <div className="mt-14 md:mt-0">
                        <FullPost id={id} post={post} postPage />
                    </div>


                </div>
            </div>
            <RightBar />
        </>
    );
}

export default PostPage;

export async function getServerSideProps(context) {

    const providers = await getProviders();
    const session = await getSession(context);

    return {
        props: {

            providers,
            session,
        },
    };
}
