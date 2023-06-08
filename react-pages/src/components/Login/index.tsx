import React from 'react';
import { User } from '@/types';
import StyleDiv from './style';
import { login, register } from '@/api';
import { useLocalStorage } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import { LocalStorageKey, Role } from '@/enum';
import type { FormInstance } from 'antd/es/form';
import { Button, Form, Input, Modal, message } from 'antd';

type IProps = {
  show: boolean;
  handleCancel: () => void;
}

const Index: React.FC<IProps> = (props) => {
  const navigate = useNavigate();
  const formRef = React.useRef<FormInstance>(null);
  const { show, handleCancel } = props;
  const [title, setTitle] = React.useState('登录');
  const [, setToken] = useLocalStorage(LocalStorageKey.User_Info, '');
  const [messageApi, contextHolder] = message.useMessage();

  const userLogin = async (user: User) => {
    try {
      const { statusCode, data, msg } = await login(user);
      if (statusCode === 200) {
        const storeUserInfo = {
          jwt_token: data?.jwt_token,
          email: data?.email,
          name: data?.name
        };
        setToken(storeUserInfo);
        navigate('/chat', { replace: true });
        handleCancel();
      } else {
        messageApi.info({ content: `${statusCode} ${msg}` });
      }
    } catch (err) {
      console.info(err);
    }
  };

  const userRegister = async (user: User) => {
    try {
      const { statusCode, msg } = await register(Object.assign(user, { roles: [Role.User] }));
      if (statusCode === 200) {
        message.success({ content: '注册成功!' });
        handleCancel();
        setTitle('登录');
        formRef.current?.resetFields();
      } else {
        messageApi.info({ content: `${statusCode} ${msg}` });
      }
    } catch (err) {
      console.info(err);
    }
  };

  const onFinish = async (values: User) => {
    title === '登录' ? userLogin(values) : userRegister(values);
  };

  React.useEffect(() => {
    formRef.current?.resetFields();
  }, [title]);

  return <Modal
    title={title}
    open={show}
    footer={null}
    onCancel={handleCancel}
    mask={false}
    style={{ maxWidth: '380px' }}
  >
    {contextHolder}
    <StyleDiv>
      <Form
        ref={formRef}
        name="basic"
        labelCol={{ span: 5 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        {title === '注册' && <Form.Item
          label="用户名称"
          name="name"
          rules={[{ required: true, message: '请输入你的用户名称!' }]}
        >
          <Input />
        </Form.Item>}

        <Form.Item
          label="邮箱地址"
          name="email"
          rules={[{ required: true, message: '请输入你的邮箱地址!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入你的密码!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className='login_btn'>
            {title}
          </Button>
        </Form.Item>
      </Form>
      <div className='selected'>
        {title === '登录' && <p>
          没有账号?前往
          <Button
            onClick={() => setTitle('注册')}
            type='link'
            style={{ padding: '0' }}
          >
            <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>注册</span>
          </Button>
        </p>}
        {title === '注册' && <p>
          已有账号?前往
          <Button
            onClick={() => setTitle('登录')}
            type='link'
            style={{ padding: '0' }}
          >
            <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>登录</span>
          </Button>
        </p>}
      </div>
    </StyleDiv>
  </Modal>;
};
export default Index;