import React from 'react';
import StyleDiv from './style';
import { buildGroup } from '@/api';
import type { Group } from '@/types';
import { defaultCssStyles } from '@/utils';
import { ThemeModeContext } from '@/context';
import Badges from '@/components/Badges';
import UploadImg from '@/components/UploadImg';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Form, Input, Modal, message } from 'antd';
import type { UploadFile, RcFile } from 'antd/es/upload/interface';


export default function Index() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [form] = Form.useForm();
  const context = React.useContext(ThemeModeContext);
  const [file, setFile] = React.useState<UploadFile>();
  const [messageApi, contextHolder] = message.useMessage();
  const [showFileList, setShowFileList] = React.useState(true);
  const [showGroup, setShowGroup] = React.useState(false);

  const openGroup = () => setShowGroup(true);


  const closeGroup = () => setShowGroup(false);

  const onSubmitGroup = () => form.submit();

  const setImgFile = (file: UploadFile) => setFile(file);

  const onBuildGroup = async (values: Group) => {
    const formData = new FormData();
    formData.append('file', file as RcFile);
    formData.set('avatar', '');
    formData.set('name', (values.name as string).trim());
    formData.set('description', values.description ?? '');
    try {
      const { statusCode, msg, data: chatRoomId } = await buildGroup(formData);
      if (statusCode === 200) {
        messageApi.success({ content: '创建成功' });
        form.resetFields();
        setShowGroup(false);
        setShowFileList(false);
        //更新聊天列表
        PubSub.publish('fetchChatRoom', chatRoomId);
      } else {
        messageApi.info({ content: `${statusCode} ${msg}` });
      }
    } catch (err) {
      console.info(err);
    }
  };


  return <StyleDiv>
    {contextHolder}
    <Badges />
    <div>
      <Button
        type='link'
        style={{ color: pathname === '/chat/address' ? defaultCssStyles.colorPrimary : context.mode === 'dark' ? defaultCssStyles.colorLinkDark : '' }}
        onClick={() => navigate('/chat/address')}>
        通讯录
      </Button>
      <Button type='link' onClick={openGroup}>新建群组</Button>
    </div>
    <Modal title="新建群组" open={showGroup} onCancel={closeGroup} onOk={onSubmitGroup} >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 5 }}
        onFinish={onBuildGroup}
        autoComplete="off"
        initialValues={{ description: '' }}
      >

        <Form.Item
          label="名称"
          name="name"
          rules={[{ required: true, message: '请输入群名称!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="简介"
          name="description"
        >
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item
          label='头像'
        >
          <UploadImg
            action=''
            type='primary'
            title='上传群头像'
            manualUpload={true}
            setFile={setImgFile}
            showFileList={showFileList}
            showUploadList={true} />
        </Form.Item>
      </Form>
    </Modal>
    <Modal title="邀请好友加入">
      <Input />
    </Modal>
  </StyleDiv>;
}
