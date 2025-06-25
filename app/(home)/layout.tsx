import FileUploader from "@/components/FileUploader";
import MobileNavBar from "@/components/MobileNavBar";
import Navbar from "@/components/Navbar";
import SideMenu from "@/components/SideMenu";
import { Toaster } from "@/components/ui/sonner";
import { getCurrentUser } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic";

export default async function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await getCurrentUser();
    if (!user) return redirect("/sign-in");

    return (
        <div className="bg-white dark:bg-black p-0 flex  h-screen sm:p-5">
            <SideMenu {...user} />
            <div className="flex-1 h-full flex flex-col">
                <Navbar
                    ownerId={user.$id}
                    accountId={user.accountId}
                    className=""
                    buttonClassName=""
                />
                <MobileNavBar {...user} />
                <div className="flex-1 bg-white-100 sm:dark:bg-[#181a1b] dark:bg-black sm:mt-5 sm:rounded-lg overflow-auto relative">
                    <FileUploader
                        ownerId={user.$id}
                        accountId={user.accountId}
                        className="flex sm:hidden items-center justify-center w-fit bottom-2 right-2 fixed z-50 "
                        buttonClassName="gap-1 w-full bg-primary py-7 rounded-4xl cursor-pointer text-l"
                    />
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
