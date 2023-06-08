import { Chat } from '../enum';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: true,
  port: 8080,
  namespace: /^\/chat\/private$/,
})
export class ChatPrivate {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Private chat client ${client.id} connected`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Private chat client ${client.id} disconnected`);
  }
  @SubscribeMessage(Chat.Private_Join)
  async handleJoinPrivateChatRoom(client: Socket, userId: string) {
    console.log(`Private chat client ${client.id} joined the room ${userId}`);
    client.join(userId);
    //const unreadCount = await this.privateChatService.getUnreadCount(userId);
    client.emit('privateChat.unreadCount', 'jhh');
  }

  @SubscribeMessage('privateChat.leave')
  handleLeavePrivateChatRoom(client: Socket, userId: string) {
    console.log(`Private chat client ${client.id} left the room ${userId}`);
    client.leave(userId);
  }

  @SubscribeMessage('privateChat.message')
  async handleMessage(client: Socket, @MessageBody() message: Message) {
    console.log(
      `Private chat client ${client.id} sent message: ${message.message}`,
    );
    const result = await this.privateChatService.sendMessage(
      client.handshake.query.userId,
      message,
    );
    const receiverSocket = this.server.sockets.sockets[message.receiverId];
    if (receiverSocket) {
      receiverSocket.emit('privateChat.message', result);
    }
  }

  @SubscribeMessage('privateChat.getMessages')
  async handleGetMessages(client: Socket, receiverId: string) {
    console.log(
      `Private chat client ${client.id} get messages from ${receiverId}`,
    );
    const senderId = client.handshake.query.userId;
    return this.privateChatService.getMessages(senderId, receiverId);
  }

  @SubscribeMessage('privateChat.readMessage')
  async handleReadMessage(client: Socket, messageId: string) {
    console.log(`Private chat client ${client.id} read message ${messageId}`);
    const userId = client.handshake.query.userId;
    await this.privateChatService.readMessage(userId, messageId);
  }
}
