
import { deleteDoc, doc } from "@firebase/firestore";
import { db } from "../../pages/api/auth/firebase-config";
import Moment from "react-moment";
import Linkify from 'react-linkify';
import { useState } from 'react'

function Comment({ comment, postid, commentAuthor }) {
  const [deleteMenu, setDeleteMenu] = useState(false);
  return (
    <div className="p-3 flex border-b border-gray-300">

      <img
        src={comment?.userImg}
        alt={`${comment?.username} - RepairSkills.com`}
        className="h-11 w-11 rounded-full mr-4"
      />
      <div className="flex flex-col space-y-2 w-full">
        <div className="flex justify-between">
          <div className="">
            <div className="inline-block group">
              <h3 className="font-bold text-[15px] sm:text-base inline-block group-hover:underline dark:text-white">
                {comment?.username}
              </h3>
              <span className="ml-1.5 text-sm sm:text-[15px] dark:text-gray-400">
                @{comment?.tag}{" "}
              </span>
              <br />

            </div>
            <br />
            <span className="hover:underline text-sm sm:text-[15px] text-gray-600 dark:text-gray-200">
              <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
            </span>
            <content>
              <p className="linkify">
                <Linkify>
                  {comment?.comment}
                </Linkify>
              </p>

            </content>
          </div>
          <div className="icon group flex-shrink-0">
            {/* <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" /> */}
          </div>
        </div>

        <div className="text-[#6e767d] flex justify-between w-10/12">

          {commentAuthor === comment.userid && (
            <div
              onClick={() => deleteMenu ? setDeleteMenu(false) : setDeleteMenu(true)
              }
              className="icon group">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </div>)

          }

        </div>
      </div>


      {
        deleteMenu && (<div
          className="justify-center select-none mx-2 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative mx-auto w-full">
            {/*content*/}
            <div className="border rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-gray-700 outline-none focus:outline-none">
              {/*header*/}
              <div className="w-full pt-5 pb-4 px-4">
                <h6 className="w-full">
                  are you sure to Delete ?
                </h6>
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => setDeleteMenu(false)}
                    className="bg-gray-100/80 rounded-full px-4 py-1 text-sm">Cancel</button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteDoc(doc(db, "posts", postid, "comments", comment?.id));
                    }}
                    className="bg-primary rounded-full px-4 py-1 text-sm">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>)}

    </div>
  );
}

export default Comment;
