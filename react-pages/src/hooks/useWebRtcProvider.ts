import { Doc } from 'yjs';
import React from 'react';
import type { User} from './useYjsAwareness';
import { useYjsAwareness} from './useYjsAwareness';
import { singleWebrtcProvider } from '@/utils';

export function useWebRtcProvider(user:User,documentId:string) {
  const ydoc = React.useMemo(() => new Doc({ guid: documentId }), [documentId]);
  const awareness=useYjsAwareness(user,ydoc);
  
  return React.useMemo(() => {
    const roomId=`quill-collaborative-room-${documentId}`;
    return singleWebrtcProvider.joinWebRtcRoom(roomId,awareness);
  }, [documentId,awareness]);
}