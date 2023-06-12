import styled from 'styled-components';

const StyleDiv = styled('div')`
  .friend_info{
    position: relative;
    display: flex;
    align-items: center;
    padding:.5rem;
    padding-right:10vw;
    cursor: pointer;
    border-radius: 5px;
    height:4rem;
    overflow: hidden;
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