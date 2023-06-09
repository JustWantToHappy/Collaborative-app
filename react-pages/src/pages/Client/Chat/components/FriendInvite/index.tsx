import React from 'react';
import styled from 'styled-components';
import { useDebouce } from '@/hooks';
import { Button, Form, Input } from 'antd';
import type { FormInstance } from 'antd/es/form';

const StyleDiv = styled('div') <{ showTips: boolean }>`
  text-align: center;
  p{
    display: ${props => props.showTips ? 'block' : 'none'};
    margin-top:2rem;
  }
`;
export default function Index() {
  const formRef = React.useRef<FormInstance>(null);
  const [showTips, setShowTips] = React.useState(false);

  const onSubmit = () => {

  };

  const throttledCallback = useDebouce((event) => console.info(event), 2000);
  return (
    <StyleDiv showTips={showTips}>
      <Form
        ref={formRef}
        name="basic"
        onFinish={onSubmit}
        autoComplete="off"
        layout='inline'
      >
        <Form.Item label='用户邮箱地址' name='email'>
          <Input
            style={{ width: '30vw' }}
            placeholder='请输入用户的邮箱地址'
            onFocus={() => setShowTips(true)}
          />
        </Form.Item>
        <Form.Item >
          <Button type='primary' htmlType='submit'>添加好友</Button>
        </Form.Item>
      </Form>
      <p>暂无此用户信息</p>
      <Button onClick={throttledCallback}>点击测试</Button>
    </StyleDiv>
  );
}
