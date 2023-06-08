import styled from 'styled-components';


export const StyleDiv = styled('div')`
  &>header{
    display:flex;
    justify-content: space-between;
    height:var(--ab-nav-height);
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
    margin:5rem;
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