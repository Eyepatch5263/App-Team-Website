import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import cloudinary from "cloudinary";
import Member from "@/models/Member";
import dbConnect from "@/lib/dbConnect";

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export async function POST(req) {
  try {
    await dbConnect();

    const formData = await req.formData();
    const name = formData.get("name");
    const bio = formData.get("bio");
    const role = formData.get("role");
    const githubURL = formData.get("githubURL");
    const linkedInURL = formData.get("linkedInURL");
    const file = formData.get("profileImageURL"); // file input

    let profileImageURL = null;

    if (file && file.arrayBuffer) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const webpBuffer = await sharp(buffer).rotate().webp({ quality: 80 }).toBuffer();

      const imageId = uuidv4();

      const result = await cloudinary.v2.uploader.upload(
        `data:image/webp;base64,${webpBuffer.toString("base64")}`,
        {
          resource_type: "image",
          folder: `team-members/${imageId}`,
          public_id: "profile",
          format: "webp",
        }
      );
      profileImageURL = result.secure_url;
    }

    const created = await Member.create({
      name,
      bio,
      role,
      profileImageURL,
      githubURL,
      linkedInURL,
    });

    return NextResponse.json({ success: true, member: created }, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}
