import React from 'react';
import { Space, Table, Tag } from 'antd';
const { Column } = Table;

interface DataType {
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  tags: string[];
}

const data: DataType[] = [
  {
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const Index: React.FC = () => {
  const [pagination, setPagination] = React.useState({ current: 1, total: 1000, pageSize: 6 });

  return <Table
    rowKey='firstName'
    dataSource={data}
    pagination={{
      ...pagination,
      showSizeChanger: false,
      onChange(page, pageSize) {
        setPagination({ ...pagination, pageSize, current: page });
      },
    }}>
    <Column title="Age" dataIndex="age" key="age" />
    <Column title="Address" dataIndex="address" key="address" />
    <Column
      title="Tags"
      dataIndex="tags"
      key="tags"
      render={(tags: string[]) => (
        <>
          {tags.map((tag) => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      )}
    />
    <Column
      title="Action"
      key="action"
      render={(_: any, record: DataType) => (
        <Space size="middle">
          <a>Invite {record.lastName}</a>
          <a>Delete</a>
        </Space>
      )}
    />
  </Table>;
};

export default Index;