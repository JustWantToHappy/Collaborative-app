import React from 'react';
import StyleDiv from './style';
import { LocalStorageKey } from '@/enum';
import { routes } from '@/layout';
import type { Router } from '@/types';
import AvatarHover from './AvatarHover';
import { useLocalStorage } from '@/hooks';
import { NavLink } from 'react-router-dom';
import { defaultCssStyles } from '@/utils';
import LogoSvg from '@/assets/logo/logo.svg';
import { Avatar, Badge, Button, Popover } from 'antd';
import { BellFilled, UserOutlined } from '@ant-design/icons';

export default function Index() {
  const [src, setSrc] = React.useState('');
  const [active, setActive] = React.useState('/chat');
  const lists = routes[0].children as Array<Router>;
  const [userInfo] = useLocalStorage(LocalStorageKey.User_Info);

  return (
    <StyleDiv>
      <header>
        <NavLink to='/chat' title="" > <img src={LogoSvg} /></NavLink>
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
          <Badge count={5} size='small'>
            <BellFilled />
          </Badge>
          <Popover
            placement="bottom"
            content={<AvatarHover setImgSrc={(src: string) => setSrc(src)}
            />} >
            <Avatar
              icon={<UserOutlined />}
              style={{ marginLeft: '2rem', cursor: 'pointer' }}
              src={'/api' + (src === '' ? userInfo.avatar : src)}>
            </Avatar>
          </Popover>
        </div>
      </header>
    </StyleDiv >
  );
}
