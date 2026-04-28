import nodemailer from "nodemailer";

function getAppBaseUrl() {
  return process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

type MailDeliveryResult =
  | {
      mode: "smtp";
    }
  | {
      mode: "dev-otp";
      otp: string;
    };

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendVerificationEmail(input: { email: string; fullName: string; otp: string }): Promise<MailDeliveryResult> {
  const verifyUrl = `${getAppBaseUrl()}/verify-email?email=${encodeURIComponent(input.email)}`;
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.EMAIL_FROM;

  if (!host || !port || !user || !pass || !from) {
    console.log(`[auth] Verification OTP for ${input.email}: ${input.otp}`);
    return {
      mode: "dev-otp",
      otp: input.otp
    };
  }

  const safeName = escapeHtml(input.fullName);
  const safeOtp = escapeHtml(input.otp);
  const safeVerifyUrl = escapeHtml(verifyUrl);

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
    text: `Hello ${input.fullName},\n\nUse this code to verify your Eye Solutions account: ${input.otp}\n\nThe code expires in 10 minutes. Enter it here: ${verifyUrl}\n\nIf you did not create this account, you can ignore this email.`,
    html: `
      <div style="margin:0;padding:0;background:#f3f7f6;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#f3f7f6;">
          <tr>
            <td align="center" style="padding:32px 16px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;border-collapse:collapse;overflow:hidden;border-radius:28px;background:#ffffff;box-shadow:0 24px 70px rgba(15,118,110,0.16);">
                <tr>
                  <td style="padding:0;background:#0f766e;">
                    <div style="padding:32px 32px 40px;background:linear-gradient(135deg,#0f766e 0%,#115e59 58%,#f59e0b 140%);">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                        <tr>
                          <td>
                            <div style="display:inline-block;padding:8px 12px;border:1px solid rgba(255,255,255,0.28);border-radius:999px;color:#ccfbf1;font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;">
                              Eye Solutions
                            </div>
                            <h1 style="margin:22px 0 0;color:#ffffff;font-family:Arial,sans-serif;font-size:30px;line-height:1.12;font-weight:800;letter-spacing:0;">
                              Verify your email address
                            </h1>
                            <p style="margin:12px 0 0;color:#d9fffa;font-family:Arial,sans-serif;font-size:15px;line-height:24px;">
                              One quick step to activate your patient account.
                            </p>
                          </td>
                          <td align="right" width="80" style="vertical-align:top;">
                            <div style="width:56px;height:56px;border-radius:18px;background:rgba(255,255,255,0.16);border:1px solid rgba(255,255,255,0.25);text-align:center;line-height:56px;color:#ffffff;font-family:Arial,sans-serif;font-size:28px;font-weight:800;">
                              ES
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:34px 32px 10px;">
                    <p style="margin:0;color:#134e4a;font-family:Arial,sans-serif;font-size:16px;line-height:26px;">
                      Hello <strong>${safeName}</strong>,
                    </p>
                    <p style="margin:10px 0 0;color:#526763;font-family:Arial,sans-serif;font-size:15px;line-height:25px;">
                      Use the verification code below to confirm your email address. The code is valid for the next 10 minutes.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:22px 32px 8px;">
                    <div style="border:1px solid #cce8e4;border-radius:24px;background:#f8fffe;padding:24px;text-align:center;">
                      <div style="margin:0 0 10px;color:#0f766e;font-family:Arial,sans-serif;font-size:12px;font-weight:800;letter-spacing:1.8px;text-transform:uppercase;">
                        Your OTP Code
                      </div>
                      <div style="display:inline-block;padding:14px 18px;border-radius:18px;background:#ffffff;border:1px solid #dbecea;color:#0f3f3b;font-family:'Courier New',Courier,monospace;font-size:38px;line-height:42px;font-weight:800;letter-spacing:10px;">
                        ${safeOtp}
                      </div>
                      <p style="margin:14px 0 0;color:#6b7f7b;font-family:Arial,sans-serif;font-size:13px;line-height:21px;">
                        Do not share this code with anyone.
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding:22px 32px 8px;">
                    <a href="${safeVerifyUrl}" style="display:inline-block;border-radius:999px;background:#0f766e;color:#ffffff;font-family:Arial,sans-serif;font-size:15px;font-weight:700;text-decoration:none;padding:14px 24px;">
                      Enter code and verify
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 32px 32px;">
                    <div style="border-top:1px solid #e4efed;padding-top:18px;">
                      <p style="margin:0;color:#6b7f7b;font-family:Arial,sans-serif;font-size:13px;line-height:21px;">
                        Button not working? Open this secure verification page:
                      </p>
                      <p style="margin:8px 0 0;color:#0f766e;font-family:Arial,sans-serif;font-size:13px;line-height:20px;word-break:break-all;">
                        <a href="${safeVerifyUrl}" style="color:#0f766e;text-decoration:underline;">${safeVerifyUrl}</a>
                      </p>
                      <p style="margin:18px 0 0;color:#8aa09c;font-family:Arial,sans-serif;font-size:12px;line-height:20px;">
                        If you did not create an Eye Solutions account, you can safely ignore this email.
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    `
  });

  return {
    mode: "smtp"
  };
}
