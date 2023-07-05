import React from 'react';
import PubSub from 'pubsub-js';
import type { TreeNode } from '@/types';
import { useParams } from 'react-router-dom';
import { Form, Modal, TreeSelect, message } from 'antd';
import { getAllContacts, moveToSharedCloudFile } from '@/api';
const { SHOW_PARENT } = TreeSelect;

interface Props {
  open: boolean;
  close: () => void;
}

const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0',
      },
      {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1',
      },
      {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2',
      },
    ],
  },
];

const Index: React.FC<Props> = (props) => {
  const { open, close } = props;
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { cloudFileId = '0' } = useParams();
  const [treeData, setTreeData] = React.useState<TreeNode[]>([]);

  const tProps = {
    treeData,
    allowClear: true,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: '请选择你要共享的成员',
    style: {
      width: '100%',
    },
  };

  const onOk = () => {
    form.validateFields().then(async (res) => {
      //发送请求
      const userIds: string[] = [];
      res.ids.forEach((id: string) => {
        const treeNode = treeData.find(treeNode => treeNode.key === id);
        if (treeNode && treeNode.children) {
          userIds.push(...treeNode.children.map(treeNode => treeNode.key));
        } else if (treeNode) {
          userIds.push(treeNode.key);
        }
      });
      return moveToSharedCloudFile(cloudFileId,userIds);
    }).then(res => {
      const { statusCode } = res;
      if (statusCode === 200) {
        messageApi.success('共享成功');
        PubSub.publish('updateFilesTree');
      } else {
        messageApi.error('共享失败');
      }
      close();
    });
  };

  React.useEffect(() => {
    (async function () {
      const { statusCode, data } = await getAllContacts();
      if (statusCode === 200) {
        setTreeData(data || []);
      }
    })();
  }, []);

  return (
    <Modal title='填写共享信息' open={open} onCancel={close} onOk={onOk}>
      {contextHolder}
      <Form
        form={form}
        labelCol={{ span: 7 }}
        autoComplete="off"
      >
        <Form.Item
          label='请选择共享成员'
          rules={[{ required: true, message: '至少需要一个共享成员' }]}
          name='ids'>
          <TreeSelect {...tProps} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Index;