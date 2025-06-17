import Home from "@/app/(home)/page";
import { homeFileOptions } from "@/constants";
import { FileData } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { string } from "zod/v4-mini";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const parseStringify = (value: any) => {
    return JSON.parse(JSON.stringify(value));
};

export function getFileCategoryAndExtension(fileName: string): {
    extension: string;
    category: "image" | "video" | "audio" | "document" | "other";
} {
    const extension = fileName.split(".").pop()?.toLowerCase() || "";

    const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg"];
    const videoExtensions = ["mp4", "mov", "avi", "mkv", "webm"];
    const audioExtensions = ["mp3", "wav", "ogg", "aac"];
    const documentExtensions = [
        "pdf",
        "doc",
        "docx",
        "xls",
        "xlsx",
        "csv",
        "txt",
        "ppt",
        "pptx",
        "json",
    ];

    let category: "image" | "video" | "audio" | "document" | "other" = "other";

    if (imageExtensions.includes(extension)) category = "image";
    else if (videoExtensions.includes(extension)) category = "video";
    else if (audioExtensions.includes(extension)) category = "audio";
    else if (documentExtensions.includes(extension)) category = "document";

    return { extension, category };
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const getFileIcon = (extension: string | undefined, type: string) => {
    switch (extension) {
        // Document
        case "pdf":
            return "/icons/file-pdf.svg";
        case "doc":
            return "/icons/file-doc.svg";
        case "docx":
            return "/icons/file-docx.svg";
        case "csv":
            return "/icons/file-csv.svg";
        case "txt":
            return "/icons/file-txt.svg";
        case "xls":
        case "xlsx":
            return "/icons/file-document.svg";
        // Image
        case "svg":
            return "/icons/file-image.svg";
        // Video
        case "mkv":
        case "mov":
        case "avi":
        case "wmv":
        case "mp4":
        case "flv":
        case "webm":
        case "m4v":
        case "3gp":
            return "/icons/file-video.svg";
        // Audio
        case "mp3":
        case "mpeg":
        case "wav":
        case "aac":
        case "flac":
        case "ogg":
        case "wma":
        case "m4a":
        case "aiff":
        case "alac":
            return "/icons/file-audio.svg";

        default:
            switch (type) {
                case "image":
                    return "/icons/file-image.svg";
                case "document":
                    return "/icons/file-document.svg";
                case "video":
                    return "/icons/file-video.svg";
                case "audio":
                    return "/icons/file-audio.svg";
                default:
                    return "/icons/file-other.svg";
            }
    }
};

export const getFileType = (type: string) => {
    switch (type) {
        case "documents":
            return ["document"];
        case "images":
            return ["image"];
        case "media":
            return ["video", "audio"];
        case "others":
            return ["other"];
        default:
            return ["document"];
    }
};

export const constructFileUrl = (bucketFileId: string) => {
    return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET}/files/${bucketFileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
};

export const constructDownloadUrl = (bucketFileId: string) => {
    return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET}/files/${bucketFileId}/download?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
};

export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";

    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const value = bytes / Math.pow(1024, i);

    // Limiting decimal places to 2
    return `${value.toFixed(2)} ${sizes[i]}`;
};

export const formatDateToShort = (dateString: string): string => {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        day: "2-digit",
        month: "short",
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
};

export function getStorageNumber(sizeInBytes: number) {
    const totalBytes = 2 * 1024 * 1024 * 1024; // 2GB
    const usedPercent = ((sizeInBytes / totalBytes) * 100).toFixed(2); // to 2 decimal places
    const remainingBytes = totalBytes - sizeInBytes;

    return {
        usedPercent: Number(usedPercent), // as number
        remaining: formatBytes(remainingBytes),
    };
}

// Optional: Format bytes to readable string
function formatBytes(bytes: number): string {
    const units = ["B", "KB", "MB", "GB", "TB"];
    let index = 0;

    while (bytes >= 1024 && index < units.length - 1) {
        bytes /= 1024;
        index++;
    }

    return `${bytes.toFixed(2)} ${units[index]}`;
}

export const getFileDetails = (fileData: { [key: string]: FileData }) => {
    return homeFileOptions.map((file) => {
        const fileInfo = fileData[file.name];

        return {
            ...file,
            size: fileInfo?.size ?? 0, // fallback to 0 if undefined
        };
    });
};
