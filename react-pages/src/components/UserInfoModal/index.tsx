import React from 'react';
import { updateInfo } from '@/api';
import UploadImg from '../UploadImg';
import { LocalStorageKey } from '@/enum';
import { useLocalStorage } from '@/hooks';
import { Form, Input, Modal, message } from 'antd';
import type { FormInstance } from 'antd/es/form';
import type { UploadFile, RcFile } from 'antd/es/upload/interface';


interface Props {
  loginOut: () => void;
  close: () => void;
  show: boolean;
}

export default function Index(props: Props) {
  const formRef = React.useRef<FormInstance>(null);
  const [file, setFile] = React.useState<UploadFile>();
  const [messageApi, contextHolder] = message.useMessage();
  const [userInfo] = useLocalStorage(LocalStorageKey.User_Info, '');


  const modifyUserInfo = async (formData: FormData) => {
    const { statusCode, msg } = await updateInfo(formData);
    if (statusCode === 200) {
      formRef.current?.resetFields();
      messageApi.success('修改个人信息成功');
      props.close();
      props.loginOut();
    } else {
      messageApi.info(`${statusCode} ${msg}`);
    }
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
    <Modal title='修改个人信息' open={props.show} onCancel={props.close} onOk={handleOk} >
      {contextHolder}
      <Form
        ref={formRef}
        name="basic"
        labelCol={{ span: 5 }}
        autoComplete="off"
        initialValues={{ name: userInfo.name, file: '' }}
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
  );
}
