import styled from 'styled-components';

const StyleDiv = styled('div')`

  .invite{
    display: flex;
    column-gap: 1rem;
  }
  
  .users{
    max-height: 300px;
    overflow: auto;
    overflow-x: hidden;
    margin-top:1rem;
  }
`;

export default StyleDiv;