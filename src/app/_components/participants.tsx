"use client";

import { api } from "@/trpc/react";
import type { Participant } from "@/types";
import { useEffect, useRef, useState } from "react";
import { UserPlus, UserX } from "lucide-react";

function assignPresents(
    participants: Participant[],
): { buyer: Participant; recipient: Participant }[] {
    if (participants.length < 2) {
        throw new Error(
            "At least two participants are required to assign presents.",
        );
    }

    const shuffled = [...participants];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!];
    }

    const assignments: { buyer: Participant; recipient: Participant }[] = [];
    for (let i = 0; i < shuffled.length; i++) {
        const buyer = shuffled[i]!;
        const recipient = shuffled[(i + 1) % shuffled.length]!;
        assignments.push({ buyer, recipient });
    }

    return assignments;
}

export function Participants({ listId }: { listId: number }) {
    const [participants, setParticipants] = useState<Participant[]>([
        { firstName: "", email: "" },
    ]);
    const [disableAddButton, setDisableAddButton] = useState<boolean[]>([true]);
    const [isLastRowValid, setIsLastRowValid] = useState<boolean>(false);
    const utils = api.useUtils();
    const scrollableDivRef = useRef<HTMLDivElement>(null);

    const handleAddParticipant = (index: number) => {
        setParticipants([...participants, { firstName: "", email: "" }]);
        setDisableAddButton((prev) => {
            const newDisableAddButton = [...prev];
            newDisableAddButton[index] = true;
            newDisableAddButton.push(true);
            return newDisableAddButton;
        });
        setIsLastRowValid(false);
    };
    
    const handleRemoveParticipant = (index: number) => {
        const newParticipants = participants.filter((_, i) => i !== index);
        const newDisableAddButton = disableAddButton.filter((_, i) => i !== index);
    
        setParticipants(newParticipants);
        setDisableAddButton(newDisableAddButton);
    
        if (newParticipants.length > 0) {
            const lastIndex = newParticipants.length - 1;
            const isValid =
                newParticipants[lastIndex]?.firstName.trim() !== "" &&
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newParticipants[lastIndex]?.email ?? "");
            setIsLastRowValid(isValid);
        } else {
            setIsLastRowValid(false);
        }
    };

    const handleInputChange = (
        index: number,
        field: keyof Participant,
        value: string,
    ) => {
        const newParticipants = [...participants];
        if (newParticipants[index]) {
            newParticipants[index][field] = value;
            setParticipants(newParticipants);

            const isValid =
                newParticipants[index].firstName.trim() !== "" &&
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newParticipants[index].email);
            setDisableAddButton((prev) => {
                const newDisableAddButton = [...prev];
                newDisableAddButton[index] = !isValid;
                return newDisableAddButton;
            });

            if (index === newParticipants.length - 1) {
                setIsLastRowValid(isValid);
            }
        }
    };

    const saveParticipants = api.participant.create.useMutation({
        onSuccess: async () => {
            await utils.participant.invalidate();
        },
    });

    const setListSubmitted = api.list.setSubmitted.useMutation({
        onSuccess: async () => {
            await utils.list.invalidate();
        },
    });

    const savePicks = api.picks.create.useMutation({
        onSuccess: async () => {
            await utils.picks.invalidate();
        },
    });

    function handleSaveParticipants() {
        if (!participants?.length) return;

        for (const participant of participants) {
            saveParticipants.mutate({
                firstName: participant.firstName,
                email: participant.email,
                listId,
            });
        }
        const assignment = assignPresents(participants);

        setListSubmitted.mutate({ listId });

        savePicks.mutate({
            listId,
            data: { assignments: assignment },
        });
    }

    useEffect(() => {
        if (scrollableDivRef.current) {
            scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
        }
    }, [participants]);

    return (
        <div className="mt-2 max-h-[calc(100vh-300px)] px-1 pt-1 overflow-y-auto no-scrollbar" ref={scrollableDivRef}>
            <p className="mb-4">Add people to your list</p>
            {participants.map((participant, index) => (
                <div key={index} className="mb-4 flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="First Name"
                        value={participant.firstName}
                        onChange={(e) =>
                            handleInputChange(
                                index,
                                "firstName",
                                e.target.value,
                            )
                        }
                        className="rounded px-4 py-1 focus:outline-none focus:ring focus:ring-emerald-500 text-slate-700"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={participant.email}
                        onChange={(e) =>
                            handleInputChange(index, "email", e.target.value)
                        }
                        className="rounded px-4 py-1 focus:outline-none focus:ring focus:ring-emerald-500 text-slate-700"
                    />
                    {index === participants.length - 1 ? (
                        <button
                            onClick={() => handleAddParticipant(index)}
                            className="rounded bg-emerald-400 px-10 py-1 font-semibold transition hover:bg-emerald-500 focus:outline-none focus:ring focus:ring-emerald-500 disabled:bg-emerald-400/40 flex justify-center"
                            disabled={disableAddButton[index]}
                        >
                            <UserPlus />
                        </button>
                    ) : (
                        <button
                            onClick={() => handleRemoveParticipant(index)}
                            className="rounded bg-red-500 px-10 py-1 font-semibold transition hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-600 flex justify-center"
                        >
                            <UserX />
                        </button>
                    )}
                </div>
            ))}
            {participants.length > 2 && isLastRowValid && (
                <div className="pt-4 border-t border-solid border-white/30">
                    <button
                        onClick={handleSaveParticipants}
                        className="rounded bg-emerald-400 px-10 py-3 mb-1 font-semibold transition hover:bg-emerald-500 focus:outline-none focus:ring focus:ring-emerald-500 disabled:bg-emerald-400/40 w-full"
                        >
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
}
