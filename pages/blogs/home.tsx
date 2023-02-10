import Link from "next/link";

export default function BlogHome() {
    return (
        <>
            <div className="font-[Urbanist]">


                <div>
                    <div className="px-3">
                        <img className="w-full rounded-lg object-cover" src='https://assets.justinmind.com/wp-content/uploads/2022/06/website-template-justinmind-400x250.png' />
                    </div>
                    <h2 className="mt-6 font-bold px-3">Latest Update</h2>
                    <ul className="mt-4">
                        <Link href='/blogs/article/l' >
                            <li className="px-4">
                                <div className="flex gap-4 w-full">
                                    <img className="w-28 h-28 rounded-lg object-cover" src='https://www.daikin.com/-/media/Project/Daikin/daikin_com/corporate/why_daikin/benefits/inverter/images/pic_energy_consumption-jpg.jpg?rev=-1&hash=3C939BFEE54CDE47F095E3E1A2D0B540' />
                                    <div>
                                        <h2 className="text-sm font-bold hover:text-primary">New Invetrer Technology Introduce, By Daikin in World wide</h2>
                                        <h4 className="mt-3 text-secondry text-sm">26 jan 2023 - By Ak Supaul</h4>
                                        <p className="flex text-xs mt-2"><span className="bg-black rounded-full px-2 text-white mr-2">New Technology</span>Read More<span></span></p>
                                    </div>
                                </div>
                            </li>
                        </Link>

                    </ul>
                </div>
            </div>
        </>
    )
}