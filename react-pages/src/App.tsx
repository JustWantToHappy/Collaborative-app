import React from 'react';
import Quill from 'quill';
import { routes } from './routes';
//import { LocalStorageKey } from './enum';
//import { useLocalStorage } from './hooks';
import QuillCursors from 'quill-cursors';
import { useRoutes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { defaultCssStyles } from './utils';
Quill.register('modules/cursors', QuillCursors);

function App() {
  const element = useRoutes(routes);
  const [data] = React.useState(defaultCssStyles);

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: data.colorPrimary,
          borderRadius: data.borderRadius,
          colorLinkActive: data.colorPrimary,
          colorLinkHover: data.colorPrimary,
          //黑夜白天模式下需要切换的样式
          colorLink: data.colorLink,
          //colorBgBase: '#000',
          //colorTextBase: '#fff',
          //colorBgContainer: '#000',
          //colorTextDisabled: 'gray',
          //colorTextPlaceholder: 'gray',
        }
      }}
    >
      <React.Suspense fallback={<h1>Loading...</h1>}>
        <div className='app'>
          {element}
        </div>
      </React.Suspense>
    </ConfigProvider>
  );
}

export default App;