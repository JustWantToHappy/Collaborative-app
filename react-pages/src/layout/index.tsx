/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import type { Router } from '../types';
//前台路由
const About = lazy(() => import('../pages/Client/About'));
import Chat from '../pages/Client/Chat';
import WorkSpace from '../pages/Client/WorkSpace';
import PageNotFound from '../pages/PageNotFound';
import ChatContainer from '@/components/ChatContainer';
import Notify from '@/pages/Client/Notify';
import CloudDocument from '../pages/Client/CloudDocument';
import SharedSpace from '../pages/Client/SharedSpace';

//后台路由
import Test from '../pages/Admin/Test';
import AuthRoute from './AuthRoute';
import Test1 from '../pages/Admin/Test1';
import Test2 from '../pages/Admin/Test2';


export const routes: Array<Router> = [
  {
    name: '介绍',
    path: '/',
    element: <About />,
    children: [
      {
        name: '实时聊天',
        path: '/chat',
        element: <AuthRoute redirect='/'>
          <Chat />
        </AuthRoute>,
        children: [
          {
            name: '通讯录',
            path: 'address',
            element: <></>
          },
          {
            name: '聊天记录',
            path: 'record/:id',
            element: <ChatContainer />
          },
          {
            name: '最新通知',
            path: 'notify',
            element: <AuthRoute redirect='/'>
              <Notify />
            </AuthRoute>
          }
        ]
      },
      {
        name: '工作台',
        path: '/work',
        element: <AuthRoute redirect='/'>
          <WorkSpace />
        </AuthRoute>
      },
      {
        name: '云文档',
        path: '/cloud',
        element: <AuthRoute redirect='/'>
          <CloudDocument />
        </AuthRoute>
      },
      {
        name: '共享空间',
        path: '/shared',
        element: <AuthRoute redirect='/'>
          <SharedSpace />
        </AuthRoute>
      },
    ]
  },
  {
    name: '',
    path: '/admin',
    element: <AuthRoute redirect='/'>
      <Test />
    </AuthRoute>,
    children: [
      {
        name: '管理员首页',
        path: 'test1',
        element: <Test1 />
      },
      {
        name: '',
        path: 'test2',
        element: <Test2 />
      }
    ]
  },
  {
    name: '页面未找到',
    path: '*',
    element: <PageNotFound />
  }
];
