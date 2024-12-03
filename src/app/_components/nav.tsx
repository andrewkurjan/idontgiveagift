import type { Session } from "next-auth";
import Link from "next/link";

export function Nav({ session }: { session?: Session | null }) {
    return (
        <div className="absolute top-0 z-50 flex h-16 w-full items-center justify-end p-3">
            <p className="">
                {session && (
                    <span>
                        {session.user?.name ??
                            session.user.email?.split("@")[0]}
                    </span>
                )}
            </p>
            <Link
                href={session ? "/api/identity/signout" : "/api/identity/signin"}
                className="ml-4 rounded border border-solid border-white/30 bg-white/15 px-5 py-1 font-semibold no-underline drop-shadow-md transition hover:bg-emerald-500 focus:outline-none focus:ring focus:ring-emerald-500"
            >
                {session ? "Sign out" : "Sign in"}
            </Link>
        </div>
    );
}
