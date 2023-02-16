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
    const [popup, setPopup] = useState(false);
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

    const [docId] = useState(uuid());

    const addDoc = async (e) => {
        e.preventDefault();

        if(name != '') {
            const docdata = {
                title: name,
                description: '',
                AllSteps: [],
            }

            setDoc(doc(db, "steps", name), docdata);
        } else {
            toast.error('Please Add Text');
        }

    }

    // add a step Heading
    const [popupText, setPopupText] = useState('')




    const [rows, setRows] = useState([{}]);
    const columnsArray = ["name", "id", "mobile", "date", "amount"]; // pass columns here dynamically

    const handleAddRow = () => {
        const item = {};
        setRows([...rows, item]);
    };

    const postResults = () => {
        console.log(rows); // there you go, do as you please
    };
    const handleRemoveSpecificRow = (idx) => {
        const tempRows = [...rows]; // to avoid  direct state mutation
        tempRows.splice(idx, 1);
        setRows(tempRows);
    };

    const updateState = (e) => {
        let prope = e.target.attributes.column.value; // the custom column attribute
        let index = e.target.attributes.index.value; // index of state array -rows
        let fieldValue = e.target.value; // value

        const tempRows = [...rows]; // avoid direct state mutation
        const tempObj = rows[index]; // copy state object at index to a temporary object
        tempObj[prope] = fieldValue; // modify temporary object

        // return object to rows` clone
        tempRows[index] = tempObj;
        setRows(tempRows); // update state
    };



    if(session?.user?.uid != '101407720271822219811' && session?.user?.uid != '101790720557592011732') return (<p>you are not authrised</p>)



    return (
        <div className="px-3 pt-3">

            <h1>Steps</h1>

            <div className="input-feild mt-6">
                <label for="first_name">Name</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text" id="first_name" placeholder="title" />
            </div>

            <div className="input-feild mt-6">
                <label for="first_name">description</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text" id="first_name" placeholder="description" />
            </div>


            <button
                onClick={addDoc}
                className="mt-6 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                add doc
            </button>

            <div>
                <div className="container w-full overflow-auto">
                    <div className="row clearfix">
                        <div className="col-md-12 column">
                            <table className="table table-bordered table-hover" id="tab_logic">
                                <thead className="bg-gray-200 border-b">
                                    <tr>
                                        <th className="text-center"> # </th>
                                        {columnsArray.map((column, index) => (
                                            <th key={index} scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                {column}
                                            </th>
                                        ))}
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((item, idx) => (
                                        <tr key={idx} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

                                            <td>{idx + 1}</td>
                                            {
                                                columnsArray.map((column, index) => (


                                                    <td key={index} className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        <input
                                                            type="text"
                                                            column={column}
                                                            value={rows[idx][column]}
                                                            index={idx}
                                                            className="form-control"
                                                            onChange={(e) => updateState(e)}

                                                        />

                                                    </td>
                                                ))
                                            }

                                            < td >
                                                <button
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={() => handleRemoveSpecificRow(idx)}
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button onClick={handleAddRow} className="btn btn-primary">
                                Add Row
                            </button>
                            <button
                                onClick={postResults}
                                className="btn btn-success float-right"
                            >
                                Save Results
                            </button>
                        </div>
                    </div>
                </div>
            </div >




            <button

                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                {
                    btnLoading ?
                        <center>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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



            {
                popup ? (
                    <>
                        <div
                            className="justify-center mx-2 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none font-[Urbanist]"
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-gray-700 outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-center justify-between p-4 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="text-lg font-semibold dark:text-white">
                                            Share Post:
                                        </h3>
                                        <button
                                            className="text-primary background-transparent font-bold uppercase text-sm outline-none focus:outline-none ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setPopup(false)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    {/*body*/}
                                    <div className="relative p-6 flex-auto">
                                        <div className="input-feild">
                                            <label for="first_name">Step Heading</label>
                                            <input
                                                value={popupText}
                                                onChange={(e) => setPopupText(e.target.value)}
                                                type="text" id="first_name" placeholder="title" />
                                        </div>
                                        <button

                                        >
                                            add head
                                        </button>
                                    </div>
                                    {/*footer*/}

                                    <Toaster
                                        position="bottom-center"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null
            }
        </div >
    )
} 