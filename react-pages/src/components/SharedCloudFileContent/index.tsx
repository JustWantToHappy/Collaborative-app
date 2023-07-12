import dayjs from 'dayjs';
import React from 'react';
import PubSub from 'pubsub-js';
import StyleDiv from './style';
import type { SharedCloudFile } from '@/types';
import { useParams } from 'react-router-dom';
import { useLocalStorage } from '@/hooks';
import { Config, FileType, LocalStorageKey } from '@/enum';
import { Table, Image, Popconfirm, message, Tooltip } from 'antd';
import { CollaborativeEditor } from '@/components/Editor';
import { getSharedCloudFolderContents, deleteSharedCloudFloder } from '@/api';
import { DeleteOutlined, FileImageOutlined, FileTextOutlined, FolderOpenOutlined, WarningOutlined } from '@ant-design/icons';

const { Column } = Table;

type Props = {
  show?: boolean;
}

const Index: React.FC<Props> = (props) => {
  const [showTable, setShowTable] = React.useState(false);
  const [tableLoading, setTableLoading] = React.useState(true);
  const [userInfo] = useLocalStorage(LocalStorageKey.User_Info);
  const { sharedCloudFileId = '0' } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const [tableData, setTableData] = React.useState<SharedCloudFile[]>([]);
  const [data, setData] = React.useState<SharedCloudFile>();

  const deleteFile = async (id: string) => {
    const { statusCode, msg } = await deleteSharedCloudFloder(id);
    if (statusCode === 200) {
      PubSub.publish('updateFilesTree');
      messageApi.success('删除成功');
    } else {
      messageApi.error(`${statusCode} ${msg}`);
    }
  };

  const getData = React.useCallback(() => getSharedCloudFolderContents(sharedCloudFileId).
    then(res => {
      const { data, statusCode } = res;
      if (statusCode === 200) {
        if (Array.isArray(data)) {
          setShowTable(true);
          setTableData(data?.map(sharedCloudFile => {
            sharedCloudFile.createdAt = dayjs(sharedCloudFile.createdAt).format('YYYY-MM-DD HH:mm:ss');
            sharedCloudFile.updatedAt = dayjs(sharedCloudFile.updatedAt).format('YYYY-MM-DD HH:mm:ss');
            return sharedCloudFile;
          }) || []);
        } else {
          setShowTable(false);
          setData(data as SharedCloudFile);
          PubSub.publish('sharedCloudFile', data);
        }
        setTableLoading(false);
      }
    }).catch(err => {
      console.info(err);
    }), [sharedCloudFileId]);

  React.useEffect(() => {
    getData();
    const updateSharedCloudFileToken = PubSub.subscribe('updateSharedCloudFile', getData);
    return function () {
      PubSub.unsubscribe(updateSharedCloudFileToken);
    };
  }, [getData]);

  return (
    <StyleDiv show={props.show}>
      {contextHolder}
      {showTable && <Table
        rowKey='id'
        dataSource={tableData}
        loading={tableLoading}
        pagination={{ pageSize: 6 }}
        style={{ width: '100%', minWidth: '400px', marginTop: '1rem' }} >
        <Column title="名称" dataIndex="title" key="title" />
        <Column title="创建时间" dataIndex="createdAt" key="createdAt" />
        <Column title="修改时间" dataIndex="updatedAt" key="updatedAt" />
        <Column title="简介" dataIndex="description" key="description" />
        <Column
          title="类型"
          dataIndex="type"
          key="type"
          align='center'
          render={(_, record: SharedCloudFile) => (<div className='file_type'>
            <Tooltip placement='top' title={<div>
              {record.type === FileType.Image ? '图片' : record.type === FileType.Text ? '文档' : '文件夹'}
            </div>}>
              {record.type === FileType.Image ?
                <FileImageOutlined /> :
                record.type === FileType.Text ?
                  <FileTextOutlined /> :
                  <FolderOpenOutlined />}
            </Tooltip>
          </div>)}
        />
        <Column
          title="操作"
          align='center'
          render={(_: any, record: SharedCloudFile) => (
            record.ownerId === userInfo.id ? <Popconfirm
              title="删除文件"
              description="你确定删除这个文件?"
              onConfirm={() => deleteFile(record.id)}
              icon={<WarningOutlined />}
              okText="确定"
              cancelText="取消"
            >
              <DeleteOutlined className='cloud_delete' />
            </Popconfirm> : <span>无权限</span>
          )}
        />
      </Table>}
      {!showTable && data?.type === FileType.Image && <div className='file_image'>
        <Image
          width={'100%'}
          src={Config.Server + `/${data.path}`}
          fallback="data:image/png;base64,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"
        />
      </div>}
      {!showTable && data?.type === FileType.Text && (
        <CollaborativeEditor
          version={data.version}
          sharedCloudFileId={sharedCloudFileId}
          deltaStr={data.text} />)}
    </StyleDiv>
  );
};

export default Index;