import Head from "next/head";
import Feed from "../components/Feed";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react'
import { doc, getDoc, serverTimestamp, setDoc } from "@firebase/firestore";
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


        if (session) {
            if (loading) {
                const docRef = doc(db, "users", session?.user?.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setLoading(false);

                } else {
                    // doc.data() will be undefined in this case

                    const userData = {
                        name: session.user.name,
                        profileImg: session.user.image,
                        bio: '',
                        uid: session.user.uid,
                        timestamp: serverTimestamp(),
                        skills: [],
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

    }

    return (
        <>
            <Head>
                <title>RepairSkills || Worlwide RepairMan Community</title>
                <link rel="icon" href="/favicon.ico" />

                <link rel="canonical" href="https://repair-skills.com/ask" />

                <meta name="keywords" content="RepairSkills, Hvac error, ac gas presure, ac tech jobs" />
                <meta name="description" content="Whether you're looking to fix a leaky faucet, repair a broken appliance, or maintain hvac, we've got you covered. start building your repair skills today!" />
            </Head>


            <div className="mx-auto w-full lg:w-1/2 pt-2">

                <div className="px-0 md:px-16 lg:px-12 font-[Urbanist] select-none">
                    <div className="my-2 px-5 py-4 flex justify-between bg-gray-800 rounded-md"
                        onClick={() => router.push('/create-post')}>
                        <div className="flex items-center">
                            <span className="text-white text-sm font-semibold ">Type to add something</span>
                        </div>

                        <div className="bg-primary rounded-full py-2 px-4 text-xs text-white">
                            <span>post</span>
                        </div>
                    </div>

                    <Feed />
                </div>

            </div>



        </>
    );
}


