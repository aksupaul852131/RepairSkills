import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import {
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
    updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { signOut, useSession } from "next-auth/react";
import toast, { Toaster } from 'react-hot-toast';
import uuid from 'react-uuid';


import ArticleEditor from '../../components/utils/article-editor'
import { db, storage } from "../api/auth/firebase-config";

export default function CreatePost() {

    const { data: session } = useSession();
    const [article, setArticle] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const filePickerRef = useRef(null);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const router = useRouter();

    const [articleId] = useState(uuid());

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


    const publishPost = async () => {
        if(!session) {
            router.push('/login');
        } else {
            if(title.length > 3) {
                if(!loading) {
                    setLoading(true);
                    const docdata = {
                        uid: session.user.uid,
                        title: title,
                        description: desc,
                        articleId: `${title.toLowerCase()
                            .replace(/[?]/g, '-').replace(/ /g, '-')
                            .replace(/[^\w-]+/g, '')}-${articleId}`,
                        username: user?.data()?.name,
                        userImg: user?.data()?.profileImg,
                        body: article,
                        timestamp: serverTimestamp(),
                        tags: tags.filter(i => i.pos == 'act').map((e) => (e.name)),
                        postImg: '',
                        status: 1,
                    }

                    setDoc(doc(db, "blogs", `${title.toLowerCase()
                        .replace(/ /g, '-').replace(/[?]/g, '-')
                        .replace(/[^\w-]+/g, '')}-${articleId}`), docdata);

                    const imageRef = ref(storage, `blogs/article/${session.user.name}/${articleId}/image`);

                    if(selectedFile) {
                        await uploadString(imageRef, selectedFile, "data_url").then(async () => {
                            const downloadURL = await getDownloadURL(imageRef);
                            await updateDoc(doc(db, "blogs", `${title.toLowerCase()
                                .replace(/ /g, '-').replace(/[?]/g, '-')
                                .replace(/[^\w-]+/g, '')}-${articleId}`), {
                                postImg: downloadURL,
                            });
                        });
                    }

                    setSelectedFile(null);
                    setLoading(false);
                    router.push('/blogs/home');
                } else {
                    toast.loading('uploading please wait...');
                }
            } else {
                toast.error('title must be unique');
            }
        }
    };

    const addImageToPost = (e) => {
        const reader = new FileReader();
        if(e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        };
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
            name: 'AC Course',
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
        const newUsers = [...tags];

        newUsers[index].pos = tags[index].pos == 'act' ? 'dec' : 'act';
        setTags(newUsers);
    };

    return (
        <>
            <Head>
                <title> Create a Post - RepairSkills</title>
                <meta name="description" content="Create Your Repair Skills Post" />
            </Head>
            <div className="font-[Urbanist] px-3 pt-2 pb-24">
                <div className="input-feild">
                    <label>Article Title</label>
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        type="text" id="first_name" placeholder="title" />
                </div>

                <div className="input-feild mt-3">
                    <label>Article Description</label>
                    <textarea
                        rows={3}
                        className='border w-full rounded p-2'
                        onChange={(e) => setDesc(e.target.value)}
                        type="text" id="first_name" placeholder="description" />
                </div>

                <div className="mt-6">
                    <label className="dark:text-white">Add Post Image</label>

                    {selectedFile ?
                        <div className="mt-3 relative z-0 w-full">
                            <div
                                className="mt-2 ml-2 absolute w-8 h-8 bg-white hover:bg-primary bg-opacity-90 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                                onClick={() => setSelectedFile(null)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <img
                                src={selectedFile}
                                alt=""
                                className="rounded-lg max-h-48 object-cover w-full"
                            />
                        </div>
                        :
                        <div className="mt-3 bg-gray-100 w-full h-48 border border-gray-500 border-dashed rounded-lg grid items-center justify-items-center dark:bg-gray-800">
                            <div className="grid justify-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 stroke-gray-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                                <button
                                    onClick={() => filePickerRef.current.click()}
                                    className="bg-gray-200 px-4 py-2 rounded">
                                    select
                                    <input
                                        type="file"
                                        ref={filePickerRef}
                                        hidden
                                        onChange={addImageToPost}
                                    />
                                </button>
                            </div>
                        </div>
                    }

                </div>
                <div className="border mt-6 article-editor">
                    <ArticleEditor onChangeResponse={setArticle} />
                </div>

                <p className="mt-5 mb-3 text-sm font-semibold ml-1 text-gray-800">#Related Tags</p>
                <ul className='mt-2 flex flex-wrap gap-2'>
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


                <button
                    // disabled={!input && !selectedFile}
                    onClick={publishPost}
                    className="mt-8 bg-primary w-full text-center hover:bg-green-500 text-white rounded-full py-3 px-4 ml-auto mr-1 disabled:hover:bg-blue-600 disabled:opacity-80 disabled:cursor-default"
                >
                    {
                        loading ?
                            <center>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </center>
                            : <span className="font-bold text-sm px-4">publish</span>
                    }
                </button>
                <p className="mt-2 text-center text-sm dark:text-white">This Post Publish By <span className="text-primary">{user?.data()?.name}</span></p>
                <Toaster
                    position="bottom-center"
                    reverseOrder={false}
                />
            </div>


        </>
    )
}
