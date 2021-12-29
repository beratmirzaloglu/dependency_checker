import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
@Module({
  imports: [ConfigModule.forRoot(), MailModule, HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
