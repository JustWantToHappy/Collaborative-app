import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import StyleDiv from './style';
import ChatAside from '@/components/ChatAside';

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
        <div className='chat_header'>
          dsf
        </div>
        <div className='chat_container'>
          {pathname === '/chat' && <div style={{ marginTop: '100vh' }}>tst</div>}
          <Outlet />
        </div>
      </main>
    </StyleDiv>
  );
}
