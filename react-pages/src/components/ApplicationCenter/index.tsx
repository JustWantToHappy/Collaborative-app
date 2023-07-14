import React from 'react';
import dayjs from 'dayjs';
import StyleDiv from './style';
import { DesktopOutlined, HomeOutlined, SendOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, DatePicker } from 'antd';

const { RangePicker } = DatePicker;

const Index = () => {
  const [form] = Form.useForm();
  const [selected, setSelected] = React.useState('');
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
    form.resetFields();
    setSelected('');
  };

  const onOk = () => {
    form.validateFields().then(res => {
      const body = {
        startTime: dayjs(res.time[0]).format('YYYY-MM-DD HH:mm:ss'),
        endTime: dayjs(res.time[1]).format('YYYY-MM-DD HH:mm:ss'),
        description: res.description,
        reason: res.reason || selected
      };
      //
    });
  };


  return (
    <StyleDiv>
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
          //action='/'
          labelCol={{ span: 5 }}
          autoComplete="off"
          initialValues={{ description: '' }}
        >
          {selected === '请假' && <Form.Item
            label='请假理由'
            rules={[{ required: true, message: '请选择一种请假原因' }]}
            name='reason'>
            <Select
              placeholder='请选择一种请假原因'
              options={[
                { value: '事假', label: '事假' },
                { value: '年假', label: '年假' },
                { value: '病假', label: '病假' },
              ]}
            />
          </Form.Item>}
          <Form.Item
            rules={[{ required: true, message: '请选择开始时间——结束时间' }]}
            name='time'
            label='开始-结束'>
            <RangePicker format={'YYYY-MM-DD HH时'} showTime />
          </Form.Item>
          <Form.Item label={`${selected}详细理由`} name='description'>
            <Input.TextArea rows={5} />
          </Form.Item>
        </Form>
      </Modal>
    </StyleDiv>
  );
};

export default Index;