import React from 'react';
import PubSub from 'pubsub-js';
import { sharedSocket } from '@/utils';
import type { EditPerson } from '@/types';
import { StyleDiv } from '@/common';
import MyAvatar from '@/components/MyAvatar';
import Badges from '@/components/Badges';
import TopSvg from '@/assets/logo/top.svg';
import AddUserSvg from '@/assets/logo/addUser.svg';
import { useDebouce, useLocalStorage, useThrottle } from '@/hooks';
import { getSharedCloudFilesTree } from '@/api';
import type { DataNode, DirectoryTreeProps } from 'antd/es/tree';
import CollaboratorPopoverContent from '@/components/CollaboratorPopoverContent';
import { useParams, useNavigate, Outlet, useLocation } from 'react-router-dom';
import SharedCloudFileContent from '@/components/SharedCloudFileContent';
import { Button, message, Tooltip, Tree, FloatButton, Popover, Avatar } from 'antd';
import { LocalStorageKey } from '@/enum';

const { DirectoryTree } = Tree;

export default function Index() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [user] = useLocalStorage(LocalStorageKey.User_Info, {});
  const { sharedCloudFileId = '0' } = useParams();
  const [messageApi, messageContextHolder] = message.useMessage();
  const [treeData, setTreeData] = React.useState<DataNode[]>([]);
  const [editPerson, setEditPerson] = React.useState<EditPerson[]>([]);
  const [state, setState] = React.useState({
    loading: false,
    maxCount: 2,
    selectedKey: sharedCloudFileId,
    showEye: false,
    isDocument: false,
    edit: false,//false表示只读模式，true表示编辑模式
    ownerId: ''//文档拥有者Id
  });

  const editUpdateClick = useDebouce(() => {
    setState({ ...state, loading: true });
    if (!state.edit) {
      setTimeout(() => {
        setState({ ...state, edit: true, loading: false });
        PubSub.publish('changeEdit', true);
      }, 500);
    } else {
      setState({ ...state, edit: false, loading: true });
      PubSub.publish('changeEdit', false);
      if (sharedSocket.connected) {
        sharedSocket.emit('leave', { documentId: sharedCloudFileId, userId: user.id });
      }
    }
  }, 300);

  const onSelect: DirectoryTreeProps['onSelect'] = (_, info) => {
    navigate(`/shared/file/${info.node.key}`);
    setState({ ...state, selectedKey: info.node.key + '', showEye: false, edit: false });
  };

  const handleMouseOver = useThrottle(() => {
    setState({ ...state, maxCount: 0 });
  }, 50);

  const handleMouseLeave = useThrottle(() => {
    setState({ ...state, maxCount: 2 });
  }, 50);

  React.useEffect(() => {
    (async function () {
      const { statusCode, data } = await getSharedCloudFilesTree();
      if (statusCode === 200) {
        setTreeData(data || []);
      }
    })();

    const ownerIdToken = PubSub.subscribe('ownerId', (_, ownerId: string) => setState(state => ({ ...state, ownerId })));
    const isDocumentToken = PubSub.subscribe('isDocument', (_, isDocument: boolean) => setState(state => ({ ...state, isDocument })));
    const stopLoadingToken = PubSub.subscribe('stopLoading', () => {
      setState(state => ({ ...state, loading: false }));
      messageApi.success('内容发布成功');
    });

    return function () {
      PubSub.unsubscribe(stopLoadingToken);
      PubSub.unsubscribe(ownerIdToken);
      PubSub.unsubscribe(isDocumentToken);
    };
  }, [messageApi]);

  //展示在线编辑人员信息
  React.useEffect(() => {
    const onlineEditToken = PubSub.subscribe('onlineEdit', (_, newEditPerson: EditPerson[]) => {
      setEditPerson(newEditPerson);
    });

    return function () {
      PubSub.unsubscribe(onlineEditToken);
    };
  }, [editPerson]);

  return (
    <StyleDiv asideWidth={'15rem'}>
      {messageContextHolder}
      <aside >
        <div className='cloud_tool'>
          <h4>目录</h4>
        </div>
        <DirectoryTree
          multiple
          defaultExpandAll
          selectedKeys={[state.selectedKey]}
          onSelect={onSelect}
          treeData={treeData}
        />
      </aside>
      <main>
        <div className='header shared_header'>
          <Badges />
          <div className='shared_editor'>
            <div onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
              <Avatar.Group
                maxCount={state.maxCount}
                size="large"
                style={{ display: (state.isDocument && state.edit) ? 'block' : 'none', cursor: 'pointer' }}
                maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
              >
                {editPerson.map(user => <Tooltip
                  key={user?.email}
                  title={user?.name}
                  placement='top'>
                  <>
                    <MyAvatar
                      style={{ backgroundColor: user?.color }}
                      src={user?.avatar} >
                      {user?.name.slice(0, 1)}
                    </MyAvatar>
                  </>
                </Tooltip>)}
              </Avatar.Group>
            </div>
            <Popover content={<CollaboratorPopoverContent sharedCloudFileId={sharedCloudFileId} />}
              title="文档协作者"
              trigger="click"
              overlayStyle={{ position: 'fixed' }}
              placement='leftTop'
              arrow={false}>
              <Button
                type='text'
                style={{ display: pathname === '/shared' ? 'none' : 'flex' }}
                onClick={(event) => event.stopPropagation()}
              >
                <img src={AddUserSvg} style={{ width: '1.5rem' }} />
              </Button>
            </Popover>
            <Tooltip title='顶层目录' placement='bottom' arrow={false}>
              <Button type='text' onClick={() => navigate('/shared')}>
                <img src={TopSvg} style={{ width: '1.5rem' }} />
              </Button>
            </Tooltip>
            <Button
              style={{ display: state.isDocument ? 'block' : 'none' }}
              type={state.edit ? 'default' : 'primary'}
              onClick={editUpdateClick}
              loading={state.loading}>
              {state.edit ? '更新' : '编辑'}
            </Button>
          </div>
        </div>
        <div className='container' style={{ padding: 0 }}>
          {sharedCloudFileId === '0' && <SharedCloudFileContent />}
          <Outlet />
        </div>
      </main>
      <FloatButton.BackTop duration={300} />
    </StyleDiv >
  );
}
