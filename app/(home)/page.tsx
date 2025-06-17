import FileInfoCard from "@/components/FileInfoCard";
import HomeFileCard from "@/components/HomeFileCard";
import StorageCircle from "@/components/StotageView";
import { getFiles, getStorageDetails } from "@/lib/actions/file.action";
import { getFileDetails, getStorageNumber } from "@/lib/utils";
import { FileDocument, FileInfo } from "@/types";

export default async function Home() {
    const fetchRecentFiles = await getFiles({ typeArray: [], limit: 10 });
    const storageDetails: { [key: string]: FileInfo } =
        await getStorageDetails();
    const { usedPercent, remaining } = getStorageNumber(
        storageDetails["total"].size!
    );
    const fileOptions = getFileDetails(storageDetails);

    return (
        <div className="flex gap-3 flex-col lg:flex-row p-4 size-full">
            {/* Left Side */}
            <div className="lg:w-1/2 h-full flex flex-col gap-2">
                <div className="bg-primary rounded-lg lg:flex gap-5  p-6  w-full">
                    <div className="flex justify-center items-center gap-5 w-full">
                        <StorageCircle percent={usedPercent} />
                        <div className="flex flex-col items-center justify-center text-white">
                            <p className="text-xl font-semibold">
                                Available storage
                            </p>
                            <p>{remaining} / 2GB</p>
                        </div>
                    </div>
                </div>

                <div className="grid xl:grid-cols-2 lg:grid-cols-1 grid-cols-2 gap-6 mt-3">
                    {fileOptions.map((file) => (
                        <FileInfoCard
                            name={file.name}
                            url={file.url}
                            color={file.color}
                            key={file.name}
                            link={file.value}
                            size={file.size}
                        />
                    ))}
                </div>
            </div>

            {/* Right Side */}
            <div className="h-fit flex flex-col gap-2 bg-white lg:w-1/2 p-4 rounded-lg mt-4 lg:mt-0 mb-4">
                <h1 className="text-lg font-bold mb-3">
                    Recently Uploaded Files
                </h1>
                <div className="flex flex-col gap-2">
                    {fetchRecentFiles.total > 0 &&
                        fetchRecentFiles.documents.map((file: FileDocument) => (
                            <HomeFileCard {...file} key={file.$id} />
                        ))}
                </div>
            </div>
        </div>
    );
}
