import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config } from 'dotenv';

config();
export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [__dirname + '/../**/*.entity.{js, ts}'],
  synchronize: true,
  logging: true,
};
