"use client";

import Image from "next/image";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { AuthType } from "@/types";
import InputFeild from "./InputFeild";
import Link from "next/link";
import { createAccount, login } from "@/lib/actions/user.action";
import OTPModal from "./OTPModal";

const AuthForm = ({ type }: { type: AuthType }) => {
    const isSignIn = type === "sign-in";
    const [isLoading, setIsLoading] = useState(false);
    const [accountId, setAccountId] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const formSchema = z.object({
        fullName: isSignIn
            ? z.string().optional()
            : z
                  .string()
                  .min(2, {
                      message: "Name must be at least 2 characters.",
                  })
                  .max(50),
        email: z.string().email({ message: "Please enter valid email." }),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);

        try {
            if (isSignIn) {
                const user = await login(values.email);
                if (!user.accountId) {
                    setErrorMessage(user.error);
                    return;
                }
                setAccountId(user.accountId);
            } else {
                const user = await createAccount({
                    fullName: values.fullName!,
                    email: values.email,
                });
                setAccountId(user.accountId);
            }
        } catch (error) {
            setErrorMessage("Failed to create an Account . Please try again.");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="flex flex-col gap-3 xl:px-30 lg:px-10 w-full px-10">
                <div className="w-full flex justify-center lg:hidden mb-5">
                    <Image
                        src="logo-full-brand.svg"
                        alt="logo"
                        width={100}
                        height={100}
                        className="w-1/2"
                    />
                </div>
                <h1 className="text-3xl font-bold text-center lg:text-start">
                    {isSignIn ? "Login" : "Create Account"}
                </h1>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 w-full"
                    >
                        {!isSignIn && (
                            <InputFeild
                                control={form.control}
                                type="text"
                                name="fullName"
                                placeholder="Enter your full name"
                                label="Full Name"
                            />
                        )}
                        <InputFeild
                            control={form.control}
                            type="email"
                            name="email"
                            placeholder="Enter your Email"
                            label="Email"
                        />

                        <Button
                            disabled={isLoading}
                            type="submit"
                            className="w-full bg-primary rounded-4xl py-7 text-xl"
                        >
                            {isSignIn ? "Login" : "Create Account"}
                            {isLoading && (
                                <Image
                                    src="loader.svg"
                                    alt="loader"
                                    height={25}
                                    width={25}
                                    className="ml-2"
                                />
                            )}
                        </Button>
                        <div className=" flex justify-center gap-1">
                            <p>
                                {isSignIn
                                    ? "Don't have an Account ?"
                                    : "Already have an Account ?"}
                            </p>
                            <Link
                                href={`${isSignIn ? "/sign-up" : "/sign-in"}`}
                                className="text-primary underline"
                            >
                                {isSignIn ? "Create" : "Login"}
                            </Link>
                        </div>
                        <div className="text-primary text-sm">
                            {errorMessage}
                        </div>
                    </form>
                </Form>
                {accountId && (
                    <OTPModal
                        email={form.getValues("email")}
                        accountId={accountId!}
                    />
                )}
            </div>
        </div>
    );
};

export default AuthForm;
