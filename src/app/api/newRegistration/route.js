import dbConnect from "@/lib/dbConnect";
import Registration from "@/models/Registration";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    const { name, email, mobileNum, rollNum, branch, skills, whyJoin } = body;

    if (!name || !email || !mobileNum || !rollNum || !branch || !whyJoin) {
      return new Response(
        JSON.stringify({ error: "All required fields must be filled." }),
        { status: 400 }
      );
    }

    const newRegistration = new Registration({
      name,
      email,
      mobileNum,
      rollNum,
      branch,
      skills,
      whyJoin,
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
