import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { useSession } from "next-auth/react"
import Head from "next/head";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import uuid from "react-uuid";
import { db, storage } from "../../api/auth/firebase-config";

export default function EditPost() {

    const { data: session } = useSession();

    const [name, setName] = useState("");
    const [bio, setBio] = useState('');
    const [phone, setPhone] = useState('');
    const [social, setSocial] = useState("");
    const [year, setYear] = useState(1);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const [selectedFile, setSelectedFile] = useState(null);
    const filePickerRef = useRef(null);
    const [postId, setPostId] = useState(uuid());

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

        const userData = {
            name: name,
            bio: bio,
            skills: skill.filter(i => i.pos == 'act').map((e) => (e.name)),
            workExp: year,
            experience: brandIndex.length == 0 ? [brand[0]] : brandIndex,
            phone: phone ? phone : '',
            socialLink: social ? social : '',
        }
        await updateDoc(doc(db, "users", session.user.uid), userData);


        const imageRef = ref(storage, `users/${session.user.name}/${postId}-profile`);

        if(selectedFile) {
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
        if(session && loading) {
            const docRef = doc(db, "users", session.user.uid);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()) {
                setName(docSnap.data().name);
                setBio(docSnap.data().bio);
                setYear(docSnap.data().workExp);
                setSocial(docSnap?.data()?.socialLink);
                setPhone(docSnap?.data()?.phone);
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

        <>
            <Head>
                <title>Edit Profile</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <div className="md:grid md:grid-cols-3 md:gap-6 pt-8 font-[Urbanist]">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0 ml-0 md:ml-12">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Profile</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                This information will be displayed publicly so be careful what you
                                share.
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form action="#" method="POST">
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                                <div className="px-4 py-5space-y-6 sm:p-6">

                                    <div className="input-feild">
                                        <label for="first_name">Name</label>
                                        <input
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            type="text" id="first_name" placeholder="John" required />
                                    </div>

                                    <div className="input-feild mt-3">
                                        <label for="first_name">Bio</label>
                                        <textarea
                                            id="about"
                                            name="about"
                                            value={bio}
                                            onChange={(e) => setBio(e.target.value)}
                                            rows={3}
                                            className="shadow-sm border p-2 focus:border-primary mt-1 block w-full sm:text-sm border-gray-300 bg-gray-50 dark:bg-gray-800 rounded-md"
                                            placeholder="bio"
                                            defaultValue={""}
                                        />
                                    </div>

                                    <div className="input-feild mt-3">
                                        <label for="first_name">contact number</label>
                                        <input
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            type="text" id="first_name" placeholder="phone number" />
                                    </div>


                                    <div className="input-feild mt-3">
                                        <label for="first_name">Social URL</label>
                                        <input
                                            value={social}
                                            onChange={(e) => setSocial(e.target.value)}
                                            type="text" id="first_name" placeholder="e.g. facebook url" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mt-3 mb-2 dark:text-white">
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
                                        <label className="mt-3 flex justify-between text-sm font-medium text-gray-700 dark:text-white">
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
                                    <label className="flex justify-between text-sm font-medium text-gray-700 mt-3 mb-2 dark:text-white">
                                        Work With
                                    </label>
                                    <div className="flex">
                                        <button
                                            id="states-button"
                                            data-dropdown-toggle="dropdown-states"
                                            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                                            type="button"
                                        >

                                            Select{" "}

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
                                    <label className="mt-3 mb-2 flex justify-between text-sm font-medium text-gray-700 dark:text-white">
                                        Select Skills
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
                                <div className="px-4 py-3 text-right sm:px-6 pb-24">
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

        </>

    )
}