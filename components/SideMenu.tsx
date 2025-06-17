"use client";
import React from "react";
import Image from "next/image";
import SideMenuButton from "./SideMenuButton";
import { usePathname } from "next/navigation";
import { menuItems } from "@/constants";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const SideMenu = ({
    fullName,
    email,
    avatar,
}: {
    fullName: string;
    email: string;
    avatar: string;
}) => {
    const pathname = usePathname();
    return (
        <div className="xl:w-1/5 lg:w-1/6 sm:flex hidden flex-col justify-between items-center pr-5">
            <div className="flex items-center">
                <Image
                    src="logo-full-brand.svg"
                    alt="logo"
                    height={100}
                    width={150}
                    className="hidden lg:block"
                />
                <Image
                    src="logo-brand.svg"
                    alt="logo"
                    height={50}
                    width={50}
                    className="block lg:hidden"
                />
            </div>
            <div className="flex flex-col gap-2 mt-15 w-full flex-1">
                {menuItems.map(({ url, name }, index) => (
                    <SideMenuButton
                        name={name}
                        pathname={pathname}
                        url={url}
                        key={index}
                        type="other"
                    />
                ))}
            </div>
            <div className="w-full xl:flex justify-center hidden mb-2">
                <Image
                    src="/file-2.svg"
                    alt="file"
                    width={100}
                    height={100}
                    className="w-4/5"
                />
            </div>
            <Popover>
                <PopoverTrigger>
                    <div className="gap-2 items-center hidden sm:flex bg-primary/10 p-2 lg:rounded-4xl rounded-lg w-full lg:justify-start justify-center cursor-pointer">
                        <Image
                            src={avatar}
                            alt="user"
                            width={50}
                            height={50}
                            className="rounded-[50%] border-2"
                        />
                        <div className=" flex-col text-left truncate hidden lg:flex">
                            <h1 className="font-bold text-sm hidden lg:block">
                                {fullName}
                            </h1>
                            <p className="text-grey text-[13px] hidden xl:block">
                                {email}
                            </p>
                        </div>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="min-w-[350px]! ml-3">
                    <div className="flex gap-3 w-full">
                        <div className="flex flex-col gap-3 w-1/3 text-grey">
                            <p>Username:</p>
                            <p>Email:</p>
                            <p>Total storage:</p>
                        </div>
                        <div className="flex flex-col gap-3 w-2/3 text-left text-black">
                            <p>{fullName}</p>
                            <p>{email}</p>
                            <p>10 GB/ 20GB</p>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default SideMenu;
