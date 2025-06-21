// api/emails/schedule/route.ts
import { NextResponse } from "next/server";
import { getAgendaInstance } from "@/lib/agenda";
import dbConnect from "@/lib/db";

export async function POST(request: Request) {
  await dbConnect();
  const agenda = await getAgendaInstance();

  const {
    templateId,
    recipient,
    variables = {},
    scheduleTime,
    subject,
    body,
    category,
  } = await request.json();

  if (!templateId || !recipient || !scheduleTime) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    await agenda.schedule(new Date(scheduleTime), "send scheduled email", {
      templateId,
      recipient,
      variables,
      subject,
      body,
      category,
    });

    return NextResponse.json({ message: "Email scheduled successfully" });
  } catch (error) {
    console.error("Error scheduling email:", error);
    return NextResponse.json(
      { error: "Failed to schedule email" },
      { status: 500 }
    );
  }
}
