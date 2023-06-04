import React, { Suspense } from 'react';
import { ConfigProvider } from 'antd';
import { useRoutes } from 'react-router-dom';
import { routes } from './layout';
import { defaultCssStyles } from './utils';


function App() {
  const element = useRoutes(routes);
  const [data] = React.useState(defaultCssStyles);

  return (
    <ConfigProvider theme={{
      token: {
        colorPrimary: data.colorPrimary,
        borderRadius: data.borderRadius,
        colorLink: data.colorLink,
        colorLinkActive: data.colorPrimary,
        colorLinkHover: data.colorPrimary
      }
    }}>
      <div className="app">
        <Suspense fallback={<h1>Loading...</h1>}>
          {element}
        </Suspense>
      </div>
    </ConfigProvider>
  );
}

export default App;
