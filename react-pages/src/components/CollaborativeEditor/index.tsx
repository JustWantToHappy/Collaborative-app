import React from 'react';
import StyleDiv from './style';
import Quill from 'quill';
import Delta from 'quill-delta';
import ReactQuill from 'react-quill';
import QuillCursors from 'quill-cursors';
import { QuillBinding } from 'y-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import { singleWebrtcProvider } from '@/utils';
import { Delta as TypeDelta, Sources } from 'quill';
import { useWebRtcProvider, useLocalStorage } from '@/hooks';
import { LocalStorageKey } from '@/enum';

Quill.register('modules/cursors', QuillCursors);
const modules = {
  cursors: true,
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline'],
    [{ 'align': [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['code-block', 'image'],
  ],
  history: {
    userOnly: true//历史记录只跟踪当前用户的操作
  }
};

const delta = (new Delta([]) as unknown) as TypeDelta;

interface Props {
  editable: boolean;
  deltaStr: string;
  getDeltaStr: (deltaStr: string) => void;
  shared?: boolean;
}

const Index: React.FC<Props> = (props) => {
  const { sharedCloudFileId = '0' } = useParams();
  const { editable, deltaStr, getDeltaStr, shared } = props;
  const editorRef = React.useRef<ReactQuill | null>(null);
  const quillBindingRef = React.useRef<QuillBinding>();
  const [userInfo] = useLocalStorage(LocalStorageKey.User_Info);
  //const provider = useWebRtcProvider({ name: userInfo.name, id: userInfo.id }, sharedCloudFileId);

  const onEditorChange = (value: string, delta: TypeDelta, source: Sources, editor: ReactQuill.UnprivilegedEditor) => {
    getDeltaStr(JSON.stringify(editor.getContents()));
  };

  React.useEffect(() => {
    if (shared && editable) {
      const ydoc = singleWebrtcProvider.getYDoc();
      const ytext = ydoc.getText('quill');
      const provider = singleWebrtcProvider.joinWebRtcRoom(sharedCloudFileId);
      const quillBinding = new QuillBinding(ytext, editorRef.current?.editor, provider?.awareness);
      quillBindingRef.current = quillBinding;
      editorRef.current?.focus();
    }
    return function () {
      if (shared && editable) {
        quillBindingRef.current?.destroy();
      }
    };
  }, [shared, editable, sharedCloudFileId]);

  React.useEffect(() => {
    try {
      editorRef.current?.editor?.setContents(JSON.parse(deltaStr));
    } catch (err) {
      editorRef.current?.editor?.setContents(delta);
    }
  }, [deltaStr]);

  return (
    <StyleDiv showToolBar={editable}>
      <ReactQuill
        ref={editorRef}
        modules={modules}
        onChange={onEditorChange}
        readOnly={!editable}
        placeholder='请输入文字...' />
    </StyleDiv>
  );
};

export default Index;