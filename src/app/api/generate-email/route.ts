// app/api/generate-email/route.ts
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY not found in environment variables.");
}

const ai = new GoogleGenAI({ apiKey });

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { category, goal } = await request.json();
    console.log("Received request with category:", category, "and goal:", goal);

    // Validate inputs
    if (!category || !goal) {
      return NextResponse.json(
        { error: "Missing category or goal" },
        { status: 400 }
      );
    }

    // Create the prompt with clearer instructions
    const prompt = `Generate a professional email with the following:
- Category: ${category}
- Goal: ${goal}

Requirements:
1. Provide ONLY the email content (no additional explanations)
2. Format as follows:
   Subject: [Your subject line]
   
   [Email body text]
3. Use plain text format (no markdown, no **bold**, no *italics*)
4. Keep placeholders in [square brackets]
5. For Variables that can change for emails like Company Name, Position Title, HR name etc., use {{variable_name}}.`;

    // Call the AI service
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    // Extract the response text
    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    // Extract subject
    const subjectMatch = text.match(/Subject:\s*(.+?)(\n|$)/i);
    const subject = subjectMatch?.[1]?.trim() || "Application for Position";

    // Extract and clean body
    let body = text;

    // Remove subject line if present
    if (subjectMatch) {
      body = body.slice(subjectMatch.index + subjectMatch[0].length).trim();
    }

    // Remove any trailing notes or explanations
    const notesIndex = body.search(
      /\n\*{2}|Important Considerations|Before Sending:/i
    );
    if (notesIndex > -1) {
      body = body.slice(0, notesIndex).trim();
    }

    const matches = [...text.matchAll(/\{\{(.*?)\}\}/g)];

    // Extract just the captured groups
    const placeholders = matches.map((match) => match[1]);
    const uniquePlaceholders = [...new Set(matches.map(match => match[1]))];

    console.log(body);

    // Clean up formatting
    // body = body
    //   .replace(/\*\*(.*?)\*\*/g, "$1")
    //   .replace(/\*(.*?)\*/g, "$1")
    //   .replace(/\n{3,}/g, "\n\n")
    //   .split("\n")
    //   .map((line) => line.trim())
    //   .join("\n")
    //   .trim();

    // Convert plain text to HTML paragraphs
    body = body
      .split(/\n{1,}/) // split by empty lines = new paragraphs
      .map((paragraph) => `<p>${paragraph.replace(/\n/g, " ").trim()}</p>`)
      .join("\n");

    // Return successful response
    return NextResponse.json({ subject, body, variables: uniquePlaceholders });
  } catch (error) {
    console.error("Gemini error:", error);
    return NextResponse.json(
      { error: "Failed to generate content from Gemini" },
      { status: 500 }
    );
  }
}
