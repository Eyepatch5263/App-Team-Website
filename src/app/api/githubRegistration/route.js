import dbConnect from "@/lib/dbConnect";
import GitRegistration from "@/models/GitHub";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    const { name, email, mobileNum, rollNum, branch, gender } = body;

    if (!name || !email || !mobileNum || !rollNum || !branch || !gender) {
      return new Response(
        JSON.stringify({ error: "All required fields must be filled." }),
        { status: 400 }
      );
    }


    const newRegistration = new GitRegistration({
      name,
      email,
      mobileNum,
      rollNum,
      branch,
      gender
    });

    await newRegistration.save();

    return new Response(
      JSON.stringify({ message: "Registration successful!" }),
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Failed to submit registration." }),
      { status: 500 }
    );
  }
}
