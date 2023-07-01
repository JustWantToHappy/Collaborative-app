import React from 'react';
import StyleDiv from './style';
import ReactQuill from 'react-quill';
import { Delta as TypeDelta, Sources } from 'quill';
import Delta from 'quill-delta';
import 'react-quill/dist/quill.snow.css';


const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline'],
    [{ 'align': [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['code-block'],
  ],
};

const delta = (new Delta([]) as unknown) as TypeDelta;

const Index = () => {
  const editorRef = React.useRef<ReactQuill | null>(null);
  const [value, setValue] = React.useState(delta);

  const onEditorChange = (value: string, delta: TypeDelta, source: Sources, editor: ReactQuill.UnprivilegedEditor) => {
    setValue(editor.getContents());
  };

  React.useEffect(() => {
    editorRef.current?.focus();
  }, []);

  return (
    <StyleDiv>
      <ReactQuill
        ref={editorRef}
        value={value}
        modules={modules}
        onChange={onEditorChange}
        placeholder='请输入文字...'
        style={{ height: '100vh' }} />
    </StyleDiv>
  );
};

export default Index;