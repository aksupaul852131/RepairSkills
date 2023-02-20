import Link from "next/link";
import { useEffect, useState } from "react";
import { onSnapshot, collection, query, orderBy, where, } from "@firebase/firestore";
import { db } from "./api/auth/firebase-config";
import Head from "next/head";



export default function SeacrhPage() {
    const [search, setSearch] = useState('');
    const [fetchLoad, setFetchLoad] = useState(true);
    const [searchList, setSearchList] = useState([]);

    const [dbKey, setDbKey] = useState('ac');

    useEffect(() => {
        (() => {
            fetchData();
            const urlSearchParams = new URLSearchParams(window.location.search)
            setDbKey(urlSearchParams.get('key'));

        })();
    });


    const fetchData = async () => {

        if(fetchLoad) {

            onSnapshot(
                query(collection(db, dbKey), orderBy("timestamp", "desc")),
                (snapshot) => {
                    setSearchList(snapshot.docs);
                    if(dbKey != 'ac') {
                        setFetchLoad(false);
                    }
                }
            );

        }

    }

    return (
        <>
            <Head>
                <title>Search here</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="font-[Urbanist] w-full">
                <div className="bg-primary md:py-8 rounded-b-lg">
                    <div className="mt-6 py-3 px-2">
                        <div className="bg-white flex border-gray-200 rounded-md">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-mail text-black w-12 px-3"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
                            </svg>
                            <input
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-white border-white dark:bg-gray-800 dark:border-dim-400 text-black focus:bg-gray-100 dark:focus:bg-dim-900 focus:outline-none font-normal h-14 md:h-16 flex items-center pl-4 py-2 text-sm rounded-md border"
                                placeholder="Search"
                            />
                        </div>
                    </div>
                </div>


                <ul className="mt-6 bg-white dark:bg-gray-900 dark:text-white w-full grid lg:grid-cols-2 gap-2">
                    {

                        searchList.filter(ft => ft?.data()?.title.toLowerCase().includes(search.toLowerCase())).slice(0, 5).map((e) => (
                            <Link
                                href={
                                    {
                                        pathname: `${new URLSearchParams(window.location.search).get('path')}`,
                                        query: { key: `${e?.id}` },
                                    }}
                            >

                                <li className="px-3 py-3 border-b border-b-gray-700 text-base flex justify-between">
                                    {e.data().title}
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                        </svg>
                                    </span>
                                </li>
                            </Link>
                        ))
                    }
                </ul>

                {search.length === 0 && (
                    <div className="px-2 py-4 dark:text-white">
                        <h2 className="text-lg font-bold">Explore</h2>
                        <ul className="mt-5 flex flex-nowrap gap-2">

                            <li className="flex items-center justify-center gap-2 hover:text-primary bg-gray-300/40 px-4 text-black rounded-full text-xs py-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
                                </svg>
                                <Link
                                    href='/videos/home'
                                    className="flex-none"
                                >Videos</Link>
                            </li>

                            <li className="flex items-center justify-center gap-2 hover:text-primary bg-gray-300/40 px-4 text-black rounded-full text-xs py-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008z" />
                                </svg>

                                <Link
                                    href='/videos/home'
                                    className="flex-none"
                                >Tools</Link>
                            </li>

                            <li className="flex items-center justify-center gap-2 hover:text-primary bg-gray-300/40 px-4 text-black rounded-full text-xs py-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                                </svg>
                                <Link
                                    href='/videos/home'
                                    className="flex-none"
                                >News</Link>
                            </li>



                        </ul>
                    </div>
                )}
            </div>
        </>
    )
}