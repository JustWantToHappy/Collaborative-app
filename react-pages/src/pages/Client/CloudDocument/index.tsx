import React from 'react';
import { StyleDiv } from '@/common';
import Badges from '@/components/Badges';
import AddFileModal from '@/components/AddFileModal';
import { useNavigate } from 'react-router-dom';
import { Button, Tree, Table, Popover } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import type { DataNode, DirectoryTreeProps } from 'antd/es/tree';

const { Column } = Table;
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
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState<'file' | 'folder' | 'subfolder'>('file');

  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('Trigger Select', keys, info);
    navigate(`/cloud/${info.node.key}`);
  };

  const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
    console.log('Trigger Expand', keys, info);
  };

  const close = () => setOpen(false);

  const buildFile = () => {
    setType('file');
    setOpen(true);
  };

  const buildFolder = () => {
    setType('folder');
    setOpen(true);
  };

  const buildSubFolder = () => {
    setType('subfolder');
    setOpen(true);
  };

  return (
    <StyleDiv asideWidth={'15rem'}>
      <AddFileModal open={open} type={type} close={close} />
      <aside>
        <div className='cloud_add'>
          <h4>目录</h4>
          <Popover
            arrow={false}
            placement='bottom'
            content={<div style={{ display: 'flex', flexDirection: 'column' }}>
              <Button type='link' onClick={buildFolder}>新建顶层文件夹</Button>
              <Button type='link' onClick={buildSubFolder}>新建子文件夹&emsp;</Button>
              <Button type='link' onClick={buildFile}>新建子文件&emsp;&emsp;</Button>
            </div>}>
            <Button size='small'>+</Button>
          </Popover>
        </div>
        <DirectoryTree
          multiple
          onSelect={onSelect}
          onExpand={onExpand}
          treeData={treeData}
        />
      </aside>
      <main>
        <div className='header cloud_header'>
          <Badges />
          <div className='cloud_share'>
            <Button type='primary'>共享</Button>
            <Button type='primary' danger>删除</Button>
          </div>
        </div>
        <div className='container'>
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
        </div>
      </main>
    </StyleDiv>
  );
}
