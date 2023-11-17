import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/resources/user/user.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ParametersModule } from '../parameters/parameters.module';
import { WebSocketModule } from '../websocket/websocket.module';
import { WebSocketClient } from '../websocket/websocket.service';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { SocketGateway } from 'src/gateways/socket.gateway';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      synchronize: true,
      entities: [__dirname + '/../**/*.entity{.js, .ts}'],
    }),
    ClientsModule.register([
      {
        name: 'TESTE_CLIENT',
        transport: Transport.MQTT,
        options: {
          subscribeOptions: { qos: 2 },
          url: 'mqtt://localhost:1883',
        },
      },
    ]),
    UserModule,
    ParametersModule,
    WebSocketModule,
  ],
  controllers: [AppController],
  providers: [AppService, SocketGateway, WebSocketClient],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/user/auth');
  }
}
