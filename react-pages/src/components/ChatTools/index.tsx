import React from 'react';
import StyleDiv from './style';
import type { Friend } from '@/types';
import { LocalStorageKey } from '@/enum';
import { useLocalStorage } from '@/hooks';
import { io } from 'socket.io-client';
import { Config } from '@/enum';
import { Button, Input, message } from 'antd';

export default function Index() {
  const [messageApi, contextHolder] = message.useMessage();
  const [group, setGroup] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [userInfo] = useLocalStorage(LocalStorageKey.User_Info);
  const [setInvitedInfos] = React.useState<Array<Friend>>([]);

  const inviteFriend = async () => {
    if (userInfo.email === email) {
      setEmail('');
      return;
    }
    const socket = io(Config.ServerUrl + '/friend');
    socket.emit('invite', email);
    messageApi.info({ content: '已发送邀请' });
  };

  const joinGroup = () => {
    //socket.emit()
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
          <Button type='primary' onClick={inviteFriend} style={{ marginLeft: '1vw' }}>申请好友</Button>
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
          <Button type='primary' style={{ marginLeft: '1vw' }} onClick={joinGroup}>申请加入</Button>
        </div>
      </div>
    </StyleDiv>
  );
}