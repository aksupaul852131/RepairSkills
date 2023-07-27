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
                {/* <title>{quetionPost.description} - RepairSkills</title> */}
                <link rel="icon" href="/favicon.ico" />
            </Head>


            <div className="w-full px-0 md:px-16 lg:px-24 py-3 md:py-6">
                {
                    quetionPost.map((e: any) => <h1>jd</h1>)
                }

            </div>
            <RightBar />
        </>

    );
}

export default PostPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    // context.query.id as string
    try {
        const stepRef = doc(db, 'posts', '6a2ba540-283f-11ee-98c1-25cc6c913ffb');
        const getQ = await getDoc(stepRef);

        return {
            props: {
                quetionPost: {
                    title: getQ.data()!.description,
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

