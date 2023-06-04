import styled from 'styled-components';

interface Props{
  wide:boolean
}

const StyleDiv = styled('div')<Props>`
  transition: all 300ms linear;
  display: inline-block;
  height:calc(100vh - var(--ab-nav-height));
  box-shadow: var(--ab-green-200) 1px 4px 4px;
  /*position: relative;*/
  padding:1rem;
  width:${props=>props.wide?'15rem':'auto'};

  i{
    float:right;
    cursor: pointer;
    &:hover{
      color:var(--ab-green-600);
    }
  }

  header{
    padding-top:.5rem;
    text-align: center;
  }
  
`;

export default StyleDiv;