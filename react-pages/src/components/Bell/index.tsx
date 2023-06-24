import React from 'react';
import PubSub from 'pubsub-js';
import StyleDiv from './style';
import { Badge, message } from 'antd';
import { useDebouce } from '@/hooks';
import type { Message } from '@/types';
import { io } from 'socket.io-client';
import { useLocalStorage } from '@/hooks';
import { getAllPendingMessages } from '@/api';
import { Config, LocalStorageKey } from '@/enum';
import { BellFilled } from '@ant-design/icons';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Index() {
  const navigate = useNavigate();
  const [messages, setMessages] = React.useState<Array<Message>>([]);
  const [socket] = React.useState(io(Config.ServerUrl + '/message'));
  const [userInfo] = useLocalStorage(LocalStorageKey.User_Info);
  const [messageApi, contextHolder] = message.useMessage();
  const receiverEventName = `${userInfo.id}fetchNotify`;

  const onOpen = useDebouce((event: React.MouseEvent) => {
    console.info(event);
    event.preventDefault();
    if (messages.length > 0) {
      navigate('/chat/notify', { state: messages });
    } else {
      messageApi.warning({ content: '暂无通知' });
    }
  }, 500);

  React.useEffect(() => {
    (async () => {
      const { statusCode, data, msg } = await getAllPendingMessages();
      if (statusCode === 200) {
        setMessages(data as Message[]);
      } else {
        messageApi.error({ content: `${statusCode} ${msg}` });
      }
    })();
    socket.on(receiverEventName, (messages: Message[]) => {
      setMessages(messages);
    });
    return function () {
      socket.off(receiverEventName);
    };
  }, [socket, receiverEventName, messageApi]);

  React.useEffect(() => {
    const fetchNotifyToken = PubSub.subscribe('fetchNotify',
      (_, receiverId: string) => {
        socket.emit('fetchNotify', receiverId);
      });
    const notifyToken = PubSub.subscribe('setNotify', (_, newMessages: Message[]) => {
      setMessages(newMessages);
    });
    return function () {
      PubSub.unsubscribe(fetchNotifyToken);
      PubSub.unsubscribe(notifyToken);
    };
  }, [messages, socket]);

  return (
    <StyleDiv>
      {contextHolder}
      <Badge count={messages.length} size='small'>
        <NavLink to='/chat/notify' onClick={onOpen}>
          <BellFilled className='bell' />
        </NavLink>
      </Badge>
    </StyleDiv >
  );
}
