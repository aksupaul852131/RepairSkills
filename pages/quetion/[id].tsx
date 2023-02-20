import {
    doc,
    getDoc,
    onSnapshot,
} from "@firebase/firestore";
import { getProviders, getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FullPost from "../../components/post/Full-post";
import { db } from "../api/auth/firebase-config";
import RightBar from "../../components/RightBar";
import Loading from '../../components/utils/Loading'
import { GetServerSidePropsContext } from "next";
import Head from "next/head";

function PostPage({ quetionPost }: any) {
    const router = useRouter();
    const { id } = router.query;

    // if (!session) return <Login providers={providers} />;

    return (
        <>
            <Head>
                <title>{quetionPost.text} - RepairSkills</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>


            <div className="w-full px-0 md:px-16 lg:px-24 py-3 md:py-6">
                <FullPost id={id} post={quetionPost} postId={quetionPost.id} />

            </div>
            <RightBar />
        </>

    );
}

export default PostPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {

    try {
        const stepRef = doc(db, 'posts', context.query.id as string);
        const getSteps = await getDoc(stepRef);

        return {
            props: {
                quetionPost: {
                    ...getSteps.data(),
                    timestamp: getSteps?.data().timestamp.toMillis(),
                    id: getSteps.id
                },

            },
        };
    } catch (error) {
        return {
            props: {
                notFound: true,
            },
        };
    }

}

