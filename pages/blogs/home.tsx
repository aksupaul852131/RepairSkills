import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { onSnapshot, collection, query, orderBy, } from "@firebase/firestore";
import { db } from "../api/auth/firebase-config";
import Moment from "react-moment";
import Loading from '../../components/utils/Loading'

export default function BlogHome() {

    const [articleList, setArticleList] = useState([]);

    const [fetchLoad, setFetchLoad] = useState(true);

    useEffect(() => {
        (() => fetchData())();
    });


    const fetchData = () => {
        if(fetchLoad) {
            onSnapshot(
                query(collection(db, "blogs"), orderBy("timestamp", "desc")),
                (snapshot) => {
                    setArticleList(snapshot.docs);
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

    return (
        <>
            {
                fetchLoad ?
                    <Loading />
                    :
                    <div className="select-none pb-24">
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
                                <img className="w-full rounded-lg object-cover" src='https://img.global.news.samsung.com/in/wp-content/uploads/2020/05/4.gif' />
                            </div>
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
                                {
                                    articleList.filter(filter != 'All' ? (j => j?.data().tags[0] == filter) : (ff => ff.data()?.title)).map((e) => (
                                        <Link
                                            href={`/blogs/article/${e?.data()?.articleId}`}
                                        >
                                            <li className="mb-3 bg-gray-50 dark:bg-gray-800 py-4 px-1 rounded">
                                                <div className="flex gap-3 w-full">
                                                    <Image
                                                        width={160}
                                                        height={120}
                                                        alt={e?.data()?.title.length != 0 ? e.data().title.substring(0, 80) : 'RepairSkills'}
                                                        className="h-[90px] rounded-lg object-cover" src={e?.data()?.postImg ? e?.data()?.postImg : 'https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png'} />
                                                    <div className="w-full">
                                                        <h2 className="text-sm text-black dark:text-white font-bold hover:text-primary">
                                                            {e?.data()?.title.length != 0 ? e.data().title.substring(0, 80) : 'No Title'}
                                                        </h2>
                                                        <h3 className="mt-1 text-secondry  dark:text-gray-400 text-xs">
                                                            <Moment fromNow>{e?.data()?.timestamp?.toDate()}</Moment>
                                                            - By
                                                            {e?.data()?.username}
                                                        </h3>
                                                        <p className={`flex text-xs mt-1 ${e?.data()?.tags[0] ? `justify-between` : 'justify-end'}`}>
                                                            {e?.data()?.tags[0] && (
                                                                <span className="rounded-full text-blue-600 mr-2">
                                                                    #{e?.data()?.tags[0]}
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
                                        </Link>
                                    ))
                                }

                            </ul>
                        </div>
                    </div>
            }

        </>
    )
}