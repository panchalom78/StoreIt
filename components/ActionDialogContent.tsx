import React from "react";
import Thumbnail from "./Thumbnail";
import { FileDocument } from "@/types";
import { formatDateToShort, formatFileSize } from "@/lib/utils";
import { Input } from "./ui/input";
import Image from "next/image";

const ImageThumbnail = (file: FileDocument) => {
    return (
        <div className="w-full flex gap-3 p-4 border-1 rounded-lg">
            <Thumbnail
                type={file.type}
                extension={file.extension}
                url={file.url}
                className="size-13"
            />
            <div className="flex flex-col gap-1">
                <p className="font-bold text-black text-lg truncate ">
                    {file.name}
                </p>
                <p>{formatDateToShort(file.$createdAt)}</p>
            </div>
        </div>
    );
};

export const FileDetails = (file: FileDocument) => {
    return (
        <div className="flex flex-col gap-4">
            <ImageThumbnail {...file} />
            <div className="flex">
                <div className="flex flex-col gap-4 w-1/3 text-left">
                    <p>Format:</p>
                    <p>Size:</p>
                    <p>Owner:</p>
                    <p>Last edit:</p>
                </div>
                <div className="flex flex-col gap-4 text-black w-2/3 font-semibold text-left">
                    <p>{file.extension}</p>
                    <p>{formatFileSize(file.size)}</p>
                    <p>{file.owner.fullName}</p>
                    <p>{formatDateToShort(file.$updatedAt)}</p>
                </div>
            </div>
        </div>
    );
};

export const ShareFile = ({
    file,
    email,
    setEmail,
    removeSharedUser,
}: {
    file: FileDocument;
    email: string;
    setEmail: (email: string) => void;
    removeSharedUser: (email: string) => void;
}) => {
    return (
        <div className="flex flex-col gap-3">
            <ImageThumbnail {...file} />
            <div className="flex flex-col gap-2">
                <h1 className="text-lg font-bold text-black">
                    Share file with other users:
                </h1>
                <Input
                    type="text"
                    className="rounded-4xl p-5"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            {file.users.length > 0 && (
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                        <h1 className="text-black font-bold">
                            Shared with users
                        </h1>
                        <p>{file.users.length} users</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        {file.users.map((user) => (
                            <div
                                className="flex justify-between items-center"
                                key={user}
                            >
                                <p>{user}</p>
                                <Image
                                    src="/icons/remove.svg"
                                    alt="remove"
                                    width={20}
                                    height={20}
                                    onClick={() => removeSharedUser(user)}
                                    className="cursor-pointer"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export const DeleteFile = ({ fileName }: { fileName: string }) => {
    return (
        <div>
            <p className="text-center text-lg">
                Are you sure to delete file{" "}
                <span className="text-black font-semibold">{fileName}</span> ?
            </p>
        </div>
    );
};
