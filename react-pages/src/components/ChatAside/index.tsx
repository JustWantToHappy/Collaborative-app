import React from 'react';
import StyleDiv from './style';
import { getAllChatRoom } from '@/api';
import { defaultCssStyles } from '@/utils';
import { NavLink, useParams } from 'react-router-dom';
import type { ChatRoom } from '@/types';
import { Avatar, Badge, Button, Popover, message } from 'antd';
import { EllipsisOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

type IProps = {
  wide: boolean;
  changeWide: () => void;
}


export default function Index(props: IProps) {
  const { wide, changeWide } = props;
  const { id } = useParams();
  const [chatrooms, setChatRooms] = React.useState<ChatRoom[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [active, setActive] = React.useState(id);

  React.useEffect(() => {
    (async function () {
      const { statusCode, msg, data } = await getAllChatRoom();
      if (statusCode === 200) {
        console.info(data, 'hh');
        setChatRooms(data || []);
      } else {
        messageApi.error({ content: `${statusCode} ${msg}` });
      }
    })();
  }, [messageApi]);

  return (
    <StyleDiv wide={wide}>
      {contextHolder}
      <header >
        <i onClick={changeWide}>
          {wide ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        </i>
        <h4>消息</h4>
      </header>
      <ul className='chat_aside'>
        {chatrooms.map(chatroom => <NavLink
          key={chatroom.id}
          to={`/chat/record/${chatroom.id}`}
          style={{ color: active === chatroom.id ? '#fff' : '#000', textDecoration: 'none' }}>
          <li
            className='chat_item'
            onClick={() => setActive(chatroom.id)}
            style={active === chatroom.id ? { backgroundColor: defaultCssStyles.colorPrimary } : {}}
          >
            <div className='chat_item_avatar'>
              <Avatar
                size='large'
              />
            </div>
            <p>{chatroom.Group?.name || chatroom.User?.name}</p>
            <p>登录操作通知</p>
            <small className='chat_item_date'>{chatroom.Group?.create_at}</small>
            <small className='chat_item_infoCount'>
              {/*<Badge count={12} />*/}
            </small>
            <span>
              <Popover
                placement="top"
                content={
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Button type='link'>标记已读</Button>
                    <div style={
                      {
                        display: chatroom.type === 'private' ? 'none' : 'flex',
                        flexDirection: 'column'
                      }}>
                      <Button type='link'>邀请好友</Button>
                      <Button type='link'>退出该群</Button>
                    </div>
                  </div>
                }
                arrow={false}>
                <EllipsisOutlined />
              </Popover>
            </span>
          </li>
        </NavLink>)}
      </ul>
    </StyleDiv>
  );
}
