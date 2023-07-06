import React from 'react';
import { FileType } from '@/enum';
import { StyleDiv } from '@/common';
import PubSub from 'pubsub-js';
import { useDebouce } from '@/hooks';
import Badges from '@/components/Badges';
import { getCloudFilesTree, deleteCloudFolder } from '@/api';
import AddFileModal from '@/components/AddFileModal';
import ShareFileModal from '@/components/ShareFileModal';
import CloudFileContent from '@/components/CloudFileContent';
import type { DataNode, DirectoryTreeProps } from 'antd/es/tree';
import { DeleteOutlined, EditOutlined, ShareAltOutlined, WarningOutlined } from '@ant-design/icons';
import { Button, Tree, Popover, message, Popconfirm } from 'antd';
import { useNavigate, useLocation, Outlet, useParams } from 'react-router-dom';

const { DirectoryTree } = Tree;

export default function Index() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { cloudFileId = '0' } = useParams();
  const [isDocument, setIsDocument] = React.useState(false);
  const [edit, setEdit] = React.useState(false);//false表示只读模式，true表示编辑模式
  const [disabled, setDisabled] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [tree, setTree] = React.useState<DataNode[]>([]);
  const [openAddFileModal, setOpenAddFileModal] = React.useState(false);
  const [openShareFileModal, setOpenShareFileModal] = React.useState(false);
  const [selectedKey, setSelectedKey] = React.useState(cloudFileId);
  const [type, setType] = React.useState<FileType>(FileType.Folder);

  const onSelect: DirectoryTreeProps['onSelect'] = async (_, info) => {
    info.node.isLeaf ? setDisabled(true) : setDisabled(false);
    navigate(`/cloud/file/${info.node.key}`);
    setSelectedKey(info.node.key + '');
    setIsDocument(false);
    setEdit(false);
  };

  const buildFile = () => {
    setType(FileType.Image);
    setOpenAddFileModal(true);
  };

  const buildFolder = () => {
    setType(FileType.Folder);
    setOpenAddFileModal(true);
  };

  const buildCloudDocument = () => {
    setType(FileType.Text);
    setOpenAddFileModal(true);
  };

  const shareFile = () => setOpenShareFileModal(true);
  const closeAddFileModal = () => setOpenAddFileModal(false);
  const closeShareFileModal = () => setOpenShareFileModal(false);



  const deleteFile = useDebouce(async () => {
    const { statusCode, msg } = await deleteCloudFolder(cloudFileId ?? '');
    if (statusCode === 200) {
      updateFileTree();
      messageApi.success('删除成功');
      navigate('/cloud');
    } else {
      messageApi.error(`${statusCode} ${msg}`);
    }
  }, 300);

  const updateFileTree = React.useCallback(async () => {
    const { statusCode, data } = await getCloudFilesTree();
    if (statusCode === 200) {
      setTree(data || []);
    }
  }, []);

  React.useEffect(() => {
    PubSub.publish('changeEditable', edit);
  }, [edit]);

  React.useEffect(() => {
    if (pathname === '/cloud') {
      setDisabled(false);
      setSelectedKey('0');
    }
  }, [pathname]);

  React.useEffect(() => {
    updateFileTree();
    const updateFilesTreeToken = PubSub.subscribe('updateFilesTree', () => updateFileTree());
    const setEditableToken = PubSub.subscribe('isDocument', (_, isDocument: boolean) => setIsDocument(isDocument));
    return function () {
      PubSub.unsubscribe(updateFilesTreeToken);
      PubSub.unsubscribe(setEditableToken);
    };
  }, [updateFileTree]);


  return (
    <StyleDiv asideWidth={'15rem'}>
      {contextHolder}
      <AddFileModal
        open={openAddFileModal}
        type={type}
        close={closeAddFileModal}
        cloudFileId={cloudFileId}
        updateFileTree={updateFileTree} />
      <ShareFileModal open={openShareFileModal} close={closeShareFileModal} />
      <aside>
        <div className='cloud_tool'>
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
          selectedKeys={[selectedKey]}
          onSelect={onSelect}
          treeData={tree}
        />
      </aside>
      <main>
        <div className='header cloud_header'>
          <Badges />
          <div className='cloud_share'>
            <Button type='primary' onClick={() => navigate('/cloud')}>顶层目录</Button>
            <Popover
              arrow={false}
              content={<div style={{ display: 'flex', flexDirection: 'column' }}>
                <Button
                  type='link'
                  disabled={pathname === '/cloud'}
                  onClick={shareFile} >
                  <ShareAltOutlined />共享
                </Button>
                <Button
                  onClick={() => setEdit(edit => !edit)}
                  disabled={!isDocument}
                  type='link'>
                  <EditOutlined />
                  {!edit ? '编辑' : '更新'}
                </Button>
                {pathname !== '/cloud' && <Popconfirm
                  title="删除文件"
                  description="你确定删除这个文件?"
                  onConfirm={deleteFile}
                  icon={<WarningOutlined />}
                  okText="确定"
                  cancelText="取消"
                >
                  <Button
                    danger
                    type='link'>
                    <DeleteOutlined />
                    删除
                  </Button>
                </Popconfirm>}
              </div>}>
              <Button >更多操作</Button>
            </Popover>
          </div>
        </div>
        <div className='container cloud_container'>
          <CloudFileContent show={pathname === '/cloud'} />
          <Outlet />
        </div>
      </main>
    </StyleDiv >
  );
}
