import styled from 'styled-components';


interface Props{
  asideWidth: string;
}

export const StyleDiv = styled('div') <Props>`
  --aside-width:${props => props.asideWidth};
  --main-width:calc(100% - var(--aside-width));

  aside{
    width:var(--aside-width);
    top:var(--ab-nav-height);
    display: block;
    position: fixed;
    height:calc(100vh - var(--ab-nav-height));
    box-shadow: var(--ab-green-200) 1px 4px 4px;
    border-right:1px solid var(--ab-grey-100);
    transition:width 100ms ease;
  }
  main{
    left:var(--aside-width);
    position: absolute;
    width: 100%;
    top:var(--ab-nav-height); 
    flex:1;
  }
  .header{
    width:var(--main-width);
    position: fixed;
    z-index:999;
    height: var(--ab-main-header-height);
    background-color: #fff;
    border-bottom:1px solid var(--ab-grey-200);
  }
  .container{
    width:var(--main-width);
    padding:0 2rem;
    margin-top: var(--ab-main-header-height);
    display: flex;
  }

  .welcome{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin:0 auto;
    margin-top:20vh;
  }
`;
