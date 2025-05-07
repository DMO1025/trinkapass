'use server';

/**
 * @fileOverview A mock email service.
 * This service simulates sending emails by logging them to the console.
 * - sendEmail - A function that "sends" an email.
 */

export interface EmailDetails {
  to: string;
  subject: string;
  body: string;
}

/**
 * Simulates sending an email.
 * In a real application, this would integrate with an email provider (e.g., SendGrid, Mailgun).
 * @param {EmailDetails} emailDetails - The details of the email to send.
 * @returns {Promise<void>} A promise that resolves when the email is "sent".
 */
export async function sendEmail(emailDetails: EmailDetails): Promise<void> {
  console.log('--- Sending Email ---');
  console.log(`To: ${emailDetails.to}`);
  console.log(`Subject: ${emailDetails.subject}`);
  console.log('Body:');
  console.log(emailDetails.body);
  console.log('--- Email "Sent" ---');
  // Simulate a short delay as if an API call was made
  await new Promise(resolve => setTimeout(resolve, 100));
}
