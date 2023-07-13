import styled from 'styled-components';

const StyleDiv = styled('div')`
  display: flex;
  gap: 2rem;
  @media screen and (max-width:768px){
    flex-direction: column;
  }

  .apply_friend{
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
  }
  
  .apply_team{
    display:flex;
    flex-direction: column;
    row-gap: 1rem;
  }
`;

export default StyleDiv;