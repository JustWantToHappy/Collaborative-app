import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';


class SingleWebrtcProvider{
  //多个协同文档对应一个房间,key值就是roomId
  private readonly map: Map<string, WebrtcProvider> = new Map();
  //当前客服端对应的文档实例
  private readonly ydoc: Y.Doc = new Y.Doc();
  
  //进入webrtc对应的房间
  public joinWebRtcRoom(room: string) {
    if (this.map.has(room)) {
      return this.map.get(room);
    } else {
      const newRoom=new WebrtcProvider(room,this.ydoc);
      this.map.set(room,newRoom);
      return newRoom;
    }
  }

  public getYDoc() {
    return this.ydoc;
  }

}


export const singleWebrtcProvider=new SingleWebrtcProvider();
