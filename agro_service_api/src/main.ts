import { NestFactory } from '@nestjs/core';
import { AppModule } from './resources/app/app.module';
import * as compression from 'compression';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appTeste = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.MQTT,
      options: {
        subscribeOptions: { qos: 2 },
        url: 'mqtt://localhost:1883',
      },
    },
  );

  app.enableCors();
  app.use(compression());

  await app.listen(4040);
  //await appTeste.listen();
}

bootstrap();
