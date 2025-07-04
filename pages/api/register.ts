import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { sendVerificationEmail } from '@/utils/sendEmail';

const prisma = new PrismaClient();

type RegisterBody = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, username, email, password } = req.body as RegisterBody;

  if (!name || !username || !email || !password) {
    return res.status(400).json({ error: 'Please fill in all fields' });
  }

  try {
    
    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUsername) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const token = uuidv4();

    
    await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        verificationToken: token,
      },
    });

    await sendVerificationEmail(email, token, name);

    return res.status(200).json({ message: 'Registration successful. Please verify your email.' });
  } catch (error) {
    console.error('[REGISTER_ERROR]', error);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
