import styled from 'styled-components';

const StyleDiv = styled('div')`
  .friend_info{
    position: relative;
    display: flex;
    align-items: center;
    width:35vw;
    padding:.5rem;
    cursor: pointer;
    border-radius: 5px;
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