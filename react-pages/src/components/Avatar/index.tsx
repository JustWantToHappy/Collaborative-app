import React from 'react';
import { Avatar } from 'antd';

interface Props {
  src?: string;
  style?: React.CSSProperties;
  children?: string;
}

const Index: React.FC<Props> = (props) => {
  const { src, style } = props;

  return (
    <Avatar
      src={src}
      style={style}
      //响应式
      size={{ xs: 30, sm: 32, md: 36, lg: 38, xl: 40, xxl: 50 }}
    >
      {props.children?.slice(0, 1)}
    </Avatar >
  );
};

export default Index;