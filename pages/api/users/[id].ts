import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = parseInt(req.query.id as string);

  if (isNaN(id)) return res.status(400).json({ error: "Invalid user ID" });

  try {
    switch (req.method) {
      case "PATCH":
        const { name, email, verified } = req.body;
        const updated = await prisma.user.update({
          where: { id },
          data: { name, email, verified },
        });
        return res.status(200).json(updated);

      case "DELETE":
        await prisma.user.delete({ where: { id } });
        return res.status(204).end();

      default:
        return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Server error", details: error });
  }
}
