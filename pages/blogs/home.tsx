import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { collection, query, getDocs, } from "@firebase/firestore";
import { db } from "../api/auth/firebase-config";
import Moment from "react-moment";
import Loading from '../../components/utils/Loading'
import Head from "next/head";
import { GetServerSidePropsContext } from "next";

const BlogHome = ({ allPosts }: any) => {

    useEffect(() => console.log(allPosts));

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
                <title>Blogs - The Ultimate Destination for Repair Knowledge</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="canonical" href="https://repair-skills.com/tools/home" />

                <meta name="keywords" content="repair, DIY, maintenance, home repairs, machinery, appliance, car, tutorials, guides, product reviews" />
                <meta name="description" content="Gain the knowledge and skills necessary to tackle any repair project, big or small. From basic home repairs to complex machinery maintenance, RepairSkills covers a wide range of topics to help you become an expert in your field." />
            </Head>
            <div className="mx-auto w-full lg:w-1/2 select-none pb-24">
                <div className="px-3 pt-3">
                    <div className="flex justify-between items-center dark:text-white">
                        <h1>
                            <span className="text-2xl font-extrabold">Blogs</span> & News
                        </h1>
                        <Link
                            href={{
                                pathname: '/search',
                                query: { key: 'blogs', path: '/blogs/article/m' },
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
                    <div className="px-3 mt-6">
                        <img className="w-full rounded-lg object-cover" src='https://irp-cdn.multiscreensite.com/20edf843/dms3rep/multi/cc-12.gif' />
                    </div>
                    <div className="sticky top-16 bg-white dark:bg-gray-900 z-50 mb-2 pt-1 pb-3">
                        <div>
                            <ul className="mt-4 flex flex-nowrap overflow-x-scroll no-scrollbar">
                                {
                                    tags.map((e, index) =>
                                        <li
                                            key={index}
                                            onClick={() => {
                                                handlechange(index);
                                                setFilter(`${e.name}`)
                                            }}
                                            className={`${e.pos == 'act' && `border-primary border-2 bg-primary text-white`} border rounded-2xl px-3 py-1 ml-2 text-sm flex-none dark:text-white ${e.name == 'All' && 'bg-black text-white dark:bg-primary w-14 text-center border-primary'}`}>
                                            {e.name}
                                        </li>
                                    )
                                }

                            </ul>
                        </div>

                    </div>
                    <h2 className="mt-2 font-bold px-3 dark:text-white">Latest Update</h2>
                    <ul className="mt-4 px-2">
                        {/* {
                            allPosts.map((e: any) => <Link
                                href={`/blogs/article/${e?.articleId}`}
                            >
                                <li className="mb-3 bg-gray-50 dark:bg-gray-800 py-4 px-1 lg:px-3 rounded">
                                    <div className="flex gap-3 w-full">
                                        <Image
                                            width={160}
                                            height={120}
                                            alt={e?.title.length != 0 ? e.title.substring(0, 80) : 'RepairSkills'}
                                            className="h-[90px] rounded-lg object-cover" src={e?.postImg ? e?.postImg : '/no-image.png'} />
                                        <div className="w-full">
                                            <h2 className="text-sm text-black dark:text-white font-bold hover:text-primary">
                                                {e?.title.length != 0 ? e.title.substring(0, 80) : 'No Title'}
                                            </h2>
                                            <h3 className="mt-1 text-secondry  dark:text-gray-400 text-xs">
                                                <Moment fromNow>{e?.timestamp}</Moment>
                                                - By
                                                {e?.username}
                                            </h3>
                                            <p className={`flex text-xs mt-1 ${e?.tags[0] ? `justify-between` : 'justify-end'}`}>
                                                {e?.tags[0] && (
                                                    <span className="rounded-full text-blue-600 mr-2">
                                                        #{e?.tags[0]}
                                                    </span>
                                                )}
                                                <span className="dark:text-white mr-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                                    </svg>
                                                </span></p>
                                        </div>
                                    </div>
                                </li>
                            </Link>)
                        } */}



                    </ul>
                </div>
            </div>

        </>
    )
}


export async function getServerSideProps() {

    // try {

    //     const q = query(collection(db, "blogs"));
    //     const querySnapshot = await getDocs(q);
    //     console.log('querySnapshot')

    //     console.log(querySnapshot)


    //     const allBlogs = querySnapshot.docs.map(docSnap => {
    //         return {
    //             ...docSnap.data(),
    //             timestamp: docSnap.data().timestamp.toMillis(),
    //         }
    //     })



    //     return {
    //         props: {
    //             allPosts: allBlogs,
    //         },
    //     };
    // } catch (error) {
    //     return {
    //         props: {
    //             notFound: true,
    //         },
    //     };
    // }


    try {
        // Fetch the blog data from Firebase Firestore
        const blogCollection = query(collection(db, "blogs"));
        const querySnapshot = await blogCollection.getdocs();
        const blogData = querySnapshot.docs.map((doc: any) => doc.data());

        return {
            props: {
                blogData,
            },
        };
    } catch (error) {
        console.error('Error fetching blog data:', error);
        return {
            props: {
                blogData: null, // You can set a default value or handle the error as per your requirements
            },
        };
    }

}



export default BlogHome;