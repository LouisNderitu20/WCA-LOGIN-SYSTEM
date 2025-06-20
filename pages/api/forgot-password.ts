import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { sendResetEmail } from '@/utils/sendResetEmail';
import crypto from 'crypto';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'No user found with that email' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 1000 * 60 * 30); 

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry: expiry,
      },
    });

    await sendResetEmail(user.email, user.username, resetToken);


    return res.status(200).json({ message: 'Password reset email sent successfully.' });
  } catch (error) {
    console.error('[FORGOT_PASSWORD_ERROR]', error);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
