import dbConnect from "@/lib/dbConnect";
import Announcement from "@/models/Announcement";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { title, date, content } = body;

    if (!title || !date || !content) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    await Announcement.create({
      title,
      date: new Date(date),
      content,
    });

    return NextResponse.json(
      { success: true, message: "Announcement posted successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to post announcement." },
      { status: 500 }
    );
  }
}
