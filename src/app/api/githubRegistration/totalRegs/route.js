import dbConnect from "@/lib/dbConnect";
import GitRegistration from "@/models/GitHub";

// GET all registrations
export async function GET() {
  try {
    await dbConnect();

    const registrations = await GitRegistration.find().sort({ createdAt: -1 }); // newest first

    return new Response(JSON.stringify(registrations), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch registrations." }),
      { status: 500 }
    );
  }
}
