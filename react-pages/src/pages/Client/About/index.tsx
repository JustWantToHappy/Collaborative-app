import React from 'react';
import { isLogin } from '@/utils';
import { Config } from '@/enum';
import StyleDiv from './style';
import Login from '@/components/Login';
import Header from '@/components/Header';
import { Button, Popover } from 'antd';
import { io } from 'socket.io-client';
import LogoSvg from '@/assets/logo/logo.svg';
import type { Socket } from 'socket.io-client';
import GitHubSvg from '@/assets/logo/github.svg';
import { Chat } from '@/enum';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';

const content = (
  <div>
    <p>1302755003@qq.com</p>
  </div>
);
export default function Index() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [socket, setSocket] = React.useState<Socket>();
  const [showLogin, setShowLogin] = React.useState(false);

  const handleLoginCancel = () => {
    setShowLogin(false);
  };


  React.useLayoutEffect(() => {
    if (!isLogin()) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  React.useEffect(() => {
    const socket = io(Config.WsUrl + '/chat/private');
    setSocket(socket);
    socket.on('disconnect', () => {
      console.log(socket.id);
    });
    return function () {
      socket.disconnect();
    };
  }, []);

  if (pathname === '/') {
    return <StyleDiv>
      <header>
        <Link to='/' title=""> <img src={LogoSvg} /></Link>
        <Button onClick={() => {
          socket && socket.emit(Chat.Group_Join, 'group 1');
        }}>加入房间</Button>
        <Button onClick={() => {
          socket && socket.emit(Chat.Group_Message, '我是大傻逼');
        }}>发送消息</Button>
        <Button onClick={() => {
          socket && socket.emit(Chat.Group_Leave, 'group 1');
        }}>离开房间</Button>
        <Button type="primary" onClick={() => setShowLogin(true)}>登录 / 注册</Button>
      </header>
      <main>
        <h1>在线文档协同平台</h1>
        <h4>多人实时聊天、团队协同编辑文档、实时消息推送</h4>
        <div >
          <Popover content={content} title='邮箱地址' placement='bottom'>
            <Button style={{ marginRight: '1.5rem' }}>联系我们</Button>
          </Popover>
          <Button type="primary" onClick={() => setShowLogin(true)}>开始使用</Button>
        </div>
      </main>
      <Login
        show={showLogin}
        handleCancel={handleLoginCancel}
      />
      <footer>
        <Link to='https://github.com/JustWantToHappy/Collaborative-app' title='项目地址' target='_blank'><img src={GitHubSvg} alt='项目地址' /></Link>
      </footer>
    </StyleDiv>;
  } else {
    return <>
      <Header />
      <Outlet />
    </>;
  }
}
