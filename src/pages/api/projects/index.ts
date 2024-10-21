import { generateMonthlyReport } from "@/lib/repository/log";
import { NextApiRequest, NextApiResponse } from "next";

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Ambil query parameter dari URL (userId, month, dan year)
    const { userId, month, year } = req.query;

    // Validasi apakah semua parameter ada
    if (!userId || !month || !year) {
      return res
        .status(400)
        .json({ message: "Missing required query parameters" });
    }

    // Convert month and year ke number jika perlu
    const monthInt = parseInt(month as string, 10);
    const yearInt = parseInt(year as string, 10);

    if (isNaN(monthInt) || isNaN(yearInt)) {
      return res.status(400).json({ message: "Invalid month or year format" });
    }

    // Panggil fungsi untuk menghasilkan laporan bulanan
    const report = await generateMonthlyReport(
      userId as string,
      monthInt,
      yearInt
    );

    // Kirim laporan sebagai respons
    return res
      .status(200)
      .json({ message: "Monthly report generated successfully", report });
  } catch (error) {
    console.error("Error generating monthly report:", error);
    return res
      .status(500)
      .json({ message: "Failed to generate monthly report" });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") return await GET(req, res);

  return res.status(503).json({ message: "Service unavailable" });
}
