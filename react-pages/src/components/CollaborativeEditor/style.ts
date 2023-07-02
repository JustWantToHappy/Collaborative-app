import styled from 'styled-components';

const StyleDiv = styled('div')`
  display: block;
  width:100%;

  .editor_container{
    height:100vh;
    border:none;
    box-shadow: none
  }

  p{
    letter-spacing: 1px;
  }

  .quill{
    position: relative;
  }
  .ql-toolbar{
    border:none;
    background-color: #fff;
    z-index:1;
    position: fixed;
    height:3rem;
  }

  /*.ql-snow.ql-toolbar button:hover,.ql-snow .ql-toolbar button:hover,.ql-snow.ql-toolbar button:focus,.ql-snow .ql-toolbar button:focus, .ql-snow.ql-toolbar button.ql-active, .ql-snow .ql-toolbar button.ql-active, .ql-snow.ql-toolbar .ql-picker-label:hover, .ql-snow .ql-toolbar .ql-picker-label:hover, .ql-snow.ql-toolbar .ql-picker-label.ql-active, .ql-snow .ql-toolbar .ql-picker-label.ql-active, .ql-snow.ql-toolbar .ql-picker-item:hover, .ql-snow .ql-toolbar .ql-picker-item:hover, .ql-snow.ql-toolbar .ql-picker-item.ql-selected, .ql-snow .ql-toolbar .ql-picker-item.ql-selected{
    color:var(--ab-green-600);
  }*/
  .ql-container{
    border:none;
    img{
      height:50vh;
    }
  }
  
  .ql-editor{
    margin-top:2.5rem;
    margin-bottom:1rem;
  }
`;

export default StyleDiv;