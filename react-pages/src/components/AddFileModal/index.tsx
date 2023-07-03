import React from 'react';
import UploadImg from '../UploadImg';
import { addFolder } from '@/api';
import { useParams } from 'react-router-dom';
import { Form, Input, Modal, message } from 'antd';
import type { UploadFile, RcFile } from 'antd/es/upload/interface';

interface Props {
  type: 'file' | 'folder' | 'cloudDocument';
  open: boolean;
  close: () => void;
  updateFileTree: () => void;
}

const Index: React.FC<Props> = (props) => {
  const { type, open, close, updateFileTree } = props;
  const { cloudFileId = '0' } = useParams();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [file, setFile] = React.useState<UploadFile>();
  const uploadFile = (file: UploadFile) => setFile(file);
  const title = `${type === 'file' ? '文件' : (type === 'cloudDocument' ? '文档' : '文件夹')}`;

  const onCancel = () => {
    form.resetFields();
    close();
  };

  //新建文件夹
  const buildFolder = async () => {
    const formData = {
      parentId: cloudFileId,
      title: form.getFieldValue('title'),
      description: form.getFieldValue('description')
    };
    const { statusCode, msg } = await addFolder(formData);
    if (statusCode === 200) {
      messageApi.success('创建文件夹成功');
      updateFileTree();
      close();
    } else {
      messageApi.error(`${statusCode} ${msg}`);
    }
  };

  //上传文件
  const buildFile = async () => {
    //
  };

  //新建文档
  const buildCloudDocument = async () => {
    //
  };

  const onOk = () => {
    switch (type) {
      case 'file':
        buildFile();
        break;
      case 'folder':
        buildFolder();
        break;
      case 'cloudDocument':
        buildCloudDocument();
        break;
    }
  };

  return (
    <Modal
      title={`新建${title}`}
      onCancel={onCancel}
      onOk={onOk}
      open={open}>
      {contextHolder}
      <Form
        form={form}
        labelCol={{ span: 5 }}
        autoComplete="off"
        initialValues={{ parentName: cloudFileId, description: '' }}
      >
        <Form.Item
          label={`${title}名称`}
          rules={[{ required: true, message: `请输入${title}` }]}
          name="title">
          <Input placeholder={`请输入${title}名称`} />
        </Form.Item>

        <Form.Item
          label={`父文件夹`}
          name="parentName">
          <Input disabled />
        </Form.Item>

        <Form.Item
          label='简介'
          name="description">
          <Input.TextArea placeholder='请简单描述一下' rows={3} />
        </Form.Item>

        {type === 'file' && <Form.Item label='上传文件'>
          <UploadImg
            title='上传文件'
            type='primary'
            manualUpload={true}
            setFile={uploadFile}
            showUploadList={true}
            showFileList={true}
            action='' />
        </Form.Item>}
      </Form>
    </Modal>
  );
};

export default Index;