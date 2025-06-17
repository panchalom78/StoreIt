import { OTPModalProps } from "@/types";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { sendEmailOTP, verifySecret } from "@/lib/actions/user.action";
import { useRouter } from "next/navigation";

const OTPModal = ({ email, accountId }: OTPModalProps) => {
    const [isOpen, setIsOpen] = useState(true);
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const sessionId = await verifySecret({ accountId, password });
            if (sessionId) {
                router.push("/");
            }
        } catch (error) {
            console.log("Failed to verify OTP", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOTP = async () => {
        await sendEmailOTP(email);
    };
    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger>Open</AlertDialogTrigger>
            <AlertDialogContent className="w-fit py-9 rounded-4xl">
                <AlertDialogHeader className="relative">
                    <AlertDialogTitle className="text-2xl font-bold text-center">
                        Enter OTP
                        <Image
                            className="absolute top-[-25px] right-[-15px]"
                            src="close-dark.svg"
                            alt="close"
                            height={20}
                            width={20}
                            onClick={() => setIsOpen(false)}
                        />
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center ">
                        We&apos;ve send a code to{" "}
                        <span className="text-primary">{email}</span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <InputOTP maxLength={6} value={password} onChange={setPassword}>
                    <InputOTPGroup className="mx-auto">
                        <InputOTPSlot index={0} className="otp-input" />
                        <InputOTPSlot index={1} className="otp-input" />
                        <InputOTPSlot index={2} className="otp-input" />
                        <InputOTPSlot index={3} className="otp-input" />
                        <InputOTPSlot index={4} className="otp-input" />
                        <InputOTPSlot index={5} className="otp-input" />
                    </InputOTPGroup>
                </InputOTP>
                <AlertDialogFooter>
                    {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
                    <AlertDialogAction
                        className="w-full rounded-4xl"
                        disabled={isLoading}
                        onClick={handleSubmit}
                        type="button"
                    >
                        Submit
                        {isLoading && (
                            <Image
                                src="loader.svg"
                                alt="loader"
                                height={20}
                                width={20}
                                className="ml-2"
                            />
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
                <div className="flex justify-center items-center gap-2">
                    <p>Didn&apos;t get a code?</p>
                    <Button
                        onClick={handleResendOTP}
                        type="button"
                        variant="link"
                        className="p-0! m-0! h-fit"
                    >
                        Click to resend.
                    </Button>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default OTPModal;
