import styled from 'styled-components';

interface Props{
  wide: boolean;
}

const StyleDiv = styled('div') <Props>`
  main{
    position: absolute;
    width: 100%;
    left:${props => props.wide ? '16rem' : '6rem'};
    flex:1;
  }
  .chat_header{
    background-color: #fff;
    width:${props=>props.wide?'calc(100% - 16rem)':'calc(100% - 6rem)'};
    position: fixed;
    z-index:999;
    height: var(--chat-header-height);
    border-bottom:1px solid var(--ab-grey-100);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .chat_container{
    padding:1rem 2rem;
    margin-top: var(--chat-header-height);
    width:${props=>props.wide?'calc(100vw - 16rem)':'calc(100vw - 6rem)'};
    display: flex;
  }
  .chat_welcome{
    display: flex;
    width:100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top:20vh;
  }
`;

export default StyleDiv;