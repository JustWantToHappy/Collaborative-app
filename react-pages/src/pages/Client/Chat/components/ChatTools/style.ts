import styled from 'styled-components';

const StyleDiv = styled('div')`
  h3{
    margin:0;
    margin-bottom:.5rem;
  }
  .apply_friend{
    display: flex;
  }

  .apply_team{
    display:flex;
  }
  .invite_records{
    display: flex;
    align-items: center;
    column-gap:1vw;
  }
  &>div{
    margin-bottom:2rem;
  }
`;

export default StyleDiv;