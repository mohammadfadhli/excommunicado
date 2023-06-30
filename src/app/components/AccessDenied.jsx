import Link from "next/link";
import { Typography } from "../materialui";

export default function AccessDenied() {
    return (
        <div className="container max-w-[1024px] mx-auto h-screen p-3">
            <div className="flex flex-col w-full h-full text-center justify-center">

                
                <Typography variant="h4">Oops, Access Denied!</Typography>

                <span className="mt-3">
                    Please <Link href="/signin" className="hover:underline text-blue-500">sign in</Link> to continue
                </span>
            </div>
        </div>
    );
}
