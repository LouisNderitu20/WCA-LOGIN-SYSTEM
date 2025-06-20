import nodemailer from 'nodemailer';

export async function sendResetEmail(email: string, username: string, token: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const resetUrl = `http://localhost:3000/reset-password?token=${token}`;

  const mailOptions = {
    from: `"WCA Auth System" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Reset Your Password - WCA Auth System',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; background: #f7f9fc; border-radius: 12px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
        <div style="text-align: center;">
          <img src="https://www.icipe.org/sites/default/files/icipe_logo_1.png" alt="ICIPE Logo" width="120" style="margin-bottom: 20px;" />
        </div>
        <h2 style="color: #1a73e8;">Reset Your Password</h2>
        <p>Hello <strong>${username}</strong>,</p>
        <p>We received a request to reset your password for the <strong>WCA Auth System</strong>.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #1a73e8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Reset Password</a>
        </div>
        <p>If you didn't request this, please ignore this email. This link will expire in 30 minutes.</p>
        <p style="margin-top: 40px; font-size: 14px; color: #888;">© 2025 WCA Auth System | ICIPE</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
