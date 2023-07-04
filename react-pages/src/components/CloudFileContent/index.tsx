import dayjs from 'dayjs';
import React from 'react';
import { Table } from 'antd';
import StyleDiv from './style';
import { getFolderContents } from '@/api';
import { useParams } from 'react-router-dom';
import { DeleteOutlined, FileImageOutlined, FileTextOutlined, FolderOpenOutlined } from '@ant-design/icons';
import type { CloudFile } from '@/types';
import { FileType } from '@/enum';

const { Column } = Table;

type Props = {
  show?: boolean;
}

const Index: React.FC<Props> = (props) => {
  const [data, setData] = React.useState<CloudFile[]>([]);
  const { cloudFileId = '0' } = useParams();

  React.useEffect(() => {
    getFolderContents(cloudFileId).then(res => {
      const { data, statusCode } = res;
      if (statusCode === 200) {
        setData(data?.map(cloudFile => {
          cloudFile.createdAt = dayjs(cloudFile.createdAt).format('YYYY-MM-DD HH:mm:ss');
          cloudFile.updatedAt = dayjs(cloudFile.updatedAt).format('YYYY-MM-DD HH:mm:ss');
          cloudFile.description = cloudFile.description === '' ? '无' : cloudFile.description;
          return cloudFile;
        }) || []);
      }
    }).catch(err => {
      console.info(err);
    });
  }, [cloudFileId]);

  return (
    <StyleDiv show={props.show}>
      <Table
        rowKey='id'
        dataSource={data}
        pagination={{ pageSize: 6 }}
        style={{ width: '100%', minWidth: '400px' }} >
        <Column title="名称" dataIndex="title" key="title" />
        <Column title="创建时间" dataIndex="createdAt" key="createdAt" />
        <Column title="修改时间" dataIndex="updatedAt" key="updatedAt" />
        <Column title="简介" dataIndex="description" key="description" />
        <Column
          title="类型"
          dataIndex="type"
          key="type"
          align='center'
          render={(_, record: CloudFile) => (<div className='file_type'>
            {record.type === FileType.Image ?
              <FileImageOutlined /> :
              record.type === FileType.Text ?
                <FileTextOutlined /> :
                <FolderOpenOutlined />}
          </div>)}
        />
        <Column
          title="操作"
          align='center'
          render={(_: any, record: CloudFile) => (
            <DeleteOutlined className='cloud_delete' />
          )}
        />
      </Table>
    </StyleDiv>
  );
};

export default Index;