import React from 'react';
import Badges from '@/components/Badges';
import { StyleDiv } from '@/common';

export default function Index() {
  
  return (
    <StyleDiv asideWidth={'15rem'}>
      <aside >
        目录
      </aside>
      <main>
        <div className='header'>
          <Badges style={{ margin: '.5rem 0 0 2rem' }} />
        </div>
        <div className='container' style={{}}>
          tet
        </div>
      </main>
    </StyleDiv>
  );
}
