import styled from 'styled-components';
import {ellipsis } from '@/common';

const StyleDiv = styled('div')`
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  @media screen and (max-width:768px){
    flex-direction: column;
  }

  &>div{
    min-width:300px;
  }

  .panel{
    &>p{
      margin:0 0 1rem 0;
    }
    padding: 1rem;
    border-radius:.5rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }

  .panel_info{
    position: relative;
    display: grid;
    grid-template-columns:1fr 1fr 2fr 1fr;
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