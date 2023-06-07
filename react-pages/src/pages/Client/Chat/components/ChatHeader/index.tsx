import React from 'react';
import StyleDiv from './style';
import { Button, Form, Input, Modal } from 'antd';
import type { FormInstance } from 'antd/es/form';

interface Props {
  wide: boolean;
}

export default function Index(props: Props) {
  const formRef = React.useRef<FormInstance>(null);
  const [showGroup, setShowGroup] = React.useState(false);
  const [showFriend, setShowFriend] = React.useState(false);

  const openGroup = () => {
    setShowGroup(true);
  };

  const closeGroup = () => {
    setShowGroup(false);
  };

  const onSubmitGroup = () => {
    formRef.current?.submit();
  };
  const openFriend = () => {
    setShowFriend(true);
  };

  const closeFriend = () => {
    setShowFriend(false);
  };

  const onBuildGroup = () => { };

  const onInviteFriend = () => { };


  return <StyleDiv wide={props.wide}>
    <h4>名称(1)</h4>
    <div>
      <Button type='link' onClick={openGroup}>新建群组</Button>
      <Button type='link' onClick={openFriend}>邀请好友</Button>
    </div>
    <Modal title="新建群组" open={showGroup} onCancel={closeGroup} onOk={onSubmitGroup} >
      <Form
        ref={formRef}
        name="basic"
        labelCol={{ span: 5 }}
        onFinish={onBuildGroup}
        autoComplete="off"
      >

        <Form.Item
          label="名称"
          name="name"
          rules={[{ required: true, message: '请输入群名称!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="简介"
          name="description"
          rules={[{ required: true, message: '群简介不能为空!' }]}
        >
          <Input.TextArea rows={5} />
        </Form.Item>
      </Form>
    </Modal>
    <Modal title="邀请好友加入">
      <Input />
    </Modal>
  </StyleDiv>;
}
