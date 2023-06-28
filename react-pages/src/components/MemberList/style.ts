import styled from 'styled-components';

const StyleDiv = styled('div')<{show:boolean}>`
  position: absolute;
  right: 0;
  min-width: 140px;
  transition: all 300ms ease;
  opacity: ${props=>props.show?1:0};
  z-index:${props=>props.show?1:-1};
  border-radius: 1rem;
  background-color: var(--ab-white-100);
  box-shadow: rgba(0, 0, 0, 0.2) -4px 9px 25px -6px;

  .member_header{
    padding:1rem 1rem 0 1rem;
    margin:0;
    line-height: 1.5rem;
    text-align: center;
    position: relative;

    &>img{
      position: absolute;
      height:1.5rem;
      right:.5rem;
      cursor: pointer;
      &:hover{
        transform: scale(1.1);
      }
    }
  }

  .member_container{
    padding:0 .5rem;
    &>li{
      cursor: pointer;
      margin-bottom:.5rem;
      display: flex;
      align-items: center;
      column-gap:.5rem;
      padding:2px .5rem;
      border-radius: .5rem;
      transition: background-color 200ms ease;
      &:hover{
        background-color: var(--ab-grey-200);
      }
    }
  }

  .member_state{
    display: flex;
    flex-direction:column ;
    justify-content: center;
  }
`;

export default StyleDiv;