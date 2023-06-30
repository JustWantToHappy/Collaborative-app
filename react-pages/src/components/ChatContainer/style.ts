import styled from 'styled-components';

interface Props{
  asideWidth:string
}

const StyleDiv = styled('div') <Props>`
  --chat-tool-height:4rem;
  --chat-aside-width:${props => props.asideWidth};
  border-radius: 1rem;
  margin:1rem auto;
  margin-bottom:calc(var(--chat-tool-height) + 2rem);
  padding:0 1rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  position: relative;
  /*overflow-x: hidden;*/

  @media screen and (max-width:900px) {
    min-width:320px;
  }
  @media screen and (min-width:901px){
    width:${props => props.asideWidth === '18rem' ? '60vw' : '70vw'}; 
  }
  
  .chat_record_header{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    &>small{
      position: absolute;
      cursor: pointer;
      right:2rem;
      top:50%;
      transform: translateY(-50%);
      &:hover{
        color:var(--ab-green-600);
      }
    }
  }
  
  .chat_record{
    &_userInfo{
      margin:1rem;

      li{
        display: grid;
        grid-template-columns: auto 1fr;
        column-gap:1rem;
        margin-bottom: 3rem;
        overflow: hidden;
      }

    }

    &_content{
      border-radius: 5px;
      margin:0;
      word-break: break-all;
      letter-spacing: 1px;
      font-size:.9rem;

      &>img{
        height:250px;
        max-width: 100%;
        object-fit: cover;
        background-color: var(--ab-grey-100);
        border-radius: 5px;
        padding:2rem 1rem;
      }
      &>span{
        display: inline-block;
        background-color: var(--ab-grey-100);
        padding:1rem;
        border-radius: 5px;
      }
    }
    &_contentHeader{
      h4{
        margin:0;
      }
      display: flex;
      column-gap: 1rem;
      margin-bottom: 5px;
      align-items: center;
    }
    .highlight{
      &>img{
        background:var(--ab-green-200);
      }
      &>span{
        background:var(--ab-green-200);
      }
    }
  }
  /*  */
  .chat_record_tool{
    display: flex;
    overflow: auto;
    overflow-x: hidden;
    min-height:var(--chat-tool-height);
    max-height:30vh;
    position: fixed;
    bottom:0;
    width:calc(100vw - var(--chat-aside-width));
    left:var(--chat-aside-width);
    padding:1rem;
    background-color: #fff;
    column-gap:1rem;
    border-top:1px solid var(--ab-grey-200);
  }

  .chat_record_btns{
    display: flex;
    column-gap: .5rem;
    align-items: flex-end;
    padding-bottom: 4px;
  }

  .return_top{
    right:1vw;
    bottom:calc(var(--chat-tool-height) + 2vh);
  }
`;

export default StyleDiv;