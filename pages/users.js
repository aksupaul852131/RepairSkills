import Link from "next/link";
import { useEffect, useState } from "react";
import Post from '../components/post/Post'
import { db } from "../pages/api/auth/firebase-config";
import { onSnapshot, collection, query, orderBy } from "@firebase/firestore";
import { useSession } from "next-auth/react";

const Users = () => {
    const skills = [{ id: 0, name: 'AC Tech' }, { id: 1, name: 'Refrigrator' },]
    const { data: session } = useSession();


    // fetch posts

    const [posts, setPosts] = useState([]);

    useEffect(
        () =>
            onSnapshot(
                query(collection(db, "posts"), orderBy("timestamp", "desc")),
                (snapshot) => {
                    setPosts(snapshot.docs);
                }
            ),
        [db]
    );


    const [user, setUser] = useState([]);
    // useEffect(
    //     () =>
    //         onSnapshot(
    //             query(
    //                 collection(db, "users", '114598827000894450855')
    //             ),
    //             (snapshot) => setUser(snapshot.docs)
    //         ),
    //     [db]
    // );




    return (
        <>

            <div className="mt-12 w-full px-0 md:px-24 py-6 mx-auto loopple-min-height-78vh text-slate-500 font-[Urbanist]">

                <div className="px-2 ">
                    <div className="w-full rounded-2xl overflow-hidden border">
                        <div className="bg-primary h-24">
                        </div>
                        <div className="bg-white h-32 relative">
                            <div className="h-16 absolute -top-12 left-6">
                                <img
                                    className="w-16 rounded-full"
                                    src="https://pbs.twimg.com/profile_images/1308769664240160770/AfgzWVE7_normal.jpg"
                                    alt="Joe Biden"
                                />
                                <h3 className="mt-4 text-black font-bold">{session?.user.uid}</h3>
                                <p className="text-primary text-sm md:text-base">Joined 24 Jan 2022</p>
                                <p className="text-sm mt-2">HVAC Engineer</p>
                            </div>

                            <div className="h-16 absolute top-10 right-2">

                                <button className="bg-primary px-4 text-base py-2 rounded-lg text-white mr-auto">
                                    Connect
                                </button>

                                <p className="text-sm mt-2 mr-1 text-right">1k Connections</p>
                            </div>
                        </div>

                    </div>
                </div>


                <div className="w-full p-3 mt-6 mx-auto">
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
                                        <p className="leading-normal text-size-sm text-gray-800 mr-0 md:mr-16">Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).</p>
                                        <h6 className="mt-6 mb-0 font-semibold text-black">Skills</h6>
                                        <ul className="mt-4 flex flex-wrap pl-0 mb-0 rounded-lg gap-2">
                                            {skills.map((e) => (
                                                <li id={e.id} className="bg-gray-100 rounded text-sm text-black px-4 py-2">{e.name}</li>
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
                                            <li className="grid grid-cols-8">
                                                <div className="col-span-2 md:col-span-1 justify-self-center">
                                                    <div className="bg-[url(https://upload.wikimedia.org/wikipedia/commons/e/ec/Lg_logo_II_c%C3%B3pia.jpg)] w-14 h-14 bg-cover bg-center bg-no-repeat rounded-full bg-black">
                                                    </div>
                                                </div>
                                                <div className="col-span-6">
                                                    <h4 className="text-lg font-bold text-black">LG Copration</h4>
                                                    <div className="flex justify-between text-xs my-1 md:my-2"><p>Service Center - Delhi India</p><p>7 year Experience</p></div>
                                                    <p className="text-xs">LG is a well-known brand in the air conditioning industry, offering a range of energy-efficient and technologically advanced ACs for both residential and commercial use.</p>
                                                </div>
                                            </li>
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

                    <div className="w-full max-w-full lg-max:mt-6 mb-4">
                        <div className="relative flex flex-col h-full min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
                            <div className="pb-0 mb-0 border-b-0 rounded-t-2xl">
                                <div className="flex flex-wrap">
                                    <div className="flex items-center w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-none">
                                        <h6 className="font-semibold text-black">Latest Activity</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="flex overflow-x-scroll gap-4">
                                {posts.map((post) => (
                                    <Post key={post.id} id={post.id} post={post.data()} userpage />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default Users;