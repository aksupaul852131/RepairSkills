import {
    doc,
    onSnapshot,
} from "@firebase/firestore";
import { getProviders, getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../../atoms/modalAtom";
import Sidebar from "../../components/Sidebar";
import FullPost from "../../components/post/Full-post";
import BackNav from "../../components/navbar/BackNav";
import { db } from ".././api/auth/firebase-config";
import RightBar from "../../components/RightBar";

function PostPage({ providers }) {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [post, setPost] = useState();
    const [comments, setComments] = useState([]);
    const router = useRouter();
    const { id } = router.query;

    useEffect(
        () =>
            onSnapshot(doc(db, "posts", id), (snapshot) => {
                setPost(snapshot.data());
            }),
        [db]
    );


    if (!session) return <Login providers={providers} />;

    return (
        <div className="bg-white">
            <BackNav title='Post' />

            <div className="h-screen mt-14">
                <div className=" lg:flex lg:flex-row">
                    {/* Left */}
                    <Sidebar />
                    {/* /Left */}

                    {/* Middle */}
                    <div className="w-full sm:w-600 md:h-screen">

                        <div className="px-0 md:px-16 lg:px-48 font-[Urbanist] select-none">

                            <div className="mt-14 md:mt-0">
                                <FullPost id={id} post={post} postPage />
                            </div>


                        </div>
                    </div>
                    <RightBar />
                </div>
            </div>

        </div>
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
