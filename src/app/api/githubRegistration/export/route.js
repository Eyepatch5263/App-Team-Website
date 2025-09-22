import dbConnect from "@/lib/dbConnect";
import GitRegistration from "@/models/GitHub";
import ExcelJS from "exceljs";

export async function GET(req) {
  try {
    await dbConnect();
    const registrations = await GitRegistration.find({}).lean();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("GitHubRegistrations");

    worksheet.columns = [
      { header: "Name", key: "name", width: 20 },
      { header: "Email", key: "email", width: 25 },
      { header: "Mobile Number", key: "mobileNum", width: 15 },
      { header: "Roll Number", key: "rollNum", width: 15 },
      { header: "Branch", key: "branch", width: 15 },
      { header: "Gender", key: "gender", width: 20 },
      { header: "Registered At", key: "createdAt", width: 20 },
    ];

    registrations.forEach(reg => {
      worksheet.addRow({
        name: reg.name || "",
        email: reg.email || "",
        mobileNum: reg.mobileNum || "",
        rollNum: reg.rollNum || "",
        branch: reg.branch || "",
        gender: reg.gender || "",
        createdAt: reg.createdAt ? new Date(reg.createdAt).toLocaleString() : ""
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();

    // Convert to a Uint8Array / Buffer so Response gets binary data correctly
    const body = buffer instanceof ArrayBuffer ? new Uint8Array(buffer) : Buffer.from(buffer);

    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": "attachment; filename=registrations.xlsx",
        "Content-Length": String(body.length)
      }
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Failed to export registrations." }),
      { status: 500 }
    );
  }
}