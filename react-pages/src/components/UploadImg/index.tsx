import React from 'react';
import path from 'path-browserify';
import { useLocalStorage } from '@/hooks';
import { LocalStorageKey } from '@/enum';
import { Button, message, Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';

interface Props {
  title: string;
  action: string;
  showUploadList?: boolean;
  manualUpload?: boolean;
  setFile?: (file: UploadFile) => void;
  showFileList?: boolean;
}

const Index: React.FC<Props> = (props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const { title, action, showUploadList, manualUpload, setFile, showFileList } = props;
  const [userInfo] = useLocalStorage(LocalStorageKey.User_Info);

  const beforeUpload = (file: UploadFile) => {
    if (!file?.size) return false;
    const fileExtName = path.extname(file.name);
    if (!fileExtName.match(/\.(jpg|jpeg|png|gif|ico)$/)) {
      messageApi.error('上传的图片格式必须是jpg、jpeg、png、gif、ico');
      return false;
    }

    const isLt2M = file?.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      messageApi.error('上传的图片大小必须小于2MB');
      return false;
    }
    if (manualUpload === true) {
      setFile!(file);
      return false;
    }

    return true;
  };

  const onChange = (info: any) => {
    if (info.file.status !== 'uploading') {
      setFileList([info.file]);
    }
    if (info.file.status === 'error') {
      messageApi.error('上传失败');
    }
  };

  React.useMemo(() => {
    if (!showFileList) {
      setFileList([]);
    }
  }, [showFileList]);

  return <Upload
    name='file'
    maxCount={1}
    action={action}
    fileList={fileList}
    headers={{ authorization: `Bearer ${userInfo.jwt_token}` }}
    beforeUpload={beforeUpload}
    onChange={onChange}
    showUploadList={showUploadList}>
    {contextHolder}
    <Button type='primary'>{title}</Button>
  </Upload>;
};

export default Index;