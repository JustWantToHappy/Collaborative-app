import React from 'react';
import StyleDiv from './style';
import type { InviteInfo } from '@/types';
import { myFriends, deleteFriend } from '@/api';
import { message, Avatar, Button, Popover } from 'antd';

export default function Index(props: { option: string }) {
  const [friendsInfo, SetFriendsInfo] = React.useState<InviteInfo[]>([]);
  const [messageApi, contextHolder] = message.useMessage();


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
        <Popover
          content={<span>邮箱：{friend.email}</span>}
          arrow={false}
          placement='bottom'>
          <Avatar size='large' />
        </Popover>
        <h5>{friend.name}</h5>
        <small>
          <Button type='link' danger onClick={() => removeFriend(friend.id)}>删除好友</Button>
        </small>
      </div>)}
    </StyleDiv>
  );
}
