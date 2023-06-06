import styled from 'styled-components';

interface Props{
  wide: boolean;
}

const StyleDiv = styled('div')<Props>`
  position: absolute;
  display: flex;
  top:var(--ab-nav-height);
  width: 100%;

  main{
    position: absolute;
    left:${props => props.wide ? '15rem' : '6rem'};
    width: 100%;
    transition: all 200ms ease;
    flex:1;
  }
  .chat_header{
    position: fixed;
    width:100%;
    height: 3rem;
    border-bottom:1px solid var(--ab-grey-100);
  }
`;

export default StyleDiv;