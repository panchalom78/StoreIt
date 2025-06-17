import React from "react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { InputFeildProps } from "@/types";

const InputFeild = (props: InputFeildProps) => {
    return (
        <>
            <FormField
                control={props.control}
                name={props.name}
                render={({ field }) => (
                    <FormItem>
                        <div className="bg-white shadow-lg rounded-lg p-2 focus-within:border-1 focus-within:border-primary w-full">
                            <FormLabel>{props.label}</FormLabel>
                            <FormControl>
                                <Input
                                    className="border-none p-0 shadow-none focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 "
                                    type={props.type}
                                    placeholder={props.placeholder}
                                    {...field}
                                />
                            </FormControl>
                        </div>
                        <FormMessage className="text-primary" />
                    </FormItem>
                )}
            />
        </>
    );
};

export default InputFeild;
