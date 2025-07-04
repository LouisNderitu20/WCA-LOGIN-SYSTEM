import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendInviteEmail({
  username,
  email,
  link,
}: {
  username: string;
  email: string;
  link: string;
}) {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; background: #f7f9fc; border-radius: 12px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
      <div style="text-align: center;">
        <img src="https://icipe.org/sites/default/files/logo_icipe.png" alt="ICIPE Logo" width="120" style="margin-bottom: 20px;" />
      </div>
      <h2 style="color: #1a73e8;">Verify Your Email</h2>
      <p>Hello <strong>${username}</strong>,</p>
      <p>Thank you for registering with the <strong>WCA Auth System</strong>. Please click the button below to verify your email address and set your password:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${link}" style="background-color: #1a73e8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Verify Email</a>
      </div>
      <p>If you didn't create this account, you can safely ignore this email.</p>
      <p style="margin-top: 40px; font-size: 14px; color: #888;">© 2025 WCA Auth System | ICIPE</p>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "You're Invited to WCA – Set Your Password",
    html: htmlContent,
  });
}
