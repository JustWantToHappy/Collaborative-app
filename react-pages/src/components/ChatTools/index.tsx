import React from 'react';
import PubSub from 'pubsub-js';
import StyleDiv from './style';
import { friendSocket } from '@/utils';
import { LocalStorageKey } from '@/enum';
import { useLocalStorage } from '@/hooks';
import { applyJoinGroup } from '@/api';
import { Button, Input, message } from 'antd';

export default function Index() {
  const [messageApi, contextHolder] = message.useMessage();
  const [group, setGroup] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [userInfo] = useLocalStorage(LocalStorageKey.User_Info, {});

  const inviteFriend = async () => {
    if (userInfo.email === email) {
      setEmail('');
      return;
    }
    //发送好友邀请
    friendSocket.emit('applyfriend',
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

  React.useEffect(() => {
    if (!friendSocket.connected) {
      friendSocket.connect();
    }
    return function () {
      if (friendSocket.connected) friendSocket.disconnect();
    };
  }, []);

  return (
    <StyleDiv >
      {contextHolder}
      <div className='apply_friend'>
        <span>申请好友</span>
        <Input
          placeholder='请输入用户的邮箱地址'
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
        <Button
          type='primary'
          onClick={inviteFriend}>
          申请好友
        </Button>
      </div>
      <div className='apply_team'>
      <span>申请加群</span>
        <Input
          placeholder='请输入群组名称'
          onChange={e => setGroup(e.target.value)}
          value={group} />
        <Button
          type='primary'
          onClick={joinGroup}>
          申请加入
        </Button>
      </div>
    </StyleDiv>
  );
}
