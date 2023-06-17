import React from 'react';
import { StyleDiv } from '@/common';
import { useLocation } from 'react-router-dom';
import MyJoin from '@/components/MyJoin';
import ChatHeader from '@/components/ChatHeader';
import ChatAside from '@/components/ChatAside';
import ChatTools from '@/components/ChatTools';
import ChatContainer from '@/components/ChatContainer';

import { MemoDiv } from './style';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';


export default function Index() {
  const { pathname } = useLocation();
  const [wide, setWide] = React.useState(true);
  const [key, setKey] = React.useState('1');

  const changeWide = () => {
    setWide(wide => !wide);
  };

  const onChange = (key: string) => {
    setKey(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `我加入的`,
      children: <MyJoin option={key} />,
    },
    {
      key: '2',
      label: `添加联系人`,
      children: <ChatTools />,
    },
  ];
  const asideWidth = React.useMemo(() => {
    return wide ? '18rem' : '6rem';
  }, [wide]);
  return (
    <StyleDiv asideWidth={asideWidth}>
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
              defaultActiveKey={key}
              items={items}
              onChange={onChange}
              size='large'
            />
          </MemoDiv>}
          {/\/chat\/\d+/.test(pathname) && <ChatContainer asideWidth={asideWidth} />}
        </div>
      </main>
    </StyleDiv>
  );
}
