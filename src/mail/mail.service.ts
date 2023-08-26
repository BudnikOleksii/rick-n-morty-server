import { join } from 'path';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

type TemplateName = 'activate-account';

interface MailProps {
  to: string;
  subject: string;
  templateName: TemplateName;
  context: {
    [p: string]: any;
  };
}

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail({ to, subject, templateName, context }: MailProps) {
    return await this.mailerService
      .sendMail({
        to,
        subject,
        template: join(__dirname, '/../../templates', templateName),
        context,
      })
      .catch((e) => {
        console.log(e);
        throw new UnprocessableEntityException('Email is out of service now, please, try again');
      });
  }
}
