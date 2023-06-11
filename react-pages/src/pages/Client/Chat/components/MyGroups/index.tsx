import React from 'react';
import StyleDiv from './style';
import { myGroups } from '@/api';
import { message } from 'antd';

interface Props {
  option: string;
}


const Index: React.FC<Props> = (props) => {
  const [groupsInfo, setGroupsInfo] = React.useState();
  const [messageApi, contextHolder] = message.useMessage();

  React.useEffect(() => {
    const getData = async () => {
      const { statusCode, msg, data } = await myGroups();
      if (statusCode === 200) {
        //
      } else {
        messageApi.error(`${statusCode} ${msg}`);
      }
    };
    getData();
  }, [props.option]);

  return (
    <StyleDiv>
      {contextHolder}
    </StyleDiv>
  );
};

export default Index;
