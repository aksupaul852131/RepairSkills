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

    const InstallIdea = [
        {
            name: 'Split AC (IDU)',
            urlKey: 'ideaIDU'
        },
        {
            name: 'Split AC (ODU)',
            urlKey: 'acGasRefilling'
        },

    ]
    return (
        <>

            <div className="pt-6 w-full font-[Urbanist] px-3 md:px-32">
                <h1 className="font-extrabold">Select Your Daily Use Tools</h1>
                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
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

                <h1 className="mt-6 font-extrabold">AC Installation Ideas</h1>
                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
                    {
                        InstallIdea.map((e, index) => (
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


            <div className="w-1/4">

            </div>
        </>
    )
}