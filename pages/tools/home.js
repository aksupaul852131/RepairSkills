import Link from "next/link";

export default function ToolHome() {

    const tool = [
        {
            name: 'AC Installation',
            urlKey: 'ACInstallationTools'
        },
        {
            name: 'Gas Refilling',
            urlKey: 'acGasRefilling'
        },
        {
            name: 'AC Dismantle',
            urlKey: 'acGasRefilling'
        },
        {
            name: 'AC Servicing',
            urlKey: 'acGasRefilling'
        },

    ]

    const InstallIdea = [
        {
            name: 'Split AC (IDU)',
            urlKey: 'iduInstallIdea'
        },
        {
            name: 'Split AC (ODU)',
            urlKey: 'oduInstallIdea'
        },
        {
            name: 'Split AC (IDU)',
            urlKey: 'iduInstallIdea'
        },
        {
            name: 'Split AC (ODU)',
            urlKey: 'oduInstallIdea'
        },

    ]



    return (
        <>

            <div className="pt-6 pb-24 w-full font-[Urbanist] px-3 md:px-32">
                <div className="bg-black text-white py-4 rounded-md">
                    <h1 className="text-center">Advance Pocket Tools</h1>
                </div>

                <div>
                    <h2 className="mt-6 font-extrabold">Daily Use Tools</h2>
                    <div className="border-t mt-8 mb-8 relative">
                        <span className="-top-4 left-2 text-sm absolute bg-white px-4 py-1 rounded-full border">Split</span>
                    </div>
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
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


                <div className="bg-primary shadow-xl py-6 -mx-3 px-4 mt-6">
                    <h2 className="font-extrabold text-white text-center">AC Installation Ideas</h2>
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3 overflow-y-scroll h-16">
                        {
                            InstallIdea.map((e, index) => (
                                <Link
                                    key={index}
                                    href={{
                                        pathname: '/tools/get/tools-list',
                                        query: { key: `${e.urlKey}` },
                                    }}
                                >
                                    <div className="bg-white rounded-lg border-2 border-primary h-16 w-full grid items-center text-center">
                                        <h2>{e.name}</h2>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                    <div className="border-t mt-8 mb-2 relative">
                        <span className="-top-4 left-1/3 text-sm ml-2 absolute bg-white px-4 py-1 rounded-full border">Show More</span>
                    </div>
                </div>

                <div>
                    <div className="border-t mt-8 mb-8 relative">
                        <span className="-top-4 left-2 text-sm absolute bg-white px-4 py-1 rounded-full border">Window</span>
                    </div>
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
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
            </div>


            <div className="w-1/4">

            </div>
        </>
    )
}