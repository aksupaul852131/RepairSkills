import Login from "../components/Login";
import { getProviders, getSession } from "next-auth/react";


export default function SignIn({ session, providers }) {

    if (!session) return <Login providers={providers} />;
    return (
        <div>you are already logged in</div>
    )
}

export async function getServerSideProps(context) {

    const providers = await getProviders();
    const session = await getSession(context);

    return {
        props: {
            providers,
            session,
        },
    };
}

