import Link from "next/link";

export default function ToolHome() {

    const tool = [
        {
            name: 'Split AC Install',
            urlKey: 'acInstall'
        },
        {
            name: 'Gas Refilling',
            urlKey: 'acGasRefilling'
        },

    ]
    return (
        <>

            <div className="font-[Urbanist] px-3">
                <h1 className="font-extrabold">Select Your Daily Use Tools</h1>
                <div className="mt-6 grid grid-cols-2 gap-3">
                    {
                        tool.map((e, index) => (
                            <Link
                                key={index}
                                href={{
                                    pathname: '/tools/get/tools-list',
                                    query: { key: `${e.urlKey}` },
                                }}
                            >
                                <div className="bg-primary/30 rounded border-2 border-primary h-32 w-full grid items-center text-center">
                                    <h2>{e.name}</h2>
                                </div>
                            </Link>
                        ))
                    }

                </div>
            </div>
        </>
    )
}