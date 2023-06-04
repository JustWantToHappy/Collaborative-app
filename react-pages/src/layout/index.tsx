/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import type { Router } from '../types';
//前台路由
const About = lazy(() => import('../pages/Client/About'));
const Home = lazy(() => import('../pages/Client/Home'));
const WorkSpace = lazy(() => import('../pages/Client/WorkSpace'));
const PageNotFound = lazy(() => import('../pages/PageNotFound'));
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
        name: '首页',
        path: '/home',
        element: <AuthRoute redirect='/'>
          <Home />
        </AuthRoute>
      },
      {
        name: '工作台',
        path: '/work',
        element: <AuthRoute redirect='/'>
          <WorkSpace />
        </AuthRoute>
      }
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
