import styled from 'styled-components';

const StyleDiv = styled('div')<{show:boolean,mode?:string}>`
  position: absolute;
  top:0;
  right: 0;
  min-width: 200px;
  transition: all 300ms ease;
  opacity: ${props=>props.show?1:0};
  z-index:${props=>props.show?1:-1};
  border-radius: 1rem;
  background-color:${props=>props.mode==='dark'?'var(--ab-dark-color)':'var(--ab-light-color)'};
  box-shadow: ${props=>props.mode==='dark'?'var(--ab-green-800) -4px 9px 25px -6px':'rgba(0, 0, 0, 0.2) -4px 9px 25px -6px'};

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
      overflow: hidden;
      cursor: pointer;
      margin-bottom:.5rem;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      column-gap:.5rem;
      padding:1rem .5rem;
      border-radius: .5rem;
      transition: background-color 200ms ease;
      &:hover{
        background-color: ${props=>props.mode==='dark'?'var(--ab-gray-500)':'var(--ab-gray-200)'};
      }
    }
  }

  .member_info{
    display: flex;
    align-items: center;
    column-gap: .5rem;
    &>small{
      float:right;
    }
  }

  .member_state{
    position: absolute;
    right:.5rem;
    bottom:0;
    color:grey;
  }
  .active{
    color:var(--ab-green-600);
  }
`;

export default StyleDiv;