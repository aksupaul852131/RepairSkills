import Link from "next/link";
import { useEffect, useState } from "react";
import { onSnapshot, collection, query, orderBy, } from "@firebase/firestore";
import { db } from "../api/auth/firebase-config";
import Moment from "react-moment";


export default function BlogHome() {

    const [articleList, setArticleList] = useState([]);


    useEffect(
        () =>
            onSnapshot(
                query(collection(db, "blogs"), orderBy("timestamp", "desc")),
                (snapshot) => {
                    setArticleList(snapshot.docs);
                }
            ),
        [db]
    );


    return (
        <>
            <div className="font-[Urbanist] h-screen">


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
                                    <li className="mb-3 bg-gray-100 dark:bg-gray-800 py-4 px-2 rounded">
                                        <div className="flex gap-4 w-full">
                                            <img className="w-28 h-28 rounded-lg object-cover" src={e?.data()?.postImg ? e?.data()?.postImg : 'https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png'} />
                                            <div className="w-full">
                                                <h2 className="text-sm text-black dark:text-white font-bold hover:text-primary">{e?.data()?.title}</h2>
                                                <h4 className="mt-3 text-secondry  dark:text-gray-400 text-sm">
                                                    <Moment fromNow>{e?.data()?.timestamp?.toDate()}</Moment>
                                                    - By Ak Supaul</h4>
                                                <p className="flex text-xs mt-2 justify-between"><span className="bg-black rounded-full px-2 py-1 text-white mr-2">{e?.data()?.tags[0] && `#${e?.data()?.tags[0]}`}</span><span className="dark:text-white mr-2">
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
        </>
    )
}