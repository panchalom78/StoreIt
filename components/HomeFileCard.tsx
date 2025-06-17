import React from "react";
import Thumbnail from "./Thumbnail";
import { FileDocument } from "@/types";
import { formatDateToShort } from "@/lib/utils";
import ActionDropdown from "./ActionDropdown";

const HomeFileCard = (file: FileDocument) => {
    return (
        <div className="flex items-center gap-3 justify-between rounded-lg bg-white hover:bg-black/10 cursor-pointer p-2 w-full">
            <Thumbnail
                type={file.type}
                extension={file.extension}
                className="size-10 bg-primary/10"
                url={file.type === "image" ? file.url : ""}
            />
            <div className="flex flex-col items-center gap-2 flex-1 line-clamp-1">
                <p className="font-semibold text-lg text-left w-full line-clamp-1">
                    {file.name}
                </p>
                <p className="text-sm text-grey text-left w-full">
                    {formatDateToShort(file.$createdAt)}
                </p>
            </div>
            <ActionDropdown {...file} />
        </div>
    );
};

export default HomeFileCard;
