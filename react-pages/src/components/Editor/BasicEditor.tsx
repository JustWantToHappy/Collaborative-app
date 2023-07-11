import React from 'react';
import StyleDiv from './style';
import { message } from 'antd';
import Quill from 'quill';
import Delta from 'quill-delta';
import ReactQuill from 'react-quill';
import QuillCursors from 'quill-cursors';
import 'react-quill/dist/quill.snow.css';
import { Delta as TypeDelta } from 'quill';
import { updateSharedCloudFile, updateCloudFile } from '@/api';

Quill.register('modules/cursors', QuillCursors);

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
  deltaStr: string;
  sharedCloudFileId?: string;
  cloudFileId?: string;
  changeEdit?: (edit: boolean) => void;
}

export const BasicEditor = React.forwardRef((props: Props, ref: React.Ref<ReactQuill | null>) => {
  const { changeEdit } = props;
  const [edit, setEdit] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { deltaStr, sharedCloudFileId, cloudFileId } = props;
  const editorRef = React.useRef<ReactQuill | null>(null);

  //提供属性给外部组件
  React.useImperativeHandle(ref, () => editorRef.current);

  const handleSave = React.useCallback(async () => {
    let code = 0;
    const text = JSON.stringify(editorRef.current?.editor?.getContents());
    if (sharedCloudFileId) {
      const { statusCode } = await updateSharedCloudFile(sharedCloudFileId, { text });
      code = statusCode;
    } else if (cloudFileId) {
      const { statusCode } = await updateCloudFile(cloudFileId, { text });
      code = statusCode;
    }
    if (code === 200) {
      messageApi.success('内容发布成功');
      PubSub.publish('stopLoading');
    } else {
      messageApi.error('内容发布失败');
    }
  }, [sharedCloudFileId, cloudFileId, messageApi]);

  React.useEffect(() => {
    try {
      editorRef.current?.editor?.setContents(JSON.parse(deltaStr));
    } catch (err) {
      editorRef.current?.editor?.setContents(delta);
    }
  }, [deltaStr]);

  React.useEffect(() => {
    const changeEditToken = PubSub.subscribe('changeEdit', async (_, edit: boolean) => {
      setEdit(edit);
      if (typeof changeEdit === 'function') {
        changeEdit(edit);
      }
      if (!edit) {
        handleSave();
      }
    });
    return function () {
      PubSub.unsubscribe(changeEditToken);
    };
  }, [handleSave, changeEdit]);

  return (
    <StyleDiv showToolBar={edit}>
      {contextHolder}
      <ReactQuill
        ref={editorRef}
        modules={modules}
        readOnly={!edit}
        placeholder='请输入文字...' />
    </StyleDiv>
  );
});