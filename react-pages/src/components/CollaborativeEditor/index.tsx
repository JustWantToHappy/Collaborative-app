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

const Index = () => {
  const editorRef = React.useRef<ReactQuill | null>(null);
  const [value, setValue] = React.useState(delta);

  const onEditorChange = (value: string, delta: TypeDelta, source: Sources, editor: ReactQuill.UnprivilegedEditor) => {
    setValue(editor.getContents());
    console.info(editor.getContents(), 'hhh');
  };

  React.useEffect(() => {
    editorRef.current?.focus();
    /*    const ydoc = new Y.Doc();
    
        const provider = new WebrtcProvider('quill-demo-room', ydoc);
    
        // Define a shared text type on the document
        const ytext = ydoc.getText('quill');
    
        const binding = new QuillBinding(ytext, editorRef.current, provider.awareness);*/
  }, []);

  return (
    <StyleDiv>
      <ReactQuill
        ref={editorRef}
        value={value}
        modules={modules}
        onChange={onEditorChange}
        placeholder='请输入文字...'/>
    </StyleDiv>
  );
};

export default Index;