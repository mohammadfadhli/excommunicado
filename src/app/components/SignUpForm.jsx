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

export default function SignUpForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cfmpassword, setCfmpassword] = useState("");
    const { createUser } = useContext(AuthContext);
    const [errormsg, setErrormsg] = useState("")

    async function signUp(e) {
        e.preventDefault();

        if(password != cfmpassword)
        {
            setErrormsg("Passwords do not match!")
            console.log("Passwords do not match!")
        }
        else
        {
            await createUser(email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                localStorage.setItem("uid", user.uid) // use localstorage so that browser need not wait for firebase auth to finish calling state change
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                setErrormsg(errorMessage)
                // ..
            });
        }

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
                Sign Up
            </Typography>
            <Typography color="white" className="mt-1 font-normal">
                Enter your details to register.
            </Typography>
            <form className="mt-8 mb-2" onSubmit={signUp}>
                <div className="mb-4 flex flex-col gap-6">
                    {/* <Input size="lg" label="Name" color="white"/> */}
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
                    <Input
                        type="password"
                        size="lg"
                        label="Confirm Password"
                        color="white"
                        onChange={(e) => {
                            setCfmpassword(e.target.value);
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
                            I agree the
                            <a
                                href="#"
                                className="font-medium transition-colors hover:text-blue-500"
                            >
                                &nbsp;Terms and Conditions
                            </a>
                        </Typography>
                    }
                    containerProps={{ className: "-ml-2.5" }}
                />
                <Button type="submit" className="mt-6" fullWidth>
                    Register
                </Button>
                <Typography
                    color="white"
                    className="mt-4 text-center font-normal"
                >
                    Already have an account?{" "}
                    <a
                        href="/signin"
                        className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                    >
                        Sign In
                    </a>
                </Typography>
            </form>
        </Card>
    );
}
