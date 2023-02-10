import { onSnapshot, collection, query, orderBy, doc, getDoc, } from "@firebase/firestore";
import { db } from "../../api/auth/firebase-config";
import { useEffect, useState } from "react";
import Loading from "../../../components/utils/Loading";
import ToolsModalBox from "../../../components/model/tools-model";
import ImageView from "../../../components/model/imageView";
import toast, { Toaster } from 'react-hot-toast';
import Link from "next/link";



export default function Tool() {
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [popup, setPopup] = useState(false);
    const [popup1, setPopup2] = useState('null');
    const [tools, setTools] = useState();
    const [postType, setPostType] = useState(0);

    const [dbKey, setDbKey] = useState('acGasRefilling');

    useEffect(() => {
        (() => getResponse())();
    });

    const getResponse = async () => {
        const urlSearchParams = new URLSearchParams(window.location.search)
        setDbKey(urlSearchParams.get('key'));

        if(loading2) {
            const docRef = doc(db, "tools", 'LhzKS84prEU2TjwHsup1');
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()) {
                setTools(docSnap.data()[dbKey]);

                if(dbKey == 'iduInstallIdea' || dbKey == 'oduInstallIdea') {
                    setPostType(1);
                }
                setLoading2(false);
                setLoading(false);
            }
        }
    }



    const handlechange = (index) => {
        const getState = [...tools];

        getState[index].pos = tools[index].pos == 'act' ? 'dec' : 'act';

        setTools(getState);
        console.log('pos', tools.filter(i => i.pos == 'act').map((e) => (e.name)))
    };

    const onCheckHandle = () => {

        if(tools?.filter(i => i.pos == 'act').map((e) => (e.name)).length > 0) {
            setPopup(true);
        } else {
            toast.custom((t) => (
                <div
                    className={`${t.visible ? 'animate-enter' : 'animate-leave'
                        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 mb-32`}
                >
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 pt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                                </svg>

                            </div>
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                    Select tools
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                    first you need to select any tool for get results.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l border-gray-200">
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Close
                        </button>
                    </div>
                </div>
            ))

        }
    }

    const onSearch = (e, index) => {
        const getState = [...tools];

        // getState[index].name = tools[index].name == e;

        setTools(getState);
    }
    return (
        <>
            {loading ? <Loading />
                : tools ?
                    <div className="pt-6 w-full font-[Urbanist] select-none">
                        {
                            postType == 1 && (
                                <div className="relative mx-2 mb-4 ">
                                    <div className="absolute right-0 text-white bg-primary rounded-md flex items-center px-6 h-full cursor-pointer ">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="icon icon-tabler icon-tabler-mail"
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
                                    </div>
                                    <input
                                        onChange={(e) => onSearch(e.target.value)}
                                        className="w-full bg-white dark:bg-dim-400 border-gray-200 dark:border-dim-400 text-gray-100 focus:bg-gray-100 dark:focus:bg-dim-900 focus:outline-none focus:border focus:border-blue-200 font-normal h-14 md:h-16 flex items-center pl-4 py-2 text-sm rounded-md border"
                                        placeholder="Search Twitter"
                                    />
                                </div>
                            )
                        }
                        {
                            postType == 1 ?
                                <ul className="grid grid-cols-2 px-3 gap-3">
                                    {tools.map((e, index) => (
                                        <li className="relative" onClick={() => setPopup2(`${e.img}`)}>
                                            <img src={e.img} className='rounded-lg h-32 w-full object-cover filter-none contrast-900' />
                                            <h2 className="absolute bottom-2 left-2 text-sm">{e.name}</h2>
                                        </li>
                                    ))}
                                </ul>
                                :
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-3 md:px-32">
                                    {
                                        tools.map((e, index) => (
                                            <div
                                                onClick={() => {
                                                    handlechange(index);
                                                }}
                                                key={index}
                                                className={`${e.pos == 'act' && `border-primary border-2`} grid items-center justify-items-center border-2 p-4 md:p-6 rounded-lg`}>
                                                <img src={e.img} className='w-12' />
                                                <p className="mt-3 text-center">{e.name}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                        }

                        {
                            postType != 1 && (
                                <div className="fixed bottom-20 md:bottom-0 md:mt-6 md:relative w-full px-3 md:px-32">
                                    <button onClick={() => onCheckHandle()} className=" bg-primary w-full text-center hover:bg-green-500 text-white rounded-full py-3 px-4">
                                        Check My Tools
                                    </button>
                                </div>)
                        }
                        {/* notice */}
                        <div className="px-3 md:px-32">
                            <div className="mt-8 relative w-full border border-dashed border-primary bg-primary/10">
                                <span className="-top-3 absolute bg-secondry text-white ml-2 px-2 rounded">
                                    {postType == 1 ? 'Information' : 'Notice'}
                                </span>
                                {postType == 1
                                    ?
                                    <p className="text-center p-6 text-secondry text-sm">All Images From Internet, Use Here Only For Education & Training Purpose <Link href='/' className="text-primary">Know more</Link></p>
                                    :
                                    <p className="text-center p-6 text-secondry text-sm">This Tools Help For Check Your All Equipment.<br /><b>Before Going To Work.</b> </p>
                                }

                            </div>
                        </div>

                        {/* toast & modal box */}
                        <Toaster
                            position="bottom-center"
                            reverseOrder={false}
                        />
                        <ToolsModalBox showModel={popup} closeModel={setPopup} avail={tools.filter(i => i.pos == 'act').map((e) => (e.name))} Notavail={tools.filter(i => i.pos != 'act').map((e) => (e.name))} />

                        <ImageView showModel={popup1} closeModel={setPopup2} />
                    </div> :
                    <p className="mt-24 text-center">not found, maybe wrong URL</p>
            }
            <div className="w-1/4">

            </div>

        </>
    )
}