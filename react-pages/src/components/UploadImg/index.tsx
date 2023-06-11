import React from 'react';
import path from 'path-browserify';
import { Button, message, Upload } from 'antd';
import { useLocalStorage } from '@/hooks';
import { LocalStorageKey } from '@/enum';

interface Props {
  title: string;
  action: string;
}

const Index: React.FC<Props> = (props) => {
  const { title, action } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const [userInfo] = useLocalStorage(LocalStorageKey.User_Info);

  const beforeUpload = (file: File) => {
    const fileExtName = path.extname(file.name);
    if (!fileExtName.match(/\.(jpg|jpeg|png|gif)$/)) {
      messageApi.error('上传的图片格式必须是jpg、jpeg、png、gif');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      messageApi.error('上传的图片大小必须小于2MB');
      return false;
    }
    return true;
  };

  const onChange = (info: any) => {
    /*  if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }*/
    if (info.file.status === 'error') {
      messageApi.error('上传图片失败');
    }
  };

  return <Upload
    name='file'
    headers={{ authorization: `Bearer ${userInfo.jwt_token}` }}
    action={action}
    beforeUpload={beforeUpload}
    onChange={onChange}
    showUploadList={false}>
    {contextHolder}
    <Button type='primary'>{title}</Button>
  </Upload>;
};

export default Index;