import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { logOutUser } from "@/lib/actions/user.action";
import FileUploader from "./FileUploader";
import { NavBarProps } from "@/types";
import SearchInput from "./SearchInput";

const Navbar = ({ ownerId, accountId }: NavBarProps) => {
    return (
        <nav className="sm:flex hidden items-center justify-between">
            <div className="flex-1">
                <SearchInput />
            </div>
            <div className="flex gap-2 items-center">
                <FileUploader
                    ownerId={ownerId}
                    accountId={accountId}
                    className=""
                    buttonClassName=" p-6 rounded-4xl"
                />
                <form
                    action={async () => {
                        "use server";
                        await logOutUser();
                    }}
                >
                    <Button
                        className="shadow-none border-none cursor-pointer size-13 rounded-full bg-primary/10 hover:bg-primary/10"
                        type="submit"
                    >
                        <Image
                            src="/icons/logout.svg"
                            alt="logout"
                            height={200}
                            width={150}
                        />
                    </Button>
                </form>
            </div>
        </nav>
    );
};

export default Navbar;
