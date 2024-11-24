"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import type { LatestList } from "@/types";
import { Trash2 } from "lucide-react";

export function List({ latestList }: { latestList?: LatestList }) {
    const utils = api.useUtils();
    const [name, setName] = useState("");

    const createList = api.list.create.useMutation({
        onSuccess: async () => {
            await utils.list.invalidate();
            setName("");
        },
    });
    const deleteList = api.list.delete.useMutation({
        onSuccess: async () => {
            await utils.list.invalidate();
        },
    });

    return (
        <>
            {!latestList && (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        createList.mutate({ name });
                    }}
                    className="flex flex-col gap-4"
                >
                    <p>Give your list a name</p>
                    <input
                        type="text"
                        placeholder="List title"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="rounded px-4 py-1 text-slate-700 focus:outline-none focus:ring focus:ring-emerald-500"
                    />
                    <button
                        type="submit"
                        className="rounded bg-emerald-400 px-10 py-3 font-semibold transition hover:bg-emerald-500 focus:outline-none focus:ring focus:ring-emerald-500"
                        disabled={createList.isPending}
                    >
                        {createList.isPending ? "Submitting..." : "Submit"}
                    </button>
                </form>
            )}

            <div className="flex items-center justify-between">
                {latestList && (
                    <>
                        <span className="truncate pr-1 text-center font-montserrat text-2xl font-bold uppercase">
                            {latestList?.listName}
                        </span>
                        <button
                            className="mb-1 rounded bg-red-500 p-1 font-semibold text-white transition hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-600"
                            onClick={() =>
                                deleteList.mutate({ id: latestList.id })
                            }
                        >
                            <Trash2 />
                        </button>
                    </>
                )}
            </div>
        </>
    );
}
