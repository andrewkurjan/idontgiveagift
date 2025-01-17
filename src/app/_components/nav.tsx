import type { Session } from "next-auth";
import Link from "next/link";
import gradient from "random-gradient";
import { LogOut } from "lucide-react";
import {
    Drawer,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

export function Nav({ session }: { session?: Session | null }) {
    const bgGradient = { background: gradient("testing") };
    const userName = session?.user?.name ?? session?.user.email?.split("@")[0];
    const userInitial = userName?.[0];

    return (
        <div className="absolute top-0 z-50 flex h-16 w-full items-center justify-end gap-5 p-3">
            {session && (
                <>
                    <Drawer direction="right">
                        <DrawerTrigger>
                            <div
                                className="flex h-10 w-10 items-center justify-center rounded-full"
                                style={bgGradient}
                            >
                                <span className="text-xl font-bold text-white">
                                    {userInitial}
                                </span>
                            </div>
                        </DrawerTrigger>
                        <DrawerContent>
                            <div className="p-10 flex h-full justify-between flex-col items-start">
                                <div className="flex flex-col gap-5">
                                <DrawerTitle>{userName}</DrawerTitle>
                                Some content goes here
                                </div>
                                <Link
                                    href={"/api/identity/signout"}
                                    className="font-semibold hover:text-emerald-500 focus:outline-none focus:ring focus:ring-emerald-500 flex items-center gap-3"
                                    >
                                    <LogOut /> Sign out
                                </Link>
                            </div>
                        </DrawerContent>
                    </Drawer>
                </>
            )}
            {!session && (
                <>
                    <Link
                        href={"/api/identity/signin"}
                        className="ml-4 rounded border border-solid border-white/30 bg-white/15 px-5 py-1 font-semibold no-underline drop-shadow-md transition hover:bg-emerald-500 focus:outline-none focus:ring focus:ring-emerald-500"
                    >
                        {"Sign in"}
                    </Link>
                </>
            )}
        </div>
    );
}
