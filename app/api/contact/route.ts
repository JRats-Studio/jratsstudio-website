import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        // Simple validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Log the inquiry (in a production app, you would send an email here)
        console.log("=== NEW INQUIRY RECEIVED ===");
        console.log(`From: ${name} <${email}>`);
        console.log(`Message: ${message}`);
        console.log("============================");

        return NextResponse.json({ success: true, message: "Message transmitted successfully" });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to process request" },
            { status: 500 }
        );
    }
}
