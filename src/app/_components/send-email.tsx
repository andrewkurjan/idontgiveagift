import { sendMessage } from "@/server/actions/send-message";
import {
    buildIndividualMessage,
    buildMasterMessage,
} from "@/services/message-service";
import type { Assignments } from "@/types";
import type { Session } from "next-auth";
import { Send, FileStack } from "lucide-react";

export default function SendEmail({
    picks,
    session,
}: {
    picks: Assignments;
    session: Session;
}) {
    async function handleSendMasterEmail() {
        const message = buildMasterMessage(session, picks);
        await sendMessage(message);
    }

    async function handleSendIndividualEmails() {
        for (const assignment of picks.assignments) {
            const message = buildIndividualMessage(
                assignment.buyer,
                assignment.recipient.firstName,
                session,
            );
            await sendMessage(message);
        }
    }

    return (
        <>
            <button
                className="mb-4 flex w-full items-center justify-center gap-4 rounded bg-emerald-400 px-10 py-3 font-semibold transition hover:bg-emerald-500 focus:outline-none focus:ring focus:ring-emerald-500"
                onClick={handleSendMasterEmail}
            >
                <Send />
                Email me master list
            </button>
            <button
                className="flex w-full items-center justify-center gap-4 rounded bg-emerald-400 px-10 py-3 font-semibold transition hover:bg-emerald-500 focus:outline-none focus:ring focus:ring-emerald-500"
                onClick={handleSendIndividualEmails}
            >
                <FileStack />
                Send individual emails
            </button>
        </>
    );
}
