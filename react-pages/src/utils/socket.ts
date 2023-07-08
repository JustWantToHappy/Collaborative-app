import { Config } from '@/enum';
import { io } from 'socket.io-client';

export const chatRoomSocket=io(Config.Server,{path:'/chat',extraHeaders:{}});

export const messageSocket=io(Config.Server+'/message');

export const friendSocket = io(Config.Server + '/friend');
