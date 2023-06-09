import React from 'react';
import { buildGroup } from '@/api';
import StyleDiv from './style';
import type { Team } from '@/types';
import { defaultCssStyles } from '@/utils';
import type { FormInstance } from 'antd/es/form';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Form, Input, Modal, message } from 'antd';


export default function Index() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const formRef = React.useRef<FormInstance>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [showGroup, setShowGroup] = React.useState(false);

  const openGroup = () => {
    setShowGroup(true);
  };

  const closeGroup = () => {
    setShowGroup(false);
  };

  const onSubmitGroup = () => {
    formRef.current?.submit();
  };

  const onBuildGroup = async (values: Team) => {
    values.avatar = '';
    try {
      const { statusCode, msg } = await buildGroup(values);
      if (statusCode === 200) {
        messageApi.success({ content: '创建成功' });
        formRef.current?.resetFields();
        setShowGroup(false);
      } else {
        messageApi.info({ content: `${statusCode} ${msg}` });
      }
    } catch (err) {
      console.info(err);
    }
  };


  return <StyleDiv>
    {contextHolder}
    <h4>名称(1)</h4>
    <div>
      <Button
        type='link'
        style={{ color: pathname === '/chat/address' ? defaultCssStyles.colorPrimary : defaultCssStyles.colorLink }}
        onClick={() => navigate('/chat/address')}>
        通讯录
      </Button>
      <Button type='link' onClick={openGroup}>新建群组</Button>
    </div>
    <Modal title="新建群组" open={showGroup} onCancel={closeGroup} onOk={onSubmitGroup} >
      <Form
        ref={formRef}
        name="basic"
        labelCol={{ span: 5 }}
        onFinish={onBuildGroup}
        autoComplete="off"
        initialValues={{ description: '' }}
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
