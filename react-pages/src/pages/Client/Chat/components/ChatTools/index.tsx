import React from 'react';
import StyleDiv from './style';
import type { InviteInfo } from '@/types';
import { LocalStorageKey, YesNotState } from '@/enum';
import { useLocalStorage } from '@/hooks';
import { Button, Input, message } from 'antd';
import { addFriend, invitedInfo, handleInvite, deleteFriend } from '@/api';

export default function Index() {
  const [messageApi, contextHolder] = message.useMessage();
  const [group, setGroup] = React.useState('');
  const [userInfo] = useLocalStorage(LocalStorageKey.User_Info);
  const [invitedInfos, setInvitedInfos] = React.useState<Array<InviteInfo>>([]);
  const [email, setEmail] = React.useState('');

  const onInviteFriend = async () => {
    if (userInfo.email === email) {
      setEmail('');
      return;
    }
    const { statusCode, msg } = await addFriend(email);
    if (statusCode === 200) {
      messageApi.success({ content: '已发送邀请' });
      setEmail('');
    } else {
      messageApi.info({ content: `${statusCode} ${msg}` });
    }
  };


  const getData = async () => {
    const { statusCode, data, msg } = await invitedInfo();
    if (statusCode === 200) {
      setInvitedInfos(data as InviteInfo[]);
    } else {
      messageApi.info({ content: `${statusCode} ${msg}` });
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  const changeInviteState = async (id: number, state: YesNotState) => {
    const { statusCode, msg } = await handleInvite(id, state);
    if (statusCode === 200) {
      getData();
    } else {
      messageApi.info({ content: `${statusCode} ${msg}` });
    }
  };

  const deleteInvite = async (id: number) => {
    const { statusCode, msg } = await deleteFriend(id);
    if (statusCode === 200) {
      getData();
    } else {
      messageApi.info({ content: `${statusCode} 删除失败 ${msg}` });
    }
  };
  return (
    <StyleDiv >
      {contextHolder}
      <div>
        <h3>申请好友</h3>
        <div className='apply_friend'>
          <Input
            style={{ width: '30vw' }}
            placeholder='请输入用户的邮箱地址'
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
          <Button type='primary' onClick={onInviteFriend} style={{ marginLeft: '1vw' }}>添加好友</Button>
        </div>
      </div>
      <div >
        <h3>申请加群</h3>
        <div className='apply_team'>
          <Input
            placeholder='请输入群名称'
            onChange={e => setGroup(e.target.value)}
            style={{ width: '30vw' }} />
          <Button type='primary' style={{ marginLeft: '1vw' }}>申请加入</Button>
        </div>
      </div>
      <div>
        <h3>新朋友</h3>
        {!invitedInfos.length && <div style={{ textAlign: 'center' }}>
          <h4>暂无申请</h4>
        </div>}
        {invitedInfos.map(invitedInfo =>
          <div className='invite_records' key={invitedInfo.email}>
            <p>{invitedInfo.name}申请你为好友</p>
            <Button type='link' size='small'
              onClick={() => { changeInviteState(invitedInfo.id, YesNotState.Yes); }}
            >
              同意邀请
            </Button>
            <Button
              type='link'
              danger
              size='small'
              onClick={() => deleteInvite(invitedInfo.id)}
            >
              删除记录
            </Button>
          </div>)}
      </div>
      <div>
        <h3>群邀请</h3>
        <div style={{ textAlign: 'center' }}>
          <h4>暂无邀请</h4>
        </div>
      </div>
    </StyleDiv>
  );
}
