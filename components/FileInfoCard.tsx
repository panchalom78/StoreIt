import { cn, formatDateToShort, formatFileSize } from "@/lib/utils";
import { FileInfoCardProps } from "@/types";
import Image from "next/image";
import React from "react";
import { Separator } from "./ui/separator";
import Link from "next/link";

const FileInfoCard = ({
    name,
    url,
    color,
    link,
    size,
    updatedDate,
}: FileInfoCardProps) => {
    return (
        <Link
            className="bg-white rounded-lg flex flex-col cursor-pointer hover:scale-110 transition-all dark:bg-[#1b2124]"
            href={link}
        >
            <div className="flex gap-3 items-center">
                <div className="flex items-center justify-center size-17 bg-white-100 dark:sm:bg-[#181a1b] dark:bg-black rounded-br-4xl">
                    <div
                        className={cn(
                            "flex justify-center items-center size-13 rounded-full dark:opacity-90",
                            color
                        )}
                    >
                        <Image
                            src={url}
                            alt="logo"
                            width={100}
                            height={100}
                            className="size-8"
                        />
                    </div>
                </div>
                <p className="font-bold flex-1 text-right pr-3 dark:text-white/80">
                    {formatFileSize(size)}
                </p>
            </div>
            <div className="flex flex-col w-full p-3 gap-3 text-center">
                <p className="font-bold capitalize dark:text-white/80">
                    {name}
                </p>
                <Separator />
                <p className="text-grey">Last Update</p>
                <p className="dark:text-white/80">
                    {updatedDate ? formatDateToShort(updatedDate) : "--"}
                </p>
            </div>
        </Link>
    );
};

export default FileInfoCard;
