import Link from "next/link";
import { useEffect, useState } from "react";
import { onSnapshot, collection, query, orderBy, where, } from "@firebase/firestore";
import { db } from "../api/auth/firebase-config";
import Moment from "react-moment";
import Loading from '../../components/utils/Loading'

export default function VideoPage() {

    const [videoList, setVideoList] = useState([]);

    const [fetchLoad, setFetchLoad] = useState(true);
    const [search, setSearch] = useState('');


    useEffect(() => {
        (() => fetchData())();
    });


    const fetchData = () => {

        if(fetchLoad) {
            onSnapshot(
                query(collection(db, "videos"), orderBy("timestamp", "desc")),
                (snapshot) => {
                    setVideoList(snapshot.docs);
                }
            );
            setFetchLoad(false)
        }

    }

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

    const handlechange = (index) => {
        const data = [...tags];
        for(var i = 0; i < tags.length; i++) {
            tags[i].pos = 'dec';
        }

        data[index].pos = tags[index].pos == 'act' ? 'dec' : 'act';
        setTags(data);
    };

    const searchRecords = (e) => {
        e.preventDefault();


    }
    return (

        <>
            {
                fetchLoad ?
                    <Loading />
                    :
                    <div className="font-[Urbanist] dark:text-white px-0 md:px-24 dark:bg-gray-900">
                        <div className="px-3 pt-6">
                            <p className="text-primary text-sm flex justify-between items-center">
                                <span>Repair-Skills.com</span>
                                <Link
                                    href={{
                                        pathname: '/search',
                                        query: { key: 'videos', path: '/videos/m' },
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
                            </p>
                            <h1>
                                <span className="text-2xl font-extrabold">Introducing</span> Orgnized <br /> Repairs <span className="text-2xl font-extrabold">Videos Content</span> only.
                            </h1>

                        </div>
                        <hr className="my-3" />
                        <div className="sticky top-16 bg-white dark:bg-gray-900 z-50 mb-2 pt-1 pb-3">
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
                                                className={`${e.pos == 'act' && `border-primary border-2 bg-primary text-white`} border rounded-2xl px-3 py-1 ml-2 text-sm flex-none ${e.name == 'All' && 'bg-black text-white'}`}>
                                                {e.name}
                                            </li>
                                        )
                                    }

                                </ul>
                            </div>

                        </div>

                        <h2 className="px-3 pb-3 font-bold text-lg">Latest Videos</h2>

                        <ul className="px-1 pb-24 grid md:grid-cols-2 md:gap-2">

                            {
                                videoList.filter(filter != 'All' ? (ff => ff.data()?.tags[0] == filter) : (ff => ff.data()?.title))
                                    .map((e) => (
                                        <Link
                                            href={{
                                                pathname: '/videos/m',
                                                query: { key: `${e?.data()?.videoId}` },
                                            }}
                                        >
                                            <li
                                                className="mb-1 bg-gray-50 dark:bg-gray-800 py-4 px-2 rounded">
                                                <div className="flex gap-2 w-full">

                                                    <div className="relative w-64 overflow-hidden">
                                                        <div className="aspect-w-16 aspect-h-9">
                                                            <img className='w-full rounded' src={`https://img.youtube.com/vi/${e?.data()?.urlId}/mqdefault.jpg`} />
                                                        </div>
                                                        <p className="bottom-0 rounded-tr-md absolute text-white bg-primary px-2 text-xs">{e?.data()?.views}</p>
                                                    </div>
                                                    <div className="w-full">
                                                        <h2 className="text-sm text-black dark:text-white font-semibold hover:text-primary">{e?.data()?.title}</h2>
                                                        <h4 className="mt-1 text-gray-600  dark:text-gray-400 text-sm">
                                                            <Moment fromNow>{e?.data()?.timestamp?.toDate()}</Moment>
                                                        </h4>
                                                        <p className={`flex text-xs mt-2 ${e?.data()?.tags[0] ? `justify-between` : 'justify-end'}`}>
                                                            {e?.data()?.tags[0] && (
                                                                <span className="text-blue-600">
                                                                    #{e?.data()?.tags[0]}
                                                                </span>
                                                            )}
                                                            <span className="text-gray-500 dark:text-white mr-2">
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
            }
        </>

    )
}