/* eslint-disable @typescript-eslint/no-non-null-assertion */
import nodemailer, { Transporter } from 'nodemailer';

export default class MailerRepository {
  transport: Transporter;
  constructor() {
    const config: any = {
      host: process.env.MAILER_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    };
    this.transport = nodemailer.createTransport(config);
  }

  async sendMail(to: string, subject: string, text: string): Promise<void> {
    try {
      await this.transport.sendMail({
        from: `'Tooles TEST' <${process.env.MAILER_USER!}>`,
        to,
        subject,
        text,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
