import React from 'react';
import dayjs from 'dayjs';
import StyleDiv from './style';
import { ThemeModeContext } from '@/context';
import { useLocalStorage } from '@/hooks';
import { getAllChatRoom } from '@/api';
import type { ChatRoom } from '@/types';
import { defaultCssStyles } from '@/utils';
import { Chat, LocalStorageKey } from '@/enum';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { Badge, Button, Popover, message, Avatar } from 'antd';
import { chatRoomSocket, messageSocket } from '@/utils';
import { EllipsisOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

type IProps = {
  wide: boolean;
  asideWidth: string;
  changeWide: () => void;
}

export default function Index(props: IProps) {
  const navigate = useNavigate();
  const { chatRoomId } = useParams();
  const { wide, changeWide, asideWidth } = props;
  const context = React.useContext(ThemeModeContext);
  const chatContainerRef = React.useRef<HTMLUListElement>(null);
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

  const shiftChatRoom = (event: React.MouseEvent, chatroom: ChatRoom) => {
    event.preventDefault();
    navigate(`/chat/room/${chatroom.id}`, {
      state: {
        friendId: chatroom.User?.id,
        title: chatroom.Group?.name || chatroom.User?.name,
        type: chatroom.type,
        asideWidth
      }
    });
  };

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

  React.useEffect(() => {
    const handleScrolling = (event: Event) => {
      event.stopPropagation();
    };
    chatContainerRef.current?.addEventListener('scroll', handleScrolling);
    return function () {
      chatContainerRef.current && chatContainerRef.current.removeEventListener('scroll', handleScrolling);
    };
  }, []);

  return (
    <StyleDiv wide={wide} mode={context.mode}>
      {contextHolder}
      <header >
        <i onClick={changeWide}>
          {wide ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        </i>
        <h4>消息</h4>
      </header>
      <ul className='chat_aside' ref={chatContainerRef}>
        {chatrooms.map(chatroom => <NavLink
          key={chatroom.id}
          to={`/chat/room/${chatroom.id}`}
          onClick={event => shiftChatRoom(event, chatroom)}
          style={{ color: (active === chatroom.id || context.mode === 'dark') ? '#fff' : '#000', textDecoration: 'none' }}>
          <li
            className='chat_item'
            onClick={() => setActive(chatroom.id)}
            style={active === chatroom.id ? { backgroundColor: defaultCssStyles.colorPrimary } : {}}
          >
            <div className='chat_item_avatar'>
              <Badge count={0} size='small'>
                <Avatar src={`/api/${chatroom.Group?.avatar || chatroom.User?.avatar}`} size='large'>
                  {chatroom.Group?.name || chatroom.User?.name}
                </Avatar>
              </Badge>
            </div>
            <p style={{ maxWidth: '5rem' }}>{chatroom.Group?.name || chatroom.User?.name}</p>
            <p style={{ marginRight: '1rem' }}>{chatroom.Messages && (chatroom.Messages[0]?.fileType === 'image' ? '图片' : chatroom.Messages[0]?.text)}</p>
            <small className='chat_item_date'>
              {chatroom.Messages && dayjs(chatroom.Messages[0]?.createdAt).format('YYYY/MM/DD HH:mm:ss')}
            </small>
            <span>
              <Popover
                overlayStyle={{ position: 'fixed' }}
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
