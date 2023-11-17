import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { WebSocketClient } from '../websocket/websocket.service';
ConfigModule.forRoot();

const outputClient: string = process.env.OUTPUT_TOPIC_CLIENT;
const inputModule: string = process.env.INPUT_TOPIC_MODULE;

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly websocket: WebSocketClient,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern(inputModule)
  handleSendData(@Payload() payload: string) {
    this.appService.handleSendDataService(payload);
  }

  @MessagePattern(outputClient)
  logData(@Payload() payload: string): string {
    this.websocket.onMessage(payload);
    return payload;
  }
}
