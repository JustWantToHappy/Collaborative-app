import styled from 'styled-components';

type Props = {
  showToolBar: boolean;
}

const StyleDiv = styled('div')<Props>`
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

  --quill-toolbar-height:3rem;

  .quill{
    position: relative;
    margin-top:1rem;
    overflow: auto;
  }
  .ql-toolbar{
    border:none;
    position: fixed;
    z-index:1;
    width:calc(100% - 15rem);
    height:var(--quill-toolbar-height);
    display: ${props => props.showToolBar ? 'flex' : 'none'};
    align-items: center;
    background-color: var(--ab-white-100);
  }

  .ql-container{
    border: none;
    margin-top:${props=>props.showToolBar?'var(--quill-toolbar-height)':'0'};
    img{
      height:50vh;
    }
  }
  
`;

export default StyleDiv;