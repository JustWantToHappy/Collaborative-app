import React from 'react';
import StyleDiv from './style';
import { messageSocket } from '@/utils';
import type { Message } from '@/types';
import { Avatar, Button, message } from 'antd';
import { MessageType, State } from '@/enum';
import { getAllPendingMessages, updateMessage } from '@/api';
import { useLocation } from 'react-router-dom';

export default function Index() {
  const { state } = useLocation();
  const [messageApi, contextHolder] = message.useMessage();
  const [messages, setMessages] = React.useState<Array<Message>>(state);

  const strategy = new Map([
    [MessageType.ApplyFriend, '申请你为好友'],
    [MessageType.ApplyGroup, '申请加入群组']
  ]);

  const changeMessageState = async (id: string, state: State) => {
    const { statusCode, msg, data } = await updateMessage(id, { state });
    if (statusCode === 200) {
      setMessages(data as Message[]);
      PubSub.publish('setNotify', data);
      messageSocket.emit('fetchChatRoom', id);
    } else {
      messageApi.error({ content: `${statusCode} ${msg}` });
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
  }, [messageApi]);

  React.useEffect(() => {
    const getNotifyToken = PubSub.subscribe('getNotify', (_, data: Message[]) => {
      setMessages(data);
    });
    if (!messageSocket.connected) {
      messageSocket.connect();
    }
    return function () {
      PubSub.unsubscribe(getNotifyToken);
      if (messageSocket.connected) messageSocket.disconnect();
    };
  }, []);

  return (
    <StyleDiv >
      {contextHolder}
      <h4>最近通知</h4>
      <ul>
        {messages?.map(message => <li key={message.id} className='notify_item'>
          <div className='notify_item_avatar'>
            <Avatar size='large' src={message.avatar} />
          </div>
          <div>
            <h4>{message.name}</h4>
            <span >
              <small> {strategy.get(message?.type)}</small>
              <small> {message.groupName}</small>
            </span>
          </div>
          <div >
            <Button
              type='link'
              onClick={() => changeMessageState(message?.id, State.Agree)}>
              同意
            </Button>
            <Button
              type='link'
              onClick={() => changeMessageState(message?.id, State.Reject)}
              danger>
              删除
            </Button>
          </div>
        </li>)}
      </ul>
    </StyleDiv>
  );
}