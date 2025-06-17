import { FileDocument } from "@/types";
import React from "react";
import Thumbnail from "./Thumbnail";
import { formatDateToShort, formatFileSize } from "@/lib/utils";
import Link from "next/link";
import ActionDropdown from "./ActionDropdown";

const FileCard = (props: FileDocument) => {
    return (
        <Link
            href={props.url}
            target="_blank"
            className="flex flex-col gap-2 p-4 bg-white rounded-lg "
        >
            <div className="flex justify-between">
                <Thumbnail
                    type={props.type}
                    extension={props.extension}
                    url={props.type === "image" ? props.url : ""}
                    className="size-20 bg-primary/10"
                />
                <div className="flex flex-col justify-between items-end">
                    <ActionDropdown {...props} />
                    <p>{formatFileSize(props.size)}</p>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <p className="line-clamp-1 font-semibold">{props.name}</p>
                <p>{formatDateToShort(props.$createdAt)}</p>
                <p className="text-grey">By: {props.owner.fullName}</p>
            </div>
        </Link>
    );
};

export default FileCard;
