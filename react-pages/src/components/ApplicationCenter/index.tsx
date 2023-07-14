import React from 'react';
import StyleDiv from './style';
import { applyApproval } from '@/api';
import { DesktopOutlined, HomeOutlined, SendOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, DatePicker, message } from 'antd';

const { RangePicker } = DatePicker;

const Index = () => {
  const [form] = Form.useForm();
  const [selected, setSelected] = React.useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const [items] = React.useState([
    {
      key: '1',
      title: '请假',
      icon: <SendOutlined />,
      bg: 'orange',
    },
    {
      key: '2',
      title: '出差',
      icon: <HomeOutlined />,
      bg: '#0BD07D'
    },
    {
      key: '3',
      title: '加班',
      icon: <DesktopOutlined />,
      bg: 'skyblue'
    }
  ]);

  const onCancel = () => {
    setSelected('');
    form.resetFields();
  };

  const onOk = async () => {
    form.validateFields().then(async (res) => {
      const body = {
        type: res.type || selected,
        startTime: new Date(res.time[0]),
        endTime: new Date(res.time[1]),
        reason: res.reason,
      };
      const { statusCode } = await applyApproval(body);
      return statusCode;
    }).then(code => {
      if (code === 200) {
        messageApi.success('申请成功');
        setSelected('');
        form.resetFields();
      } else {
        messageApi.error('申请失败');
      }
    });
  };


  return (
    <StyleDiv>
      {contextHolder}
      {items.map(item => <div key={item.key}>
        <header style={{ backgroundColor: item.bg }}>
          <h5>{item.title}</h5>
          <span> {item.icon}</span>
        </header>
        <div >
          <Button type='dashed' onClick={() => setSelected(item.title)}>
            点击申请
          </Button>
        </div>
      </div>)}
      <Modal
        onOk={onOk}
        okText='申请'
        onCancel={onCancel}
        title={`${selected}`}
        open={selected !== ''}>
        <Form
          form={form}
          labelCol={{ span: 5 }}
          autoComplete="off"
          initialValues={{ reason: '' }}
        >
          <Form.Item
            rules={[{ required: true, message: '请选择开始时间——结束时间' }]}
            name='time'
            label='开始-结束'>
            <RangePicker format={'YYYY-MM-DD HH时'} showTime />
          </Form.Item>
          {selected === '请假' && <Form.Item
            label='请假类型'
            rules={[{ required: true, message: '请选择一种请假原因' }]}
            name='type'>
            <Select
              placeholder='请选择一种请假类型'
              options={[
                { value: '事假', label: '事假' },
                { value: '年假', label: '年假' },
                { value: '病假', label: '病假' },
              ]}
            />
          </Form.Item>}
          <Form.Item label={`${selected}原因`} name='reason'>
            <Input.TextArea rows={5} />
          </Form.Item>
        </Form>
      </Modal>
    </StyleDiv>
  );
};

export default Index;