import React from 'react';
import StyleDiv from './style';
import Quill from 'quill';
import Delta from 'quill-delta';
import ReactQuill from 'react-quill';
import QuillCursors from 'quill-cursors';
import 'react-quill/dist/quill.snow.css';
import { Delta as TypeDelta, Sources } from 'quill';

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
  editable: boolean;
  deltaStr: string;
  getDeltaStr: (deltaStr: string) => void;
}

export const BasicEditor = React.forwardRef((props: Props, ref: React.Ref<ReactQuill | null>) => {
  const { editable, deltaStr, getDeltaStr } = props;
  const editorRef = React.useRef<ReactQuill | null>(null);

  const onEditorChange = (value: string, delta: TypeDelta, source: Sources, editor: ReactQuill.UnprivilegedEditor) => {
    getDeltaStr(JSON.stringify(editor.getContents()));
  };

  //提供属性给外部组件
  React.useImperativeHandle(ref, () => editorRef.current);

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
});