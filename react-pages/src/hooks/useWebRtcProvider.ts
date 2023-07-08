import { Doc } from 'yjs';
import React from 'react';
import { WebrtcProvider} from 'y-webrtc';
import type { User} from './useYjsAwareness';
import { useYjsAwareness} from './useYjsAwareness';

export function useWebRtcProvider(user:User,documentId:string) {
  const ydoc = React.useMemo(() => new Doc({ guid: documentId }), [documentId]);
  const awareness=useYjsAwareness(user,ydoc);

  return React.useMemo(() => {
    const roomName=`quill-collaborative-room-${documentId}`;
    return new WebrtcProvider(roomName,ydoc,{awareness});
  }, [awareness, ydoc, documentId]);
}