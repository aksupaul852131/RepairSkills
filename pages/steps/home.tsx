import Link from "next/link";
import { useEffect, useState } from "react";
import { onSnapshot, collection, query, orderBy, doc, getDocs, } from "@firebase/firestore";
import { db } from "../api/auth/firebase-config";
import Moment from "react-moment";
import Loading from '../../components/utils/Loading'
import { GetServerSidePropsContext } from "next";
import Head from "next/head";

const BlogHome = ({ allPosts }: any) => {



    const [filter, setFilter] = useState('All');
    const [tags, setTags] = useState([
        {
            name: 'All',
            pos: 'dec',
        },
        {
            name: 'HVAC',
            pos: 'dec',
        },
        {
            name: 'Refrigrator',
            pos: 'dec',
        },
        {
            name: 'VRV',
            pos: 'dec',
        },
        {
            name: 'Split AC',
            pos: 'dec',
        },
        {
            name: 'AC Error',
            pos: 'dec',
        },
        {
            name: 'Refrigrant Gas',
            pos: 'dec',
        },
        {
            name: 'Ductable',
            pos: 'dec',
        },
        {
            name: 'Wiring',
            pos: 'dec',
        },
        {
            name: 'Repair',
            pos: 'dec',
        },
        {
            name: 'Chiller',
            pos: 'dec',
        },
        {
            name: 'Installation',
            pos: 'dec',
        },
        {
            name: 'Diagnostic',
            pos: 'dec',
        },
        {
            name: 'Other',
            pos: 'dec',
        },
    ]);

    const handlechange = (index: number) => {
        const data = [...tags];
        for (var i = 0; i < tags.length; i++) {
            tags[i].pos = 'dec';
        }

        data[index].pos = tags[index].pos == 'act' ? 'dec' : 'act';
        setTags(data);
    };

    return (
        <>

            <Head>
                <title>Repair Steps</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="mx-auto md:w-1/2 font-[Urbanist] pb-24">
                <div className="px-3 pt-3">
                    <div className="flex justify-between items-center dark:text-white">
                        <h1>
                            <span className="text-2xl font-extrabold">Step</span> By
                            <span className="text-2xl font-extrabold">Step</span> Solution
                        </h1>
                        <Link
                            href={{
                                pathname: '/search',
                                query: { key: 'steps', path: '/steps/m' },
                            }}
                            className="bg-primary p-3 rounded-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-mail text-white"
                                width={16}
                                height={16}
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
                            </svg>
                        </Link>
                    </div>
                </div>
                <div>

                    <div className="sticky top-16 bg-white dark:bg-gray-900 z-10 mb-2 pt-1 pb-3">
                        <div>
                            <ul className="mt-2 flex flex-nowrap overflow-x-scroll no-scrollbar">
                                {
                                    tags.map((e, index) =>
                                        <li
                                            key={index}
                                            onClick={() => {
                                                handlechange(index);
                                                setFilter(`${e.name}`)
                                            }}
                                            className={`${e.pos == 'act' && `border-primary border-2 bg-primary text-white`} border rounded-2xl px-3 py-1 ml-2 text-sm flex-none dark:text-white ${e.name == 'All' && 'bg-black text-white dark:bg-primary w-14 text-center'}`}>
                                            {e.name}
                                        </li>
                                    )
                                }

                            </ul>
                        </div>

                    </div>
                    <h2 className="mt-2 font-bold px-3 dark:text-white">Select Here</h2>
                    <ul className="mt-4 px-3">
                        {
                            allPosts.map((e: any, index: number) => (
                                <Link
                                    href={`/steps/${e.stepId}`}
                                >
                                    <li className="mb-3 bg-gray-900 dark:bg-gray-800 rounded-lg">

                                        {
                                            index == 0 &&
                                            (

                                                <div className="relative">
                                                    <img className="w-full h-48 rounded-lg object-cover" src={e.img ? e?.img : 'https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png'} />
                                                    <div className="top-0 absolute w-full h-48 bg-blend-multiply bg-primary opacity-20"></div>
                                                    <div className="top-8 absolute w-full px-8">
                                                        <div className="border border-primary w-full h-32 p-8">
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }


                                        <div className="p-4 flex gap-4 w-full ">
                                            <div className="w-full border rounded-lg p-4">
                                                <p className="text-gray-400">{e.AllSteps?.length} Problems Solutions</p>
                                                <h2 className="text-2xl text-white font-bold hover:text-primary">
                                                    {e.title.length != 0 ? e.title.substring(0, 80) : 'No Title'}
                                                </h2>

                                            </div>
                                        </div>
                                    </li>
                                </Link>
                            ))
                        }

                    </ul>
                </div>

            </div>


        </>
    )
}




export async function getServerSideProps(context: GetServerSidePropsContext) {

    try {

        const q = query(collection(db, "steps"));
        const querySnapshot = await getDocs(q);

        const allComment = querySnapshot.docs.map(docSnap => {
            return {
                ...docSnap.data(),
                timestamp: docSnap.data().timestamp.toMillis(),
            }
        })

        console.log('dhhhdhdhdhd', querySnapshot)

        return {
            props: {
                allPosts: allComment,
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

export default BlogHome;