import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'mysql', // MySQL の場合
  host: '127.0.0.1', // docker-compose.yml で指定したコンテナの service 名
  port: 3306, // ポート番号
  username: 'user', // docker-compose.yml の MYSQL_USER
  password: 'password', // docker-compose.yml の MYSQL_PASSWORD
  database: 'sample', // docker-compose.yml の MYSQL_DATABASE
  logging: true, // コンソール画面に実行したSQLが表示される
  synchronize: false, // true にすると migration が自動で実行されます。
  entities: [User], // エンティティクラスを指定する（複数の場合はカンマで区切る）
  migrations: ['dist/migration/*.js'], // dist ディレクトリ内の js ファイルを指定する
});
