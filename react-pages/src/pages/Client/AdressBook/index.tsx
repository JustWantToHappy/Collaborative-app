import React from 'react';
import { StyleDiv } from '@/common';
import AddressBookAside from './components/AddressBookAside';

export default function Index() {
  return (
    <StyleDiv asideWidth='20rem'>
      <aside>1</aside>
      <main>
        <div className='header'>2</div>
        <div className='container'>3</div>
        <div className='welcome'>3</div>
      </main>
    </StyleDiv>
  );
}
