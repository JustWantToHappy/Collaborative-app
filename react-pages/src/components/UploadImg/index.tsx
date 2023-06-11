import React from 'react';
import { Button, Upload } from 'antd';
import { useLocalStorage } from '@/hooks';
import { LocalStorageKey } from '@/enum';

interface Props {
  title: string;
  action: string;
}

const Index: React.FC<Props> = (props) => {
  const { title, action } = props;
  const [userInfo] = useLocalStorage(LocalStorageKey.User_Info);

  const onChange = (info: any) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      alert('发送成功');
    } else if (info.file.status === 'error') {
      alert('发送失败');
    }
  };

  return <Upload
    name='file'
    headers={{ authorization: `Bearer ${userInfo.jwt_token}` }}
    action={action}
    onChange={onChange}
    showUploadList={false}>
    <Button type='primary'>{title}</Button>
  </Upload>;
};

export default Index;