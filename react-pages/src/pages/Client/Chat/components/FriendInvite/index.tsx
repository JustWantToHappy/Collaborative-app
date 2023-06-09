import React from 'react';
import { useDebouce } from '@/hooks';
import styled from 'styled-components';
import { Button, Form, Input } from 'antd';
import type { FormInstance } from 'antd/es/form';

const StyleDiv = styled('div')`
  text-align: center;

  .invite_form{
    display: flex;
  }

  .invite_records{

  }
`;
export default function Index() {
  const formRef = React.useRef<FormInstance>(null);

  const onSubmit = useDebouce(async () => {
    //
  }, 1000);

  return (
    <StyleDiv >
      <div className='invite_form'>
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
            />
          </Form.Item>
        </Form>
        <Button type='primary' onClick={onSubmit} >添加好友</Button>
      </div>
      {/* 邀请记录，待做。。。 */}
      <div className='invite_records'>

      </div>
    </StyleDiv>
  );
}
