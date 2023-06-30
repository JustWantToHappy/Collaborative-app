import { Injectable } from '@nestjs/common';

@Injectable()
export class OnOffLineService {
  private roomClients: { [roomId: string]: string[] } = {};

  joinRoom(clientId: string, roomId: string) {
    if (!this.roomClients[roomId]) {
      this.roomClients[roomId] = [clientId];
    } else if (!this.roomClients[roomId].includes(clientId)) {
      this.roomClients[roomId].push(clientId);
    }
  }

  leaveRoom(clientId: string, roomId: string) {
    if (this.roomClients[roomId]) {
      this.roomClients[roomId] = this.roomClients[roomId].filter(
        (id) => id != roomId,
      );
    }
  }

  getRoomClients() {
    return this.roomClients;
  }
}
