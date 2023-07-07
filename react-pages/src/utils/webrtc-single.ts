import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';


class SingleWebrtcProvider{
  //多个协同文档对应一个房间,key值就是roomId
  private readonly map: Map<string, WebrtcProvider> = new Map();
  //当前客服端对应的文档实例
  private readonly ydoc: Y.Doc = new Y.Doc();
  
  //进入webrtc对应的房间
  public joinWebRtcRoom(roomId: string) {
    if (this.map.has(roomId)) {
      return this.map.get(roomId);
    } else {
      console.info(roomId);
      const provider=new WebrtcProvider(roomId,this.ydoc);
      this.map.set(roomId, provider);
      return provider;
    }
  }

  public getYDoc() {
    return this.ydoc;
  }

  /**
   * @desc 当没有用户编辑文档的时候才可调用
   */
  public clear(roomId:string) {
    const provider=this.map.get(roomId);
    provider?.disconnect();
    provider?.destroy();
  }
}


export const singleWebrtcProvider=new SingleWebrtcProvider();
