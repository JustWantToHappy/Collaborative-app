import React from 'react';
import PubSub from 'pubsub-js';
import StyleDiv from './style';
import * as dayjs from 'dayjs';
import { useLocalStorage } from '@/hooks';
import { Manager } from 'socket.io-client';
import type { ChatRecord } from '@/types';
import UploadImg from '@/components/UploadImg';
import { Avatar, Button, Input, message } from 'antd';
import { useParams, useLocation } from 'react-router-dom';
import { uploadImg, getChatRecordsByChatRoomId } from '@/api';
import { Chat, Config, FileType, LocalStorageKey } from '@/enum';
import type { UploadFile, RcFile } from 'antd/es/upload/interface';


export default function Index() {
  const { state } = useLocation();
  const { id: chatRoomId } = useParams();
  const [text, setText] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [userInfo] = useLocalStorage(LocalStorageKey.User_Info);
  const [asideWidth, setAsideWidth] = React.useState('18rem');
  const [chatRecords, setChatRecords] = React.useState<ChatRecord[]>([]);
  const [manager] = React.useState(new Manager(Config.ServerUrl));

  const showDrawer = () => setOpen(true);

  const onClose = () => setOpen(false);

  //发送文字
  const sendText = async () => {
    if (text === '') {
      messageApi.warning('请输入文字');
      return;
    }
    manager.socket('/chatroom').emit(Chat.Message,
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
  };

  //发送图片
  const sendImgFile = async (file: UploadFile) => {
    const form = new FormData();
    form.append('file', file as RcFile);
    const { statusCode, msg, data } = await uploadImg(form);
    if (statusCode === 200) {
      manager.socket('/chatroom').emit(Chat.Message,
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
    const { statusCode, data, msg } = await getChatRecordsByChatRoomId(chatRoomId as string);
    if (statusCode === 200) {
      setChatRecords(data || []);
    } else {
      messageApi.error(`${statusCode} ${msg}`);
    }
  }, [chatRoomId, messageApi]);

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
    return function () {
      PubSub.unsubscribe(asideWidthToken);
      PubSub.unsubscribe(fetchChatRecordToken);
    };
  }, [chatRoomId, chatRecords]);

  React.useEffect(() => {
    //滚动到底部
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 0);
  }, [chatRecords]);

  return (
    <StyleDiv asideWidth={asideWidth}>
      {contextHolder}
      <div className='chat_record_header'>
        <h4>{state}</h4>
        <small>成员列表</small>
      </div>
      <div className='chat_record'>
        {chatRecords.map(chatRecord => <ul key={chatRecord.id} className='chat_record_userInfo'>
          <li>
            <Avatar size='large' src={`/api/${chatRecord.avatar}`} />
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
          <Input
            value={text}
            placeholder='你想要说些什么...'
            onChange={e => setText(e.target.value)}
            allowClear />
        </div>
        <Button type='primary' onClick={sendText}>发送</Button>
        <UploadImg
          title='发送图片'
          action=''
          setFile={sendImgFile}
          manualUpload={true}
          showUploadList={false} />
      </div>
    </StyleDiv>
  );
}
