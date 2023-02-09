import React from "react";

export default function ToolsModal(props: any) {

    return (
        <>
            {props.showModel ? (
                <>
                    <div
                        className="justify-center w-full items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none font-[Urbanist] bg-black/80"
                    >
                        <div className="relative px-6 w-full my-6 max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none pb-6">
                                {/*header*/}
                                <div className="flex items-center justify-between px-4 pt-4 border-slate-200 rounded-t">
                                    <span></span>
                                    <button
                                        className="text-primary background-transparent font-bold uppercase text-sm outline-none focus:outline-none ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => props.closeModel(false)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                {/*body*/}
                                <div
                                    className="mt-4 px-4">
                                    <div className="relative w-full border-4 border-primary h-32">
                                        <span className="-top-5 left-4 absolute bg-primary text-white px-4 py-1 rounded">Available {props.avail.length}</span>

                                        <ul className="top-6 absolute px-2 flex flex-nowrap gap-3 overflow-y-scroll">
                                            {
                                                props.avail.map((e: any) => (
                                                    <li className="border border-r-primary px-2 py-1">{e}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    <hr className="mt-4 mb-7 " />
                                    <div className="relative w-full border-4 border-red-600 h-32">
                                        <span className="-top-5 left-4 absolute bg-red-600 text-white px-4 py-1 rounded">Missing {props.Notavail.length}</span>

                                        <ul className="top-6 absolute px-2 flex flex-nowrap gap-3 overflow-y-scroll">
                                            {
                                                props.Notavail.map((e: any) => (
                                                    <li className="border border-r-red-500 px-2 py-1">{e}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                                {/*footer*/}
                                <p className="mt-4 text-center text-xs">This Is The Result Of Your <u>Availible</u> Or  <span className="text-red-600">Not Availible</span> Tools</p>
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