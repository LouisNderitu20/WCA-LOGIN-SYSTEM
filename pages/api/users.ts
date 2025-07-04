import { prisma } from "@/lib/prisma"; 
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        verified: true,
        role: true,
        createdAt: true,
        lastLogin: true,
      },
    });

    const validUsers = users.filter(
      (u) =>
        u &&
        typeof u.email === "string" &&
        typeof u.username === "string" &&
        typeof u.name === "string" &&
        typeof u.role === "string" &&
        typeof u.verified === "boolean"
    );

    res.status(200).json(validUsers);
  } catch (error) {
    console.error("Failed to load users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
