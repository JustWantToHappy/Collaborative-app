import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';


class SingleWebrtcProvider{
  //多个协同文档对应一个房间,key值就是roomId
  private readonly map: Map<string, WebrtcProvider> = new Map();
  //当前客服端对应的文档实例
  private readonly ydoc: Y.Doc = new Y.Doc();
  
  constructor() {
    this.ydoc.on('update', () => {
      //console.info('Document updated',this.ydoc.toJSON());
    });
  }

  //进入webrtc对应的房间
  public joinWebRtcRoom(roomId: string) {
    if (this.map.has(roomId)) {
      return this.map.get(roomId);
    } else {
      const provider = new WebrtcProvider(roomId, this.ydoc, { signaling: [ 'ws://localhost:4444'] });
      this.map.set(roomId, provider);
      return provider;
    }
  }

  public getYDoc() {
    return this.ydoc;
  }

}


export const singleWebrtcProvider=new SingleWebrtcProvider();
