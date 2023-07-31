import styled from 'styled-components';
import {ellipsis } from '@/common';

interface Props{
  wide: boolean,
  mode?: string;
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
    ${ellipsis};
    line-height: 1.5rem;
    display: ${props => props.wide ? 'flex-box' : 'none'};
  }

  header{
    padding:1rem .5rem;
    display: flex;
    align-items: center;
    height:var(--ab-main-header-height);
    justify-content: center;
    position: relative;
    &>i{
      position: absolute;
      right:.5rem;
    }
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
      justify-content: center;
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

      &_date{
        font-weight: 100;
        position:absolute;
        top: 0.5rem;
        right:.5rem;
        display: ${props=>props.wide?'block':'none'};
      }

      &:hover{
        background-color: ${props=>props.mode==='dark'?'var(--ab-gray-400)':'var(--ab-gray-200)'};

        cursor: pointer;
      }
      &:hover>span{
        display: block;
      }
      &>span{
        position: absolute;
        z-index:1000;
        bottom:.5rem;
        right:.5rem;
        display: none;
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