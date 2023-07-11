import React from 'react';
import PubSub from 'pubsub-js';
import { FileType } from '@/enum';
import { StyleDiv } from '@/common';
import { useDebouce } from '@/hooks';
import Badges from '@/components/Badges';
import AddFileModal from '@/components/AddFileModal';
import ShareFileModal from '@/components/ShareFileModal';
import { getCloudFilesTree, deleteCloudFolder } from '@/api';
import CloudFileContent from '@/components/CloudFileContent';
import type { DataNode, DirectoryTreeProps } from 'antd/es/tree';
import { Button, Tree, Popover, message, Popconfirm } from 'antd';
import { useNavigate, useLocation, Outlet, useParams } from 'react-router-dom';
import { DeleteOutlined, EditOutlined, ShareAltOutlined, WarningOutlined } from '@ant-design/icons';

const { DirectoryTree } = Tree;

export default function Index() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { cloudFileId = '0' } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const [tree, setTree] = React.useState<DataNode[]>([]);
  const [state, setState] = React.useState({
    loading: false,
    isDocument: false,
    edit: false,
    disabled: false,
    openAddFileModal: false,
    openShareFileModal: false,
    selectedKey: cloudFileId,
    type: FileType.Folder
  });

  const onSelect: DirectoryTreeProps['onSelect'] = async (_, info) => {
    if (info.node.key === cloudFileId) {
      return;
    }
    navigate(`/cloud/file/${info.node.key}`);
    setState({
      ...state,
      disabled: info.node.isLeaf ?? false,
      selectedKey: info.node.key + '',
      isDocument: false, edit: false
    });
  };

  const buildFile = () => setState({ ...state, type: FileType.Image, openAddFileModal: true });
  const buildFolder = () => setState({ ...state, type: FileType.Folder, openAddFileModal: true });
  const buildCloudDocument = () => setState({ ...state, type: FileType.Text, openAddFileModal: true });
  const shareFile = () => setState({ ...state, openShareFileModal: true });
  const closeAddFileModal = () => setState({ ...state, openAddFileModal: false });
  const closeShareFileModal = () => setState({ ...state, openShareFileModal: false });


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

  const editUpdateClick = useDebouce(() => {
    setState({ ...state, loading: true });
    if (!state.edit) {
      setTimeout(() => {
        PubSub.publish('changeEdit', true);
        setState({ ...state, edit: true, loading: false });
      }, 1000);
    } else {
      PubSub.publish('changeEdit', false);
      setState({ ...state, edit: false, loading: true });
    }
  }, 300);

  const updateFileTree = React.useCallback(async () => {
    const { statusCode, data } = await getCloudFilesTree();
    if (statusCode === 200) {
      setTree(data || []);
    }
  }, []);

  React.useEffect(() => {
    if (pathname === '/cloud') {
      setState(state => ({ ...state, disabled: false, selectedKey: '0' }));
    }
  }, [pathname]);

  React.useEffect(() => {
    updateFileTree();
    const updateFilesTreeToken = PubSub.subscribe('updateFilesTree', () => updateFileTree());
    const setEditableToken = PubSub.subscribe('isDocument', (_, isDocument: boolean) => setState(state => ({ ...state, isDocument })));
    return function () {
      PubSub.unsubscribe(updateFilesTreeToken);
      PubSub.unsubscribe(setEditableToken);
    };
  }, [updateFileTree]);

  React.useEffect(() => {
    const stopLoadingToken = PubSub.subscribe('stopLoading', () => {
      setState(state => ({ ...state, loading: false }));
    });
    return function () {
      PubSub.unsubscribe(stopLoadingToken);
    };
  }, [messageApi]);


  return (
    <StyleDiv asideWidth={'15rem'}>
      {contextHolder}
      <AddFileModal
        open={state.openAddFileModal}
        type={state.type}
        close={closeAddFileModal}
        cloudFileId={cloudFileId}
        updateFileTree={updateFileTree} />
      <ShareFileModal open={state.openShareFileModal} close={closeShareFileModal} />
      <aside>
        <div className='cloud_tool'>
          <h4>目录</h4>
          <Popover
            arrow={false}
            placement='bottom'
            content={<div style={{ display: 'flex', flexDirection: 'column' }}>
              <Button
                type='link'
                disabled={state.disabled}
                onClick={buildFolder}>
                新建文件夹&emsp;
              </Button>
              <Button
                type='link'
                disabled={state.disabled}
                onClick={buildFile}>
                上传文件&emsp;&emsp;
              </Button>
              <Button
                type='link'
                disabled={state.disabled}
                onClick={buildCloudDocument}>
                新建文档&emsp;&emsp;
              </Button>
            </div>}>
            <Button size='small'>+</Button>
          </Popover>
        </div>
        <DirectoryTree
          multiple
          //style={{ color: '#fff',backgroundColor:'#000' }}
          selectedKeys={[state.selectedKey]}
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
                  onClick={editUpdateClick}
                  disabled={!state.isDocument}
                  type='link'>
                  <EditOutlined />
                  {!state.edit ? '编辑' : '更新'}
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
              <Button loading={state.loading}>更多操作</Button>
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
