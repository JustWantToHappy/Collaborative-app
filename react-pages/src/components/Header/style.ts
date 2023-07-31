import styled from 'styled-components';

const StyleDiv = styled('div')<{mode?:string}>`
  width:100%;
  position: fixed;
  z-index:1000;
  background-color: ${props=>props.mode==='dark'?'var(--ab-dark-color)':'var(--ab-light-color)'};

  header{
    height:var(--ab-nav-height);
    box-shadow:${props=>props.mode==='dark'?'var(--ab-black-200) 0px 1px 1px':'rgba(149, 157, 165, 0.2) 0px 8px 24px'};
    display: flex;
    align-items: center;
    padding:0  var(--ab-padding-x);
    position: relative;
    &>ul{
      margin-left:8%;
      display: flex;
      justify-content: space-evenly;
      width:80%;
    }
    &>div{
      height:100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      column-gap: 3vw;
    }
  }
  img{
    height:2rem;
    cursor: pointer;
  }
`;

export default StyleDiv;