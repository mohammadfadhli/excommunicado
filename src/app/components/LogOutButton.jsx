"use client";
import { Button } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { AuthContext } from "../firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LogOutButton(params) {
    const { logOut, currentUser } = useContext(AuthContext);

    async function logout() {
        await logOut()
            .then(() => {
                // Sign-out successful.
                localStorage.removeItem("uid");
            })
            .catch((error) => {
                // An error happened.
            });
    }

    if (params.type == "mobile") {
        if (params.currentUid || params.currentuser) {
            return (
                <Button
                    onClick={logout}
                    variant="gradient"
                    size="sm"
                    fullWidth
                    className="mb-2"
                >
                    <span>Log Out</span>
                </Button>
            );
        }
        return (
            <Link href="/signin">
                <Button variant="gradient" size="sm" fullWidth className="mb-2">
                    <span>Sign In</span>
                </Button>
            </Link>
        );
    } else {
        if (params.currentUid || params.currentuser) {
            return (
                <Button
                    onClick={logout}
                    variant="gradient"
                    size="sm"
                    className="hidden lg:inline-block"
                >
                    <span>Log Out</span>
                </Button>
            );
        }

        return (
            <Link href="/signin">
                <Button
                    variant="gradient"
                    size="sm"
                    className="hidden lg:inline-block"
                >
                    <span>Sign In</span>
                </Button>
            </Link>
        );
    }
}
