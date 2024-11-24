"use server";

import sgMail from "@sendgrid/mail"

import type { Message } from "@/types";

export async function sendMessage(message: Message) {
    const API_KEY = process.env.SENDGRID_API_KEY;
    if (!API_KEY) throw new Error("Missing secret SENDGRID_API_KEY");

    sgMail.setApiKey(API_KEY);

    await sgMail.send(message);
}