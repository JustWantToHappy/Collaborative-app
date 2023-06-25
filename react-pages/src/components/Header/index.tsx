import React from 'react';
import StyleDiv from './style';
import Bell from '@/components/Bell';
import UserInfoModal from '../UserInfoModal';
import { routes } from '@/layout';
import { Manager } from 'socket.io-client';
import { useLocalStorage } from '@/hooks';
import { NavLink, useNavigate } from 'react-router-dom';
import { defaultCssStyles } from '@/utils';
import LogoSvg from '@/assets/logo/logo.svg';
import type { Router, ChatRecord } from '@/types';
import { Avatar, Button, Popover } from 'antd';
import { Config, Chat, LocalStorageKey } from '@/enum';

export default function Index() {
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  const lists = routes[0].children as Array<Router>;
  const [active, setActive] = React.useState('/chat');
  const [manager] = React.useState(new Manager(Config.ServerUrl));
  const [userInfo, , removeUserInfo] = useLocalStorage(LocalStorageKey.User_Info);

  const loginOut = () => {
    removeUserInfo();
    navigate('/');
  };

  const showUserInfoModal = () => setShow(true);

  const closeUserInfoModal = () => setShow(false);

  React.useEffect(() => {
    manager.socket('/chatroom').on(Chat.Join, (chatRoomId: string, userId: string) => {
      //这里可以进行一些处理，比如在线人数展示，用户离线状态等。
    });
    manager.socket('/chatroom').on(Chat.Message, (body: ChatRecord) => {
      PubSub.publish('fetchChatRecord', body);
    });
    manager.socket('/chatroom').on(Chat.Leave, () => {
      //
    });
    manager.socket('/chatroom').emit(Chat.Join, userInfo.id);
    return function () {
      manager.socket('/chatroom').off(Chat.Join);
      manager.socket('/chatroom').off(Chat.Message);
      manager.socket('/chatroom').off(Chat.Leave);
    };
  }, [manager, userInfo.id]);

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
            </div>} >
            {userInfo?.avatar !== '' ?
              <Avatar
                src={`/api/${userInfo.avatar}`}
                style={{ marginLeft: '2rem', cursor: 'pointer' }} />
              : <Avatar
                style={{ marginLeft: '2rem', cursor: 'pointer' }}>
                {userInfo.name.slice(0, 1)}
              </Avatar>}
          </Popover>
        </div>
      </header>
    </StyleDiv >
  );
}
