import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Socket, io } from 'socket.io-client';

ConfigModule.forRoot();

const api_url: string = process.env.API_URL_ROOT;

@Injectable()
export class WebSocketClient implements OnModuleInit {
  public socketClient: Socket;

  constructor() {
    this.socketClient = io(api_url);
  }

  onModuleInit() {
    this.socketClient.on('connect', () => {
      this.registerConsumerEvents();
    });
  }

  private registerConsumerEvents() {
    this.socketClient.on('connect', () => {
      console.log('connected to Gateway');
    });
  }

  onMessage(message: string) {
    this.socketClient.emit('message', { data: message });
  }
}
