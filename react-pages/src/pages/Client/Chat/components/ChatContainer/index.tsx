import React from 'react';
import StyleDiv from './style';
import { Avatar, Button, Input } from 'antd';

interface IProps {
  asideWidth: string;
}

export default function Index(props: IProps) {
  const { asideWidth } = props;

  return (
    <StyleDiv asideWidth={asideWidth}>
      <div className='chat_record'>
        {
          new Array(10).fill(1).map((_, index) =>
            <ul key={index} className='chat_record_userInfo'>
              <li>
                <Avatar size='large' />
                <div className='chat_record_content'>
                  <p
                    style={{ backgroundColor: index === 1 ? '#C7F0DF' : '' }}
                    className='chat_record_contentItem'
                  >
                    我们开始白那样dfdssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssdsffs
                  </p>
                </div>
              </li>
            </ul>
          )}
      </div>
      <div className='chat_record_tool'>
        <div style={{ flex: '1' }}><Input /></div>
        <Button type='primary' >发送</Button>
        <Button type='primary'>发送图片</Button>
      </div>
    </StyleDiv>
  );
}
