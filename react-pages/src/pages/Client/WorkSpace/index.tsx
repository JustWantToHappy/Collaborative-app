import React from 'react';
import { StyleDiv } from '@/common';
import { Outlet } from 'react-router-dom';

export default function Index() {
  return (
    <StyleDiv asideWidth={'10rem'}>
      <aside >
        df
      </aside>
      <main>
        <div className='header'>
          dsf
        </div>
        <div className='container'>
          <Outlet />
        </div>
      </main>
    </StyleDiv>
  );
}
