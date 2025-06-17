import MobileNavBar from "@/components/MobileNavBar";
import Navbar from "@/components/Navbar";
import SideMenu from "@/components/SideMenu";
import { Toaster } from "@/components/ui/sonner";
import { getCurrentUser } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import React from "react";

export default async function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await getCurrentUser();
    if (!user) return redirect("/sign-in");

    return (
        <div className="bg-white p-0 flex  h-screen sm:p-5">
            <SideMenu {...user} />
            <div className="flex-1 h-full flex flex-col">
                <Navbar
                    ownerId={user.$id}
                    accountId={user.accountId}
                    className=""
                    buttonClassName=""
                />
                <MobileNavBar {...user} />
                <div className="flex-1 bg-white-100 sm:mt-5 sm:rounded-lg overflow-auto">
                    {children}
                </div>
            </div>
            <Toaster
                closeButton
                toastOptions={{
                    classNames: {
                        description: "!text-white",
                        title: "!text-white",
                        closeButton: "bg-white !hover:font-white",
                        cancelButton: "bg-white",
                    },
                }}
            />
        </div>
    );
}
