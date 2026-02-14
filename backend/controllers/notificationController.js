import nodemailer from "nodemailer";

export const sendPermissionEmail = async (req, res) => {
  const { to, subject, message, details } = req.body;

  try {
    // 1. Configure Transporter (Use Gmail, Outlook, or SMTP)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your App Password
      },
    });

    // 2. Define HTML Email Template
    const mailOptions = {
      from: `"Academic Admin" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #059669;">Access Granted</h2>
          <p>${message}</p>
          <hr />
          <p><strong>Details:</strong></p>
          <ul>
            <li><strong>Subject:</strong> ${details.AllowedSubject}</li>
            <li><strong>Class:</strong> ${details.AllowedClass}</li>
            <li><strong>Semester:</strong> ${details.AllowedSemester}</li>
          </ul>
          <p style="font-size: 12px; color: #666;">This is an automated system notification.</p>
        </div>
      `,
    };

    // 3. Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully" });

  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
};