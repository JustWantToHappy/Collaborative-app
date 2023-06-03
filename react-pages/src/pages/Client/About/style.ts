import styled from 'styled-components';

const StyleDiv = styled('div')`
  header{
    display:flex;
    justify-content: space-between;
    height:4rem;
    padding:0 var(--ab-padding-x);
    align-items: center;
  }
  img{
    height:2rem;
    cursor: pointer;
  }
  main{
    display:flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height:calc(100vh - 4rem);
    &>h1{
      letter-spacing: .5rem;
      white-space: nowrap;
    }
    &>h4{
      margin:2rem;
    }
  }
  footer{
    position: fixed;
    bottom:1rem;
    right:2rem;
    border-radius: 50%;
  }
`;

export default StyleDiv;