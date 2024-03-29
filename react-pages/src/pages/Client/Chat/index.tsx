import React from 'react';
import { useTitle } from '@/hooks';
import { StyleDiv } from '@/common';
import { ThemeModeContext } from '@/context';
import { useLocation, Outlet } from 'react-router-dom';
import MyJoin from '@/components/MyJoin';
import ChatHeader from '@/components/ChatHeader';
import ChatAside from '@/components/ChatAside';
import ChatTools from '@/components/ChatTools';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';


export default function Index() {
  useTitle('聊天');
  const { pathname } = useLocation();
  const [wide, setWide] = React.useState(true);
  const [key, setKey] = React.useState('1');
  const context = React.useContext(ThemeModeContext);

  const changeWide = () => {
    setWide(wide => !wide);
  };

  const onChange = (key: string) => {
    setKey(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `我的联系人`,
      children: <MyJoin option={key} />,
    },
    {
      key: '2',
      label: `添加联系人`,
      children: <ChatTools />,
    },
  ];
  const asideWidth = React.useMemo(() => {
    const asideWidth = wide ? '18rem' : '6rem';
    PubSub.publish('asideWidth', asideWidth);
    return asideWidth;
  }, [wide]);

  return (
    <StyleDiv asideWidth={asideWidth} showHeaderBorder mode={context.mode}>
      <aside >
        <ChatAside wide={wide} changeWide={changeWide} asideWidth={asideWidth} />
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
          {pathname === '/chat/address' && <Tabs
            style={{ width: '100%' }}
            defaultActiveKey={key}
            items={items}
            onChange={onChange}
          />}
          <Outlet />
        </div>
      </main>
    </StyleDiv>
  );
}
