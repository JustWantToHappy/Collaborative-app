import React from 'react';
import Quill from 'quill';
import StyleDiv from './style';

const Index = () => {
  const quillRef = React.useRef<Quill>();
  const editContainerRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    const quill = new Quill('#editor_container', {
      //readOnly: true, //只读模式
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'align', 'clean'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['code-block', 'image'],
        ]
      },
      placeholder: '请输入文字...',
      theme: 'snow'  // or 'bubble',
    });
    quill.focus();
    quill.on('text-change', function (event) {
      //console.info(event, 'hhh');
      
    });
    quillRef.current = quill;
  }, []);
  
  return (
    <StyleDiv>
      <div ref={editContainerRef} className='editor_container' id='editor_container'></div>
    </StyleDiv>
  );
};

export default Index;