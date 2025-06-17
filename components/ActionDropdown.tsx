"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { ActionOptions } from "@/constants";
import { ActionType, FileDocument } from "@/types";
import Link from "next/link";
import { constructDownloadUrl } from "@/lib/utils";
import { Input } from "./ui/input";
import { deleteFile, renameFile, shareFile } from "@/lib/actions/file.action";
import { usePathname } from "next/navigation";
import { DeleteFile, FileDetails, ShareFile } from "./ActionDialogContent";
import { toast } from "sonner";

const ActionDropdown = (file: FileDocument) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [action, setAction] = useState<ActionType>(null);
    const [fileName, setFileName] = useState(file.name);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");

    const path = usePathname();

    const renderDialog = () => {
        if (!action) return null;

        const closeAllModals = () => {
            setIsModalOpen(false);
            setAction(null);
            setIsDropdownOpen(false);
            setFileName(file.name);
            setEmail("");
        };

        const actions = {
            rename: () =>
                renameFile({
                    name: fileName,
                    extension: file.extension,
                    path,
                    documentId: file.$id,
                }),
            share: () =>
                shareFile({
                    documentId: file.$id,
                    users: file.users,
                    email: email,
                    path,
                }),
            delete: () =>
                deleteFile({
                    documentId: file.$id,
                    path,
                    fileId: file.bucketFileId,
                }),
        };

        const removeSharedUser = async (email: string) => {
            try {
                const updatedSharedUsers = file.users.filter(
                    (e) => e !== email
                );
                const updatedFile = await shareFile({
                    documentId: file.$id,
                    users: updatedSharedUsers,
                    email: "",
                    path,
                });
                closeAllModals();
            } catch (error) {
                console.log(error);
            }
        };

        const handleAction = async () => {
            if (!action) return;
            setIsLoading(true);
            let success = false;
            try {
                success = await actions[action as keyof typeof actions]();
                if (success) closeAllModals();
            } catch (error: unknown) {
                if (error instanceof Error) {
                    toast.error(error.message, {
                        style: {
                            backgroundColor: "#fa7275",
                        },
                    });
                } else {
                    toast.error("Something went wrong");
                }
            } finally {
                setIsLoading(false);
            }
        };

        return (
            <DialogContent className="flex flex-col gap-4 rounded-4xl max-w-[400px]!">
                <DialogHeader>
                    <DialogTitle className="capitalize text-center mb-3">
                        {action}
                    </DialogTitle>
                    <DialogDescription>
                        {action === "rename" && (
                            <Input
                                type="text"
                                value={fileName}
                                className="rounded-4xl"
                                onChange={(e) => setFileName(e.target.value)}
                            />
                        )}
                        {action === "details" && <FileDetails {...file} />}
                        {action === "share" && (
                            <ShareFile
                                file={file}
                                email={email}
                                setEmail={setEmail}
                                removeSharedUser={removeSharedUser}
                            />
                        )}
                        {action === "delete" && (
                            <DeleteFile fileName={file.name} />
                        )}
                    </DialogDescription>
                </DialogHeader>
                {["rename", "delete", "share"].includes(action) && (
                    <DialogFooter className="flex flex-col gap-2 md:flex-row w-full!">
                        <Button
                            className="rounded-4xl bg-white hover:bg-white text-black cursor-pointer flex-1 py-6"
                            onClick={closeAllModals}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="capitalize rounded-4xl flex gap-2 flex-1 py-6"
                            disabled={isLoading}
                            onClick={handleAction}
                        >
                            {action}
                            {isLoading && (
                                <Image
                                    src="loader.svg"
                                    alt="loader"
                                    width={20}
                                    height={100}
                                />
                            )}
                        </Button>
                    </DialogFooter>
                )}
            </DialogContent>
        );
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DropdownMenu
                open={isDropdownOpen}
                onOpenChange={setIsDropdownOpen}
            >
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-none p-0">
                        <Image
                            src="/icons/dots.svg"
                            alt="options"
                            width={30}
                            height={30}
                        />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                    <DropdownMenuLabel>{file.name}</DropdownMenuLabel>
                    <DropdownMenuGroup>
                        {ActionOptions.map((option) => (
                            <DropdownMenuItem
                                key={option.name}
                                onClick={() => {
                                    setAction(option.name as ActionType);

                                    if (
                                        [
                                            "rename",
                                            "share",
                                            "delete",
                                            "details",
                                        ].includes(option.name)
                                    ) {
                                        setIsModalOpen(true);
                                    }
                                }}
                            >
                                {option.name === "download" ? (
                                    <Link
                                        href={constructDownloadUrl(
                                            file.bucketFileId
                                        )}
                                        className="flex items-center gap-2"
                                        download={file.name}
                                    >
                                        <Image
                                            src={option.url}
                                            alt={option.name}
                                            width={30}
                                            height={30}
                                        />
                                        <p className="capitalize">
                                            {option.name}
                                        </p>
                                    </Link>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src={option.url}
                                            alt={option.name}
                                            width={30}
                                            height={30}
                                        />
                                        <p className="capitalize">
                                            {option.name}
                                        </p>
                                    </div>
                                )}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            {renderDialog()}
        </Dialog>
    );
};

export default ActionDropdown;
