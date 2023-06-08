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
                  src='data:image/jpeg;base64,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'
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
