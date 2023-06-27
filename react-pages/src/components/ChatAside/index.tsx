import React from 'react';
import * as dayjs from 'dayjs';
import StyleDiv from './style';
import { useLocalStorage } from '@/hooks';
import { getAllChatRoom } from '@/api';
import type { ChatRoom } from '@/types';
import { defaultCssStyles } from '@/utils';
import { Chat, LocalStorageKey } from '@/enum';
import MyAvatar from '@/components/MyAvatar';
import { NavLink, useParams } from 'react-router-dom';
import { Badge, Button, Popover, message } from 'antd';
import { chatRoomSocket, messageSocket } from '@/utils';
import { EllipsisOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

type IProps = {
  wide: boolean;
  changeWide: () => void;
}


export default function Index(props: IProps) {
  const { chatRoomId } = useParams();
  const { wide, changeWide } = props;
  const [active, setActive] = React.useState(chatRoomId);
  const [userInfo] = useLocalStorage(LocalStorageKey.User_Info, {});
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
    messageSocket.on(`${userInfo.id}fetchChatRoom`, (chatRoomId: string) => {
      //获取最新的聊天列表并将用户加入到指定房间
      getData();
      chatRoomSocket.emit(Chat.JoinOne, { userId: userInfo.id, roomId: chatRoomId });
    });
    const fetchChatRoomToken = PubSub.subscribe('fetchChatRoom', (_, chatRoomId: string) => {
      getData();
      chatRoomSocket.emit(Chat.JoinOne, { roomId: chatRoomId, userId: userInfo.id });
    });

    return function () {
      PubSub.unsubscribe(fetchChatRoomToken);
      messageSocket.off(`${userInfo.id}fetchChatRoom`);
    };
  }, [getData, userInfo.id]);


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
          state={{ title: chatroom.Group?.name || chatroom.User?.name, type: chatroom.type }}
          style={{ color: active === chatroom.id ? '#fff' : '#000', textDecoration: 'none' }}>
          <li
            className='chat_item'
            onClick={() => setActive(chatroom.id)}
            style={active === chatroom.id ? { backgroundColor: defaultCssStyles.colorPrimary } : {}}
          >
            <div className='chat_item_avatar'>
              <Badge count={0} size='small'>
                <MyAvatar src={chatroom.Group?.avatar || chatroom.User?.avatar} >
                  {chatroom.Group?.name || chatroom.User?.name}
                </MyAvatar>
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
