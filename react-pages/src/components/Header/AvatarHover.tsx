import React from 'react';
import { updateInfo } from '@/api';
import styled from 'styled-components';
import { LocalStorageKey } from '@/enum';
import { useLocalStorage } from '@/hooks';
import UploadImg from '@/components/UploadImg';
import { Button, Form, Input, Modal, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { FormInstance } from 'antd/es/form';
import type { UploadFile, RcFile } from 'antd/es/upload/interface';

const StyleDiv = styled('div')`
  display: flex;
  flex-direction:column;
`;

interface Props {
  setImgSrc: (src: string) => void;
}

export default function AvatarHover(props: Props) {
  const navigate = useNavigate();
  const formRef = React.useRef<FormInstance>(null);
  const [show, setShow] = React.useState(false);
  const [file, setFile] = React.useState<UploadFile>();
  const [messageApi, contextHolder] = message.useMessage();
  const [, , removeUserInfo] = useLocalStorage(LocalStorageKey.User_Info, '');

  const handleOpen = () => setShow(true);

  const handleCancle = () => setShow(false);

  const modifyUserInfo = async (formData: FormData) => {
    const { statusCode, msg, data } = await updateInfo(formData);
    if (statusCode === 200) {
      props.setImgSrc(data?.avatar as string);
      setShow(false);
      formRef.current?.resetFields();
      messageApi.success('修改个人信息成功');
      loginOut();
    } else {
      messageApi.info(`${statusCode} ${msg}`);
    }
  };

  const loginOut = () => {
    removeUserInfo();
    navigate('/');
  };

  const handleOk = () => {
    const pwd1 = formRef.current?.getFieldValue('password');
    const pwd2 = formRef.current?.getFieldValue('passwordAgain');
    if (pwd1 !== pwd2) {
      messageApi.info('两次密码不一致');
      formRef.current?.resetFields();
      return;
    }
    const values = formRef.current?.getFieldsValue();
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('password', values.password);
    formData.append('file', file as RcFile);
    modifyUserInfo(formData);
  };

  const setImgFile = (file: UploadFile) => setFile(file);

  return (
    <StyleDiv>
      {contextHolder}
      <Button
        type="link"
        onClick={handleOpen}
      >
        个人信息
      </Button>
      <Button
        type="link"
        onClick={loginOut}>
        退出登录
      </Button>
      <Modal title='修改个人信息' open={show} onCancel={handleCancle} onOk={handleOk} >
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
            <Input placeholder='请输入你的昵称' />
          </Form.Item>
          <Form.Item
            label="新密码"
            name="password"
            rules={[{ required: true, message: '请输入你的新密码!' }]}
          >
            <Input.Password placeholder='请输入你的密码' visibilityToggle={false} />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="passwordAgain"
            rules={[{ required: true, message: '请输入你的新密码!' }]}
          >
            <Input.Password placeholder='请再次输入密码' visibilityToggle={false} />
          </Form.Item>
          <Form.Item label='头像'>
            <UploadImg
              title='上传头像'
              manualUpload={true}
              setFile={setImgFile}
              showUploadList={true}
              showFileList={true}
              action='' />
          </Form.Item>
        </Form>
      </Modal>
    </StyleDiv>
  );
}
