import styled from 'styled-components';

type Props = {
  show?: boolean;
}

const StyleDiv = styled('div')<Props>`
  width:100%;
  display: ${props=>props.show===false?'none':'block'};

  .file_type{
    color:var(--ab-green-500);
    &:hover{
      cursor: pointer;
      color:var(--ab-green-600);
    }
  }

  .file_image{
    padding:1rem;
    text-align: center;
  }
`;

export default StyleDiv;