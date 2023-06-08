import React from 'react';
import { StyleDiv } from '@/common';
import { useLocation } from 'react-router-dom';
import ChatHeader from './components/ChatHeader';
import ChatAside from '@/pages/Client/Chat/components/ChatAside';

export default function Index() {
  const { pathname } = useLocation();
  const [wide, setWide] = React.useState(true);

  const changeWide = () => {
    setWide(wide => !wide);
  };

  return (
    <StyleDiv asideWidth={wide ? '16rem' : '6rem'}>
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
        </div>
      </main>
    </StyleDiv>
  );
}
