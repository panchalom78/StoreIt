import { cn, getFileIcon } from "@/lib/utils";
import { ThumbnailProps } from "@/types";
import Image from "next/image";
import React from "react";

const Thumbnail = ({
    type,
    extension,
    url = "",
    className,
}: ThumbnailProps) => {
    const isImage = type === "image" && extension !== "svg";
    return (
        <>
            <figure
                className={cn(
                    className,
                    "flex items-center justify-center rounded-full"
                )}
            >
                <Image
                    alt="thumbnail"
                    src={isImage ? url : getFileIcon(extension, type)}
                    width={isImage ? 100 : 40}
                    height={isImage ? 100 : 40}
                    className={cn(
                        isImage && "object-cover h-full rounded-full",
                        !isImage && "w-1/2"
                    )}
                />
            </figure>
        </>
    );
};

export default Thumbnail;
