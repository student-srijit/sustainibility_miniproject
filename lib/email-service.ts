import nodemailer from 'nodemailer';

// Email configuration
const EMAIL_CONFIG = {
  service: "gmail",
  auth: {
    user: process.env.HOST_EMAIL,
    pass: process.env.HOST_EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
  pool: true, // Use pooled connections
  maxConnections: 5,
  maxMessages: 100,
  rateDelta: 1000, // Minimum time between messages
  rateLimit: 5, // Max messages per rateDelta
};

// Create reusable transporter
const transporter = nodemailer.createTransport(EMAIL_CONFIG);

// Verify transporter on startup
transporter.verify()
  .then(() => {
    console.log('✅ Email service is ready to send messages');
  })
  .catch((error: Error) => {
    console.error('❌ Email service configuration error:', error);
  });

export async function sendOTPEmail(email: string, otp: string): Promise<boolean> {
  try {
    console.log(`📧 Attempting to send OTP to ${email}`);

    // Validate environment variables
    if (!process.env.HOST_EMAIL || !process.env.HOST_EMAIL_PASSWORD) {
      throw new Error("Email credentials not configured");
    }

    // Send email
    const info = await transporter.sendMail({
      from: `"ThinkGreen" <${process.env.HOST_EMAIL}>`,
      to: email,
      subject: "Your ThinkGreen Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #2e7d32; margin: 0;">ThinkGreen</h2>
            <p style="color: #666; margin: 5px 0;">Sustainability Learning Platform</p>
          </div>
          
          <h3 style="color: #2e7d32;">Verification Code</h3>
          <p>Hello,</p>
          <p>Your verification code for ThinkGreen is:</p>
          
          <div style="background: linear-gradient(135deg, #4caf50, #2e7d32); padding: 20px; border-radius: 10px; text-align: center; margin: 20px 0;">
            <div style="background-color: white; padding: 15px; border-radius: 5px; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #2e7d32;">
              ${otp}
            </div>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              <strong>Important:</strong> This code will expire in 10 minutes for security reasons.
            </p>
          </div>
          
          <p>If you didn't request this code, please ignore this email and ensure your account is secure.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px;">
              Thank you for joining our sustainability journey! 🌱
            </p>
            <p style="color: #666; font-size: 14px;">
              Together, we can make a difference for our planet.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
            <p>© ${new Date().getFullYear()} ThinkGreen. All rights reserved.</p>
            <p>This is an automated message, please do not reply.</p>
          </div>
        </div>
      `,
    });

    console.log(`✅ OTP email sent successfully to ${email}. Message ID: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to send OTP email to ${email}:`, error);
    return false;
  }
}

export async function sendWelcomeEmail(email: string, name: string): Promise<boolean> {
  try {
    console.log(`📧 Sending welcome email to ${email}`);

    const info = await transporter.sendMail({
      from: `"ThinkGreen" <${process.env.HOST_EMAIL}>`,
      to: email,
      subject: "Welcome to ThinkGreen! 🌱",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2e7d32; margin: 0;">Welcome to ThinkGreen! 🌱</h1>
          </div>
          
          <p>Hello ${name},</p>
          
          <p>Welcome to ThinkGreen, your sustainability learning platform! We're excited to have you join our community of eco-conscious learners.</p>
          
          <div style="background: linear-gradient(135deg, #4caf50, #2e7d32); padding: 20px; border-radius: 10px; color: white; margin: 20px 0;">
            <h3 style="margin: 0 0 15px 0;">What you can do:</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li>🎮 Play interactive sustainability games</li>
              <li>📚 Learn about renewable energy and recycling</li>
              <li>🏆 Earn points and climb the leaderboard</li>
              <li>🌍 Make a positive impact on our planet</li>
            </ul>
          </div>
          
          <p>Start your journey by exploring our games and educational content. Every action you take helps build a more sustainable future!</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXTAUTH_URL || "http://localhost:3000"}/dashboard" 
               style="background-color: #4caf50; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Get Started
            </a>
          </div>
          
          <p>Happy learning!</p>
          <p>The ThinkGreen Team</p>
          
          <div style="text-align: center; margin-top: 30px; color: #999; font-size: 12px; border-top: 1px solid #eee; padding-top: 20px;">
            <p>© ${new Date().getFullYear()} ThinkGreen. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    console.log(`✅ Welcome email sent to ${email}. Message ID: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to send welcome email to ${email}:`, error);
    return false;
  }
}
