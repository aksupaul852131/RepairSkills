import Sidebar from "../../components/Sidebar";
import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";
import {
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
    updateDoc,
} from "@firebase/firestore";

import { db } from "../api/auth/firebase-config";
import uuid from "react-uuid";
import { toast, Toaster } from "react-hot-toast";

export default function UploadVideo() {

    const [input, setInput] = useState("");

    // video tags
    const [title, setTiltle] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [loading, setLoading] = useState(false);


    const [uniqueId, setUniqueId] = useState(uuid());

    const sendPost = async () => {

        if(!thumbnail == '') {
            setLoading(true);
            const docdata = {
                title: title,
                urlId: thumbnail,
                description: description,
                tags: tags.filter(i => i.pos == 'act').map((e) => (e.name)),
                timestamp: serverTimestamp(),
                views: 0,
                videoId: `${title.toLowerCase()
                    .replace(/ /g, '-')
                    .replace(/[^\w-]+/g, '')}&id=${uniqueId}`,
            }

            setDoc(doc(db, "videos", `${title.toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '')}&id=${uniqueId}`), docdata);

            setUniqueId(uuid());
            setLoading(false);
            toast.success('added')
        } else {
            toast.error('please click & fetch first');
        }

    };


    const [tags, setTags] = useState([
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
            name: 'Ductable',
            pos: 'dec',
        },
        {
            name: 'Electrician',
            pos: 'dec',
        },
        {
            name: 'Other',
            pos: 'dec',
        },

    ]);

    const handlechange = (index) => {
        const newUsers = [...tags];

        newUsers[index].pos = tags[index].pos == 'act' ? 'dec' : 'act';
        setTags(newUsers);
    };

    return (
        <>


            {/* Middle */}
            <div className="w-full sm:w-600 px-0 md:px-32 md:h-screen font-[Urbanist] pb-24">

                <div className="rounded shadow-lg w-full p-4">
                    {/* // profile */}

                    <div className="input-feild mt-6">
                        <label for="first_name">video title</label>
                        <input
                            value={title}
                            onChange={(e) => setTiltle(e.target.value)}
                            type="text" id="first_name" placeholder="title" />
                    </div>

                    <div className="input-feild mt-6">
                        <label for="first_name">video URL</label>
                        <div className="relative mt-3">
                            <div
                                onClick={() => {
                                    const youTubeIdFromLink = (url) => url.match(/(?:https?:\/\/)?(?:www\.|m\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\/?\?v=|\/embed\/|\/)([^\s&\?\/\#]+)/)[1];
                                    setThumbnail(youTubeIdFromLink(url));
                                }}
                                className="absolute right-0 text-white bg-primary rounded-md flex items-center px-6 h-full cursor-pointer ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" />
                                </svg>
                            </div>
                            <input
                                onChange={(e) => setUrl(e.target.value)}

                                placeholder="url"
                            />
                        </div>
                    </div>
                    {
                        thumbnail != '' && (
                            <img src={`https://img.youtube.com/vi/${thumbnail}/mqdefault.jpg`} className="mt-8 w-full h-56 rounded-lg" />
                        )
                    }
                    <div className="input-feild mt-6">
                        <label for="first_name">video title</label>
                        <textarea

                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border p-2 dark:text-white rounded-md bg-gray-800"
                            type="text" id="first_name" placeholder="description" />
                    </div>

                    <p className="mt-5 mb-3 text-sm font-semibold ml-1 text-gray-600 dark:text-white">Post Tag</p>
                    <ul className='px-1 flex flex-wrap gap-2'>
                        {tags.map((item, index) => {
                            return (
                                <li

                                    onClick={() => {
                                        handlechange(index);
                                    }}
                                    key={index}

                                    className={`${item.pos == 'act' && `border-primary border-2 bg-primary text-white`} px-4 rounded py-1 border text-sm dark:text-white`}
                                >
                                    {item.name}

                                </li>
                            );
                        })}

                    </ul>

                    {

                    }
                    <button
                        onClick={sendPost}
                        className="mt-12 bg-primary w-full text-center hover:bg-green-500 text-white rounded-full py-3 px-4 ml-auto mr-1 disabled:hover:bg-blue-600 disabled:opacity-80 disabled:cursor-default"
                    >
                        {
                            loading ?
                                <center>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </center>
                                : <span className="font-bold text-sm px-4">Post</span>
                        }


                    </button>

                    {/* <iframe className="w-full" src="https://www.youtube.com/embed/PE2afBp-2x4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
                </div>
                <Toaster position="bottom-center" />
            </div>
            {/* /Middle */}

        </>
    )
}
