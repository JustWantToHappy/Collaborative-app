import styled from 'styled-components';

const StyleDiv = styled('div')`
  h5{
    margin:2px 0;
  }
  .notify_item{
    &:hover{
      background-color: var(--ab-grey-200);
    }
    padding:5px 1rem;
    border-radius: 5px;
    min-width:300px;
    overflow: hidden;
    height: 5rem;
    display:grid;
    grid-template-columns: 1fr 3fr 3fr;
    column-gap:.5rem;
    align-items: center;
    
    &>div{
      display:inline-block;
    }
  }
`;

export default StyleDiv;