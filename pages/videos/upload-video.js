import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
} from "@firebase/firestore";

import { db } from "../api/auth/firebase-config";
import uuid from "react-uuid";
import { toast, Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function UploadVideo() {

    const { data: session } = useSession();
    const router = useRouter();
    // video tags
    const [title, setTiltle] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [loading, setLoading] = useState(false);


    const [uniqueId, setUniqueId] = useState(uuid());

    const [loading2, setLoading2] = useState(true);

    const [user, setUser] = useState();

    useEffect(() => {
        (() => getResponse())();
    });


    const getResponse = async () => {
        if(session && loading2) {
            const docRef = doc(db, "users", session.user.uid);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()) {
                setUser(docSnap);
                setLoading2(false);
            } else { setLoading2(false) }
        }
    }


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
                    .replace(/[^\w-]+/g, '')}-${uniqueId}`,
                id: session.user.uid,
                username: user?.data()?.name,
                userImg: user?.data()?.profileImg,
            }

            setDoc(doc(db, "videos", `${title.toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '')}-${uniqueId}`), docdata);

            setUniqueId(uuid());
            setLoading(false);
            toast.success('added');
            router.push('/videos/home')
        } else {
            toast.error('please click & fetch first');
        }

    };


    const handlechange = (index) => {
        const newUsers = [...tags];

        newUsers[index].pos = tags[index].pos == 'act' ? 'dec' : 'act';
        setTags(newUsers);
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
            name: 'Technology',
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
                                    try {
                                        const youTubeIdFromLink = (url) => url.match(/(?:https?:\/\/)?(?:www\.|m\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\/?\?v=|\/embed\/|\/)([^\s&\?\/\#]+)/)[1];
                                        setThumbnail(youTubeIdFromLink(url));
                                    } catch(error) {
                                        toast.error('invalid url')
                                    }
                                }}
                                className="absolute right-0 text-white bg-primary rounded-md flex items-center px-6 h-full cursor-pointer ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" />
                                </svg>
                            </div>
                            <input
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="paste link & click right button"
                            />
                        </div>
                    </div>
                    {
                        thumbnail != '' && (
                            <img src={`https://img.youtube.com/vi/${thumbnail}/hqdefault.jpg`} className="mt-8 w-full h-56 rounded-lg" />
                        )
                    }
                    <div className="input-feild mt-6">
                        <label for="first_name">video description</label>
                        <textarea

                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border p-2 dark:text-white rounded-md bg-gray-100 dark:bg-gray-800"
                            type="text" id="first_name" placeholder="description" />
                    </div>

                    <p className="mt-5 mb-3 text-sm font-semibold ml-1 text-gray-800">#Related Tags</p>
                    <ul className='mt-2 px-1 flex flex-wrap gap-2'>
                        {tags.map((item, index) => {
                            return (
                                <li
                                    onClick={() => {
                                        handlechange(index);
                                    }}
                                    key={index}

                                    className={`${item.pos == 'act' ? `border-primary border-2 bg-primary text-white` : 'bg-gray-200'} px-4 rounded py-1 text-sm dark:text-white dark:bg-gray-800`}
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


                </div>
                <p className="mt-6 text-center text-xs px-6 dark:text-white">we are currently support only YouTube Videos<br /> It Is Legal To Embed Youtube Videos</p>
                <Toaster position="bottom-center" />

            </div>
            {/* /Middle */}

        </>
    )
}
