import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../options";
import AccessDenied from "../components/AccessDenied";

export default async function Page(){

    const session = await getServerSession(authOptions)

    if(!session)
    {
        return <AccessDenied></AccessDenied>
    }

    return <div className="container max-w-[1024px] mx-auto p-3"><h1 className="mt-5">this is your profile</h1></div>

}