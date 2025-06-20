"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { getFiles } from "@/lib/actions/file.action";
import Thumbnail from "./Thumbnail";
import { FileDocument } from "@/types";
import { formatDateToShort } from "@/lib/utils";

const SearchInput = () => {
    const [tempQuery, setTempQuery] = useState("");
    const [query, setQuery] = useState("");
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("search");
    const [results, setResults] = useState<FileDocument[]>([]);
    const router = useRouter();
    const [showNoResult, setShowNoResult] = useState(false);

    useEffect(() => {
        if (!searchQuery) {
            setTempQuery("");
            setQuery("");
        }
    }, [searchQuery]);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            setQuery(tempQuery);
        }, 300); // Delay: 300ms

        return () => clearTimeout(debounceTimer);
    }, [tempQuery]);

    // Fetch on debounced `query`
    useEffect(() => {
        const fetchFiles = async () => {
            if (query) {
                const files = await getFiles({
                    typeArray: [],
                    search: query,
                    sort: "",
                });
                setResults(files.documents);
            } else {
                setResults([]);
            }
            setShowNoResult(true);
        };
        fetchFiles();
    }, [query]);

    const handleFileClick = (file: FileDocument) => {
        setTempQuery("");
        setQuery("");
        setResults([]);
        const fileLink =
            file.type === "video" || file.type === "audio"
                ? `/media?search=${query}`
                : `/${file.type}s?search=${query}`;
        router.push(fileLink);
    };

    const clearQuery = () => {
        setTempQuery("");
        setQuery("");
        setResults([]);
    };

    return (
        <div className="w-full relative">
            <div className="sm:w-3/4 w-full  relative flex items-center">
                <div className="flex items-center justify-center absolute left-3">
                    <Image
                        src="/icons/search.svg"
                        alt="search"
                        width={20}
                        height={20}
                        className="filter invert"
                    />
                </div>
                <Input
                    className="w-full py-6 pl-10 rounded-4xl text-xl! dark:border-0 dark:text-white dark:bg-[#121111]"
                    value={tempQuery}
                    onChange={(e) => {
                        setTempQuery(e.target.value);
                        setShowNoResult(false);
                    }}
                    placeholder="Search Files ..."
                />
                {tempQuery && (
                    <div className="flex items-center justify-center absolute right-3">
                        <Image
                            src="/icons/remove.svg"
                            alt="clear"
                            width={20}
                            height={20}
                            onClick={clearQuery}
                            className="cursor-pointer dark:filter dark:invert"
                        />
                    </div>
                )}
            </div>
            {query && results.length === 0 && showNoResult && (
                <ul className="sm:w-3/4 w-full absolute rounded-lg border-1 top-20 bg-white left-0 z-50 dark:bg-black dark:border-0 dark:text-white/80">
                    <li className="flex items-center justify-center p-5">
                        No File found
                    </li>
                </ul>
            )}

            {query && results.length > 0 && (
                <ul className="sm:w-3/4 w-full absolute rounded-lg border-1 top-20 bg-white left-0 z-50 dark:bg-black dark:border-0 dark:text-white/80">
                    {results.map((file: FileDocument) => (
                        <li
                            key={file.$id}
                            className="w-full flex gap-2 items-center p-2 hover:bg-black/10 rounded-lg cursor-pointer transition-all dark:hover:bg-white/10"
                            onClick={() => handleFileClick(file)}
                        >
                            <Thumbnail
                                type={file.type}
                                extension={file.extension}
                                url={file.url}
                                className="size-15 bg-primary/10"
                            />
                            <p className="flex-1 truncate">{file.name}</p>
                            <p className="truncate text-grey">
                                {
                                    formatDateToShort(file.$updatedAt).split(
                                        ","
                                    )[0]
                                }
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchInput;
