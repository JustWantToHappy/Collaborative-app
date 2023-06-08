import { WebSocketGateway, SubscribeMessage } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Chat } from '../enum';

@WebSocketGateway({ cors: true, port: 8080, namespace: /^\/chat\/group-\d+$/ })
export class ChatGroup {
  handleConnection(client: Socket) {
    console.log(`Client ${client.id} connected ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client ${client.id} disconnected ${client.id}`);
  }

  @SubscribeMessage(Chat.Group_Join)
  //当用户加入房间...
  onJoinRoom(client: Socket, roomId: string) {
    console.info(`Client ${client.id} joined room ${roomId}`);
    client.join(roomId);
    client.to(roomId).emit(Chat.Group_Join, roomId, client.id);
  }

  @SubscribeMessage(Chat.Group_Leave)
  //当用户离开房间...
  onLeaveRoom(client: Socket, roomId: string) {
    console.info(`Client ${client.id} leaved room ${roomId}`);
    client.leave(roomId);
    client.to(roomId).emit(Chat.Group_Leave, roomId, client.id);
  }

  @SubscribeMessage(Chat.Group_Message)
  //当用户发送消息的时候...
  onChatMessage(client: Socket, message: string) {
    console.info(`client ${client.id} send message: ${message}`);
    client.broadcast.emit(Chat.Group_Message, client.id, message);
  }
}
