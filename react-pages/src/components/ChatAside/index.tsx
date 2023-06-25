import React from 'react';
import StyleDiv from './style';
import * as dayjs from 'dayjs';
import { Config, LocalStorageKey } from '@/enum';
import { useLocalStorage } from '@/hooks';
import type { ChatRoom } from '@/types';
import { Manager } from 'socket.io-client';
import { getAllChatRoom } from '@/api';
import { defaultCssStyles } from '@/utils';
import { NavLink, useParams } from 'react-router-dom';
import { Avatar, Badge, Button, Popover, message } from 'antd';
import { EllipsisOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

type IProps = {
  wide: boolean;
  changeWide: () => void;
}


export default function Index(props: IProps) {
  const { id } = useParams();
  const { wide, changeWide } = props;
  const [active, setActive] = React.useState(id);
  const [userInfo] = useLocalStorage(LocalStorageKey.User_Info, {});
  const [manager] = React.useState(new Manager(Config.ServerUrl));
  const [messageApi, contextHolder] = message.useMessage();
  const [chatrooms, setChatRooms] = React.useState<ChatRoom[]>([]);

  const getData = React.useCallback(async function () {
    const { statusCode, msg, data } = await getAllChatRoom();
    if (statusCode === 200) {
      setChatRooms(data || []);
    } else {
      messageApi.error({ content: `${statusCode} ${msg}` });
    }
  }, [messageApi]);

  React.useEffect(() => {
    getData();
    manager.socket('/message').on(`${userInfo.id}fetchChatRoom`, () => {
      getData();
    });
    return function () {
      manager.socket('/message').off(`${userInfo.id}fetchChatRoom`);
    };
  }, [getData, manager, userInfo]);


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
          state={chatroom.Group?.name || chatroom.User?.name}
          style={{ color: active === chatroom.id ? '#fff' : '#000', textDecoration: 'none' }}>
          <li
            className='chat_item'
            onClick={() => setActive(chatroom.id)}
            style={active === chatroom.id ? { backgroundColor: defaultCssStyles.colorPrimary } : {}}
          >
            <div className='chat_item_avatar'>
              <Badge count={0} size='small'>
                <Avatar
                  size='large'
                  src={chatroom.Group?.avatar === '' && chatroom.User?.avatar === ''
                    ? '' : `/api/${chatroom.Group?.avatar || chatroom.User?.avatar}`}
                >{(chatroom.Group?.name || chatroom.User?.name)?.slice(0, 1)}</Avatar>
              </Badge>
            </div>
            <p>{chatroom.Group?.name || chatroom.User?.name}</p>
            <p>{chatroom.Messages && chatroom.Messages[0]?.text}</p>
            <small className='chat_item_date'>
              {chatroom.Messages && dayjs(chatroom.Messages[0]?.createdAt).format('YYYY/MM/DD HH:mm:ss')}
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
