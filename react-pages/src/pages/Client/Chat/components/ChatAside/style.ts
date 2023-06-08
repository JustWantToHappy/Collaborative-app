import styled from 'styled-components';

interface Props{
  wide:boolean
}

const StyleDiv = styled('div')<Props>`
  position: relative;
  i{
    float:right;
    cursor: pointer;
    &:hover{
      color:var(--ab-green-600);
    }
  }

  p{
    margin:0;
    display: ${props=>props.wide?'block':'none'};
  }

  header{
    padding:1rem .5rem;
    text-align: center;
    height:var(--ab-main-header-height);
  }

  h4{
    margin:0;
  }
  
  .chat{
    &_aside{
      height: 100%;
      height:calc(100vh - var(--ab-nav-height) - var(--ab-main-header-height));
      overflow: auto;
      overflow-x: hidden;
      margin: 0;
    }

    &_item{
      display: ${props=>props.wide?'grid':'flex'};
      grid-template-columns: repeat(4,1fr);
      position: relative;
      padding:.5rem 1rem;
      font-size:.8rem;
      column-gap:.5rem;
      height:4rem;
      overflow: hidden;
      transition: background-color 100ms linear;

      &>div{
        grid-column: 1/2;
        grid-row:1/3;
      }
      
      &>p:first-of-type{
        grid-column: 2/5;
        grid-row:1/2;
      }
      &>p:last-of-type{
        grid-column: 2/5;
        grid-row:2/3;
      }

      &>small{
        font-weight: 100;
        position:absolute;
        right:0;
        display: ${props=>props.wide?'block':'none'};
      }
      &:hover{
        background-color: var(--ab-grey-200);
        cursor: pointer;
      }
    }
  }
  
  .chat_item_avatar{
    display: flex;
    align-items: center;
    img{
      width:100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  
 /* .chat_aside::-webkit-scrollbar {
    width:6px;
  }
  .chat_aside::-webkit-scrollbar-track {
    border-radius:4px;
  }
  .chat_aside::-webkit-scrollbar-thumb {
    border-radius:10px;
    background:var(--ab-green-400);
  }
  .chat_aside::-webkit-scrollbar-thumb:window-inactive {
    background:var(--ab-green-400);
  }*/

`;

export default StyleDiv;