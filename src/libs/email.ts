import nodemailer from "nodemailer"
import type { IApplication } from "../models/Application"

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_PORT === "465",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

/**
 * Send application confirmation email to candidate
 */
export async function sendApplicationConfirmationEmail(email: string, name: string): Promise<boolean> {
  try {
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER) {
      console.log("Email configuration not found, skipping email send")
      return false
    }

    const transporter = createTransporter()

    await transporter.sendMail({
      from: `"NK Recruitment" <${process.env.EMAIL_FROM || "noreply@nkrecruitment.com"}>`,
      to: email,
      subject: "Application Received - NK Recruitment",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #e91e63;">Thank You for Your Application</h2>
          <p>Dear ${name},</p>
          <p>We have received your application and CV. Our recruitment team will review your information and get back to you if there's a suitable match.</p>
          <p>Here's what happens next:</p>
          <ol>
            <li><strong>Application Review:</strong> Our recruitment team will review your CV and application details.</li>
            <li><strong>Initial Contact:</strong> If your profile matches our current openings, a recruiter will contact you within 5-7 business days.</li>
            <li><strong>Profile Database:</strong> Your profile will be added to our database for future opportunities that match your skills and experience.</li>
          </ol>
          <p>If you have any questions, please don't hesitate to contact us at <a href="mailto:info@nkrecruitment.com">info@nkrecruitment.com</a>.</p>
          <p>Best regards,<br>NK Recruitment Team</p>
        </div>
      `,
    })

    console.log(`Application confirmation email sent to ${email}`)
    return true
  } catch (error) {
    console.error("Email sending error:", error)
    return false
  }
}

/**
 * Send notification to admin when new application is submitted
 */
export async function sendNewApplicationNotification(application: IApplication): Promise<boolean> {
  try {
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.ADMIN_EMAIL) {
      console.log("Email configuration not found, skipping email send")
      return false
    }

    const transporter = createTransporter()

    await transporter.sendMail({
      from: `"NK Recruitment System" <${process.env.EMAIL_FROM || "noreply@nkrecruitment.com"}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "New Application Submitted",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #e91e63;">New Application Submitted</h2>
          <p>A new application has been submitted to the NK Recruitment system.</p>
          <h3>Applicant Details:</h3>
          <ul>
            <li><strong>Name:</strong> ${application.fullName}</li>
            <li><strong>Email:</strong> ${application.email}</li>
            <li><strong>Phone:</strong> ${application.phone}</li>
            <li><strong>Position:</strong> ${application.position}</li>
            <li><strong>Submitted:</strong> ${new Date(application.submittedAt).toLocaleString()}</li>
          </ul>
          <p>Please log in to the <a href="${process.env.ADMIN_URL || "https://nkrecruitment.com/admin"}">admin dashboard</a> to review this application.</p>
        </div>
      `,
    })

    console.log(`New application notification sent for ${application.fullName}`)
    return true
  } catch (error) {
    console.error("Email sending error:", error)
    return false
  }
}

/**
 * Send status update notification to candidate
 */
export async function sendStatusUpdateEmail(application: IApplication): Promise<boolean> {
  try {
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER) {
      console.log("Email configuration not found, skipping email send")
      return false
    }

    // Different email templates based on status
    let subject, content

    switch (application.status) {
      case "Reviewed":
        subject = "Application Under Review - NK Recruitment"
        content = `
          <p>We wanted to let you know that our recruitment team has reviewed your application and CV.</p>
          <p>Your profile is currently under consideration, and we'll be in touch soon with more information about next steps.</p>
        `
        break
      case "Contacted":
        subject = "We'd Like to Connect With You - NK Recruitment"
        content = `
          <p>Good news! Our recruitment team is interested in your profile and would like to discuss potential opportunities with you.</p>
          <p>One of our recruiters will be reaching out to you shortly via email or phone to schedule an initial conversation.</p>
        `
        break
      case "Interviewed":
        subject = "Interview Scheduled - NK Recruitment"
        content = `
          <p>Thank you for your recent interview with NK Recruitment.</p>
          <p>Your application is progressing, and we're currently evaluating all candidates. We'll be in touch with feedback and next steps soon.</p>
        `
        break
      case "Hired":
        subject = "Congratulations! - NK Recruitment"
        content = `
          <p>Congratulations! We're delighted to inform you that your application has been successful.</p>
          <p>Our team will be in touch shortly with all the details about your new position and next steps.</p>
        `
        break
      case "Rejected":
        subject = "Application Update - NK Recruitment"
        content = `
          <p>Thank you for your interest in opportunities through NK Recruitment.</p>
          <p>After careful consideration, we've decided to proceed with other candidates whose qualifications more closely match our current requirements.</p>
          <p>We appreciate your interest and encourage you to apply for future positions that match your skills and experience.</p>
        `
        break
      default:
        return false // Don't send email for other statuses
    }

    const transporter = createTransporter()

    await transporter.sendMail({
      from: `"NK Recruitment" <${process.env.EMAIL_FROM || "noreply@nkrecruitment.com"}>`,
      to: application.email,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #e91e63;">Application Status Update</h2>
          <p>Dear ${application.fullName},</p>
          ${content}
          <p>If you have any questions, please don't hesitate to contact us at <a href="mailto:info@nkrecruitment.com">info@nkrecruitment.com</a>.</p>
          <p>Best regards,<br>NK Recruitment Team</p>
        </div>
      `,
    })

    console.log(`Status update email sent to ${application.email}`)
    return true
  } catch (error) {
    console.error("Email sending error:", error)
    return false
  }
}
