import React from 'react';
import StyleDiv from './style';
import { Button, message, notification, Space } from 'antd';
import Delta from 'quill-delta';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Delta as TypeDelta } from 'quill';
import { updateSharedCloudFile, updateCloudFile, getSharedCloudFileVersion } from '@/api';


const modules = {
  cursors: true,
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline'],
    [{ 'align': [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['code-block'],
  ],
  history: {
    userOnly: true//历史记录只跟踪当前用户的操作
  }
};

const delta = (new Delta([]) as unknown) as TypeDelta;

export interface Props {
  deltaStr: string;//文本内容
  version?: number;//协同文档版本
  sharedCloudFileId?: string;
  cloudFileId?: string;
  changeEdit?: (edit: boolean) => void;
}

export const BasicEditor = React.forwardRef((props: Props, ref: React.Ref<ReactQuill | null>) => {
  const [edit, setEdit] = React.useState(false);
  const [notifyApi, nofityContextHolder] = notification.useNotification();
  const [messageApi, messageContextHolder] = message.useMessage();
  const editorRef = React.useRef<ReactQuill | null>(null);
  const { deltaStr, sharedCloudFileId, cloudFileId, changeEdit, version } = props;

  const messageTip = React.useCallback((code: number) => {
    if (code === 200) {
      messageApi.success('内容发布成功');
      return true;
    } else {
      messageApi.error('内容发布失败');
      return false;
    }
  }, [messageApi]);

  //个人编辑文档保存
  const handleCloudFileSave = React.useCallback(async (text: string) => {
    PubSub.publish('editorState', { loading: true, edit: true });
    const { statusCode } = await updateCloudFile(cloudFileId as string, { text });
    const success = messageTip(statusCode);
    if (success) {
      PubSub.publish('editorState', { loading: false, edit: false });
    }
  }, [cloudFileId, messageTip]);

  //协同编辑文档保存
  const handleCollaborativeSave = React.useCallback(async (text: string) => {
    PubSub.publish('editorState', { loading: true, edit: true });
    const { statusCode } = await updateSharedCloudFile(sharedCloudFileId as string, { text });
    const success = messageTip(statusCode);
    PubSub.publish('editorState', { loading: false, edit: false });
    if (success) {
      setEdit(false);
      changeEdit && changeEdit(false);
      PubSub.publish('updateSharedCloudFile');
    }
  }, [sharedCloudFileId, messageTip, changeEdit]);

  //解决版本冲突
  const handleVersionConflictSave = React.useCallback((text: string) => {
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <Button type="link" size="small" onClick={() => notifyApi.destroy()}>
          取消
        </Button>
        <Button type="primary" size="small" onClick={() => {
          handleCollaborativeSave(text);
          notifyApi.destroy(key);
        }}>
          确定
        </Button>
      </Space>
    );
    notifyApi.error({
      key,
      btn,
      message: '版本更新',
      description: '检查到版本更新，直接提交会覆盖其他用户保存的内容',
    });
  }, [notifyApi, handleCollaborativeSave]);

  //版本检查
  const checkVersion = React.useCallback(async () => {
    const { statusCode, data } = await getSharedCloudFileVersion(sharedCloudFileId as string);
    if (statusCode === 200 && data !== version) {
      return true;
    }
    return false;
  }, [sharedCloudFileId, version]);

  const handleSharedCloudFileSave = React.useCallback(async (text: string) => {
    const conflict = await checkVersion();
    conflict ? handleVersionConflictSave(text) : handleCollaborativeSave(text);
  }, [checkVersion, handleVersionConflictSave, handleCollaborativeSave]);

  React.useEffect(() => {
    try {
      editorRef.current?.editor?.setContents(JSON.parse(deltaStr));
    } catch (err) {
      editorRef.current?.editor?.setContents(delta);
    }
  }, [deltaStr]);

  React.useEffect(() => {
    const changeEditToken = PubSub.subscribe('isEdit', async (_, edit: boolean) => {
      const text = JSON.stringify(editorRef.current?.editor?.getContents());
      if (!edit && cloudFileId) {
        handleCloudFileSave(text);
      } else if (edit && sharedCloudFileId) {
        changeEdit && changeEdit(edit);
      }
      setEdit(edit);
    });
    return function () {
      PubSub.unsubscribe(changeEditToken);
    };
  }, [handleCloudFileSave, cloudFileId, changeEdit, sharedCloudFileId]);

  React.useEffect(() => {
    const updateToken = PubSub.subscribe('update', () => {
      const text = JSON.stringify(editorRef.current?.editor?.getContents());
      handleSharedCloudFileSave(text);
    });

    return function () {
      PubSub.unsubscribe(updateToken);
    };
  }, [handleSharedCloudFileSave]);

  //提供属性给外部组件
  React.useImperativeHandle(ref, () => editorRef.current);

  return (
    <StyleDiv showToolBar={edit}>
      {messageContextHolder}
      {nofityContextHolder}
      <ReactQuill
        ref={editorRef}
        modules={modules}
        readOnly={!edit}
        placeholder='请输入文字...' />
    </StyleDiv>
  );
});