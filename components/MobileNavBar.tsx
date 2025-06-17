"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { menuItems } from "@/constants";
import SideMenuButton from "./SideMenuButton";
import { Button } from "./ui/button";
import { logOutUser } from "@/lib/actions/user.action";
import FileUploader from "./FileUploader";
import { MobileNavProps } from "@/types";

const MobileNavBar = ({
    fullName,
    email,
    avatar,
    $id: ownerId,
    accountId,
}: MobileNavProps) => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <div className="flex sm:hidden w-full justify-between p-4">
            <Image
                src="logo-full-brand.svg"
                alt="logo"
                width={100}
                height={100}
            />
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger>
                    <Image
                        src="/icons/menu.svg"
                        alt="menu"
                        width={20}
                        height={20}
                    />
                </SheetTrigger>
                <SheetContent className="h-screen px-3 py-3 flex flex-col ">
                    <SheetTitle>
                        <div className="flex gap-2 p-3">
                            <Image
                                src={avatar}
                                alt="user"
                                height={50}
                                width={50}
                                className="rounded-full border-2"
                            />
                            <div className="flex flex-col">
                                <h1 className="text-l">{fullName}</h1>
                                <p className="text-grey text-sm">{email}</p>
                            </div>
                        </div>
                    </SheetTitle>
                    <SheetDescription className="flex-1 flex flex-col">
                        <div className="flex-1">
                            {menuItems.map(({ url, name }, index) => (
                                <SideMenuButton
                                    name={name}
                                    pathname={pathname}
                                    url={url}
                                    key={index}
                                    type="mobile"
                                />
                            ))}
                        </div>
                        <FileUploader
                            ownerId={ownerId}
                            accountId={accountId}
                            className="flex items-center justify-center w-full"
                            buttonClassName="gap-2 w-full bg-primary text-white!  py-7 rounded-4xl cursor-pointer text-xl"
                        />

                        <Button
                            className="flex justify-center items-center gap-2 w-full bg-[#fa72742c] hover:bg-[#fa727443] py-7 rounded-4xl cursor-pointer mt-3"
                            onClick={async () => await logOutUser()}
                        >
                            <Image
                                src="/icons/logout.svg"
                                alt="logout"
                                width={25}
                                height={25}
                                className="opacity-100"
                            />
                            <p className="text-primary text-xl">Logout</p>
                        </Button>
                    </SheetDescription>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default MobileNavBar;
