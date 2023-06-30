import { Badge, Space } from 'antd';
import React from 'react';

const Index: React.FC<{ style?: React.CSSProperties }> = (props) => {
  return (
    <Space style={props.style ?? { left: '2rem' }}>
      <Badge status="success" />
      <Badge color='blue' />
      <Badge status="warning" />
    </Space>
  );
};

export default Index;