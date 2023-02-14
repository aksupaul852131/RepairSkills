import Link from "next/link";
import { useEffect, useState } from "react";
import Post from '../../components/post/Post'
import { db } from "../api/auth/firebase-config";
import { onSnapshot, collection, query, orderBy, doc, getDoc, where } from "@firebase/firestore";
import { useSession } from "next-auth/react";
import Moment from "react-moment";
import Loading from "../../components/utils/Loading";
import { useRouter } from "next/router";

const Users = () => {

    const [loading, setLoading] = useState(true);
    const { data: session } = useSession();

    const [filterposts, setFilterPosts] = useState([]);
    const [user, setUser] = useState([]);
    const router = useRouter();

    useEffect(() => { getResponse() }, []);


    const getResponse = async () => {
        // getting the query UID
        const urlSearchParams = new URLSearchParams(window.location.search)
        const data = urlSearchParams.get('uid');


        if(data != 'undefined') {
            const docRef = doc(db, "users", data);
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()) {
                // set user data
                setUser(docSnap.data());
                // fetch user post
                onSnapshot(
                    query(collection(db, "posts"),
                        orderBy("timestamp", "desc"),
                    ),
                    (snapshot) => {
                        setFilterPosts(snapshot.docs.filter(e => e.data().id == data).map((doc) => ({ ...doc.data(), id: doc.id })))
                    }
                );

                setLoading(false);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }
    }


    return (
        <>
            {loading ? <Loading />
                :

                <div className="mt-12 md:mt-8 w-full px-0 md:px-24 py-6 mx-auto text-slate-500 font-[Urbanist] dark:text-white">

                    <div className="px-3">
                        <div className="w-full rounded-2xl overflow-hidden border">
                            <div className="bg-primary h-24">
                            </div>
                            <div className="bg-white dark:bg-gray-800 h-40 relative">
                                <div className="h-16 absolute -top-14 left-4 md:left-12">
                                    <img
                                        className="w-24 h-24 object-cover rounded-full"
                                        src={user?.profileImg}
                                        alt="Joe Biden"
                                    />
                                    <h3 className="mt-4 text-black font-bold dark:text-white">{user?.name}</h3>
                                    <p className="text-primary text-sm md:text-base">Joined <Moment fromNow>{user?.timestamp?.toDate()}</Moment></p>
                                    <p className="text-sm mt-2">Experience {user?.workExp} years +</p>

                                </div>

                                <div className="h-16 absolute top-16 right-2 md:right-10">
                                    <div className="grid justify-items-end">
                                        {
                                            user?.uid == session?.user?.uid ?
                                                <button onClick={() => router.push('/account/edit-profile')} className="bg-gray-100 px-4 text-base py-2 rounded-lg text-black w-24 md:w-32 hover:bg-primary hover:text-white">
                                                    Edit
                                                </button>
                                                :
                                                <button className="bg-primary px-4 text-base py-2 rounded-lg text-white w-24 md:w-32">
                                                    Connect
                                                </button>
                                        }

                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>


                    <div className="w-full px-2 mt-6 mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-8 -mx-3">

                            <div className="col-span-5 ">
                                <div className="w-full max-w-full px-4 lg-max:mt-6 mb-4">
                                    <div className="relative px-0 md:px-4 flex flex-col h-full min-w-0 break-words bg-white dark:bg-gray-800  border shadow-soft-xl rounded-2xl bg-clip-border">
                                        <div className="p-4 pb-0 mb-0 border-b-0 rounded-t-2xl">
                                            <div className="flex flex-wrap -mx-3">
                                                <div className="flex items-center w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-none">
                                                    <h6 className="font-semibold text-black dark:text-white">Profile Information</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-auto p-4">
                                            <p className="leading-normal text-size-sm text-gray-800 mr-0 md:mr-16 dark:text-white">{user?.bio}</p>
                                            <h6 className="mt-6 mb-0 font-semibold text-black dark:text-white">Skills</h6>
                                            <ul className="mt-4 flex flex-wrap pl-0 mb-0 rounded-lg gap-2">
                                                {user?.skills?.map((e, index) => (
                                                    <li id={index} className="bg-gray-100 rounded text-sm text-black px-4 py-2">{e}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-3 w-full max-w-full px-4 lg-max:mt-6 mb-4">
                                    <div className="relative px-0 md:px-4 flex flex-col h-full min-w-0 break-words bg-white dark:bg-gray-800 border shadow-soft-xl rounded-2xl bg-clip-border">
                                        <div className="p-4 pb-0 mb-0 border-b-0 rounded-t-2xl">
                                            <div className="flex flex-wrap -mx-3">
                                                <div className="flex items-center w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-none">
                                                    <h6 className="font-semibold text-black dark:text-white">Work Experience</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-auto p-4 mt-2">
                                            <ul>
                                                {
                                                    user?.experience?.map((i, index) => (
                                                        <li id={index} className="grid grid-cols-8">
                                                            <div className="col-span-2 md:col-span-1">
                                                                <img className="w-14 h-14 rounded-full object-cover" src={i?.brandImg} />
                                                            </div>
                                                            <div className="col-span-6">
                                                                <h4 className="text-lg font-bold text-black hover:text-primary dark:text-white"><Link href={i?.brandLink}>{i?.brandName}</Link></h4>
                                                                <div className="flex justify-between text-xs my-1 md:my-2"><p>{i?.workLocation}</p></div>
                                                                <p className="text-xs">{i?.brandInfo}</p>
                                                            </div>
                                                        </li>
                                                    ))
                                                }

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-3 w-full max-w-full px-4 lg-max:mt-6 mb-4 max-h-56">
                                <div className="relative px-0 md:px-4 flex flex-col h-full min-w-0 break-words border shadow-soft-xl rounded-2xl bg-clip-border">
                                    <div className="p-4 pb-0 mb-0 border-b-0 rounded-t-2xl">
                                        <h6 className="font-semibold text-black dark:text-white">Connections</h6>
                                    </div>
                                    <div className="flex-auto p-4">
                                        <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                                            <li className="relative flex items-center px-0 py-2 mb-2 border-0 rounded-t-lg text-inherit">
                                                <div className="inline-flex items-center justify-center w-12 h-12 mr-4 text-black transition-all duration-200 text-size-base ease-soft-in-out rounded-xl bg-gray-200">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                                    </svg>

                                                </div>
                                                <div className="flex flex-col items-start justify-center">
                                                    <h6 className="mb-0 leading-normal text-size-sm">Phone</h6>
                                                    <p className="mb-0 leading-tight text-xs">+918825105520</p>
                                                </div>

                                                <div className="inline-block py-3 pl-0 pr-4 mb-0 ml-auto font-bold text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-xs ease-soft-in hover:scale-102 hover:active:scale-102 active:opacity-85 text-primary hover:text-fuchsia-800 hover:shadow-none active:scale-100" >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
                                                    </svg>

                                                </div>
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <div className="max-w-screen-xl flex flex-col h-full min-w-0 break-words bg-white dark:bg-gray-800 shadow-soft-xl rounded-2xl bg-clip-border">
                                <div className="pt-3 mb-2 border-b-0 rounded-t-2xl">
                                    <div className="flex flex-wrap">
                                        <div className="flex items-center w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-none">
                                            <h6 className="font-semibold text-black dark:text-white">Latest Activity</h6>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex overflow-x-scroll gap-4 px-2">
                                    {filterposts.map((post, index) => (
                                        <Post key={index} id={post.id} post={post} userpage />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }




        </>
    )
}

export default Users;