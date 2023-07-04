import React from 'react';
import { FileType } from '@/enum';
import { StyleDiv } from '@/common';
import { useDebouce } from '@/hooks';
import Badges from '@/components/Badges';
import { Button, Tree, Popover, message } from 'antd';
import AddFileModal from '@/components/AddFileModal';
import { getFilesTree, getFolderContents, deleteFolder } from '@/api';
import type { DataNode, DirectoryTreeProps } from 'antd/es/tree';
import { useNavigate, useLocation, Outlet, useParams } from 'react-router-dom';

const { DirectoryTree } = Tree;

export default function Index() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { cloudFileId } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = React.useState(false);
  const [tree, setTree] = React.useState<DataNode[]>([]);
  const [disabled, setDisabled] = React.useState(false);
  const [type, setType] = React.useState<FileType>(FileType.Folder);


  const onSelect: DirectoryTreeProps['onSelect'] = async (_, info) => {
    info.node.isLeaf ? setDisabled(true) : setDisabled(false);
    const { statusCode, data } = await getFolderContents(info.node.key + '');
    if (statusCode === 200) {
      navigate(`/cloud/file/${info.node.key}`);
    } else {
      navigate('/cloud');
    }
  };

  const close = () => setOpen(false);

  const buildFile = () => {
    setType(FileType.Image);
    setOpen(true);
  };

  const buildFolder = () => {
    setType(FileType.Folder);
    setOpen(true);
  };

  const buildCloudDocument = () => {
    setType(FileType.Text);
    setOpen(true);
  };

  const shareFile = useDebouce(async () => {
    //
  }, 300);


  const deleteFile = useDebouce(async () => {
    const { statusCode, msg } = await deleteFolder(cloudFileId ?? '');
    if (statusCode === 200) {
      getData();
      navigate('/cloud');
    } else {
      messageApi.error(`${statusCode} ${msg}`);
    }
  }, 300);

  const updateFileTree = () => {
    getData();
  };
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
              <Button
                type='link'
                disabled={disabled}
                onClick={buildFolder}>
                新建文件夹&emsp;
              </Button>
              <Button
                type='link'
                disabled={disabled}
                onClick={buildFile}>
                上传文件&emsp;&emsp;
              </Button>
              <Button
                type='link'
                disabled={disabled}
                onClick={buildCloudDocument}>
                新建文档&emsp;&emsp;
              </Button>
            </div>}>
            <Button size='small'>+</Button>
          </Popover>
        </div>
        <DirectoryTree
          multiple
          onSelect={onSelect}
          treeData={tree}
        />
      </aside>
      <main>
        <div className='header cloud_header'>
          <Badges />
          <div className='cloud_share'>
            <Button
              type='primary'
              disabled={pathname === '/cloud'}
              onClick={shareFile} >
              共享
            </Button>
            <Button
              danger
              disabled={pathname === '/cloud'}
              type='primary'
              onClick={deleteFile}>
              删除
            </Button>
          </div>
        </div>
        <div className='container cloud_container'>
          <Outlet />
        </div>
      </main>
    </StyleDiv >
  );
}
