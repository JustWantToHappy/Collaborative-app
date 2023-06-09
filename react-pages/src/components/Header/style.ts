import styled from 'styled-components';

const StyleDiv = styled('div')`
  width:100%;
  position: fixed;
  z-index:1000;
  background-color: #fff;

  header{
    height:4rem;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    /*border-bottom: 1px solid var(--ab-grey-100);*/
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
      position: absolute;
      right:calc(var(--ab-padding-x) + 1rem);
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