import React from "react";
import Thumbnail from "./Thumbnail";
import { FileDocument } from "@/types";
import { constructFileUrl, formatDateToShort } from "@/lib/utils";
import ActionDropdown from "./ActionDropdown";
import Link from "next/link";

const HomeFileCard = ({
    file,
    userAccountId,
}: {
    file: FileDocument;
    userAccountId: string;
}) => {
    return (
        <Link
            href={constructFileUrl(file.bucketFileId)}
            target="_blank"
            className="flex items-center gap-3 justify-between rounded-lg bg-white dark:bg-[#1b2124] dark:hover:bg-white/10 hover:bg-black/10 cursor-pointer p-2 w-full"
        >
            <Thumbnail
                type={file.type}
                extension={file.extension}
                className="size-10 bg-primary/10"
                url={file.type === "image" ? file.url : ""}
            />
            <div className="flex flex-col items-center gap-2 flex-1 line-clamp-1">
                <div className="flex gap-1 items-center w-full">
                    <p className="font-semibold text-lg text-left w-fit line-clamp-1 dark:text-white/70">
                        {file.name}
                    </p>
                    {file.owner.accountId !== userAccountId && (
                        <div
                            className="h-fit w-fit rounded-4xl text-[10px] px-1 py-0.5 text-white  bg-primary"
                            title={`Shared by ${file.owner.fullName}`}
                        >
                            Shared
                        </div>
                    )}
                </div>
                <p className="text-sm text-grey text-left w-full">
                    {formatDateToShort(file.$createdAt)}
                </p>
            </div>
            <ActionDropdown file={file} userAccountId={userAccountId} />
        </Link>
    );
};

export default HomeFileCard;
