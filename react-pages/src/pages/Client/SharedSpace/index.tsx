import React from 'react';
import PubSub from 'pubsub-js';
import { StyleDiv } from '@/common';
import { useDebouce } from '@/hooks';
import Badges from '@/components/Badges';
import { defaultCssStyles } from '@/utils';
import AddUserSvg from '@/assets/logo/addUser.svg';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import SharedCloudFileContent from '@/components/SharedCloudFileContent';
import { getSharedCloudFilesTree } from '@/api';
import type { DataNode, DirectoryTreeProps } from 'antd/es/tree';
import { Button, Popover, message, Avatar, Tooltip, Tree } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons';

const { DirectoryTree } = Tree;

export default function Index() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const { sharedCloudFileId = '0' } = useParams();
  const [maxCount, setMaxCount] = React.useState(2);
  const [selectedKey, setSelectedKey] = React.useState(sharedCloudFileId);
  const [treeData, setTreeData] = React.useState<DataNode[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [showEye, setShowEye] = React.useState(false);
  const [isDocument, setIsDocument] = React.useState(false);
  const [edit, setEdit] = React.useState(false);//false表示只读模式，true表示编辑模式

  const editUpdateClick = useDebouce(() => {
    setLoading(true);
    if (!edit) {
      setTimeout(() => {
        setEdit(edit => !edit);
        setLoading(false);
      }, 1000);
    } else {
      setEdit(edit => !edit);
      setLoading(false);
    }
  }, 300);

  const showCollaborators = useDebouce(() => {
    setShowEye(preShow => !preShow);
  }, 300);

  const onSelect: DirectoryTreeProps['onSelect'] = (_, info) => {
    navigate(`/shared/file/${info.node.key}`);
    setSelectedKey(info.node.key + '');
    setShowEye(false);
    setEdit(false);
  };

  React.useEffect(() => {
    (async function () {
      const { statusCode, data } = await getSharedCloudFilesTree();
      if (statusCode === 200) {
        setTreeData(data || []);
      }
    })();

    const isDocumentToken = PubSub.subscribe('isDocument', (_, isDocument: boolean) => setIsDocument(isDocument));

    return function () {
      PubSub.unsubscribe(isDocumentToken);
    };
  }, []);

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
          selectedKeys={[selectedKey]}
          onSelect={onSelect}
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
                style={{ display: showEye || (isDocument && edit) ? 'block' : 'none', cursor: 'pointer' }}
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
            <Button
              style={{ display: isDocument ? 'none' : 'block' }}
              onClick={showCollaborators}
              type='text'>
              {showEye ? <EyeOutlined
                style={{ fontSize: '1.5rem', color: defaultCssStyles.colorLinkActive }} /> :
                <EyeInvisibleOutlined
                  style={{ fontSize: '1.5rem', color: defaultCssStyles.colorLinkActive }} />}
            </Button>
            <Popover content={<span>协作</span>} placement='bottom' arrow={false}>
              <Button type='text'>
                <img src={AddUserSvg} style={{ width: '1.5rem' }} />
              </Button>
            </Popover>
            <Button
              style={{ display: isDocument ? 'block' : 'none' }}
              type={edit ? 'default' : 'primary'}
              onClick={editUpdateClick}
              loading={loading}>
              {edit ? '更新' : '编辑'}
            </Button>
          </div>
        </div>
        <div className='container' style={{ padding: 0 }}>
          {sharedCloudFileId === '0' && <SharedCloudFileContent />}
          <Outlet />
        </div>
      </main>
    </StyleDiv >
  );
}
