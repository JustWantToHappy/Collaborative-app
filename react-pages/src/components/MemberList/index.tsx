import React from 'react';
import { chatRoomSocket } from '@/utils';
import { message } from 'antd';
import StyleDiv from './style';
import type { User } from '@/types';
import { useParams } from 'react-router-dom';
import MyAvatar from '@/components/MyAvatar';
import { getGroupAllUsers } from '@/api';
import CloseSvg from '@/assets/logo/close.svg';
import { Chat } from '@/enum';

type Props = {
  show: boolean;
  hide: () => void;
}

const Index: React.FC<Props> = (props) => {
  const { show } = props;
  const { chatRoomId } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const [leader, setLeader] = React.useState('');
  const [onlines, setOnlines] = React.useState<string[]>([]); //在线用户
  const [members, setMembers] = React.useState<User[]>([]);

  React.useEffect(() => {
    setTimeout(async () => {
      const { statusCode, data, msg } = await getGroupAllUsers(chatRoomId!);
      if (statusCode === 200) {
        setMembers(data?.users ?? []);
        setLeader(data?.leaderId ?? '');
      } else {
        messageApi.error(`${statusCode} ${msg}`);
      }
    }, 0);
  }, [chatRoomId, messageApi]);

  React.useEffect(() => {
    chatRoomSocket.emit(Chat.Online, chatRoomId, (onlines: string[]) => {
      setOnlines(onlines);
    });
    chatRoomSocket.on(Chat.Online, (onlines: string[]) => {
      setOnlines(onlines);
    });
    return function () {
      chatRoomSocket.off(Chat.Online);
    };
  }, [chatRoomId]);

  React.useEffect(() => {
    if (!show) {
      PubSub.publish('online', onlines);
    }
  }, [onlines, show]);

  return (
    <StyleDiv show={show}>
      {contextHolder}
      <p className='member_header'>
        <small>成员({members.length})</small>
        <img src={CloseSvg} onClick={props.hide} />
      </p>
      <ul className='member_container'>
        {members.map(member => <li key={member.id}>
          <MyAvatar src={member.avatar} >{member.name}</MyAvatar>
          <div className='member_info'>
            <small>{member.name}</small>
            <small>{leader === member.id ? '群主' : '用户'}</small>
          </div>
          <small className={onlines.includes(member.id ?? '') ? 'member_state active' : 'member_state'} >
            {onlines.includes(member.id ?? '') ? '在线' : '离线'}
          </small>
        </li>)}
      </ul>
    </StyleDiv>
  );
};

export default Index;