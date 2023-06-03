import React, { Suspense } from 'react';
import { ConfigProvider } from 'antd';
import { useRoutes } from 'react-router-dom';
import { routes } from './layout';

type ThemeData = {
  borderRadius: number;
  colorPrimary: string;
};

const defaultData: ThemeData = {
  borderRadius: 6,
  colorPrimary: '#00B96B',
};

function App() {
  const element = useRoutes(routes);
  const [data, setData] = React.useState<ThemeData>(defaultData);

  return (
    <ConfigProvider theme={{ token: { colorPrimary: data.colorPrimary, borderRadius: data.borderRadius } }}>
      <div className="app">
        <Suspense fallback={<h1>Loading...</h1>}>
          {element}
        </Suspense>
      </div>
    </ConfigProvider>
  );
}

export default App;
