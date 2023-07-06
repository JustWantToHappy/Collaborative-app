import React from 'react';
import StyleDiv from './style';
import ReactQuill from 'react-quill';
import * as Y from 'yjs';
import Quill from 'quill';
import Delta from 'quill-delta';
import { QuillBinding } from 'y-quill';
import QuillCursors from 'quill-cursors';
import { WebrtcProvider } from 'y-webrtc';
import 'react-quill/dist/quill.snow.css';
import { Delta as TypeDelta, Sources } from 'quill';

Quill.register('modules/cursors', QuillCursors);

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline'],
    [{ 'align': [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['code-block', 'image'],
  ],
};

const delta = (new Delta([]) as unknown) as TypeDelta;


interface Props {
  editable: boolean;
  deltaStr: string;
  getDeltaStr: (deltaStr: string) => void;
}

const Index: React.FC<Props> = (props) => {
  const { editable, deltaStr, getDeltaStr } = props;
  const [value, setValue] = React.useState(delta);
  const editorRef = React.useRef<ReactQuill | null>(null);

  const onEditorChange = (value: string, delta: TypeDelta, source: Sources, editor: ReactQuill.UnprivilegedEditor) => {
    setValue(editor.getContents());
    getDeltaStr(JSON.stringify(editor.getContents()));
  };

  React.useEffect(() => {
    editorRef.current?.focus();
    /*    const ydoc = new Y.Doc();
    
        const provider = new WebrtcProvider('quill-demo-room', ydoc);
    
        // Define a shared text type on the document
        const ytext = ydoc.getText('quill');
    
        const binding = new QuillBinding(ytext, editorRef.current, provider.awareness);*/
  }, []);

  React.useEffect(() => {
    try {
      setValue(JSON.parse(deltaStr));
    } catch (err) {
      console.info(err);
    }
  }, [deltaStr]);

  return (
    <StyleDiv showToolBar={editable}>
      <ReactQuill
        ref={editorRef}
        value={value}
        modules={modules}
        onChange={onEditorChange}
        readOnly={!editable}
        placeholder='请输入文字...' />
    </StyleDiv>
  );
};

export default Index;