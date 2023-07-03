import styled from 'styled-components';
import PageNotFoundSvg from '@/assets/logo/404.svg';

const StyleDiv = styled.div`
  text-align: center;

  @media screen and (min-width:768px){
    img{
      width:50%;
    }  
  }

  @media screen and (max-width:768px){
    img{
      width:70%;
    }
  }
`;

export default function Index() {
  return (
    <StyleDiv>
      <h1>404</h1>
      {/*<img src={PageNotFoundSvg} />*/}
    </StyleDiv>
  );
}
