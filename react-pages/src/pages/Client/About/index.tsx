import React from 'react';
import { Button, Input, Popover } from 'antd';
import StyleDiv from './style';
import LogoSvg from '@/assets/logo/logo.svg';
import GitHubSvg from '@/assets/logo/github.svg';
import { Link } from 'react-router-dom';
import Login from '@/components/Login';

const content = (
  <div>
    <p>1302755003@qq.com</p>
  </div>
);
export default function Index() {
  const [showLogin, setShowLogin] = React.useState(false);
  const handleLoginCancel = () => {
    setShowLogin(false);
  };
  const handleLoginOk = () => {
    setShowLogin(true);
  };
  return (
    <StyleDiv>
      <header>
        <Link to='/' title=""> <img src={LogoSvg} /></Link>
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
        handleOk={handleLoginOk}
      />
      <footer>
        <Link to='https://github.com/JustWantToHappy/Collaborative-app' title='项目地址' target='_blank'><img src={GitHubSvg} alt='项目地址' /></Link>
      </footer>
    </StyleDiv>
  );
}
