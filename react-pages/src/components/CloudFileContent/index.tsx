import React from 'react';
import { Table } from 'antd';
import StyleDiv from './style';
import { DeleteOutlined } from '@ant-design/icons';

interface DataType {
  key: React.Key;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  tags: string[];
}

const data: DataType[] = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const { Column } = Table;

const Index = () => {
  return (
    <StyleDiv>
      <Table dataSource={data} style={{ width: '100%', minWidth: '400px' }}>
        <Column title="名称" dataIndex="age" key="age" />
        <Column title="创建时间" dataIndex="address" key="address" />
        <Column title="修改时间" dataIndex="address" key="address" />
        <Column title="简介" dataIndex="address" key="address" />
        <Column
          title="操作"
          key="action"
          align='center'
          render={(_: any, record: DataType) => (
            <DeleteOutlined className='cloud_delete' />
          )}
        />
      </Table>
    </StyleDiv>
  );
};

export default Index;