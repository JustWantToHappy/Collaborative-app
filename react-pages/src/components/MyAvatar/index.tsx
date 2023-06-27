import React from 'react';
import { Avatar } from 'antd';

interface Props {
  src?: string;
  size?: 'large' | 'small' | 'default'
  style?: React.CSSProperties;
  children?: string;
  length?: number;
}

const Index = React.forwardRef<HTMLSpanElement, Props>((props = { length: 2, size: 'default' }, ref) => {
  const { src, style, size = 'large', length=1 } = props;
  const reactiveSize = { xs: 30, sm: 32, md: 36, lg: 38, xl: 40, xxl: 50 };

  if (src) return <Avatar
    ref={ref}
    size={size ? size : reactiveSize}
    src={`/api/${src}`}
    style={style} />;

  else {
    return <Avatar
      ref={ref}
      style={style}
      //响应式
      size={size ? size : reactiveSize}
    >
      {props.children?.slice(0, length)}
    </Avatar >;
  }
});

export default Index;