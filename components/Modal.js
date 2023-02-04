import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atoms/modalAtom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import {
  onSnapshot,
  doc,
  query,
  addDoc,
  collection,
  serverTimestamp,
} from "@firebase/firestore";
import { db } from "../firebase";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Moment from "react-moment";

function Modal({ id }) {


  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );


  return (
    <>



      <div className="bg-white py-1 flex items-center w-full gap-2">
        {/* <img className="rounded-full w-10" src={session?.user?.image} /> */}
        <input
          className="w-full bg-white dark:bg-dim-400 border-gray-200 dark:border-dim-400 text-black focus:bg-gray-100 dark:focus:bg-dim-900 focus:outline-none focus:border focus:border-blue-200 font-normal h-10 md:h-12 flex items-center pl-4 text-sm rounded-md border"
          placeholder="write something here"
        />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
      </div>
    </>
  );
}

export default Modal;
