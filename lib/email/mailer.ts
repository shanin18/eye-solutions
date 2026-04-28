import nodemailer from "nodemailer";

function getAppBaseUrl() {
  return process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

type MailDeliveryResult =
  | {
      mode: "smtp";
      verifyUrl: string;
    }
  | {
      mode: "dev-link";
      verifyUrl: string;
    };

export async function sendVerificationEmail(input: { email: string; fullName: string; token: string }): Promise<MailDeliveryResult> {
  const verifyUrl = `${getAppBaseUrl()}/verify-email?token=${input.token}`;
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.EMAIL_FROM;

  if (!host || !port || !user || !pass || !from) {
    console.log(`[auth] Verification link for ${input.email}: ${verifyUrl}`);
    return {
      mode: "dev-link",
      verifyUrl
    };
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(port),
    secure: Number(port) === 465,
    auth: {
      user,
      pass
    }
  });

  await transporter.sendMail({
    from,
    to: input.email,
    subject: "Verify your Eye Solutions account",
    text: `Hello ${input.fullName},\n\nVerify your account by opening this link:\n${verifyUrl}\n\nIf you did not create this account, you can ignore this email.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
        <h2>Verify your Eye Solutions account</h2>
        <p>Hello ${input.fullName},</p>
        <p>Please verify your email address to activate your patient login.</p>
        <p><a href="${verifyUrl}" style="display:inline-block;padding:12px 18px;border-radius:9999px;background:#0f766e;color:#ffffff;text-decoration:none;font-weight:600;">Verify email</a></p>
        <p>If the button does not work, open this URL:</p>
        <p>${verifyUrl}</p>
      </div>
    `
  });

  return {
    mode: "smtp",
    verifyUrl
  };
}
