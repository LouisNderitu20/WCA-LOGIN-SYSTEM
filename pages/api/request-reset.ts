import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '@/utils/sendEmail';

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

  await sendPasswordResetEmail(email, resetToken);
  return res.status(200).json({ message: 'Password reset link sent to your email' });
} catch (error) {
  console.error('[RESET_REQUEST_ERROR]', error);
  return res.status(500).json({ error: 'Something went wrong. Please try again.' });
}
}