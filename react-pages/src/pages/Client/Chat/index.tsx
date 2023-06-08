import React from 'react';
import { StyleDiv } from '@/common';
import { useLocation } from 'react-router-dom';
import ChatHeader from './components/ChatHeader';
import ChatAside from '@/pages/Client/Chat/components/ChatAside';
import { MemoDiv } from './style';
import { Button, Tabs } from 'antd';
import type { TabsProps } from 'antd';

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: `我的好友`,
    children: <div>sb</div>,
  },
  {
    key: '2',
    label: `我加入的群组`,
    children: `Content of Tab Pane 2`,
  },
  {
    key: '3',
    label: `添加好友`,
    children: `Content of Tab Pane 3`,
  },
];

export default function Index() {
  const { pathname } = useLocation();
  const [wide, setWide] = React.useState(true);

  const changeWide = () => {
    setWide(wide => !wide);
  };

  return (
    <StyleDiv asideWidth={wide ? '18rem' : '6rem'}>
      <aside >
        <ChatAside wide={wide} changeWide={changeWide} />
      </aside>
      <main>
        <div className='header'>
          <ChatHeader />
        </div>
        <div className='container'>
          {pathname === '/chat' && <div className='welcome'>
            <h2>欢迎使用</h2>
            <small>点击左边用户头像框即可开始聊天</small>
          </div>}
          {pathname === '/chat/address' && <MemoDiv>
            <Tabs
              defaultActiveKey="1"
              items={items}
              onChange={onChange}
            />
          </MemoDiv>}
          
        </div>
      </main>
    </StyleDiv>
  );
}
