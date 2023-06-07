import React from 'react';
import AvatarHover from './AvatarHover';
import StyleDiv from './style';
import { NavLink } from 'react-router-dom';
import { Avatar, Badge, Button, Popover } from 'antd';
import LogoSvg from '@/assets/logo/logo.svg';
import { BellFilled, UserOutlined } from '@ant-design/icons';
import { defaultCssStyles } from '@/utils';
import { routes } from '@/layout';
import type { Router } from '@/types';

export default function Index() {
  const [active, setActive] = React.useState('/chat');
  const lists = routes[0].children as Array<Router>;

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
          <Popover placement="bottom" content={AvatarHover} >
            <Avatar size="small" icon={<UserOutlined />} style={{ marginLeft: '2rem', cursor: 'pointer' }} />
          </Popover>
        </div>
      </header>
      <main></main>
    </StyleDiv >
  );
}
