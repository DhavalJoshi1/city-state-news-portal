const nodemailer = require('nodemailer');

/**
 * ✅ Professional Email Sender Utility
 * @param {Object} options - { email, subject, message, html }
 */
const sendEmail = async (options) => {
  // 1. Create a transporter
  // Note: Production ke liye Gmail ya SendGrid use hota hai, testing ke liye Mailtrap.
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // 2. Define email options
  const mailOptions = {
    from: `City News Portal <${process.env.EMAIL_FROM || 'noreply@citynews.com'}>`,
    to: options.email,
    subject: options.subject,
    text: options.message, // Plain text version
    html: options.html || `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>City News Portal</h2>
        <p>Namaste,</p>
        <p>${options.message}</p>
        <br>
        <p>Agar aapne ye request nahi ki hai, toh kripya is email ko ignore karein.</p>
        <hr style="border: none; border-top: 1px solid #eee;" />
        <p style="font-size: 0.8em; color: #777;">&copy; 2026 City News Portal Team</p>
      </div>
    `
  };

  // 3. Actually send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Email successfully sent to: ${options.email}`);
  } catch (error) {
    console.error('❌ Nodemailer Error:', error);
    throw new Error('Email bhejne mein technical error aayi hai.');
  }
};

module.exports = sendEmail;