import React from 'react';
import PubSub from 'pubsub-js';
import StyleDiv from './style';
import { LocalStorageKey, MessageType } from '@/enum';
import { useLocalStorage } from '@/hooks';
import { Manager } from 'socket.io-client';
import { Config } from '@/enum';
import { applyJoinGroup } from '@/api';
import { Button, Input, message } from 'antd';

export default function Index() {
  const [messageApi, contextHolder] = message.useMessage();
  const [group, setGroup] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [manager] = React.useState(new Manager(Config.ServerUrl));
  const [userInfo] = useLocalStorage(LocalStorageKey.User_Info);

  const inviteFriend = async () => {
    if (userInfo.email === email) {
      setEmail('');
      return;
    }
    //发送好友邀请
    manager.socket('/friend').emit('applyfriend',
      { email, id: userInfo.id },
      (data: { msg: string, receiverId: string }) => {
        messageApi.info({ content: data?.msg });
        PubSub.publish('fetchNotify', data?.receiverId);
        setEmail('');
      });
  };

  const joinGroup = async () => {
    const { statusCode, msg, data: leaderId } = await applyJoinGroup(group);
    if (statusCode === 200) {
      PubSub.publish('fetchNotify', leaderId);
      messageApi.success({ content: '申请成功!' });
      setGroup('');
    } else {
      messageApi.error({ content: `${statusCode} ${msg}` });
    }
  };

  return (
    <StyleDiv >
      {contextHolder}
      <div>
        <h3>我要加好友</h3>
        <div className='apply_friend'>
          <Input
            style={{ width: '30vw' }}
            placeholder='请输入用户的邮箱地址'
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
          <Button
            type='primary'
            onClick={inviteFriend}
            style={{ marginLeft: '1vw' }}>
            申请好友
          </Button>
        </div>
      </div>
      <div >
        <h3>我要加群</h3>
        <div className='apply_team'>
          <Input
            placeholder='请输入群名称'
            onChange={e => setGroup(e.target.value)}
            value={group}
            style={{ width: '30vw' }} />
          <Button
            type='primary'
            style={{ marginLeft: '1vw' }}
            onClick={joinGroup}>
            申请加入
          </Button>
        </div>
      </div>
    </StyleDiv>
  );
}
