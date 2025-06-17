import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

const SideMenuButton = ({
    name,
    pathname,
    url,
    type,
}: {
    name: string;
    pathname: string;
    url: string;
    type: "mobile" | "other";
}) => {
    const isActive = pathname === url;
    return (
        <Link href={url}>
            <Button
                className={`w-full rounded-lg py-8 flex capitalize ${
                    type === "other"
                        ? "lg:rounded-full lg:justify-start lg:pl-8"
                        : "justify-start rounded-4xl pl-10"
                } bg-white shadow-none hover:bg-white cursor-pointer ${
                    isActive && "bg-primary hover:bg-primary"
                }`}
            >
                <Image
                    className={`${
                        isActive
                            ? "invert-0 opacity-100"
                            : "filter invert opacity-25!"
                    }`}
                    src={`/icons/${name}.svg`}
                    alt={name}
                    width={25}
                    height={25}
                />
                <p
                    className={`${
                        type === "other" ? "hidden lg:block" : ""
                    } capitalize ${isActive ? "text-white" : "text-grey-100 "}`}
                >
                    {name}
                </p>
            </Button>
        </Link>
    );
};

export default SideMenuButton;
