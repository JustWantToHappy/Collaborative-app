import React from 'react';
import { message } from 'antd';
import StyleDiv from './style';
import type { User } from '@/types';
import { useParams } from 'react-router-dom';
import MyAvatar from '@/components/MyAvatar';
import { getGroupAllUsers } from '@/api';
import CloseSvg from '@/assets/logo/close.svg';

type Props = {
  show: boolean;
  hide: () => void;
}

const Index: React.FC<Props> = (props) => {
  const { show } = props;
  const { chatRoomId } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const [members, setMembers] = React.useState<User[]>([]);

  React.useEffect(() => {
    setTimeout(async () => {
      const { statusCode, data, msg } = await getGroupAllUsers(chatRoomId!);
      if (statusCode === 200) {
        setMembers(data ?? []);
      } else {
        messageApi.error(`${statusCode} ${msg}`);
      }
    }, 0);
  }, [chatRoomId, messageApi]);

  return (
    <StyleDiv show={show}>
      {contextHolder}
      <p className='member_header'>
        <small>成员({members.length})</small>
        <img src={CloseSvg} onClick={props.hide} />
      </p>
      <ul className='member_container'>
        {members.map(member => <li key={member.id}>
          <MyAvatar src={member.avatar}>{member.name}</MyAvatar>
          <div className='member_state'>
            <span>{member.name}</span>
            <small>离线</small>
          </div>
        </li>)}
      </ul>
    </StyleDiv>
  );
};

export default Index;