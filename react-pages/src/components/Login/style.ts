import styled from 'styled-components';

const StyleDiv = styled('div')`
  @media screen and (max-width:576px){
   .login_btn{
    margin-top:1rem;
    } 
  }
  .selected{
    /*background-color: red;*/
    display: flex;
    justify-content: flex-end;
    letter-spacing: 1px;
  }
`;

export default StyleDiv;