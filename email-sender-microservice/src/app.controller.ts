import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { ScheduleMailDto } from './dto/schedule-mail.dto';
import { IDependencies } from './interfaces/dependency.interface';
import { MailService } from './mail/mail.service';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly mailService: MailService,
    private readonly httpService: HttpService,
    private readonly appService: AppService,
  ) {}

  @EventPattern('schedule_mail')
  async scheduleMail(
    @Payload() scheduleMailDto: ScheduleMailDto,
    @Ctx() context: RmqContext,
  ) {
    try {
      const { repositoryUrl, emailList, nextDependencyCheckTimestamp } =
        scheduleMailDto;
      const channel = context.getChannelRef();
      const message = context.getMessage();
      //channel.ack(message);
      const currentTimestamp = new Date().getTime();
      if (nextDependencyCheckTimestamp > currentTimestamp) {
        channel.nack(message);
      } else {
        const result = await lastValueFrom(
          this.httpService.post(process.env.API_URL + '/dependency-checker', {
            repositoryUrl,
            emailList,
          }),
        );
        const dependencies: IDependencies = result.data;

        const mailContent = this.appService.prepareMailContent(
          repositoryUrl,
          dependencies,
        );

        emailList.forEach((email) => {
          this.mailService.sendTestMail(email, mailContent);
        });

        channel.ack(message); // Task succeed!
      }
    } catch (error) {
      console.log(`Error! ${error}`);
    }
  }
}
