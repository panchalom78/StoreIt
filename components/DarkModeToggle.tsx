"use client";
import { useEffect, useState } from "react";
import { Switch } from "./ui/switch";

const DarkModeToggle = () => {
    const [isDark, setIsDark] = useState<boolean>(false);

    // 👀 Load theme from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("theme");
        if (stored === "dark") {
            setIsDark(true);
            document.documentElement.classList.add("dark");
        } else {
            setIsDark(false);
            document.documentElement.classList.remove("dark");
        }
    }, []);

    // 💾 Save theme to localStorage and update <html> class
    useEffect(() => {
        if (isDark) {
            localStorage.setItem("theme", "dark");
            document.documentElement.classList.add("dark");
        } else {
            localStorage.setItem("theme", "light");
            document.documentElement.classList.remove("dark");
        }
    }, [isDark]);

    return (
        // <button
        //     className="p-2 rounded bg-gray-200 dark:bg-gray-800 text-black dark:text-white transition"
        //     onClick={() => setIsDark(!isDark)}
        // >
        //     {isDark ? "🌞 Light Mode" : "🌙 Dark Mode"}
        // </button>
        <>
            <p className="dark:text-white/80">Theme:</p>
            <p className="dark:text-white/80">{isDark ? "Dark" : "Light"}</p>
            <Switch onClick={() => setIsDark(!isDark)} checked={isDark} />
        </>
    );
};

export default DarkModeToggle;
