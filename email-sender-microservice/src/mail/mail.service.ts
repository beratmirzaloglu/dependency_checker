import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(emailAdress: string, mailContent: string): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: emailAdress,
        from: 'outdateddependencychecker@gmail.com',
        subject: 'There are outdated dependencies!',
        text: mailContent,
      });
      console.log('Email sent!');
    } catch (error) {
      console.log('Could not send email.');
      console.log(error);
    }
  }
}
