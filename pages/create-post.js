import Sidebar from "../components/Sidebar";
import BackNav from "../components/navbar/BackNav";
import { useRef, useState } from "react";
import { db, storage } from "./api/auth/firebase-config";
import { useRouter } from "next/router";
import {
    doc,
    serverTimestamp,
    setDoc,
    updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { signOut, useSession } from "next-auth/react";
import Picker from '@emoji-mart/react'
import uuid from 'react-uuid';
import Link from "next/link";

const CreatePost = () => {
    const { data: session } = useSession();
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const filePickerRef = useRef(null);
    const [showEmojis, setShowEmojis] = useState(false);
    const router = useRouter();

    const [postId, setPostId] = useState(uuid());

    const sendPost = async () => {
        if (!session) {
            router.push('/login');
        } else {
            if (loading) return;
            setLoading(true);

            const docdata = {
                id: session.user.uid,
                postId: `${input.toLowerCase()
                    .replace(/ /g, '-')
                    .replace(/[^\w-]+/g, '')}&id=${postId}`,
                username: session.user.name,
                userImg: session.user.image,
                tag: session.user.tag,
                text: input,
                timestamp: serverTimestamp(),
            }

            const docRef = await setDoc(doc(db, "posts", `${input.toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '')}&id=${postId}`), docdata);

            const imageRef = ref(storage, `posts/${session.user.name}/${postId}/image`);

            if (selectedFile) {
                await uploadString(imageRef, selectedFile, "data_url").then(async () => {
                    const downloadURL = await getDownloadURL(imageRef);
                    await updateDoc(doc(db, "posts", `${input}&id=${postId}`), {
                        image: downloadURL,
                    });
                });
            }


            setInput("");
            setSelectedFile(null);
            setShowEmojis(false);
            setLoading(false);
            router.push('/');
        }
    };

    const addImageToPost = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        };
    };

    const addEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setInput(input + emoji);
    };


    return (
        <>


            {/* Middle */}
            <div className="w-full sm:w-600 px-0 md:px-32 md:h-screen">

                <div className="rounded shadow-lg w-full p-4">
                    {/* // profile */}
                    <div className="flex flex-shrink-0 pb-0">
                        <Link href="#" className="flex-shrink-0 group block">
                            <div className="flex items-top">
                                <div>
                                    <img
                                        className="inline-block h-12 w-12 rounded-full"
                                        src={session?.user?.image}
                                        alt=""
                                    />
                                </div>
                                <div className="ml-3">
                                    <p className="text-base leading-6 font-medium text-gray-800 dark:text-white">
                                        {session?.user?.name}
                                    </p>
                                    <span className="ml-1 text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                        @{session?.user?.tag}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <p className="mt-5 mb-2 text-sm font-semibold ml-1 text-gray-600">write post</p>

                    <div className="rounded-lg overflow-hidden border w-full bg-gray-100">
                        <div className="grid grid-cols-6 lg:grid-cols-8 px-4 py-2 bg-white">
                            <div
                                onClick={() => filePickerRef.current.click()}
                                className='hover:text-primary'
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                                <input
                                    type="file"
                                    ref={filePickerRef}
                                    hidden
                                    onChange={addImageToPost}
                                />
                            </div>
                            <div
                                onClick={() => setShowEmojis(!showEmojis)}
                                className='hover:text-primary'
                            >
                                {
                                    showEmojis ?


                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                                        </svg>
                                }

                            </div>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                </svg>
                            </button>

                        </div>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="What's happening?"
                            rows="4"
                            className="focus:outline-none text-black bg-transparent outline-none text-sm text-lg placeholder-gray-400 tracking-wide w-full min-h-[50px] p-4"
                        />
                    </div>
                    {showEmojis && (
                        <Picker
                            onEmojiSelect={addEmoji}
                            style={{
                                position: "absolute",
                                marginTop: "365px",
                                marginLeft: -40,
                                maxWidth: "200px",
                                borderRadius: "20px",
                            }}
                            theme="dark"
                        />
                    )}
                    {/* selected image show here */}
                    {selectedFile && (
                        <div className="mt-6 relative z-0">
                            <div
                                className="mt-2 ml-2 absolute w-8 h-8 bg-white hover:bg-primary bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                                onClick={() => setSelectedFile(null)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <img
                                src={selectedFile}
                                alt=""
                                className="rounded-2xl max-h-80 object-contain"
                            />
                        </div>
                    )}
                    <p className="mt-5 mb-2 text-sm font-semibold ml-1 text-gray-600">select type</p>
                    <div className="flex flex-wrap gap-2">
                        <div onClick={(e) => setSelect('')} className="rounded border px-6 py-2 text-center w-40"><p className="text-xs">HVAC & Insustries</p></div>
                        <div className="rounded border py-2 text-center w-28"><p className="text-xs">AirCon Brand</p></div>
                        <div className="rounded border py-2 text-center w-16"><p className="text-xs">Jobs</p></div>
                    </div>

                    {

                    }
                    <button
                        disabled={!input && !selectedFile}
                        onClick={sendPost}
                        className="mt-6 bg-primary w-full text-center hover:bg-green-500 text-white rounded-full py-3 px-4 ml-auto mr-1 disabled:hover:bg-blue-600 disabled:opacity-80 disabled:cursor-default"
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
                {
                    session?.user?.name ?

                        <p className="text-center text-xs mt-4">This Post Created as <span className="text-primary">{session?.user?.name}</span></p>
                        :
                        <p className="text-center text-xs mt-4">you can not post anything! <Link href='/login' className="text-primary">please login</Link></p>
                }
            </div>
            {/* /Middle */}

        </>
    )
}
export default CreatePost;