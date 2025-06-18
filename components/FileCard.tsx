import { FileDocument } from "@/types";
import React from "react";
import Thumbnail from "./Thumbnail";
import { formatDateToShort, formatFileSize } from "@/lib/utils";
import Link from "next/link";
import ActionDropdown from "./ActionDropdown";

const FileCard = ({
    file,
    userAccountId,
}: {
    file: FileDocument;
    userAccountId: string;
}) => {
    return (
        <Link
            href={file.url}
            target="_blank"
            className="flex flex-col gap-2 p-4 bg-white rounded-lg "
        >
            <div className="flex justify-between">
                <Thumbnail
                    type={file.type}
                    extension={file.extension}
                    url={file.type === "image" ? file.url : ""}
                    className="size-20 bg-primary/10"
                />
                <div className="flex flex-col justify-between items-end">
                    <ActionDropdown file={file} userAccountId={userAccountId} />
                    <p>{formatFileSize(file.size)}</p>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                    <p className="line-clamp-1 font-semibold">{file.name}</p>
                    {file.owner.accountId !== userAccountId && (
                        <div
                            className="h-fit w-fit rounded-4xl text-[10px] px-1 py-0.5 text-white  bg-primary"
                            title={`Shared by ${file.owner.fullName}`}
                        >
                            Shared
                        </div>
                    )}
                </div>
                <p>{formatDateToShort(file.$createdAt)}</p>
                <p className="text-grey">By: {file.owner.fullName}</p>
            </div>
        </Link>
    );
};

export default FileCard;
