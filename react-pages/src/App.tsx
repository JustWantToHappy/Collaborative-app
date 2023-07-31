import React from 'react';
import Quill from 'quill';
import { routes } from './routes';
import { ThemeModeContext } from './context';
import { LocalStorageKey } from './enum';
import { useLocalStorage } from './hooks';
import QuillCursors from 'quill-cursors';
import { useRoutes } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { defaultCssStyles } from './utils';
Quill.register('modules/cursors', QuillCursors);

function App() {
  const element = useRoutes(routes);
  const { darkAlgorithm, defaultAlgorithm } = theme;
  const [data] = React.useState(defaultCssStyles);
  const [config, setConfig] = useLocalStorage(LocalStorageKey.System_Config, {});

  const getThemeMode = () => {
    return window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  };

  const changeThemeMode = React.useCallback((mode: 'dark' | 'light') => setConfig({ mode }), []);

  React.useEffect(() => {
    if (config.mode === 'light') {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    }
  }, [config.mode]);

  React.useEffect(() => {
    const handleThemeModeChange = () => changeThemeMode(getThemeMode());
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', handleThemeModeChange);

    return function () {
      window.matchMedia('(prefers-color-scheme: light)').removeEventListener('change', handleThemeModeChange);
    };
  }, [changeThemeMode]);

  return (
    <ThemeModeContext.Provider value={{ mode: config.mode, switchMode: changeThemeMode }}>
      <ConfigProvider
        locale={zhCN}
        theme={{
          algorithm: config.mode === 'dark' ? darkAlgorithm : defaultAlgorithm,
          token: {
            colorPrimary: data.colorPrimary,
            borderRadius: data.borderRadius,
            colorLinkActive: data.colorPrimary,
            colorLinkHover: data.colorPrimary,
            colorLink: config.mode === 'dark' ? data.colorLinkDark : data.colorLink,
          }
        }}
      >
        <React.Suspense fallback={<h1>Loading...</h1>}>
          <div className='app'>
            {element}
          </div>
        </React.Suspense>
      </ConfigProvider>
    </ThemeModeContext.Provider>
  );
}

export default App;