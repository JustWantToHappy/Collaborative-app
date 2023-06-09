import React from 'react';
import StyleDiv from './style';
import type { Contact } from '@/types';
import { myjoins, deleteFriend } from '@/api';
import { message, Button, Tooltip, Avatar } from 'antd';
import { useLocalStorage } from '@/hooks';
import { LocalStorageKey } from '@/enum';


interface Props {
  option: string;
}


export default function Index(props: Props) {
  const [messageApi, contextHolder] = message.useMessage();
  const [userInfo] = useLocalStorage(LocalStorageKey.User_Info);
  const [contacts, setContacts] = React.useState<Contact>({ friends: [], groups: [] });


  React.useEffect(() => {
    if (props.option === '1') {
      (async () => {
        const { statusCode, data, msg } = await myjoins();
        if (statusCode === 200) {
          setContacts(data as Contact);
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
      const restFriends = contacts?.friends.filter(friend => friend.id !== id);
      contacts.friends = restFriends;
      setContacts(contacts);
    } else {
      messageApi.info({ content: `statusCode ${msg}` });
    }
  };

  return (
    <StyleDiv>
      {contextHolder}
      <div className='panel'>
        <p>
          <span>我的好友</span>
        </p>
        {contacts.friends.map(friend => <div
          key={friend.email}
          style={{ gridTemplateColumns: 'repeat(2,1fr)' }}
          className='panel_info'>
          <Tooltip placement='top' title={`邮箱地址:${friend.email}`}>
            <Avatar src={`/api/${friend.avatar}`} size='large' >{friend.name}</Avatar>
          </Tooltip>
          <h5>{friend.name}</h5>
          <small>
            <Button type='link' danger onClick={() => removeFriend(friend.id)}>删除好友</Button>
          </small>
        </div>)}
      </div>
      <div className='panel'>
        <p>
          <span>我的群组</span>
        </p>
        {contacts.groups.map(group => <div
          key={group.id}
          style={{ gridTemplateColumns: 'repeat(2,1fr)' }}
          className='panel_info'>
          <Avatar size='large' src={`/api/${group.avatar}`}>{group.name}</Avatar>
          <h5>{group.name}</h5>
          <small>
            <Button type='link' danger>
              {userInfo.id === group.leaderId ? '解散此群' : '退出此群'}
            </Button>
          </small>
        </div>)}
      </div>
    </StyleDiv>
  );
}
