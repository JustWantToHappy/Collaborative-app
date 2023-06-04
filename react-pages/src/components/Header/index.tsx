import React from 'react';
import StyleDiv from './style';
import { NavLink } from 'react-router-dom';
import { Avatar, Badge, Button } from 'antd';
import LogoSvg from '@/assets/logo/logo.svg';
import { BellFilled, UserOutlined } from '@ant-design/icons';
import { defaultCssStyles } from '@/utils';

const routes = [
  {
    id: 1,
    path: '/home',
    title: '聊天列表'
  },
  {
    id: 2,
    path: '/work',
    title: '工作台'
  },
  {
    id: 3,
    path: '/cloud',
    title: '云文档'
  },
  {
    path: '/shared',
    title: '共享空间'
  },
];
export default function Index() {
  const [active, setActive] = React.useState('/home');

  return (
    <StyleDiv>
      <header>
        <NavLink to='/home' title="" > <img src={LogoSvg} /></NavLink>
        <ul>
          {routes.map(route => <li key={route.path}>
            <NavLink to={route.path}>
              <Button type='link'
                style={{ color: active === route.path ? defaultCssStyles.colorPrimary : '' }}>
                {route.title}
              </Button>
            </NavLink>
          </li>)}
        </ul>
        <div>
          <Badge count={5}>
            <BellFilled size={20} />
          </Badge>
          <Avatar size="small" icon={<UserOutlined />} style={{ marginLeft: '2rem' }} />
        </div>
      </header>
      <main></main>
    </StyleDiv >
  );
}
