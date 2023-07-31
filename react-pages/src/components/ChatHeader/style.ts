import styled from 'styled-components';

const StyleDiv = styled('div')`
    display: flex;
    position: relative;
    
    &>div{
        padding-left:.5rem;
        line-height: var(--ab-main-header-height);
        position: absolute;
        right:0;
    }
`;

export default StyleDiv;