import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'http';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
    transports: ['websocket'],
  },
})
export class SocketGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {
      console.log('Websocket => ', socket.id);
    });
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string) {
    this.server.emit('message', message);
  }
}
