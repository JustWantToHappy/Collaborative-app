import styled from 'styled-components';

const StyleDiv = styled('div')`
  header{
    height:4rem;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    display: flex;
    align-items: center;
    padding:0  var(--ab-padding-x);
    position: relative;
    &>ul{
      display: flex;
      justify-content: space-around;
      width:70%;
      list-style: none;
    }
    &>div{
      position: absolute;
      right:var(--ab-padding-x);
      height:100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  img{
    height:2rem;
    cursor: pointer;
  }
`;

export default StyleDiv;