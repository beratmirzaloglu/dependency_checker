import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { ScheduleMailDto } from './dto/schedule-mail.dto';
import { MailService } from './mail/mail.service';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly mailService: MailService,
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
      const currentTimestamp = new Date().getTime();

      if (nextDependencyCheckTimestamp > currentTimestamp) {
        channel.nack(message);
      } else {
        const outdatedDependencies =
          await this.appService.getOutdatedDependencies(
            repositoryUrl,
            emailList,
          );

        const mailContent = this.appService.prepareMailContent(
          repositoryUrl,
          outdatedDependencies,
        );

        emailList.forEach((email) => {
          this.mailService.sendMail(email, mailContent);
        });

        channel.ack(message); // Task succeed!
      }
    } catch (error) {
      console.log(`Error! ${error}`);
    }
  }
}
