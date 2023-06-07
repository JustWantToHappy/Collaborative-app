import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: true, port: 8080 })
export class CommonGateWay {
  handleConnection(client: Socket) {
    console.log('Client connected' + client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected' + client.id);
  }

  @SubscribeMessage('events')
  handleEvent(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    console.info('有人发送websocket请求');
    return data;
  }
}
