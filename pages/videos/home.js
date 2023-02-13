import Link from "next/link";
import { useEffect, useState } from "react";
import { onSnapshot, collection, query, orderBy, } from "@firebase/firestore";
import { db } from "../api/auth/firebase-config";
import Moment from "react-moment";

export default function VideoPage(params) {

    const [videoList, setVideoList] = useState([]);


    useEffect(
        () =>
            onSnapshot(
                query(collection(db, "videos"), orderBy("timestamp", "desc")),
                (snapshot) => {
                    setVideoList(snapshot.docs);
                }
            ),
        [db]
    );

    return (
        <div className="font-[Urbanist] dark:text-white">
            <div className="px-3 pt-6">
                <p className="text-primary text-sm">Repair-Skills.com</p>
                <h1>
                    <span className="text-2xl font-extrabold">Introducing</span> Orgnized <br /> Repairs <span className="text-2xl font-extrabold">Videos Content</span> only.
                </h1>

                <div className="relative mt-6">
                    <div className="absolute right-0 text-white bg-primary rounded-md flex items-center px-6 h-full cursor-pointer ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-mail"
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
                    </div>
                    <input
                        className="w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-dim-400 text-gray-100 focus:bg-gray-100 dark:focus:bg-dim-900 focus:outline-none focus:border focus:border-blue-200 font-normal h-14 md:h-16 flex items-center pl-4 py-2 text-sm rounded-md border"
                        placeholder="Search"
                    />
                </div>
            </div>
            <div className="mt-5 mb-6">
                <h2 className="px-3 font-bold text-lg">Select Any filed</h2>
                <ul className="mt-2 flex">
                    <li className="border rounded-2xl px-3 py-1 ml-2 text-sm">
                        AC Gas Refilling
                    </li>
                </ul>
            </div>

            <h2 className="px-3 pb-3 font-bold text-lg">Latest Videos</h2>


            <ul className="px-3">

                {
                    videoList.map((e) => (
                        <Link
                            href={{
                                pathname: '/videos/video/m',
                                query: { key: `${e?.data()?.videoId}` },
                            }}
                        >
                            <li
                                className="mb-3 bg-gray-50 dark:bg-gray-800 py-4 px-2 rounded">
                                <div className="flex gap-4 w-full">

                                    <div className="relative w-56">
                                        <img src={`https://img.youtube.com/vi/${e?.data()?.urlId}/mqdefault.jpg`} className="w-56 h-24 rounded-lg" />
                                        <p className="bottom-0 rounded-tr-md absolute text-white bg-primary px-2 text-xs">{e?.data()?.views}</p>
                                    </div>
                                    <div className="w-full">
                                        <h2 className="text-sm text-black dark:text-white font-bold hover:text-primary">{e?.data()?.title}</h2>
                                        <h4 className="mt-3 text-secondry  dark:text-gray-400 text-sm">
                                            <Moment fromNow>{e?.data()?.timestamp?.toDate()}</Moment>
                                        </h4>
                                        <p className={`flex text-xs mt-2 ${e?.data()?.tags[0] ? `justify-between` : 'justify-end'}`}>
                                            {e?.data()?.tags[0] && (
                                                <span className="bg-primary/40 rounded-md px-2 py-1 text-black dark:text-white mr-2">
                                                    #{e?.data()?.tags[0]}
                                                </span>
                                            )}
                                            <span className="dark:text-white mr-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                    <path fillRule="evenodd" d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 18.375V5.625zm1.5 0v1.5c0 .207.168.375.375.375h1.5a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-1.5A.375.375 0 003 5.625zm16.125-.375a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h1.5A.375.375 0 0021 7.125v-1.5a.375.375 0 00-.375-.375h-1.5zM21 9.375A.375.375 0 0020.625 9h-1.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h1.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-1.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h1.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-1.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h1.5a.375.375 0 00.375-.375v-1.5zM4.875 18.75a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-1.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h1.5zM3.375 15h1.5a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-1.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375zm0-3.75h1.5a.375.375 0 00.375-.375v-1.5A.375.375 0 004.875 9h-1.5A.375.375 0 003 9.375v1.5c0 .207.168.375.375.375zm4.125 0a.75.75 0 000 1.5h9a.75.75 0 000-1.5h-9z" clipRule="evenodd" />
                                                </svg>

                                            </span></p>
                                    </div>
                                </div>
                            </li>
                        </Link>))}

            </ul>

        </div>
    )
}