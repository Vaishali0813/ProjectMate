export const WHATSAPP_PHONE_DISPLAY = '+94 74 070 3685';
export const WHATSAPP_PHONE_NUMBER = '94740703685';
export const INSTAGRAM_URL = 'https://www.instagram.com/projectmate_lk';
export const FACEBOOK_URL = 'https://www.facebook.com/share/19PMBp6BKj/';

/**
 * Generate a WhatsApp URL with a prefilled, URL-encoded message
 */
export function getWhatsAppUrl(message?: string): string {
  const baseUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}`;
  if (!message) return baseUrl;
  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}

/**
 * WhatsApp message for Get Started button in header/hero
 */
export function getStartedWhatsAppUrl(): string {
  const message = 'Hello Project Mate! I would like to inquire about your academic, creative, and technical support services to get started with my project.';
  return getWhatsAppUrl(message);
}

/**
 * WhatsApp message for "Get a Quote" on a specific service card
 */
export function getServiceQuoteWhatsAppUrl(serviceName: string): string {
  const message = `Hello Project Mate! I'm interested in your ${serviceName} service. Could you please share more details and a quotation?`;
  return getWhatsAppUrl(message);
}

/**
 * Formatted WhatsApp message for the Contact Us form submission
 */
export function getContactFormWhatsAppUrl(data: {
  fullName: string;
  email: string;
  whatsappNumber: string;
  service: string;
  description: string;
  deadline?: string;
}): string {
  const lines = [
    '✨ *New Project Mate Enquiry* ✨',
    '',
    `👤 *Full Name:* ${data.fullName}`,
    `📧 *Email:* ${data.email}`,
    `📱 *WhatsApp:* ${data.whatsappNumber}`,
    `💼 *Required Service:* ${data.service}`,
  ];

  if (data.deadline && data.deadline.trim()) {
    lines.push(`📅 *Preferred Deadline:* ${data.deadline.trim()}`);
  }

  lines.push('');
  lines.push('📝 *Project Description:*');
  lines.push(data.description.trim());
  lines.push('');
  lines.push('Looking forward to your guidance and quotation. Thank you!');

  return getWhatsAppUrl(lines.join('\n'));
}
