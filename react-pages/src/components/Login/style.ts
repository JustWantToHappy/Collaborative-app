import styled from 'styled-components';

const StyleDiv = styled('div')`
  .login_btn{
    /*float:right;*/
    width:100%;
  }
  @media screen and (min-width:580px){
    .login_btn{
      width:80%;
    }
  }
  .selected{
    display: flex;
    justify-content: flex-end;
    letter-spacing: 1px;
  }
`;

export default StyleDiv;