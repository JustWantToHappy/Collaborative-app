// eslint-disable-next-line no-undef
module.exports = {
  //告诉eslint当前项目的运行环境。
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  //parserOptions选项表示Eslint对于不同的Parser配置的语言检查规则。
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh'],
  rules: {
    /**
     * 如果一个文件的默认导出不是React组件类或者函数，或者它同时导出
     * 其他内容，就会发出一个警告。
     * "off"或者0表示关闭本条规则检测
     * "warn"或者1表示开启规则检测，使用警告级别的错误(不会导致程序退出)
     * "error"或者2表示开启规则，使用错误级别的错误(当被触发的时候，程序就会退出。)
     */
    'react-refresh/only-export-components': 'warn',
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    //行尾加上分号
    semi: [2, 'always']
  },
  settings: {
    'import/resolver': {
      alias: [['/@', './src']],
      extendsions: ['.ts', '.tsx', '.json']
    }
  },
  //eslint官方提供的eslint:recommended规则，extends作用就是在项目内继承了另一份eslint配置文件
  // eslint-disable-next-line no-dupe-keys
  //extends: ['eslint:recommended'],
  overrides: [
    //*.test.js以及*.spec.js结尾的文件特殊定义某些规则
    {
      files: ['*-test.js', '*.spec.js'],
      rules: {}
    }
  ]
};
