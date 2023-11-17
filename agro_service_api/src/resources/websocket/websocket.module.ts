import { Module } from '@nestjs/common';
import { WebSocketClient } from './websocket.service';

@Module({
  providers: [WebSocketClient],
})
export class WebSocketModule {}
