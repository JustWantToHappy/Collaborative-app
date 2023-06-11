import React from 'react';
import StyleDiv from './style';
import UploadImg from '@/components/UploadImg';
import { Avatar, Button, Drawer, Input } from 'antd';

interface IProps {
  asideWidth: string;
}

export default function Index(props: IProps) {
  const { asideWidth } = props;
  const [open, setOpen] = React.useState(false);

  const showDrawer = () => setOpen(true);

  const onClose = () => setOpen(false);

  return (
    <StyleDiv asideWidth={asideWidth}>
      <div className='chat_record_header'>
        <h4>sb群</h4>
        <small>成员列表</small>
      </div>
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
        <UploadImg title='发送图片' action='/api/conversation/uploadImg' />
      </div>
    </StyleDiv>
  );
}
