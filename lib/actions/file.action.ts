"use server";

import { FileData, FileDocument, FileInfo, FileUploadProps } from "@/types";
import { createAdminClient } from "../appwrite/server";
import { appwriteConfig } from "../appwrite/config";
import { ID, Models, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import {
    constructFileUrl,
    getFileCategoryAndExtension,
    parseStringify,
} from "../utils";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./user.action";

const handleError = (error: unknown, message: string) => {
    console.log(error, message);
    throw error;
};

export const uploadFile = async ({
    file,
    ownerId,
    accountId,
    path,
}: FileUploadProps) => {
    const { databases, storage } = await createAdminClient();
    try {
        const inputFile = InputFile.fromBuffer(file, file.name);

        const bucketFile = await storage.createFile(
            appwriteConfig.bucketId,
            ID.unique(),
            inputFile
        );
        const { category, extension } = getFileCategoryAndExtension(file.name);
        const fileDocument = {
            type: category,
            extension,
            url: constructFileUrl(bucketFile.$id),
            name: bucketFile.name,
            size: bucketFile.sizeOriginal,
            owner: ownerId,
            accountId,
            users: [],
            bucketFileId: bucketFile.$id,
        };
        const fileData = await databases
            .createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.fileCollectionId,
                ID.unique(),
                fileDocument
            )
            .catch(async (error: any) => {
                await storage.deleteFile(
                    appwriteConfig.bucketId,
                    bucketFile.$id
                );
                handleError(error, "Fail to save file metadata");
            });

        revalidatePath(path);
        return parseStringify(fileData);
    } catch (error) {
        handleError(error, "Failed to upload file");
    }
};

const createQueries = ({
    currentUser,
    types,
    search,
    sort,
    limit,
    select,
}: {
    currentUser: Models.Document;
    types: string[];
    search?: string;
    sort?: string;
    limit?: number;
    select?: string[];
}) => {
    const queries = [
        Query.or([
            Query.equal("owner", [currentUser.$id]),
            Query.contains("users", [currentUser.email]),
        ]),
    ];
    if (types.length > 0) queries.push(Query.equal("type", types));
    if (search) queries.push(Query.contains("name", search));
    if (!sort) sort = "$createdAt-desc";
    const [sortValue, order] = sort.split("-");
    queries.push(
        order === "asc" ? Query.orderAsc(sortValue) : Query.orderDesc(sortValue)
    );
    if (limit) queries.push(Query.limit(limit));
    if (select && select.length > 0) queries.push(Query.select(select));

    return queries;
};

export const getFiles = async ({
    typeArray,
    search,
    sort,
    limit,
}: {
    typeArray: string[];
    sort?: string;
    search?: string;
    limit?: number;
    select?: string[];
}) => {
    const { databases } = await createAdminClient();
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            throw new Error("User not found");
        }

        const queries = createQueries({
            types: typeArray,
            sort,
            search,
            limit,
            currentUser,
        });

        const files = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.fileCollectionId,
            queries
        );

        return parseStringify(files);
    } catch (error) {
        handleError(error, "Failed to get files");
    }
};

export const renameFile = async ({
    name,
    documentId,
    extension,
    path,
}: {
    name: string;
    documentId: string;
    extension: string;
    path: string;
}) => {
    const { databases } = await createAdminClient();
    const newFileName = `${name}.${extension}`;

    try {
        const updatedFile = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.fileCollectionId,
            documentId,
            { name: newFileName }
        );
        revalidatePath(path);
        return parseStringify(updatedFile);
    } catch (error) {
        handleError(error, "Failed to rename file");
    }
};

export const shareFile = async ({
    documentId,
    users,
    email = "",
    path,
}: {
    documentId: string;
    users: string[];
    email: string;
    path: string;
}) => {
    const { databases } = await createAdminClient();
    try {
        if (email) {
            const user = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.userCollectionId,
                [Query.equal("email", email)]
            );
            if (user.total === 0) {
                throw new Error("User not found");
            }
            users.push(email);
        }
        const updatedFile = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.fileCollectionId,
            documentId,
            {
                users: users,
            }
        );
        revalidatePath(path);
        return parseStringify(updatedFile);
    } catch (error) {
        handleError(error, "Failed to share file");
    }
};

export const deleteFile = async ({
    documentId,
    path,
    fileId,
}: {
    documentId: string;
    path: string;
    fileId: string;
}) => {
    const { databases, storage } = await createAdminClient();
    try {
        await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.fileCollectionId,
            documentId
        );
        await storage.deleteFile(appwriteConfig.bucketId, fileId);
        revalidatePath(path);
    } catch (error) {
        handleError(error, "Failed to delete file");
    }
};

export const getStorageDetails = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        throw new Error("User not found.");
    }

    const total: FileInfo = {
        size: 0,
        updatedDate: "",
    };
    const documents: FileInfo = {
        size: 0,
        updatedDate: "",
    };
    const images: FileInfo = {
        size: 0,
        updatedDate: "",
    };
    const media: FileInfo = {
        size: 0,
        updatedDate: "",
    };
    const others: FileInfo = {
        size: 0,
        updatedDate: "",
    };

    const totalFile = await getFiles({ typeArray: [], select: ["size"] });
    const documnentFile = await getFiles({
        typeArray: ["document"],
        select: ["size", "$updatedAt"],
    });
    const imageFile = await getFiles({
        typeArray: ["image"],
        select: ["size", "$updatedAt"],
    });
    const mediaFile = await getFiles({
        typeArray: ["video", "audio"],
        select: ["size", "$updatedAt"],
    });
    const otherFile = await getFiles({
        typeArray: ["other"],
        select: ["size", "$updatedAt"],
    });

    if (totalFile.total > 0) {
        totalFile.documents.forEach((file: any) => (total.size += file.size));
    }

    if (documnentFile.total > 0) {
        documnentFile.documents.forEach(
            (file: any) => (documents.size += file.size)
        );
        documents.updatedDate = documnentFile.documents[0].$updatedAt;
    }

    if (imageFile.total > 0) {
        images.updatedDate = imageFile.documents[0].$updatedAt;
        imageFile.documents.forEach((file: any) => (images.size += file.size));
    }

    if (mediaFile.total > 0) {
        mediaFile.documents.forEach((file: any) => (media.size += file.size));
        media.updatedDate = mediaFile.documents[0].$updatedAt;
    }

    if (otherFile.total > 0) {
        otherFile.documents.forEach((file: any) => (others.size += file.size));
        others.updatedDate = otherFile.documents[0].$updatedAt;
    }
    return { documents, images, others, media, total };
};
