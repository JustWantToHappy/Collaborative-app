import React from 'react';
import StyleDiv from './style';
import { Message } from '@/types';
import { io } from 'socket.io-client';
import { useLocalStorage } from '@/hooks';
import { getAllPendingMessages } from '@/api';
import { Config, LocalStorageKey } from '@/enum';
import { BellFilled } from '@ant-design/icons';
import PubSub from 'pubsub-js';
import { Avatar, Badge, Modal, Button, message } from 'antd';

export default function Index() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Array<Message>>([]);
  const [socket] = React.useState(io(Config.ServerUrl + '/message'));
  const [userInfo] = useLocalStorage(LocalStorageKey.User_Info);
  const [messageApi, contextHolder] = message.useMessage();
  const receiverEventName = `${userInfo.id}fetchMessage`;

  const onCancel = () => setOpen(false);

  const onOpen = () => {
    if (messages.length > 0) {
      setOpen(true);
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
    const token = PubSub.subscribe('fetchMessage', (_, receiverId: string) => {
      socket.emit('fetchMessage', receiverId);
    });
    socket.on(receiverEventName, (messages: Message[]) => {
      setMessages(messages);
    });
    return function () {
      socket.off(receiverEventName);
      PubSub.unsubscribe(token);
    };
  }, [socket, receiverEventName, messageApi]);

  return (
    <StyleDiv>
      {contextHolder}
      <Badge count={messages.length} size='small'>
        <BellFilled className='bell' onClick={onOpen} />
      </Badge>
      <Modal
        title='我的通知'
        open={open}
        style={{ maxWidth: '400px' }}
        onCancel={onCancel}
        footer={null}>
        <ul>
          <li style={{ marginBottom: '1rem' }}>
            <div>
              <section style={{ display: 'inline-block' }}>
                <Avatar size='large' />
                <span style={{ marginLeft: '5px' }}>申请为好友</span>
              </section>
              <section style={{ display: 'inline-block', float: 'right' }}>
                <Button type='link' >同意</Button>
                <Button type='link' danger>拒绝</Button>
              </section>
            </div>
          </li>
        </ul>
      </Modal>
    </StyleDiv >
  );
}
