module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '101127txl',
  database: 'collaborative_db',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'], //迁移文件
  cli: {
    migrationsDir: 'src/migrations',
  },
};
