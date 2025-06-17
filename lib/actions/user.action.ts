"use server";

import { ID, Query } from "node-appwrite";
import { createSessionClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";
import { createAdminClient } from "../appwrite/server";
import { redirect } from "next/navigation";
import { error } from "console";

const handleError = (error: unknown, message: string) => {
    console.log(error, message);
    throw error;
};

const getUserByEmail = async (email: string) => {
    const { databases } = await createAdminClient();

    const result = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("email", [email])]
    );

    return result.total > 0 ? result.documents[0] : null;
};

export const sendEmailOTP = async (email: string) => {
    const { account } = await createAdminClient();

    try {
        const session = await account.createEmailToken(ID.unique(), email);
        return session.userId;
    } catch (error) {
        handleError(error, "Failed to send an OTP");
    }
};

export const createAccount = async ({
    fullName,
    email,
}: {
    fullName: string;
    email: string;
}) => {
    const existingUser = await getUserByEmail(email);
    const accountId = await sendEmailOTP(email);

    if (!accountId) {
        throw new Error("Failed to send an OTP");
    }

    if (!existingUser) {
        const { databases } = await createAdminClient();
        await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                fullName,
                email,
                accountId,
                avatar: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg",
            }
        );
    }
    return parseStringify({ accountId });
};

export const login = async (email: string) => {
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return { accountId: null, error: "User not found" };
        }
        await sendEmailOTP(email);
        return parseStringify({ accountId: user.accountId });
    } catch (error) {
        handleError(error, "Failed to login");
    }
};

export const verifySecret = async ({
    accountId,
    password,
}: {
    accountId: string;
    password: string;
}) => {
    const { account } = await createAdminClient();
    try {
        const session = await account.createSession(accountId, password);

        (await cookies()).set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        return parseStringify({ sessionId: session.$id });
    } catch (error) {
        handleError(error, "Failed to verify OTP.");
    }
};

export const getCurrentUser = async () => {
    try {
        const { account } = await createSessionClient();
        const { databases } = await createAdminClient();
        const result = await account.get();

        const user = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", result.$id)]
        );
        if (user.total <= 0) return null;
        return parseStringify(user.documents[0]);
    } catch (error) {
        console.log(error);
    }
};

export const logOutUser = async () => {
    const { account } = await createSessionClient();
    try {
        await account.deleteSession("current");
        (await cookies()).delete("appwrite-session");
    } catch (error) {
        handleError(error, "Failed to logout user");
    } finally {
        redirect("/sign-in");
    }
};
