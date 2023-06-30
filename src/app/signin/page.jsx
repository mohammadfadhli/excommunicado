import { getServerSession } from "next-auth";
import SignInForm from "../components/SignInForm";
import { authOptions } from "../options";
import { redirect } from "next/navigation";

export default async function Page() {

    const session = await getServerSession(authOptions)

    if(session)
    {
        redirect("/")
    }

    return (
        <>
            <div className="container max-w-[1024px] mx-auto p-3">
                <SignInForm></SignInForm>
            </div>
        </>
    );
}
