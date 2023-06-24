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
    '@typescript-eslint/no-explicit-any': 'off',
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
