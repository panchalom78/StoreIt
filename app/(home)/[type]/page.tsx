import FileCard from "@/components/FileCard";
import Sort from "@/components/Sort";
import { getFiles } from "@/lib/actions/file.action";
import { formatFileSize, getFileType } from "@/lib/utils";
import { FileDocument } from "@/types";
import React from "react";

const page = async ({
    searchParams,
    params,
}: {
    params: Promise<{ type: string }>;
    searchParams: Promise<{ search?: string; sort?: string }>;
}) => {
    const { type } = await params;
    const search = (await searchParams)?.search || "";
    const sort = (await searchParams)?.sort || "";
    const fileType = getFileType(type);
    const files = await getFiles({ typeArray: fileType, sort, search });

    const getTotalFileSize = () => {
        let totalSize = 0;
        files.documents.forEach(
            (file: FileDocument) => (totalSize += file.size)
        );
        return formatFileSize(totalSize);
    };

    const totalSize = getTotalFileSize();

    return (
        <div className="flex flex-col p-5 text-grey-100">
            <h1 className="font-bold text-3xl capitalize">{type}</h1>
            <div className="flex items-center flex-col sm:flex-row sm:justify-between gap-3">
                <div className="text-left w-full">
                    Total: <span className="font-semibold">{totalSize}</span>
                </div>
                <div className="flex gap-2 items-center w-full justify-end">
                    <p className="hidden sm:block">Sort By:</p>
                    <Sort />
                </div>
            </div>
            <div className="flex-1 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-rows-2 gap-6 pt-10">
                {files.total === 0 && <p>No Uploaded Files</p>}
                {files.total > 0 &&
                    files.documents.map((file: FileDocument) => (
                        <FileCard {...file} key={file.$id} />
                    ))}
            </div>
        </div>
    );
};

export default page;
