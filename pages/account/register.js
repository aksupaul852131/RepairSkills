import { db, app } from '../api/auth/firebase-config';
import 'firebase/auth';
import { useState } from "react";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Router, useRouter } from 'next/router';
import { doc, getDoc, serverTimestamp, setDoc } from "@firebase/firestore";


function Register() {
    const [page, setPage] = useState('login');
    const auth = getAuth(app);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    function signInWEAP(e) {

        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(auth.currentUser.uid)

            const userData = {
                ONLINE: true,
                brand: '',
                username: name,
                email: email,
                photoUrl: 'empety',
                bio: '',
                uid: auth.currentUser.uid,
                experience: '',
                expert: '',
                followers: [],
                following: [],
                language: 'hi',
                mobile: '',
                service: '',
                token: '',
            }
            setDoc(doc(db, "users", auth.currentUser.uid), userData);


            router.push('/');
            // ...
        })
            .catch((error) => {
                console.log(error)
            });

    }
    const onChangeHandlerN = event => {
        setName(event.target.value);
    };
    const onChangeHandlerP = event => {
        setPassword(event.target.value);
    };
    const onChangeHandlerE = event => {
        setEmail(event.target.value);
    };

    return (
        <section className="flex bg-white w-screen -mt-16 flex-col md:flex-row h-screen items-center font-[Urbanist]">
            <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
                <img
                    src="https://source.unsplash.com/random"
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>
            <div
                className="bg-[url(https://source.unsplash.com/random)] md:bg-[url()] md::bg-white w-full md:max-w-md lg:max-w-full md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
  flex items-center justify-center"
            >
                <div className="w-full h-100">
                    <center> <img src='/RepairSkills.png' className='w-40' alt='ReairSkils' width={100} height={100} title='Home' /></center>
                    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Create an acconut
                            </h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={onChangeHandlerN} value={name}
                                        id="name"
                                        name="name"
                                        type="name"
                                        autoComplete="name"
                                        required
                                        className="block w-full bg-white mb-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={onChangeHandlerE} value={email}
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full bg-white mb-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>

                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        onChange={onChangeHandlerP} value={password}
                                        className="block w-full bg-white mb-6 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    onClick={signInWEAP}
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Connect Me
                                </button>
                            </div>


                            <p className="mt-10 text-center text-sm text-gray-500">
                                are you Not connected ?{' '}
                                <a href='/account/register' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                    Login Please
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );


}


export default Register;
