import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { sendInviteEmail } from "@/lib/mail";
import crypto from "crypto";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, email, role } = req.body;

  if (
    typeof username !== "string" ||
    typeof email !== "string" ||
    typeof role !== "string" ||
    !username.trim() ||
    !email.trim() ||
    !role.trim()
  ) {
    return res.status(400).json({ error: "Missing or invalid fields" });
  }

  try {
    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 60 * 60 * 1000); 


    const verifiedEmailUser = await prisma.user.findFirst({
      where: {
        email,
        verified: true,
      },
    });

    if (verifiedEmailUser) {
      return res.status(400).json({ error: "User with this email is already verified" });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        verified: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (existingUser) {
      await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          resetToken: token,
          resetTokenExpiry: expiry,
        },
      });

      const link = `${process.env.NEXT_PUBLIC_BASE_URL}/set-password?token=${token}`;
      await sendInviteEmail({ username: existingUser.username, email, link });

      return res.status(200).json({ message: "Re-invitation sent", user: existingUser });
    }

    const usernameTaken = await prisma.user.findUnique({ where: { username } });
    if (usernameTaken) {
      return res.status(400).json({ error: "Username already exists" });
    }
    
    const newUser = await prisma.user.create({
      data: {
        username,
        name: username,
        email,
        password: "", 
        role,
        verified: false,
        resetToken: token,
        resetTokenExpiry: expiry,
      },
    });

    const link = `${process.env.NEXT_PUBLIC_BASE_URL}/set-password?token=${token}`;
    await sendInviteEmail({ username, email, link });

    return res.status(200).json({ user: newUser });
  } catch (err) {
    console.error("Invite Error:", err instanceof Error ? err.message : err);
    console.error("Full error object:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
