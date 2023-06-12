import React from 'react';
import StyleDiv from './style';
import type { InviteInfo } from '@/types';
import { myFriends, deleteFriend } from '@/api';
import { message, Avatar, Button } from 'antd';


interface Props {
  option: string;
  
}

export default function Index(props: Props) {
  const [messageApi, contextHolder] = message.useMessage();
  const [friendsInfo, SetFriendsInfo] = React.useState<InviteInfo[]>([]);


  React.useEffect(() => {
    if (props.option === '1') {
      (async () => {
        const { statusCode, data, msg } = await myFriends();
        if (statusCode === 200) {
          SetFriendsInfo(data || []);
        } else {
          messageApi.info({ content: `statusCode ${msg}` });
        }
      })();
    }
  }, [messageApi, props.option]);

  const removeFriend = async (id: number) => {
    const { statusCode, msg } = await deleteFriend(id);
    if (statusCode === 200) {
      message.success({ content: '删除成功!' });
      const restFriends = friendsInfo.filter(friend => friend.id !== id);
      SetFriendsInfo(restFriends);
    } else {
      messageApi.info({ content: `statusCode ${msg}` });
    }

  };

  return (
    <StyleDiv>
      {contextHolder}
      {friendsInfo.map(friend => <div key={friend.email} className='friend_info'>
        <Avatar size='large' />
        <h5>{friend.name}</h5>
        <span>邮箱地址：{friend.email}</span>
        <small>
          <Button type='link' danger onClick={() => removeFriend(friend.id)}>删除好友</Button>
        </small>
      </div>)}
    </StyleDiv>
  );
}
