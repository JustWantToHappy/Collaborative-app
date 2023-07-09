import React from 'react';
import { Doc } from 'yjs';
import { getRandomColor} from '@/utils';
import * as awarenessProtocol from 'y-protocols/awareness';


export interface User{
  name: string;
  [x: string]: any;
}

export function useYjsAwareness(user: User,doc:Doc) {
  return React.useMemo(() => {
    const awareness=new awarenessProtocol.Awareness(doc);
    awareness.setLocalStateField('user', {
      name: user.name,
      color: getRandomColor(user.name),
    });
    return awareness;
  },[user.name,doc]);
}