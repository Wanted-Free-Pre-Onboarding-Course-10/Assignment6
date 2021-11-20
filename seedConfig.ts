import { config } from 'dotenv';
import { Area } from './src/area/area.entity';

config();

console.log(process.env.MYSQL_HOST);
console.log(process.env.MYSQL_PORT);
console.log(process.env.MYSQL_USER);
console.log(process.env.MYSQL_ROOT_PASSWORD);
console.log(process.env.MYSQL_DATABASE);
const typeORMConfig = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [Area],
  seeds: ['src/database/seeds/**/*.seeds.ts'],
  factories: ['src/database/factories/**/*.factories.ts'],
};

export = typeORMConfig;
