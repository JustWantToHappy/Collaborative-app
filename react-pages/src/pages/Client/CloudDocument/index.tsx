import React from 'react';
import { Button, Tree, Space, Table, Tag } from 'antd';
import { StyleDiv } from '@/common';
import Badges from '@/components/Badges';
import type { DataNode, DirectoryTreeProps } from 'antd/es/tree';
const { Column, ColumnGroup } = Table;

const { DirectoryTree } = Tree;

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

const treeData: DataNode[] = [
  {
    title: 'parent 0',
    key: '0-0',
    children: [
      { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
      { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
    ],
  },
  {
    title: 'parent 1',
    key: '0-1',
    children: [
      { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
      { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
    ],
  },
];


export default function Index() {
  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('Trigger Select', keys, info);
  };

  const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
    console.log('Trigger Expand', keys, info);
  };

  return (
    <StyleDiv asideWidth={'15rem'}>
      <aside >
        <h4 style={{ marginLeft: '.5rem' }}>目录</h4>
        <DirectoryTree
          multiple
          defaultExpandAll
          onSelect={onSelect}
          onExpand={onExpand}
          treeData={treeData}
        />
      </aside>
      <main>
        <div className='header clouddocument_header'>
          <Badges />
          <div>
            <Button type='primary' size='small'>创建文件</Button>
            <Button type='primary' size='small' style={{ marginLeft: '.5rem' }}>创建文件夹</Button>
            <Button type='primary' danger size='small' style={{ marginLeft: '.5rem' }}>删除此文件夹</Button>
          </div>
        </div>
        <div className='container' style={{}}>
          <Table dataSource={data}>
            <ColumnGroup title="Name">
              <Column title="First Name" dataIndex="firstName" key="firstName" />
              <Column title="Last Name" dataIndex="lastName" key="lastName" />
            </ColumnGroup>
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
          </Table>
        </div>
      </main>
    </StyleDiv>
  );
}
