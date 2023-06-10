import React from 'react';
import StyleDiv from './style';
import type { InviteInfo } from '@/types';
import type { FormInstance } from 'antd/es/form';
import { LocalStorageKey, YesNotState } from '@/enum';
import { useDebouce, useLocalStorage } from '@/hooks';
import { Button, Form, Input, message } from 'antd';
import { addFriend, invitedInfo, handleInvite, deleteFriend } from '@/api';

export default function Index() {
  const formRef = React.useRef<FormInstance>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [userInfo] = useLocalStorage(LocalStorageKey.User_Info);
  const [invitedInfos, setInvitedInfos] = React.useState<Array<InviteInfo>>([]);

  const onSubmit = useDebouce(async () => {
    const userEmail = formRef.current?.getFieldValue('email');
    if (userInfo.email === userEmail) {
      formRef.current?.resetFields();
      return;
    }
    const { statusCode, msg } = await addFriend(userEmail);
    if (statusCode === 200) {
      messageApi.success({ content: '已发送邀请' });
      formRef.current?.resetFields();
    } else {
      messageApi.info({ content: `${statusCode} ${msg}` });
    }
  }, 500);


  const getData = async () => {
    const { statusCode, data, msg } = await invitedInfo();
    console.info(data);
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
        <div className='invite_form'>
          <Form
            ref={formRef}
            name="basic"
            onFinish={onSubmit}
            autoComplete="off"
            layout='inline'
          >
            <Form.Item
              label='用户邮箱地址'
              name='email'
            >
              <Input
                style={{ width: '30vw' }}
                placeholder='请输入用户的邮箱地址'
              />
            </Form.Item>
          </Form>
          <Button type='primary' onClick={onSubmit} >添加好友</Button>
        </div>
      </div>
     {/* <div>
        <h3>我的申请</h3>

      </div>*/}
      <div>
        <h3>新朋友</h3>
        {!invitedInfo.length && <div style={{ textAlign: 'center' }}>
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
    </StyleDiv>
  );
}
