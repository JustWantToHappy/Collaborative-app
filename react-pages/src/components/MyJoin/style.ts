import styled from 'styled-components';
import {ellipsis } from '@/common';

const StyleDiv = styled('div')`
  .friend_info{
    position: relative;
    display: grid;
    grid-template-columns: repeat(3,1fr);
    align-items: center;
    padding:.5rem;
    padding-right:9vw;
    cursor: pointer;
    border-radius: 5px;
    height:4rem;
    h5{
      ${ellipsis};
    }
    &>span:last-of-type{
      ${ellipsis};
    }
    &>small{
      position: absolute;
      right:1rem;
      display: none;
    }
    &:hover{
      background-color: var(--ab-grey-200);
      &>small{
        display: inline;
      }
    }
  }
`;

export default StyleDiv;