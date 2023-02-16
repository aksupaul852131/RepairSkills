import { arrayUnion, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { useSession } from "next-auth/react"
import { useState, useRef } from "react";
import uuid from "react-uuid";
import { db, storage } from "../api/auth/firebase-config";
import toast, { Toaster } from 'react-hot-toast';

export default function AdminHome() {
    const { data: session } = useSession();
    const [name, setName] = useState("");
    const [dbKey, setDbKey] = useState('acGasRefilling');
    const [btnLoading, setBtnLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const filePickerRef = useRef(null);
    const category = ['acGasRefilling', 'ACInstallationTools', 'iduInstallIdea']
    // only for add image
    const addImageToPost = (e) => {
        const reader = new FileReader();
        if(e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        };
    };

    const editProfile = async (e) => {
        e.preventDefault();

        if(btnLoading) {
            toast('please wait...');
        } else {
            if(name != '') {
                const dbRef = doc(db, "tools", 'LhzKS84prEU2TjwHsup1');
                const imageRef = ref(storage, `Admin/tools/${uuid()}`);

                if(selectedFile) {
                    setBtnLoading(true);
                    await uploadString(imageRef, selectedFile, "data_url").then(async () => {
                        const downloadURL = await getDownloadURL(imageRef);
                        await updateDoc(dbRef, {
                            [dbKey]: arrayUnion(
                                {
                                    name: name,
                                    img: downloadURL,
                                }
                            )
                        });
                        setBtnLoading(false);
                        toast.success('Item Added');
                    });
                } else {
                    toast.error('Add Image');
                }
            } else {
                toast.error('Please Add Text');
            }
        }

    }

    if(session?.user?.uid != '101407720271822219811' && session?.user?.uid != '101790720557592011732') return (<p>you are not authrised</p>)

    return (
        <>
            <div className="pt-6 w-full font-[Urbanist] px-3 md:px-32">
                <h1 className="font-extrabold">Add a opt</h1>
                <div className="input-feild mt-6">
                    <label for="first_name">Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text" id="first_name" placeholder="title" />
                </div>

                <div>
                    <label className="mt-4 block text-sm font-medium text-gray-700">
                        Profile Picture
                    </label>
                    <div className="mt-3 pb-3 flex items-center">
                        <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                            {
                                selectedFile ?
                                    <img src={selectedFile} className='object-cover w-12 h-12' />
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="stroke-primary w-12">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                            }
                        </span>
                        <button
                            type="button"
                            onClick={() => filePickerRef.current.click()}
                            className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Change
                            <input
                                type="file"
                                ref={filePickerRef}
                                hidden
                                onChange={addImageToPost}
                            />
                        </button>
                    </div>
                </div>

                <div className='my-8'>
                    <select
                        id="states"
                        onChange={(e) => setDbKey(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg border-l-gray-100 block w-full p-4 px-2"
                    >
                        {
                            category.map((item, index) => {
                                return (
                                    <option key={index} value={item}>{item}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <button
                    onClick={editProfile}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {
                        btnLoading ?
                            <center>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </center>
                            : <span className="font-bold text-sm px-4">Add</span>
                    }
                </button>
                {/* toast & modal box */}
                <Toaster
                    position="bottom-center"
                    reverseOrder={false}
                />
            </div>


            <div className="w-1/4">

            </div>
        </>
    )
} 