import React from 'react';
import UploadImg from '../UploadImg';
import { addFolder } from '@/api';
import { Form, Input, Modal, message } from 'antd';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import { FileType } from '@/enum';

interface Props {
  type: FileType;
  open: boolean;
  close: () => void;
  updateFileTree: () => void;
  cloudFileId: string;
}

const Index: React.FC<Props> = (props) => {
  const { type, open, close, updateFileTree, cloudFileId } = props;
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [file, setFile] = React.useState<UploadFile>();
  const title = `${type === FileType.Image ? '文件' : (type === FileType.Text ? '文档' : '文件夹')}`;

  const uploadFile = (file: UploadFile) => setFile(file);

  const onCancel = () => {
    form.resetFields();
    close();
  };

  const onOk = async () => {
    form.validateFields();
    if (form.getFieldValue('title') === '') {
      return;
    }
    if (!file && type === FileType.Image) {
      return;
    }
    const formData = new FormData();
    formData.append('parentId', cloudFileId);
    formData.append('title', form.getFieldValue('title'));
    formData.append('description', form.getFieldValue('description'));
    formData.append('type', type);
    formData.append('file', file as RcFile);
    const { statusCode, msg } = await addFolder(formData);
    if (statusCode === 200) {
      messageApi.success(`创建${title}成功`);
      updateFileTree();
      close();
      form.resetFields();
    } else {
      messageApi.error(`${statusCode} ${msg}`);
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
        initialValues={{ description: '', title: '' }}
      >
        <Form.Item
          label={`${title}名称`}
          rules={[{ required: true, message: `请输入${title}名称` }]}
          name="title">
          <Input placeholder={`请输入${title}名称`} />
        </Form.Item>

        <Form.Item
          label={`父文件夹`}>
          <Input disabled value={cloudFileId} />
        </Form.Item>

        <Form.Item
          label='简介'
          name="description">
          <Input.TextArea placeholder='请简单描述一下' rows={3} />
        </Form.Item>

        {type === FileType.Image && <Form.Item label='上传文件'>
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