import Link from "next/link";
import Post from '../../components/post/Post'
import { db } from "../api/auth/firebase-config";
import { collection, query, doc, getDoc, where, getDocs } from "@firebase/firestore";
import { useSession } from "next-auth/react";
import Moment from "react-moment";
import { useRouter } from "next/router";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";

const Users = ({ userData, allposts }: any) => {
    const { data: session } = useSession();
    const router = useRouter();

    return (
        <>
            <Head>
                <title>{userData?.name} - RepairSkills</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="mt-12 md:mt-8 w-full px-0 md:px-24 py-6 mx-auto text-slate-500 font-[Urbanist] dark:text-white">

                <div className="px-3">
                    <div className="w-full rounded-2xl overflow-hidden border">
                        <div className="bg-primary h-24">
                        </div>
                        <div className="bg-white dark:bg-gray-800 h-40 relative">
                            <div className="h-16 absolute -top-14 left-4 md:left-12">
                                <img
                                    className="w-24 h-24 object-cover rounded-full"
                                    src={userData?.profileImg}
                                    alt="Joe Biden"
                                />
                                <h3 className="mt-4 text-black font-bold dark:text-white">{userData?.name}</h3>
                                <p className="text-primary text-sm md:text-base">Joined <Moment fromNow>{userData?.timestamp}</Moment></p>
                                <p className="text-sm mt-2">Experience {userData?.workExp} years +</p>

                            </div>

                            <div className="h-16 absolute top-16 right-2 md:right-10">
                                <div className="grid justify-items-end">
                                    {
                                        userData?.uid == session?.user?.uid ?
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
                                        <p className="leading-normal text-sm text-gray-800 mr-0 md:mr-16 dark:text-white">{userData?.bio}</p>
                                        <h6 className="mt-6 mb-0 font-semibold text-black dark:text-white">Skills</h6>
                                        <ul className="mt-4 flex flex-wrap pl-0 mb-0 rounded-lg gap-2">
                                            {userData?.skills?.map((e: any, index: number) => (
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
                                                userData?.experience?.map((i: any, index: number) => (
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

                                        {
                                            userData?.phone && (
                                                <li className="relative flex items-center px-0 py-2 mb-2 border-0 rounded-t-lg text-inherit">
                                                    <div className="inline-flex items-center justify-center w-12 h-12 mr-4 text-black transition-all duration-200 text-size-base ease-soft-in-out rounded-xl bg-gray-200">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                                        </svg>

                                                    </div>
                                                    <div className="flex flex-col items-start justify-center">
                                                        <h6 className="mb-0 leading-normal text-size-sm">Phone</h6>
                                                        <p className="mb-0 leading-tight text-xs">{userData?.phone}</p>
                                                    </div>


                                                </li>
                                            )
                                        }

                                        {
                                            userData?.socialLink && (
                                                <li className="relative flex items-center px-0 py-2 mb-2 border-0 rounded-t-lg text-inherit">
                                                    <div className="inline-flex items-center justify-center w-12 h-12 mr-4 text-black transition-all duration-200 text-size-base ease-soft-in-out rounded-xl bg-gray-200">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525" />
                                                        </svg>

                                                    </div>
                                                    <div className="flex flex-col items-start justify-center">
                                                        <h6 className="mb-0 leading-normal text-size-sm">Social Link</h6>
                                                        <p className="mb-0 leading-tight text-xs">{userData?.socialLink}</p>
                                                    </div>

                                                    <Link
                                                        href={userData?.socialLink}
                                                        className="inline-block py-3 pl-0 pr-4 mb-0 ml-auto font-bold text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-xs ease-soft-in hover:scale-102 hover:active:scale-102 active:opacity-85 text-primary hover:text-fuchsia-800 hover:shadow-none active:scale-100" >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
                                                        </svg>

                                                    </Link>
                                                </li>
                                            )
                                        }
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

                            {/* <div className="flex overflow-x-scroll gap-4 px-2">
                                {allposts.map((post, index) => (
                                    <Post key={index} id={post.id} post={post} userpage />
                                ))}
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}


export async function getServerSideProps(context: GetServerSidePropsContext) {


    try {
        const userRef = doc(db, 'users', context.query.user as string);
        const user = await getDoc(userRef);

        const postRef = query(collection(db, "posts"), where('id', '==', context.query.user as string));
        const Posts = await getDocs(postRef);

        const allpost = Posts.docs.map(docSnap => {
            return {
                ...docSnap.data(),
                timestamp: docSnap.data().timestamp.toMillis(),
            }
        })
        return {
            props: {
                userData: {
                    ...user.data(),
                    timestamp: user?.data().timestamp.toMillis(),
                },
                allposts: allpost,
            },
        };
    } catch (error) {
        return {
            props: {
                notFound: true,
            },
        };
    }

}

export default Users;