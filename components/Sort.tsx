"use client";

import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { sortTypes } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const Sort = () => {
    const router = useRouter();
    const path = usePathname();
    const searchParams = useSearchParams();
    const handleValueChange = (value: string) => {
        router.push(`${path}?sort=${value}`);
    };
    const sortParam = searchParams.get("sort");
    const sort = sortParam
        ? sortTypes.find((type) => type.value === sortParam)
        : sortTypes[0];
    return (
        <Select
            defaultValue={sort?.value}
            onValueChange={(value) => handleValueChange(value)}
        >
            <SelectTrigger className="sm:w-[180px] bg-white w-full dark:bg-[#1c2123] dark:border-0 dark:hover:bg-[#1c2123] dark:text-white/70">
                <SelectValue placeholder={sort?.name} />
            </SelectTrigger>
            <SelectContent className="dark:bg-[#1c2123] dark:border-0 dark:text-white/70">
                {sortTypes.map((type) => (
                    <SelectItem
                        value={type.value}
                        key={type.value}
                        className="dark:hover:bg-white/10"
                    >
                        {type.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default Sort;
