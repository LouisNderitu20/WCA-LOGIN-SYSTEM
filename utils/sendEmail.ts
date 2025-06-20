import nodemailer from 'nodemailer';

export async function sendVerificationEmail(email: string, token: string, name: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const verificationUrl = `http://localhost:3000/verify?token=${token}`;

  const mailOptions = {
    from: `"WCA Auth System" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify Your Email - WCA Auth System',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; background: #f7f9fc; border-radius: 12px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
        <div style="text-align: center;">
          <img src="https://icipe.org/sites/default/files/logo_icipe.png" alt="ICIPE Logo" width="120" style="margin-bottom: 20px;" />
        </div>
        <h2 style="color: #1a73e8;">Verify Your Email</h2>
        <p>Hello <strong>${name}</strong>,</p>
        <p>Thank you for registering with the <strong>WCA Auth System</strong>. Please click the button below to verify your email address:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="background-color: #1a73e8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Verify Email</a>
        </div>
        <p>If you didn't create this account, you can safely ignore this email.</p>
        <p style="margin-top: 40px; font-size: 14px; color: #888;">© 2025 WCA Auth System | ICIPE</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
}
export async function sendPasswordResetEmail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const resetUrl = `http://localhost:3000/reset-password?token=${token}`;

  const mailOptions = {
    from: '"WCA Auth System" <' + process.env.EMAIL_USER + '>',
    to: email,
    subject: 'Reset Your Password - WCA Auth System',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; background: #f7f9fc; border-radius: 12px;">
        <h2 style="color: #1a73e8;">Reset Your Password</h2>
        <p>Hello,</p>
        <p>You requested to reset your password for the <strong>WCA Auth System</strong>.</p>
        <p>Click the button below to continue:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #1a73e8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Reset Password</a>
        </div>
        <p>If you didn’t request this, you can ignore this email.</p>
        <p style="margin-top: 40px; font-size: 14px; color: #888;">© 2025 WCA Auth System</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
