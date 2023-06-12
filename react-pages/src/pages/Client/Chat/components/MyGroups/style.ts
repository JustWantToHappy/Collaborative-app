import styled from 'styled-components';
import {ellipsis } from '@/common/css';

const StyleDiv = styled('div')`
 .group_info{
    position: relative;
    padding:.5rem;
    cursor: pointer;
    border-radius: 5px;
    overflow: hidden;
    height:4rem;
    display: flex;
    align-items: center;
    &>div{
      flex:4;
    }

    &>h5{
      flex:1;
      ${ellipsis};
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