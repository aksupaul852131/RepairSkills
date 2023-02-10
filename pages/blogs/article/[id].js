import { onSnapshot, collection, query, orderBy, doc, getDoc, } from "@firebase/firestore";
import { db } from "../../api/auth/firebase-config";
import { useEffect, useState } from "react";
import Loading from "../../../components/utils/Loading";
import ToolsModalBox from "../../../components/model/tools-model";
import ImageView from "../../../components/model/imageView";
import toast, { Toaster } from 'react-hot-toast';
import Link from "next/link";



export default function Tool() {
    // const [loading, setLoading] = useState(true);
    // const [loading2, setLoading2] = useState(true);
    // const [popup, setPopup] = useState(false);
    // const [popup1, setPopup2] = useState('null');
    // const [tools, setTools] = useState();
    // const [postType, setPostType] = useState(0);

    // const [dbKey, setDbKey] = useState('acGasRefilling');

    // useEffect(() => {
    //     (() => getResponse())();
    // });

    // const getResponse = async () => {
    //     const urlSearchParams = new URLSearchParams(window.location.search)
    //     setDbKey(urlSearchParams.get('key'));

    //     if(loading2) {
    //         const docRef = doc(db, "tools", 'LhzKS84prEU2TjwHsup1');
    //         const docSnap = await getDoc(docRef);

    //         if(docSnap.exists()) {
    //             setTools(docSnap.data()[dbKey]);

    //             if(dbKey == 'iduInstallIdea' || dbKey == 'oduInstallIdea') {
    //                 setPostType(1);
    //             }
    //             setLoading2(false);
    //             setLoading(false);
    //         }
    //     }
    // }



    // const handlechange = (index) => {
    //     const getState = [...tools];

    //     getState[index].pos = tools[index].pos == 'act' ? 'dec' : 'act';

    //     setTools(getState);
    //     console.log('pos', tools.filter(i => i.pos == 'act').map((e) => (e.name)))
    // };

    // const onCheckHandle = () => {

    //     if(tools?.filter(i => i.pos == 'act').map((e) => (e.name)).length > 0) {
    //         setPopup(true);
    //     } else {
    //         toast.custom((t) => (
    //             <div
    //                 className={`${t.visible ? 'animate-enter' : 'animate-leave'
    //                     } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 mb-32`}
    //             >
    //                 <div className="flex-1 w-0 p-4">
    //                     <div className="flex items-start">
    //                         <div className="flex-shrink-0 pt-0.5">
    //                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
    //                                 <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
    //                             </svg>

    //                         </div>
    //                         <div className="ml-3 flex-1">
    //                             <p className="text-sm font-medium text-gray-900">
    //                                 Select tools
    //                             </p>
    //                             <p className="mt-1 text-sm text-gray-500">
    //                                 first you need to select any tool for get results.
    //                             </p>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="flex border-l border-gray-200">
    //                     <button
    //                         onClick={() => toast.dismiss(t.id)}
    //                         className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
    //                     >
    //                         Close
    //                     </button>
    //                 </div>
    //             </div>
    //         ))

    //     }
    // }

    // const onSearch = (e, index) => {
    //     const getState = [...tools];

    //     // getState[index].name = tools[index].name == e;

    //     setTools(getState);
    // }
    return (
        <>

            <div className="pt-6 px-3 w-full font-[Urbanist] select-none">
                <article>
                    <h1 className="font-bold text-2xl">New Invetrer Technology Introduce, By Daikin in World wide</h1>
                    <p className="mt-2 text-secondry"><span>By Author</span> 26 jan 2023</p>
                    <div className="mt-4 flex justify-between">
                        <div className="flex gap-2">
                            <button className="border px-3 py-1 rounded flex gap-1 items-center">
                                <svg
                                    class="w-5 h-5 text-black fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                                    />
                                </svg>
                                <span className="text-xs">share</span>
                            </button>

                            <button className="border px-3 py-1 rounded flex gap-1 items-center">
                                <svg
                                    class="w-6 h-6 text-black fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512">
                                    <path
                                        d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                                    ></path>
                                </svg>
                                <span className="text-xs">Tweet</span>
                            </button>

                            <button className="border px-3 py-1 rounded flex gap-1 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
                                </svg>

                                <span className="text-xs">Copy Link</span>
                            </button>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.1} stroke="currentColor" className="w-8 h-8 stroke-gray-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                        </svg>
                    </div>
                    <hr className="mt-6" />


                </article>
            </div>


            <div className="w-1/4">

            </div>

        </>
    )
}