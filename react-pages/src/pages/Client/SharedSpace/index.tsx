import React from 'react';
import Test from '@/components/CollaborativeEditor';
import Badges from '@/components/Badges';
import { StyleDiv } from '@/common';
import { Button, Popover } from 'antd';
import AddUserSvg from '@/assets/logo/addUser.svg';

export default function Index() {

  return (
    <StyleDiv asideWidth={'15rem'}>
      <aside >
        <div className='cloud_add'>
          <h4>目录</h4>
          <Popover
            arrow={false}
            placement='bottom'
            content={<div style={{ display: 'flex', flexDirection: 'column' }}>
              <Button type='link'>新建顶层文件夹</Button>
              <Button type='link'>新建子文件夹&emsp;</Button>
              <Button type='link'>新建子文件&emsp;&emsp;</Button>
            </div>}>
            <Button size='small'>+</Button>
          </Popover>
        </div>
      </aside>
      <main>
        <div className='header shared_header'>
          <Badges />
          <div className='shared_editor'>
            <Popover content={<span>协作</span>} placement='bottom' arrow={false}>
              <Button type='text'>
                <img src={AddUserSvg} style={{ width: '1.5rem' }} />
              </Button>
            </Popover>
            <Button>
              更新
            </Button>
          </div>
        </div>
        <div className='container' style={{ padding: 0 }}>
          <Test />
        </div>
      </main>
    </StyleDiv>
  );
}
