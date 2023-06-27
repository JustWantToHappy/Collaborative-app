import React from 'react';
import StyleDiv from './style';
import { chatRoomSocket } from '@/utils';
import Bell from '@/components/Bell';
import UserInfoModal from '../UserInfoModal';
import { routes } from '@/layout';
import { useLocalStorage } from '@/hooks';
import { defaultCssStyles } from '@/utils';
import LogoSvg from '@/assets/logo/logo.svg';
import SunSvg from '@/assets/logo/sun.svg';
import MoonSvg from '@/assets/logo/moon.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import type { Router, ChatRecord } from '@/types';
import { Avatar, Button, Popover, Switch } from 'antd';
import { Chat, LocalStorageKey } from '@/enum';

export default function Index() {
  const navigate = useNavigate();
  const [dark, setDark] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const lists = routes[0].children as Array<Router>;
  const [active, setActive] = React.useState('/chat');
  const avatarStyle: React.CSSProperties = { marginLeft: '2rem', cursor: 'pointer' };
  const [userInfo, , removeUserInfo] = useLocalStorage(LocalStorageKey.User_Info, {});

  const loginOut = () => {
    removeUserInfo();
    navigate('/');
  };

  const showUserInfoModal = () => setShow(true);

  const closeUserInfoModal = () => setShow(false);

  const shiftTheme = (value: boolean) => setDark(value);

  React.useEffect(() => {
    if (!chatRoomSocket.connected) {
      chatRoomSocket.connect();
    }
    chatRoomSocket.on(Chat.Join, (chatRoomId: string, userId: string) => {
      //这里可以进行一些处理，比如在线人数展示，用户离线状态等。
    });
    chatRoomSocket.on(Chat.Message, (body: ChatRecord) => {
      PubSub.publish('fetchChatRecord', body);
    });
    chatRoomSocket.on(Chat.Leave, () => {
      //
    });
    chatRoomSocket.on('connect', () => {
      if (chatRoomSocket.connected) {
        chatRoomSocket.emit(Chat.Join, userInfo.id);//用户加入房间
      } else {
        chatRoomSocket.connect();
      }
    });
    return function () {
      chatRoomSocket.off(Chat.Join);
      chatRoomSocket.off(Chat.Message);
      chatRoomSocket.off(Chat.Leave);
      chatRoomSocket.off('connect');
      if (chatRoomSocket.connected) chatRoomSocket.disconnect();
    };
  }, [userInfo.id]);

  return (
    <StyleDiv>
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
                style={{ color: route.path.includes(active) ? defaultCssStyles.colorPrimary : '' }}>
                {route.name}
              </Button>
            </NavLink>
          </li>)}
        </ul>
        <div>
          <Bell />
          <Popover
            content={<div style={{ display: 'flex', flexDirection: 'column' }}>
              <Button
                type='link'
                onClick={showUserInfoModal}
              >
                个人信息
              </Button>
              <Button
                type='link'
                onClick={loginOut}>
                退出登录
              </Button>
              <Button type='link' style={{ display: 'flex', alignItems: 'center' }}>
                <Switch defaultChecked onChange={shiftTheme} size='small' />
                <img src={dark ? MoonSvg : SunSvg} style={{ width: '1.2rem', marginLeft: '.5rem' }} />
              </Button>
            </div>} >
            {userInfo.avatar ?
              <Avatar src={userInfo.avatar} style={avatarStyle} size='large' /> :
              <Avatar style={avatarStyle} size='large'>{userInfo.name.slice(0, 2)}</Avatar>
            }
          </Popover>
        </div>
      </header>
    </StyleDiv >
  );
}
