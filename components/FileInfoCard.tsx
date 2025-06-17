import { cn, formatFileSize } from "@/lib/utils";
import { FileInfoCardProps } from "@/types";
import Image from "next/image";
import React from "react";
import { Separator } from "./ui/separator";
import Link from "next/link";

const FileInfoCard = ({ name, url, color, link, size }: FileInfoCardProps) => {
    return (
        <Link
            className="bg-white rounded-lg flex flex-col cursor-pointer hover:scale-110 transition-all"
            href={link}
        >
            <div className="flex gap-3 items-center">
                <div className="flex items-center justify-center size-17 bg-white-100 rounded-br-4xl">
                    <div
                        className={cn(
                            "flex justify-center items-center size-13 rounded-full",
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
                <p className="font-bold flex-1 text-right pr-3">
                    {formatFileSize(size)}
                </p>
            </div>
            <div className="flex flex-col w-full p-3 gap-3 text-center">
                <p className="font-bold">{name}</p>
                <Separator />
                <p className="text-grey">Last Update</p>
                <p>10:00 , 10Oct</p>
            </div>
        </Link>
    );
};

export default FileInfoCard;
