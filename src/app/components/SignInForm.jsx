"use client";

import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Alert
} from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../firebase/auth";

export default function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { logIn } = useContext(AuthContext);
    const [errormsg, setErrormsg] = useState("")

    async function signIn(e) {
        e.preventDefault();

        await logIn(email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                localStorage.setItem("uid", user.uid) // use localstorage so that browser need not wait for firebase auth to finish calling state change
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrormsg(errorMessage)
                console.log(errorMessage);
                // ..
            });
    }

    useEffect(() => {
        if (errormsg) {
            const toRef = setTimeout(() => {
                setErrormsg("");
                clearTimeout(toRef);
            }, 2000);
        }
    }, [errormsg]);

    function ShowAlert() {
        if (errormsg) {
            return (
                <>
                    <Alert color="red">{errormsg}</Alert>
                </>
            );
        }
    }

    return (
        <Card
            color="transparent"
            shadow={false}
            className="max-w-xl mx-auto mt-5"
        >
            <Typography variant="h4" color="white">
                Sign In
            </Typography>
            <Typography color="white" className="mt-1 font-normal">
                Welcome back to excommunicado
            </Typography>
            <form className="mt-8 mb-2" onSubmit={signIn}>
                <div className="mb-4 flex flex-col gap-6">
                    <Input
                        size="lg"
                        label="Email"
                        color="white"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <Input
                        type="password"
                        size="lg"
                        label="Password"
                        color="white"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <ShowAlert></ShowAlert>
                </div>
                <Checkbox
                    label={
                        <Typography
                            variant="small"
                            color="white"
                            className="flex items-center font-normal"
                        >
                            Remember Me
                        </Typography>
                    }
                    containerProps={{ className: "-ml-2.5" }}
                />
                <Button type="submit" className="mt-6" fullWidth>
                    Sign In
                </Button>
                <Typography
                    color="white"
                    className="mt-4 text-center font-normal"
                >
                    Don't have an account?{" "}
                    <a
                        href="/signup"
                        className="font-medium text-blue-500 transition-colors hover:underline"
                    >
                        Sign Up
                    </a>
                </Typography>
            </form>
        </Card>
    );
}
