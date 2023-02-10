import React from "react";

export default function ImageView(props: any) {

    return (
        <>
            {props.showModel != 'null' ? (
                <>
                    <div
                        onClick={() => props.closeModel('null')}
                        className="justify-center w-full h-full items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none font-[Urbanist] bg-black/80"
                    >
                        <div className="relative px-6 w-full my-6 max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none pb-6">
                                {/*header*/}
                                <div className="flex items-center justify-between px-4 pt-4 border-slate-200 rounded-t">
                                    <span></span>
                                    <button
                                        className="text-primary background-transparent font-bold uppercase text-sm outline-none focus:outline-none ease-linear transition-all duration-150"
                                        type="button"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                {/*body*/}
                                <div
                                    className="mt-4 px-4">
                                    <img src={props.showModel} className='w-full' />
                                </div>
                                {/*footer*/}
                                <div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}