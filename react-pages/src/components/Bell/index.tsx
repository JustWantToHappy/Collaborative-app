import React from 'react';
import PubSub from 'pubsub-js';
import { messageSocket } from '@/utils';
import StyleDiv from './style';
import { Badge, message } from 'antd';
import type { Message } from '@/types';
import { useLocalStorage } from '@/hooks';
import { getAllPendingMessages } from '@/api';
import { LocalStorageKey } from '@/enum';
import { BellFilled } from '@ant-design/icons';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Index() {
  const navigate = useNavigate();
  const [messages, setMessages] = React.useState<Array<Message>>([]);
  const [userInfo] = useLocalStorage(LocalStorageKey.User_Info, {});
  const [messageApi, contextHolder] = message.useMessage();
  const receiverEventName = `${userInfo.id}fetchNotify`;

  const onOpen = (event: React.MouseEvent) => {
    event.preventDefault();
    if (messages.length > 0) {
      navigate('/chat/notify', { state: messages });
    } else {
      messageApi.warning({ content: '暂无通知' });
    }
  };

  React.useEffect(() => {
    (async () => {
      const { statusCode, data, msg } = await getAllPendingMessages();
      if (statusCode === 200) {
        setMessages(data as Message[]);
      } else {
        messageApi.error({ content: `${statusCode} ${msg}` });
      }
    })();
    if (!messageSocket.connected) {
      messageSocket.connect();
    }
    messageSocket.on(receiverEventName, (messages: Message[]) => {
      setMessages(messages);
      PubSub.publish('getNotify', messages);
    });
    return function () {
      messageSocket.off(receiverEventName);
      if (messageSocket.connected) messageSocket.disconnect();
    };
  }, [receiverEventName, messageApi, navigate]);

  React.useEffect(() => {
    const fetchNotifyToken = PubSub.subscribe('fetchNotify',
      (_, receiverId: string) => {
        messageSocket.emit('fetchNotify', receiverId);
      });
    const notifyToken = PubSub.subscribe('setNotify', (_, newMessages: Message[]) => {
      setMessages(newMessages);
    });
    return function () {
      PubSub.unsubscribe(fetchNotifyToken);
      PubSub.unsubscribe(notifyToken);
    };
  }, [messages]);

  return (
    <StyleDiv>
      {contextHolder}
      <Badge count={messages.length} size='small'>
        <NavLink to='/chat/notify' onClick={onOpen} >
          <BellFilled className='bell' />
        </NavLink>
      </Badge>
    </StyleDiv>
  );
}