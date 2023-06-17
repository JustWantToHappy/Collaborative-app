import React from 'react';
import { io } from 'socket.io-client';
import { Config, LocalStorageKey } from '@/enum';
import { useLocalStorage } from '@/hooks';

export default function Index() {
  const [userInfo] = useLocalStorage(LocalStorageKey.User_Info);

  React.useEffect(() => {
    const socket = io(Config.ServerUrl + '/friend');
    socket.on(`${userInfo.id}invite`, (data) => {
      
    });
  }, [userInfo.id]);

  return (
    <></>
  );
}
