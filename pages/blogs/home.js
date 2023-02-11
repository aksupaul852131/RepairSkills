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
            <div className="font-[Urbanist]">


                <div>
                    <div className="px-3">
                        <img className="w-full rounded-lg object-cover" src='https://assets.justinmind.com/wp-content/uploads/2022/06/website-template-justinmind-400x250.png' />
                    </div>
                    <h2 className="mt-6 font-bold px-3">Latest Update</h2>
                    <ul className="mt-4">
                        {
                            articleList.map((e) => (
                                <Link
                                    href={{
                                        pathname: '/blogs/article/m',
                                        query: { key: `${e?.data()?.articleId}` },
                                    }}
                                >
                                    <li className="px-3 mb-3">
                                        <div className="flex gap-4 w-full">
                                            <img className="w-28 h-28 rounded-lg object-cover" src={e?.data()?.postImg} />
                                            <div className="w-full">
                                                <h2 className="text-sm font-bold hover:text-primary">{e?.data()?.title}</h2>
                                                <h4 className="mt-3 text-secondry text-sm">
                                                    <Moment fromNow>{e?.data()?.timestamp?.toDate()}</Moment>
                                                    - By Ak Supaul</h4>
                                                <p className="flex text-xs mt-2 justify-between"><span className="bg-black rounded-full px-2 text-white mr-2">{e?.data()?.tags[0] && `#${e?.data()?.tags[0]}`}</span>Read More<span></span></p>
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