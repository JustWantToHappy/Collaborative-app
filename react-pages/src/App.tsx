import React from 'react';
import { routes } from './layout';
import { useRoutes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { defaultCssStyles } from './utils';
import zhCN from 'antd/locale/zh_CN';

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
          colorLink: data.colorLink,
          colorLinkActive: data.colorPrimary,
          colorLinkHover: data.colorPrimary
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