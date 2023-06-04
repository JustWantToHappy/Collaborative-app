import React from 'react';
import StyleDiv from './style';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

export default function Index() {
  const [wide, setWide] = React.useState(true);

  return (
    <StyleDiv wide={wide}>
      <i onClick={() => setWide(!wide)}>
        {wide ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
      </i>
      <header>
        <h4>消息</h4>
      </header>
      <ul>
        <li></li>
      </ul>
    </StyleDiv>
  );
}
