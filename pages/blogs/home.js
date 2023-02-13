import Link from "next/link";
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




    return (
        <>
            {
                fetchLoad ?
                    <Loading />
                    :
                    <div className="font-[Urbanist] h-screen">
                        <div className="px-3 pt-3">
                            <div className="flex justify-between items-center">
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

                            <hr className="mt-3" />


                        </div>

                        <div className="pt-3 pb-24">
                            <div className="px-3">
                                <img className="w-full rounded-lg object-cover" src='https://assets.justinmind.com/wp-content/uploads/2022/06/website-template-justinmind-400x250.png' />
                            </div>
                            <h2 className="mt-6 font-bold px-3 dark:text-white">Latest Update</h2>
                            <ul className="mt-4 px-3">
                                {
                                    articleList.map((e) => (
                                        <Link
                                            href={{
                                                pathname: '/blogs/article/m',
                                                query: { key: `${e?.data()?.articleId}` },
                                            }}
                                        >
                                            <li className="mb-3 bg-gray-50 dark:bg-gray-800 py-4 px-2 rounded">
                                                <div className="flex gap-4 w-full">
                                                    <img className="w-28 h-28 rounded-lg object-cover" src={e?.data()?.postImg ? e?.data()?.postImg : 'https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png'} />
                                                    <div className="w-full">
                                                        <h2 className="text-sm text-black dark:text-white font-bold hover:text-primary">
                                                            {e?.data()?.title.length != 0 ? e?.data()?.title : 'No Title'}
                                                        </h2>
                                                        <h4 className="mt-3 text-secondry  dark:text-gray-400 text-sm">
                                                            <Moment fromNow>{e?.data()?.timestamp?.toDate()}</Moment>
                                                            - By <Link
                                                                href={{
                                                                    pathname: '/account/profile',
                                                                    query: { key: `${e?.data()?.uid}` },
                                                                }}
                                                                className='hover:underline'
                                                            >
                                                                {e?.data()?.username}
                                                            </Link></h4>
                                                        <p className={`flex text-xs mt-2 ${e?.data()?.tags[0] ? `justify-between` : 'justify-end'}`}>
                                                            {e?.data()?.tags[0] && (
                                                                <span className="bg-black rounded-full px-2 py-1 text-white mr-2">
                                                                    ${e?.data()?.tags[0]}
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