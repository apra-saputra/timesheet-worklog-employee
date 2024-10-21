import { createLog, viewLog } from "@/lib/repository/log";
import { NextApiRequest, NextApiResponse } from "next";

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { dateWorked, hoursWorked, userId, projectId, detail } = req.body;

  if (!dateWorked || !hoursWorked || !userId || !projectId || !detail) {
    return res.status(400).json({ message: "Invalid data" });
  }

  try {
    const log = await createLog({
      userId,
      projectId,
      dateWorked,
      detail,
      hoursWorked: Number(hoursWorked),
    });
    return res.status(201).json(log);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error creating log", error });
  }
};

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res
        .status(400)
        .json({ message: "Missing required query parameters" });
    }

    const logs = await viewLog(userId as string);
    return res.status(200).json({ message: "success get log", logs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error creating log", error });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") return await GET(req, res);

  if (req.method === "POST") return await POST(req, res);

  return res.status(503).json({ message: "Service unavailable" });
}
