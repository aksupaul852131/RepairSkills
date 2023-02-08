import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import uuid from "react-uuid";
import { db, storage } from "../api/auth/firebase-config";

export default function EditPost() {

    const { data: session } = useSession();

    const [name, setName] = useState("");
    const [bio, setBio] = useState('');
    const [year, setYear] = useState(1);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const [selectedFile, setSelectedFile] = useState(null);
    const filePickerRef = useRef(null);
    const [postId, setPostId] = useState(uuid());

    const addImageToPost = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        };
    };

    const editProfile = async (e) => {
        e.preventDefault();

        const userData = {
            name: name,
            bio: bio,
            skills: skill.filter(i => i.pos == 'act').map((e) => (e.name)),
            workExp: year,
            experience: brandIndex.length == 0 ? brand[0] : brandIndex,
        }
        await updateDoc(doc(db, "users", session.user.uid), userData);


        const imageRef = ref(storage, `users/${session.user.name}/${postId}-profile`);

        if (selectedFile) {
            await uploadString(imageRef, selectedFile, "data_url").then(async () => {
                const downloadURL = await getDownloadURL(imageRef);
                await updateDoc(doc(db, "users", session.user.uid), {
                    profileImg: downloadURL,
                });
            });
        }

        setName("");
        setSelectedFile(null);
        router.push('/')
    }

    // get user data

    useEffect(() => {
        (() => getResponse())();
    });



    const getResponse = async () => {
        if (session && loading) {
            const docRef = doc(db, "users", session.user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setName(docSnap.data().name);
                setBio(docSnap.data().bio);
                setYear(docSnap.data().workExp);
            }
            console.log('using');
            setLoading(false);
        }
    }


    //


    const [skill, setSkill] = useState([
        {
            name: 'HVAC',
            pos: '128',
        },
        {
            name: 'Refrigrator',
            pos: '128',
        },
        {
            name: 'VRV',
            pos: '128',
        },
        {
            name: 'Split AC',
            pos: '128',
        },
        {
            name: 'Ductable',
            pos: '128',
        },
        {
            name: 'Electrician',
            pos: '128',
        },
        {
            name: 'Other',
            pos: '128',
        },

    ]);


    const handlechange = (index) => {
        const newUsers = [...skill];

        newUsers[index].pos = skill[index].pos == 'act' ? 'dec' : 'act';
        setSkill(newUsers);
    };

    const [brandIndex, setBrandIndex] = useState([]);

    const [brand] = useState([
        {
            brandName: 'Not Working Currently',
            brandImg: 'https://png.pngitem.com/pimgs/s/109-1099875_samsung-logo-black-and-white-wallpaper-samsung-logo.png',
            brandInfo: 'Not Work',
            brandLink: '/',
        },
        {
            brandName: 'Samsung',
            brandImg: 'https://png.pngitem.com/pimgs/s/109-1099875_samsung-logo-black-and-white-wallpaper-samsung-logo.png',
            brandInfo: 'Samsung is a South Korean multinational electronics company headquartered in Seoul. It is one of the largest and most successful technology companies in the world, offering a wide range of products and services including smartphones, televisions, home appliances, and semiconductors. Samsung has established itself as a leader in the global market through its innovative and high-quality products, as well as its commitment to research and development.',
            brandLink: 'https://www.samsung.com',
        }
    ]);

    const handlechange2 = (e) => {
        setBrandIndex(brand.filter(i => i.brandName == e.target.value));
    };

    return (
        <div>
            <div className="md:grid md:grid-cols-3 md:gap-6 pt-8 font-[Urbanist]">
                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0 ml-0 md:ml-12">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
                        <p className="mt-1 text-sm text-gray-600">
                            This information will be displayed publicly so be careful what you
                            share.
                        </p>
                    </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <form action="#" method="POST">
                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">

                                <div className="input-feild">
                                    <label for="first_name">Name</label>
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        type="text" id="first_name" placeholder="John" />
                                </div>

                                <div className="input-feild">
                                    <label for="first_name">Bio</label>
                                    <textarea
                                        id="about"
                                        name="about"
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        rows={3}
                                        className="shadow-sm border p-2 focus:border-primary mt-1 block w-full sm:text-sm border-gray-300 bg-gray-50 rounded-md"
                                        placeholder="bio"
                                        defaultValue={""}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
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

                                <div>
                                    <label className="flex justify-between text-sm font-medium text-gray-700">
                                        Work Experience <span className="text-primary font-bold">{year} year +</span>
                                    </label>
                                    <input
                                        type="range"
                                        min={1}
                                        max={40}
                                        defaultValue={year}
                                        onChange={((e) => setYear(e.target.value))}
                                        className="w-full mt-3 outline-primary"
                                        id="myRange"
                                    />
                                </div>

                                {/* sslect brand */}
                                <label className="flex justify-between text-sm font-medium text-gray-700">
                                    Work With
                                </label>
                                <div className="flex">
                                    <button
                                        id="states-button"
                                        data-dropdown-toggle="dropdown-states"
                                        className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                                        type="button"
                                    >
                                        <svg
                                            aria-hidden="true"
                                            className="h-3 mr-2"
                                            viewBox="0 0 15 12"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect x="0.5" width={14} height={12} rx={2} fill="white" />
                                            <mask
                                                id="mask0_12694_49953"
                                                style={{ maskType: "alpha" }}
                                                maskUnits="userSpaceOnUse"
                                                x={0}
                                                y={0}
                                                width={15}
                                                height={12}
                                            >
                                                <rect x="0.5" width={14} height={12} rx={2} fill="white" />
                                            </mask>
                                            <g mask="url(#mask0_12694_49953)">
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M14.5 0H0.5V0.8H14.5V0ZM14.5 1.6H0.5V2.4H14.5V1.6ZM0.5 3.2H14.5V4H0.5V3.2ZM14.5 4.8H0.5V5.6H14.5V4.8ZM0.5 6.4H14.5V7.2H0.5V6.4ZM14.5 8H0.5V8.8H14.5V8ZM0.5 9.6H14.5V10.4H0.5V9.6ZM14.5 11.2H0.5V12H14.5V11.2Z"
                                                    fill="#D02F44"
                                                />
                                                <rect x="0.5" width={6} height="5.6" fill="#46467F" />
                                                <g filter="url(#filter0_d_12694_49953)">
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M1.83317 1.20005C1.83317 1.42096 1.68393 1.60005 1.49984 1.60005C1.31574 1.60005 1.1665 1.42096 1.1665 1.20005C1.1665 0.979135 1.31574 0.800049 1.49984 0.800049C1.68393 0.800049 1.83317 0.979135 1.83317 1.20005ZM3.1665 1.20005C3.1665 1.42096 3.01727 1.60005 2.83317 1.60005C2.64908 1.60005 2.49984 1.42096 2.49984 1.20005C2.49984 0.979135 2.64908 0.800049 2.83317 0.800049C3.01727 0.800049 3.1665 0.979135 3.1665 1.20005ZM4.1665 1.60005C4.3506 1.60005 4.49984 1.42096 4.49984 1.20005C4.49984 0.979135 4.3506 0.800049 4.1665 0.800049C3.98241 0.800049 3.83317 0.979135 3.83317 1.20005C3.83317 1.42096 3.98241 1.60005 4.1665 1.60005ZM5.83317 1.20005C5.83317 1.42096 5.68393 1.60005 5.49984 1.60005C5.31574 1.60005 5.1665 1.42096 5.1665 1.20005C5.1665 0.979135 5.31574 0.800049 5.49984 0.800049C5.68393 0.800049 5.83317 0.979135 5.83317 1.20005ZM2.1665 2.40005C2.3506 2.40005 2.49984 2.22096 2.49984 2.00005C2.49984 1.77913 2.3506 1.60005 2.1665 1.60005C1.98241 1.60005 1.83317 1.77913 1.83317 2.00005C1.83317 2.22096 1.98241 2.40005 2.1665 2.40005ZM3.83317 2.00005C3.83317 2.22096 3.68393 2.40005 3.49984 2.40005C3.31574 2.40005 3.1665 2.22096 3.1665 2.00005C3.1665 1.77913 3.31574 1.60005 3.49984 1.60005C3.68393 1.60005 3.83317 1.77913 3.83317 2.00005ZM4.83317 2.40005C5.01726 2.40005 5.1665 2.22096 5.1665 2.00005C5.1665 1.77913 5.01726 1.60005 4.83317 1.60005C4.64908 1.60005 4.49984 1.77913 4.49984 2.00005C4.49984 2.22096 4.64908 2.40005 4.83317 2.40005ZM5.83317 2.80005C5.83317 3.02096 5.68393 3.20005 5.49984 3.20005C5.31574 3.20005 5.1665 3.02096 5.1665 2.80005C5.1665 2.57914 5.31574 2.40005 5.49984 2.40005C5.68393 2.40005 5.83317 2.57914 5.83317 2.80005ZM4.1665 3.20005C4.3506 3.20005 4.49984 3.02096 4.49984 2.80005C4.49984 2.57914 4.3506 2.40005 4.1665 2.40005C3.98241 2.40005 3.83317 2.57914 3.83317 2.80005C3.83317 3.02096 3.98241 3.20005 4.1665 3.20005ZM3.1665 2.80005C3.1665 3.02096 3.01727 3.20005 2.83317 3.20005C2.64908 3.20005 2.49984 3.02096 2.49984 2.80005C2.49984 2.57914 2.64908 2.40005 2.83317 2.40005C3.01727 2.40005 3.1665 2.57914 3.1665 2.80005ZM1.49984 3.20005C1.68393 3.20005 1.83317 3.02096 1.83317 2.80005C1.83317 2.57914 1.68393 2.40005 1.49984 2.40005C1.31574 2.40005 1.1665 2.57914 1.1665 2.80005C1.1665 3.02096 1.31574 3.20005 1.49984 3.20005ZM2.49984 3.60005C2.49984 3.82096 2.3506 4.00005 2.1665 4.00005C1.98241 4.00005 1.83317 3.82096 1.83317 3.60005C1.83317 3.37913 1.98241 3.20005 2.1665 3.20005C2.3506 3.20005 2.49984 3.37913 2.49984 3.60005ZM3.49984 4.00005C3.68393 4.00005 3.83317 3.82096 3.83317 3.60005C3.83317 3.37913 3.68393 3.20005 3.49984 3.20005C3.31574 3.20005 3.1665 3.37913 3.1665 3.60005C3.1665 3.82096 3.31574 4.00005 3.49984 4.00005ZM5.1665 3.60005C5.1665 3.82096 5.01726 4.00005 4.83317 4.00005C4.64908 4.00005 4.49984 3.82096 4.49984 3.60005C4.49984 3.37913 4.64908 3.20005 4.83317 3.20005C5.01726 3.20005 5.1665 3.37913 5.1665 3.60005ZM5.49984 4.80005C5.68393 4.80005 5.83317 4.62096 5.83317 4.40005C5.83317 4.17913 5.68393 4.00005 5.49984 4.00005C5.31574 4.00005 5.1665 4.17913 5.1665 4.40005C5.1665 4.62096 5.31574 4.80005 5.49984 4.80005ZM4.49984 4.40005C4.49984 4.62096 4.3506 4.80005 4.1665 4.80005C3.98241 4.80005 3.83317 4.62096 3.83317 4.40005C3.83317 4.17913 3.98241 4.00005 4.1665 4.00005C4.3506 4.00005 4.49984 4.17913 4.49984 4.40005ZM2.83317 4.80005C3.01727 4.80005 3.1665 4.62096 3.1665 4.40005C3.1665 4.17913 3.01727 4.00005 2.83317 4.00005C2.64908 4.00005 2.49984 4.17913 2.49984 4.40005C2.49984 4.62096 2.64908 4.80005 2.83317 4.80005ZM1.83317 4.40005C1.83317 4.62096 1.68393 4.80005 1.49984 4.80005C1.31574 4.80005 1.1665 4.62096 1.1665 4.40005C1.1665 4.17913 1.31574 4.00005 1.49984 4.00005C1.68393 4.00005 1.83317 4.17913 1.83317 4.40005Z"
                                                        fill="url(#paint0_linear_12694_49953)"
                                                    />
                                                </g>
                                            </g>
                                            <defs>
                                                <filter
                                                    id="filter0_d_12694_49953"
                                                    x="1.1665"
                                                    y="0.800049"
                                                    width="4.6665"
                                                    height={5}
                                                    filterUnits="userSpaceOnUse"
                                                    colorInterpolationFilters="sRGB"
                                                >
                                                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                                                    <feColorMatrix
                                                        in="SourceAlpha"
                                                        type="matrix"
                                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                        result="hardAlpha"
                                                    />
                                                    <feOffset dy={1} />
                                                    <feColorMatrix
                                                        type="matrix"
                                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
                                                    />
                                                    <feBlend
                                                        mode="normal"
                                                        in2="BackgroundImageFix"
                                                        result="effect1_dropShadow_12694_49953"
                                                    />
                                                    <feBlend
                                                        mode="normal"
                                                        in="SourceGraphic"
                                                        in2="effect1_dropShadow_12694_49953"
                                                        result="shape"
                                                    />
                                                </filter>
                                                <linearGradient
                                                    id="paint0_linear_12694_49953"
                                                    x1="1.1665"
                                                    y1="0.800049"
                                                    x2="1.1665"
                                                    y2="4.80005"
                                                    gradientUnits="userSpaceOnUse"
                                                >
                                                    <stop stopColor="white" />
                                                    <stop offset={1} stopColor="#F0F0F0" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                        USA{" "}

                                    </button>


                                    <select
                                        id="states"
                                        onChange={(e) => handlechange2(e)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg border-l-gray-100 block w-full pr-2"
                                    >
                                        {
                                            brand.map((item) => {
                                                return (
                                                    <option value={item.brandName}>{item.brandName}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>


                                {/* sslect SKILLS */}
                                <label className="flex justify-between text-sm font-medium text-gray-700">
                                    Slect Skills
                                </label>
                                <ul className='flex flex-wrap gap-2'>
                                    {skill.map((item, index) => {
                                        return (
                                            <li

                                                onClick={() => {
                                                    handlechange(index);
                                                }}
                                                key={index}

                                                className={`${item.pos == 'act' && `border-primary border-2 bg-primary text-white`} px-4 rounded py-1 border text-base`}
                                            >
                                                {item.name}

                                            </li>
                                        );
                                    })}

                                </ul>



                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 pb-24">
                                <button
                                    onClick={editProfile}
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}