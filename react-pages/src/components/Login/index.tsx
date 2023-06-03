import React from 'react';
import StyleDiv from './style';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, message, Modal } from 'antd';

type IProps = {
  show: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

const Index: React.FC<IProps> = (props) => {
  const { show, handleCancel, handleOk } = props;
  const [title, setTitle] = React.useState('登录');
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    //console.log('Success:', values);
    const login = true;
    if (!login) {
      message.error({ content: '你还未注册账号，请先注册' });
      setTitle('注册');
    } else {
      navigate('/home', { replace: true });
    }
  };


  return <Modal
    title={title}
    open={show}
    footer={null}
    onCancel={handleCancel}
    mask={false}
    style={{ maxWidth: '380px' }}
  >
    <StyleDiv>
      <Form
        name="basic"
        labelCol={{ span: 5 }}
        style={{ width: '100%' }}
        initialValues={{ remember: true }}
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
    </StyleDiv>
  </Modal>;
};
export default Index;