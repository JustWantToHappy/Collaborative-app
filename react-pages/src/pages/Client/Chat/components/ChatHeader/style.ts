import styled from 'styled-components';

const StyleDiv = styled('div') <{ wide: boolean }>`
    background-color: #fff;
    width:${props=>props.wide?'calc(100% - 16rem)':'calc(100% - 6rem)'};
    position: fixed;
    z-index:999;
    height: var(--chat-header-height);
    border-bottom:1px solid var(--ab-grey-100);
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export default StyleDiv;