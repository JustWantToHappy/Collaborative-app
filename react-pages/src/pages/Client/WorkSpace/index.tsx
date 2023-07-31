import React from 'react';
import { Tabs } from 'antd';
import { useTitle } from '@/hooks';
import { StyleDiv } from '@/common';
import Report from '@/components/Report';
import { ThemeModeContext } from '@/context';
import ApprovalCenter from '@/components/ApprovalCenter';
import ApplicationCenter from '@/components/ApplicationCenter';
import { ApartmentOutlined, SnippetsOutlined } from '@ant-design/icons';

type Item = {
  path: string;
  title: string;
  icon: React.ReactNode,
  header?: React.ReactNode,
  container?: React.ReactNode
}

export default function Index() {
  useTitle('工作台');
  const context = React.useContext(ThemeModeContext);
  const [active, setActive] = React.useState('approve');
  const [items] = React.useState<Item[]>([
    {
      path: 'approve',
      title: '审批',
      icon: <ApartmentOutlined />,
      header: <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: '1',
            label: `申请中心`,
            children: <ApplicationCenter />,
          },
          {
            key: '2',
            label: `审批中心`,
            children: <ApprovalCenter />,
          },
        ]} />,
    },
    {
      path: 'report',
      title: '汇报',
      icon: <SnippetsOutlined />,
      container: <Report />
    }
  ]);

  return (
    <StyleDiv asideWidth={'10rem'} mode={context.mode}>
      <aside className='work_aside'>
        <ul>
          {items.map(item => <li
            key={item.path}
            onClick={() => setActive(item.path)}
            className={active === item.path ? 'work_item active' : 'work_item'}>
            <span>{item.icon}</span>
            <small>{item.title}</small>
          </li>)}
        </ul>
      </aside>
      <main>
        <div
          className='header workspace' style={{}}>
          {items.find(item => item.path === active)?.header}
        </div>
        <div className='container'>
          {items.find(item => item.path === active)?.container}
        </div>
      </main>
    </StyleDiv>
  );
}
