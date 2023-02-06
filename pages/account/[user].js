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
    const router = useRouter();
    const { data: session } = useSession();
    const [userId, setUserId] = useState('self');


    // fetch posts

    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState([]);



    useEffect(
        () => {
            if (router.isReady) {
                setUserId(`${router.query.uid}`);
                // fetch user post
                onSnapshot(
                    query(collection(db, "posts"),
                        orderBy("timestamp", "desc"),
                    ),
                    (snapshot) => {
                        setPosts(snapshot.docs);
                    }
                );
                // fetch user details
                onSnapshot(
                    query(
                        collection(db, "users"),
                        where('uid', '==', userId)
                    ),
                    (snapshot) => {
                        setUser(snapshot.docs);
                        setLoading(false);
                    }
                );
            }
        },
        [db][router.isReady]
    );

    // variables
    // user[0]?.data().profileImg

    return (
        <>
            {loading ? <Loading />
                :

                <div className="mt-12 md:mt-8 w-full px-0 md:px-24 py-6 mx-auto text-slate-500 font-[Urbanist]">

                    <div className="px-3">
                        <div className="w-full rounded-2xl overflow-hidden border">
                            <div className="bg-primary h-24">
                            </div>
                            <div className="bg-white h-40 relative">
                                <div className="h-16 absolute -top-14 left-4 md:left-12">
                                    <img
                                        className="w-24 h-24 object-cover rounded-full"
                                        src={session?.user?.image}
                                        alt="Joe Biden"
                                    />
                                    <h3 className="mt-4 text-black font-bold">{session?.user?.name}</h3>
                                    <p className="text-primary text-sm md:text-base">Joined <Moment fromNow>{user[0]?.data().timestamp?.toDate()}</Moment></p>
                                    <p className="text-sm mt-2">HVAC</p>

                                </div>

                                <div className="h-16 absolute top-16 right-2 md:right-10">
                                    <div className="grid justify-items-end">
                                        <button className="bg-primary px-4 text-base py-2 rounded-lg text-white w-24 md:w-32">
                                            Connect
                                        </button>
                                    </div>
                                </div>
                                <div className="absolute -top-9 right-2">
                                    <p className="text-sm text-white font-semibold mt-2 mr-1 text-right">0 Followers - 0 Following</p>
                                </div>
                            </div>

                        </div>
                    </div>


                    <div className="w-full px-2 mt-6 mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-8 -mx-3">

                            <div className="col-span-5 ">
                                <div className="w-full max-w-full px-4 lg-max:mt-6 mb-4">
                                    <div className="relative flex flex-col h-full min-w-0 break-words bg-white border shadow-soft-xl rounded-2xl bg-clip-border">
                                        <div className="p-4 pb-0 mb-0 border-b-0 rounded-t-2xl">
                                            <div className="flex flex-wrap -mx-3">
                                                <div className="flex items-center w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-none">
                                                    <h6 className="font-semibold text-black">Profile Information</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-auto p-4">
                                            <p className="leading-normal text-size-sm text-gray-800 mr-0 md:mr-16">{user[0]?.data()?.bio}</p>
                                            <h6 className="mt-6 mb-0 font-semibold text-black">Skills</h6>
                                            <ul className="mt-4 flex flex-wrap pl-0 mb-0 rounded-lg gap-2">
                                                {user[0]?.data()?.skills.map((e, index) => (
                                                    <li id={index} className="bg-gray-100 rounded text-sm text-black px-4 py-2">{e}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-3 w-full max-w-full px-4 lg-max:mt-6 mb-4">
                                    <div className="relative flex flex-col h-full min-w-0 break-words bg-white border shadow-soft-xl rounded-2xl bg-clip-border">
                                        <div className="p-4 pb-0 mb-0 border-b-0 rounded-t-2xl">
                                            <div className="flex flex-wrap -mx-3">
                                                <div className="flex items-center w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-none">
                                                    <h6 className="font-semibold text-black">Work Experience</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-auto p-4 mt-2">
                                            <ul>
                                                {
                                                    user[0]?.data()?.experience.map((i, index) => (
                                                        <li id={index} className="grid grid-cols-8">
                                                            <div className="col-span-2 md:col-span-1">
                                                                <img className="w-14 h-14 rounded-full object-cover" src={i?.brandImg} />
                                                            </div>
                                                            <div className="col-span-6">
                                                                <h4 className="text-lg font-bold text-black">{i?.brandname}</h4>
                                                                <div className="flex justify-between text-xs my-1 md:my-2"><p>{i?.workLocation}</p><p>{i?.expYear}</p></div>
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

                            <div className="col-span-3 w-full max-w-full px-4 lg-max:mt-6 mb-4 ">
                                <div className="relative flex flex-col h-full min-w-0 break-words border shadow-soft-xl rounded-2xl bg-clip-border">
                                    <div className="p-4 pb-0 mb-0 border-b-0 rounded-t-2xl">
                                        <h6 className="font-semibold text-black">Connections</h6>
                                    </div>
                                    <div className="flex-auto p-4">
                                        <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                                            <li className="relative flex items-center px-0 py-2 mb-2 border-0 rounded-t-lg text-inherit">
                                                <div className="inline-flex items-center justify-center w-12 h-12 mr-4 text-white transition-all duration-200 text-size-base ease-soft-in-out rounded-xl">
                                                    <img src="https://demos.creative-tim.com/soft-ui-dashboard-tailwind/assets/img/kal-visuals-square.jpg" alt="kal" className="w-full shadow-soft-2xl rounded-xl" />
                                                </div>
                                                <div className="flex flex-col items-start justify-center">
                                                    <h6 className="mb-0 leading-normal text-size-sm text-black">Sophie B.</h6>
                                                    <p className="mb-0 leading-tight text-xs">Hi! I need more information..</p>
                                                </div>
                                                <Link className="inline-block py-3 pl-0 pr-4 mb-0 ml-auto font-bold text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-xs ease-soft-in hover:scale-102 hover:active:scale-102 active:opacity-85 text-primary hover:text-fuchsia-800 hover:shadow-none active:scale-100" href="javascript:;">Reply</Link>
                                            </li>
                                            <li className="relative flex items-center px-0 py-2 mb-2 border-0 border-t-0 text-inherit">
                                                <div className="inline-flex items-center justify-center w-12 h-12 mr-4 text-white transition-all duration-200 text-size-base ease-soft-in-out rounded-xl">
                                                    <img src="https://demos.creative-tim.com/soft-ui-dashboard-tailwind/assets/img/marie.jpg" alt="kal" className="w-full shadow-soft-2xl rounded-xl" />
                                                </div>
                                                <div className="flex flex-col items-start justify-center">
                                                    <h6 className="mb-0 leading-normal text-size-sm text-black">Anne Marie</h6>
                                                    <p className="mb-0 leading-tight text-xs">Awesome work, can you..</p>
                                                </div>
                                                <Link className="inline-block py-3 pl-0 pr-4 mb-0 ml-auto font-bold text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-xs ease-soft-in hover:scale-102 hover:active:scale-102 active:opacity-85 text-primary hover:text-fuchsia-800 hover:shadow-none active:scale-100" href="javascript:;">Reply</Link>
                                            </li>
                                            <li className="relative flex items-center px-0 py-2 mb-2 border-0 border-t-0 text-inherit">
                                                <div className="inline-flex items-center justify-center w-12 h-12 mr-4 text-white transition-all duration-200 text-size-base ease-soft-in-out rounded-xl">
                                                    <img src="https://demos.creative-tim.com/soft-ui-dashboard-tailwind/assets/img/ivana-square.jpg" alt="kal" className="w-full shadow-soft-2xl rounded-xl" />
                                                </div>
                                                <div className="flex flex-col items-start justify-center">
                                                    <h6 className="mb-0 leading-normal text-size-sm text-black">Ivanna</h6>
                                                    <p className="mb-0 leading-tight text-xs">About files I can..</p>
                                                </div>
                                                <Link className="inline-block py-3 pl-0 pr-4 mb-0 ml-auto font-bold text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-xs ease-soft-in hover:scale-102 hover:active:scale-102 active:opacity-85 text-primary hover:text-fuchsia-800 hover:shadow-none active:scale-100" href="javascript:;">Reply</Link>
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="max-w-screen-xl flex flex-col h-full min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
                                <div className="pb-0 mb-0 border-b-0 rounded-t-2xl">
                                    <div className="flex flex-wrap">
                                        <div className="flex items-center w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-none">
                                            <h6 className="font-semibold text-black">Latest Activity</h6>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex overflow-x-scroll gap-4">
                                    {posts.filter(posts => posts.data().id === userId).map((post, index) => (
                                        <Post key={index} id={post.id} post={post.data()} userpage />
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