import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export const microserviceConfig: MicroserviceOptions = {
  transport: Transport.RMQ,
  options: {
    urls: [
      'amqps://rhmjohnj:Um6JbYsDaUwJMxt-6lZmEmT2_LLqdAdK@rat.rmq2.cloudamqp.com/rhmjohnj',
    ],
    queue: 'main_queue',
    noAck: false,
    queueOptions: {
      durable: false,
    },
  },
};
