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
import Loading from '../../components/utils/Loading'

function PostPage({ providers }) {
    const [post, setPost] = useState();
    const router = useRouter();
    const { id } = router.query;

    const [fetchLoad, setFetchLoad] = useState(true);

    useEffect(() => {
        (() => fetchData())();
    });


    const fetchData = () => {

        if(fetchLoad) {
            onSnapshot(doc(db, "posts", id), (snapshot) => {
                setPost(snapshot.data());
            });
            setFetchLoad(false)
        }

    }


    // if (!session) return <Login providers={providers} />;

    return (
        <>
            {
                fetchLoad ?
                    <Loading />
                    :
                    <>
                        <div className="w-full px-0 md:px-16 lg:px-24 py-3 md:py-6">
                            <FullPost id={id} post={post} postPage />
                        </div>
                        <RightBar />
                    </>
            }
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
