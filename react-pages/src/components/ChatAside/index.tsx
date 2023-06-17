import React from 'react';
import { Avatar, Badge, Button, Popover } from 'antd';
import StyleDiv from './style';
import { defaultCssStyles } from '@/utils';
import { NavLink, useNavigate } from 'react-router-dom';
import { EllipsisOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

type IProps = {
  wide: boolean;
  changeWide: () => void;
}


export default function Index(props: IProps) {
  const { wide, changeWide } = props;
  const [active, setActive] = React.useState(-1);
  const navigate = useNavigate();

  /* React.useMemo(() => {
     navigate(`/chat/${active}`);
   }, [active, navigate]);*/

  return (
    <StyleDiv wide={wide}>
      <header >
        <i onClick={changeWide}>
          {wide ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        </i>
        <h4>消息</h4>
      </header>
      <ul className='chat_aside'>
        {new Array(10).fill(1).map((_, index) =>
          <NavLink key={index} to={`/chat/${index}`} style={{ color: active === index ? '#fff' : '#000', textDecoration: 'none' }}>
            <li
              className='chat_item'
              onClick={() => setActive(index)}
              style={active === index ? { backgroundColor: defaultCssStyles.colorPrimary } : {}}
            >
              <div className='chat_item_avatar'>
                <Avatar
                  size='large'
                />
              </div>
              <p>飞书团队</p>
              <p>登录操作通知</p>
              <small className='chat_item_date'>2020年01月01日</small>
              <small className='chat_item_infoCount'>
                {/*<Badge count={12} />*/}
              </small>
              <span>
                <Popover
                  placement="top"
                  content={
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <Button type='link'>标记已读</Button>
                      <Button type='link'>邀请好友</Button>
                      <Button type='link'>退出该群</Button>
                    </div>
                  }
                  arrow={false}>
                  <EllipsisOutlined />
                </Popover>
              </span>
            </li>
          </NavLink>
        )}
      </ul>
    </StyleDiv>
  );
}
