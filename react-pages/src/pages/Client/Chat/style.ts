import styled from 'styled-components';

interface Props{
  wide: boolean;
}

const StyleDiv = styled('div') <Props>`
  --main-header-height:3rem;
  position: absolute;
  display: flex;
  top:var(--ab-nav-height);
  width: 100%;

  main{
    position: absolute;
    left:${props => props.wide ? '15rem' : '6rem'};
    /*top:var(--main-header-height);*/
    width: 100%;
    transition: all 200ms ease;
    flex:1;
  }
  .chat_header{
    background-color: #fff;
    position: fixed;
    z-index:999;
    width:100%;
    height: var(--main-header-height);
    border-bottom:1px solid var(--ab-grey-100);
  }
  .chat_container{
    position: absolute;
    top:var(--main-header-height);
  }
`;

export default StyleDiv;