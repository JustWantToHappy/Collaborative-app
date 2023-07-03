import React from 'react';
import { StyleDiv } from '@/common';
import { useDebouce } from '@/hooks';
import { getFilesTree, getFolderContents } from '@/api';
import Badges from '@/components/Badges';
import { Button, Tree, Popover, message } from 'antd';
import AddFileModal from '@/components/AddFileModal';
import { useNavigate, useLocation, Outlet, useParams } from 'react-router-dom';
import type { DataNode, DirectoryTreeProps } from 'antd/es/tree';

export type TreeNode = DataNode & { type: 'image' | 'cloudDocument' };
const { DirectoryTree } = Tree;

export default function Index() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { cloudFileId = '0' } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = React.useState(false);
  const [tree, setTree] = React.useState<TreeNode[]>([]);
  const [type, setType] = React.useState<'file' | 'folder' | 'cloudDocument'>('file');
  const [isCloudDocument, setIsCloudDocument] = React.useState(false);


  const onSelect: DirectoryTreeProps['onSelect'] = async (_, info: any) => {
    if (info.node?.type === 'image') {
      setIsCloudDocument(false);
    } else if (info.node?.type === 'cloudDocument') {
      setIsCloudDocument(true);
    } else {
      setIsCloudDocument(false);
      const { statusCode, data } = await getFolderContents(info.node.key + '');
      if (statusCode === 200) {
        navigate(`/cloud/file/${info.node.key}`);
      } else {
        navigate('/cloud');
      }
    }
  };

  /*  const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
      console.info(info.node);
    };*/

  const close = () => setOpen(false);

  const buildFile = () => {
    setType('file');
    setOpen(true);
  };

  const buildFolder = () => {
    setType('folder');
    setOpen(true);
  };

  const buildCloudDocument = () => {
    setType('cloudDocument');
    setOpen(true);
  };

  const shareFile = useDebouce(async () => {
    if (pathname === '/cloud') {
      messageApi.warning('你还没有选择任何文件或文件夹');
    } else {
      //
    }
  }, 300);

  const updateFileTree = () => {
    getData();
  };

  const deleteFile = useDebouce(async () => {
    if (pathname === '/cloud') {
      messageApi.warning('你还没有选择任何文件或文件夹');
    } else {
      //
    }
  }, 300);

  const getData = React.useCallback(async () => {
    const { statusCode, data } = await getFilesTree();
    if (statusCode === 200) {
      setTree(data || []);
    }
  }, []);

  React.useEffect(() => {
    getData();
  }, [getData]);

  return (
    <StyleDiv asideWidth={'15rem'}>
      {contextHolder}
      <AddFileModal
        open={open}
        type={type}
        close={close}
        updateFileTree={updateFileTree} />
      <aside>
        <div className='cloud_add'>
          <h4>目录</h4>
          <Popover
            arrow={false}
            placement='bottom'
            content={<div style={{ display: 'flex', flexDirection: 'column' }}>
              <Button type='link' onClick={buildFolder}>新建文件夹&emsp;</Button>
              <Button type='link' onClick={buildFile}>上传文件&emsp;&emsp;</Button>
              <Button type='link' onClick={buildCloudDocument}>新建文档&emsp;&emsp;</Button>
            </div>}>
            <Button size='small'>+</Button>
          </Popover>
        </div>
        <DirectoryTree
          multiple

          onSelect={onSelect}
          //onExpand={onExpand}
          treeData={tree}
        />
      </aside>
      <main>
        <div className='header cloud_header'>
          <Badges />
          <div className='cloud_share'>
            {/* 只有文档才可以共享 */}
            <Button type='primary' onClick={shareFile} disabled={!isCloudDocument}>共享</Button>
            <Button type='primary' danger onClick={deleteFile}>删除</Button>
          </div>
        </div>
        <div className='container cloud_container'>
          <Outlet />
        </div>
      </main>
    </StyleDiv >
  );
}
