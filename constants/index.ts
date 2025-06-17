export const menuItems = [
    {
        name: "dashboard",
        url: "/",
    },
    {
        name: "documents",
        url: "/documents",
    },
    {
        name: "images",
        url: "/images",
    },
    {
        name: "media",
        url: "/media",
    },
    {
        name: "others",
        url: "/others",
    },
];

export const ActionOptions = [
    {
        name: "rename",
        url: "/icons/edit.svg",
    },
    {
        name: "details",
        url: "/icons/info.svg",
    },
    {
        name: "share",
        url: "/icons/share.svg",
    },
    {
        name: "download",
        url: "/icons/download.svg",
    },
    {
        name: "delete",
        url: "/icons/delete.svg",
    },
];

export const MAX_FILE_SIZE = 50 * 1024 * 1024; //50MB

export const sortTypes = [
    {
        name: "Date-latest",
        value: "$createdAt-desc",
    },
    {
        name: "Date-oldest",
        value: "$createdAt-asc",
    },
    {
        name: "Name[A-Z]",
        value: "name-asc",
    },
    {
        name: "Name[Z-A]",
        value: "name-desc",
    },
    {
        name: "Size-largest",
        value: "size-desc",
    },
    {
        name: "Size-smallest",
        value: "size-asc",
    },
];

export const homeFileOptions = [
    {
        name: "documents",
        url: "/icons/documents.svg",
        color: "bg-primary",
        value: "/documents",
    },
    {
        name: "images",
        url: "/icons/images.svg",
        color: "bg-blue",
        value: "/images",
    },
    {
        name: "media",
        url: "/icons/media.svg",
        color: "bg-green",
        value: "/media",
    },
    {
        name: "others",
        url: "/icons/others.svg",
        color: "bg-purple",
        value: "/others",
    },
];
