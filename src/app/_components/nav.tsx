import type { Session } from "next-auth";
import Link from "next/link";
import gradient from "random-gradient";
import { Menu } from "lucide-react";
import {
    Drawer,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

export function Nav({ session }: { session?: Session | null }) {
    const bgGradient = { background: gradient("testing") };

    return (
        <div className="absolute top-0 z-50 flex h-16 w-full items-center justify-end gap-5 p-5">
            {session && (
                <>
                    <button
                        className="flex h-10 w-10 items-center justify-center rounded-full"
                        style={bgGradient}
                    >
                        <span className="text-xl font-bold text-white">
                            {session.user?.name?.[0] ??
                                session.user.email?.split("@")[0]?.[0]}
                        </span>
                    </button>
                    <Drawer direction="right">
                        <DrawerTrigger>
                            <Menu size={35} />
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerTitle>Title</DrawerTitle>
                            Some content goes here
                            <Link
                                href={"/api/identity/signout"}
                                className="font-semibold hover:bg-emerald-500 focus:outline-none focus:ring focus:ring-emerald-500"
                            >
                                {"Sign out"}
                            </Link>
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
