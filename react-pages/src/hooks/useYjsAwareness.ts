import React from 'react';
import * as awarenessProtocol from 'y-protocols/awareness';
import { Doc} from 'yjs';


export interface User{
  name: string;
  [x: string]: any;
}

export function useYjsAwareness(user: User,doc:Doc) {
  return React.useMemo(() => {
    const awareness=new awarenessProtocol.Awareness(doc);
    awareness.setLocalStateField('user', {
      name: user.name,
      color:'red'
    });
    return awareness;
  },[user.name,doc]);
}