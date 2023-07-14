import React from 'react';
import dayjs from 'dayjs';
import { getAllApprovals } from '@/api';
import { Table, Tag, message } from 'antd';
import type { Approval } from '@/types';
import { State } from '@/enum';

const { Column } = Table;

const Index: React.FC = () => {
  const [total, setTotal] = React.useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = React.useState<Approval[]>([]);
  const [tableLoading, setTableLoading] = React.useState(true);
  const [pagination, setPagination] = React.useState({ current: 1, pageSize: 5 });

  const fetchDate = React.useCallback(async () => {
    const { current, pageSize } = pagination;
    setTableLoading(true);
    const { statusCode, data, msg } = await getAllApprovals({ current, pageSize });
    if (statusCode === 200) {
      setData(data?.approvals ?? []);
      setTableLoading(false);
      setTotal(data?.total || 0);
    } else {
      messageApi.error(`${statusCode} ${msg}`);
    }
  }, [pagination, messageApi]);

  const handlePagingChange = async (current: number, pageSize: number) => {
    setPagination({ ...pagination, current, pageSize });
  };

  React.useEffect(() => {
    fetchDate();
  }, [fetchDate]);

  return <Table
    rowKey='id'
    loading={tableLoading}
    dataSource={data}
    pagination={{
      ...pagination,
      total,
      showSizeChanger: false,
      onChange: handlePagingChange
    }}>
    {contextHolder}
    <Column title="类型" dataIndex="type" key="type" />
    <Column title="原因" dataIndex="reason" key="reason" />
    <Column
      title="结束时间"
      key="startTime"
      render={(_: any, record: Approval) => (
        <span>{dayjs(record.startTime).format('YYYY年MM月DD日 HH时')}</span>
      )}
    />
    <Column
      title="结束时间"
      key="endTime"
      render={(_: any, record: Approval) => (
        <span>{dayjs(record.endTime).format('YYYY年MM月DD日 HH时')}</span>
      )}
    />
    <Column
      title="状态"
      key="state"
      render={(_: any, record: Approval) => (
        <span>
          {record.state === State.Pending ?
            <Tag color='orange'>待处理</Tag> :
            record.state === State.Agree ?
              <Tag color='green'>已同意</Tag> :
              <Tag color='red'>已拒绝</Tag>}
        </span>
      )}
    />
  </Table>;
};

export default Index;