import nodemailer from 'nodemailer';
import { MailAdapter } from '../mail-adapter';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'e0f0dd2b57e6dd',
    pass: '504666e39f3d95',
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: { subject: string; body: string }) {
    await transport.sendMail({
      from: 'no-reply@fidget.com',
      to: 'jonathan.videira@gmail.com',
      subject,
      html: body,
    });
  }
}
