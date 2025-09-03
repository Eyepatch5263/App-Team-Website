import dbConnect from "@/lib/dbConnect";
import Announcement from "@/models/Announcement";
import { NextResponse } from "next/server";

// GET -> fetch all announcements
export async function GET() {
  try {
    await dbConnect();

    const announcements = await Announcement.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, announcements }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
