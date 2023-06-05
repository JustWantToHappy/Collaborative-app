import styled from 'styled-components';

interface Props{
  wide: boolean;
}

const StyleDiv = styled('div')<Props>`
  position: absolute;
  display: flex;
  top:var(--ab-nav-height);

  main{
    position: absolute;
    left:${props => props.wide ? '15rem' : '6rem'};
    transition: all 200ms ease;
    height:calc(100vh - var(--ab-nav-height));
    flex:1;
  }
  .chat_header{
    width:100%;
    height:12%;
    box-shadow: 0 1px 2px -1px var(--ab-green-300);
  }
`;

export default StyleDiv;