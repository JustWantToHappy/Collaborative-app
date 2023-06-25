import React from 'react';
import { isLogin } from '@/utils';
import StyleDiv from './style';
import Login from '@/components/Login';
import Header from '@/components/Header';
import { Button, Popover } from 'antd';
import LogoSvg from '@/assets/logo/logo.svg';
import GitHubSvg from '@/assets/logo/github.svg';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';

const content = (
  <div>
    <p>1302755003@qq.com</p>
  </div>
);
export default function Index() {
  const { pathname } = useLocation();
  const prePathname = React.useRef<string>(pathname);
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = React.useState(false);

  const handleLoginCancel = () => {
    setShowLogin(false);
  };

  React.useEffect(() => {
    if (pathname !== prePathname.current) {
      prePathname.current = pathname;
    }
  }, [pathname]);
  //进行路由权限处理
  React.useLayoutEffect(() => {
    const login = isLogin();
    if (!login) {
      navigate('/');
    } else if (login && pathname === '/' && prePathname.current !== pathname) {
      navigate(prePathname.current);
    } else if (login && pathname === '/' && prePathname.current === '/') {
      navigate('/chat', { replace: true });
    }
  }, [navigate, pathname]);

  if (pathname === '/') {
    return <StyleDiv>
      <header>
        <Link to='/' title=""> <img src={LogoSvg} /></Link>
        <Button type="primary" onClick={() => setShowLogin(true)}>登录 / 注册</Button>
      </header>
      <main>
        <h1>在线文档协作平台</h1>
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
