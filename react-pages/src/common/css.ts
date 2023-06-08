import {css} from 'styled-components';

//多行文本省略
export const ellipsis = css`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -moz-box; /* Firefox */
    -moz-box-orient: vertical;
    display: box;
    box-orient: vertical;
`;

