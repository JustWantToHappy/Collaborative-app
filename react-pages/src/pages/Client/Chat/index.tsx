import React from 'react';
import { useLocation } from 'react-router-dom';
import StyleDiv from './style';
import ChatHeader from './components/ChatHeader';
import ChatAside from '@/pages/Client/Chat/components/ChatAside';

export default function Index() {
  const { pathname } = useLocation();
  const [wide, setWide] = React.useState(true);

  const changeWide = () => {
    setWide(wide => !wide);
  };

  return (
    <StyleDiv wide={wide}>
      <aside >
        <ChatAside wide={wide} changeWide={changeWide} />
      </aside>
      <main>
       <ChatHeader wide={wide} />
        <div className='chat_container'>
          {pathname === '/chat' && <div className='chat_welcome'>
            <h2>欢迎使用</h2>
            <small>点击左边用户头像框即可开始聊天</small>
          </div>}
        </div>
      </main>
    </StyleDiv>
  );
}
