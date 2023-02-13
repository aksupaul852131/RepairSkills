import Link from "next/link";
import { useEffect, useState } from "react";
import { onSnapshot, collection, query, orderBy, } from "@firebase/firestore";
import Moment from "react-moment";
import { db } from "../../pages/api/auth/firebase-config";
import Router from "next/router";

export default function RelatedPost(props) {

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
            <ul className="grid grid-cols-1">
                {
                    articleList.filter(t => t?.data()?.title != props.title).map((e, index) => (
                        <Link
                            key={index}
                            onClick={() => props.refrehPage(true)}
                            href={{
                                pathname: '/blogs/article/m',
                                query: { key: `${e?.data()?.articleId}` },
                            }}
                        >
                            <li
                                className="mb-3 bg-gray-50 dark:bg-gray-800 py-4 px-2 rounded">
                                <div className="flex gap-4 w-full">
                                    <img className="w-28 h-28 rounded-lg object-cover" src={e?.data()?.postImg ? e?.data()?.postImg : 'https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png'} />
                                    <div className="w-full">
                                        <h2 className="text-sm text-black dark:text-white font-bold hover:text-primary">{e?.data()?.title.length != 0 ? e?.data()?.title : 'No Title'}</h2>
                                        <h4 className="mt-3 text-secondry  dark:text-gray-400 text-sm">
                                            <Moment fromNow>{e?.data()?.timestamp?.toDate()}</Moment>
                                            - By <Link
                                                href={{
                                                    pathname: '/account/profile',
                                                    query: { uid: `${e?.data()?.uid}` },
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


        </>
    )
}