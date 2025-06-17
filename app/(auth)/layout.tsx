import Image from "next/image";
import React from "react";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className="w-full h-screen flex">
            <div className="xl:w-2/5 hidden w-1/2 lg:flex bg-primary flex-col justify-between items-start  px-10 py-15 text-white h-full">
                <div className="flex gap-1 w-full items-center">
                    <Image src="logo.svg" alt="logo" width={70} height={70} />
                    <h1 className="text-2xl font-semibold">StoreIt</h1>
                </div>
                <div className="flex flex-col gap-1">
                    <h2 className="text-4xl font-bold">
                        Manage your files the best way
                    </h2>
                    <p>
                        Awesome, we&apos;ve created the perfect place for you to
                        store all your documents.
                    </p>
                </div>
                <div className="w-full flex justify-center">
                    <Image
                        src="file.svg"
                        alt="files"
                        height={100}
                        width={100}
                        className="w-2/3"
                    />
                </div>
            </div>
            <div className="xl:w-3/5 lg:w-1/2 w-full min-h-screen">
                {children}
            </div>
        </div>
    );
};

export default layout;
