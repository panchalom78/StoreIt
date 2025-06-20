import { Control } from "react-hook-form";
import { string } from "zod/v4-mini";

type AuthType = "sign-in" | "sign-up";

type InputFeildProps = {
    control: Control<any>;
    name: string;
    placeholder: string;
    label: string;
    type: "text" | "email" | "password";
};

type OTPModalProps = {
    email: string;
    accountId: string;
};

type ThumbnailProps = {
    type: string;
    extension: string;
    url: string;
    className: string;
};

type FileUploadProps = {
    file: File;
    ownerId: string;
    accountId: string;
    path: string;
};

type FileUploaderProps = {
    ownerId: string;
    accountId: string;
    className: string;
    buttonClassName: string;
};

type NavBarProps = FileUploaderProps;

type MobileNavProps = {
    fullName: string;
    email: string;
    avatar: string;
    $id: string;
    accountId: string;
};

type FileData = {
    name: string;
    url: string;
    type: "image" | "video" | "audio" | "document" | "other"; // assuming enum types
    bucketFileId: string;
    accountId: string;
    owner?: string; // assuming this is an ID or reference to another entity
    extension?: string;
    size?: number;
    users?: string[];
};

type FileCardPorps = {
    name: string;
    url: string;
    type: string;
    accountId: string;
    extension: string;
    size: number;
    $createdAt: string;
    $updatedAt: string;
};

type FileDocument = {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    $databaseId: string;
    $collectionId: string;

    name: string;
    url: string;
    type: "image" | "video" | "audio" | "document" | "other"; // enum values
    bucketFileId: string;
    accountId: string;
    extension: string;
    size: number;
    users: string[];

    owner: Record<string, any>; // replace with proper `Owner` type if known
};

type ActionType = "rename" | "share" | "delete" | "download" | "details" | null;

type FileInfoCardProps = {
    name: string;
    url: string;
    color: string;
    link: string;
    size: number;
    updatedDate: string;
};

type FileInfo = {
    size: number = 0;
    updatedDate: string = "";
};
