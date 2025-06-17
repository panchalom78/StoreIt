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
            <SearchInput />
            <div className="flex gap-2 items-center">
                <FileUploader
                    ownerId={ownerId}
                    accountId={accountId}
                    className=""
                    buttonClassName=""
                />
                <form
                    action={async () => {
                        "use server";
                        await logOutUser();
                    }}
                >
                    <Button
                        variant="outline"
                        className="shadow-none border-none cursor-pointer"
                        type="submit"
                    >
                        <Image
                            src="/icons/logout.svg"
                            alt="logout"
                            height={30}
                            width={30}
                        />
                    </Button>
                </form>
            </div>
        </nav>
    );
};

export default Navbar;
