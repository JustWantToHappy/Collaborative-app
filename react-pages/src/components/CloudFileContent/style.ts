import styled from 'styled-components';

const StyleDiv = styled('div')`
  width:100%;

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

  .cloud_delete{
    cursor: pointer;
  }

  .rowClassName{
    background-color: #000;
    color: #fff;
  }

`;

export default StyleDiv;