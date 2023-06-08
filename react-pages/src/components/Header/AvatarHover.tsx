import React from 'react';
import styled from 'styled-components';
import { LocalStorageKey } from '@/enum';
import { useLocalStorage } from '@/hooks';
import { Button, Form, Input, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { FormInstance } from 'antd/es/form';


const StyleDiv = styled('div')`
  display: flex;
  flex-direction:column;
`;

export default function AvatarHover() {
  const navigate = useNavigate();
  const formRef = React.useRef<FormInstance>(null);
  const [show, setShow] = React.useState(false);
  const [, , removeToken] = useLocalStorage(LocalStorageKey.User_Info, '');

  const handleOpen = () => {
    setShow(true);
  };

  const handleCancle = () => {
    setShow(false);
  };

  const handleOk = () => {
    setShow(true);
  };

  return (
    <StyleDiv>
      <Button
        type="link"
        onClick={handleOpen}
      >
        个人信息
      </Button>
      <Button
        type="link"
        onClick={() => {
          removeToken();
          navigate('/');
        }}
      >
        退出登录
      </Button>
      <Modal title='修改个人信息' open={show} onCancel={handleCancle} onOk={handleOk}>
        <Form
          ref={formRef}
          name="basic"
          labelCol={{ span: 5 }}
          autoComplete="off"
        >
          <Form.Item
            label="个人昵称"
            name="name"
            rules={[{ required: true, message: '请输入你的昵称!' }]}
          >
            <Input placeholder='请输入你的昵称'/>
          </Form.Item>
        </Form>
      </Modal>
    </StyleDiv>
  );
}
