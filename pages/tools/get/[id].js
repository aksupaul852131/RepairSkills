import { onSnapshot, collection, query, orderBy, doc, getDoc, } from "@firebase/firestore";
import { db } from "../../api/auth/firebase-config";
import { useEffect, useState } from "react";
import Loading from "../../../components/utils/Loading";
import ToolsModalBox from "../../../components/model/tools-model";
import toast, { Toaster } from 'react-hot-toast';



export default function Tool() {
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [popup, setPopup] = useState(false);
    const [tools, setTools] = useState();

    useEffect(() => {
        (() => getResponse())();
    });

    const getResponse = async () => {
        const urlSearchParams = new URLSearchParams(window.location.search)
        const url = urlSearchParams.get('key');

        if (loading2) {
            const docRef = doc(db, "tools", 'LhzKS84prEU2TjwHsup1');
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                if (url == 'acInstall') {
                    setTools(docSnap.data().acInstall);
                } else if (url == 'acGasRefilling') {
                    setTools(docSnap.data().acGasRefilling);
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

        if (tools.filter(i => i.pos == 'act').map((e) => (e.name)).length > 0) {
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
    return (
        <>

            {loading ? <Loading />
                :
                <div className="w-full font-[Urbanist]">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 px-3 md:px-32">
                        {
                            tools.map((e, index) => (
                                <div
                                    onClick={() => {
                                        handlechange(index);
                                    }}
                                    key={index}
                                    className={`${e.pos == 'act' && `border-primary border-2`} grid items-center justify-items-center border-2 p-4 rounded-lg`}>
                                    <img src={e.img} className='w-12' />
                                    <p className="mt-3 text-center">{e.name}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className="fixed bottom-20 md:bottom-0 md:mt-6 md:relative w-full px-3 md:px-32">
                        <button onClick={() => onCheckHandle()} className=" bg-primary w-full text-center hover:bg-green-500 text-white rounded-full py-3 px-4">
                            Check My Tools
                        </button>
                    </div>

                    {/* notice */}
                    <div className="px-3 md:px-32">
                        <div className="mt-8 relative w-full border border-dashed border-primary bg-primary/10">
                            <span className="-top-3 absolute bg-secondry text-white ml-2 px-2 rounded">info
                            </span>

                            <p className="text-center p-6 text-secondry text-sm">This Tools Help For Check Your All Equipment.<br /><b>Before Going To Work.</b> </p>
                        </div>
                    </div>

                    {/* toast & modal box */}
                    <Toaster
                        position="bottom-center"
                        reverseOrder={false}
                    />
                    <ToolsModalBox showModel={popup} closeModel={setPopup} avail={tools.filter(i => i.pos == 'act').map((e) => (e.name))} Notavail={tools.filter(i => i.pos != 'act').map((e) => (e.name))} />
                </div>}
            <div className="w-1/4">

            </div>

        </>
    )
}