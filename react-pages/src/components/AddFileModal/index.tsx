import React from 'react';
import UploadImg from '../UploadImg';
import { addFolder } from '@/api';
import { useParams } from 'react-router-dom';
import { Form, Input, Modal, message } from 'antd';
import type { UploadFile, RcFile } from 'antd/es/upload/interface';

interface Props {
  type: 'file' | 'folder' | 'subfolder';
  open: boolean;
  close: () => void;
}

const Index: React.FC<Props> = (props) => {
  const { type, open, close } = props;
  const { id } = useParams();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [file, setFile] = React.useState<UploadFile>();
  const uploadFile = (file: UploadFile) => setFile(file);
  const title = `文件${type === 'file' ? '' : '夹'}`;

  const onCancel = () => {
    form.resetFields();
    close();
  };


  const buildFolder = async () => {
    const { statusCode, msg } = await addFolder(form.getFieldsValue());
    if (statusCode === 200) {
      messageApi.success('创建文件成功');
      close();
    } else {
      messageApi.error(`${statusCode} ${msg}`);
    }
  };

  const buildFile = async () => {
    //
  };

  const onOk = () => {
    if (type === 'file') {
      buildFile();
    } else {
      buildFolder();
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
        initialValues={{ parentName: '特斯拉', description: '' }}
      >
        <Form.Item
          label={`${title}名称`}
          rules={[{ required: true, message: `请输入${title}` }]}
          name="title">
          <Input placeholder={`请输入${title}名称`} />
        </Form.Item>

        {type === 'subfolder' && <Form.Item
          label={`${title}名称`}
          name="parentName">
          <Input disabled />
        </Form.Item>}

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