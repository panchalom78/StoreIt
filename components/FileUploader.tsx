"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import Image from "next/image";
import { cn, convertFileToUrl, getFileCategoryAndExtension } from "@/lib/utils";
import Thumbnail from "./Thumbnail";
import { MAX_FILE_SIZE } from "@/constants";
import { toast } from "sonner";
import { FileUploaderProps } from "@/types";
import { uploadFile } from "@/lib/actions/file.action";
import { usePathname } from "next/navigation";

const FileUploader = ({
    ownerId,
    accountId,
    className,
    buttonClassName,
}: FileUploaderProps) => {
    const path = usePathname();
    const [files, setFiles] = useState<File[]>([]);

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            setFiles((prev) => [...prev, acceptedFiles[0]]);

            const uploadPromises = acceptedFiles.map((file) => {
                if (file.size > MAX_FILE_SIZE) {
                    setFiles((prev) =>
                        prev.filter((f) => f.name !== file.name)
                    );
                    return toast(`${file.name} is too large.`, {
                        description: "Max file size is 50MB",
                        style: {
                            background: "#fa7275",
                        },
                    });
                }
                return uploadFile({ file, ownerId, accountId, path }).then(
                    (uploadedFile) => {
                        if (uploadedFile) {
                            setFiles((prev) =>
                                prev.filter((f) => f.name !== file.name)
                            );
                        }
                    }
                );
            });
            await Promise.all(uploadPromises);
        },
        [ownerId, accountId, path]
    );
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    });

    const handleRemoveFile = (
        e: React.MouseEvent<HTMLImageElement>,
        fileName: string
    ) => {
        e.stopPropagation();
        setFiles((prev) => prev.filter((file) => file.name !== fileName));
    };

    return (
        <div {...getRootProps()} className={className}>
            <input {...getInputProps()} />
            <Button
                className={cn(
                    "flex justify-center items-center w-full dark:opacity-95",
                    buttonClassName
                )}
            >
                <Image
                    src="/icons/upload.svg"
                    alt="upload"
                    width={20}
                    height={20}
                    className="dark:invert"
                />
                Upload
            </Button>
            {files.length > 0 && (
                <ul className="fixed sm:bottom-10 sm:right-10 w-5/6 bottom-0 right-0 p-3 max-w-[480px] h-fit rounded-lg shadow-sm size-full bg-white z-50 flex flex-col dark:bg-black">
                    <h4 className="font-bold text-lg">Uploading</h4>
                    {files.map((file, index) => {
                        const { extension, category } =
                            getFileCategoryAndExtension(file.name);
                        return (
                            <li
                                className="w-full shadow-sm bg-white p-3 mt-3 mb-3 rounded-lg dark:bg-[#1b2124]"
                                key={file.name + "-" + index}
                            >
                                <div className="flex items-center gap-2">
                                    <Thumbnail
                                        type={category}
                                        extension={extension}
                                        url={convertFileToUrl(file)}
                                        className="size-20 bg-primary/10"
                                    />
                                    <div className="flex flex-col gap-2 flex-1 truncate w-full">
                                        <p className="truncate">{file.name}</p>
                                        <Image
                                            src="/icons/file-loader.gif"
                                            alt="loader"
                                            width={100}
                                            height={100}
                                        />
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <Image
                                            src="/icons/remove.svg"
                                            className="dark:filter dark:invert"
                                            alt="remove"
                                            width={25}
                                            height={25}
                                            onClick={(e) =>
                                                handleRemoveFile(e, file.name)
                                            }
                                        />
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default FileUploader;
