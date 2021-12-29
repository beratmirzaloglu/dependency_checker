import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DependencyCheckerController } from './dependency-checker.controller';
import { DependencyCheckerService } from './dependency-checker.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MAIL_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://rhmjohnj:Um6JbYsDaUwJMxt-6lZmEmT2_LLqdAdK@rat.rmq2.cloudamqp.com/rhmjohnj',
          ],
          queue: 'main_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [DependencyCheckerController],
  providers: [DependencyCheckerService],
})
export class DependencyCheckerModule {}
