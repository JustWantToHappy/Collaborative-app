import styled from 'styled-components';

const StyleDiv = styled('div')<{asideWidth:string}>`
  --chat-tool-height:4rem;
  --chat-aside-width:${props => props.asideWidth};
  border-radius: 1rem;
  margin:1rem auto;
  margin-bottom:calc(var(--chat-tool-height) + 2rem);
  padding:0 1rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  @media screen and (max-width:900px) {
    min-width:300px;
  }
  @media screen and (min-width:901px){
    width:${props=>props.asideWidth==='18rem'?'60vw':'70vw'}; 
  }
  
  p{
    margin:0;
    word-break: break-all;
    letter-spacing: 1px;
    font-size:.9rem;
  }
  
  .chat_record_header{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    small{
      text-decoration: underline;
      text-underline-offset: 2px;
      cursor: pointer;
      position: absolute;
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
        column-gap:2rem;
      }
    }

    &_content{
      
    }

    &_contentItem{
      background-color: var(--ab-grey-100);
      margin-bottom:1rem;
      padding:1rem;
      border-radius: 5px;
      img{
        @media screen and (max-width:900px) {
          width:100%;
        }
        @media screen and (min-width:901px){
          width:60%;
        }
      }
    }
  }
  .chat_record_tool{
    display: flex;
    height:var(--chat-tool-height);
    position: fixed;
    bottom:0;
    width:calc(100vw - var(--chat-aside-width));
    left:calc(var(--chat-aside-width) + 2px);
    padding:0 4vw;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    column-gap:1rem;
    border-top:1px solid var(--ab-grey-200);
  }
`;

export default StyleDiv;