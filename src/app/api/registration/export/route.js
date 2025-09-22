import dbConnect from "@/lib/dbConnect";
import Registration from "@/models/Registration";
import ExcelJS from "exceljs";

export async function GET(req) {
  try {
    await dbConnect();
    const registrations = await Registration.find({}).lean();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Registrations");

    worksheet.columns = [
      { header: "Name", key: "name", width: 20 },
      { header: "Email", key: "email", width: 25 },
      { header: "Mobile Number", key: "mobileNum", width: 15 },
      { header: "Roll Number", key: "rollNum", width: 15 },
      { header: "Branch", key: "branch", width: 15 },
      { header: "Skills", key: "skills", width: 20 },
      { header: "Why Join", key: "whyJoin", width: 40 },
      { header: "Registered At", key: "createdAt", width: 20 },
    ];

    registrations.forEach(reg => {
      worksheet.addRow({
        ...reg,
        createdAt: reg.createdAt ? new Date(reg.createdAt).toLocaleString() : ""
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": "attachment; filename=registrations.xlsx"
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
