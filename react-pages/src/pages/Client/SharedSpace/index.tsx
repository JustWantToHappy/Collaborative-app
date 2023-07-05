import React from 'react';
import { StyleDiv } from '@/common';
import { useDebouce } from '@/hooks';
import Badges from '@/components/Badges';
import AddUserSvg from '@/assets/logo/addUser.svg';
import CollaborativeEditor from '@/components/CollaborativeEditor';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import type { DataNode, DirectoryTreeProps } from 'antd/es/tree';
import { Button, Popover, message, Avatar, Tooltip, Tree } from 'antd';

const { DirectoryTree } = Tree;

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
  const [loading, setLoading] = React.useState(false);
  const [maxCount, setMaxCount] = React.useState(2);
  const [messageApi, contextHolder] = message.useMessage();
  const [editor, setEditor] = React.useState(false);//默认是只读模式

  const throttledClick = useDebouce(() => {
    setLoading(true);
    if (!editor) {
      setTimeout(() => {
        setEditor(editor => !editor);
        setLoading(false);
      }, 1000);
    } else {
      setEditor(editor => !editor);
      setLoading(false);
    }
  }, 300);
  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('Trigger Select', keys, info);
  };

  const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
    console.log('Trigger Expand', keys, info);
  };

  return (
    <StyleDiv asideWidth={'15rem'}>
      {contextHolder}
      <aside >
        <div className='cloud_tool'>
          <h4>目录</h4>
        </div>
        <DirectoryTree
          multiple
          defaultExpandAll
          onSelect={onSelect}
          onExpand={onExpand}
          treeData={treeData}
        />
      </aside>
      <main>
        <div className='header shared_header'>
          <Badges />
          <div className='shared_editor'>
            <div onMouseOver={() => setMaxCount(0)} onMouseLeave={() => setMaxCount(2)}>
              <Avatar.Group
                maxCount={maxCount}
                size="large"
                style={{ display: editor ? 'block' : 'none' }}
                maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
              >
                <Tooltip title='sb' placement='top'>
                  <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3" />
                </Tooltip>
                <Tooltip title="Ant User" placement="top">
                  <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                </Tooltip>
              </Avatar.Group>
            </div>
            <Popover content={<span>协作</span>} placement='bottom' arrow={false}>
              <Button type='text'>
                <img src={AddUserSvg} style={{ width: '1.5rem' }} />
              </Button>
            </Popover>
            <Button type={editor ? 'default' : 'primary'} onClick={throttledClick} loading={loading}>
              {editor ? '更新' : '编辑'}
            </Button>
          </div>
        </div>
        <div className='container' style={{ padding: 0 }}>
          <CollaborativeEditor editable={editor} />
        </div>
      </main>
    </StyleDiv >
  );
}
