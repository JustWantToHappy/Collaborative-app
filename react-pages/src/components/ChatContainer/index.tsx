import React from 'react';
import StyleDiv from './style';
import dayjs from 'dayjs';
import MembersSvg from '../MembersSvg';
import { ThemeModeContext } from '@/context';
import { chatRoomSocket } from '@/utils';
import type { ChatRecord } from '@/types';
import UploadImg from '@/components/UploadImg';
import MemberList from '@/components/MemberList';
import { useLocalStorage, useDebouce } from '@/hooks';
import { uploadImg, getChatRecordsByChatRoomId } from '@/api';
import { Chat, FileType, LocalStorageKey } from '@/enum';
import { Button, Input, message, FloatButton, Avatar } from 'antd';
import type { UploadFile, RcFile } from 'antd/es/upload/interface';
import { useParams, useLocation, useNavigate } from 'react-router-dom';


export default function Index() {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const context = React.useContext(ThemeModeContext);
  const { chatRoomId } = useParams();
  const [text, setText] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [online, setOnline] = React.useState(false);
  const [userInfo] = useLocalStorage(LocalStorageKey.User_Info, {});
  const [asideWidth, setAsideWidth] = React.useState('18rem');
  const [chatRecords, setChatRecords] = React.useState<ChatRecord[]>([]);

  const hide = () => setOpen(false);

  //发送文字
  const sendText = useDebouce(() => {
    if (text === '') {
      messageApi.warning('请输入文字');
      return;
    }
    chatRoomSocket.emit(Chat.Message,
      {
        senderId: userInfo.id,
        receiverId: userInfo.id,
        chatRoomId,
        text,
        fileType: FileType.Text
      }, (tip: string) => {
        messageApi.error(tip);
      });
    setText('');
  }, 500);

  //发送图片
  const sendImgFile = async (file: UploadFile) => {
    const form = new FormData();
    form.append('file', file as RcFile);
    const { statusCode, msg, data } = await uploadImg(form);
    if (statusCode === 200) {
      chatRoomSocket.emit(Chat.Message,
        {
          senderId: userInfo.id,
          receiverId: userInfo.id,
          chatRoomId,
          text: data,
          fileType: FileType.Image
        }, (tip: string) => {
          messageApi.error(tip);
        });
    } else {
      messageApi.error(`${statusCode} ${msg}`);
    }
  };

  //获取聊天记录
  const getMessages = React.useCallback(async () => {
    hide();
    const { statusCode, data } = await getChatRecordsByChatRoomId(chatRoomId as string);
    if (statusCode === 200) {
      setChatRecords(data || []);
    } else {
      navigate('/chat');
    }
  }, [chatRoomId, navigate]);

  React.useEffect(() => {
    getMessages();
  }, [getMessages]);


  React.useEffect(() => {
    const asideWidthToken = PubSub.subscribe('asideWidth',
      (_, asideWidth: string) => {
        setAsideWidth(asideWidth);
      });
    const fetchChatRecordToken = PubSub.subscribe('fetchChatRecord',
      (_, data: ChatRecord) => {
        if (data.chatRoomId === chatRoomId) {
          chatRecords?.push(data);
          setChatRecords([...chatRecords]);
        }
      });

    //滚动到底部
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 0);

    return function () {
      PubSub.unsubscribe(asideWidthToken);
      PubSub.unsubscribe(fetchChatRecordToken);
    };
  }, [chatRoomId, chatRecords]);

  React.useEffect(() => {
    if (state?.asideWidth) {
      setAsideWidth(state?.asideWidth);
    }
    const onlineToken = PubSub.subscribe('online', (_, onlines: string[]) => {
      setOnline(onlines.includes(state?.friendId));
    });
    return function () {
      PubSub.unsubscribe(onlineToken);
    };
  }, [state]);

  return (
    <StyleDiv asideWidth={asideWidth} mode={context.mode}>
      {contextHolder}
      <MemberList show={open} hide={hide} />
      <div className='chat_record_header'>
        <h4>{state?.title}</h4>
        <small
          onClick={() => setOpen(true)}
          style={{ display: state?.type === 'private' ? 'none' : 'inline' }}>
          <MembersSvg />
        </small>
        {/*<small
          style={{
            display: state?.type === 'public' ? 'none' : 'inline',
          }}>
          {online ? '在线' : '离线'}
        </small>*/}
      </div>
      <div className='chat_record'>
        <div style={{ textAlign: 'center', padding: '2rem', display: chatRecords.length === 0 ? 'block' : 'none' }}>
          <small>暂无消息</small>
        </div>
        {chatRecords.map((chatRecord) => <ul key={chatRecord.id} className='chat_record_userInfo'>
          <li>
            <Avatar src={`/api/${chatRecord.avatar}`} size='large'>
              {chatRecord.name}
            </Avatar>
            <div
              className={chatRecord.senderId === userInfo.id ? 'chat_record_content highlight' : 'chat_record_content'}
            >
              <div className='chat_record_contentHeader'>
                <h4>{chatRecord.name}</h4>
                <small>{dayjs(chatRecord.createdAt).format('YYYY年MM月DD日 HH:mm:ss')}</small>
              </div>
              {chatRecord.fileType === FileType.Image ?
                <img src={`/api/${chatRecord.text}`} /> :
                <span>{chatRecord.text}</span>}
            </div>
          </li>
        </ul>)}
      </div>
      <div className='chat_record_tool'>
        <div style={{ flex: '1' }}>
          <Input.TextArea
            style={{ minWidth: '200px', padding: '0', overflow: 'hidden' }}
            value={text}
            autoFocus
            autoSize={{ minRows: 1, maxRows: 4 }}
            placeholder='现在你想要说些什么，发表你的看法...'
            onChange={e => setText(e.target.value)}
            allowClear >
          </Input.TextArea>
        </div>
        <div className='chat_record_btns'>
          <Button type='primary' onClick={sendText}  >发送</Button>
          <UploadImg
            title='发送图片'
            type='primary'
            action=''
            setFile={sendImgFile}
            manualUpload={true}
            showUploadList={false} />
        </div>
      </div>
      {/*<FloatButton.BackTop className='return_top' />*/}
    </StyleDiv >
  );
}
