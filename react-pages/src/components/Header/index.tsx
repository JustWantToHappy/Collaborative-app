import React from 'react';
import StyleDiv from './style';
import Bell from '@/components/Bell';
import { routes } from '@/routes';
import { ThemeModeContext } from '@/context';
import { useLocalStorage } from '@/hooks';
import { Chat, LocalStorageKey } from '@/enum';
import UserInfoModal from '../UserInfoModal';
import LogoSvg from '@/assets/logo/logo.svg';
import SunSvg from '@/assets/logo/sun.svg';
import MoonSvg from '@/assets/logo/moon.svg';
import type { Router, ChatRecord } from '@/types';
import { Avatar, Button, Popover, Switch } from 'antd';
import { defaultCssStyles, chatRoomSocket } from '@/utils';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

export default function Index() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const context = React.useContext(ThemeModeContext);
  const [show, setShow] = React.useState(false);
  const lists = routes[0].children as Array<Router>;
  const [active, setActive] = React.useState(pathname);
  const [userInfo, , removeUserInfo] = useLocalStorage(LocalStorageKey.User_Info, {});
  const [dark, setDark] = React.useState(context.mode === 'dark');

  const loginOut = () => {
    removeUserInfo();
    navigate('/');
    chatRoomSocket.emit(Chat.Leave, userInfo.id);
  };

  const showUserInfoModal = () => setShow(true);

  const closeUserInfoModal = () => setShow(false);

  const shiftTheme = (value: boolean) => {
    setDark(value);
    context.switchMode?.(value ? 'dark' : 'light');
  };

  React.useEffect(() => {
    if (!chatRoomSocket.connected) {
      chatRoomSocket.connect();
    }

    chatRoomSocket.on('connect', () => {
      chatRoomSocket.emit(Chat.Join, userInfo.id);//用户加入房间
    });

    chatRoomSocket.on(Chat.Message, (body: ChatRecord) => {
      PubSub.publish('fetchChatRecord', body);
    });
    return function () {
      chatRoomSocket.off('connect');
      chatRoomSocket.off(Chat.Message);
      if (chatRoomSocket.connected) chatRoomSocket.disconnect();
    };
  }, [userInfo.id]);

  return (
    <StyleDiv mode={context.mode}>
      <UserInfoModal
        show={show}
        close={closeUserInfoModal}
        loginOut={loginOut} />
      <header>
        <NavLink to='/chat' title='' > <img src={LogoSvg} /></NavLink>
        <ul>
          {lists.map(route => <li key={route.path}>
            <NavLink to={route.path}>
              <Button type='link'
                onClick={() => setActive(route.path)}
                style={{
                  color: active.includes(route.path) ? defaultCssStyles.colorPrimary : '',
                }}>
                {route.name}
              </Button>
            </NavLink>
          </li>)}
        </ul>
        <div>
          <Bell />
          <Popover
            content={<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Button
                type='link'
                onClick={showUserInfoModal}
              >
                修改信息
              </Button>
              <Button
                type='link'
                onClick={loginOut}>
                退出登录
              </Button>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Switch onChange={shiftTheme} size='small' checked={dark} />
                <img src={dark ? MoonSvg : SunSvg} style={{ width: '1.2rem', marginLeft: '.5rem' }} />
              </div>
            </div>} >
            <Avatar
              src={`/api/${userInfo.avatar}`}
              style={{ cursor: 'pointer' }} >
              {userInfo.name}
            </Avatar>
          </Popover>
        </div>
      </header>
    </StyleDiv >
  );
}
