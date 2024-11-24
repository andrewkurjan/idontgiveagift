import type { Assignments, Message, Person } from "@/types";
import type { Session } from "next-auth";

export function buildMasterMessage(
    session: Session,
    data: Assignments,
): Message {
    return {
        to: session.user.email ?? "",
        from: {
            name: "I Don't Give a Gift 🎁 💩",
            email: "no-reply@idontgiveagift.com",
        },
        subject: `Hello ${session.user.name ?? session.user.email?.split("@")[0]} - here is the list of who's buying for who!`,
        html: `
            <ul style="margin-top: 7px; text-align: center; list-style: none;">
                ${data?.assignments
                    .map(
                        (assignment) => `
                    <li style="margin-bottom: 7px;">
                        ${assignment.buyer.firstName} 🎁 ➡️ ${assignment.recipient.firstName}
                    </li>
                `,
                    )
                    .join("")}
            </ul>
        `,
    };
}

export function buildIndividualMessage(
    buyer: Person,
    recipientName: string,
    session: Session,
) {
    return {
        to: buyer.email ?? "",
        from: {
            name: "I Don't Give a Gift 🎁 💩",
            email: "no-reply@idontgiveagift.com",
        },
        subject: `Hello ${buyer.firstName} - here is who you are buying for!`,
        html: `
            <p>${session.user.name ?? session.user.email?.split("@")[0]} has probably spoken to you, they've
            created a list and who you'll be buying for is printed below! 🎉</p>

            <h1>🎁 💩 ${recipientName}</h1>
        `,
    };
}
