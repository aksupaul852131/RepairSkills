import Link from "next/link";
import { useEffect, useState } from "react";
import { onSnapshot, collection, query, orderBy, } from "@firebase/firestore";

import Moment from "react-moment";
import { db } from "../../pages/api/auth/firebase-config";

export default function RelatedVideo(props) {

    const [videoList, setVideoList] = useState([]);
    const [loading2, setLoading2] = useState(true);

    useEffect(() => {
        (() => getResponse())();
    });


    const getResponse = async () => {

        if(loading2) {
            onSnapshot(
                query(collection(db, "videos"), orderBy("timestamp", "desc")),
                (snapshot) => {
                    setVideoList(snapshot.docs);
                    setLoading2(false);
                }
            );
        }
    }


    return (
        <div className="font-[Urbanist] dark:text-white">
            <ul>
                {
                    videoList.filter(t => t.data()?.videoId != props.videoId).map((e) => (
                        <Link
                            onClick={() => { props.refrehPage(true); props.viewCounter(true) }}
                            href={{
                                pathname: '/videos/m',
                                query: { key: `${e?.data()?.videoId}` },
                            }}
                        >
                            <li
                                className="mb-1 shadow-sm bg-gray-50 dark:bg-gray-800 py-4 px-2 rounded">
                                <div className="flex gap-4 w-full">

                                    <div className="w-56">
                                        <img
                                            alt={`${e.data().title.substring(0, 80)} - RepairSkills`}
                                            width={100}
                                            height={100}
                                            src={`https://img.youtube.com/vi/${e?.data()?.urlId}/mqdefault.jpg`} className="w-56 h-24 rounded-lg" />
                                    </div>
                                    <div className="w-full">
                                        <h2 className="text-sm text-black dark:text-white font-bold hover:text-primary">
                                            {e.data().title.substring(0, 80)}
                                        </h2>
                                        <h3 className="mt-3 text-secondry  dark:text-gray-400 text-sm">
                                            <Moment fromNow>{e?.data()?.timestamp?.toDate()}</Moment> -
                                            <span> {e?.data()?.views} views</span>
                                        </h3>
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