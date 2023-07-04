import React from 'react';
import { StyleDiv } from '@/common';
import { useDebouce } from '@/hooks';
import { Button, Popover, message, Avatar, Tooltip } from 'antd';
import Badges from '@/components/Badges';
import AddUserSvg from '@/assets/logo/addUser.svg';
import CollaborativeEditor from '@/components/CollaborativeEditor';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';

export default function Index() {
  const [messageApi, contextHolder] = message.useMessage();
  const [editor, setEditor] = React.useState(false);//默认是只读模式

  const throttledClick = useDebouce(() => {
    setEditor(editor => !editor);
  }, 300);

  return (
    <StyleDiv asideWidth={'15rem'}>
      {contextHolder}
      <aside >
        <div className='cloud_add'>
          <h4>目录</h4>
        </div>
      </aside>
      <main>
        <div className='header shared_header'>
          <Badges />
          <div className='shared_editor'>
            <Avatar.Group
              maxCount={2}
              size="large"
              style={{ display: editor ? 'block' : 'none' }}
              maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
            >
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3" />
              <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
              <Tooltip title="Ant User" placement="top">
                <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
              </Tooltip>
              <Avatar style={{ backgroundColor: '#1677ff' }} icon={<AntDesignOutlined />} />
            </Avatar.Group>
            <Popover content={<span>协作</span>} placement='bottom' arrow={false}>
              <Button type='text'>
                <img src={AddUserSvg} style={{ width: '1.5rem' }} />
              </Button>
            </Popover>
            <Button type={editor ? 'default' : 'primary'} onClick={throttledClick}>
              {editor ? '更新' : '编辑'}
            </Button>
          </div>
        </div>
        <div className='container' style={{ padding: 0 }}>
          <CollaborativeEditor isEditor={editor} />
        </div>
      </main>
    </StyleDiv >
  );
}
