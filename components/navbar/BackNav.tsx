import Link from "next/link";

const BackNav = ({ props }: any) => {
    return (
        <div className="h-14 bg-white shadow-sm flex px-4 items-center w-full fixed top-0 z-50">
            <Link href='/'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                </svg>
            </Link>
            <h2 className="text-base font-bold ml-3 font-[Urbanist]">{props.title}</h2>
        </div>
    )
}
export default BackNav;