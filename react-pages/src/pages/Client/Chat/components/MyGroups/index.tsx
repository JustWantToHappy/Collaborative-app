import React from 'react';
import StyleDiv from './style';
import { myGroups } from '@/api';
import { Button, message } from 'antd';
import type { Team } from '@/types';
import Avatar from '@/components/Avatar';

interface Props {
  option: string;
}

const Index: React.FC<Props> = (props) => {
  const [show, setShow] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [groupsInfo, setGroupsInfo] = React.useState<Team[]>([]);

  React.useEffect(() => {
    const getData = async () => {
      const { statusCode, msg, data } = await myGroups();
      console.info(data);
      if (statusCode === 200) {
        setGroupsInfo(data);
      } else {
        messageApi.error(`${statusCode} ${msg}`);
      }
    };
    getData();
  }, [messageApi, props.option]);

  return (
    <StyleDiv>
      {contextHolder}
      {groupsInfo.map(group => <div key={group.id} className='group_info'>
        <Avatar src={`/api/${group.avatar}`} />
        <h5>{group.name}</h5>
        <div>
          <small>
            <Button type='link' onClick={() => setShow(true)}>邀请好友</Button>
          </small>
          <small>
            <Button type='link' danger>退出此群</Button>
          </small>
        </div>
      </div>)}
    </StyleDiv>
  );
};

export default Index;
