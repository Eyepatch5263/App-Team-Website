import dbConnect from "@/lib/dbConnect";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";

// POST -> submit contact form
export async function POST(req) {
  await dbConnect();
  try {
    const { name, email, query } = await req.json();

    if (!name || !email || !query) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    await Contact.create({ name, email, query });

    return NextResponse.json(
      { success: true, message: "Your query was sent, we'll respond to it as soon as possible on your mentioned email" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Failed to submit query." },
      { status: 500 }
    );
  }
}

// GET -> fetch all contacts
export async function GET() {
  await dbConnect();
  try {
    const reviews = await Contact.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, reviews }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch contacts." },
      { status: 500 }
    );
  }
}
