import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Index() {
  return (
    <div>
      <aside>侧边栏</aside>
      <Outlet />
    </div>
  );
}
