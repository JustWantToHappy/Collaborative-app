import React from 'react';
import StyleDiv from './style';
import { getAllCollaboratorsById } from '@/api';
import { Input, Button } from 'antd';

type Props = {
  sharedCloudFileId: string;
}

const Index: React.FC<Props> = (props) => {
  const { sharedCloudFileId } = props;

  React.useEffect(() => {
    (async () => {
      const { statusCode, data } = await getAllCollaboratorsById(sharedCloudFileId);
      if (statusCode === 200) {
        console.info(data, 'hhh');
      }
    })();
  }, [sharedCloudFileId]);

  return (
    <StyleDiv >
      <div className='invite'>
        <Input placeholder='请输入用户名邀请协作' />
        <Button type='primary'>邀请</Button>
      </div>
      <div className='users'>
      </div>
    </StyleDiv>
  );
};

export default Index;