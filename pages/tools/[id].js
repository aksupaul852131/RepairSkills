import { onSnapshot, collection, query, orderBy, doc, getDoc, } from "@firebase/firestore";
import { db } from "../api/auth/firebase-config";
import { useEffect, useState } from "react";
import Loading from "../../components/utils/Loading";
import ToolsModalBox from "../../components/model/tools-model";
import ImageView from "../../components/model/imageView";
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

                if(dbKey == 'InstallIdea') {
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
    };

    const onCheckHandle = () => {

        if(tools?.filter(i => i.pos == 'act').map((e) => (e)).length > 0) {
            setPopup(true);
        } else {
            toast.error('please select item')
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
                    <div className="pt-6 pb-24 w-full font-[Urbanist] select-none">
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
                                        placeholder="Search Spllit AC"
                                    />
                                </div>
                            )
                        }
                        {
                            postType == 1 ?
                                <ul className="px-3 grid grid-cols-6 gap-2">
                                    {tools.map((e, index) => (
                                        <li key={index}
                                            className={`border pb-8 rounded-lg ${index % 3 == 0 ? 'col-span-6 row-span-3' : 'col-span-3 row-span-6'}`} onClick={() => setPopup2(`${e.img}`)}>
                                            <img src={e.img} className={`rounded-lg w-full object-cover filter-none contrast-900 h-full`} />
                                            <h2 className="pt-2 pl-2 text-sm truncate">{e.name}</h2>
                                        </li>
                                    ))}
                                </ul>
                                :
                                <div className="">

                                    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-3 md:px-32">
                                        {tools.map((e, index) => (
                                            <li

                                                onClick={() => {
                                                    handlechange(index);
                                                }}
                                                key={index}
                                                className={`${e.pos == 'act' && `border-primary border-2`} grid items-center justify-items-center border-2 p-4 md:p-6 rounded-lg h-32`}>
                                                <img src={e.img} className='w-16 h-16 object-contain' />
                                                <p className="mt-3 text-center dark:text-white">{e.name}</p>
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                        }

                        {
                            postType != 1 && (
                                <div className="fixed bottom-16 z-50 md:bottom-0 md:mt-6 md:relative w-full px-3 md:px-32">
                                    <button onClick={() => onCheckHandle()} className=" bg-primary w-full text-center hover:bg-green-500 text-white rounded-full py-3 px-4">
                                        Check My Tools
                                    </button>
                                </div>)
                        }
                        {/* notice */}
                        <div className="px-3 md:px-32">
                            <div className="mt-8 relative w-full border border-dashed border-primary bg-primary/10">
                                <span className="-top-3 absolute bg-secondry text-white ml-2 px-2 rounded">
                                    {postType == 1 ? 'Information' : 'Info'}
                                </span>
                                {postType == 1
                                    ?
                                    <p className="text-center p-6 text-secondry text-sm dark:text-white">All Images From Internet, Use Here Only For Education & Training Purpose <Link href='/' className="text-primary">Know more</Link></p>
                                    :
                                    <p className="text-center p-6 text-secondry text-sm dark:text-white">This Tools Help For Check Your All Equipment.<br /><b>Before Going To Work.</b> </p>
                                }

                            </div>
                        </div>

                        {/* toast & modal box */}
                        <Toaster
                            position="bottom-center"
                            reverseOrder={false}
                        />
                        <ToolsModalBox showModel={popup} closeModel={setPopup} avail={tools.filter(i => i.pos == 'act').map((e) => (e))} Notavail={tools.filter(i => i.pos != 'act').map((e) => (e))} />

                        <ImageView showModel={popup1} closeModel={setPopup2} />
                    </div> :
                    <p className="mt-24 text-center">not found, maybe wrong URL</p>
            }
            <div className="w-1/4">

            </div>

        </>
    )
}